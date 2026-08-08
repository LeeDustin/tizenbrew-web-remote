/* Web Remote TV service - generated. The phone UI is embedded below; edit src/ instead. */
"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = function __esm(fn, res) {
  return function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
};
var __commonJS = function __commonJS(cb, mod) {
  return function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
      exports: {}
    }).exports, mod), mod.exports;
  };
};

// <define:__WEB_REMOTE_CONTROLLER_ASSETS__>
var define_WEB_REMOTE_CONTROLLER_ASSETS_default;
var init_define_WEB_REMOTE_CONTROLLER_ASSETS = __esm({
  "<define:__WEB_REMOTE_CONTROLLER_ASSETS__>"() {
    define_WEB_REMOTE_CONTROLLER_ASSETS_default = {
      "index.html": `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#07111f">
  <title>Web Remote TV</title>
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header class="app-header">
    <div class="brand-mark" aria-hidden="true">\u2197</div>
    <div class="brand-copy">
      <h1>Web Remote TV</h1>
      <p id="connectionLabel">Connecting to television\u2026</p>
    </div>
    <span id="connectionDot" class="status-dot" aria-label="Disconnected"></span>
  </header>

  <main>
    <section id="pairView" class="panel pair-panel">
      <p class="eyebrow">Private local pairing</p>
      <h2>Enter the PIN from your TV</h2>
      <p class="muted">Your phone and TV must be connected to the same local network.</p>
      <form id="pairForm">
        <label for="pinInput">Six-digit PIN</label>
        <input id="pinInput" name="pin" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" placeholder="000000" required>
        <button class="primary wide" type="submit">Pair phone</button>
      </form>
      <p id="pairError" class="error" role="alert"></p>
    </section>

    <div id="remoteView" hidden>
      <section class="panel now-playing">
        <div>
          <p class="eyebrow">On television</p>
          <h2 id="pageTitle">Waiting for page\u2026</h2>
          <p id="pageUrl" class="muted ellipsis"></p>
        </div>
        <button id="showTvOverlay" class="ghost compact" type="button">Pairing screen</button>
      </section>

      <section class="panel">
        <div class="section-heading">
          <div><p class="eyebrow">Website</p><h2>Choose source</h2></div>
          <button id="editSitesButton" class="ghost compact" type="button">Edit domains</button>
        </div>
        <div id="profiles" class="profiles"></div>
      </section>

      <section id="sitesEditor" class="panel" hidden>
        <div class="section-heading">
          <div><p class="eyebrow">Configuration</p><h2>Domains</h2></div>
          <button id="closeSitesButton" class="ghost compact" type="button">Close</button>
        </div>
        <p class="muted">One public HTTPS address per line. The first address is preferred.</p>
        <form id="sitesForm">
          <div id="profileEditors"></div>
          <div class="inline-actions">
            <button id="addProfileButton" class="ghost" type="button">Add custom site</button>
            <button class="primary" type="submit">Save domains</button>
          </div>
        </form>
        <p id="sitesError" class="error" role="alert"></p>
      </section>

      <section class="panel">
        <p class="eyebrow">Keyboard</p>
        <h2>Search or enter text</h2>
        <form id="textForm" class="text-form">
          <input id="textInput" type="search" autocomplete="off" placeholder="Movie, show, or text\u2026">
          <button class="ghost" type="button" id="sendTextButton">Send</button>
          <button class="primary" type="submit">Search</button>
        </form>
      </section>

      <section id="bilibiliPanel" class="panel bilibili-panel" hidden>
        <div class="section-heading">
          <div><p class="eyebrow">Bilibili</p><h2>Desktop web controls</h2></div>
          <span id="bilibiliStatus" class="site-status">Ready</span>
        </div>
        <div class="site-actions">
          <button class="primary" data-bilibili-action="login" type="button">Login / QR</button>
          <button data-bilibili-action="home" type="button">Bilibili home</button>
          <button data-bilibili-action="danmaku" type="button">Toggle danmu</button>
          <button data-bilibili-action="previous" type="button">Previous</button>
          <button data-bilibili-action="next" type="button">Next</button>
          <button data-bilibili-action="wide" type="button">Wide mode</button>
          <button data-bilibili-action="webFullscreen" type="button">Web fullscreen</button>
        </div>
        <div class="site-selectors">
          <label for="bilibiliQuality">Quality
            <select id="bilibiliQuality">
              <option value="0">Auto</option>
              <option value="116">1080P 60fps (VIP)</option>
              <option value="80">1080P</option>
              <option value="64">720P</option>
              <option value="32">480P</option>
              <option value="16">360P</option>
            </select>
          </label>
          <button id="applyBilibiliQuality" type="button">Apply quality</button>
          <label for="bilibiliSpeed">Speed
            <select id="bilibiliSpeed">
              <option value="0.5">0.5\xD7</option>
              <option value="0.75">0.75\xD7</option>
              <option value="1" selected>1\xD7</option>
              <option value="1.25">1.25\xD7</option>
              <option value="1.5">1.5\xD7</option>
              <option value="2">2\xD7</option>
            </select>
          </label>
          <button id="applyBilibiliSpeed" type="button">Apply speed</button>
        </div>
        <p class="hint">Login opens Bilibili's own dialog on the TV. Scan its QR code with the Bilibili app; credentials never pass through this remote.</p>
      </section>

      <section class="control-grid">
        <div class="panel dpad-panel">
          <p class="eyebrow">Navigation</p>
          <div class="dpad" aria-label="Directional navigation">
            <button data-focus="up" class="up" type="button" aria-label="Up">\u25B2</button>
            <button data-focus="left" class="left" type="button" aria-label="Left">\u25C0</button>
            <button id="activateButton" class="ok" type="button">OK</button>
            <button data-focus="right" class="right" type="button" aria-label="Right">\u25B6</button>
            <button data-focus="down" class="down" type="button" aria-label="Down">\u25BC</button>
          </div>
          <div class="three-buttons">
            <button data-history="back" class="ghost" type="button">Back</button>
            <button data-history="reload" class="ghost" type="button">Reload</button>
            <button data-history="forward" class="ghost" type="button">Forward</button>
          </div>
        </div>

        <div class="panel touch-panel">
          <div class="section-heading">
            <div><p class="eyebrow">Touchpad</p><h2>Pointer</h2></div>
            <label class="mode"><span>Mode</span><select id="touchMode"><option value="pointer">Pointer</option><option value="scroll">Scroll</option></select></label>
          </div>
          <div id="touchpad" class="touchpad" tabindex="0" aria-label="TV touchpad">
            <span>Drag to move \xB7 Tap to click</span>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="section-heading">
          <div><p class="eyebrow">Playback</p><h2 id="playerStatus">No accessible player</h2></div>
          <span id="playerTime" class="time">--:-- / --:--</span>
        </div>
        <div class="media-controls">
          <button data-media="seekBy" data-value="-30" type="button">\u221230s</button>
          <button data-media="toggle" class="primary play" type="button">Play / Pause</button>
          <button data-media="seekBy" data-value="30" type="button">+30s</button>
          <button data-media="volumeBy" data-value="-0.1" type="button">Vol \u2212</button>
          <button data-media="captions" type="button">CC</button>
          <button data-media="volumeBy" data-value="0.1" type="button">Vol +</button>
          <button data-media="fullscreen" class="wide-control" type="button">Fullscreen</button>
        </div>
        <p class="hint">If the player is inside a protected cross-origin frame, use site buttons or the TV remote for its internal controls.</p>
      </section>

      <section class="panel">
        <div class="section-heading">
          <div><p class="eyebrow">Current page</p><h2>Visible controls</h2></div>
          <button id="refreshItems" class="ghost compact" type="button">Refresh</button>
        </div>
        <input id="itemFilter" class="filter" type="search" placeholder="Filter visible buttons and titles\u2026">
        <div id="pageItems" class="page-items"><p class="muted">Waiting for the television\u2026</p></div>
      </section>

      <details class="panel diagnostics">
        <summary>Diagnostics and connection</summary>
        <dl>
          <div><dt>TV bridge</dt><dd id="diagTv">\u2014</dd></div>
          <div><dt>Navigation</dt><dd id="diagNavigation">\u2014</dd></div>
          <div><dt>Adapter</dt><dd id="diagAdapter">\u2014</dd></div>
          <div><dt>Phone socket</dt><dd id="diagSocket">\u2014</dd></div>
          <div><dt>Last TV warning</dt><dd id="diagError">none</dd></div>
        </dl>
        <button id="forgetButton" class="danger" type="button">Forget this television</button>
      </details>

      <p id="toast" class="toast" role="status" aria-live="polite"></p>
    </div>
  </main>

  <script src="/app.js" defer></script>
</body>
</html>
`,
      "app.js": "'use strict';\n\n(function startController() {\n  const TOKEN_KEY = 'webRemoteTvToken';\n  const CONFIG_KEY = 'webRemoteTvProfiles';\n  const BILIBILI_PROFILE = { id: 'bilibili', name: 'Bilibili', urls: ['https://www.bilibili.com/'] };\n  const dom = {};\n  let token = localStorage.getItem(TOKEN_KEY) || '';\n  let socket = null;\n  let reconnectTimer = null;\n  let state = null;\n  let serviceInfo = null;\n  let editorProfiles = [];\n  let toastTimer = null;\n  let configRestored = false;\n  let pointerSession = null;\n  let pointerPending = { dx: 0, dy: 0 };\n  let pointerFrame = null;\n\n  function byId(id) { return document.getElementById(id); }\n\n  function cacheDom() {\n    for (const id of [\n      'connectionLabel', 'connectionDot', 'pairView', 'remoteView', 'pairForm', 'pinInput', 'pairError',\n      'pageTitle', 'pageUrl', 'showTvOverlay', 'profiles', 'editSitesButton', 'sitesEditor', 'closeSitesButton',\n      'sitesForm', 'profileEditors', 'addProfileButton', 'sitesError', 'textForm', 'textInput', 'sendTextButton',\n      'bilibiliPanel', 'bilibiliStatus', 'bilibiliQuality', 'applyBilibiliQuality', 'bilibiliSpeed', 'applyBilibiliSpeed',\n      'activateButton', 'touchMode', 'touchpad', 'playerStatus', 'playerTime', 'refreshItems', 'itemFilter',\n      'pageItems', 'diagTv', 'diagNavigation', 'diagAdapter', 'diagSocket', 'diagError', 'forgetButton', 'toast'\n    ]) dom[id] = byId(id);\n  }\n\n  function showToast(message) {\n    clearTimeout(toastTimer);\n    dom.toast.textContent = message;\n    dom.toast.classList.add('visible');\n    toastTimer = setTimeout(() => dom.toast.classList.remove('visible'), 2400);\n  }\n\n  async function api(path, options) {\n    const response = await fetch(path, {\n      cache: 'no-store',\n      ...options,\n      headers: {\n        ...(token ? { Authorization: `Bearer ${token}` } : {}),\n        ...(options && options.body ? { 'Content-Type': 'application/json' } : {}),\n        ...((options && options.headers) || {})\n      }\n    });\n    const payload = await response.json().catch(() => ({}));\n    if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);\n    return payload;\n  }\n\n  function setConnection() {\n    const phoneConnected = socket && socket.readyState === WebSocket.OPEN;\n    const tvConnected = Boolean(state && state.tvConnected);\n    dom.connectionDot.classList.toggle('connected', phoneConnected && tvConnected);\n    dom.connectionDot.classList.toggle('partial', phoneConnected && !tvConnected);\n    dom.connectionDot.setAttribute('aria-label', phoneConnected && tvConnected ? 'Connected' : 'Disconnected');\n    dom.connectionLabel.textContent = !token ? 'Pair this phone'\n      : !phoneConnected ? 'Reconnecting to local service\u2026'\n        : tvConnected ? 'Phone and television connected'\n          : 'Phone connected \xB7 TV page bridge unavailable';\n    dom.diagSocket.textContent = phoneConnected ? 'connected' : 'disconnected';\n  }\n\n  function formatTime(seconds) {\n    if (!Number.isFinite(seconds) || seconds <= 0) return '--:--';\n    const whole = Math.floor(seconds);\n    const hours = Math.floor(whole / 3600);\n    const minutes = Math.floor((whole % 3600) / 60);\n    const rest = whole % 60;\n    return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}` : `${minutes}:${String(rest).padStart(2, '0')}`;\n  }\n\n  function renderState() {\n    setConnection();\n    if (!state) return;\n    const page = state.page || {};\n    const player = state.player || {};\n    dom.pageTitle.textContent = page.title || page.hostname || 'Waiting for page\u2026';\n    dom.pageUrl.textContent = page.url || '';\n    dom.playerStatus.textContent = player.found ? (player.paused ? 'Paused' : 'Playing') : 'No accessible top-level player';\n    dom.playerTime.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration)}`;\n    dom.diagTv.textContent = state.tvConnected ? 'connected' : 'not connected';\n    dom.diagNavigation.textContent = state.navigation ? state.navigation.status : 'idle';\n    dom.diagAdapter.textContent = page.adapter || 'unknown';\n    dom.diagError.textContent = state.lastLog ? state.lastLog.message : 'none';\n    renderBilibili(page);\n    renderProfiles();\n    renderItems();\n  }\n\n  function renderBilibili(page) {\n    const active = page.adapter === 'bilibili';\n    dom.bilibiliPanel.hidden = !active;\n    if (!active) return;\n    const site = page.site || {};\n    const status = [];\n    status.push(site.loggedIn ? 'Signed in' : site.loginAvailable ? 'Login available' : 'Account status unknown');\n    if (typeof site.danmakuEnabled === 'boolean') status.push(site.danmakuEnabled ? 'Danmu on' : 'Danmu off');\n    if (site.quality) status.push(site.quality);\n    dom.bilibiliStatus.textContent = status.join(' \xB7 ');\n\n    const rate = String(site.playbackRate || '');\n    if (Array.from(dom.bilibiliSpeed.options).some((option) => option.value === rate)) dom.bilibiliSpeed.value = rate;\n    const quality = String(site.quality || '').toLowerCase();\n    const qualityValue = /\u81EA\u52A8|auto/.test(quality) ? '0'\n      : /1080p\\s*60/.test(quality) ? '116'\n        : /1080p/.test(quality) ? '80'\n          : /720p/.test(quality) ? '64'\n            : /480p/.test(quality) ? '32'\n              : /360p/.test(quality) ? '16' : '';\n    if (qualityValue) dom.bilibiliQuality.value = qualityValue;\n  }\n\n  function renderProfiles() {\n    if (!serviceInfo || !Array.isArray(serviceInfo.profiles)) return;\n    dom.profiles.textContent = '';\n    for (const profile of serviceInfo.profiles) {\n      const row = document.createElement('div');\n      row.className = `profile${state && state.activeProfileId === profile.id ? ' active' : ''}`;\n      const name = document.createElement('span');\n      name.className = 'profile-name';\n      name.textContent = profile.name;\n      const select = document.createElement('select');\n      select.setAttribute('aria-label', `${profile.name} domain`);\n      profile.urls.forEach((url, index) => {\n        const option = document.createElement('option');\n        option.value = url;\n        option.textContent = profile.urls.length > 1 ? `${index + 1}. ${new URL(url).hostname}` : new URL(url).hostname;\n        select.appendChild(option);\n      });\n      const open = document.createElement('button');\n      open.type = 'button';\n      open.textContent = state && state.activeProfileId === profile.id ? 'Reload' : 'Open';\n      open.addEventListener('click', () => command({ type: 'navigate', profileId: profile.id, url: select.value }));\n      row.append(name, select, open);\n      dom.profiles.appendChild(row);\n    }\n  }\n\n  function renderItems() {\n    if (!state) return;\n    const query = dom.itemFilter.value.trim().toLowerCase();\n    const items = (state.items || []).filter((item) => !query || `${item.label} ${item.detail} ${item.kind}`.toLowerCase().includes(query));\n    dom.pageItems.textContent = '';\n    if (!items.length) {\n      const empty = document.createElement('p');\n      empty.className = 'muted';\n      empty.textContent = state.items && state.items.length ? 'No matching controls.' : 'No visible controls were discovered yet.';\n      dom.pageItems.appendChild(empty);\n      return;\n    }\n    for (const item of items) {\n      const button = document.createElement('button');\n      button.type = 'button';\n      button.className = 'page-item';\n      const kind = document.createElement('span');\n      kind.className = 'kind';\n      kind.textContent = item.kind;\n      const copy = document.createElement('span');\n      const label = document.createElement('span');\n      label.className = 'label';\n      label.textContent = item.label;\n      copy.appendChild(label);\n      if (item.detail) {\n        const detail = document.createElement('span');\n        detail.className = 'detail';\n        detail.textContent = item.detail;\n        copy.appendChild(detail);\n      }\n      button.append(kind, copy);\n      button.addEventListener('click', () => command({ type: 'select', id: item.id }));\n      dom.pageItems.appendChild(button);\n    }\n  }\n\n  function renderProfileEditors() {\n    dom.profileEditors.textContent = '';\n    editorProfiles.forEach((profile, index) => {\n      const fieldset = document.createElement('div');\n      fieldset.className = 'profile-editor';\n      const grid = document.createElement('div');\n      grid.className = 'profile-editor-grid';\n      const nameLabel = document.createElement('label');\n      nameLabel.textContent = 'Name';\n      const nameInput = document.createElement('input');\n      nameInput.value = profile.name;\n      nameInput.maxLength = 40;\n      nameInput.addEventListener('input', () => { profile.name = nameInput.value; });\n      nameLabel.appendChild(nameInput);\n      const urlsLabel = document.createElement('label');\n      urlsLabel.textContent = 'HTTPS domains (one per line)';\n      const urlsInput = document.createElement('textarea');\n      urlsInput.value = profile.urls.join('\\n');\n      urlsInput.addEventListener('input', () => { profile.urls = urlsInput.value.split(/\\r?\\n/).map((value) => value.trim()).filter(Boolean); });\n      urlsLabel.appendChild(urlsInput);\n      grid.append(nameLabel, urlsLabel);\n      fieldset.appendChild(grid);\n      if (!['1shows', 'cineby', 'bilibili'].includes(profile.id)) {\n        const remove = document.createElement('button');\n        remove.type = 'button';\n        remove.className = 'danger compact';\n        remove.textContent = 'Remove custom site';\n        remove.addEventListener('click', () => {\n          editorProfiles.splice(index, 1);\n          renderProfileEditors();\n        });\n        fieldset.appendChild(remove);\n      }\n      dom.profileEditors.appendChild(fieldset);\n    });\n  }\n\n  function openEditor() {\n    editorProfiles = JSON.parse(JSON.stringify((serviceInfo && serviceInfo.profiles) || []));\n    renderProfileEditors();\n    dom.sitesEditor.hidden = false;\n    dom.sitesEditor.scrollIntoView({ behavior: 'smooth', block: 'start' });\n  }\n\n  async function saveProfiles(event) {\n    event.preventDefault();\n    dom.sitesError.textContent = '';\n    try {\n      const active = editorProfiles.some((profile) => profile.id === (state && state.activeProfileId)) ? state.activeProfileId : editorProfiles[0].id;\n      const result = await api('/api/config', {\n        method: 'PUT',\n        body: JSON.stringify({ profiles: editorProfiles, activeProfileId: active })\n      });\n      serviceInfo.profiles = result.profiles;\n      serviceInfo.activeProfileId = result.activeProfileId;\n      localStorage.setItem(CONFIG_KEY, JSON.stringify(result));\n      dom.sitesEditor.hidden = true;\n      renderProfiles();\n      showToast('Domains saved on this TV session');\n    } catch (error) {\n      dom.sitesError.textContent = error.message;\n    }\n  }\n\n  async function restoreSavedConfig() {\n    if (configRestored || !token) return;\n    configRestored = true;\n    const raw = localStorage.getItem(CONFIG_KEY);\n    if (!raw) return;\n    try {\n      const saved = JSON.parse(raw);\n      if (Array.isArray(saved.profiles) && !saved.profiles.some((profile) => profile.id === 'bilibili')) {\n        saved.profiles.push(BILIBILI_PROFILE);\n      }\n      const result = await api('/api/config', { method: 'PUT', body: JSON.stringify(saved) });\n      if (serviceInfo) serviceInfo.profiles = result.profiles;\n      localStorage.setItem(CONFIG_KEY, JSON.stringify(result));\n    } catch (error) {\n      showToast(`Saved domains were not restored: ${error.message}`);\n    }\n  }\n\n  function handleMessage(message) {\n    if (message.kind === 'state') state = message.state;\n    if (message.kind === 'service_info') serviceInfo = message.info;\n    if (message.kind === 'error') showToast(message.error || 'Command failed');\n    renderState();\n  }\n\n  function connectSocket() {\n    clearTimeout(reconnectTimer);\n    if (!token) return;\n    if (socket) {\n      socket.onclose = null;\n      try { socket.close(); } catch { /* Already closed. */ }\n    }\n    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';\n    socket = new WebSocket(`${protocol}//${location.host}/ws?role=phone&token=${encodeURIComponent(token)}`);\n    socket.addEventListener('open', () => {\n      setConnection();\n      command({ type: 'requestSnapshot' }, false);\n    });\n    socket.addEventListener('message', (event) => {\n      try { handleMessage(JSON.parse(event.data)); } catch { /* Ignore malformed local messages. */ }\n    });\n    socket.addEventListener('close', () => {\n      setConnection();\n      reconnectTimer = setTimeout(connectSocket, 1800);\n    });\n    socket.addEventListener('error', setConnection);\n  }\n\n  async function command(value, announce = true) {\n    try {\n      if (socket && socket.readyState === WebSocket.OPEN) {\n        socket.send(JSON.stringify({ kind: 'command', requestId: String(Date.now()), command: value }));\n      } else {\n        await api('/api/command', { method: 'POST', body: JSON.stringify({ command: value }) });\n      }\n      if (announce && value.type === 'navigate') showToast(`Opening ${new URL(value.url).hostname}`);\n      if (announce && value.type === 'site') showToast('Bilibili control sent');\n    } catch (error) {\n      showToast(error.message);\n    }\n  }\n\n  async function pair(event) {\n    event.preventDefault();\n    dom.pairError.textContent = '';\n    try {\n      const payload = await api('/api/pair', {\n        method: 'POST',\n        body: JSON.stringify({ pin: dom.pinInput.value.trim(), clientName: navigator.userAgent.slice(0, 60) })\n      });\n      token = payload.token;\n      localStorage.setItem(TOKEN_KEY, token);\n      state = payload.state;\n      serviceInfo = payload.info;\n      dom.pairView.hidden = true;\n      dom.remoteView.hidden = false;\n      await restoreSavedConfig();\n      renderState();\n      connectSocket();\n    } catch (error) {\n      dom.pairError.textContent = error.message;\n    }\n  }\n\n  function flushPointer() {\n    pointerFrame = null;\n    const dx = pointerPending.dx;\n    const dy = pointerPending.dy;\n    pointerPending = { dx: 0, dy: 0 };\n    if (!dx && !dy) return;\n    if (dom.touchMode.value === 'scroll') command({ type: 'scroll', dx: -dx * 2, dy: -dy * 2 }, false);\n    else command({ type: 'pointer', dx: dx * 1.4, dy: dy * 1.4 }, false);\n  }\n\n  function pointerDown(event) {\n    dom.touchpad.setPointerCapture(event.pointerId);\n    dom.touchpad.classList.add('active');\n    pointerSession = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY };\n  }\n\n  function pointerMove(event) {\n    if (!pointerSession || pointerSession.id !== event.pointerId) return;\n    pointerPending.dx += event.clientX - pointerSession.x;\n    pointerPending.dy += event.clientY - pointerSession.y;\n    pointerSession.x = event.clientX;\n    pointerSession.y = event.clientY;\n    if (!pointerFrame) pointerFrame = requestAnimationFrame(flushPointer);\n  }\n\n  function pointerUp(event) {\n    if (!pointerSession || pointerSession.id !== event.pointerId) return;\n    const distance = Math.hypot(event.clientX - pointerSession.startX, event.clientY - pointerSession.startY);\n    if (distance < 9 && dom.touchMode.value === 'pointer') command({ type: 'pointerClick' }, false);\n    pointerSession = null;\n    dom.touchpad.classList.remove('active');\n  }\n\n  function bindEvents() {\n    dom.pairForm.addEventListener('submit', pair);\n    dom.showTvOverlay.addEventListener('click', () => command({ type: 'overlay', action: 'show' }, false));\n    dom.editSitesButton.addEventListener('click', openEditor);\n    dom.closeSitesButton.addEventListener('click', () => { dom.sitesEditor.hidden = true; });\n    dom.sitesForm.addEventListener('submit', saveProfiles);\n    dom.addProfileButton.addEventListener('click', () => {\n      const id = `custom-${Date.now().toString(36)}`;\n      editorProfiles.push({ id, name: 'Custom site', urls: ['https://example.com/'] });\n      renderProfileEditors();\n    });\n    dom.textForm.addEventListener('submit', (event) => {\n      event.preventDefault();\n      command({ type: 'text', value: dom.textInput.value, submit: true }, false);\n    });\n    dom.sendTextButton.addEventListener('click', () => command({ type: 'text', value: dom.textInput.value, submit: false }, false));\n    document.querySelectorAll('[data-bilibili-action]').forEach((button) => button.addEventListener('click', () => command({\n      type: 'site',\n      site: 'bilibili',\n      action: button.dataset.bilibiliAction\n    })));\n    dom.applyBilibiliQuality.addEventListener('click', () => command({ type: 'site', site: 'bilibili', action: 'quality', value: dom.bilibiliQuality.value }));\n    dom.applyBilibiliSpeed.addEventListener('click', () => command({ type: 'site', site: 'bilibili', action: 'speed', value: dom.bilibiliSpeed.value }));\n    document.querySelectorAll('[data-focus]').forEach((button) => button.addEventListener('click', () => command({ type: 'focus', direction: button.dataset.focus }, false)));\n    document.querySelectorAll('[data-history]').forEach((button) => button.addEventListener('click', () => command({ type: 'history', action: button.dataset.history }, false)));\n    dom.activateButton.addEventListener('click', () => command({ type: 'activate' }, false));\n    document.querySelectorAll('[data-media]').forEach((button) => button.addEventListener('click', () => command({\n      type: 'media',\n      action: button.dataset.media,\n      value: Number(button.dataset.value || 0)\n    }, false)));\n    dom.refreshItems.addEventListener('click', () => command({ type: 'requestSnapshot' }, false));\n    dom.itemFilter.addEventListener('input', renderItems);\n    dom.touchpad.addEventListener('pointerdown', pointerDown);\n    dom.touchpad.addEventListener('pointermove', pointerMove);\n    dom.touchpad.addEventListener('pointerup', pointerUp);\n    dom.touchpad.addEventListener('pointercancel', pointerUp);\n    dom.forgetButton.addEventListener('click', async () => {\n      try { await api('/api/session', { method: 'DELETE' }); } catch { /* Local cleanup still proceeds. */ }\n      localStorage.removeItem(TOKEN_KEY);\n      token = '';\n      if (socket) socket.close();\n      location.reload();\n    });\n  }\n\n  async function initialize() {\n    cacheDom();\n    bindEvents();\n    const pin = new URLSearchParams(location.search).get('pin');\n    if (pin) dom.pinInput.value = pin.replace(/\\D/g, '').slice(0, 6);\n    if (!token) {\n      dom.pairView.hidden = false;\n      dom.remoteView.hidden = true;\n      setConnection();\n      if (pin && dom.pinInput.value.length === 6) dom.pinInput.focus();\n      return;\n    }\n    try {\n      const payload = await api('/api/state');\n      state = payload.state;\n      serviceInfo = payload.info;\n      dom.pairView.hidden = true;\n      dom.remoteView.hidden = false;\n      await restoreSavedConfig();\n      renderState();\n      connectSocket();\n    } catch {\n      localStorage.removeItem(TOKEN_KEY);\n      token = '';\n      dom.pairView.hidden = false;\n      dom.remoteView.hidden = true;\n      setConnection();\n    }\n  }\n\n  document.addEventListener('DOMContentLoaded', initialize, { once: true });\n})();\n",
      "styles.css": ':root {\n  color-scheme: dark;\n  --bg: #07111f;\n  --panel: #101d2d;\n  --panel-2: #14253a;\n  --line: #263b52;\n  --text: #eef6ff;\n  --muted: #96abc1;\n  --accent: #38bdf8;\n  --accent-2: #0ea5e9;\n  --danger: #fb7185;\n  --safe-bottom: env(safe-area-inset-bottom, 0px);\n  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n}\n\n* { box-sizing: border-box; }\nhtml { background: var(--bg); }\nbody { margin: 0; min-height: 100vh; color: var(--text); background: radial-gradient(circle at 20% -10%, #12395a 0, transparent 37rem), var(--bg); }\nbutton, input, select, textarea { font: inherit; }\nbutton, select { touch-action: manipulation; }\n\n.app-header {\n  position: sticky;\n  top: 0;\n  z-index: 20;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-height: 72px;\n  padding: max(12px, env(safe-area-inset-top)) 18px 12px;\n  background: rgba(7, 17, 31, .91);\n  border-bottom: 1px solid rgba(77, 111, 145, .35);\n  backdrop-filter: blur(18px);\n}\n.brand-mark { display: grid; place-items: center; width: 42px; height: 42px; flex: 0 0 auto; border-radius: 13px; color: #00131d; background: var(--accent); font-size: 25px; font-weight: 900; }\n.brand-copy { min-width: 0; flex: 1; }\n.brand-copy h1 { margin: 0; font-size: 18px; }\n.brand-copy p { margin: 2px 0 0; color: var(--muted); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.status-dot { width: 12px; height: 12px; flex: 0 0 auto; border-radius: 50%; background: #64748b; box-shadow: 0 0 0 5px rgba(100, 116, 139, .15); }\n.status-dot.connected { background: #34d399; box-shadow: 0 0 0 5px rgba(52, 211, 153, .15); }\n.status-dot.partial { background: #fbbf24; box-shadow: 0 0 0 5px rgba(251, 191, 36, .15); }\n\nmain { width: min(920px, 100%); margin: 0 auto; padding: 16px 12px calc(30px + var(--safe-bottom)); }\n.panel { margin-bottom: 13px; padding: 17px; border: 1px solid var(--line); border-radius: 18px; background: linear-gradient(155deg, rgba(20, 37, 58, .96), rgba(12, 27, 43, .98)); box-shadow: 0 14px 45px rgba(0, 0, 0, .16); }\n.pair-panel { max-width: 480px; margin: 8vh auto 0; padding: 24px; }\n.pair-panel h2 { font-size: 25px; }\nh2 { margin: 2px 0 6px; font-size: 20px; line-height: 1.2; }\n.eyebrow { margin: 0 0 4px; color: var(--accent); font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }\n.muted, .hint { color: var(--muted); }\n.hint { margin: 12px 0 0; font-size: 12px; line-height: 1.45; }\n.ellipsis { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\nlabel { display: grid; gap: 7px; color: #c4d3e2; font-size: 13px; font-weight: 700; }\ninput, select, textarea { width: 100%; min-height: 48px; border: 1px solid #35506c; border-radius: 12px; outline: none; color: var(--text); background: #091725; padding: 11px 13px; }\ninput:focus, select:focus, textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(56, 189, 248, .15); }\ntextarea { min-height: 92px; resize: vertical; line-height: 1.45; }\n.pair-panel input { margin: 8px 0 12px; text-align: center; font-size: 30px; font-weight: 800; letter-spacing: .22em; }\n\nbutton { min-height: 46px; border: 1px solid #38536d; border-radius: 12px; color: var(--text); background: #19304a; padding: 9px 13px; font-weight: 750; cursor: pointer; }\nbutton:active { transform: scale(.975); filter: brightness(1.18); }\nbutton:focus-visible { outline: 3px solid rgba(56, 189, 248, .8); outline-offset: 2px; }\nbutton.primary { border-color: #38bdf8; color: #00151f; background: linear-gradient(145deg, #67d4ff, #0ea5e9); }\nbutton.ghost { background: transparent; }\nbutton.danger { border-color: rgba(251, 113, 133, .6); color: #fecdd3; background: rgba(136, 19, 55, .25); }\nbutton.compact { min-height: 38px; padding: 6px 10px; font-size: 12px; }\nbutton.wide { width: 100%; }\n.error { min-height: 1.25em; margin: 10px 0 0; color: #fda4af; font-size: 13px; }\n.section-heading, .now-playing { display: flex; align-items: center; justify-content: space-between; gap: 14px; }\n.section-heading > div:first-child, .now-playing > div:first-child { min-width: 0; }\n\n.profiles { display: grid; gap: 10px; margin-top: 14px; }\n.profile { display: grid; grid-template-columns: minmax(90px, .7fr) minmax(130px, 1.5fr) auto; gap: 9px; align-items: center; padding: 11px; border: 1px solid #2b455f; border-radius: 14px; background: rgba(5, 15, 26, .35); }\n.profile.active { border-color: var(--accent); background: rgba(14, 165, 233, .1); }\n.profile-name { font-weight: 800; }\n.profile select { min-height: 42px; padding: 8px 10px; font-size: 12px; }\n.profile button { min-height: 42px; }\n.profile-editor { margin: 13px 0; padding: 13px; border: 1px solid var(--line); border-radius: 14px; }\n.profile-editor-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 10px; }\n.inline-actions { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 9px; margin-top: 12px; }\n\n.text-form { display: grid; grid-template-columns: 1fr auto auto; gap: 8px; margin-top: 13px; }\n.site-status { flex: 0 0 auto; color: #f9a8d4; font-size: 12px; font-weight: 800; }\n.site-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 13px; }\n.site-selectors { display: grid; grid-template-columns: minmax(150px, 1fr) auto minmax(130px, .8fr) auto; gap: 8px; align-items: end; margin-top: 10px; }\n.site-selectors select { min-height: 42px; padding: 8px 10px; }\n.site-selectors button { min-height: 42px; }\n.control-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 13px; }\n.dpad-panel, .touch-panel { min-width: 0; }\n.dpad { display: grid; grid-template: repeat(3, 60px) / repeat(3, 60px); justify-content: center; gap: 7px; margin: 12px auto; }\n.dpad button { min-height: 60px; padding: 0; font-size: 20px; }\n.dpad .up { grid-area: 1 / 2; }\n.dpad .left { grid-area: 2 / 1; }\n.dpad .ok { grid-area: 2 / 2; border-radius: 50%; color: #00131d; background: var(--accent); }\n.dpad .right { grid-area: 2 / 3; }\n.dpad .down { grid-area: 3 / 2; }\n.three-buttons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }\n.mode { display: flex; align-items: center; gap: 7px; font-size: 11px; }\n.mode select { width: auto; min-height: 38px; padding: 6px 9px; }\n.touchpad { display: grid; place-items: center; height: 224px; margin-top: 12px; border: 1px solid #3c5a76; border-radius: 17px; color: #8ca8c1; background: radial-gradient(circle at 50% 42%, rgba(56, 189, 248, .11), transparent 55%), #081522; user-select: none; touch-action: none; }\n.touchpad.active { border-color: var(--accent); color: #d9f4ff; }\n\n.time { color: var(--muted); font-variant-numeric: tabular-nums; font-size: 13px; }\n.media-controls { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-top: 13px; }\n.media-controls .play { grid-column: span 2; }\n.media-controls .wide-control { grid-column: span 6; }\n.page-items { display: grid; gap: 8px; max-height: 54vh; overflow: auto; margin-top: 10px; padding-right: 2px; }\n.page-item { display: grid; grid-template-columns: 54px 1fr; gap: 10px; align-items: center; width: 100%; min-height: 56px; text-align: left; }\n.page-item .kind { color: var(--accent); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }\n.page-item .label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.page-item .detail { display: block; margin-top: 2px; color: var(--muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.filter { margin-top: 10px; }\n.diagnostics summary { cursor: pointer; font-weight: 800; }\n.diagnostics dl { display: grid; gap: 7px; }\n.diagnostics dl div { display: grid; grid-template-columns: 130px 1fr; gap: 12px; }\n.diagnostics dt { color: var(--muted); }\n.diagnostics dd { margin: 0; overflow-wrap: anywhere; }\n.toast { position: fixed; z-index: 30; left: 50%; bottom: calc(18px + var(--safe-bottom)); transform: translateX(-50%) translateY(20px); width: max-content; max-width: calc(100% - 28px); margin: 0; padding: 11px 15px; border: 1px solid #3a5872; border-radius: 999px; color: white; background: rgba(7, 17, 31, .96); opacity: 0; pointer-events: none; transition: opacity .18s, transform .18s; box-shadow: 0 12px 35px rgba(0,0,0,.4); }\n.toast.visible { opacity: 1; transform: translateX(-50%) translateY(0); }\n\n@media (max-width: 680px) {\n  .control-grid { grid-template-columns: 1fr; }\n  .profile { grid-template-columns: 86px 1fr; }\n  .profile button { grid-column: 1 / -1; }\n  .profile-editor-grid { grid-template-columns: 1fr; }\n  .text-form { grid-template-columns: 1fr 1fr; }\n  .text-form input { grid-column: 1 / -1; }\n  .site-actions { grid-template-columns: repeat(2, 1fr); }\n  .site-selectors { grid-template-columns: 1fr auto; }\n  .media-controls { grid-template-columns: repeat(3, 1fr); }\n  .media-controls .play { grid-column: span 1; }\n  .media-controls .wide-control { grid-column: span 3; }\n  .now-playing { align-items: flex-start; }\n}\n\n@media (max-width: 390px) {\n  main { padding-left: 8px; padding-right: 8px; }\n  .panel { padding: 14px; border-radius: 15px; }\n  .dpad { grid-template: repeat(3, 56px) / repeat(3, 56px); }\n  .dpad button { min-height: 56px; }\n  .three-buttons button { padding-left: 5px; padding-right: 5px; font-size: 12px; }\n}\n',
      "manifest.webmanifest": '{\n  "name": "Web Remote TV",\n  "short_name": "TV Remote",\n  "description": "Local phone controller for Web Remote TV on TizenBrew.",\n  "start_url": "/",\n  "display": "standalone",\n  "background_color": "#07111f",\n  "theme_color": "#07111f",\n  "icons": [\n    {\n      "src": "/icon.svg",\n      "sizes": "any",\n      "type": "image/svg+xml",\n      "purpose": "any maskable"\n    }\n  ]\n}\n',
      "icon.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n  <rect width="512" height="512" rx="112" fill="#07111f"/>\n  <rect x="72" y="94" width="368" height="252" rx="38" fill="#14253a" stroke="#38bdf8" stroke-width="20"/>\n  <path d="M188 418h136M256 346v72" stroke="#dff6ff" stroke-width="24" stroke-linecap="round"/>\n  <path d="M188 260l136-136M234 124h90v90" fill="none" stroke="#38bdf8" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n'
    };
  }
});

