'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { parseHTML } = require('linkedom');

test('1Shows adapter discovers semantic controls and activates stable snapshot ids', () => {
  const { window } = parseHTML(`<!doctype html><html><body>
    <input type="search" placeholder="Search movies">
    <a href="/movie/example" aria-label="Example Movie"><img alt="Poster"></a>
    <button title="Play episode">Play</button>
    <div style="display:none"><button>Hidden</button></div>
  </body></html>`);

  Object.defineProperty(window, 'location', {
    value: { hostname: 'www.1shows.org', href: 'https://www.1shows.org/' },
    configurable: true
  });
  window.innerWidth = 1920;
  window.innerHeight = 1080;
  window.getComputedStyle = (element) => ({
    display: element.parentElement && element.parentElement.getAttribute('style') === 'display:none' ? 'none' : 'block',
    visibility: 'visible',
    opacity: '1'
  });
  window.HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
    const index = Array.from(window.document.querySelectorAll('*')).indexOf(this);
    return { left: 20, top: 30 + index * 45, right: 300, bottom: 70 + index * 45, width: 280, height: 40 };
  };

  const previousWindow = global.window;
  const previousDocument = global.document;
  global.window = window;
  global.document = window.document;
  try {
    delete require.cache[require.resolve('../src/injected/adapters')];
    const { createPageAdapter } = require('../src/injected/adapters');
    const adapter = createPageAdapter();
    assert.equal(adapter.id, '1shows');
    const items = adapter.scan();
    assert.deepEqual(items.map((item) => item.kind), ['input', 'link', 'button']);
    assert.equal(items[1].label, 'Example Movie');

    let clicked = false;
    const play = window.document.querySelector('button[title="Play episode"]');
    play.addEventListener('click', () => { clicked = true; });
    const playItem = items.find((item) => item.label === 'Play episode');
    assert.ok(adapter.activate(adapter.elementById(playItem.id)));
    assert.equal(clicked, true);
    assert.equal(adapter.preferredTextInput().getAttribute('placeholder'), 'Search movies');
  } finally {
    global.window = previousWindow;
    global.document = previousDocument;
  }
});

test('Bilibili adapter exposes login, search, danmu, quality, speed, and player actions', async () => {
  const { window } = parseHTML(`<!doctype html><html><body>
    <div class="bpx-player-container"></div>
    <input class="nav-search-input" type="text" placeholder="Search Bilibili">
    <div class="header-login-entry">登录</div>
    <div aria-label="哔哩哔哩播放器">
      <video></video>
      <div class="bpx-player-ctrl-btn bpx-player-ctrl-prev" aria-label="上一个"></div>
      <div class="bpx-player-ctrl-btn bpx-player-ctrl-next" aria-label="下一个"></div>
      <div class="bpx-player-ctrl-btn bpx-player-ctrl-wide" aria-label="宽屏"></div>
      <div class="bpx-player-ctrl-btn bpx-player-ctrl-web" aria-label="网页全屏"></div>
      <div class="bpx-player-dm-switch" aria-label="弹幕显示隐藏"><input class="bui-danmaku-switch-input" type="checkbox" checked></div>
      <li class="bpx-player-ctrl-quality-menu-item bpx-state-active" data-value="64">720P 准高清</li>
      <li class="bpx-player-ctrl-playbackrate-menu-item bpx-state-active" data-value="1">1.0x</li>
      <li class="bpx-player-ctrl-playbackrate-menu-item" data-value="1.5">1.5x</li>
    </div>
    <a href="/video/BV123">Example Bilibili video</a>
  </body></html>`);

  Object.defineProperty(window, 'location', {
    value: { hostname: 'www.bilibili.com', href: 'https://www.bilibili.com/video/BV123', assign() {} },
    configurable: true
  });
  window.innerWidth = 1920;
  window.innerHeight = 1080;
  window.getComputedStyle = () => ({ display: 'block', visibility: 'visible', opacity: '1' });
  window.HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
    const index = Array.from(window.document.querySelectorAll('*')).indexOf(this);
    return { left: 20, top: 30 + index * 45, right: 300, bottom: 70 + index * 45, width: 280, height: 40 };
  };
  const video = window.document.querySelector('video');
  video.playbackRate = 1;
  window.document.querySelector('.bui-danmaku-switch-input').checked = true;

  const previousWindow = global.window;
  const previousDocument = global.document;
  global.window = window;
  global.document = window.document;
  try {
    delete require.cache[require.resolve('../src/injected/adapters')];
    const { createPageAdapter } = require('../src/injected/adapters');
    const adapter = createPageAdapter();
    assert.equal(adapter.id, 'bilibili');
    assert.equal(adapter.preferredTextInput().className, 'nav-search-input');
    assert.equal(adapter.searchUrl('猫 视频'), 'https://search.bilibili.com/all?keyword=%E7%8C%AB%20%E8%A7%86%E9%A2%91');

    const items = adapter.scan();
    assert.equal(items[0].label, '登录');
    assert.ok(items.some((item) => item.label === '弹幕显示隐藏' && item.kind === 'button'));
    assert.ok(items.some((item) => item.label === 'Example Bilibili video'));

    for (const [action, selector, value] of [
      ['login', '.header-login-entry'],
      ['danmaku', '.bui-danmaku-switch-input'],
      ['next', '.bpx-player-ctrl-next'],
      ['webFullscreen', '.bpx-player-ctrl-web'],
      ['quality', '[data-value="64"]', '64'],
      ['speed', '[data-value="1.5"]', '1.5']
    ]) {
      let clicked = false;
      window.document.querySelector(selector).addEventListener('click', () => { clicked = true; });
      assert.equal(adapter.siteAction(action, value), true, action);
      assert.equal(clicked, true, action);
    }

    await new Promise((resolve) => setTimeout(resolve, 180));
    const site = adapter.siteState();
    assert.equal(site.loginAvailable, true);
    assert.equal(site.danmakuEnabled, false);
    assert.match(site.quality, /720P/);
    assert.equal(site.playbackRate, 1);
    assert.equal(site.playerAvailable, true);
    assert.equal(site.webFullscreenActive, true);

    assert.equal(adapter.siteAction('danmaku'), true);
    await new Promise((resolve) => setTimeout(resolve, 180));
    assert.equal(adapter.siteState().danmakuEnabled, true);
  } finally {
    global.window = previousWindow;
    global.document = previousDocument;
  }
});

