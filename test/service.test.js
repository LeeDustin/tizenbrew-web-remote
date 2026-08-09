'use strict';

process.env.WEB_REMOTE_NO_AUTOSTART = '1';

const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { WebSocket } = require('ws');
const { createRemoteServer } = require('../src/service/server');

async function request(base, path, options = {}) {
  const response = await fetch(`${base}${path}`, options);
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('json') ? await response.json() : await response.text();
  return { response, body };
}

async function pair(base, pin) {
  const result = await request(base, '/api/pair', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin, clientName: 'Automated test' })
  });
  assert.equal(result.response.status, 200);
  return result.body.token;
}

async function openSocket(url) {
  const socket = new WebSocket(url);
  await once(socket, 'open');
  return socket;
}

function nextJson(socket, predicate = () => true) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Timed out waiting for WebSocket message.'));
    }, 2500);
    function cleanup() {
      clearTimeout(timeout);
      socket.off('message', onMessage);
    }
    function onMessage(payload) {
      const value = JSON.parse(payload.toString('utf8'));
      if (!predicate(value)) return;
      cleanup();
      resolve(value);
    }
    socket.on('message', onMessage);
  });
}

test('service exposes hardened static assets, pairing, state, and configuration', async (t) => {
  const instance = createRemoteServer({ port: 0, host: '127.0.0.1' });
  const ready = await instance.ready;
  t.after(() => instance.close());
  const base = `http://127.0.0.1:${ready.port}`;

  const index = await request(base, '/');
  assert.equal(index.response.status, 200);
  assert.match(index.body, /Web Remote TV/);
  assert.match(index.response.headers.get('content-security-policy'), /default-src 'self'/);
  assert.match(index.response.headers.get('permissions-policy'), /camera=\(\)/);

  const health = await request(base, '/api/health');
  assert.equal(health.body.ok, true);
  assert.equal(health.body.version, '0.2.9');

  const info = instance.getInfo();
  assert.match(info.pin, /^\d{6}$/);
  assert.equal(info.version, '0.2.9');
  assert.deepEqual(info.overlay, { visible: true, pinned: false });
  assert.equal(info.activeProfileId, 'bilibili');
  assert.equal(info.profiles[0].urls[0], 'https://www.bilibili.com/');
  assert.equal(info.profiles.find((profile) => profile.id === 'bilibili').urls[0], 'https://www.bilibili.com/');

  instance.addLanAddress('192.168.50.20');
  assert.match(instance.getInfo().pairUrl, /192\.168\.50\.20/);

  const tvInfo = await request(base, '/api/tv-info', { headers: { Origin: 'https://www.bilibili.com' } });
  assert.equal(tvInfo.response.status, 200);
  assert.equal(tvInfo.body.version, '0.2.9');
  assert.match(tvInfo.body.pairUrl, /192\.168\.50\.20/);
  assert.equal(tvInfo.response.headers.get('access-control-allow-origin'), 'https://www.bilibili.com');

  const icon = await request(base, '/icon.svg');
  assert.equal(icon.response.status, 200);
  assert.match(icon.body, /<svg/);

  const denied = await request(base, '/api/state');
  assert.equal(denied.response.status, 401);

  const wrong = await request(base, '/api/pair', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin: '000000' })
  });
  assert.equal(wrong.response.status, 401);

  const crossOrigin = await request(base, '/api/pair', {
    method: 'POST',
    headers: { Origin: 'https://attacker.example', 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin: info.pin })
  });
  assert.equal(crossOrigin.response.status, 403);

  const token = await pair(base, info.pin);
  assert.ok(token.length > 30);
  const authorized = { Authorization: `Bearer ${token}` };
  const state = await request(base, '/api/state', { headers: authorized });
  assert.equal(state.response.status, 200);

  const queuedNavigation = await request(base, '/api/command', {
    method: 'POST',
    headers: { ...authorized, 'Content-Type': 'application/json' },
    body: JSON.stringify({ command: { type: 'navigate', profileId: 'bilibili', url: 'https://www.bilibili.com/' } })
  });
  assert.equal(queuedNavigation.response.status, 200);

  const disconnectedHistory = await request(base, '/api/command', {
    method: 'POST',
    headers: { ...authorized, 'Content-Type': 'application/json' },
    body: JSON.stringify({ command: { type: 'history', action: 'back' } })
  });
  assert.equal(disconnectedHistory.response.status, 400);

  const update = await request(base, '/api/config', {
    method: 'PUT',
    headers: { ...authorized, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      activeProfileId: '1shows',
      profiles: [
        { id: '1shows', name: '1Shows', urls: ['https://www.1shows.org/', 'https://alt.example.com/'] },
        { id: 'cineby', name: 'Cineby', urls: ['https://cineby.at/'] }
      ]
    })
  });
  assert.equal(update.response.status, 200);
  assert.equal(update.body.profiles[0].urls.length, 2);

  const unsafe = await request(base, '/api/config', {
    method: 'PUT',
    headers: { ...authorized, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      activeProfileId: 'bad',
      profiles: [{ id: 'bad', name: 'Router', urls: ['https://192.168.1.1/'] }]
    })
  });
  assert.equal(unsafe.response.status, 400);

  const revoke = await request(base, '/api/session', { method: 'DELETE', headers: authorized });
  assert.equal(revoke.response.status, 200);
  const revoked = await request(base, '/api/state', { headers: authorized });
  assert.equal(revoked.response.status, 401);
});