// src/service/protocol.js
var require_protocol = __commonJS({
  "src/service/protocol.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var net = require("net");
    var urlLibrary2 = require("url");
    var DEFAULT_PROFILES2 = Object.freeze([Object.freeze({
      id: "1shows",
      name: "1Shows",
      urls: Object.freeze(["https://www.1shows.org/"])
    }), Object.freeze({
      id: "cineby",
      name: "Cineby",
      urls: Object.freeze(["https://cineby.at/"])
    }), Object.freeze({
      id: "bilibili",
      name: "Bilibili",
      urls: Object.freeze(["https://www.bilibili.com/"])
    })]);
    var MEDIA_ACTIONS = /* @__PURE__ */new Set(["toggle", "play", "pause", "seekBy", "volumeBy", "captions", "fullscreen"]);
    var BILIBILI_ACTIONS = /* @__PURE__ */new Set(["login", "home", "danmaku", "previous", "next", "wide", "webFullscreen", "quality", "speed"]);
    var BILIBILI_QUALITY_VALUES = /* @__PURE__ */new Set(["0", "116", "80", "64", "32", "16"]);
    var BILIBILI_SPEED_VALUES = /* @__PURE__ */new Set(["0.5", "0.75", "1", "1.25", "1.5", "2"]);
    function clampNumber(value, minimum, maximum) {
      var fallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var number = Number(value);
      if (typeof number !== "number" || !isFinite(number)) return fallback;
      return Math.max(minimum, Math.min(maximum, number));
    }
    function text2(value) {
      var maximum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      return String(value == null ? "" : value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").slice(0, maximum);
    }
    function isPrivateIpv4(hostname) {
      var octets = hostname.split(".").map(Number);
      if (octets.length !== 4 || octets.some(function (part) {
        return Math.floor(part) !== part || part < 0 || part > 255;
      })) return false;
      return octets[0] === 10 || octets[0] === 127 || octets[0] === 169 && octets[1] === 254 || octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31 || octets[0] === 192 && octets[1] === 168 || octets[0] === 0;
    }
    function validatePublicHttpsUrl(value) {
      var parsed;
      var modern = typeof URL === "function";
      try {
        parsed = modern ? new URL(String(value)) : urlLibrary2.parse(String(value));
      } catch (_unused) {
        throw new Error("The address is not a valid URL.");
      }
      if (parsed.protocol !== "https:") throw new Error("Only public HTTPS addresses are allowed.");
      if (modern && (parsed.username || parsed.password) || !modern && parsed.auth) throw new Error("Addresses containing credentials are not allowed.");
      if (parsed.port && parsed.port !== "443") throw new Error("Custom ports are not allowed.");
      var hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
      if (!hostname || hostname.length > 253) throw new Error("The hostname is invalid.");
      if (hostname === "localhost" || endsWith(hostname, ".localhost") || endsWith(hostname, ".local") || endsWith(hostname, ".internal")) {
        throw new Error("Local-network hostnames are not allowed.");
      }
      if (net.isIP(hostname) === 6 || isPrivateIpv4(hostname)) throw new Error("IP addresses and private-network targets are not allowed.");
      if (hostname.indexOf(".") < 0) throw new Error("A public hostname is required.");
      parsed.hash = "";
      if (modern) return parsed.toString();
      parsed.hostname = hostname;
      parsed.host = null;
      return urlLibrary2.format(parsed);
    }
    function endsWith(value, suffix) {
      return value.slice(-suffix.length) === suffix;
    }
    function oneOf(values, value) {
      return values.indexOf(value) >= 0;
    }
    function normalizeProfiles2(input) {
      if (!Array.isArray(input)) throw new Error("Profiles must be an array.");
      if (input.length < 1 || input.length > 8) throw new Error("Between one and eight profiles are required.");
      var seen = /* @__PURE__ */new Set();
      return input.map(function (profile, index) {
        var id = text2(profile && profile.id, 32).toLowerCase();
        var name = text2(profile && profile.name, 40).trim();
        if (!/^[a-z0-9][a-z0-9_-]{0,31}$/.test(id)) throw new Error(`Profile ${index + 1} has an invalid id.`);
        if (seen.has(id)) throw new Error(`Profile id "${id}" is duplicated.`);
        if (!name) throw new Error(`Profile ${index + 1} requires a name.`);
        seen.add(id);
        if (!Array.isArray(profile.urls) || profile.urls.length < 1 || profile.urls.length > 6) {
          throw new Error(`Profile "${name}" needs between one and six addresses.`);
        }
        var urls = _toConsumableArray(new Set(profile.urls.map(validatePublicHttpsUrl)));
        return {
          id,
          name,
          urls
        };
      });
    }
    function normalizeCommand2(input) {
      if (!input || _typeof(input) !== "object" || Array.isArray(input)) throw new Error("Command must be an object.");
      var type = text2(input.type, 32);
      switch (type) {
        case "navigate":
          return {
            type,
            url: validatePublicHttpsUrl(input.url),
            profileId: input.profileId ? text2(input.profileId, 32).toLowerCase() : null
          };
        case "history":
          {
            var action = text2(input.action, 16);
            if (!oneOf(["back", "forward", "reload"], action)) throw new Error("Invalid history action.");
            return {
              type,
              action
            };
          }
        case "focus":
          {
            var direction = text2(input.direction, 8);
            if (!oneOf(["up", "down", "left", "right"], direction)) throw new Error("Invalid focus direction.");
            return {
              type,
              direction
            };
          }
        case "activate":
        case "pointerClick":
        case "requestSnapshot":
          return {
            type
          };
        case "scroll":
          return {
            type,
            dx: clampNumber(input.dx, -1920, 1920),
            dy: clampNumber(input.dy, -1920, 1920)
          };
        case "pointer":
          return {
            type,
            dx: clampNumber(input.dx, -1e3, 1e3),
            dy: clampNumber(input.dy, -1e3, 1e3)
          };
        case "text":
          return {
            type,
            value: text2(input.value, 500),
            submit: Boolean(input.submit)
          };
        case "media":
          {
            var _action = text2(input.action, 20);
            if (!MEDIA_ACTIONS.has(_action)) throw new Error("Invalid media action.");
            var bounds = _action === "seekBy" ? [-600, 600] : [-1, 1];
            return {
              type,
              action: _action,
              value: clampNumber(input.value, bounds[0], bounds[1])
            };
          }
        case "site":
          {
            var site = text2(input.site, 20).toLowerCase();
            var _action2 = text2(input.action, 24);
            if (site !== "bilibili" || !BILIBILI_ACTIONS.has(_action2)) throw new Error("Invalid site action.");
            if (_action2 === "quality") {
              var value = text2(input.value, 8);
              if (!BILIBILI_QUALITY_VALUES.has(value)) throw new Error("Invalid Bilibili quality.");
              return {
                type,
                site,
                action: _action2,
                value
              };
            }
            if (_action2 === "speed") {
              var _value = text2(input.value, 8);
              if (!BILIBILI_SPEED_VALUES.has(_value)) throw new Error("Invalid Bilibili playback speed.");
              return {
                type,
                site,
                action: _action2,
                value: _value
              };
            }
            return {
              type,
              site,
              action: _action2
            };
          }
        case "select":
          {
            var id = text2(input.id, 24);
            if (!/^wr-[a-z0-9-]{1,20}$/i.test(id)) throw new Error("Invalid selectable element id.");
            return {
              type,
              id
            };
          }
        case "overlay":
          {
            var _action3 = text2(input.action, 12);
            if (!oneOf(["show", "hide", "toggle"], _action3)) throw new Error("Invalid overlay action.");
            return {
              type,
              action: _action3
            };
          }
        default:
          throw new Error("Unknown command type.");
      }
    }
    function sanitizeSnapshot(items) {
      if (!Array.isArray(items)) return [];
      return items.slice(0, 150).map(function (item) {
        return {
          id: /^wr-[a-z0-9-]{1,20}$/i.test(String(item && item.id)) ? String(item.id) : "",
          kind: oneOf(["link", "button", "input", "media", "other"], item && item.kind) ? item.kind : "other",
          label: text2(item && item.label, 140).trim(),
          detail: text2(item && item.detail, 100).trim(),
          selected: Boolean(item && item.selected)
        };
      }).filter(function (item) {
        return item.id && item.label;
      });
    }
    function sanitizeTvMessage2(input) {
      if (!input || _typeof(input) !== "object" || Array.isArray(input)) return null;
      var kind = text2(input.kind, 20);
      if (kind === "page") {
        var rawSite = input.page && input.page.site;
        var site = rawSite && rawSite.id === "bilibili" ? {
          id: "bilibili",
          loginAvailable: Boolean(rawSite.loginAvailable),
          loggedIn: Boolean(rawSite.loggedIn),
          danmakuEnabled: typeof rawSite.danmakuEnabled === "boolean" ? rawSite.danmakuEnabled : null,
          quality: text2(rawSite.quality, 40),
          playbackRate: clampNumber(rawSite.playbackRate, 0.5, 2, 1)
        } : null;
        return {
          kind,
          page: {
            title: text2(input.page && input.page.title, 180),
            url: text2(input.page && input.page.url, 2048),
            hostname: text2(input.page && input.page.hostname, 253),
            adapter: text2(input.page && input.page.adapter, 40),
            readyState: text2(input.page && input.page.readyState, 20),
            site
          }
        };
      }
      if (kind === "snapshot") return {
        kind,
        items: sanitizeSnapshot(input.items)
      };
      if (kind === "player") {
        var player = input.player || {};
        return {
          kind,
          player: {
            found: Boolean(player.found),
            paused: Boolean(player.paused),
            currentTime: clampNumber(player.currentTime, 0, 864e3),
            duration: clampNumber(player.duration, 0, 864e3),
            volume: clampNumber(player.volume, 0, 1, 1),
            muted: Boolean(player.muted),
            captions: Boolean(player.captions)
          }
        };
      }
      if (kind === "log") {
        return {
          kind,
          level: oneOf(["info", "warn", "error"], input.level) ? input.level : "info",
          message: text2(input.message, 300)
        };
      }
      if (kind === "pong") return {
        kind,
        at: Date.now()
      };
      return null;
    }
    module2.exports = {
      DEFAULT_PROFILES: DEFAULT_PROFILES2,
      clampNumber,
      normalizeCommand: normalizeCommand2,
      normalizeProfiles: normalizeProfiles2,
      sanitizeTvMessage: sanitizeTvMessage2,
      text: text2,
      validatePublicHttpsUrl
    };
  }
});

