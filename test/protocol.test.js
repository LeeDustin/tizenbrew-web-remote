'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  DEFAULT_PROFILES,
  normalizeCommand,
  normalizeProfiles,
  sanitizeTvMessage,
  validatePublicHttpsUrl
} = require('../src/service/protocol');

test('public URL validation accepts normal HTTPS domains and normalizes fragments', () => {
  assert.equal(validatePublicHttpsUrl('https://www.1shows.org/watch/123#player'), 'https://www.1shows.org/watch/123');
});

test('public URL validation rejects local targets, credentials, IPs, and unsafe schemes', () => {
  for (const value of [
    'http://example.com/',
    'https://user:pass@example.com/',
    'https://localhost/',
    'https://router.local/',
    'https://192.168.1.1/',
    'https://2130706433/',
    'https://0x7f000001/',
    'https://[::1]/',
    'https://example.com@127.0.0.1/',
    'javascript:alert(1)'
  ]) {
    assert.throws(() => validatePublicHttpsUrl(value), Error, value);
  }
});

test('profile normalization limits count, ids, and domain lists', () => {
  const profiles = normalizeProfiles([
    { id: '1shows', name: '1Shows', urls: ['https://www.1shows.org/', 'https://www.1shows.org/'] },
    { id: 'cineby', name: 'Cineby', urls: ['https://cineby.at/'] }
  ]);
  assert.equal(profiles.length, 2);
  assert.deepEqual(profiles[0].urls, ['https://www.1shows.org/']);
  assert.throws(() => normalizeProfiles([{ id: '../bad', name: 'Bad', urls: ['https://example.com/'] }]));
  assert.throws(() => normalizeProfiles([{ id: 'same', name: 'One', urls: ['https://example.com/'] }, { id: 'same', name: 'Two', urls: ['https://example.org/'] }]));
});

test('default profiles start with Bilibili and keep 1Shows available', () => {
  assert.equal(DEFAULT_PROFILES[0].id, 'bilibili');
  assert.deepEqual(DEFAULT_PROFILES.find((profile) => profile.id === 'bilibili').urls, ['https://www.bilibili.com/']);
  assert.deepEqual(DEFAULT_PROFILES.find((profile) => profile.id === '1shows').urls, ['https://www.1shows.org/']);
});

test('command normalization uses an allowlist and clamps numeric values', () => {
  assert.deepEqual(normalizeCommand({ type: 'focus', direction: 'left' }), { type: 'focus', direction: 'left' });
  assert.deepEqual(normalizeCommand({ type: 'pointer', dx: 9000, dy: -9000 }), { type: 'pointer', dx: 1000, dy: -1000 });
  assert.deepEqual(normalizeCommand({ type: 'media', action: 'seekBy', value: 9999 }), { type: 'media', action: 'seekBy', value: 600 });
  assert.deepEqual(normalizeCommand({ type: 'site', site: 'bilibili', action: 'danmaku' }), { type: 'site', site: 'bilibili', action: 'danmaku' });
  assert.deepEqual(normalizeCommand({ type: 'site', site: 'bilibili', action: 'quality', value: '80' }), { type: 'site', site: 'bilibili', action: 'quality', value: '80' });
  assert.deepEqual(normalizeCommand({ type: 'site', site: 'bilibili', action: 'speed', value: 1.5 }), { type: 'site', site: 'bilibili', action: 'speed', value: '1.5' });
  assert.throws(() => normalizeCommand({ type: 'site', site: 'bilibili', action: 'quality', value: '999' }), /Invalid Bilibili quality/);
  assert.throws(() => normalizeCommand({ type: 'site', site: 'bilibili', action: 'like' }), /Invalid site action/);
  assert.throws(() => normalizeCommand({ type: 'eval', code: 'process.exit()' }), /Unknown command/);
  assert.throws(() => normalizeCommand({ type: 'history', action: 'openDevTools' }), /Invalid history/);
});

test('TV state is bounded before it reaches a phone', () => {
  const message = sanitizeTvMessage({
    kind: 'snapshot',
    items: Array.from({ length: 200 }, (_, index) => ({
      id: `wr-a-${index.toString(36)}`,
      kind: 'link',
      label: `Item ${index} ${'x'.repeat(300)}`,
      detail: 'detail'
    }))
  });
  assert.equal(message.items.length, 150);
  assert.ok(message.items.every((item) => item.label.length <= 140));

  const page = sanitizeTvMessage({
    kind: 'page',
    page: {
      adapter: 'bilibili',
      site: {
        id: 'bilibili',
        loginAvailable: true,
        danmakuEnabled: true,
        quality: 'Q'.repeat(100),
        playbackRate: 99,
        playerAvailable: true,
        webFullscreenActive: true
      }
    }
  });
  assert.equal(page.page.site.quality.length, 40);
  assert.equal(page.page.site.playbackRate, 2);
  assert.equal(page.page.site.danmakuEnabled, true);
  assert.equal(page.page.site.playerAvailable, true);
  assert.equal(page.page.site.webFullscreenActive, true);
});
