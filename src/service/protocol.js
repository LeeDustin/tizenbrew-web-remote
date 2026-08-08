'use strict';

const net = require('net');
const urlLibrary = require('url');

const DEFAULT_PROFILES = Object.freeze([
  Object.freeze({
    id: '1shows',
    name: '1Shows',
    urls: Object.freeze(['https://www.1shows.org/'])
  }),
  Object.freeze({
    id: 'cineby',
    name: 'Cineby',
    urls: Object.freeze(['https://cineby.at/'])
  }),
  Object.freeze({
    id: 'bilibili',
    name: 'Bilibili',
    urls: Object.freeze(['https://www.bilibili.com/'])
  })
]);

const MEDIA_ACTIONS = new Set([
  'toggle',
  'play',
  'pause',
  'seekBy',
  'volumeBy',
  'captions',
  'fullscreen'
]);

const BILIBILI_ACTIONS = new Set([
  'login',
  'home',
  'danmaku',
  'previous',
  'next',
  'wide',
  'webFullscreen',
  'quality',
  'speed'
]);
const BILIBILI_QUALITY_VALUES = new Set(['0', '116', '80', '64', '32', '16']);
const BILIBILI_SPEED_VALUES = new Set(['0.5', '0.75', '1', '1.25', '1.5', '2']);

function clampNumber(value, minimum, maximum, fallback = 0) {
  const number = Number(value);
  if (typeof number !== 'number' || !isFinite(number)) return fallback;
  return Math.max(minimum, Math.min(maximum, number));
}