// src/service/server.js
init_define_WEB_REMOTE_CONTROLLER_ASSETS();
var crypto = require("crypto");
var fs = require("fs");
var http = require("http");
var os = require("os");
var path = require("path");
var urlLibrary = require("url");
var WebSocket;
try {
  WebSocket = process.version === "v4.4.3" ? require("ws-old") : require("ws-new");
} catch (_unused2) {
  WebSocket = require("ws");
}
var WebSocketServer = WebSocket.WebSocketServer || WebSocket.Server;
var WS_OPEN = 1;
var _require_protocol = require_protocol(),
  DEFAULT_PROFILES = _require_protocol.DEFAULT_PROFILES,
  normalizeCommand = _require_protocol.normalizeCommand,
  normalizeProfiles = _require_protocol.normalizeProfiles,
  sanitizeTvMessage = _require_protocol.sanitizeTvMessage,
  text = _require_protocol.text;
var DEFAULT_PORT = 8182;
var BODY_LIMIT = 32 * 1024;
var TOKEN_TTL = 30 * 24 * 60 * 60 * 1e3;
var PIN_TTL = 10 * 60 * 1e3;
var PAIR_WINDOW = 60 * 1e3;
var EMBEDDED_CONTROLLER_ASSETS = typeof define_WEB_REMOTE_CONTROLLER_ASSETS_default === "undefined" ? null : define_WEB_REMOTE_CONTROLLER_ASSETS_default;
function json(response, status, value) {
  var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var body = JSON.stringify(value);
  response.writeHead(status, _objectSpread({
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  }, headers));
  response.end(body);
}
function isLoopback(address) {
  return address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
}
function remoteAddress(request) {
  return request.socket && request.socket.remoteAddress ? request.socket.remoteAddress : "";
}
function bearerToken(request) {
  var authorization = String(request.headers.authorization || "");
  return authorization.indexOf("Bearer ") === 0 ? authorization.slice(7) : "";
}
function hasSameOrigin(request) {
  var origin = String(request.headers.origin || "");
  if (!origin) return true;
  try {
    return parseRequestUrl(origin, origin).host === String(request.headers.host || "");
  } catch (_unused3) {
    return false;
  }
}
function secureEqual(left, right) {
  var a = String(left);
  var b = String(right);
  if (a.length !== b.length) return false;
  var difference = 0;
  for (var index = 0; index < a.length; index += 1) difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return difference === 0;
}
function bufferFrom(value, encoding) {
  return Buffer.from ? Buffer.from(value, encoding) : new Buffer(value, encoding);
}
function randomPin() {
  return String(1e5 + crypto.randomBytes(4).readUInt32BE(0) % 9e5);
}
function randomToken() {
  return crypto.randomBytes(32).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function hasSuffix(value, suffix) {
  return value.slice(-suffix.length) === suffix;
}
function parseRequestUrl(value, base) {
  if (typeof URL === "function") {
    var parsed = new URL(value, base);
    var query = {};
    parsed.searchParams.forEach(function (entryValue, key) {
      query[key] = entryValue;
    });
    return {
      pathname: parsed.pathname,
      query,
      host: parsed.host
    };
  }
  return urlLibrary.parse(value, true);
}
function addressPriority(address) {
  if (address.indexOf("192.168.") === 0) return 0;
  if (address.indexOf("10.") === 0) return 1;
  var match = /^172\.(\d+)\./.exec(address);
  if (match && Number(match[1]) >= 16 && Number(match[1]) <= 31) return 2;
  return 5;
}
function readBody(request) {
  return new Promise(function (resolve, reject) {
    var size = 0;
    var chunks = [];
    request.on("data", function (chunk) {
      size += chunk.length;
      if (size > BODY_LIMIT) {
        reject(Object.assign(new Error("Request body is too large."), {
          statusCode: 413
        }));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", function () {
      try {
        var raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (_unused4) {
        reject(Object.assign(new Error("Request body must be valid JSON."), {
          statusCode: 400
        }));
      }
    });
    request.on("error", reject);
  });
}
function findLanAddresses() {
  var found = [];
  var interfaces = os.networkInterfaces();
  for (var _i = 0, _Object$keys = Object.keys(interfaces); _i < _Object$keys.length; _i++) {
    var name = _Object$keys[_i];
    var entries = interfaces[name];
    var _iterator = _createForOfIteratorHelper(entries || []),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var entry = _step.value;
        if (entry && entry.family === "IPv4" && !entry.internal && entry.address) found.push(entry.address);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return _toConsumableArray(new Set(found)).sort(function (left, right) {
    return addressPriority(left) - addressPriority(right);
  });
}
function controllerDirectory() {
  var bundled = path.join(__dirname, "controller");
  if (fs.existsSync(bundled)) return bundled;
  return path.resolve(__dirname, "../controller");
}
function staticHeaders(contentType2) {
  return {
    "Content-Type": contentType2,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Content-Security-Policy": "default-src 'self'; connect-src 'self' ws:; img-src 'self' data:; style-src 'self'; script-src 'self'; manifest-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
  };
}
function contentType(file) {
  if (hasSuffix(file, ".html")) return "text/html; charset=utf-8";
  if (hasSuffix(file, ".js")) return "text/javascript; charset=utf-8";
  if (hasSuffix(file, ".css")) return "text/css; charset=utf-8";
  if (hasSuffix(file, ".svg")) return "image/svg+xml; charset=utf-8";
  if (hasSuffix(file, ".webmanifest")) return "application/manifest+json; charset=utf-8";
  return "application/octet-stream";
}
function makeDefaultState() {
  return {
    tvConnected: false,
    phoneCount: 0,
    activeProfileId: "1shows",
    page: {
      title: "",
      url: "https://www.1shows.org/",
      hostname: "www.1shows.org",
      adapter: "1shows",
      readyState: "loading",
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
      status: "idle",
      requestedUrl: "",
      startedAt: 0,
      finishedAt: 0
    },
    lastLog: null,
    updatedAt: Date.now()
  };
}
function createRemoteServer() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var preferredPort = typeof options.port === "number" && isFinite(options.port) && Math.floor(options.port) === options.port ? options.port : DEFAULT_PORT;
  var host = options.host || "0.0.0.0";
  var staticDir = EMBEDDED_CONTROLLER_ASSETS ? null : options.controllerDir || controllerDirectory();
  var tokens = /* @__PURE__ */new Map();
  var failures = /* @__PURE__ */new Map();
  var phoneSockets = /* @__PURE__ */new Set();
  var tvSocket = null;
  var tvPollSeenAt = 0;
  var tvPollWaiter = null;
  var tvCommandQueue = [];
  var profiles = normalizeProfiles(options.profiles || DEFAULT_PROFILES.map(function (profile) {
    return {
      id: profile.id,
      name: profile.name,
      urls: _toConsumableArray(profile.urls)
    };
  }));
  var state = makeDefaultState();
  var pin = "";
  var pinExpiresAt = 0;
  var actualPort = preferredPort;
  var lanAddresses = findLanAddresses();
  function rotatePin() {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (!force && pin && Date.now() < pinExpiresAt) return;
    pin = randomPin();
    pinExpiresAt = Date.now() + PIN_TTL;
    broadcastServiceInfo();
  }
  function addLanAddress(address) {
    var value = String(address || "");
    if (!/^\d{1,3}(?:\.\d{1,3}){3}$/.test(value) || value === "127.0.0.1") return;
    lanAddresses = [value].concat(lanAddresses.filter(function (candidate) {
      return candidate !== value;
    }));
    broadcastServiceInfo();
  }
  function pruneTokens() {
    var cutoff = Date.now() - TOKEN_TTL;
    var _iterator2 = _createForOfIteratorHelper(tokens),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _slicedToArray(_step2.value, 2),
          token = _step2$value[0],
          session = _step2$value[1];
        if (session.lastUsed < cutoff) tokens.delete(token);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  function authenticate(request) {
    var explicitToken = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    pruneTokens();
    var token = explicitToken || bearerToken(request);
    var session = tokens.get(token);
    if (!session) return null;
    session.lastUsed = Date.now();
    return {
      token,
      session
    };
  }
  function publicHost(request) {
    var header = String(request.headers.host || "");
    var name = header.replace(/:\d+$/, "");
    if (name && name !== "0.0.0.0" && name !== "127.0.0.1" && name !== "localhost") return name;
    return lanAddresses[0] || "127.0.0.1";
  }
  function info(request) {
    var ip = request ? publicHost(request) : lanAddresses[0] || "127.0.0.1";
    return {
      appName: "Web Remote TV",
      version: "0.1.0",
      port: actualPort,
      pin,
      pinExpiresAt,
      pairUrl: `http://${ip}:${actualPort}/?pin=${encodeURIComponent(pin)}`,
      addresses: lanAddresses.map(function (address) {
        return `http://${address}:${actualPort}/`;
      }),
      profiles,
      activeProfileId: state.activeProfileId,
      tvConnected: state.tvConnected,
      phoneCount: phoneSockets.size
    };
  }
  function send(socket, message) {
    if (socket && socket.readyState === WS_OPEN) socket.send(JSON.stringify(message));
  }
  function broadcastPhones(message) {
    var _iterator3 = _createForOfIteratorHelper(phoneSockets),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var socket = _step3.value;
        send(socket, message);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  function tvIsConnected() {
    return Boolean(tvSocket && tvSocket.readyState === WS_OPEN) || Date.now() - tvPollSeenAt < 45e3;
  }
  function broadcastState() {
    state.phoneCount = phoneSockets.size;
    state.tvConnected = tvIsConnected();
    state.updatedAt = Date.now();
    broadcastPhones({
      kind: "state",
      state
    });
  }
  function broadcastServiceInfo() {
    if (typeof broadcastPhones !== "function") return;
    var serviceInfo = info();
    broadcastPhones({
      kind: "service_info",
      info: serviceInfo
    });
    send(tvSocket, {
      kind: "service_info",
      info: serviceInfo
    });
  }
  function flushTvPoll() {
    if (!tvPollWaiter) return;
    var waiter = tvPollWaiter;
    tvPollWaiter = null;
    clearTimeout(waiter.timeout);
    var messages = tvCommandQueue.splice(0, tvCommandQueue.length);
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
    var normalized = normalizeCommand(command);
    if (normalized.type === "navigate" && normalized.profileId) {
      var profile = profiles.find(function (candidate) {
        return candidate.id === normalized.profileId;
      });
      if (!profile || profile.urls.indexOf(normalized.url) < 0) throw new Error("That address is not configured for the selected profile.");
      state.activeProfileId = profile.id;
    }
    if (!tvIsConnected()) throw new Error("The TV page bridge is not connected.");
    if (normalized.type === "navigate") {
      state.navigation = {
        status: "loading",
        requestedUrl: normalized.url,
        startedAt: Date.now(),
        finishedAt: 0
      };
      broadcastState();
    }
    sendTv({
      kind: "command",
      command: normalized
    });
    return normalized;
  }
  function updateFromTv(message) {
    var safe = sanitizeTvMessage(message);
    if (!safe) return;
    if (safe.kind === "page") {
      var previousUrl = state.page.url;
      state.page = safe.page;
      if (state.navigation.status === "loading") {
        var requestedHost = parseRequestUrl(state.navigation.requestedUrl, state.navigation.requestedUrl).host;
        var requestedHostWithoutWww = requestedHost.replace(/^www\./, "");
        var currentHostWithoutWww = safe.page.hostname.replace(/^www\./, "");
        var redirectedAndReady = safe.page.url !== previousUrl && (safe.page.readyState === "interactive" || safe.page.readyState === "complete");
        if (requestedHostWithoutWww === currentHostWithoutWww || redirectedAndReady) {
          state.navigation.status = "ready";
          state.navigation.finishedAt = Date.now();
        }
      }
    }
    if (safe.kind === "snapshot") state.items = safe.items;
    if (safe.kind === "player") state.player = safe.player;
    if (safe.kind === "log") state.lastLog = _objectSpread(_objectSpread({}, safe), {}, {
      at: Date.now()
    });
    broadcastState();
  }
  function updateProfiles(value) {
    var nextProfiles = normalizeProfiles(value.profiles);
    var activeProfileId = text(value.activeProfileId, 32).toLowerCase();
    if (!nextProfiles.some(function (profile) {
      return profile.id === activeProfileId;
    })) throw new Error("The active profile does not exist.");
    profiles = nextProfiles;
    state.activeProfileId = activeProfileId;
    broadcastServiceInfo();
    return {
      profiles,
      activeProfileId
    };
  }
  function pairAttemptAllowed(address) {
    var now = Date.now();
    var record = failures.get(address) || {
      count: 0,
      resetAt: now + PAIR_WINDOW
    };
    if (now >= record.resetAt) {
      record.count = 0;
      record.resetAt = now + PAIR_WINDOW;
    }
    failures.set(address, record);
    return record.count < 8;
  }
  function recordPairFailure(address) {
    var record = failures.get(address) || {
      count: 0,
      resetAt: Date.now() + PAIR_WINDOW
    };
    record.count += 1;
    failures.set(address, record);
  }
  function serveFile(response, fileName) {
    var safeName = path.basename(fileName);
    var embedded = EMBEDDED_CONTROLLER_ASSETS && EMBEDDED_CONTROLLER_ASSETS[safeName];
    var filePath = staticDir ? path.join(staticDir, safeName) : "";
    if (typeof embedded !== "string" && (!filePath || !fs.existsSync(filePath))) {
      json(response, 404, {
        error: "Asset not found."
      });
      return;
    }
    var body = typeof embedded === "string" ? bufferFrom(embedded, "utf8") : fs.readFileSync(filePath);
    response.writeHead(200, _objectSpread(_objectSpread({}, staticHeaders(contentType(safeName))), {}, {
      "Content-Length": body.length
    }));
    response.end(body);
  }
  var server = http.createServer(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(request, response) {
      var url, origin, _origin, _origin2, respond, previous, timeout, body, _origin3, address, _body, token, auth, _body2, _body3, status, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            rotatePin();
            _context.p = 1;
            url = parseRequestUrl(request.url || "/", `http://${request.headers.host || "localhost"}`);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            json(response, 400, {
              error: "Invalid request URL."
            });
            return _context.a(2);
          case 3:
            _context.p = 3;
            if (!(request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html"))) {
              _context.n = 4;
              break;
            }
            return _context.a(2, serveFile(response, "index.html"));
          case 4:
            if (!(request.method === "GET" && url.pathname === "/app.js")) {
              _context.n = 5;
              break;
            }
            return _context.a(2, serveFile(response, "app.js"));
          case 5:
            if (!(request.method === "GET" && url.pathname === "/styles.css")) {
              _context.n = 6;
              break;
            }
            return _context.a(2, serveFile(response, "styles.css"));
          case 6:
            if (!(request.method === "GET" && url.pathname === "/manifest.webmanifest")) {
              _context.n = 7;
              break;
            }
            return _context.a(2, serveFile(response, "manifest.webmanifest"));
          case 7:
            if (!(request.method === "GET" && url.pathname === "/icon.svg")) {
              _context.n = 8;
              break;
            }
            return _context.a(2, serveFile(response, "icon.svg"));
          case 8:
            if (!(request.method === "GET" && url.pathname === "/api/health")) {
              _context.n = 9;
              break;
            }
            return _context.a(2, json(response, 200, {
              ok: true,
              version: "0.2.0",
              tvConnected: state.tvConnected,
              phoneCount: phoneSockets.size,
              uptime: Math.round(process.uptime())
            }));
          case 9:
            if (!(request.method === "GET" && url.pathname === "/api/tv-info")) {
              _context.n = 11;
              break;
            }
            if (isLoopback(remoteAddress(request))) {
              _context.n = 10;
              break;
            }
            return _context.a(2, json(response, 403, {
              error: "TV bootstrap is loopback-only."
            }));
          case 10:
            origin = String(request.headers.origin || "null");
            return _context.a(2, json(response, 200, info(request), {
              "Access-Control-Allow-Origin": origin,
              Vary: "Origin"
            }));
          case 11:
            if (!(request.method === "OPTIONS" && url.pathname.indexOf("/api/tv/") === 0)) {
              _context.n = 13;
              break;
            }
            if (isLoopback(remoteAddress(request))) {
              _context.n = 12;
              break;
            }
            return _context.a(2, json(response, 403, {
              error: "TV bridge is loopback-only."
            }));
          case 12:
            _origin = String(request.headers.origin || "null");
            response.writeHead(204, {
              "Access-Control-Allow-Origin": _origin,
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Max-Age": "600",
              Vary: "Origin"
            });
            response.end();
            return _context.a(2);
          case 13:
            if (!(request.method === "GET" && url.pathname === "/api/tv/poll")) {
              _context.n = 15;
              break;
            }
            if (isLoopback(remoteAddress(request))) {
              _context.n = 14;
              break;
            }
            return _context.a(2, json(response, 403, {
              error: "TV polling is loopback-only."
            }));
          case 14:
            tvPollSeenAt = Date.now();
            state.tvConnected = true;
            _origin2 = String(request.headers.origin || "null");
            respond = function respond(messages) {
              return json(response, 200, {
                messages,
                info: info(request)
              }, {
                "Access-Control-Allow-Origin": _origin2,
                Vary: "Origin"
              });
            };
            if (tvCommandQueue.length) {
              respond(tvCommandQueue.splice(0, tvCommandQueue.length));
            } else {
              if (tvPollWaiter) {
                previous = tvPollWaiter;
                tvPollWaiter = null;
                clearTimeout(previous.timeout);
                previous.respond([]);
              }
              timeout = setTimeout(function () {
                if (tvPollWaiter && tvPollWaiter.response === response) tvPollWaiter = null;
                respond([]);
              }, 2e4);
              tvPollWaiter = {
                response,
                respond,
                timeout
              };
              request.on("close", function () {
                if (tvPollWaiter && tvPollWaiter.response === response) {
                  clearTimeout(tvPollWaiter.timeout);
                  tvPollWaiter = null;
                }
              });
            }
            broadcastState();
            return _context.a(2);
          case 15:
            if (!(request.method === "POST" && url.pathname === "/api/tv/state")) {
              _context.n = 18;
              break;
            }
            if (isLoopback(remoteAddress(request))) {
              _context.n = 16;
              break;
            }
            return _context.a(2, json(response, 403, {
              error: "TV state is loopback-only."
            }));
          case 16:
            tvPollSeenAt = Date.now();
            _context.n = 17;
            return readBody(request);
          case 17:
            body = _context.v;
            updateFromTv(body);
            _origin3 = String(request.headers.origin || "null");
            return _context.a(2, json(response, 200, {
              ok: true
            }, {
              "Access-Control-Allow-Origin": _origin3,
              Vary: "Origin"
            }));
          case 18:
            if (!(request.method === "POST" && url.pathname === "/api/pair")) {
              _context.n = 23;
              break;
            }
            if (hasSameOrigin(request)) {
              _context.n = 19;
              break;
            }
            return _context.a(2, json(response, 403, {
              error: "Pairing must start from this TV controller."
            }));
          case 19:
            address = remoteAddress(request);
            if (pairAttemptAllowed(address)) {
              _context.n = 20;
              break;
            }
            return _context.a(2, json(response, 429, {
              error: "Too many pairing attempts. Wait one minute."
            }));
          case 20:
            _context.n = 21;
            return readBody(request);
          case 21:
            _body = _context.v;
            if (Date.now() >= pinExpiresAt) rotatePin(true);
            if (secureEqual(String(_body.pin || ""), pin)) {
              _context.n = 22;
              break;
            }
            recordPairFailure(address);
            return _context.a(2, json(response, 401, {
              error: "Incorrect or expired PIN."
            }));
          case 22:
            token = randomToken();
            tokens.set(token, {
              name: text(_body.clientName || "Phone", 60),
              createdAt: Date.now(),
              lastUsed: Date.now()
            });
            failures.delete(address);
            rotatePin(true);
            return _context.a(2, json(response, 200, {
              token,
              state,
              info: info(request)
            }));
          case 23:
            if (!(request.method === "GET" && url.pathname === "/api/state")) {
              _context.n = 25;
              break;
            }
            if (authenticate(request)) {
              _context.n = 24;
              break;
            }
            return _context.a(2, json(response, 401, {
              error: "Pairing required."
            }));
          case 24:
            return _context.a(2, json(response, 200, {
              state,
              info: info(request)
            }));
          case 25:
            if (!(request.method === "DELETE" && url.pathname === "/api/session")) {
              _context.n = 27;
              break;
            }
            auth = authenticate(request);
            if (auth) {
              _context.n = 26;
              break;
            }
            return _context.a(2, json(response, 401, {
              error: "Pairing required."
            }));
          case 26:
            tokens.delete(auth.token);
            return _context.a(2, json(response, 200, {
              ok: true
            }));
          case 27:
            if (!(request.method === "PUT" && url.pathname === "/api/config")) {
              _context.n = 30;
              break;
            }
            if (authenticate(request)) {
              _context.n = 28;
              break;
            }
            return _context.a(2, json(response, 401, {
              error: "Pairing required."
            }));
          case 28:
            _context.n = 29;
            return readBody(request);
          case 29:
            _body2 = _context.v;
            return _context.a(2, json(response, 200, updateProfiles(_body2)));
          case 30:
            if (!(request.method === "POST" && url.pathname === "/api/command")) {
              _context.n = 33;
              break;
            }
            if (authenticate(request)) {
              _context.n = 31;
              break;
            }
            return _context.a(2, json(response, 401, {
              error: "Pairing required."
            }));
          case 31:
            _context.n = 32;
            return readBody(request);
          case 32:
            _body3 = _context.v;
            return _context.a(2, json(response, 200, {
              ok: true,
              command: dispatchCommand(_body3.command || _body3)
            }));
          case 33:
            return _context.a(2, json(response, 404, {
              error: "Not found."
            }));
          case 34:
            _context.p = 34;
            _t2 = _context.v;
            status = Number(_t2.statusCode) || 400;
            return _context.a(2, json(response, status, {
              error: text(_t2.message || "Request failed.", 300)
            }));
        }
      }, _callee, null, [[3, 34], [1, 2]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  var webSockets = new WebSocketServer({
    noServer: true,
    maxPayload: BODY_LIMIT,
    perMessageDeflate: false
  });
  server.on("upgrade", function (request, socket, head) {
    var url;
    try {
      url = parseRequestUrl(request.url || "/", `http://${request.headers.host || "localhost"}`);
    } catch (_unused6) {
      socket.destroy();
      return;
    }
    if (url.pathname !== "/ws") {
      socket.destroy();
      return;
    }
    var role = url.query.role;
    if (role === "tv") {
      if (!isLoopback(remoteAddress(request))) {
        socket.destroy();
        return;
      }
      request.webRemoteRole = "tv";
    } else if (role === "phone") {
      var auth = authenticate(request, url.query.token || "");
      if (!auth) {
        socket.destroy();
        return;
      }
      var origin = String(request.headers.origin || "");
      if (origin) {
        try {
          var originUrl = parseRequestUrl(origin, origin);
          var expectedHost = String(request.headers.host || "");
          if (originUrl.host !== expectedHost) {
            socket.destroy();
            return;
          }
        } catch (_unused7) {
          socket.destroy();
          return;
        }
      }
      request.webRemoteRole = "phone";
    } else {
      socket.destroy();
      return;
    }
    webSockets.handleUpgrade(request, socket, head, function (webSocket) {
      return webSockets.emit("connection", webSocket, request);
    });
  });
  webSockets.on("connection", function (socket, request) {
    if (request.webRemoteRole === "tv") {
      if (tvSocket && tvSocket.readyState === WS_OPEN) tvSocket.close(4001, "Replaced by a new TV bridge");
      tvSocket = socket;
      tvPollSeenAt = Date.now();
      state.tvConnected = true;
      send(socket, {
        kind: "service_info",
        info: info(request)
      });
      broadcastState();
      socket.on("message", function (payload) {
        try {
          updateFromTv(JSON.parse(payload.toString("utf8")));
        } catch (_unused8) {}
      });
      socket.on("close", function () {
        if (tvSocket === socket) tvSocket = null;
        broadcastState();
      });
      return;
    }
    phoneSockets.add(socket);
    send(socket, {
      kind: "service_info",
      info: info(request)
    });
    send(socket, {
      kind: "state",
      state
    });
    broadcastState();
    socket.on("message", function (payload) {
      try {
        var message = JSON.parse(payload.toString("utf8"));
        if (message.kind !== "command") throw new Error("Unsupported message.");
        var command = dispatchCommand(message.command);
        send(socket, {
          kind: "ack",
          requestId: text(message.requestId, 64),
          command
        });
      } catch (error) {
        send(socket, {
          kind: "error",
          requestId: "",
          error: text(error.message, 300)
        });
      }
    });
    socket.on("close", function () {
      phoneSockets.delete(socket);
      broadcastState();
    });
  });
  var ready = new Promise(function (resolve, reject) {
    server.once("error", reject);
    server.listen(preferredPort, host, function () {
      server.removeListener("error", reject);
      actualPort = server.address().port;
      rotatePin(true);
      console.log(`[Web Remote TV] Service listening on port ${actualPort}`);
      var _iterator4 = _createForOfIteratorHelper(lanAddresses),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var address = _step4.value;
          console.log(`[Web Remote TV] Controller: http://${address}:${actualPort}/`);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      resolve({
        port: actualPort,
        addresses: lanAddresses
      });
    });
  });
  var maintenance = setInterval(function () {
    rotatePin();
    pruneTokens();
    send(tvSocket, {
      kind: "ping",
      at: Date.now()
    });
    if (state.navigation.status === "loading" && Date.now() - state.navigation.startedAt > 2e4) {
      state.navigation.status = "timeout";
      state.navigation.finishedAt = Date.now();
      state.lastLog = {
        kind: "log",
        level: "warn",
        message: "The requested site did not report ready within 20 seconds.",
        at: Date.now()
      };
      broadcastState();
    }
    if (!tvIsConnected() && state.tvConnected) broadcastState();
  }, 3e4);
  if (typeof maintenance.unref === "function") maintenance.unref();
  function close() {
    clearInterval(maintenance);
    var _iterator5 = _createForOfIteratorHelper(phoneSockets),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var socket = _step5.value;
        socket.close();
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    if (tvSocket) tvSocket.close();
    if (tvPollWaiter) {
      clearTimeout(tvPollWaiter.timeout);
      tvPollWaiter.respond([]);
      tvPollWaiter = null;
    }
    return new Promise(function (resolve) {
      return webSockets.close(function () {
        return server.close(resolve);
      });
    });
  }
  return {
    server,
    webSockets,
    ready,
    close,
    getState: function getState() {
      return JSON.parse(JSON.stringify(state));
    },
    getInfo: function getInfo() {
      return info();
    },
    dispatchCommand,
    updateProfiles,
    addLanAddress
  };
}
function addTizenNetworkAddress(instance) {
  try {
    if (typeof tizen === "undefined" || !tizen.systeminfo) return;
    ["WIFI_NETWORK", "ETHERNET_NETWORK"].forEach(function (property) {
      tizen.systeminfo.getPropertyValue(property, function (network) {
        if (network && network.ipAddress) {
          instance.addLanAddress(network.ipAddress);
          console.log(`[Web Remote TV] Tizen network address: ${network.ipAddress}`);
        }
      }, function () {});
    });
  } catch (_unused9) {}
}
if (process.env.WEB_REMOTE_NO_AUTOSTART !== "1") {
  var instance = createRemoteServer();
  addTizenNetworkAddress(instance);
  instance.ready.catch(function (error) {
    return console.error("[Web Remote TV] Service failed:", error);
  });
}
module.exports = {
  createRemoteServer,
  findLanAddresses,
  isLoopback
};