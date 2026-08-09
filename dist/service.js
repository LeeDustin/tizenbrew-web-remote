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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
        <div class="header-actions">
          <button id="toggleAllSections" class="ghost compact" type="button" aria-pressed="false">Show all controls</button>
          <button id="showTvOverlay" class="ghost compact" type="button" title="Stays visible on the TV until Hide is selected">Pair another phone</button>
          <button id="hideTvOverlay" class="ghost compact" type="button">Hide pairing screen</button>
        </div>
      </section>

      <details id="sitesPanel" class="panel collapsible" data-section="sites">
        <summary class="section-summary">
          <span><span class="eyebrow">Website</span><span class="summary-title">Switch site</span></span>
          <span id="sitesStatus" class="summary-status">Current site</span>
        </summary>
        <div class="section-body">
        <div class="section-heading">
          <p class="muted section-intro">Open another service or edit its fallback domains.</p>
          <button id="editSitesButton" class="ghost compact" type="button">Edit domains</button>
        </div>
        <div id="profiles" class="profiles"></div>
        </div>
      </details>

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

      <details id="textPanel" class="panel collapsible" data-section="text">
        <summary class="section-summary">
          <span><span class="eyebrow">Keyboard</span><span class="summary-title">Search or enter text</span></span>
          <span id="textStatus" class="summary-status">Available</span>
        </summary>
        <div class="section-body">
        <form id="textForm" class="text-form">
          <input id="textInput" type="search" autocomplete="off" placeholder="Movie, show, or text\u2026">
          <button class="ghost" type="button" id="sendTextButton">Send</button>
          <button class="primary" type="submit">Search</button>
        </form>
        </div>
      </details>

      <details id="bilibiliResultsPanel" class="panel collapsible" data-section="bilibiliResults" hidden>
        <summary class="section-summary">
          <span><span class="eyebrow">Bilibili search</span><span class="summary-title">Choose a video</span></span>
          <span id="bilibiliResultsStatus" class="summary-status">Waiting</span>
        </summary>
        <div class="section-body">
          <div class="section-heading compact-heading">
            <p class="muted section-intro">Tap a result to open it on the TV in the same window.</p>
            <button id="refreshBilibiliResults" class="ghost compact" type="button">Refresh</button>
          </div>
          <input id="bilibiliResultFilter" class="filter" type="search" placeholder="Filter video results\u2026">
          <div id="bilibiliResults" class="video-results"><p class="muted">Waiting for Bilibili results\u2026</p></div>
        </div>
      </details>

      <details id="bilibiliPanel" class="panel collapsible bilibili-panel" data-section="bilibili" hidden>
        <summary class="section-summary">
          <span><span class="eyebrow">Bilibili</span><span class="summary-title">Site controls</span></span>
          <span id="bilibiliStatus" class="site-status">Ready</span>
        </summary>
        <div class="section-body">
        <div class="site-actions">
          <button class="primary" data-bilibili-action="login" type="button">Login / QR</button>
          <button data-bilibili-action="home" type="button">Bilibili home</button>
        </div>
        <div id="bilibiliPlaybackSettings" class="site-selectors" hidden>
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
        <p class="hint">Login opens Bilibili's own dialog on the TV. Playback-specific controls appear automatically when a player is detected.</p>
        </div>
      </details>

      <details id="manualPanel" class="panel collapsible" data-section="manual">
        <summary class="section-summary">
          <span><span class="eyebrow">Manual control</span><span class="summary-title">Navigation and pointer</span></span>
          <span id="manualStatus" class="summary-status">Advanced</span>
        </summary>
        <div class="section-body">
        <div class="manual-mode-row">
          <p class="muted section-intro">Pointer is the default. Switch to D-pad only when a page needs directional focus.</p>
          <label class="mode"><span>Control mode</span><select id="touchMode"><option value="pointer">Pointer</option><option value="scroll">Scroll</option><option value="dpad">D-pad</option></select></label>
        </div>
        <div class="control-grid">
        <div id="touchPanel" class="control-surface touch-panel">
          <div class="section-heading">
            <div><p class="eyebrow">Touchpad</p><h2 id="touchModeTitle">Pointer</h2></div>
          </div>
          <div id="touchpad" class="touchpad" tabindex="0" aria-label="TV touchpad">
            <span id="touchpadHint">Drag to move \xB7 Tap to click</span>
          </div>
        </div>

        <div id="dpadPanel" class="control-surface dpad-panel" hidden>
          <p class="eyebrow">Directional focus</p>
          <div class="dpad" aria-label="Directional navigation">
            <button data-focus="up" class="up" type="button" aria-label="Up">\u25B2</button>
            <button data-focus="left" class="left" type="button" aria-label="Left">\u25C0</button>
            <button id="activateButton" class="ok" type="button">OK</button>
            <button data-focus="right" class="right" type="button" aria-label="Right">\u25B6</button>
            <button data-focus="down" class="down" type="button" aria-label="Down">\u25BC</button>
          </div>
        </div>
        </div>
        <div class="three-buttons manual-history">
          <button data-history="back" class="ghost" type="button">Back</button>
          <button data-history="reload" class="ghost" type="button">Reload</button>
          <button data-history="forward" class="ghost" type="button">Forward</button>
        </div>
        </div>
      </details>

      <details id="playerPanel" class="panel collapsible" data-section="player">
        <summary class="section-summary">
          <span><span class="eyebrow">Playback</span><span class="summary-title">Player controls</span></span>
          <span id="playerStatus" class="summary-status">No player</span>
        </summary>
        <div class="section-body">
        <div class="player-meta">
          <span id="playerTime" class="time">--:-- / --:--</span>
          <label class="seek-setting"><span>Seek step</span><select id="seekStep"><option value="5" selected>5 seconds</option><option value="10">10 seconds</option><option value="15">15 seconds</option><option value="30">30 seconds</option><option value="60">60 seconds</option></select></label>
        </div>
        <div class="media-controls">
          <button id="seekBack" data-media="seekBy" data-value="-5" type="button">\u22125s</button>
          <button data-media="toggle" class="primary play" type="button">Play / Pause</button>
          <button id="seekForward" data-media="seekBy" data-value="5" type="button">+5s</button>
          <button data-media="volumeBy" data-value="-0.1" type="button">Vol \u2212</button>
          <button data-media="captions" type="button">CC</button>
          <button data-media="volumeBy" data-value="0.1" type="button">Vol +</button>
          <button id="fillTvButton" data-media="fullscreen" class="wide-control primary" type="button">Fill TV</button>
        </div>
        <div id="bilibiliPlayerActions" class="site-actions player-site-actions" hidden>
          <button id="danmakuButton" data-bilibili-action="danmaku" type="button">Turn danmu off</button>
          <button data-bilibili-action="previous" type="button">Previous</button>
          <button data-bilibili-action="next" type="button">Next</button>
          <button data-bilibili-action="wide" type="button">Wide mode</button>
        </div>
        <p class="hint">Fill TV uses the site's own viewport mode when available. Other sites fall back to browser fullscreen.</p>
        </div>
      </details>

      <details id="itemsPanel" class="panel collapsible" data-section="items">
        <summary class="section-summary">
          <span><span class="eyebrow">Current page</span><span class="summary-title">Visible controls</span></span>
          <span id="itemsStatus" class="summary-status">Waiting</span>
        </summary>
        <div class="section-body">
        <div class="section-heading compact-heading">
          <p class="muted section-intro">Buttons and titles detected on the TV page.</p>
          <button id="refreshItems" class="ghost compact" type="button">Refresh</button>
        </div>
        <input id="itemFilter" class="filter" type="search" placeholder="Filter visible buttons and titles\u2026">
        <div id="pageItems" class="page-items"><p class="muted">Waiting for the television\u2026</p></div>
        </div>
      </details>

      <details id="diagnosticsPanel" class="panel diagnostics" data-section="diagnostics">
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
      "app.js": "'use strict';\n\n(function startController() {\n  const TOKEN_KEY = 'webRemoteTvToken';\n  const CONFIG_KEY = 'webRemoteTvProfiles';\n  const BILIBILI_DEFAULT_MIGRATION_KEY = 'webRemoteTvBilibiliDefaultV1';\n  const SECTION_PREFERENCES_KEY = 'webRemoteTvSectionPreferencesV1';\n  const SHOW_ALL_SECTIONS_KEY = 'webRemoteTvShowAllSectionsV1';\n  const MANUAL_MODE_KEY = 'webRemoteTvManualModeV1';\n  const SEEK_STEP_KEY = 'webRemoteTvSeekStepV1';\n  const SEEK_STEPS = [5, 10, 15, 30, 60];\n  const BILIBILI_PROFILE = { id: 'bilibili', name: 'Bilibili', urls: ['https://www.bilibili.com/'] };\n  const dom = {};\n  let token = localStorage.getItem(TOKEN_KEY) || '';\n  let socket = null;\n  let reconnectTimer = null;\n  let state = null;\n  let serviceInfo = null;\n  let editorProfiles = [];\n  let toastTimer = null;\n  let configRestored = false;\n  let pointerSession = null;\n  let pointerPending = { dx: 0, dy: 0 };\n  let pointerFrame = null;\n  let showAllSections = localStorage.getItem(SHOW_ALL_SECTIONS_KEY) === '1';\n  let sectionContext = '';\n  let sectionPreferences = {};\n  try {\n    const savedSectionPreferences = JSON.parse(localStorage.getItem(SECTION_PREFERENCES_KEY) || '{}');\n    sectionPreferences = savedSectionPreferences && typeof savedSectionPreferences === 'object' && !Array.isArray(savedSectionPreferences)\n      ? savedSectionPreferences : {};\n  } catch { sectionPreferences = {}; }\n\n  function byId(id) { return document.getElementById(id); }\n\n  function cacheDom() {\n    for (const id of [\n      'connectionLabel', 'connectionDot', 'pairView', 'remoteView', 'pairForm', 'pinInput', 'pairError',\n      'pageTitle', 'pageUrl', 'showTvOverlay', 'hideTvOverlay', 'toggleAllSections', 'profiles', 'editSitesButton', 'sitesEditor', 'closeSitesButton',\n      'sitesForm', 'profileEditors', 'addProfileButton', 'sitesError', 'textForm', 'textInput', 'sendTextButton',\n      'bilibiliPanel', 'bilibiliStatus', 'bilibiliQuality', 'applyBilibiliQuality', 'bilibiliSpeed', 'applyBilibiliSpeed',\n      'bilibiliResultsPanel', 'bilibiliResultsStatus', 'bilibiliResultFilter', 'bilibiliResults', 'refreshBilibiliResults',\n      'fillTvButton', 'bilibiliPlayerActions', 'bilibiliPlaybackSettings', 'danmakuButton', 'activateButton', 'touchMode', 'touchModeTitle', 'touchpad', 'touchpadHint',\n      'touchPanel', 'dpadPanel', 'playerStatus', 'playerTime', 'seekStep', 'seekBack', 'seekForward',\n      'refreshItems', 'itemFilter', 'pageItems', 'sitesPanel', 'sitesStatus', 'textPanel', 'textStatus', 'manualPanel',\n      'manualStatus', 'playerPanel', 'itemsPanel', 'itemsStatus', 'diagnosticsPanel', 'diagTv', 'diagNavigation',\n      'diagAdapter', 'diagSocket', 'diagError', 'forgetButton', 'toast'\n    ]) dom[id] = byId(id);\n  }\n\n  function showToast(message) {\n    clearTimeout(toastTimer);\n    dom.toast.textContent = message;\n    dom.toast.classList.add('visible');\n    toastTimer = setTimeout(() => dom.toast.classList.remove('visible'), 2400);\n  }\n\n  async function api(path, options) {\n    const response = await fetch(path, {\n      cache: 'no-store',\n      ...options,\n      headers: {\n        ...(token ? { Authorization: `Bearer ${token}` } : {}),\n        ...(options && options.body ? { 'Content-Type': 'application/json' } : {}),\n        ...((options && options.headers) || {})\n      }\n    });\n    const payload = await response.json().catch(() => ({}));\n    if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);\n    return payload;\n  }\n\n  function setConnection() {\n    const phoneConnected = socket && socket.readyState === WebSocket.OPEN;\n    const tvConnected = Boolean(state && state.tvConnected);\n    dom.connectionDot.classList.toggle('connected', phoneConnected && tvConnected);\n    dom.connectionDot.classList.toggle('partial', phoneConnected && !tvConnected);\n    dom.connectionDot.setAttribute('aria-label', phoneConnected && tvConnected ? 'Connected' : 'Disconnected');\n    dom.connectionLabel.textContent = !token ? 'Pair this phone'\n      : !phoneConnected ? 'Reconnecting to local service\u2026'\n        : tvConnected ? 'Phone and television connected'\n          : 'Phone connected \xB7 TV page bridge unavailable';\n    dom.diagSocket.textContent = phoneConnected ? 'connected' : 'disconnected';\n  }\n\n  function formatTime(seconds) {\n    if (!Number.isFinite(seconds) || seconds <= 0) return '--:--';\n    const whole = Math.floor(seconds);\n    const hours = Math.floor(whole / 3600);\n    const minutes = Math.floor((whole % 3600) / 60);\n    const rest = whole % 60;\n    return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}` : `${minutes}:${String(rest).padStart(2, '0')}`;\n  }\n\n  function manualModeLabel() {\n    if (dom.touchMode.value === 'dpad') return 'D-pad';\n    if (dom.touchMode.value === 'scroll') return 'Scroll';\n    return 'Pointer';\n  }\n\n  function updateManualMode() {\n    const mode = ['pointer', 'scroll', 'dpad'].includes(dom.touchMode.value) ? dom.touchMode.value : 'pointer';\n    dom.touchMode.value = mode;\n    dom.touchPanel.hidden = mode === 'dpad';\n    dom.dpadPanel.hidden = mode !== 'dpad';\n    dom.touchModeTitle.textContent = mode === 'scroll' ? 'Scroll' : 'Pointer';\n    dom.touchpadHint.textContent = mode === 'scroll' ? 'Drag to scroll the TV page' : 'Drag to move \xB7 Tap to click';\n    dom.manualStatus.textContent = manualModeLabel();\n  }\n\n  function updateSeekStep() {\n    const requested = Number(dom.seekStep.value);\n    const step = SEEK_STEPS.includes(requested) ? requested : 5;\n    dom.seekStep.value = String(step);\n    dom.seekBack.dataset.value = String(-step);\n    dom.seekForward.dataset.value = String(step);\n    dom.seekBack.textContent = `\u2212${step}s`;\n    dom.seekForward.textContent = `+${step}s`;\n  }\n\n  function restoreControlPreferences() {\n    const savedMode = localStorage.getItem(MANUAL_MODE_KEY);\n    dom.touchMode.value = ['pointer', 'scroll', 'dpad'].includes(savedMode) ? savedMode : 'pointer';\n    const savedSeek = Number(localStorage.getItem(SEEK_STEP_KEY));\n    dom.seekStep.value = String(SEEK_STEPS.includes(savedSeek) ? savedSeek : 5);\n    updateManualMode();\n    updateSeekStep();\n  }\n\n  function renderState() {\n    setConnection();\n    if (!state) return;\n    const page = state.page || {};\n    const player = state.player || {};\n    dom.pageTitle.textContent = page.title || page.hostname || 'Waiting for page\u2026';\n    dom.pageTitle.title = dom.pageTitle.textContent;\n    dom.pageUrl.textContent = page.url || '';\n    const playerAvailable = player.found || Boolean(page.site && page.site.playerAvailable);\n    dom.playerStatus.textContent = player.found ? (player.paused ? 'Paused' : 'Playing')\n      : page.site && page.site.playbackPage && playerAvailable ? 'Bilibili player ready'\n        : playerAvailable ? 'Player loading' : 'No player';\n    dom.playerTime.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration)}`;\n    dom.diagTv.textContent = state.tvConnected ? 'connected' : 'not connected';\n    dom.diagNavigation.textContent = state.navigation ? state.navigation.status : 'idle';\n    dom.diagAdapter.textContent = page.adapter || 'unknown';\n    dom.diagError.textContent = state.lastLog ? state.lastLog.message : 'none';\n    renderBilibili(page);\n    renderProfiles();\n    renderBilibiliResults(page);\n    renderItems();\n    renderSectionLayout(page, player);\n  }\n\n  function renderBilibili(page) {\n    const active = page.adapter === 'bilibili';\n    dom.bilibiliPanel.hidden = !active;\n    if (!active) return;\n    const site = page.site || {};\n    const status = [];\n    if (!site.playerAvailable) status.push(site.loggedIn ? 'Signed in' : site.loginAvailable ? 'Login available' : 'Account status unknown');\n    if (site.webFullscreenActive) status.push('Fill TV');\n    if (typeof site.danmakuEnabled === 'boolean') status.push(site.danmakuEnabled ? 'Danmu on' : 'Danmu off');\n    if (site.quality) status.push(site.quality);\n    if (!status.length) status.push(site.playerAvailable ? 'Player ready' : 'Ready');\n    dom.bilibiliStatus.textContent = status.join(' \xB7 ');\n\n    dom.bilibiliStatus.title = dom.bilibiliStatus.textContent;\n    const fillLabel = site.webFullscreenActive ? 'Exit Fill TV' : 'Fill TV';\n    dom.fillTvButton.textContent = fillLabel;\n    dom.danmakuButton.textContent = site.danmakuEnabled === false ? 'Turn danmu on' : 'Turn danmu off';\n\n    const rate = String(site.playbackRate || '');\n    if (Array.from(dom.bilibiliSpeed.options).some((option) => option.value === rate)) dom.bilibiliSpeed.value = rate;\n    const quality = String(site.quality || '').toLowerCase();\n    const qualityValue = /\u81EA\u52A8|auto/.test(quality) ? '0'\n      : /1080p\\s*60/.test(quality) ? '116'\n        : /1080p/.test(quality) ? '80'\n          : /720p/.test(quality) ? '64'\n            : /480p/.test(quality) ? '32'\n              : /360p/.test(quality) ? '16' : '';\n    if (qualityValue) dom.bilibiliQuality.value = qualityValue;\n  }\n\n  function renderProfiles() {\n    if (!serviceInfo || !Array.isArray(serviceInfo.profiles)) return;\n    const activeProfile = serviceInfo.profiles.find((profile) => state && state.activeProfileId === profile.id);\n    dom.sitesStatus.textContent = activeProfile ? activeProfile.name : 'Switch site';\n    dom.profiles.textContent = '';\n    for (const profile of serviceInfo.profiles) {\n      const row = document.createElement('div');\n      row.className = `profile${state && state.activeProfileId === profile.id ? ' active' : ''}`;\n      const name = document.createElement('span');\n      name.className = 'profile-name';\n      name.textContent = profile.name;\n      const select = document.createElement('select');\n      select.setAttribute('aria-label', `${profile.name} domain`);\n      profile.urls.forEach((url, index) => {\n        const option = document.createElement('option');\n        option.value = url;\n        option.textContent = profile.urls.length > 1 ? `${index + 1}. ${new URL(url).hostname}` : new URL(url).hostname;\n        select.appendChild(option);\n      });\n      const open = document.createElement('button');\n      open.type = 'button';\n      open.textContent = state && state.activeProfileId === profile.id ? 'Reload' : 'Open';\n      open.addEventListener('click', () => command({ type: 'navigate', profileId: profile.id, url: select.value }));\n      row.append(name, select, open);\n      dom.profiles.appendChild(row);\n    }\n  }\n\n  function renderItems() {\n    if (!state) return;\n    const query = dom.itemFilter.value.trim().toLowerCase();\n    const controls = (state.items || []).filter((item) => item.group !== 'bilibili-search-result');\n    const items = controls.filter((item) => !query || `${item.label} ${item.detail} ${item.kind}`.toLowerCase().includes(query));\n    dom.itemsStatus.textContent = `${controls.length} found`;\n    dom.pageItems.textContent = '';\n    if (!items.length) {\n      const empty = document.createElement('p');\n      empty.className = 'muted';\n      empty.textContent = controls.length ? 'No matching controls.' : 'No visible controls were discovered yet.';\n      dom.pageItems.appendChild(empty);\n      return;\n    }\n    for (const item of items) {\n      dom.pageItems.appendChild(createItemButton(item));\n    }\n  }\n\n  function createItemButton(item, dedicatedVideo) {\n    const button = document.createElement('button');\n    button.type = 'button';\n    button.className = dedicatedVideo ? 'page-item video-result' : 'page-item';\n    const kind = document.createElement('span');\n    kind.className = 'kind';\n    kind.textContent = dedicatedVideo ? 'video' : item.kind;\n    const copy = document.createElement('span');\n    const label = document.createElement('span');\n    label.className = 'label';\n    label.textContent = item.label;\n    copy.appendChild(label);\n    if (item.detail) {\n      const detail = document.createElement('span');\n      detail.className = 'detail';\n      detail.textContent = item.detail;\n      copy.appendChild(detail);\n    }\n    button.append(kind, copy);\n    button.addEventListener('click', () => {\n      if (dedicatedVideo) showToast(`Opening ${item.label}`);\n      command({ type: 'select', id: item.id }, false);\n    });\n    return button;\n  }\n\n  function renderBilibiliResults(page) {\n    if (!state) return;\n    const site = page.site || {};\n    const allResults = (state.items || []).filter((item) => item.group === 'bilibili-search-result');\n    const query = dom.bilibiliResultFilter.value.trim().toLowerCase();\n    const results = allResults.filter((item) => !query || `${item.label} ${item.detail}`.toLowerCase().includes(query));\n    dom.bilibiliResultsStatus.textContent = allResults.length ? `${allResults.length} videos` : site.searchPage ? 'Loading results' : 'No results';\n    dom.bilibiliResults.textContent = '';\n    if (!results.length) {\n      const empty = document.createElement('p');\n      empty.className = 'muted';\n      empty.textContent = allResults.length ? 'No matching videos.' : site.searchPage ? 'Bilibili results are still loading. Tap Refresh if this remains empty.' : 'No Bilibili video results on this page.';\n      dom.bilibiliResults.appendChild(empty);\n      return;\n    }\n    for (const item of results) dom.bilibiliResults.appendChild(createItemButton(item, true));\n  }\n\n  function hasSectionPreference(panel) {\n    return Boolean(panel && Object.prototype.hasOwnProperty.call(sectionPreferences, panel.dataset.section));\n  }\n\n  function setAutomaticOpen(panel, open) {\n    if (!panel || hasSectionPreference(panel) || panel.open === open) return;\n    panel.dataset.automaticToggle = 'true';\n    panel.open = open;\n    setTimeout(() => { delete panel.dataset.automaticToggle; }, 0);\n  }\n\n  function renderSectionLayout(page, player) {\n    const site = page.site || {};\n    const isBilibili = page.adapter === 'bilibili';\n    const playerAvailable = Boolean(player.found || site.playerAvailable);\n    const items = state && Array.isArray(state.items) ? state.items : [];\n    const hasTextInput = isBilibili || items.some((item) => item.kind === 'input');\n    const hasBilibiliResults = items.some((item) => item.group === 'bilibili-search-result');\n    const isBilibiliSearch = isBilibili && Boolean(site.searchPage || hasBilibiliResults);\n    const hasPageItems = items.some((item) => item.group !== 'bilibili-search-result');\n\n    dom.toggleAllSections.textContent = showAllSections ? 'Use smart view' : 'Show all controls';\n    dom.toggleAllSections.setAttribute('aria-pressed', String(showAllSections));\n    dom.textStatus.textContent = hasTextInput ? (isBilibili ? 'Bilibili search' : 'Input detected') : 'No input detected';\n    dom.manualStatus.textContent = manualModeLabel();\n    if (!isBilibili) dom.fillTvButton.textContent = 'Fullscreen';\n    dom.bilibiliPlayerActions.hidden = !(isBilibili && playerAvailable);\n    dom.bilibiliPlaybackSettings.hidden = !(isBilibili && playerAvailable);\n\n    dom.bilibiliPanel.hidden = !isBilibili;\n    dom.bilibiliResultsPanel.hidden = !(isBilibiliSearch || (showAllSections && isBilibili));\n    dom.textPanel.hidden = !(showAllSections || (hasTextInput && !playerAvailable));\n    dom.playerPanel.hidden = !(showAllSections || playerAvailable);\n    dom.itemsPanel.hidden = !(showAllSections || (hasPageItems && !playerAvailable && !isBilibiliSearch));\n    dom.manualPanel.hidden = !(showAllSections || (!playerAvailable && !hasPageItems && !isBilibiliSearch));\n\n    const nextContext = playerAvailable ? 'player' : isBilibiliSearch ? 'bilibiliResults' : isBilibili ? 'bilibili' : hasPageItems ? 'items' : 'manual';\n    if (nextContext !== sectionContext) {\n      sectionContext = nextContext;\n      setAutomaticOpen(dom.playerPanel, nextContext === 'player');\n      setAutomaticOpen(dom.bilibiliResultsPanel, nextContext === 'bilibiliResults');\n      setAutomaticOpen(dom.bilibiliPanel, nextContext === 'bilibili');\n      setAutomaticOpen(dom.itemsPanel, nextContext === 'items');\n      setAutomaticOpen(dom.manualPanel, nextContext === 'manual');\n      setAutomaticOpen(dom.textPanel, false);\n      setAutomaticOpen(dom.sitesPanel, false);\n    }\n  }\n\n  function bindSectionControls() {\n    for (const panel of document.querySelectorAll('details[data-section]')) {\n      const id = panel.dataset.section;\n      if (Object.prototype.hasOwnProperty.call(sectionPreferences, id)) panel.open = Boolean(sectionPreferences[id]);\n      panel.addEventListener('toggle', () => {\n        if (panel.dataset.automaticToggle) return;\n        sectionPreferences[id] = panel.open;\n        localStorage.setItem(SECTION_PREFERENCES_KEY, JSON.stringify(sectionPreferences));\n      });\n    }\n    dom.toggleAllSections.addEventListener('click', () => {\n      showAllSections = !showAllSections;\n      localStorage.setItem(SHOW_ALL_SECTIONS_KEY, showAllSections ? '1' : '0');\n      renderState();\n      showToast(showAllSections ? 'Showing every control section' : 'Smart view hides irrelevant sections');\n    });\n  }\n\n  function renderProfileEditors() {\n    dom.profileEditors.textContent = '';\n    editorProfiles.forEach((profile, index) => {\n      const fieldset = document.createElement('div');\n      fieldset.className = 'profile-editor';\n      const grid = document.createElement('div');\n      grid.className = 'profile-editor-grid';\n      const nameLabel = document.createElement('label');\n      nameLabel.textContent = 'Name';\n      const nameInput = document.createElement('input');\n      nameInput.value = profile.name;\n      nameInput.maxLength = 40;\n      nameInput.addEventListener('input', () => { profile.name = nameInput.value; });\n      nameLabel.appendChild(nameInput);\n      const urlsLabel = document.createElement('label');\n      urlsLabel.textContent = 'HTTPS domains (one per line)';\n      const urlsInput = document.createElement('textarea');\n      urlsInput.value = profile.urls.join('\\n');\n      urlsInput.addEventListener('input', () => { profile.urls = urlsInput.value.split(/\\r?\\n/).map((value) => value.trim()).filter(Boolean); });\n      urlsLabel.appendChild(urlsInput);\n      grid.append(nameLabel, urlsLabel);\n      fieldset.appendChild(grid);\n      if (!['1shows', 'cineby', 'bilibili'].includes(profile.id)) {\n        const remove = document.createElement('button');\n        remove.type = 'button';\n        remove.className = 'danger compact';\n        remove.textContent = 'Remove custom site';\n        remove.addEventListener('click', () => {\n          editorProfiles.splice(index, 1);\n          renderProfileEditors();\n        });\n        fieldset.appendChild(remove);\n      }\n      dom.profileEditors.appendChild(fieldset);\n    });\n  }\n\n  function openEditor() {\n    editorProfiles = JSON.parse(JSON.stringify((serviceInfo && serviceInfo.profiles) || []));\n    renderProfileEditors();\n    dom.sitesEditor.hidden = false;\n    dom.sitesEditor.scrollIntoView({ behavior: 'smooth', block: 'start' });\n  }\n\n  async function saveProfiles(event) {\n    event.preventDefault();\n    dom.sitesError.textContent = '';\n    try {\n      const active = editorProfiles.some((profile) => profile.id === (state && state.activeProfileId)) ? state.activeProfileId : editorProfiles[0].id;\n      const result = await api('/api/config', {\n        method: 'PUT',\n        body: JSON.stringify({ profiles: editorProfiles, activeProfileId: active })\n      });\n      serviceInfo.profiles = result.profiles;\n      serviceInfo.activeProfileId = result.activeProfileId;\n      localStorage.setItem(CONFIG_KEY, JSON.stringify(result));\n      dom.sitesEditor.hidden = true;\n      renderProfiles();\n      showToast('Domains saved on this TV session');\n    } catch (error) {\n      dom.sitesError.textContent = error.message;\n    }\n  }\n\n  async function restoreSavedConfig() {\n    if (configRestored || !token) return;\n    configRestored = true;\n    const raw = localStorage.getItem(CONFIG_KEY);\n    if (!raw) {\n      localStorage.setItem(BILIBILI_DEFAULT_MIGRATION_KEY, '1');\n      return;\n    }\n    try {\n      const saved = JSON.parse(raw);\n      if (Array.isArray(saved.profiles) && !saved.profiles.some((profile) => profile.id === 'bilibili')) {\n        saved.profiles.push(BILIBILI_PROFILE);\n      }\n      if (!localStorage.getItem(BILIBILI_DEFAULT_MIGRATION_KEY) && Array.isArray(saved.profiles)) {\n        saved.profiles = saved.profiles.slice().sort((left, right) => {\n          if (left.id === 'bilibili') return -1;\n          if (right.id === 'bilibili') return 1;\n          return 0;\n        });\n        saved.activeProfileId = 'bilibili';\n      }\n      const result = await api('/api/config', { method: 'PUT', body: JSON.stringify(saved) });\n      if (serviceInfo) {\n        serviceInfo.profiles = result.profiles;\n        serviceInfo.activeProfileId = result.activeProfileId;\n      }\n      localStorage.setItem(CONFIG_KEY, JSON.stringify(result));\n      localStorage.setItem(BILIBILI_DEFAULT_MIGRATION_KEY, '1');\n    } catch (error) {\n      showToast(`Saved domains were not restored: ${error.message}`);\n    }\n  }\n\n  function handleMessage(message) {\n    if (message.kind === 'state') state = message.state;\n    if (message.kind === 'service_info') serviceInfo = message.info;\n    if (message.kind === 'error') showToast(message.error || 'Command failed');\n    renderState();\n  }\n\n  function connectSocket() {\n    clearTimeout(reconnectTimer);\n    if (!token) return;\n    if (socket && (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN)) return;\n    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';\n    const nextSocket = new WebSocket(`${protocol}//${location.host}/ws?role=phone&token=${encodeURIComponent(token)}`);\n    socket = nextSocket;\n    nextSocket.addEventListener('open', () => {\n      if (socket !== nextSocket) return;\n      setConnection();\n      command({ type: 'requestSnapshot' }, false);\n    });\n    nextSocket.addEventListener('message', (event) => {\n      if (socket !== nextSocket) return;\n      try { handleMessage(JSON.parse(event.data)); } catch { /* Ignore malformed local messages. */ }\n    });\n    nextSocket.addEventListener('close', () => {\n      if (socket !== nextSocket) return;\n      socket = null;\n      setConnection();\n      if (token) reconnectTimer = setTimeout(connectSocket, 1800);\n    });\n    nextSocket.addEventListener('error', () => {\n      if (socket === nextSocket) setConnection();\n    });\n  }\n\n  async function command(value, announce = true) {\n    try {\n      if (socket && socket.readyState === WebSocket.OPEN) {\n        socket.send(JSON.stringify({ kind: 'command', requestId: String(Date.now()), command: value }));\n      } else {\n        await api('/api/command', { method: 'POST', body: JSON.stringify({ command: value }) });\n      }\n      if (announce && value.type === 'navigate') showToast(`Opening ${new URL(value.url).hostname}`);\n      if (announce && value.type === 'site') showToast('Bilibili control sent');\n    } catch (error) {\n      showToast(error.message);\n    }\n  }\n\n  async function pair(event) {\n    event.preventDefault();\n    dom.pairError.textContent = '';\n    try {\n      const payload = await api('/api/pair', {\n        method: 'POST',\n        body: JSON.stringify({ pin: dom.pinInput.value.trim(), clientName: navigator.userAgent.slice(0, 60) })\n      });\n      token = payload.token;\n      localStorage.setItem(TOKEN_KEY, token);\n      state = payload.state;\n      serviceInfo = payload.info;\n      dom.pairView.hidden = true;\n      dom.remoteView.hidden = false;\n      await restoreSavedConfig();\n      renderState();\n      connectSocket();\n    } catch (error) {\n      dom.pairError.textContent = error.message;\n    }\n  }\n\n  function flushPointer() {\n    pointerFrame = null;\n    const dx = pointerPending.dx;\n    const dy = pointerPending.dy;\n    pointerPending = { dx: 0, dy: 0 };\n    if (!dx && !dy) return;\n    if (dom.touchMode.value === 'scroll') command({ type: 'scroll', dx: -dx * 2, dy: -dy * 2 }, false);\n    else command({ type: 'pointer', dx: dx * 1.4, dy: dy * 1.4 }, false);\n  }\n\n  function pointerDown(event) {\n    dom.touchpad.setPointerCapture(event.pointerId);\n    dom.touchpad.classList.add('active');\n    pointerSession = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY };\n  }\n\n  function pointerMove(event) {\n    if (!pointerSession || pointerSession.id !== event.pointerId) return;\n    pointerPending.dx += event.clientX - pointerSession.x;\n    pointerPending.dy += event.clientY - pointerSession.y;\n    pointerSession.x = event.clientX;\n    pointerSession.y = event.clientY;\n    if (!pointerFrame) pointerFrame = requestAnimationFrame(flushPointer);\n  }\n\n  function pointerUp(event) {\n    if (!pointerSession || pointerSession.id !== event.pointerId) return;\n    const distance = Math.hypot(event.clientX - pointerSession.startX, event.clientY - pointerSession.startY);\n    if (distance < 9 && dom.touchMode.value === 'pointer') command({ type: 'pointerClick' }, false);\n    pointerSession = null;\n    dom.touchpad.classList.remove('active');\n  }\n\n  function bindEvents() {\n    bindSectionControls();\n    dom.pairForm.addEventListener('submit', pair);\n    dom.showTvOverlay.addEventListener('click', () => command({ type: 'overlay', action: 'show' }, false));\n    dom.hideTvOverlay.addEventListener('click', () => command({ type: 'overlay', action: 'hide' }, false));\n    dom.editSitesButton.addEventListener('click', openEditor);\n    dom.closeSitesButton.addEventListener('click', () => { dom.sitesEditor.hidden = true; });\n    dom.sitesForm.addEventListener('submit', saveProfiles);\n    dom.addProfileButton.addEventListener('click', () => {\n      const id = `custom-${Date.now().toString(36)}`;\n      editorProfiles.push({ id, name: 'Custom site', urls: ['https://example.com/'] });\n      renderProfileEditors();\n    });\n    dom.textForm.addEventListener('submit', (event) => {\n      event.preventDefault();\n      command({ type: 'text', value: dom.textInput.value, submit: true }, false);\n    });\n    dom.sendTextButton.addEventListener('click', () => command({ type: 'text', value: dom.textInput.value, submit: false }, false));\n    document.querySelectorAll('[data-bilibili-action]').forEach((button) => button.addEventListener('click', () => command({\n      type: 'site',\n      site: 'bilibili',\n      action: button.dataset.bilibiliAction\n    })));\n    dom.applyBilibiliQuality.addEventListener('click', () => command({ type: 'site', site: 'bilibili', action: 'quality', value: dom.bilibiliQuality.value }));\n    dom.applyBilibiliSpeed.addEventListener('click', () => command({ type: 'site', site: 'bilibili', action: 'speed', value: dom.bilibiliSpeed.value }));\n    document.querySelectorAll('[data-focus]').forEach((button) => button.addEventListener('click', () => command({ type: 'focus', direction: button.dataset.focus }, false)));\n    document.querySelectorAll('[data-history]').forEach((button) => button.addEventListener('click', () => command({ type: 'history', action: button.dataset.history }, false)));\n    dom.activateButton.addEventListener('click', () => command({ type: 'activate' }, false));\n    document.querySelectorAll('[data-media]').forEach((button) => button.addEventListener('click', () => command({\n      type: 'media',\n      action: button.dataset.media,\n      value: Number(button.dataset.value || 0)\n    }, false)));\n    dom.refreshItems.addEventListener('click', () => command({ type: 'requestSnapshot' }, false));\n    dom.refreshBilibiliResults.addEventListener('click', () => command({ type: 'requestSnapshot' }, false));\n    dom.itemFilter.addEventListener('input', renderItems);\n    dom.bilibiliResultFilter.addEventListener('input', () => renderBilibiliResults((state && state.page) || {}));\n    dom.touchMode.addEventListener('change', () => {\n      localStorage.setItem(MANUAL_MODE_KEY, dom.touchMode.value);\n      updateManualMode();\n    });\n    dom.seekStep.addEventListener('change', () => {\n      localStorage.setItem(SEEK_STEP_KEY, dom.seekStep.value);\n      updateSeekStep();\n    });\n    dom.touchpad.addEventListener('pointerdown', pointerDown);\n    dom.touchpad.addEventListener('pointermove', pointerMove);\n    dom.touchpad.addEventListener('pointerup', pointerUp);\n    dom.touchpad.addEventListener('pointercancel', pointerUp);\n    dom.forgetButton.addEventListener('click', async () => {\n      try { await api('/api/session', { method: 'DELETE' }); } catch { /* Local cleanup still proceeds. */ }\n      localStorage.removeItem(TOKEN_KEY);\n      token = '';\n      if (socket) socket.close();\n      location.reload();\n    });\n  }\n\n  async function initialize() {\n    cacheDom();\n    restoreControlPreferences();\n    bindEvents();\n    const pin = new URLSearchParams(location.search).get('pin');\n    if (pin) dom.pinInput.value = pin.replace(/\\D/g, '').slice(0, 6);\n    if (!token) {\n      dom.pairView.hidden = false;\n      dom.remoteView.hidden = true;\n      setConnection();\n      if (pin && dom.pinInput.value.length === 6) dom.pinInput.focus();\n      return;\n    }\n    try {\n      const payload = await api('/api/state');\n      state = payload.state;\n      serviceInfo = payload.info;\n      dom.pairView.hidden = true;\n      dom.remoteView.hidden = false;\n      await restoreSavedConfig();\n      renderState();\n      connectSocket();\n    } catch {\n      localStorage.removeItem(TOKEN_KEY);\n      token = '';\n      dom.pairView.hidden = false;\n      dom.remoteView.hidden = true;\n      setConnection();\n    }\n  }\n\n  document.addEventListener('DOMContentLoaded', initialize, { once: true });\n})();\n",
      "styles.css": `:root {
  color-scheme: dark;
  --bg: #07111f;
  --panel: #101d2d;
  --panel-2: #14253a;
  --line: #263b52;
  --text: #eef6ff;
  --muted: #96abc1;
  --accent: #38bdf8;
  --accent-2: #0ea5e9;
  --danger: #fb7185;
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
[hidden] { display: none !important; }
html { background: var(--bg); }
body { margin: 0; min-height: 100vh; color: var(--text); background: radial-gradient(circle at 20% -10%, #12395a 0, transparent 37rem), var(--bg); }
button, input, select, textarea { font: inherit; }
button, select { touch-action: manipulation; }

.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 72px;
  padding: max(12px, env(safe-area-inset-top)) 18px 12px;
  background: rgba(7, 17, 31, .91);
  border-bottom: 1px solid rgba(77, 111, 145, .35);
  backdrop-filter: blur(18px);
}
.brand-mark { display: grid; place-items: center; width: 42px; height: 42px; flex: 0 0 auto; border-radius: 13px; color: #00131d; background: var(--accent); font-size: 25px; font-weight: 900; }
.brand-copy { min-width: 0; flex: 1; }
.brand-copy h1 { margin: 0; font-size: 18px; }
.brand-copy p { margin: 2px 0 0; color: var(--muted); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.status-dot { width: 12px; height: 12px; flex: 0 0 auto; border-radius: 50%; background: #64748b; box-shadow: 0 0 0 5px rgba(100, 116, 139, .15); }
.status-dot.connected { background: #34d399; box-shadow: 0 0 0 5px rgba(52, 211, 153, .15); }
.status-dot.partial { background: #fbbf24; box-shadow: 0 0 0 5px rgba(251, 191, 36, .15); }

main { width: min(920px, 100%); margin: 0 auto; padding: 16px 12px calc(30px + var(--safe-bottom)); }
.panel { margin-bottom: 13px; padding: 17px; border: 1px solid var(--line); border-radius: 18px; background: linear-gradient(155deg, rgba(20, 37, 58, .96), rgba(12, 27, 43, .98)); box-shadow: 0 14px 45px rgba(0, 0, 0, .16); }
.collapsible { overflow: hidden; padding: 0; }
.section-summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 10px;
  min-height: 70px;
  padding: 14px 17px;
  cursor: pointer;
  list-style: none;
  user-select: none;
}
.section-summary::-webkit-details-marker { display: none; }
.section-summary::after { content: '\u203A'; color: var(--muted); font-size: 28px; line-height: 1; transform: rotate(90deg); transition: transform .16s ease; }
.collapsible[open] > .section-summary::after { transform: rotate(-90deg); }
.section-summary .eyebrow { display: block; }
.summary-title { display: block; overflow: hidden; color: var(--text); font-size: 18px; font-weight: 800; line-height: 1.2; text-overflow: ellipsis; white-space: nowrap; }
.summary-status { max-width: 42vw; overflow: hidden; color: var(--muted); font-size: 12px; font-weight: 750; text-align: right; text-overflow: ellipsis; white-space: nowrap; }
.section-body { padding: 2px 17px 17px; border-top: 1px solid rgba(38, 59, 82, .72); }
.section-intro { margin: 12px 0 0; font-size: 12px; }
.header-actions { display: flex; flex: 0 0 auto; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }
.pair-panel { max-width: 480px; margin: 8vh auto 0; padding: 24px; }
.pair-panel h2 { font-size: 25px; }
h2 { margin: 2px 0 6px; font-size: 20px; line-height: 1.2; }
.eyebrow { margin: 0 0 4px; color: var(--accent); font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.muted, .hint { color: var(--muted); }
.hint { margin: 12px 0 0; font-size: 12px; line-height: 1.45; }
.ellipsis { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
label { display: grid; gap: 7px; color: #c4d3e2; font-size: 13px; font-weight: 700; }
input, select, textarea { width: 100%; min-height: 48px; border: 1px solid #35506c; border-radius: 12px; outline: none; color: var(--text); background: #091725; padding: 11px 13px; }
input:focus, select:focus, textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(56, 189, 248, .15); }
textarea { min-height: 92px; resize: vertical; line-height: 1.45; }
.pair-panel input { margin: 8px 0 12px; text-align: center; font-size: 30px; font-weight: 800; letter-spacing: .22em; }

button { min-height: 46px; border: 1px solid #38536d; border-radius: 12px; color: var(--text); background: #19304a; padding: 9px 13px; font-weight: 750; cursor: pointer; }
button:active { transform: scale(.975); filter: brightness(1.18); }
button:focus-visible { outline: 3px solid rgba(56, 189, 248, .8); outline-offset: 2px; }
button.primary { border-color: #38bdf8; color: #00151f; background: linear-gradient(145deg, #67d4ff, #0ea5e9); }
button.ghost { background: transparent; }
button.danger { border-color: rgba(251, 113, 133, .6); color: #fecdd3; background: rgba(136, 19, 55, .25); }
button.compact { min-height: 38px; padding: 6px 10px; font-size: 12px; }
button.wide { width: 100%; }
.error { min-height: 1.25em; margin: 10px 0 0; color: #fda4af; font-size: 13px; }
.section-heading, .now-playing { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.section-heading > div:first-child, .now-playing > div:first-child { min-width: 0; }
.now-playing > div:first-child { flex: 1 1 auto; max-width: 100%; overflow: hidden; }
#pageTitle {
  display: -webkit-box;
  max-width: 100%;
  overflow: hidden;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.profiles { display: grid; gap: 10px; margin-top: 14px; }
.profile { display: grid; grid-template-columns: minmax(90px, .7fr) minmax(130px, 1.5fr) auto; gap: 9px; align-items: center; padding: 11px; border: 1px solid #2b455f; border-radius: 14px; background: rgba(5, 15, 26, .35); }
.profile.active { border-color: var(--accent); background: rgba(14, 165, 233, .1); }
.profile-name { font-weight: 800; }
.profile select { min-height: 42px; padding: 8px 10px; font-size: 12px; }
.profile button { min-height: 42px; }
.profile-editor { margin: 13px 0; padding: 13px; border: 1px solid var(--line); border-radius: 14px; }
.profile-editor-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 10px; }
.inline-actions { display: flex; justify-content: flex-end; flex-wrap: wrap; gap: 9px; margin-top: 12px; }

.text-form { display: grid; grid-template-columns: 1fr auto auto; gap: 8px; margin-top: 13px; }
.site-status { flex: 0 0 auto; color: #f9a8d4; font-size: 12px; font-weight: 800; }
.site-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 13px; }
.player-site-actions { grid-template-columns: repeat(4, 1fr); }
.site-selectors { display: grid; grid-template-columns: minmax(150px, 1fr) auto minmax(130px, .8fr) auto; gap: 8px; align-items: end; margin-top: 10px; }
.site-selectors select { min-height: 42px; padding: 8px 10px; }
.site-selectors button { min-height: 42px; }
.manual-mode-row { display: flex; align-items: end; justify-content: space-between; gap: 12px; padding-top: 10px; }
.manual-mode-row .section-intro { margin: 0; }
.control-grid { display: grid; grid-template-columns: 1fr; gap: 13px; padding-top: 10px; }
.control-surface { min-width: 0; padding: 13px; border: 1px solid #2b455f; border-radius: 14px; background: rgba(5, 15, 26, .3); }
.dpad-panel, .touch-panel { min-width: 0; }
.dpad { display: grid; grid-template: repeat(3, 60px) / repeat(3, 60px); justify-content: center; gap: 7px; margin: 12px auto; }
.dpad button { min-height: 60px; padding: 0; font-size: 20px; }
.dpad .up { grid-area: 1 / 2; }
.dpad .left { grid-area: 2 / 1; }
.dpad .ok { grid-area: 2 / 2; border-radius: 50%; color: #00131d; background: var(--accent); }
.dpad .right { grid-area: 2 / 3; }
.dpad .down { grid-area: 3 / 2; }
.three-buttons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; }
.manual-history { margin-top: 10px; }
.mode { display: flex; align-items: center; gap: 7px; font-size: 11px; }
.mode select { width: auto; min-height: 38px; padding: 6px 9px; }
.touchpad { display: grid; place-items: center; height: 224px; margin-top: 12px; border: 1px solid #3c5a76; border-radius: 17px; color: #8ca8c1; background: radial-gradient(circle at 50% 42%, rgba(56, 189, 248, .11), transparent 55%), #081522; user-select: none; touch-action: none; }
.touchpad.active { border-color: var(--accent); color: #d9f4ff; }

.time { color: var(--muted); font-variant-numeric: tabular-nums; font-size: 13px; }
.player-meta { display: flex; align-items: end; justify-content: space-between; gap: 12px; padding-top: 11px; }
.seek-setting { display: flex; align-items: center; gap: 7px; font-size: 11px; }
.seek-setting select { width: auto; min-height: 38px; padding: 6px 9px; }
.media-controls { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-top: 13px; }
.media-controls .play { grid-column: span 2; }
.media-controls .wide-control { grid-column: span 6; }
.page-items { display: grid; gap: 8px; max-height: 54vh; overflow: auto; margin-top: 10px; padding-right: 2px; }
.video-results { display: grid; gap: 9px; max-height: 62vh; overflow: auto; margin-top: 10px; padding-right: 2px; }
.page-item { display: grid; grid-template-columns: 54px 1fr; gap: 10px; align-items: center; width: 100%; min-height: 56px; text-align: left; }
.page-item .kind { color: var(--accent); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
.page-item .label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.page-item .detail { display: block; margin-top: 2px; color: var(--muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.video-result { min-height: 72px; border-color: #2d5877; background: linear-gradient(145deg, rgba(24, 58, 83, .95), rgba(15, 39, 60, .98)); }
.video-result .kind { display: grid; place-items: center; align-self: stretch; border-right: 1px solid rgba(56, 189, 248, .22); }
.video-result .label { display: -webkit-box; overflow: hidden; white-space: normal; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-height: 1.35; }
.filter { margin-top: 10px; }
.diagnostics summary { cursor: pointer; font-weight: 800; }
.diagnostics dl { display: grid; gap: 7px; }
.diagnostics dl div { display: grid; grid-template-columns: 130px 1fr; gap: 12px; }
.diagnostics dt { color: var(--muted); }
.diagnostics dd { margin: 0; overflow-wrap: anywhere; }
.toast { position: fixed; z-index: 30; left: 50%; bottom: calc(18px + var(--safe-bottom)); transform: translateX(-50%) translateY(20px); width: max-content; max-width: calc(100% - 28px); margin: 0; padding: 11px 15px; border: 1px solid #3a5872; border-radius: 999px; color: white; background: rgba(7, 17, 31, .96); opacity: 0; pointer-events: none; transition: opacity .18s, transform .18s; box-shadow: 0 12px 35px rgba(0,0,0,.4); }
.toast.visible { opacity: 1; transform: translateX(-50%) translateY(0); }

@media (max-width: 680px) {
  .profile { grid-template-columns: 86px 1fr; }
  .profile button { grid-column: 1 / -1; }
  .profile-editor-grid { grid-template-columns: 1fr; }
  .text-form { grid-template-columns: 1fr 1fr; }
  .text-form input { grid-column: 1 / -1; }
  .site-actions { grid-template-columns: repeat(2, 1fr); }
  .site-selectors { grid-template-columns: 1fr auto; }
  .media-controls { grid-template-columns: repeat(3, 1fr); }
  .media-controls .play { grid-column: span 1; }
  .media-controls .wide-control { grid-column: span 3; }
  .now-playing { align-items: flex-start; }
  .now-playing { flex-direction: column; }
  .now-playing > div:first-child { width: 100%; }
  .header-actions { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
  .summary-status { max-width: 34vw; }
  .player-site-actions { grid-template-columns: repeat(2, 1fr); }
  .manual-mode-row { align-items: stretch; flex-direction: column; }
  .manual-mode-row .mode { justify-content: space-between; }
}

@media (max-width: 390px) {
  main { padding-left: 8px; padding-right: 8px; }
  .panel { padding: 14px; border-radius: 15px; }
  .collapsible { padding: 0; }
  .section-summary { min-height: 64px; padding: 12px 14px; }
  .section-body { padding: 2px 14px 14px; }
  .summary-title { font-size: 16px; }
  .header-actions button { min-height: 34px; padding: 5px 8px; font-size: 11px; }
  .dpad { grid-template: repeat(3, 56px) / repeat(3, 56px); }
  .dpad button { min-height: 56px; }
  .three-buttons button { padding-left: 5px; padding-right: 5px; font-size: 12px; }
}
`,
      "manifest.webmanifest": '{\n  "name": "Web Remote TV",\n  "short_name": "TV Remote",\n  "description": "Local phone controller for Web Remote TV on TizenBrew.",\n  "start_url": "/",\n  "display": "standalone",\n  "background_color": "#07111f",\n  "theme_color": "#07111f",\n  "icons": [\n    {\n      "src": "/icon.svg",\n      "sizes": "any",\n      "type": "image/svg+xml",\n      "purpose": "any maskable"\n    }\n  ]\n}\n',
      "icon.svg": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n  <rect width="512" height="512" rx="112" fill="#07111f"/>\n  <rect x="72" y="94" width="368" height="252" rx="38" fill="#14253a" stroke="#38bdf8" stroke-width="20"/>\n  <path d="M188 418h136M256 346v72" stroke="#dff6ff" stroke-width="24" stroke-linecap="round"/>\n  <path d="M188 260l136-136M234 124h90v90" fill="none" stroke="#38bdf8" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n'
    };
  }
});

