'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createPairingShortcut, remoteKey } = require('../src/injected/recovery');

test('remote pairing shortcut recognizes standard Tizen arrow and OK keys', () => {
  assert.equal(remoteKey({ keyCode: 38 }), 'up');
  assert.equal(remoteKey({ key: 'ArrowDown' }), 'down');
  assert.equal(remoteKey({ keyName: 'Done' }), 'ok');

  let opened = 0;
  let currentTime = 1000;
  const shortcut = createPairingShortcut(() => { opened += 1; }, { now: () => currentTime });
  const events = [38, 38, 40, 40, 13].map((keyCode) => ({
    keyCode,
    preventDefault() { this.prevented = true; },
    stopPropagation() { this.stopped = true; },
    stopImmediatePropagation() { this.immediate = true; }
  }));

  events.forEach((event) => {
    currentTime += 200;
    shortcut(event);
  });
  assert.equal(opened, 1);
  assert.equal(events[4].prevented, true);
  assert.equal(events[4].immediate, true);
});

test('remote pairing shortcut resets after a long pause or wrong key', () => {
  let opened = 0;
  let currentTime = 1000;
  const shortcut = createPairingShortcut(() => { opened += 1; }, { now: () => currentTime, maximumGap: 500 });
  [38, 38].forEach((keyCode) => shortcut({ keyCode }));
  currentTime += 800;
  [40, 40, 13].forEach((keyCode) => shortcut({ keyCode }));
  assert.equal(opened, 0);

  [38, 38, 37, 40, 40, 13].forEach((keyCode) => shortcut({ keyCode }));
  assert.equal(opened, 0);
});
