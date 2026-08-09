'use strict';

const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const urlLibrary = require('url');
const WebSocket = require('ws-old');
const WebSocketServer = WebSocket.WebSocketServer || WebSocket.Server;
const WS_OPEN = 1;
const {
  DEFAULT_PROFILES,
  normalizeCommand,
  normalizeProfiles,
  sanitizeTvMessage,
  text
} = require('./protocol');

const DEFAULT_PORT = 8182;
const APP_VERSION = '0.2.5';
const BODY_LIMIT = 32 * 1024;
const TOKEN_TTL = 30 * 24 * 60 * 60 * 1000;
const PIN_TTL = 10 * 60 * 1000;
const PAIR_WINDOW = 60 * 1000;
const EMBEDDED_CONTROLLER_ASSETS = typeof __WEB_REMOTE_CONTROLLER_ASSETS__ === 'undefined'
  ? null
  : __WEB_REMOTE_CONTROLLER_ASSETS__;

function json(response, status, value, headers = {}) {
  const body = JSON.stringify(value);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...headers
  });
  response.end(body);
}

function isLoopback(address) {
  return address === '127.0.0.1' || address === '::1' || address === '::ffff:127.0.0.1';
}

function remoteAddress(request) {
  return request.socket && request.socket.remoteAddress ? request.socket.remoteAddress : '';
}

function bearerToken(request) {
  const authorization = String(request.headers.authorization || '');
  return authorization.indexOf('Bearer ') === 0 ? authorization.slice(7) : '';
}

function hasSameOrigin(request) {
  const origin = String(request.headers.origin || '');
  if (!origin) return true;
  try {
    return parseRequestUrl(origin, origin).host === String(request.headers.host || '');
  } catch {
    return false;
  }
}

function secureEqual(left, right) {
  const a = String(left);
  const b = String(right);
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return difference === 0;
}

function bufferFrom(value, encoding) {
  return Buffer.from ? Buffer.from(value, encoding) : new Buffer(value, encoding);
}

function randomPin() {
  return String(100000 + (crypto.randomBytes(4).readUInt32BE(0) % 900000));
}

function randomToken() {
  return crypto.randomBytes(32).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function hasSuffix(value, suffix) {
  return value.slice(-suffix.length) === suffix;
}

function parseRequestUrl(value, base) {
  if (typeof URL === 'function') {
    const parsed = new URL(value, base);
    const query = {};
    parsed.searchParams.forEach((entryValue, key) => { query[key] = entryValue; });
    return { pathname: parsed.pathname, query, host: parsed.host };
  }
  return urlLibrary.parse(value, true);
}

function addressPriority(address) {
  if (address.indexOf('192.168.') === 0) return 0;
  if (address.indexOf('10.') === 0) return 1;
  const match = /^172\.(\d+)\./.exec(address);
  if (match && Number(match[1]) >= 16 && Number(match[1]) <= 31) return 2;
  return 5;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > BODY_LIMIT) {
        reject(Object.assign(new Error('Request body is too large.'), { statusCode: 413 }));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 }));
      }
    });
    request.on('error', reject);
  });
}

function findLanAddresses() {
  const found = [];
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const entries = interfaces[name];
    for (const entry of entries || []) {
      if (entry && entry.family === 'IPv4' && !entry.internal && entry.address) found.push(entry.address);
    }
  }
  return [...new Set(found)].sort((left, right) => addressPriority(left) - addressPriority(right));
}

function controllerDirectory() {
  const bundled = path.join(__dirname, 'controller');
  if (fs.existsSync(bundled)) return bundled;
  return path.resolve(__dirname, '../controller');
}

function staticHeaders(contentType) {
  return {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    'Content-Security-Policy': "default-src 'self'; connect-src 'self' ws:; img-src 'self' data:; style-src 'self'; script-src 'self'; manifest-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
  };
}

function contentType(file) {
  if (hasSuffix(file, '.html')) return 'text/html; charset=utf-8';
  if (hasSuffix(file, '.js')) return 'text/javascript; charset=utf-8';
  if (hasSuffix(file, '.css')) return 'text/css; charset=utf-8';
  if (hasSuffix(file, '.svg')) return 'image/svg+xml; charset=utf-8';
  if (hasSuffix(file, '.webmanifest')) return 'application/manifest+json; charset=utf-8';
  return 'application/octet-stream';
}

