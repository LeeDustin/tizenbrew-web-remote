'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseHTML } = require('linkedom');

test('phone remote groups secondary controls into collapsible smart-view sections', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'src', 'controller', 'index.html'), 'utf8');
  const { document } = parseHTML(html);
  const sectionIds = ['sitesPanel', 'textPanel', 'bilibiliResultsPanel', 'bilibiliPanel', 'manualPanel', 'playerPanel', 'itemsPanel'];

  for (const id of sectionIds) {
    const panel = document.getElementById(id);
    assert.equal(panel.tagName, 'DETAILS', `${id} should be collapsible`);
    assert.ok(panel.querySelector(':scope > summary'), `${id} should have a summary`);
    assert.ok(panel.dataset.section, `${id} should persist its open state`);
  }

  assert.ok(document.getElementById('toggleAllSections'));
  assert.equal(document.getElementById('showTvOverlay').textContent, 'Pair another phone');
  assert.equal(document.getElementById('hideTvOverlay').textContent, 'Hide pairing screen');
  assert.equal(document.getElementById('fillTvButton').textContent, 'Fill TV');
  assert.equal(document.getElementById('fillTvButton').dataset.media, 'fullscreen');
  assert.equal(document.getElementById('bilibiliPlayerActions').closest('details').id, 'playerPanel');
  assert.ok(document.getElementById('bilibiliPlaybackSettings').hidden);
  assert.ok(document.getElementById('bilibiliResults'));
  assert.ok(document.getElementById('bilibiliResultFilter'));
  assert.equal(document.getElementById('dpadPanel').hidden, true);
  assert.equal(document.getElementById('touchPanel').hidden, false);
  assert.deepEqual(Array.from(document.getElementById('touchMode').options).map((option) => option.value), ['pointer', 'scroll', 'dpad']);
  assert.equal(document.getElementById('seekBack').dataset.value, '-5');
  assert.equal(document.getElementById('seekForward').dataset.value, '5');
  assert.deepEqual(Array.from(document.getElementById('seekStep').options).map((option) => option.value), ['5', '10', '15', '30', '60']);
  assert.equal(document.getElementById('danmakuButton').dataset.bilibiliAction, 'danmaku');
});

test('phone WebSocket reconnects cannot multiply active connections', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'controller', 'app.js'), 'utf8');
  assert.match(source, /socket\.readyState === WebSocket\.CONNECTING/);
  assert.match(source, /if \(socket !== nextSocket\) return;/);
  assert.doesNotMatch(source, /socket\.onclose = null/);
});

test('television title cannot expand the phone remote viewport', () => {
  const styles = fs.readFileSync(path.join(__dirname, '..', 'src', 'controller', 'styles.css'), 'utf8');
  const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'controller', 'app.js'), 'utf8');

  assert.match(styles, /#pageTitle\s*\{[^}]*overflow:\s*hidden;/s);
  assert.match(styles, /#pageTitle\s*\{[^}]*overflow-wrap:\s*anywhere;/s);
  assert.match(styles, /#pageTitle\s*\{[^}]*-webkit-line-clamp:\s*2;/s);
  assert.match(styles, /\.now-playing\s*>\s*div:first-child\s*\{[^}]*max-width:\s*100%;/s);
  assert.match(source, /dom\.pageTitle\.title = dom\.pageTitle\.textContent/);
});

test('scroll gestures are direct, sensitive, and retain flick momentum', () => {
  const controller = fs.readFileSync(path.join(__dirname, '..', 'src', 'controller', 'app.js'), 'utf8');
  const injected = fs.readFileSync(path.join(__dirname, '..', 'src', 'injected', 'index.js'), 'utf8');

  assert.match(controller, /SCROLL_SENSITIVITY = 3\.5/);
  assert.match(controller, /SCROLL_MOMENTUM_DECAY = 0\.88/);
  assert.match(controller, /requestAnimationFrame\(stepScrollMomentum\)/);
  assert.match(controller, /event\.type !== 'pointercancel'/);
  assert.match(injected, /window\.scrollBy\(command\.dx, command\.dy\)/);
  assert.doesNotMatch(injected, /command\.type === 'scroll'[^\n]+behavior:\s*'smooth'/);
});