// node_modules/.pnpm/safe-buffer@5.1.2/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/.pnpm/safe-buffer@5.1.2/node_modules/safe-buffer/index.js"(exports2, module2) {
    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function (size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/.pnpm/async-limiter@1.0.1/node_modules/async-limiter/index.js
var require_async_limiter = __commonJS({
  "node_modules/.pnpm/async-limiter@1.0.1/node_modules/async-limiter/index.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    function Queue(options) {
      if (!(this instanceof Queue)) {
        return new Queue(options);
      }
      options = options || {};
      this.concurrency = options.concurrency || Infinity;
      this.pending = 0;
      this.jobs = [];
      this.cbs = [];
      this._done = done.bind(this);
    }
    var arrayAddMethods = ["push", "unshift", "splice"];
    arrayAddMethods.forEach(function (method) {
      Queue.prototype[method] = function () {
        var methodResult = Array.prototype[method].apply(this.jobs, arguments);
        this._run();
        return methodResult;
      };
    });
    Object.defineProperty(Queue.prototype, "length", {
      get: function get() {
        return this.pending + this.jobs.length;
      }
    });
    Queue.prototype._run = function () {
      if (this.pending === this.concurrency) {
        return;
      }
      if (this.jobs.length) {
        var job = this.jobs.shift();
        this.pending++;
        job(this._done);
        this._run();
      }
      if (this.pending === 0) {
        while (this.cbs.length !== 0) {
          var cb = this.cbs.pop();
          process.nextTick(cb);
        }
      }
    };
    Queue.prototype.onDone = function (cb) {
      if (typeof cb === "function") {
        this.cbs.push(cb);
        this._run();
      }
    };
    function done() {
      this.pending--;
      this._run();
    }
    module2.exports = Queue;
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/buffer-util.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var safeBuffer = require_safe_buffer();
    var Buffer2 = safeBuffer.Buffer;
    var concat = function concat(list, totalLength) {
      var target = Buffer2.allocUnsafe(totalLength);
      var offset = 0;
      for (var i = 0; i < list.length; i++) {
        var buf = list[i];
        buf.copy(target, offset);
        offset += buf.length;
      }
      return target;
    };
    try {
      var bufferUtil = require("bufferutil");
      module2.exports = Object.assign({
        concat
      }, bufferUtil.BufferUtil || bufferUtil);
    } catch (e) {
      var mask = function mask(source, mask2, output, offset, length) {
        for (var i = 0; i < length; i++) {
          output[offset + i] = source[i] ^ mask2[i & 3];
        }
      };
      var unmask = function unmask(buffer, mask2) {
        var length = buffer.length;
        for (var i = 0; i < length; i++) {
          buffer[i] ^= mask2[i & 3];
        }
      };
      module2.exports = {
        concat,
        mask,
        unmask
      };
    }
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/permessage-deflate.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var safeBuffer = require_safe_buffer();
    var Limiter = require_async_limiter();
    var zlib = require("zlib");
    var bufferUtil = require_buffer_util();
    var Buffer2 = safeBuffer.Buffer;
    var TRAILER = Buffer2.from([0, 0, 255, 255]);
    var EMPTY_BLOCK = Buffer2.from([0]);
    var kWriteInProgress = Symbol("write-in-progress");
    var kPendingClose = Symbol("pending-close");
    var kTotalLength = Symbol("total-length");
    var kCallback = Symbol("callback");
    var kBuffers = Symbol("buffers");
    var kError = Symbol("error");
    var kOwner = Symbol("owner");
    var zlibLimiter;
    var PerMessageDeflate = /*#__PURE__*/function () {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} options.serverNoContextTakeover Request/accept disabling
       *     of server context takeover
       * @param {Boolean} options.clientNoContextTakeover Advertise/acknowledge
       *     disabling of client context takeover
       * @param {(Boolean|Number)} options.serverMaxWindowBits Request/confirm the
       *     use of a custom server window size
       * @param {(Boolean|Number)} options.clientMaxWindowBits Advertise support
       *     for, or request, a custom client window size
       * @param {Object} options.zlibDeflateOptions Options to pass to zlib on deflate
       * @param {Object} options.zlibInflateOptions Options to pass to zlib on inflate
       * @param {Number} options.threshold Size (in bytes) below which messages
       *     should not be compressed
       * @param {Number} options.concurrencyLimit The number of concurrent calls to
       *     zlib
       * @param {Boolean} isServer Create the instance in either server or client
       *     mode
       * @param {Number} maxPayload The maximum allowed message length
       */
      function PerMessageDeflate(options, isServer, maxPayload) {
        _classCallCheck(this, PerMessageDeflate);
        this._maxPayload = maxPayload | 0;
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._isServer = !!isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          var concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter({
            concurrency
          });
        }
      }
      /**
       * @type {String}
       */
      return _createClass(PerMessageDeflate, [{
        key: "offer",
        value:
        /**
         * Create an extension negotiation offer.
         *
         * @return {Object} Extension parameters
         * @public
         */
        function offer() {
          var params = {};
          if (this._options.serverNoContextTakeover) {
            params.server_no_context_takeover = true;
          }
          if (this._options.clientNoContextTakeover) {
            params.client_no_context_takeover = true;
          }
          if (this._options.serverMaxWindowBits) {
            params.server_max_window_bits = this._options.serverMaxWindowBits;
          }
          if (this._options.clientMaxWindowBits) {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          } else if (this._options.clientMaxWindowBits == null) {
            params.client_max_window_bits = true;
          }
          return params;
        }
        /**
         * Accept an extension negotiation offer/response.
         *
         * @param {Array} configurations The extension negotiation offers/reponse
         * @return {Object} Accepted configuration
         * @public
         */
      }, {
        key: "accept",
        value: function accept(configurations) {
          configurations = this.normalizeParams(configurations);
          this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
          return this.params;
        }
        /**
         * Releases all resources used by the extension.
         *
         * @public
         */
      }, {
        key: "cleanup",
        value: function cleanup() {
          if (this._inflate) {
            if (this._inflate[kWriteInProgress]) {
              this._inflate[kPendingClose] = true;
            } else {
              this._inflate.close();
              this._inflate = null;
            }
          }
          if (this._deflate) {
            if (this._deflate[kWriteInProgress]) {
              this._deflate[kPendingClose] = true;
            } else {
              this._deflate.close();
              this._deflate = null;
            }
          }
        }
        /**
         *  Accept an extension negotiation offer.
         *
         * @param {Array} offers The extension negotiation offers
         * @return {Object} Accepted configuration
         * @private
         */
      }, {
        key: "acceptAsServer",
        value: function acceptAsServer(offers) {
          var opts = this._options;
          var accepted = offers.find(function (params) {
            if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
              return false;
            }
            return true;
          });
          if (!accepted) {
            throw new Error("None of the extension offers can be accepted");
          }
          if (opts.serverNoContextTakeover) {
            accepted.server_no_context_takeover = true;
          }
          if (opts.clientNoContextTakeover) {
            accepted.client_no_context_takeover = true;
          }
          if (typeof opts.serverMaxWindowBits === "number") {
            accepted.server_max_window_bits = opts.serverMaxWindowBits;
          }
          if (typeof opts.clientMaxWindowBits === "number") {
            accepted.client_max_window_bits = opts.clientMaxWindowBits;
          } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
            delete accepted.client_max_window_bits;
          }
          return accepted;
        }
        /**
         * Accept the extension negotiation response.
         *
         * @param {Array} response The extension negotiation response
         * @return {Object} Accepted configuration
         * @private
         */
      }, {
        key: "acceptAsClient",
        value: function acceptAsClient(response) {
          var params = response[0];
          if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
            throw new Error('Unexpected parameter "client_no_context_takeover"');
          }
          if (!params.client_max_window_bits) {
            if (typeof this._options.clientMaxWindowBits === "number") {
              params.client_max_window_bits = this._options.clientMaxWindowBits;
            }
          } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
            throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
          }
          return params;
        }
        /**
         * Normalize parameters.
         *
         * @param {Array} configurations The extension negotiation offers/reponse
         * @return {Array} The offers/response with normalized parameters
         * @private
         */
      }, {
        key: "normalizeParams",
        value: function normalizeParams(configurations) {
          var _this = this;
          configurations.forEach(function (params) {
            Object.keys(params).forEach(function (key) {
              var value = params[key];
              if (value.length > 1) {
                throw new Error(`Parameter "${key}" must have only a single value`);
              }
              value = value[0];
              if (key === "client_max_window_bits") {
                if (value !== true) {
                  var num = +value;
                  if (!Number.isInteger(num) || num < 8 || num > 15) {
                    throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
                  }
                  value = num;
                } else if (!_this._isServer) {
                  throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
                }
              } else if (key === "server_max_window_bits") {
                var _num = +value;
                if (!Number.isInteger(_num) || _num < 8 || _num > 15) {
                  throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
                }
                value = _num;
              } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
                if (value !== true) {
                  throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
                }
              } else {
                throw new Error(`Unknown parameter "${key}"`);
              }
              params[key] = value;
            });
          });
          return configurations;
        }
        /**
         * Decompress data. Concurrency limited by async-limiter.
         *
         * @param {Buffer} data Compressed data
         * @param {Boolean} fin Specifies whether or not this is the last fragment
         * @param {Function} callback Callback
         * @public
         */
      }, {
        key: "decompress",
        value: function decompress(data, fin, callback) {
          var _this2 = this;
          zlibLimiter.push(function (done) {
            _this2._decompress(data, fin, function (err, result) {
              done();
              callback(err, result);
            });
          });
        }
        /**
         * Compress data. Concurrency limited by async-limiter.
         *
         * @param {Buffer} data Data to compress
         * @param {Boolean} fin Specifies whether or not this is the last fragment
         * @param {Function} callback Callback
         * @public
         */
      }, {
        key: "compress",
        value: function compress(data, fin, callback) {
          var _this3 = this;
          zlibLimiter.push(function (done) {
            _this3._compress(data, fin, function (err, result) {
              done();
              callback(err, result);
            });
          });
        }
        /**
         * Decompress data.
         *
         * @param {Buffer} data Compressed data
         * @param {Boolean} fin Specifies whether or not this is the last fragment
         * @param {Function} callback Callback
         * @private
         */
      }, {
        key: "_decompress",
        value: function _decompress(data, fin, callback) {
          var _this4 = this;
          var endpoint = this._isServer ? "client" : "server";
          if (!this._inflate) {
            var key = `${endpoint}_max_window_bits`;
            var windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
            this._inflate = zlib.createInflateRaw(Object.assign({}, this._options.zlibInflateOptions, {
              windowBits
            }));
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            this._inflate[kOwner] = this;
            this._inflate.on("error", inflateOnError);
            this._inflate.on("data", inflateOnData);
          }
          this._inflate[kCallback] = callback;
          this._inflate[kWriteInProgress] = true;
          this._inflate.write(data);
          if (fin) this._inflate.write(TRAILER);
          this._inflate.flush(function () {
            var err = _this4._inflate[kError];
            if (err) {
              _this4._inflate.close();
              _this4._inflate = null;
              callback(err);
              return;
            }
            var data2 = bufferUtil.concat(_this4._inflate[kBuffers], _this4._inflate[kTotalLength]);
            if (fin && _this4.params[`${endpoint}_no_context_takeover`] || _this4._inflate[kPendingClose]) {
              _this4._inflate.close();
              _this4._inflate = null;
            } else {
              _this4._inflate[kWriteInProgress] = false;
              _this4._inflate[kTotalLength] = 0;
              _this4._inflate[kBuffers] = [];
            }
            callback(null, data2);
          });
        }
        /**
         * Compress data.
         *
         * @param {Buffer} data Data to compress
         * @param {Boolean} fin Specifies whether or not this is the last fragment
         * @param {Function} callback Callback
         * @private
         */
      }, {
        key: "_compress",
        value: function _compress(data, fin, callback) {
          var _this5 = this;
          if (!data || data.length === 0) {
            process.nextTick(callback, null, EMPTY_BLOCK);
            return;
          }
          var endpoint = this._isServer ? "server" : "client";
          if (!this._deflate) {
            var key = `${endpoint}_max_window_bits`;
            var windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
            this._deflate = zlib.createDeflateRaw(Object.assign(
            // TODO deprecate memLevel/level and recommend zlibDeflateOptions instead
            {
              memLevel: this._options.memLevel,
              level: this._options.level
            }, this._options.zlibDeflateOptions, {
              windowBits
            }));
            this._deflate[kTotalLength] = 0;
            this._deflate[kBuffers] = [];
            this._deflate.on("data", deflateOnData);
          }
          this._deflate[kWriteInProgress] = true;
          this._deflate.write(data);
          this._deflate.flush(zlib.Z_SYNC_FLUSH, function () {
            var data2 = bufferUtil.concat(_this5._deflate[kBuffers], _this5._deflate[kTotalLength]);
            if (fin) data2 = data2.slice(0, data2.length - 4);
            if (fin && _this5.params[`${endpoint}_no_context_takeover`] || _this5._deflate[kPendingClose]) {
              _this5._deflate.close();
              _this5._deflate = null;
            } else {
              _this5._deflate[kWriteInProgress] = false;
              _this5._deflate[kTotalLength] = 0;
              _this5._deflate[kBuffers] = [];
            }
            callback(null, data2);
          });
        }
      }], [{
        key: "extensionName",
        get: function get() {
          return "permessage-deflate";
        }
      }]);
    }();
    module2.exports = PerMessageDeflate;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kOwner]._maxPayload < 1 || this[kTotalLength] <= this[kOwner]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].closeCode = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kOwner]._inflate = null;
      this[kCallback](err);
    }
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/event-target.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var Event = /*#__PURE__*/_createClass(
    /**
     * Create a new `Event`.
     *
     * @param {String} type The name of the event
     * @param {Object} target A reference to the target to which the event was dispatched
     */
    function Event(type, target) {
      _classCallCheck(this, Event);
      this.target = target;
      this.type = type;
    });
    var MessageEvent = /*#__PURE__*/function (_Event) {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
       * @param {WebSocket} target A reference to the target to which the event was dispatched
       */
      function MessageEvent(data, target) {
        var _this6;
        _classCallCheck(this, MessageEvent);
        _this6 = _callSuper(this, MessageEvent, ["message", target]);
        _this6.data = data;
        return _this6;
      }
      _inherits(MessageEvent, _Event);
      return _createClass(MessageEvent);
    }(Event);
    var CloseEvent = /*#__PURE__*/function (_Event2) {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {Number} code The status code explaining why the connection is being closed
       * @param {String} reason A human-readable string explaining why the connection is closing
       * @param {WebSocket} target A reference to the target to which the event was dispatched
       */
      function CloseEvent(code, reason, target) {
        var _this7;
        _classCallCheck(this, CloseEvent);
        _this7 = _callSuper(this, CloseEvent, ["close", target]);
        _this7.wasClean = target._closeFrameReceived && target._closeFrameSent;
        _this7.reason = reason;
        _this7.code = code;
        return _this7;
      }
      _inherits(CloseEvent, _Event2);
      return _createClass(CloseEvent);
    }(Event);
    var OpenEvent = /*#__PURE__*/function (_Event3) {
      /**
       * Create a new `OpenEvent`.
       *
       * @param {WebSocket} target A reference to the target to which the event was dispatched
       */
      function OpenEvent(target) {
        _classCallCheck(this, OpenEvent);
        return _callSuper(this, OpenEvent, ["open", target]);
      }
      _inherits(OpenEvent, _Event3);
      return _createClass(OpenEvent);
    }(Event);
    var ErrorEvent = /*#__PURE__*/function (_Event4) {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {Object} error The error that generated this event
       * @param {WebSocket} target A reference to the target to which the event was dispatched
       */
      function ErrorEvent(error, target) {
        var _this8;
        _classCallCheck(this, ErrorEvent);
        _this8 = _callSuper(this, ErrorEvent, ["error", target]);
        _this8.message = error.message;
        _this8.error = error;
        return _this8;
      }
      _inherits(ErrorEvent, _Event4);
      return _createClass(ErrorEvent);
    }(Event);
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} method A string representing the event type to listen for
       * @param {Function} listener The listener to add
       * @public
       */
      addEventListener(method, listener) {
        if (typeof listener !== "function") return;
        function onMessage(data) {
          listener.call(this, new MessageEvent(data, this));
        }
        function onClose(code, message) {
          listener.call(this, new CloseEvent(code, message, this));
        }
        function onError(error) {
          listener.call(this, new ErrorEvent(error, this));
        }
        function onOpen() {
          listener.call(this, new OpenEvent(this));
        }
        if (method === "message") {
          onMessage._listener = listener;
          this.on(method, onMessage);
        } else if (method === "close") {
          onClose._listener = listener;
          this.on(method, onClose);
        } else if (method === "error") {
          onError._listener = listener;
          this.on(method, onError);
        } else if (method === "open") {
          onOpen._listener = listener;
          this.on(method, onOpen);
        } else {
          this.on(method, listener);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} method A string representing the event type to remove
       * @param {Function} listener The listener to remove
       * @public
       */
      removeEventListener(method, listener) {
        var listeners = this.listeners(method);
        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i] === listener || listeners[i]._listener === listener) {
            this.removeListener(method, listeners[i]);
          }
        }
      }
    };
    module2.exports = EventTarget;
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/extension.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var tokenChars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0 - 15
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 16 - 31
    0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0,
    // 32 - 47
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    // 48 - 63
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    // 64 - 79
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    // 80 - 95
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    // 96 - 111
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0
    // 112 - 127
    ];
    function push(dest, name, elem) {
      if (Object.prototype.hasOwnProperty.call(dest, name)) dest[name].push(elem);else dest[name] = [elem];
    }
    function parse(header) {
      var offers = {};
      if (header === void 0 || header === "") return offers;
      var params = {};
      var mustUnescape = false;
      var isEscaping = false;
      var inQuotes = false;
      var extensionName;
      var paramName;
      var start = -1;
      var end = -1;
      for (var i = 0; i < header.length; i++) {
        var code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            var name = header.slice(start, end);
            if (code === 44) {
              push(offers, name, params);
              params = {};
            } else {
              extensionName = name;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = {};
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1) start = i;else if (!mustUnescape) mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1) start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            var value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = {};
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1) end = i;
      var token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, {});
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map(function (extension) {
        var configurations = extensions[extension];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations.map(function (params) {
          return [extension].concat(Object.keys(params).map(function (k) {
            var values = params[k];
            if (!Array.isArray(values)) values = [values];
            return values.map(function (v) {
              return v === true ? k : `${k}=${v}`;
            }).join("; ");
          })).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module2.exports = {
      format,
      parse
    };
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/constants.js"(exports2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var safeBuffer = require_safe_buffer();
    var Buffer2 = safeBuffer.Buffer;
    exports2.BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"];
    exports2.GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    exports2.EMPTY_BUFFER = Buffer2.alloc(0);
    exports2.NOOP = function () {};
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/validation.js"(exports2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    try {
      var isValidUTF8 = require("utf-8-validate");
      exports2.isValidUTF8 = _typeof(isValidUTF8) === "object" ? isValidUTF8.Validation.isValidUTF8 : isValidUTF8;
    } catch (e) {
      exports2.isValidUTF8 = function () {
        return true;
      };
    }
    exports2.isValidStatusCode = function (code) {
      return code >= 1e3 && code <= 1013 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    };
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/receiver.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var safeBuffer = require_safe_buffer();
    var PerMessageDeflate = require_permessage_deflate();
    var bufferUtil = require_buffer_util();
    var validation = require_validation();
    var constants = require_constants();
    var Buffer2 = safeBuffer.Buffer;
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var Receiver = /*#__PURE__*/function () {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} extensions An object containing the negotiated extensions
       * @param {Number} maxPayload The maximum allowed message length
       * @param {String} binaryType The type for binary data
       */
      function Receiver(extensions, maxPayload, binaryType) {
        _classCallCheck(this, Receiver);
        this._binaryType = binaryType || constants.BINARY_TYPES[0];
        this._extensions = extensions || {};
        this._maxPayload = maxPayload | 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._mask = null;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._cleanupCallback = null;
        this._isCleaningUp = false;
        this._hadError = false;
        this._loop = false;
        this.add = this.add.bind(this);
        this.onmessage = null;
        this.onclose = null;
        this.onerror = null;
        this.onping = null;
        this.onpong = null;
        this._state = GET_INFO;
      }
      /**
       * Consumes `n` bytes from the buffered data, calls `cleanup` if necessary.
       *
       * @param {Number} n The number of bytes to consume
       * @return {(Buffer|null)} The consumed bytes or `null` if `n` bytes are not
       *     available
       * @private
       */
      return _createClass(Receiver, [{
        key: "consume",
        value: function consume(n) {
          if (this._bufferedBytes < n) {
            this._loop = false;
            if (this._isCleaningUp) this.cleanup(this._cleanupCallback);
            return null;
          }
          this._bufferedBytes -= n;
          if (n === this._buffers[0].length) return this._buffers.shift();
          if (n < this._buffers[0].length) {
            var buf = this._buffers[0];
            this._buffers[0] = buf.slice(n);
            return buf.slice(0, n);
          }
          var dst = Buffer2.allocUnsafe(n);
          do {
            var _buf = this._buffers[0];
            if (n >= _buf.length) {
              this._buffers.shift().copy(dst, dst.length - n);
            } else {
              _buf.copy(dst, dst.length - n, 0, n);
              this._buffers[0] = _buf.slice(n);
            }
            n -= _buf.length;
          } while (n > 0);
          return dst;
        }
        /**
         * Adds new data to the parser.
         *
         * @param {Buffer} chunk A chunk of data
         * @public
         */
      }, {
        key: "add",
        value: function add(chunk) {
          this._bufferedBytes += chunk.length;
          this._buffers.push(chunk);
          this.startLoop();
        }
        /**
         * Starts the parsing loop.
         *
         * @private
         */
      }, {
        key: "startLoop",
        value: function startLoop() {
          this._loop = true;
          do {
            switch (this._state) {
              case GET_INFO:
                this.getInfo();
                break;
              case GET_PAYLOAD_LENGTH_16:
                this.getPayloadLength16();
                break;
              case GET_PAYLOAD_LENGTH_64:
                this.getPayloadLength64();
                break;
              case GET_MASK:
                this.getMask();
                break;
              case GET_DATA:
                this.getData();
                break;
              default:
                this._loop = false;
            }
          } while (this._loop);
        }
        /**
         * Reads the first two bytes of a frame.
         *
         * @private
         */
      }, {
        key: "getInfo",
        value: function getInfo() {
          var buf = this.consume(2);
          if (buf === null) return;
          if ((buf[0] & 48) !== 0) {
            this.error(new RangeError("Invalid WebSocket frame: RSV2 and RSV3 must be clear"), 1002);
            return;
          }
          var compressed = (buf[0] & 64) === 64;
          if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
            this.error(new RangeError("Invalid WebSocket frame: RSV1 must be clear"), 1002);
            return;
          }
          this._fin = (buf[0] & 128) === 128;
          this._opcode = buf[0] & 15;
          this._payloadLength = buf[1] & 127;
          if (this._opcode === 0) {
            if (compressed) {
              this.error(new RangeError("Invalid WebSocket frame: RSV1 must be clear"), 1002);
              return;
            }
            if (!this._fragmented) {
              this.error(new RangeError("Invalid WebSocket frame: invalid opcode 0"), 1002);
              return;
            } else {
              this._opcode = this._fragmented;
            }
          } else if (this._opcode === 1 || this._opcode === 2) {
            if (this._fragmented) {
              this.error(new RangeError(`Invalid WebSocket frame: invalid opcode ${this._opcode}`), 1002);
              return;
            }
            this._compressed = compressed;
          } else if (this._opcode > 7 && this._opcode < 11) {
            if (!this._fin) {
              this.error(new RangeError("Invalid WebSocket frame: FIN must be set"), 1002);
              return;
            }
            if (compressed) {
              this.error(new RangeError("Invalid WebSocket frame: RSV1 must be clear"), 1002);
              return;
            }
            if (this._payloadLength > 125) {
              this.error(new RangeError(`Invalid WebSocket frame: invalid payload length ${this._payloadLength}`), 1002);
              return;
            }
          } else {
            this.error(new RangeError(`Invalid WebSocket frame: invalid opcode ${this._opcode}`), 1002);
            return;
          }
          if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
          this._masked = (buf[1] & 128) === 128;
          if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;else this.haveLength();
        }
        /**
         * Gets extended payload length (7+16).
         *
         * @private
         */
      }, {
        key: "getPayloadLength16",
        value: function getPayloadLength16() {
          var buf = this.consume(2);
          if (buf === null) return;
          this._payloadLength = buf.readUInt16BE(0, true);
          this.haveLength();
        }
        /**
         * Gets extended payload length (7+64).
         *
         * @private
         */
      }, {
        key: "getPayloadLength64",
        value: function getPayloadLength64() {
          var buf = this.consume(8);
          if (buf === null) return;
          var num = buf.readUInt32BE(0, true);
          if (num > Math.pow(2, 53 - 32) - 1) {
            this.error(new RangeError("Unsupported WebSocket frame: payload length > 2^53 - 1"), 1009);
            return;
          }
          this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4, true);
          this.haveLength();
        }
        /**
         * Payload length has been read.
         *
         * @private
         */
      }, {
        key: "haveLength",
        value: function haveLength() {
          if (this._opcode < 8 && this.maxPayloadExceeded(this._payloadLength)) {
            return;
          }
          if (this._masked) this._state = GET_MASK;else this._state = GET_DATA;
        }
        /**
         * Reads mask bytes.
         *
         * @private
         */
      }, {
        key: "getMask",
        value: function getMask() {
          this._mask = this.consume(4);
          if (this._mask === null) return;
          this._state = GET_DATA;
        }
        /**
         * Reads data bytes.
         *
         * @private
         */
      }, {
        key: "getData",
        value: function getData() {
          var data = constants.EMPTY_BUFFER;
          if (this._payloadLength) {
            data = this.consume(this._payloadLength);
            if (data === null) return;
            if (this._masked) bufferUtil.unmask(data, this._mask);
          }
          if (this._opcode > 7) {
            this.controlMessage(data);
          } else if (this._compressed) {
            this._state = INFLATING;
            this.decompress(data);
          } else if (this.pushFragment(data)) {
            this.dataMessage();
          }
        }
        /**
         * Decompresses data.
         *
         * @param {Buffer} data Compressed data
         * @private
         */
      }, {
        key: "decompress",
        value: function decompress(data) {
          var _this9 = this;
          var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
          perMessageDeflate.decompress(data, this._fin, function (err, buf) {
            if (err) {
              _this9.error(err, err.closeCode === 1009 ? 1009 : 1007);
              return;
            }
            if (_this9.pushFragment(buf)) _this9.dataMessage();
            _this9.startLoop();
          });
        }
        /**
         * Handles a data message.
         *
         * @private
         */
      }, {
        key: "dataMessage",
        value: function dataMessage() {
          if (this._fin) {
            var messageLength = this._messageLength;
            var fragments = this._fragments;
            this._totalPayloadLength = 0;
            this._messageLength = 0;
            this._fragmented = 0;
            this._fragments = [];
            if (this._opcode === 2) {
              var data;
              if (this._binaryType === "nodebuffer") {
                data = toBuffer(fragments, messageLength);
              } else if (this._binaryType === "arraybuffer") {
                data = toArrayBuffer(toBuffer(fragments, messageLength));
              } else {
                data = fragments;
              }
              this.onmessage(data);
            } else {
              var buf = toBuffer(fragments, messageLength);
              if (!validation.isValidUTF8(buf)) {
                this.error(new Error("Invalid WebSocket frame: invalid UTF-8 sequence"), 1007);
                return;
              }
              this.onmessage(buf.toString());
            }
          }
          this._state = GET_INFO;
        }
        /**
         * Handles a control message.
         *
         * @param {Buffer} data Data to handle
         * @private
         */
      }, {
        key: "controlMessage",
        value: function controlMessage(data) {
          if (this._opcode === 8) {
            if (data.length === 0) {
              this._loop = false;
              this.onclose(1005, "");
              this.cleanup(this._cleanupCallback);
            } else if (data.length === 1) {
              this.error(new RangeError("Invalid WebSocket frame: invalid payload length 1"), 1002);
            } else {
              var code = data.readUInt16BE(0, true);
              if (!validation.isValidStatusCode(code)) {
                this.error(new RangeError(`Invalid WebSocket frame: invalid status code ${code}`), 1002);
                return;
              }
              var buf = data.slice(2);
              if (!validation.isValidUTF8(buf)) {
                this.error(new Error("Invalid WebSocket frame: invalid UTF-8 sequence"), 1007);
                return;
              }
              this._loop = false;
              this.onclose(code, buf.toString());
              this.cleanup(this._cleanupCallback);
            }
            return;
          }
          if (this._opcode === 9) this.onping(data);else this.onpong(data);
          this._state = GET_INFO;
        }
        /**
         * Handles an error.
         *
         * @param {Error} err The error
         * @param {Number} code Close code
         * @private
         */
      }, {
        key: "error",
        value: function error(err, code) {
          this._hadError = true;
          this._loop = false;
          this.onerror(err, code);
          this.cleanup(this._cleanupCallback);
        }
        /**
         * Checks payload size, disconnects socket when it exceeds `maxPayload`.
         *
         * @param {Number} length Payload length
         * @private
         */
      }, {
        key: "maxPayloadExceeded",
        value: function maxPayloadExceeded(length) {
          if (length === 0 || this._maxPayload < 1) return false;
          var fullLength = this._totalPayloadLength + length;
          if (fullLength <= this._maxPayload) {
            this._totalPayloadLength = fullLength;
            return false;
          }
          this.error(new RangeError("Max payload size exceeded"), 1009);
          return true;
        }
        /**
         * Appends a fragment in the fragments array after checking that the sum of
         * fragment lengths does not exceed `maxPayload`.
         *
         * @param {Buffer} fragment The fragment to add
         * @return {Boolean} `true` if `maxPayload` is not exceeded, else `false`
         * @private
         */
      }, {
        key: "pushFragment",
        value: function pushFragment(fragment) {
          if (fragment.length === 0) return true;
          var totalLength = this._messageLength + fragment.length;
          if (this._maxPayload < 1 || totalLength <= this._maxPayload) {
            this._messageLength = totalLength;
            this._fragments.push(fragment);
            return true;
          }
          this.error(new RangeError("Max payload size exceeded"), 1009);
          return false;
        }
        /**
         * Releases resources used by the receiver.
         *
         * @param {Function} cb Callback
         * @public
         */
      }, {
        key: "cleanup",
        value: function cleanup(cb) {
          if (this._extensions === null) {
            if (cb) cb();
            return;
          }
          if (!this._hadError && (this._loop || this._state === INFLATING)) {
            this._cleanupCallback = cb;
            this._isCleaningUp = true;
            return;
          }
          this._extensions = null;
          this._fragments = null;
          this._buffers = null;
          this._mask = null;
          this._cleanupCallback = null;
          this.onmessage = null;
          this.onclose = null;
          this.onerror = null;
          this.onping = null;
          this.onpong = null;
          if (cb) cb();
        }
      }]);
    }();
    module2.exports = Receiver;
    function toBuffer(fragments, messageLength) {
      if (fragments.length === 1) return fragments[0];
      if (fragments.length > 1) return bufferUtil.concat(fragments, messageLength);
      return constants.EMPTY_BUFFER;
    }
    function toArrayBuffer(buf) {
      if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/sender.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var safeBuffer = require_safe_buffer();
    var crypto2 = require("crypto");
    var PerMessageDeflate = require_permessage_deflate();
    var bufferUtil = require_buffer_util();
    var validation = require_validation();
    var constants = require_constants();
    var Buffer2 = safeBuffer.Buffer;
    var Sender = /*#__PURE__*/function () {
      /**
       * Creates a Sender instance.
       *
       * @param {net.Socket} socket The connection socket
       * @param {Object} extensions An object containing the negotiated extensions
       */
      function _Sender(socket, extensions) {
        _classCallCheck(this, _Sender);
        this._extensions = extensions || {};
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._deflating = false;
        this._queue = [];
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {Buffer} data The data to frame
       * @param {Object} options Options object
       * @param {Number} options.opcode The opcode
       * @param {Boolean} options.readOnly Specifies whether `data` can be modified
       * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
       * @param {Boolean} options.mask Specifies whether or not to mask `data`
       * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
       * @return {Buffer[]} The framed data as a list of `Buffer` instances
       * @public
       */
      return _createClass(_Sender, [{
        key: "close",
        value:
        /**
         * Sends a close message to the other peer.
         *
         * @param {(Number|undefined)} code The status code component of the body
         * @param {String} data The message component of the body
         * @param {Boolean} mask Specifies whether or not to mask the message
         * @param {Function} cb Callback
         * @public
         */
        function close(code, data, mask, cb) {
          var buf;
          if (code === void 0) {
            buf = constants.EMPTY_BUFFER;
          } else if (typeof code !== "number" || !validation.isValidStatusCode(code)) {
            throw new TypeError("First argument must be a valid error code number");
          } else if (data === void 0 || data === "") {
            buf = Buffer2.allocUnsafe(2);
            buf.writeUInt16BE(code, 0, true);
          } else {
            buf = Buffer2.allocUnsafe(2 + Buffer2.byteLength(data));
            buf.writeUInt16BE(code, 0, true);
            buf.write(data, 2);
          }
          if (this._deflating) {
            this.enqueue([this.doClose, buf, mask, cb]);
          } else {
            this.doClose(buf, mask, cb);
          }
        }
        /**
         * Frames and sends a close message.
         *
         * @param {Buffer} data The message to send
         * @param {Boolean} mask Specifies whether or not to mask `data`
         * @param {Function} cb Callback
         * @private
         */
      }, {
        key: "doClose",
        value: function doClose(data, mask, cb) {
          this.sendFrame(_Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 8,
            mask,
            readOnly: false
          }), cb);
        }
        /**
         * Sends a ping message to the other peer.
         *
         * @param {*} data The message to send
         * @param {Boolean} mask Specifies whether or not to mask `data`
         * @param {Function} cb Callback
         * @public
         */
      }, {
        key: "ping",
        value: function ping(data, mask, cb) {
          var readOnly = true;
          if (!Buffer2.isBuffer(data)) {
            if (data instanceof ArrayBuffer) {
              data = Buffer2.from(data);
            } else if (ArrayBuffer.isView(data)) {
              data = viewToBuffer(data);
            } else {
              data = Buffer2.from(data);
              readOnly = false;
            }
          }
          if (this._deflating) {
            this.enqueue([this.doPing, data, mask, readOnly, cb]);
          } else {
            this.doPing(data, mask, readOnly, cb);
          }
        }
        /**
         * Frames and sends a ping message.
         *
         * @param {*} data The message to send
         * @param {Boolean} mask Specifies whether or not to mask `data`
         * @param {Boolean} readOnly Specifies whether `data` can be modified
         * @param {Function} cb Callback
         * @private
         */
      }, {
        key: "doPing",
        value: function doPing(data, mask, readOnly, cb) {
          this.sendFrame(_Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 9,
            mask,
            readOnly
          }), cb);
        }
        /**
         * Sends a pong message to the other peer.
         *
         * @param {*} data The message to send
         * @param {Boolean} mask Specifies whether or not to mask `data`
         * @param {Function} cb Callback
         * @public
         */
      }, {
        key: "pong",
        value: function pong(data, mask, cb) {
          var readOnly = true;
          if (!Buffer2.isBuffer(data)) {
            if (data instanceof ArrayBuffer) {
              data = Buffer2.from(data);
            } else if (ArrayBuffer.isView(data)) {
              data = viewToBuffer(data);
            } else {
              data = Buffer2.from(data);
              readOnly = false;
            }
          }
          if (this._deflating) {
            this.enqueue([this.doPong, data, mask, readOnly, cb]);
          } else {
            this.doPong(data, mask, readOnly, cb);
          }
        }
        /**
         * Frames and sends a pong message.
         *
         * @param {*} data The message to send
         * @param {Boolean} mask Specifies whether or not to mask `data`
         * @param {Boolean} readOnly Specifies whether `data` can be modified
         * @param {Function} cb Callback
         * @private
         */
      }, {
        key: "doPong",
        value: function doPong(data, mask, readOnly, cb) {
          this.sendFrame(_Sender.frame(data, {
            fin: true,
            rsv1: false,
            opcode: 10,
            mask,
            readOnly
          }), cb);
        }
        /**
         * Sends a data message to the other peer.
         *
         * @param {*} data The message to send
         * @param {Object} options Options object
         * @param {Boolean} options.compress Specifies whether or not to compress `data`
         * @param {Boolean} options.binary Specifies whether `data` is binary or text
         * @param {Boolean} options.fin Specifies whether the fragment is the last one
         * @param {Boolean} options.mask Specifies whether or not to mask `data`
         * @param {Function} cb Callback
         * @public
         */
      }, {
        key: "send",
        value: function send(data, options, cb) {
          var opcode = options.binary ? 2 : 1;
          var rsv1 = options.compress;
          var readOnly = true;
          if (!Buffer2.isBuffer(data)) {
            if (data instanceof ArrayBuffer) {
              data = Buffer2.from(data);
            } else if (ArrayBuffer.isView(data)) {
              data = viewToBuffer(data);
            } else {
              data = Buffer2.from(data);
              readOnly = false;
            }
          }
          var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
          if (this._firstFragment) {
            this._firstFragment = false;
            if (rsv1 && perMessageDeflate) {
              rsv1 = data.length >= perMessageDeflate._threshold;
            }
            this._compress = rsv1;
          } else {
            rsv1 = false;
            opcode = 0;
          }
          if (options.fin) this._firstFragment = true;
          if (perMessageDeflate) {
            var opts = {
              fin: options.fin,
              rsv1,
              opcode,
              mask: options.mask,
              readOnly
            };
            if (this._deflating) {
              this.enqueue([this.dispatch, data, this._compress, opts, cb]);
            } else {
              this.dispatch(data, this._compress, opts, cb);
            }
          } else {
            this.sendFrame(_Sender.frame(data, {
              fin: options.fin,
              rsv1: false,
              opcode,
              mask: options.mask,
              readOnly
            }), cb);
          }
        }
        /**
         * Dispatches a data message.
         *
         * @param {Buffer} data The message to send
         * @param {Boolean} compress Specifies whether or not to compress `data`
         * @param {Object} options Options object
         * @param {Number} options.opcode The opcode
         * @param {Boolean} options.readOnly Specifies whether `data` can be modified
         * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
         * @param {Boolean} options.mask Specifies whether or not to mask `data`
         * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
         * @param {Function} cb Callback
         * @private
         */
      }, {
        key: "dispatch",
        value: function dispatch(data, compress, options, cb) {
          var _this0 = this;
          if (!compress) {
            this.sendFrame(_Sender.frame(data, options), cb);
            return;
          }
          var perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
          this._deflating = true;
          perMessageDeflate.compress(data, options.fin, function (_, buf) {
            options.readOnly = false;
            _this0.sendFrame(_Sender.frame(buf, options), cb);
            _this0._deflating = false;
            _this0.dequeue();
          });
        }
        /**
         * Executes queued send operations.
         *
         * @private
         */
      }, {
        key: "dequeue",
        value: function dequeue() {
          while (!this._deflating && this._queue.length) {
            var params = this._queue.shift();
            this._bufferedBytes -= params[1].length;
            params[0].apply(this, params.slice(1));
          }
        }
        /**
         * Enqueues a send operation.
         *
         * @param {Array} params Send operation parameters.
         * @private
         */
      }, {
        key: "enqueue",
        value: function enqueue(params) {
          this._bufferedBytes += params[1].length;
          this._queue.push(params);
        }
        /**
         * Sends a frame.
         *
         * @param {Buffer[]} list The frame to send
         * @param {Function} cb Callback
         * @private
         */
      }, {
        key: "sendFrame",
        value: function sendFrame(list, cb) {
          if (list.length === 2) {
            this._socket.write(list[0]);
            this._socket.write(list[1], cb);
          } else {
            this._socket.write(list[0], cb);
          }
        }
      }], [{
        key: "frame",
        value: function frame(data, options) {
          var merge = data.length < 1024 || options.mask && options.readOnly;
          var offset = options.mask ? 6 : 2;
          var payloadLength = data.length;
          if (data.length >= 65536) {
            offset += 8;
            payloadLength = 127;
          } else if (data.length > 125) {
            offset += 2;
            payloadLength = 126;
          }
          var target = Buffer2.allocUnsafe(merge ? data.length + offset : offset);
          target[0] = options.fin ? options.opcode | 128 : options.opcode;
          if (options.rsv1) target[0] |= 64;
          if (payloadLength === 126) {
            target.writeUInt16BE(data.length, 2, true);
          } else if (payloadLength === 127) {
            target.writeUInt32BE(0, 2, true);
            target.writeUInt32BE(data.length, 6, true);
          }
          if (!options.mask) {
            target[1] = payloadLength;
            if (merge) {
              data.copy(target, offset);
              return [target];
            }
            return [target, data];
          }
          var mask = crypto2.randomBytes(4);
          target[1] = payloadLength | 128;
          target[offset - 4] = mask[0];
          target[offset - 3] = mask[1];
          target[offset - 2] = mask[2];
          target[offset - 1] = mask[3];
          if (merge) {
            bufferUtil.mask(data, mask, target, offset, data.length);
            return [target];
          }
          bufferUtil.mask(data, mask, data, 0, data.length);
          return [target, data];
        }
      }]);
    }();
    module2.exports = Sender;
    function viewToBuffer(view) {
      var buf = Buffer2.from(view.buffer);
      if (view.byteLength !== view.buffer.byteLength) {
        return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
      }
      return buf;
    }
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/websocket.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var EventEmitter = require("events");
    var crypto2 = require("crypto");
    var https = require("https");
    var http2 = require("http");
    var url = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var EventTarget = require_event_target();
    var extension = require_extension();
    var constants = require_constants();
    var Receiver = require_receiver();
    var Sender = require_sender();
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var protocolVersions = [8, 13];
    var closeTimeout = 30 * 1e3;
    var WebSocket2 = /*#__PURE__*/function (_EventEmitter) {
      /**
       * Create a new `WebSocket`.
       *
       * @param {String} address The URL to which to connect
       * @param {(String|String[])} protocols The subprotocols
       * @param {Object} options Connection options
       */
      function _WebSocket(address, protocols, options) {
        var _this1;
        _classCallCheck(this, _WebSocket);
        _this1 = _callSuper(this, _WebSocket);
        _this1.readyState = _WebSocket.CONNECTING;
        _this1.protocol = "";
        _this1._binaryType = constants.BINARY_TYPES[0];
        _this1._finalize = _this1.finalize.bind(_this1);
        _this1._closeFrameReceived = false;
        _this1._closeFrameSent = false;
        _this1._closeMessage = "";
        _this1._closeTimer = null;
        _this1._finalized = false;
        _this1._closeCode = 1006;
        _this1._extensions = {};
        _this1._isServer = true;
        _this1._receiver = null;
        _this1._sender = null;
        _this1._socket = null;
        _this1._error = null;
        if (address !== null) {
          if (!protocols) {
            protocols = [];
          } else if (typeof protocols === "string") {
            protocols = [protocols];
          } else if (!Array.isArray(protocols)) {
            options = protocols;
            protocols = [];
          }
          initAsClient.call(_this1, address, protocols, options);
        }
        return _this1;
      }
      _inherits(_WebSocket, _EventEmitter);
      return _createClass(_WebSocket, [{
        key: "CONNECTING",
        get: function get() {
          return _WebSocket.CONNECTING;
        }
      }, {
        key: "CLOSING",
        get: function get() {
          return _WebSocket.CLOSING;
        }
      }, {
        key: "CLOSED",
        get: function get() {
          return _WebSocket.CLOSED;
        }
      }, {
        key: "OPEN",
        get: function get() {
          return _WebSocket.OPEN;
        }
        /**
         * This deviates from the WHATWG interface since ws doesn't support the required
         * default "blob" type (instead we define a custom "nodebuffer" type).
         *
         * @type {String}
         */
      }, {
        key: "binaryType",
        get: function get() {
          return this._binaryType;
        },
        set: function set(type) {
          if (constants.BINARY_TYPES.indexOf(type) < 0) return;
          this._binaryType = type;
          if (this._receiver) this._receiver._binaryType = type;
        }
        /**
         * @type {Number}
         */
      }, {
        key: "bufferedAmount",
        get: function get() {
          if (!this._socket) return 0;
          return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
        }
        /**
         * @type {String}
         */
      }, {
        key: "extensions",
        get: function get() {
          return Object.keys(this._extensions).join();
        }
        /**
         * Set up the socket and the internal resources.
         *
         * @param {net.Socket} socket The network socket between the server and client
         * @param {Buffer} head The first packet of the upgraded stream
         * @param {Number} maxPayload The maximum allowed message size
         * @private
         */
      }, {
        key: "setSocket",
        value: function setSocket(socket, head, maxPayload) {
          var _this10 = this;
          socket.setTimeout(0);
          socket.setNoDelay();
          socket.on("close", this._finalize);
          socket.on("error", this._finalize);
          socket.on("end", this._finalize);
          this._receiver = new Receiver(this._extensions, maxPayload, this.binaryType);
          this._sender = new Sender(socket, this._extensions);
          this._socket = socket;
          if (head.length > 0) socket.unshift(head);
          socket.on("data", this._receiver.add);
          this._receiver.onmessage = function (data) {
            return _this10.emit("message", data);
          };
          this._receiver.onping = function (data) {
            _this10.pong(data, !_this10._isServer, constants.NOOP);
            _this10.emit("ping", data);
          };
          this._receiver.onpong = function (data) {
            return _this10.emit("pong", data);
          };
          this._receiver.onclose = function (code, reason) {
            _this10._socket.removeListener("data", _this10._receiver.add);
            _this10._closeFrameReceived = true;
            _this10._closeMessage = reason;
            _this10._closeCode = code;
            if (code === 1005) _this10.close();else _this10.close(code, reason);
          };
          this._receiver.onerror = function (error, code) {
            if (_this10._error) return;
            _this10._closeCode = code;
            if (!_this10._finalized) _this10.finalize(error);else _this10.emit("error", error);
          };
          this.readyState = _WebSocket.OPEN;
          this.emit("open");
        }
        /**
         * Clean up internal resources and emit the `'close'` event.
         *
         * @param {(Boolean|Error)} error Indicates whether or not an error occurred
         * @private
         */
      }, {
        key: "finalize",
        value: function finalize(error) {
          var _this11 = this;
          if (this._finalized) return;
          this.readyState = _WebSocket.CLOSING;
          this._finalized = true;
          if (!this._socket) {
            this.emit("error", error);
            this.readyState = _WebSocket.CLOSED;
            this.emit("close", this._closeCode, this._closeMessage);
            return;
          }
          clearTimeout(this._closeTimer);
          this._socket.removeListener("data", this._receiver.add);
          this._socket.removeListener("close", this._finalize);
          this._socket.removeListener("error", this._finalize);
          this._socket.removeListener("end", this._finalize);
          this._socket.on("error", constants.NOOP);
          if (error) {
            if (error !== true) this._error = error;
            this._socket.destroy();
          } else {
            this._socket.end();
          }
          this._receiver.cleanup(function () {
            var err = _this11._error;
            if (err) {
              _this11._error = null;
              _this11.emit("error", err);
            }
            _this11.readyState = _WebSocket.CLOSED;
            if (_this11._extensions[PerMessageDeflate.extensionName]) {
              _this11._extensions[PerMessageDeflate.extensionName].cleanup();
            }
            _this11.emit("close", _this11._closeCode, _this11._closeMessage);
          });
        }
        /**
         * Start a closing handshake.
         *
         *            +----------+     +-----------+   +----------+
         *     + - - -|ws.close()|---->|close frame|-->|ws.close()|- - - -
         *            +----------+     +-----------+   +----------+       |
         *     |      +----------+     +-----------+         |
         *            |ws.close()|<----|close frame|<--------+            |
         *            +----------+     +-----------+         |
         *  CLOSING         |              +---+             |         CLOSING
         *                  |          +---|fin|<------------+
         *     |            |          |   +---+                          |
         *                  |          |   +---+      +-------------+
         *     |            +----------+-->|fin|----->|ws.finalize()| - - +
         *                             |   +---+      +-------------+
         *     |     +-------------+   |
         *      - - -|ws.finalize()|<--+
         *           +-------------+
         *
         * @param {Number} code Status code explaining why the connection is closing
         * @param {String} data A string explaining why the connection is closing
         * @public
         */
      }, {
        key: "close",
        value: function close(code, data) {
          var _this12 = this;
          if (this.readyState === _WebSocket.CLOSED) return;
          if (this.readyState === _WebSocket.CONNECTING) {
            this._req.abort();
            this.finalize(new Error("WebSocket was closed before the connection was established"));
            return;
          }
          if (this.readyState === _WebSocket.CLOSING) {
            if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
            return;
          }
          this.readyState = _WebSocket.CLOSING;
          this._sender.close(code, data, !this._isServer, function (err) {
            if (err) return;
            _this12._closeFrameSent = true;
            if (!_this12._finalized) {
              if (_this12._closeFrameReceived) _this12._socket.end();
              _this12._closeTimer = setTimeout(_this12._finalize, closeTimeout, true);
            }
          });
        }
        /**
         * Send a ping.
         *
         * @param {*} data The data to send
         * @param {Boolean} mask Indicates whether or not to mask `data`
         * @param {Function} cb Callback which is executed when the ping is sent
         * @public
         */
      }, {
        key: "ping",
        value: function ping(data, mask, cb) {
          if (typeof data === "function") {
            cb = data;
            data = mask = void 0;
          } else if (typeof mask === "function") {
            cb = mask;
            mask = void 0;
          }
          if (this.readyState !== _WebSocket.OPEN) {
            var err = new Error(`WebSocket is not open: readyState ${this.readyState} (${readyStates[this.readyState]})`);
            if (cb) return cb(err);
            throw err;
          }
          if (typeof data === "number") data = data.toString();
          if (mask === void 0) mask = !this._isServer;
          this._sender.ping(data || constants.EMPTY_BUFFER, mask, cb);
        }
        /**
         * Send a pong.
         *
         * @param {*} data The data to send
         * @param {Boolean} mask Indicates whether or not to mask `data`
         * @param {Function} cb Callback which is executed when the pong is sent
         * @public
         */
      }, {
        key: "pong",
        value: function pong(data, mask, cb) {
          if (typeof data === "function") {
            cb = data;
            data = mask = void 0;
          } else if (typeof mask === "function") {
            cb = mask;
            mask = void 0;
          }
          if (this.readyState !== _WebSocket.OPEN) {
            var err = new Error(`WebSocket is not open: readyState ${this.readyState} (${readyStates[this.readyState]})`);
            if (cb) return cb(err);
            throw err;
          }
          if (typeof data === "number") data = data.toString();
          if (mask === void 0) mask = !this._isServer;
          this._sender.pong(data || constants.EMPTY_BUFFER, mask, cb);
        }
        /**
         * Send a data message.
         *
         * @param {*} data The message to send
         * @param {Object} options Options object
         * @param {Boolean} options.compress Specifies whether or not to compress `data`
         * @param {Boolean} options.binary Specifies whether `data` is binary or text
         * @param {Boolean} options.fin Specifies whether the fragment is the last one
         * @param {Boolean} options.mask Specifies whether or not to mask `data`
         * @param {Function} cb Callback which is executed when data is written out
         * @public
         */
      }, {
        key: "send",
        value: function send(data, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = {};
          }
          if (this.readyState !== _WebSocket.OPEN) {
            var err = new Error(`WebSocket is not open: readyState ${this.readyState} (${readyStates[this.readyState]})`);
            if (cb) return cb(err);
            throw err;
          }
          if (typeof data === "number") data = data.toString();
          var opts = Object.assign({
            binary: typeof data !== "string",
            mask: !this._isServer,
            compress: true,
            fin: true
          }, options);
          if (!this._extensions[PerMessageDeflate.extensionName]) {
            opts.compress = false;
          }
          this._sender.send(data || constants.EMPTY_BUFFER, opts, cb);
        }
        /**
         * Forcibly close the connection.
         *
         * @public
         */
      }, {
        key: "terminate",
        value: function terminate() {
          if (this.readyState === _WebSocket.CLOSED) return;
          if (this.readyState === _WebSocket.CONNECTING) {
            this._req.abort();
            this.finalize(new Error("WebSocket was closed before the connection was established"));
            return;
          }
          this.finalize(true);
        }
      }]);
    }(EventEmitter);
    readyStates.forEach(function (readyState, i) {
      WebSocket2[readyStates[i]] = i;
    });
    ["open", "error", "close", "message"].forEach(function (method) {
      Object.defineProperty(WebSocket2.prototype, `on${method}`, {
        /**
         * Return the listener of the event.
         *
         * @return {(Function|undefined)} The event listener or `undefined`
         * @public
         */
        get() {
          var listeners = this.listeners(method);
          for (var i = 0; i < listeners.length; i++) {
            if (listeners[i]._listener) return listeners[i]._listener;
          }
        },
        /**
         * Add a listener for the event.
         *
         * @param {Function} listener The listener to add
         * @public
         */
        set(listener) {
          var listeners = this.listeners(method);
          for (var i = 0; i < listeners.length; i++) {
            if (listeners[i]._listener) this.removeListener(method, listeners[i]);
          }
          this.addEventListener(method, listener);
        }
      });
    });
    WebSocket2.prototype.addEventListener = EventTarget.addEventListener;
    WebSocket2.prototype.removeEventListener = EventTarget.removeEventListener;
    module2.exports = WebSocket2;
    function initAsClient(address, protocols, options) {
      var _this13 = this;
      options = Object.assign({
        protocolVersion: protocolVersions[1],
        protocol: protocols.join(","),
        perMessageDeflate: true,
        handshakeTimeout: null,
        localAddress: null,
        headers: null,
        family: null,
        origin: null,
        agent: null,
        host: null,
        //
        // SSL options.
        //
        checkServerIdentity: null,
        rejectUnauthorized: null,
        passphrase: null,
        ciphers: null,
        ecdhCurve: null,
        cert: null,
        key: null,
        pfx: null,
        ca: null
      }, options);
      if (protocolVersions.indexOf(options.protocolVersion) === -1) {
        throw new RangeError(`Unsupported protocol version: ${options.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`);
      }
      this._isServer = false;
      this.url = address;
      var serverUrl = url.parse(address);
      var isUnixSocket = serverUrl.protocol === "ws+unix:";
      if (!serverUrl.host && (!isUnixSocket || !serverUrl.path)) {
        throw new Error(`Invalid URL: ${address}`);
      }
      var isSecure = serverUrl.protocol === "wss:" || serverUrl.protocol === "https:";
      var key = crypto2.randomBytes(16).toString("base64");
      var httpObj = isSecure ? https : http2;
      var perMessageDeflate;
      var requestOptions = {
        port: serverUrl.port || (isSecure ? 443 : 80),
        host: serverUrl.hostname,
        path: "/",
        headers: {
          "Sec-WebSocket-Version": options.protocolVersion,
          "Sec-WebSocket-Key": key,
          "Connection": "Upgrade",
          "Upgrade": "websocket"
        }
      };
      if (options.headers) Object.assign(requestOptions.headers, options.headers);
      if (options.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate(options.perMessageDeflate !== true ? options.perMessageDeflate : {}, false);
        requestOptions.headers["Sec-WebSocket-Extensions"] = extension.format({
          [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
        });
      }
      if (options.protocol) {
        requestOptions.headers["Sec-WebSocket-Protocol"] = options.protocol;
      }
      if (options.origin) {
        if (options.protocolVersion < 13) {
          requestOptions.headers["Sec-WebSocket-Origin"] = options.origin;
        } else {
          requestOptions.headers.Origin = options.origin;
        }
      }
      if (options.host) requestOptions.headers.Host = options.host;
      if (serverUrl.auth) requestOptions.auth = serverUrl.auth;
      if (options.localAddress) requestOptions.localAddress = options.localAddress;
      if (options.family) requestOptions.family = options.family;
      if (isUnixSocket) {
        var parts = serverUrl.path.split(":");
        requestOptions.socketPath = parts[0];
        requestOptions.path = parts[1];
      } else if (serverUrl.path) {
        if (serverUrl.path.charAt(0) !== "/") {
          requestOptions.path = `/${serverUrl.path}`;
        } else {
          requestOptions.path = serverUrl.path;
        }
      }
      var agent = options.agent;
      if (options.rejectUnauthorized != null || options.checkServerIdentity || options.passphrase || options.ciphers || options.ecdhCurve || options.cert || options.key || options.pfx || options.ca) {
        if (options.passphrase) requestOptions.passphrase = options.passphrase;
        if (options.ciphers) requestOptions.ciphers = options.ciphers;
        if (options.ecdhCurve) requestOptions.ecdhCurve = options.ecdhCurve;
        if (options.cert) requestOptions.cert = options.cert;
        if (options.key) requestOptions.key = options.key;
        if (options.pfx) requestOptions.pfx = options.pfx;
        if (options.ca) requestOptions.ca = options.ca;
        if (options.checkServerIdentity) {
          requestOptions.checkServerIdentity = options.checkServerIdentity;
        }
        if (options.rejectUnauthorized != null) {
          requestOptions.rejectUnauthorized = options.rejectUnauthorized;
        }
        if (!agent) agent = new httpObj.Agent(requestOptions);
      }
      if (agent) requestOptions.agent = agent;
      this._req = httpObj.get(requestOptions);
      if (options.handshakeTimeout) {
        this._req.setTimeout(options.handshakeTimeout, function () {
          _this13._req.abort();
          _this13.finalize(new Error("Opening handshake has timed out"));
        });
      }
      this._req.on("error", function (error) {
        if (_this13._req.aborted) return;
        _this13._req = null;
        _this13.finalize(error);
      });
      this._req.on("response", function (res) {
        if (!_this13.emit("unexpected-response", _this13._req, res)) {
          _this13._req.abort();
          _this13.finalize(new Error(`Unexpected server response: ${res.statusCode}`));
        }
      });
      this._req.on("upgrade", function (res, socket, head) {
        _this13.emit("upgrade", res);
        if (_this13.readyState !== WebSocket2.CONNECTING) return;
        _this13._req = null;
        var digest = crypto2.createHash("sha1").update(key + constants.GUID, "binary").digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          socket.destroy();
          return _this13.finalize(new Error("Invalid Sec-WebSocket-Accept header"));
        }
        var serverProt = res.headers["sec-websocket-protocol"];
        var protList = (options.protocol || "").split(/, */);
        var protError;
        if (!options.protocol && serverProt) {
          protError = "Server sent a subprotocol but none was requested";
        } else if (options.protocol && !serverProt) {
          protError = "Server sent no subprotocol";
        } else if (serverProt && protList.indexOf(serverProt) === -1) {
          protError = "Server sent an invalid subprotocol";
        }
        if (protError) {
          socket.destroy();
          return _this13.finalize(new Error(protError));
        }
        if (serverProt) _this13.protocol = serverProt;
        if (perMessageDeflate) {
          try {
            var extensions = extension.parse(res.headers["sec-websocket-extensions"]);
            if (extensions[PerMessageDeflate.extensionName]) {
              perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
              _this13._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            socket.destroy();
            _this13.finalize(new Error("Invalid Sec-WebSocket-Extensions header"));
            return;
          }
        }
        _this13.setSocket(socket, head, 0);
      });
    }
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/lib/websocket-server.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var safeBuffer = require_safe_buffer();
    var EventEmitter = require("events");
    var crypto2 = require("crypto");
    var http2 = require("http");
    var url = require("url");
    var PerMessageDeflate = require_permessage_deflate();
    var extension = require_extension();
    var constants = require_constants();
    var WebSocket2 = require_websocket();
    var Buffer2 = safeBuffer.Buffer;
    var WebSocketServer2 = /*#__PURE__*/function (_EventEmitter2) {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {String} options.host The hostname where to bind the server
       * @param {Number} options.port The port where to bind the server
       * @param {http.Server} options.server A pre-created HTTP/S server to use
       * @param {Function} options.verifyClient An hook to reject connections
       * @param {Function} options.handleProtocols An hook to handle protocols
       * @param {String} options.path Accept only connections matching this path
       * @param {Boolean} options.noServer Enable no server mode
       * @param {Boolean} options.clientTracking Specifies whether or not to track clients
       * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
       * @param {Number} options.maxPayload The maximum allowed message size
       * @param {Function} callback A listener for the `listening` event
       */
      function WebSocketServer2(options, callback) {
        var _this14;
        _classCallCheck(this, WebSocketServer2);
        _this14 = _callSuper(this, WebSocketServer2);
        options = Object.assign({
          maxPayload: 100 * 1024 * 1024,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null
        }, options);
        if (options.port == null && !options.server && !options.noServer) {
          throw new TypeError('One of the "port", "server", or "noServer" options must be specified');
        }
        if (options.port != null) {
          _this14._server = http2.createServer(function (req, res) {
            var body = http2.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          _this14._server.listen(options.port, options.host, options.backlog, callback);
        } else if (options.server) {
          _this14._server = options.server;
        }
        if (_this14._server) {
          _this14._removeListeners = addListeners(_this14._server, {
            listening: _this14.emit.bind(_this14, "listening"),
            error: _this14.emit.bind(_this14, "error"),
            upgrade: function upgrade(req, socket, head) {
              _this14.handleUpgrade(req, socket, head, function (ws) {
                _this14.emit("connection", ws, req);
              });
            }
          });
        }
        if (options.perMessageDeflate === true) options.perMessageDeflate = {};
        if (options.clientTracking) _this14.clients = /* @__PURE__ */new Set();
        _this14.options = options;
        return _this14;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      _inherits(WebSocketServer2, _EventEmitter2);
      return _createClass(WebSocketServer2, [{
        key: "address",
        value: function address() {
          if (this.options.noServer) {
            throw new Error('The server is operating in "noServer" mode');
          }
          if (!this._server) return null;
          return this._server.address();
        }
        /**
         * Close the server.
         *
         * @param {Function} cb Callback
         * @public
         */
      }, {
        key: "close",
        value: function close(cb) {
          if (this.clients) {
            var _iterator = _createForOfIteratorHelper(this.clients),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var client = _step.value;
                client.terminate();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
          var server = this._server;
          if (server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
            if (this.options.port != null) return server.close(cb);
          }
          if (cb) cb();
        }
        /**
         * See if a given request should be handled by this server instance.
         *
         * @param {http.IncomingMessage} req Request object to inspect
         * @return {Boolean} `true` if the request is valid, else `false`
         * @public
         */
      }, {
        key: "shouldHandle",
        value: function shouldHandle(req) {
          if (this.options.path && url.parse(req.url).pathname !== this.options.path) {
            return false;
          }
          return true;
        }
        /**
         * Handle a HTTP Upgrade request.
         *
         * @param {http.IncomingMessage} req The request object
         * @param {net.Socket} socket The network socket between the server and client
         * @param {Buffer} head The first packet of the upgraded stream
         * @param {Function} cb Callback
         * @public
         */
      }, {
        key: "handleUpgrade",
        value: function handleUpgrade(req, socket, head, cb) {
          var _this15 = this;
          socket.on("error", socketOnError);
          var version = +req.headers["sec-websocket-version"];
          var extensions = {};
          if (req.method !== "GET" || req.headers.upgrade.toLowerCase() !== "websocket" || !req.headers["sec-websocket-key"] || version !== 8 && version !== 13 || !this.shouldHandle(req)) {
            return abortConnection(socket, 400);
          }
          if (this.options.perMessageDeflate) {
            var perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);
            try {
              var offers = extension.parse(req.headers["sec-websocket-extensions"]);
              if (offers[PerMessageDeflate.extensionName]) {
                perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
                extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
              }
            } catch (err) {
              return abortConnection(socket, 400);
            }
          }
          var protocol = (req.headers["sec-websocket-protocol"] || "").split(/, */);
          if (this.options.handleProtocols) {
            protocol = this.options.handleProtocols(protocol, req);
            if (protocol === false) return abortConnection(socket, 401);
          } else {
            protocol = protocol[0];
          }
          if (this.options.verifyClient) {
            var info = {
              origin: req.headers[`${version === 8 ? "sec-websocket-origin" : "origin"}`],
              secure: !!(req.connection.authorized || req.connection.encrypted),
              req
            };
            if (this.options.verifyClient.length === 2) {
              this.options.verifyClient(info, function (verified, code, message) {
                if (!verified) return abortConnection(socket, code || 401, message);
                _this15.completeUpgrade(protocol, extensions, req, socket, head, cb);
              });
              return;
            }
            if (!this.options.verifyClient(info)) return abortConnection(socket, 401);
          }
          this.completeUpgrade(protocol, extensions, req, socket, head, cb);
        }
        /**
         * Upgrade the connection to WebSocket.
         *
         * @param {String} protocol The chosen subprotocol
         * @param {Object} extensions The accepted extensions
         * @param {http.IncomingMessage} req The request object
         * @param {net.Socket} socket The network socket between the server and client
         * @param {Buffer} head The first packet of the upgraded stream
         * @param {Function} cb Callback
         * @private
         */
      }, {
        key: "completeUpgrade",
        value: function completeUpgrade(protocol, extensions, req, socket, head, cb) {
          var _this16 = this;
          if (!socket.readable || !socket.writable) return socket.destroy();
          var key = crypto2.createHash("sha1").update(req.headers["sec-websocket-key"] + constants.GUID, "binary").digest("base64");
          var headers = ["HTTP/1.1 101 Switching Protocols", "Upgrade: websocket", "Connection: Upgrade", `Sec-WebSocket-Accept: ${key}`];
          var ws = new WebSocket2(null);
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws.protocol = protocol;
          }
          if (extensions[PerMessageDeflate.extensionName]) {
            var params = extensions[PerMessageDeflate.extensionName].params;
            var value = extension.format({
              [PerMessageDeflate.extensionName]: [params]
            });
            headers.push(`Sec-WebSocket-Extensions: ${value}`);
            ws._extensions = extensions;
          }
          this.emit("headers", headers, req);
          socket.write(headers.concat("\r\n").join("\r\n"));
          socket.removeListener("error", socketOnError);
          ws.setSocket(socket, head, this.options.maxPayload);
          if (this.clients) {
            this.clients.add(ws);
            ws.on("close", function () {
              return _this16.clients.delete(ws);
            });
          }
          cb(ws);
        }
      }]);
    }(EventEmitter);
    module2.exports = WebSocketServer2;
    function addListeners(server, map) {
      for (var _i = 0, _Object$keys = Object.keys(map); _i < _Object$keys.length; _i++) {
        var event = _Object$keys[_i];
        server.on(event, map[event]);
      }
      return function removeListeners() {
        for (var _i2 = 0, _Object$keys2 = Object.keys(map); _i2 < _Object$keys2.length; _i2++) {
          var _event = _Object$keys2[_i2];
          server.removeListener(_event, map[_event]);
        }
      };
    }
    function socketOnError() {
      this.destroy();
    }
    function abortConnection(socket, code, message) {
      if (socket.writable) {
        message = message || http2.STATUS_CODES[code];
        socket.write(`HTTP/1.1 ${code} ${http2.STATUS_CODES[code]}\r
Connection: close\r
Content-type: text/html\r
Content-Length: ${Buffer2.byteLength(message)}\r
\r
` + message);
      }
      socket.removeListener("error", socketOnError);
      socket.destroy();
    }
  }
});

