'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('TV page bridge relinquishes ownership during navigation and resumes from bfcache safely', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'injected', 'index.js'), 'utf8');
  assert.match(source, /window\.addEventListener\('pagehide', suspendBridge\)/);
  assert.match(source, /window\.addEventListener\('pageshow', resumeBridge\)/);
  assert.match(source, /if \(!pageActive \|\| socket !== nextSocket\)/);
  assert.match(source, /clearTimeout\(reconnectTimer\)/);
  assert.match(source, /previousSocket\.close\(1000, 'Page navigation'\)/);
});

test('pairing overlay starts hidden until persistent service state is restored', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'injected', 'index.js'), 'utf8');
  assert.match(source, /let overlayVisible = false/);
  assert.match(source, /applyOverlayState\(serviceInfo\)/);
  assert.match(source, /kind: 'overlay', visible: overlayVisible, pinned: overlayPinned/);
});

test('player discovery handles shadow media and Bilibili UI fallbacks', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'injected', 'index.js'), 'utf8');
  assert.match(source, /function allVideosDeep\(\)/);
  assert.match(source, /element\.shadowRoot/);
  assert.match(source, /adapter\.mediaAction && adapter\.mediaAction/);
  assert.match(source, /relayToEmbeddedPlayer/);
});