function text(value, maximum = 500) {
  return String(value == null ? '' : value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').slice(0, maximum);
}

function isPrivateIpv4(hostname) {
  const octets = hostname.split('.').map(Number);
  if (octets.length !== 4 || octets.some((part) => Math.floor(part) !== part || part < 0 || part > 255)) return false;
  return octets[0] === 10
    || octets[0] === 127
    || (octets[0] === 169 && octets[1] === 254)
    || (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
    || (octets[0] === 192 && octets[1] === 168)
    || octets[0] === 0;
}

function validatePublicHttpsUrl(value) {
  let parsed;
  const modern = typeof URL === 'function';
  try {
    parsed = modern ? new URL(String(value)) : urlLibrary.parse(String(value));
  } catch {
    throw new Error('The address is not a valid URL.');
  }

  if (parsed.protocol !== 'https:') throw new Error('Only public HTTPS addresses are allowed.');
  if ((modern && (parsed.username || parsed.password)) || (!modern && parsed.auth)) throw new Error('Addresses containing credentials are not allowed.');
  if (parsed.port && parsed.port !== '443') throw new Error('Custom ports are not allowed.');

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, '');
  if (!hostname || hostname.length > 253) throw new Error('The hostname is invalid.');
  if (hostname === 'localhost' || endsWith(hostname, '.localhost') || endsWith(hostname, '.local') || endsWith(hostname, '.internal')) {
    throw new Error('Local-network hostnames are not allowed.');
  }
  if (net.isIP(hostname) === 6 || isPrivateIpv4(hostname)) throw new Error('IP addresses and private-network targets are not allowed.');
  if (hostname.indexOf('.') < 0) throw new Error('A public hostname is required.');

  parsed.hash = '';
  if (modern) return parsed.toString();
  parsed.hostname = hostname;
  parsed.host = null;
  return urlLibrary.format(parsed);
}

function endsWith(value, suffix) {
  return value.slice(-suffix.length) === suffix;
}

function oneOf(values, value) {
  return values.indexOf(value) >= 0;
}

function normalizeProfiles(input) {
  if (!Array.isArray(input)) throw new Error('Profiles must be an array.');
  if (input.length < 1 || input.length > 8) throw new Error('Between one and eight profiles are required.');

  const seen = new Set();
  return input.map((profile, index) => {
    const id = text(profile && profile.id, 32).toLowerCase();
    const name = text(profile && profile.name, 40).trim();
    if (!/^[a-z0-9][a-z0-9_-]{0,31}$/.test(id)) throw new Error(`Profile ${index + 1} has an invalid id.`);
    if (seen.has(id)) throw new Error(`Profile id "${id}" is duplicated.`);
    if (!name) throw new Error(`Profile ${index + 1} requires a name.`);
    seen.add(id);

    if (!Array.isArray(profile.urls) || profile.urls.length < 1 || profile.urls.length > 6) {
      throw new Error(`Profile "${name}" needs between one and six addresses.`);
    }
    const urls = [...new Set(profile.urls.map(validatePublicHttpsUrl))];
    return { id, name, urls };
  });
}

function normalizeCommand(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Command must be an object.');
  const type = text(input.type, 32);

  switch (type) {
    case 'navigate':
      return {
        type,
        url: validatePublicHttpsUrl(input.url),
        profileId: input.profileId ? text(input.profileId, 32).toLowerCase() : null
      };
    case 'history': {
      const action = text(input.action, 16);
      if (!oneOf(['back', 'forward', 'reload'], action)) throw new Error('Invalid history action.');
      return { type, action };
    }
    case 'focus': {
      const direction = text(input.direction, 8);
      if (!oneOf(['up', 'down', 'left', 'right'], direction)) throw new Error('Invalid focus direction.');
      return { type, direction };
    }
    case 'activate':
    case 'pointerClick':
    case 'requestSnapshot':
      return { type };
    case 'scroll':
      return {
        type,
        dx: clampNumber(input.dx, -1920, 1920),
        dy: clampNumber(input.dy, -1920, 1920)
      };
    case 'pointer':
      return {
        type,
        dx: clampNumber(input.dx, -1000, 1000),
        dy: clampNumber(input.dy, -1000, 1000)
      };
    case 'text':
      return { type, value: text(input.value, 500), submit: Boolean(input.submit) };
    case 'media': {
      const action = text(input.action, 20);
      if (!MEDIA_ACTIONS.has(action)) throw new Error('Invalid media action.');
      const bounds = action === 'seekBy' ? [-600, 600] : [-1, 1];
      return { type, action, value: clampNumber(input.value, bounds[0], bounds[1]) };
    }
    case 'site': {
      const site = text(input.site, 20).toLowerCase();
      const action = text(input.action, 24);
      if (site !== 'bilibili' || !BILIBILI_ACTIONS.has(action)) throw new Error('Invalid site action.');
      if (action === 'quality') {
        const value = text(input.value, 8);
        if (!BILIBILI_QUALITY_VALUES.has(value)) throw new Error('Invalid Bilibili quality.');
        return { type, site, action, value };
      }
      if (action === 'speed') {
        const value = text(input.value, 8);
        if (!BILIBILI_SPEED_VALUES.has(value)) throw new Error('Invalid Bilibili playback speed.');
        return { type, site, action, value };
      }
      return { type, site, action };
    }
    case 'select': {
      const id = text(input.id, 24);
      if (!/^wr-[a-z0-9-]{1,20}$/i.test(id)) throw new Error('Invalid selectable element id.');
      return { type, id };
    }
    case 'overlay': {
      const action = text(input.action, 12);
      if (!oneOf(['show', 'hide', 'toggle'], action)) throw new Error('Invalid overlay action.');
      return { type, action };
    }
    default:
      throw new Error('Unknown command type.');
  }
}

function sanitizeSnapshot(items) {
  if (!Array.isArray(items)) return [];
  return items.slice(0, 150).map((item) => ({
    id: /^wr-[a-z0-9-]{1,20}$/i.test(String(item && item.id)) ? String(item.id) : '',
    kind: oneOf(['link', 'button', 'input', 'media', 'other'], item && item.kind) ? item.kind : 'other',
    label: text(item && item.label, 140).trim(),
    detail: text(item && item.detail, 100).trim(),
    selected: Boolean(item && item.selected)
  })).filter((item) => item.id && item.label);
}

function sanitizeTvMessage(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const kind = text(input.kind, 20);
  if (kind === 'page') {
    const rawSite = input.page && input.page.site;
    const site = rawSite && rawSite.id === 'bilibili' ? {
      id: 'bilibili',
      loginAvailable: Boolean(rawSite.loginAvailable),
      loggedIn: Boolean(rawSite.loggedIn),
      danmakuEnabled: typeof rawSite.danmakuEnabled === 'boolean' ? rawSite.danmakuEnabled : null,
      quality: text(rawSite.quality, 40),
      playbackRate: clampNumber(rawSite.playbackRate, 0.5, 2, 1)
    } : null;
    return {
      kind,
      page: {
        title: text(input.page && input.page.title, 180),
        url: text(input.page && input.page.url, 2048),
        hostname: text(input.page && input.page.hostname, 253),
        adapter: text(input.page && input.page.adapter, 40),
        readyState: text(input.page && input.page.readyState, 20),
        site
      }
    };
  }
  if (kind === 'snapshot') return { kind, items: sanitizeSnapshot(input.items) };
  if (kind === 'player') {
    const player = input.player || {};
    return {
      kind,
      player: {
        found: Boolean(player.found),
        paused: Boolean(player.paused),
        currentTime: clampNumber(player.currentTime, 0, 864000),
        duration: clampNumber(player.duration, 0, 864000),
        volume: clampNumber(player.volume, 0, 1, 1),
        muted: Boolean(player.muted),
        captions: Boolean(player.captions)
      }
    };
  }
  if (kind === 'log') {
    return { kind, level: oneOf(['info', 'warn', 'error'], input.level) ? input.level : 'info', message: text(input.message, 300) };
  }
  if (kind === 'pong') return { kind, at: Date.now() };
  return null;
}

module.exports = {
  DEFAULT_PROFILES,
  clampNumber,
  normalizeCommand,
  normalizeProfiles,
  sanitizeTvMessage,
  text,
  validatePublicHttpsUrl
};