test('phone and TV WebSockets exchange only normalized commands and bounded state', async (t) => {
  const instance = createRemoteServer({ port: 0, host: '127.0.0.1' });
  const ready = await instance.ready;
  const base = `http://127.0.0.1:${ready.port}`;
  const wsBase = `ws://127.0.0.1:${ready.port}`;
  const token = await pair(base, instance.getInfo().pin);
  const tv = await openSocket(`${wsBase}/ws?role=tv`);
  const phone = await openSocket(`${wsBase}/ws?role=phone&token=${encodeURIComponent(token)}`);
  t.after(async () => {
    tv.close();
    phone.close();
    await Promise.allSettled([once(tv, 'close'), once(phone, 'close')]);
    await instance.close();
  });

  phone.send(JSON.stringify({
    kind: 'command',
    requestId: 'focus-test',
    command: { type: 'pointer', dx: 5000, dy: -5000 }
  }));
  const delivered = await nextJson(tv, (message) => message.kind === 'command');
  assert.deepEqual(delivered.command, { type: 'pointer', dx: 1000, dy: -1000 });

  phone.send(JSON.stringify({
    kind: 'command',
    requestId: 'navigate-test',
    command: { type: 'navigate', profileId: '1shows', url: 'https://www.1shows.org/' }
  }));
  const navigation = await nextJson(tv, (message) => message.kind === 'command' && message.command.type === 'navigate');
  assert.equal(navigation.command.profileId, '1shows');
  assert.equal(instance.getState().navigation.status, 'loading');

  tv.send(JSON.stringify({
    kind: 'page',
    page: {
      title: 'A'.repeat(500),
      url: 'https://www.1shows.org/watch/example',
      hostname: 'www.1shows.org',
      adapter: '1shows',
      readyState: 'complete'
    }
  }));
  const stateMessage = await nextJson(phone, (message) => message.kind === 'state' && message.state.page.url.includes('/watch/example'));
  assert.equal(stateMessage.state.page.title.length, 180);
  assert.equal(stateMessage.state.navigation.status, 'ready');

  phone.send(JSON.stringify({ kind: 'command', command: { type: 'eval', code: 'bad()' } }));
  const rejected = await nextJson(phone, (message) => message.kind === 'error');
  assert.match(rejected.error, /Unknown command/);
});

test('an abruptly disconnected phone does not terminate the local service', async (t) => {
  const instance = createRemoteServer({ port: 0, host: '127.0.0.1' });
  const ready = await instance.ready;
  const base = `http://127.0.0.1:${ready.port}`;
  const wsBase = `ws://127.0.0.1:${ready.port}`;
  const token = await pair(base, instance.getInfo().pin);
  const tv = await openSocket(`${wsBase}/ws?role=tv`);
  const connectedInfo = nextJson(tv, (message) => message.kind === 'service_info' && message.info.phoneCount === 1);
  const phone = await openSocket(`${wsBase}/ws?role=phone&token=${encodeURIComponent(token)}`);
  await connectedInfo;
  t.after(() => instance.close());

  const closed = once(phone, 'close');
  const disconnectedInfo = nextJson(tv, (message) => message.kind === 'service_info' && message.info.phoneCount === 0);
  phone.terminate();
  await closed;
  await disconnectedInfo;
  await new Promise((resolve) => setTimeout(resolve, 30));

  const health = await request(base, '/api/health');
  assert.equal(health.response.status, 200);
  const replacement = await openSocket(`${wsBase}/ws?role=phone&token=${encodeURIComponent(token)}`);
  replacement.close();
  await once(replacement, 'close');
});

