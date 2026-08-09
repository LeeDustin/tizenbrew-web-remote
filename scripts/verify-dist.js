'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
assert.equal(packageJson.packageType, 'mods');
assert.equal(packageJson.version, '0.2.8');
assert.equal(packageJson.websiteURL, 'https://www.bilibili.com/');
assert.notEqual(
  packageJson.evaluateScriptOnDocumentStart,
  true,
  'TizenBrew 2.0.5 does not immediately navigate modules using document-start injection.'
);

for (const relativePath of [
  packageJson.main,
  packageJson.serviceFile,
  'dist/controller/index.html',
  'dist/controller/app.js',
  'dist/controller/styles.css',
  'dist/controller/manifest.webmanifest',
  'dist/controller/icon.svg'
]) {
  const absolutePath = path.join(root, relativePath);
  assert.ok(fs.existsSync(absolutePath), `Missing distribution file: ${relativePath}`);
  assert.ok(fs.statSync(absolutePath).size > 0, `Empty distribution file: ${relativePath}`);
}

const injected = fs.readFileSync(path.join(root, packageJson.main), 'utf8');
assert.match(injected, /127\.0\.0\.1/);
assert.doesNotMatch(injected, /eval\s*\(/);
assert.doesNotMatch(injected, /new Function\s*\(/);
assert.match(injected, /function createQrCanvas/);
assert.match(injected, /getModuleCount/);
assert.match(injected, /overlay\.qr\.appendChild\(canvas\)/);
assert.match(injected, /api\/tv-info/);
assert.match(injected, /keyCode === 10009/);
assert.match(injected, /tizenhwkey/);
assert.match(injected, /PAIRING_SEQUENCE/);
assert.match(injected, /Remote recovery/);
assert.match(injected, /ColorF0Red/);
assert.match(injected, /kind:\s*["']recovery["']/);
assert.doesNotMatch(injected, /overlayHideTimer/);
assert.match(injected, /pagehide/);
assert.match(injected, /pageshow/);
assert.match(injected, /web-remote-tv-frame-v1/);
assert.match(injected, /window\.top !== window\.self/);

const controllerHtml = fs.readFileSync(path.join(root, 'dist/controller/index.html'), 'utf8');
const ids = [...controllerHtml.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Controller HTML contains duplicate ids.');
assert.doesNotMatch(controllerHtml, /\son[a-z]+=/i, 'Inline event handlers violate the controller CSP.');
assert.doesNotMatch(controllerHtml, /<script(?![^>]+src=)/i, 'Inline scripts violate the controller CSP.');
for (const requiredId of ['pairForm', 'remoteView', 'toggleAllSections', 'showTvOverlay', 'hideTvOverlay', 'profiles', 'bilibiliPanel', 'bilibiliResultsPanel', 'bilibiliResults', 'bilibiliQuality', 'fillTvButton', 'touchpad', 'playerPanel', 'pageItems', 'forgetButton']) {
  assert.ok(ids.includes(requiredId), `Controller is missing #${requiredId}.`);
}

const service = fs.readFileSync(path.join(root, packageJson.serviceFile), 'utf8');
assert.match(service, /Web Remote TV service/);
assert.match(service, new RegExp(`APP_VERSION = ["']${packageJson.version.replace(/\./g, '\\.')}["']`));
assert.match(service, /<!doctype html>/);
assert.match(service, /phone UI is embedded below/);

const previousAutostart = process.env.WEB_REMOTE_NO_AUTOSTART;
process.env.WEB_REMOTE_NO_AUTOSTART = '1';
const sandbox = {};
for (const property of Object.getOwnPropertyNames(global)) sandbox[property] = global[property];
sandbox.require = require;
sandbox.module = { exports: {} };
vm.runInContext(service, vm.createContext(sandbox), { timeout: 5000 });
assert.equal(typeof sandbox.module.exports.createRemoteServer, 'function');

const legacySandbox = {};
for (const property of Object.getOwnPropertyNames(global)) legacySandbox[property] = global[property];
legacySandbox.process = {
  env: { WEB_REMOTE_NO_AUTOSTART: '1' },
  version: 'v4.4.3',
  uptime: process.uptime.bind(process)
};
legacySandbox.require = (name) => name === 'ws-old' ? require('ws') : require(name);
legacySandbox.module = { exports: {} };
vm.runInContext(service, vm.createContext(legacySandbox), { timeout: 5000 });
assert.equal(typeof legacySandbox.module.exports.createRemoteServer, 'function');
if (previousAutostart === undefined) delete process.env.WEB_REMOTE_NO_AUTOSTART;
else process.env.WEB_REMOTE_NO_AUTOSTART = previousAutostart;

assert.doesNotMatch(service, /require\(["']node:/);
assert.doesNotMatch(service, /require\(["']ws(?:-old|-new)?["']\)/, 'WebSocket must be bundled for TizenBrew\'s VM loader.');

console.log('Distribution verification passed.');