function makeDefaultState() {
  return {
    tvConnected: false,
    phoneCount: 0,
    activeProfileId: 'bilibili',
    page: {
      title: '',
      url: 'https://www.bilibili.com/',
      hostname: 'www.bilibili.com',
      adapter: 'bilibili',
      readyState: 'loading',
      site: null
    },
    player: {
      found: false,
      paused: true,
      currentTime: 0,
      duration: 0,
      volume: 1,
      muted: false,
      captions: false
    },
    items: [],
    navigation: {
      status: 'idle',
      requestedUrl: '',
      startedAt: 0,
      finishedAt: 0
    },
    lastLog: null,
    updatedAt: Date.now()
  };
}

function createRemoteServer(options = {}) {
  const preferredPort = typeof options.port === 'number' && isFinite(options.port) && Math.floor(options.port) === options.port ? options.port : DEFAULT_PORT;
  const host = options.host || '0.0.0.0';
  const staticDir = EMBEDDED_CONTROLLER_ASSETS ? null : (options.controllerDir || controllerDirectory());
  const tokens = new Map();
  const failures = new Map();
  const phoneSockets = new Set();
  let tvSocket = null;
  let tvPollSeenAt = 0;
  let tvPollWaiter = null;
  const tvCommandQueue = [];
  let profiles = normalizeProfiles(options.profiles || DEFAULT_PROFILES.map((profile) => ({
    id: profile.id,
    name: profile.name,
    urls: [...profile.urls]
  })));
  let state = makeDefaultState();
  let pin = '';
  let pinExpiresAt = 0;
  let actualPort = preferredPort;
  let lanAddresses = findLanAddresses();

  function rotatePin(force = false) {
    if (!force && pin && Date.now() < pinExpiresAt) return;
    pin = randomPin();
    pinExpiresAt = Date.now() + PIN_TTL;
    broadcastServiceInfo();
  }

  function addLanAddress(address) {
    const value = String(address || '');
    if (!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(value) || value === '127.0.0.1') return;
    lanAddresses = [value].concat(lanAddresses.filter((candidate) => candidate !== value));
    broadcastServiceInfo();
  }

  function pruneTokens() {
    const cutoff = Date.now() - TOKEN_TTL;
    for (const [token, session] of tokens) {
      if (session.lastUsed < cutoff) tokens.delete(token);
    }
  }

  function authenticate(request, explicitToken = '') {
    pruneTokens();
    const token = explicitToken || bearerToken(request);
    const session = tokens.get(token);
    if (!session) return null;
    session.lastUsed = Date.now();
    return { token, session };
  }

  function publicHost(request) {
    const header = String(request.headers.host || '');
    const name = header.replace(/:\d+$/, '');
    if (name && name !== '0.0.0.0' && name !== '127.0.0.1' && name !== 'localhost') return name;
    return lanAddresses[0] || '127.0.0.1';
  }

  function info(request) {
    const ip = request ? publicHost(request) : (lanAddresses[0] || '127.0.0.1');
    return {
      appName: 'Web Remote TV',
      version: APP_VERSION,
      port: actualPort,
      pin,
      pinExpiresAt,
      pairUrl: `http://${ip}:${actualPort}/?pin=${encodeURIComponent(pin)}`,
      addresses: lanAddresses.map((address) => `http://${address}:${actualPort}/`),
      profiles,
      activeProfileId: state.activeProfileId,
      tvConnected: state.tvConnected,
      phoneCount: phoneSockets.size
    };
  }

  function send(socket, message) {
    if (!socket || socket.readyState !== WS_OPEN) return;
    try {
      socket.send(JSON.stringify(message), () => {});
    } catch {
      // A phone can disappear between the readyState check and send (sleep, reload, Wi-Fi change).
    }
  }

  function broadcastPhones(message) {
    for (const socket of phoneSockets) send(socket, message);
  }

  function tvIsConnected() {
    return Boolean(tvSocket && tvSocket.readyState === WS_OPEN) || Date.now() - tvPollSeenAt < 45000;
  }

  function broadcastState() {
    state.phoneCount = phoneSockets.size;
    state.tvConnected = tvIsConnected();
    state.updatedAt = Date.now();
    broadcastPhones({ kind: 'state', state });
  }

  function broadcastServiceInfo() {
    if (typeof broadcastPhones !== 'function') return;
    const serviceInfo = info();
    broadcastPhones({ kind: 'service_info', info: serviceInfo });
    send(tvSocket, { kind: 'service_info', info: serviceInfo });
  }

  function flushTvPoll() {
    if (!tvPollWaiter) return;
    const waiter = tvPollWaiter;
    tvPollWaiter = null;
    clearTimeout(waiter.timeout);
    const messages = tvCommandQueue.splice(0, tvCommandQueue.length);
    waiter.respond(messages);
  }

  function sendTv(message) {
    if (tvSocket && tvSocket.readyState === WS_OPEN) {
      send(tvSocket, message);
      return;
    }
    tvCommandQueue.push(message);
    if (tvCommandQueue.length > 50) tvCommandQueue.shift();
    flushTvPoll();
  }

  function dispatchCommand(command) {
    const normalized = normalizeCommand(command);
    if (normalized.type === 'navigate' && normalized.profileId) {
      const profile = profiles.find((candidate) => candidate.id === normalized.profileId);
      if (!profile || profile.urls.indexOf(normalized.url) < 0) throw new Error('That address is not configured for the selected profile.');
      state.activeProfileId = profile.id;
    }
    if (!tvIsConnected() && normalized.type !== 'navigate') throw new Error('The TV page bridge is not connected.');
    if (normalized.type === 'navigate') {
      state.navigation = {
        status: 'loading',
        requestedUrl: normalized.url,
        startedAt: Date.now(),
        finishedAt: 0
      };
      broadcastState();
    }
    sendTv({ kind: 'command', command: normalized });
    return normalized;
  }

  function updateFromTv(message) {
    const safe = sanitizeTvMessage(message);
    if (!safe) return;
    if (safe.kind === 'page') {
      const previousUrl = state.page.url;
      state.page = safe.page;
      if (state.navigation.status === 'loading') {
        const requestedHost = parseRequestUrl(state.navigation.requestedUrl, state.navigation.requestedUrl).host;
        const requestedHostWithoutWww = requestedHost.replace(/^www\./, '');
        const currentHostWithoutWww = safe.page.hostname.replace(/^www\./, '');
        const redirectedAndReady = safe.page.url !== previousUrl && (safe.page.readyState === 'interactive' || safe.page.readyState === 'complete');
        if (requestedHostWithoutWww === currentHostWithoutWww || redirectedAndReady) {
          state.navigation.status = 'ready';
          state.navigation.finishedAt = Date.now();
        }
      }
    }
    if (safe.kind === 'snapshot') state.items = safe.items;
    if (safe.kind === 'player') state.player = safe.player;
    if (safe.kind === 'log') state.lastLog = { ...safe, at: Date.now() };
    broadcastState();
  }

  function updateProfiles(value) {
    const nextProfiles = normalizeProfiles(value.profiles);
    const activeProfileId = text(value.activeProfileId, 32).toLowerCase();
    if (!nextProfiles.some((profile) => profile.id === activeProfileId)) throw new Error('The active profile does not exist.');
    profiles = nextProfiles;
    state.activeProfileId = activeProfileId;
    broadcastServiceInfo();
    return { profiles, activeProfileId };
  }

  function pairAttemptAllowed(address) {
    const now = Date.now();
    const record = failures.get(address) || { count: 0, resetAt: now + PAIR_WINDOW };
    if (now >= record.resetAt) {
      record.count = 0;
      record.resetAt = now + PAIR_WINDOW;
    }
    failures.set(address, record);
    return record.count < 8;
  }

  function recordPairFailure(address) {
    const record = failures.get(address) || { count: 0, resetAt: Date.now() + PAIR_WINDOW };
    record.count += 1;
    failures.set(address, record);
  }

  function serveFile(response, fileName) {
    const safeName = path.basename(fileName);
    const embedded = EMBEDDED_CONTROLLER_ASSETS && EMBEDDED_CONTROLLER_ASSETS[safeName];
    const filePath = staticDir ? path.join(staticDir, safeName) : '';
    if (typeof embedded !== 'string' && (!filePath || !fs.existsSync(filePath))) {
      json(response, 404, { error: 'Asset not found.' });
      return;
    }
    const body = typeof embedded === 'string' ? bufferFrom(embedded, 'utf8') : fs.readFileSync(filePath);
    response.writeHead(200, {
      ...staticHeaders(contentType(safeName)),
      'Content-Length': body.length
    });
    response.end(body);
  }

  const server = http.createServer(async (request, response) => {
    rotatePin();
    let url;
    try {
      url = parseRequestUrl(request.url || '/', `http://${request.headers.host || 'localhost'}`);
    } catch {
      json(response, 400, { error: 'Invalid request URL.' });
      return;
    }

    try {
      if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) return serveFile(response, 'index.html');
      if (request.method === 'GET' && url.pathname === '/app.js') return serveFile(response, 'app.js');
      if (request.method === 'GET' && url.pathname === '/styles.css') return serveFile(response, 'styles.css');
      if (request.method === 'GET' && url.pathname === '/manifest.webmanifest') return serveFile(response, 'manifest.webmanifest');
      if (request.method === 'GET' && url.pathname === '/icon.svg') return serveFile(response, 'icon.svg');

      if (request.method === 'GET' && url.pathname === '/api/health') {
        return json(response, 200, {
          ok: true,
          version: APP_VERSION,
          tvConnected: state.tvConnected,
          phoneCount: phoneSockets.size,
          uptime: Math.round(process.uptime())
        });
      }

      if (request.method === 'GET' && url.pathname === '/api/tv-info') {
        if (!isLoopback(remoteAddress(request))) return json(response, 403, { error: 'TV bootstrap is loopback-only.' });
        const origin = String(request.headers.origin || 'null');
        return json(response, 200, info(request), {
          'Access-Control-Allow-Origin': origin,
          Vary: 'Origin'
        });
      }

      if (request.method === 'OPTIONS' && url.pathname.indexOf('/api/tv/') === 0) {
        if (!isLoopback(remoteAddress(request))) return json(response, 403, { error: 'TV bridge is loopback-only.' });
        const origin = String(request.headers.origin || 'null');
        response.writeHead(204, {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '600',
          Vary: 'Origin'
        });
        response.end();
        return;
      }

      if (request.method === 'GET' && url.pathname === '/api/tv/poll') {
        if (!isLoopback(remoteAddress(request))) return json(response, 403, { error: 'TV polling is loopback-only.' });
        tvPollSeenAt = Date.now();
        state.tvConnected = true;
        const origin = String(request.headers.origin || 'null');
        const respond = (messages) => json(response, 200, { messages, info: info(request) }, {
          'Access-Control-Allow-Origin': origin,
          Vary: 'Origin'
        });
        if (tvCommandQueue.length) {
          respond(tvCommandQueue.splice(0, tvCommandQueue.length));
        } else {
          if (tvPollWaiter) {
            const previous = tvPollWaiter;
            tvPollWaiter = null;
            clearTimeout(previous.timeout);
            previous.respond([]);
          }
          const timeout = setTimeout(() => {
            if (tvPollWaiter && tvPollWaiter.response === response) tvPollWaiter = null;
            respond([]);
          }, 20000);
          tvPollWaiter = { response, respond, timeout };
          request.on('close', () => {
            if (tvPollWaiter && tvPollWaiter.response === response) {
              clearTimeout(tvPollWaiter.timeout);
              tvPollWaiter = null;
            }
          });
        }
        broadcastState();
        return;
      }

      if (request.method === 'POST' && url.pathname === '/api/tv/state') {
        if (!isLoopback(remoteAddress(request))) return json(response, 403, { error: 'TV state is loopback-only.' });
        tvPollSeenAt = Date.now();
        const body = await readBody(request);
        updateFromTv(body);
        const origin = String(request.headers.origin || 'null');
        return json(response, 200, { ok: true }, {
          'Access-Control-Allow-Origin': origin,
          Vary: 'Origin'
        });
      }

      if (request.method === 'POST' && url.pathname === '/api/pair') {
        if (!hasSameOrigin(request)) return json(response, 403, { error: 'Pairing must start from this TV controller.' });
        const address = remoteAddress(request);
        if (!pairAttemptAllowed(address)) return json(response, 429, { error: 'Too many pairing attempts. Wait one minute.' });
        const body = await readBody(request);
        if (Date.now() >= pinExpiresAt) rotatePin(true);
        if (!secureEqual(String(body.pin || ''), pin)) {
          recordPairFailure(address);
          return json(response, 401, { error: 'Incorrect or expired PIN.' });
        }
        const token = randomToken();
        tokens.set(token, { name: text(body.clientName || 'Phone', 60), createdAt: Date.now(), lastUsed: Date.now() });
        failures.delete(address);
        rotatePin(true);
        return json(response, 200, { token, state, info: info(request) });
      }

      if (request.method === 'GET' && url.pathname === '/api/state') {
        if (!authenticate(request)) return json(response, 401, { error: 'Pairing required.' });
        return json(response, 200, { state, info: info(request) });
      }

      if (request.method === 'DELETE' && url.pathname === '/api/session') {
        const auth = authenticate(request);
        if (!auth) return json(response, 401, { error: 'Pairing required.' });
        tokens.delete(auth.token);
        return json(response, 200, { ok: true });
      }

      if (request.method === 'PUT' && url.pathname === '/api/config') {
        if (!authenticate(request)) return json(response, 401, { error: 'Pairing required.' });
        const body = await readBody(request);
        return json(response, 200, updateProfiles(body));
      }

      if (request.method === 'POST' && url.pathname === '/api/command') {
        if (!authenticate(request)) return json(response, 401, { error: 'Pairing required.' });
        const body = await readBody(request);
        return json(response, 200, { ok: true, command: dispatchCommand(body.command || body) });
      }

      return json(response, 404, { error: 'Not found.' });
    } catch (error) {
      const status = Number(error.statusCode) || 400;
      return json(response, status, { error: text(error.message || 'Request failed.', 300) });
    }
  });

  const webSockets = new WebSocketServer({ noServer: true, maxPayload: BODY_LIMIT, perMessageDeflate: false });

  server.on('upgrade', (request, socket, head) => {
    let url;
    try {
      url = parseRequestUrl(request.url || '/', `http://${request.headers.host || 'localhost'}`);
    } catch {
      socket.destroy();
      return;
    }
    if (url.pathname !== '/ws') {
      socket.destroy();
      return;
    }

    const role = url.query.role;
    if (role === 'tv') {
      if (!isLoopback(remoteAddress(request))) {
        socket.destroy();
        return;
      }
      request.webRemoteRole = 'tv';
    } else if (role === 'phone') {
      const auth = authenticate(request, url.query.token || '');
      if (!auth) {
        socket.destroy();
        return;
      }
      const origin = String(request.headers.origin || '');
      if (origin) {
        try {
          const originUrl = parseRequestUrl(origin, origin);
          const expectedHost = String(request.headers.host || '');
          if (originUrl.host !== expectedHost) {
            socket.destroy();
            return;
          }
        } catch {
          socket.destroy();
          return;
        }
      }
      request.webRemoteRole = 'phone';
    } else {
      socket.destroy();
      return;
    }

    webSockets.handleUpgrade(request, socket, head, (webSocket) => webSockets.emit('connection', webSocket, request));
  });

  webSockets.on('connection', (socket, request) => {
    if (request.webRemoteRole === 'tv') {
      if (tvSocket && tvSocket.readyState === WS_OPEN) tvSocket.close(4001, 'Replaced by a new TV bridge');
      tvSocket = socket;
      tvPollSeenAt = Date.now();
      state.tvConnected = true;
      send(socket, { kind: 'service_info', info: info(request) });
      broadcastState();

      socket.on('message', (payload) => {
        try {
          updateFromTv(JSON.parse(payload.toString('utf8')));
        } catch {
          // Malformed TV messages are ignored instead of reaching the controller.
        }
      });
      let tvDisconnected = false;
      const disconnectTv = () => {
        if (tvDisconnected) return;
        tvDisconnected = true;
        if (tvSocket === socket) tvSocket = null;
        broadcastState();
      };
      socket.on('error', () => {
        disconnectTv();
        try { socket.terminate(); } catch { /* The socket may already be closed. */ }
      });
      socket.on('close', disconnectTv);
      return;
    }

    phoneSockets.add(socket);
    broadcastState();
    broadcastServiceInfo();

    socket.on('message', (payload) => {
      try {
        const message = JSON.parse(payload.toString('utf8'));
        if (message.kind !== 'command') throw new Error('Unsupported message.');
        const command = dispatchCommand(message.command);
        send(socket, { kind: 'ack', requestId: text(message.requestId, 64), command });
      } catch (error) {
        send(socket, { kind: 'error', requestId: '', error: text(error.message, 300) });
      }
    });
    let phoneDisconnected = false;
    const disconnectPhone = () => {
      if (phoneDisconnected) return;
      phoneDisconnected = true;
      phoneSockets.delete(socket);
      broadcastState();
      broadcastServiceInfo();
    };
    socket.on('error', () => {
      disconnectPhone();
      try { socket.terminate(); } catch { /* The socket may already be closed. */ }
    });
    socket.on('close', disconnectPhone);
  });

  const ready = new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(preferredPort, host, () => {
      server.removeListener('error', reject);
      actualPort = server.address().port;
      rotatePin(true);
      console.log(`[Web Remote TV] Service listening on port ${actualPort}`);
      for (const address of lanAddresses) console.log(`[Web Remote TV] Controller: http://${address}:${actualPort}/`);
      resolve({ port: actualPort, addresses: lanAddresses });
    });
  });

  const maintenance = setInterval(() => {
    rotatePin();
    pruneTokens();
    send(tvSocket, { kind: 'ping', at: Date.now() });
    if (state.navigation.status === 'loading' && Date.now() - state.navigation.startedAt > 20000) {
      state.navigation.status = 'timeout';
      state.navigation.finishedAt = Date.now();
      state.lastLog = { kind: 'log', level: 'warn', message: 'The requested site did not report ready within 20 seconds.', at: Date.now() };
      broadcastState();
    }
    if (!tvIsConnected() && state.tvConnected) broadcastState();
  }, 30000);
  if (typeof maintenance.unref === 'function') maintenance.unref();

  function close() {
    clearInterval(maintenance);
    for (const socket of phoneSockets) socket.close();
    if (tvSocket) tvSocket.close();
    if (tvPollWaiter) {
      clearTimeout(tvPollWaiter.timeout);
      tvPollWaiter.respond([]);
      tvPollWaiter = null;
    }
    return new Promise((resolve) => webSockets.close(() => server.close(resolve)));
  }

  return {
    server,
    webSockets,
    ready,
    close,
    getState: () => JSON.parse(JSON.stringify(state)),
    getInfo: () => info(),
    dispatchCommand,
    updateProfiles,
    addLanAddress
  };
}

function addTizenNetworkAddress(instance) {
  try {
    if (typeof tizen === 'undefined' || !tizen.systeminfo) return;
    ['WIFI_NETWORK', 'ETHERNET_NETWORK'].forEach((property) => {
      tizen.systeminfo.getPropertyValue(property, (network) => {
        if (network && network.ipAddress) {
          instance.addLanAddress(network.ipAddress);
          console.log(`[Web Remote TV] Tizen network address: ${network.ipAddress}`);
        }
      }, () => {});
    });
  } catch {
    // Node's networkInterfaces result remains the fallback.
  }
}

if (process.env.WEB_REMOTE_NO_AUTOSTART !== '1') {
  const instance = createRemoteServer();
  addTizenNetworkAddress(instance);
  instance.ready.catch((error) => console.error('[Web Remote TV] Service failed:', error));
}

module.exports = {
  createRemoteServer,
  findLanAddresses,
  isLoopback
};