test('navigation handoff preserves overlay state and flushes queued controls to the replacement TV page', async (t) => {
  const instance = createRemoteServer({ port: 0, host: '127.0.0.1' });
  const ready = await instance.ready;
  const base = `http://127.0.0.1:${ready.port}`;
  const wsBase = `ws://127.0.0.1:${ready.port}`;
  const token = await pair(base, instance.getInfo().pin);
  const phone = await openSocket(`${wsBase}/ws?role=phone&token=${encodeURIComponent(token)}`);
  const firstTv = await openSocket(`${wsBase}/ws?role=tv`);
  t.after(() => instance.close());

  const hiddenState = nextJson(phone, (message) => message.kind === 'state' && message.state.overlay && !message.state.overlay.visible);
  firstTv.send(JSON.stringify({ kind: 'overlay', visible: false, pinned: false }));
  await hiddenState;
  assert.deepEqual(instance.getInfo().overlay, { visible: false, pinned: false });

  const firstClosed = once(firstTv, 'close');
  firstTv.close();
  await firstClosed;
  phone.send(JSON.stringify({
    kind: 'command',
    requestId: 'handoff-focus',
    command: { type: 'focus', direction: 'down' }
  }));

  const replacementTv = new WebSocket(`${wsBase}/ws?role=tv`);
  const replacementInfo = nextJson(replacementTv, (message) => message.kind === 'service_info');
  const queuedCommand = nextJson(replacementTv, (message) => message.kind === 'command' && message.command.type === 'focus');
  await once(replacementTv, 'open');
  assert.deepEqual((await replacementInfo).info.overlay, { visible: false, pinned: false });
  assert.deepEqual((await queuedCommand).command, { type: 'focus', direction: 'down' });
});

test('phone heartbeat retains responsive browsers across maintenance passes', async (t) => {
  const instance = createRemoteServer({ port: 0, host: '127.0.0.1', maintenanceIntervalMs: 40 });
  const ready = await instance.ready;
  const base = `http://127.0.0.1:${ready.port}`;
  const token = await pair(base, instance.getInfo().pin);
  const phone = await openSocket(`ws://127.0.0.1:${ready.port}/ws?role=phone&token=${encodeURIComponent(token)}`);
  t.after(async () => {
    phone.close();
    await Promise.allSettled([once(phone, 'close')]);
    await instance.close();
  });

  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.equal(instance.getInfo().phoneCount, 1);
});

test('loopback long polling carries commands when WebSocket is unavailable', async (t) => {
  const instance = createRemoteServer({ port: 0, host: '127.0.0.1' });
  const ready = await instance.ready;
  t.after(() => instance.close());
  const base = `http://127.0.0.1:${ready.port}`;
  const token = await pair(base, instance.getInfo().pin);

  const poll = fetch(`${base}/api/tv/poll`, { headers: { Origin: 'https://www.1shows.org' } });
  await new Promise((resolve) => setTimeout(resolve, 50));
  const commandResponse = await request(base, '/api/command', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ command: { type: 'history', action: 'reload' } })
  });
  assert.equal(commandResponse.response.status, 200);
  const pollResponse = await poll;
  assert.equal(pollResponse.headers.get('access-control-allow-origin'), 'https://www.1shows.org');
  const payload = await pollResponse.json();
  assert.deepEqual(payload.messages[0].command, { type: 'history', action: 'reload' });

  const tvState = await request(base, '/api/tv/state', {
    method: 'POST',
    headers: { Origin: 'https://www.1shows.org', 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify({ kind: 'player', player: { found: true, paused: false, currentTime: 12, duration: 120, volume: 0.7 } })
  });
  assert.equal(tvState.response.status, 200);
  assert.equal(instance.getState().player.currentTime, 12);
});
