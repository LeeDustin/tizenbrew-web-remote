'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseHTML } = require('linkedom');

test('phone remote groups secondary controls into collapsible smart-view sections', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'src', 'controller', 'index.html'), 'utf8');
  const { document } = parseHTML(html);
  const sectionIds = ['sitesPanel', 'textPanel', 'bilibiliPanel', 'manualPanel', 'playerPanel', 'itemsPanel'];

  for (const id of sectionIds) {
    const panel = document.getElementById(id);
    assert.equal(panel.tagName, 'DETAILS', `${id} should be collapsible`);
    assert.ok(panel.querySelector(':scope > summary'), `${id} should have a summary`);
    assert.ok(panel.dataset.section, `${id} should persist its open state`);
  }

  assert.ok(document.getElementById('toggleAllSections'));
  assert.equal(document.getElementById('fillTvButton').textContent, 'Fill TV');
  assert.equal(document.getElementById('fillTvButton').dataset.media, 'fullscreen');
  assert.equal(document.getElementById('bilibiliPlayerActions').closest('details').id, 'playerPanel');
  assert.ok(document.getElementById('bilibiliPlaybackSettings').hidden);
});