test('Bilibili search results are deduplicated and open in the current TV window', () => {
  const { window } = parseHTML(`<!doctype html><html><body>
    <input class="nav-search-input" type="text" placeholder="Search Bilibili">
    <div class="bili-video-card">
      <a class="cover" target="_blank" href="https://www.bilibili.com/video/BV123/"><span>05:35</span></a>
      <div class="bili-video-card__info">
        <div class="bili-video-card__info--right"><a target="_blank" href="https://www.bilibili.com/video/BV123/"><h3 class="bili-video-card__info--tit">TV-friendly Bilibili video</h3></a></div>
        <a class="bili-video-card__info--owner">Creator · today</a>
        <span class="bili-video-card__stats__duration">05:35</span>
      </div>
    </div>
  </body></html>`);

  let assignedUrl = '';
  Object.defineProperty(window, 'location', {
    value: {
      hostname: 'search.bilibili.com',
      pathname: '/all',
      href: 'https://search.bilibili.com/all?keyword=tizen',
      assign(value) { assignedUrl = value; }
    },
    configurable: true
  });
  window.innerWidth = 1920;
  window.innerHeight = 1080;
  window.getComputedStyle = () => ({ display: 'block', visibility: 'visible', opacity: '1' });
  window.HTMLElement.prototype.getBoundingClientRect = () => ({ left: 20, top: 30, right: 400, bottom: 100, width: 380, height: 70 });

  const previousWindow = global.window;
  const previousDocument = global.document;
  global.window = window;
  global.document = window.document;
  try {
    delete require.cache[require.resolve('../src/injected/adapters')];
    const { createPageAdapter } = require('../src/injected/adapters');
    const adapter = createPageAdapter();
    const items = adapter.scan();
    const results = items.filter((item) => item.group === 'bilibili-search-result');
    assert.equal(results.length, 1);
    assert.equal(results[0].kind, 'media');
    assert.equal(results[0].label, 'TV-friendly Bilibili video');
    assert.match(results[0].detail, /Creator/);
    assert.equal(adapter.siteState().searchPage, true);

    assert.equal(adapter.activate(adapter.elementById(results[0].id)), true);
    assert.equal(assignedUrl, 'https://www.bilibili.com/video/BV123/');
  } finally {
    global.window = previousWindow;
    global.document = previousDocument;
  }
});

test('Bilibili playback URLs expose controls while the media element is still loading', () => {
  const { window } = parseHTML('<!doctype html><html><body></body></html>');
  Object.defineProperty(window, 'location', {
    value: { hostname: 'www.bilibili.com', pathname: '/video/BV123/', href: 'https://www.bilibili.com/video/BV123/' },
    configurable: true
  });
  window.getComputedStyle = () => ({ display: 'block', visibility: 'visible', opacity: '1' });

  const previousWindow = global.window;
  const previousDocument = global.document;
  global.window = window;
  global.document = window.document;
  try {
    delete require.cache[require.resolve('../src/injected/adapters')];
    const { createPageAdapter } = require('../src/injected/adapters');
    const state = createPageAdapter().siteState();
    assert.equal(state.playbackPage, true);
    assert.equal(state.playerAvailable, true);
  } finally {
    global.window = previousWindow;
    global.document = previousDocument;
  }
});