// node_modules/.pnpm/ws@4.1.0/node_modules/ws/index.js
var require_ws = __commonJS({
  "node_modules/.pnpm/ws@4.1.0/node_modules/ws/index.js"(exports2, module2) {
    "use strict";

    init_define_WEB_REMOTE_CONTROLLER_ASSETS();
    var WebSocket2 = require_websocket();
    WebSocket2.Server = require_websocket_server();
    WebSocket2.Receiver = require_receiver();
    WebSocket2.Sender = require_sender();
    module2.exports = WebSocket2;
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
      id: "bilibili",
      name: "Bilibili",
      urls: Object.freeze(["https://www.bilibili.com/"])
    }), Object.freeze({
      id: "1shows",
      name: "1Shows",
      urls: Object.freeze(["https://www.1shows.org/"])
    }), Object.freeze({
      id: "cineby",
      name: "Cineby",
      urls: Object.freeze(["https://cineby.at/"])
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
          group: oneOf(["bilibili-search-result"], item && item.group) ? item.group : "",
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
          playbackRate: clampNumber(rawSite.playbackRate, 0.5, 2, 1),
          playerAvailable: Boolean(rawSite.playerAvailable),
          searchPage: Boolean(rawSite.searchPage),
          playbackPage: Boolean(rawSite.playbackPage),
          webFullscreenActive: Boolean(rawSite.webFullscreenActive)
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
      if (kind === "overlay") {
        return {
          kind,
          overlay: {
            visible: Boolean(input.visible),
            pinned: Boolean(input.visible && input.pinned)
          }
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
var WebSocket = require_ws();
var WebSocketServer = WebSocket.WebSocketServer || WebSocket.Server;
var WS_OPEN = 1;
var _require_protocol = require_protocol(),
  DEFAULT_PROFILES = _require_protocol.DEFAULT_PROFILES,
  normalizeCommand = _require_protocol.normalizeCommand,
  normalizeProfiles = _require_protocol.normalizeProfiles,
  sanitizeTvMessage = _require_protocol.sanitizeTvMessage,
  text = _require_protocol.text;
var DEFAULT_PORT = 8182;
var APP_VERSION = "0.2.10";
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
  } catch (_unused2) {
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
      } catch (_unused3) {
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
  for (var _i3 = 0, _Object$keys3 = Object.keys(interfaces); _i3 < _Object$keys3.length; _i3++) {
    var name = _Object$keys3[_i3];
    var entries = interfaces[name];
    var _iterator2 = _createForOfIteratorHelper(entries || []),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var entry = _step2.value;
        if (entry && entry.family === "IPv4" && !entry.internal && entry.address) found.push(entry.address);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
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
    activeProfileId: "bilibili",
    page: {
      title: "",
      url: "https://www.bilibili.com/",
      hostname: "www.bilibili.com",
      adapter: "bilibili",
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
    overlay: {
      visible: true,
      pinned: false
    },
    lastLog: null,
    updatedAt: Date.now()
  };
}
function createRemoteServer() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var preferredPort = typeof options.port === "number" && isFinite(options.port) && Math.floor(options.port) === options.port ? options.port : DEFAULT_PORT;
  var maintenanceIntervalMs = typeof options.maintenanceIntervalMs === "number" ? Math.max(20, Math.floor(options.maintenanceIntervalMs)) : 15e3;
  var host = options.host || "0.0.0.0";
  var staticDir = EMBEDDED_CONTROLLER_ASSETS ? null : options.controllerDir || controllerDirectory();
  var tokens = /* @__PURE__ */new Map();
  var failures = /* @__PURE__ */new Map();
  var phoneSockets = /* @__PURE__ */new Set();
  var phoneHeartbeats = /* @__PURE__ */new Map();
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
    var _iterator3 = _createForOfIteratorHelper(tokens),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = _slicedToArray(_step3.value, 2),
          token = _step3$value[0],
          session = _step3$value[1];
        if (session.lastUsed < cutoff) tokens.delete(token);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
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
      version: APP_VERSION,
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
      phoneCount: phoneSockets.size,
      overlay: _objectSpread({}, state.overlay)
    };
  }
  function send(socket, message) {
    if (!socket || socket.readyState !== WS_OPEN) return;
    try {
      socket.send(JSON.stringify(message), function () {});
    } catch (_unused4) {}
  }
  function broadcastPhones(message) {
    var _iterator4 = _createForOfIteratorHelper(phoneSockets),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var socket = _step4.value;
        send(socket, message);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
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
    if (!tvIsConnected() && normalized.type !== "navigate" && normalized.type !== "overlay") throw new Error("The TV page bridge is not connected.");
    if (normalized.type === "navigate") {
      state.navigation = {
        status: "loading",
        requestedUrl: normalized.url,
        startedAt: Date.now(),
        finishedAt: 0
      };
      broadcastState();
    }
    if (normalized.type === "overlay") {
      var visible = normalized.action === "toggle" ? !state.overlay.visible : normalized.action === "show";
      state.overlay = {
        visible,
        pinned: visible && normalized.action !== "hide"
      };
      broadcastState();
      broadcastServiceInfo();
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
    if (safe.kind === "overlay") state.overlay = safe.overlay;
    if (safe.kind === "log") state.lastLog = _objectSpread(_objectSpread({}, safe), {}, {
      at: Date.now()
    });
    broadcastState();
    if (safe.kind === "overlay") broadcastServiceInfo();
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
              version: APP_VERSION,
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
      var queued = tvCommandQueue.splice(0, tvCommandQueue.length);
      var _iterator5 = _createForOfIteratorHelper(queued),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var message = _step5.value;
          send(socket, message);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      socket.on("message", function (payload) {
        try {
          updateFromTv(JSON.parse(payload.toString("utf8")));
        } catch (_unused8) {}
      });
      var tvDisconnected = false;
      var disconnectTv = function disconnectTv() {
        if (tvDisconnected) return;
        tvDisconnected = true;
        if (tvSocket === socket) tvSocket = null;
        broadcastState();
      };
      socket.on("error", function () {
        disconnectTv();
        try {
          socket.terminate();
        } catch (_unused9) {}
      });
      socket.on("close", disconnectTv);
      return;
    }
    phoneSockets.add(socket);
    phoneHeartbeats.set(socket, true);
    broadcastState();
    broadcastServiceInfo();
    socket.on("pong", function () {
      if (phoneSockets.has(socket)) phoneHeartbeats.set(socket, true);
    });
    socket.on("message", function (payload) {
      try {
        var _message = JSON.parse(payload.toString("utf8"));
        if (_message.kind !== "command") throw new Error("Unsupported message.");
        var command = dispatchCommand(_message.command);
        send(socket, {
          kind: "ack",
          requestId: text(_message.requestId, 64),
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
    var phoneDisconnected = false;
    var disconnectPhone = function disconnectPhone() {
      if (phoneDisconnected) return;
      phoneDisconnected = true;
      phoneSockets.delete(socket);
      phoneHeartbeats.delete(socket);
      broadcastState();
      broadcastServiceInfo();
    };
    socket.on("error", function () {
      disconnectPhone();
      try {
        socket.terminate();
      } catch (_unused0) {}
    });
    socket.on("close", disconnectPhone);
  });
  var ready = new Promise(function (resolve, reject) {
    server.once("error", reject);
    server.listen(preferredPort, host, function () {
      server.removeListener("error", reject);
      actualPort = server.address().port;
      rotatePin(true);
      console.log(`[Web Remote TV] Service listening on port ${actualPort}`);
      var _iterator6 = _createForOfIteratorHelper(lanAddresses),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var address = _step6.value;
          console.log(`[Web Remote TV] Controller: http://${address}:${actualPort}/`);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
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
    var phonesChanged = false;
    var _iterator7 = _createForOfIteratorHelper(phoneSockets),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var phoneSocket = _step7.value;
        if (phoneSocket.readyState !== WS_OPEN || phoneHeartbeats.get(phoneSocket) === false) {
          phoneSockets.delete(phoneSocket);
          phoneHeartbeats.delete(phoneSocket);
          phonesChanged = true;
          try {
            phoneSocket.terminate();
          } catch (_unused1) {}
          continue;
        }
        phoneHeartbeats.set(phoneSocket, false);
        try {
          phoneSocket.ping("", false, function () {});
        } catch (_unused10) {
          phoneSockets.delete(phoneSocket);
          phoneHeartbeats.delete(phoneSocket);
          phonesChanged = true;
          try {
            phoneSocket.terminate();
          } catch (_unused11) {}
        }
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    if (phonesChanged) {
      broadcastState();
      broadcastServiceInfo();
    }
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
  }, maintenanceIntervalMs);
  if (typeof maintenance.unref === "function") maintenance.unref();
  function close() {
    clearInterval(maintenance);
    var _iterator8 = _createForOfIteratorHelper(phoneSockets),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var socket = _step8.value;
        socket.close();
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
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
  } catch (_unused12) {}
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