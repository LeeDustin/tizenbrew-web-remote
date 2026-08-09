'use strict';

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  'input:not([type="hidden"])',
  'textarea',
  'select',
  '[role="button"]',
  '[role="link"]',
  '[role="menuitem"]',
  '[role="option"]',
  '[tabindex]:not([tabindex="-1"])',
  'video'
].join(',');

function cleanText(value, maximum) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maximum || 140);
}

function visible(element) {
  if (!element || typeof element.getBoundingClientRect !== 'function') return false;
  const rect = element.getBoundingClientRect();
  if (rect.width < 3 || rect.height < 3) return false;
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0.02;
}

function elementLabel(element) {
  const tag = element.tagName.toLowerCase();
  const labelledBy = element.getAttribute('aria-labelledby');
  let labelledText = '';
  if (labelledBy) {
    labelledText = labelledBy.split(/\s+/).map((id) => {
      const label = document.getElementById(id);
      return label ? label.textContent : '';
    }).join(' ');
  }
  const candidates = [
    element.getAttribute('aria-label'),
    labelledText,
    element.getAttribute('title'),
    element.getAttribute('alt'),
    tag === 'input' ? element.getAttribute('placeholder') : '',
    tag === 'input' && !['password', 'search', 'text'].includes(String(element.type).toLowerCase()) ? element.value : '',
    element.textContent
  ];
  for (const candidate of candidates) {
    const label = cleanText(candidate, 140);
    if (label) return label;
  }
  return tag === 'video' ? 'Video player' : tag;
}

function classify(element) {
  const tag = element.tagName.toLowerCase();
  const role = element.getAttribute('role');
  if (tag === 'video') return 'media';
  if (tag === 'input' || tag === 'textarea' || tag === 'select' || element.isContentEditable) return 'input';
  if (tag === 'a' || role === 'link') return 'link';
  if (tag === 'button' || role === 'button' || role === 'menuitem' || role === 'option') return 'button';
  return 'other';
}

function genericDetail(element, kind) {
  if (kind === 'input') return cleanText(element.getAttribute('placeholder') || element.getAttribute('name') || 'Text field', 100);
  if (kind === 'link') {
    try {
      const url = new URL(element.href, window.location.href);
      return cleanText(url.pathname === '/' ? url.hostname : url.pathname, 100);
    } catch {
      return 'Link';
    }
  }
  return cleanText(element.getAttribute('aria-description') || '', 100);
}

function firstElement(selectors, requireVisible = true) {
  for (const selector of selectors) {
    const candidates = Array.from(document.querySelectorAll(selector));
    const element = requireVisible ? candidates.find(visible) : candidates[0];
    if (element) return element;
  }
  return null;
}

function clickElement(element) {
  if (!element) return false;
  try { element.focus(); } catch { /* Some player controls are divs. */ }
  try {
    element.click();
    return true;
  } catch {
    return false;
  }
}

function makeSiteDefinition() {
  const hostname = window.location.hostname.toLowerCase();
  if (hostname === '1shows.org' || hostname.endsWith('.1shows.org')) {
    return {
      id: '1shows',
      priority(element, kind) {
        const href = String(element.getAttribute('href') || '');
        if (kind === 'input' && /search/i.test(`${element.type} ${element.name} ${element.placeholder}`)) return -1000;
        if (kind === 'link' && /\/(movie|tv|show|watch|search)/i.test(href)) return -500;
        return 0;
      }
    };
  }
  if (hostname === 'cineby.at' || hostname.endsWith('.cineby.at')) {
    return {
      id: 'cineby',
      priority(element, kind) {
        const href = String(element.getAttribute('href') || '');
        if (kind === 'input' && /search/i.test(`${element.type} ${element.name} ${element.placeholder}`)) return -1000;
        if (kind === 'link' && /\/(movie|show|series|watch|search)/i.test(href)) return -500;
        return 0;
      }
    };
  }
  if (hostname === 'bilibili.com' || hostname.endsWith('.bilibili.com')) {
    let danmakuOverride = null;
    const fillTvRootClass = 'web-remote-bilibili-fill-tv';
    const fillTvPlayerAttribute = 'data-web-remote-fill-tv';

    function locationPath() {
      if (window.location.pathname) return window.location.pathname;
      try { return new URL(window.location.href).pathname; } catch { return '/'; }
    }

    function isSearchPage() {
      return hostname === 'search.bilibili.com' && /^\/all(?:\/|$)/.test(locationPath());
    }

    function isPlaybackPage() {
      return /^\/(?:video\/|bangumi\/play\/|medialist\/play\/)/.test(locationPath());
    }

    function playerContainer() {
      return firstElement([
        '.bpx-player-container',
        '#bilibili-player',
        '[aria-label="哔哩哔哩播放器"]',
        '.player-wrap',
        '.bilibili-player',
        '.bilibili-player-video',
        '.bilibili-player-video-wrap',
        'video'
      ], false);
    }

    function searchResultEntries() {
      if (!isSearchPage()) return [];
      const cards = Array.from(document.querySelectorAll([
        '.bili-video-card',
        '.video-item.matrix',
        '.video-list-item',
        '.search-video-card'
      ].join(',')));
      const seen = new Set();
      const results = [];
      for (const card of cards) {
        const link = card.querySelector([
          '.bili-video-card__info--right > a[href*="/video/"]',
          '.bili-video-card__info--tit a[href*="/video/"]',
          'a.title[href*="/video/"]',
          '.title a[href*="/video/"]',
          'a[href*="/video/"]'
        ].join(','));
        if (!link || !visible(link)) continue;
        let key = '';
        try {
          const url = new URL(link.href, window.location.href);
          const match = url.pathname.match(/\/video\/([^/]+)/i);
          key = match ? match[1].toLowerCase() : url.href;
        } catch { key = String(link.href || ''); }
        if (!key || seen.has(key)) continue;
        seen.add(key);

        const titleNode = card.querySelector('.bili-video-card__info--tit,.title,h3');
        const ownerNode = card.querySelector('.bili-video-card__info--owner,.up-name,.so-icon.watch-num,.author');
        const durationNode = card.querySelector('.bili-video-card__stats__duration,.duration,.so-imgTag_rb');
        const title = cleanText(titleNode && titleNode.textContent, 140) || elementLabel(link);
        const detail = [
          cleanText(ownerNode && ownerNode.textContent, 70),
          cleanText(durationNode && durationNode.textContent, 20)
        ].filter(Boolean).join(' · ');
        results.push({
          element: link,
          rect: link.getBoundingClientRect(),
          kind: 'media',
          label: title,
          detail: cleanText(detail || 'Bilibili video', 100),
          group: 'bilibili-search-result',
          priority: -4000
        });
      }
      return results;
    }

    function activateBilibiliElement(element) {
      const link = element && (element.matches('a[href]') ? element : element.closest('a[href]'));
      if (!link) return false;
      try {
        const url = new URL(link.href, window.location.href);
        const targetHost = url.hostname.toLowerCase();
        if ((targetHost === 'bilibili.com' || targetHost.endsWith('.bilibili.com'))
          && /^\/(?:video\/|bangumi\/play\/|medialist\/play\/)/.test(url.pathname)) {
          window.location.assign(url.href);
          return true;
        }
      } catch { /* Fall through to the normal click. */ }
      return false;
    }

    function dispatchPlayerKey(key, keyCode, count) {
      const target = playerContainer() || document.body || document.documentElement;
      if (!target) return false;
      for (let index = 0; index < count; index += 1) {
        for (const type of ['keydown', 'keyup']) {
          const event = new window.KeyboardEvent(type, {
            key,
            code: key,
            keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true
          });
          target.dispatchEvent(event);
        }
      }
      return true;
    }

    function mediaAction(action, value) {
      const player = playerContainer();
      if (!player && !isPlaybackPage()) return false;
      if (action === 'fullscreen') return toggleFillTv();
      if (action === 'captions') {
        return clickElement(firstElement([
          '[aria-label*="字幕"]',
          '.bpx-player-ctrl-subtitle',
          '.bilibili-player-video-btn-subtitle'
        ], false));
      }
      if (action === 'toggle' || action === 'play' || action === 'pause') {
        const playControl = firstElement([
          '[aria-label="播放/暂停"]',
          '.bpx-player-ctrl-play',
          '.bilibili-player-video-btn-start',
          '.bilibili-player-video-state'
        ], false);
        if (!playControl) return dispatchPlayerKey('Space', 32, 1);
        const className = String((player && player.className) || '');
        const paused = /bpx-state-paused|video-state-pause|state-pause/.test(className);
        const playing = /bpx-state-playing|video-state-playing|state-playing/.test(className);
        if ((action === 'play' && playing) || (action === 'pause' && paused)) return true;
        return clickElement(playControl);
      }
      if (action === 'seekBy') {
        const amount = Number(value) || 0;
        return dispatchPlayerKey(amount < 0 ? 'ArrowLeft' : 'ArrowRight', amount < 0 ? 37 : 39, Math.max(1, Math.min(12, Math.ceil(Math.abs(amount) / 5))));
      }
      if (action === 'volumeBy') {
        const amount = Number(value) || 0;
        return dispatchPlayerKey(amount < 0 ? 'ArrowDown' : 'ArrowUp', amount < 0 ? 40 : 38, Math.max(1, Math.min(10, Math.ceil(Math.abs(amount) / 0.1))));
      }
      return false;
    }

    function fillTvOverrideActive() {
      return document.documentElement.classList.contains(fillTvRootClass);
    }

    function builtInWebFullscreenActive() {
      const control = document.querySelector('.bpx-player-ctrl-web,.bilibili-player-video-btn-web-fullscreen');
      return Boolean(
        (control && /bpx-state-entered|video-state-enter/.test(String(control.className || '')))
        || document.body.classList.contains('webscreen-fix')
      );
    }

    function setFillTvOverride(active) {
      const player = active ? playerContainer() : null;
      if (active && !player) {
        document.documentElement.classList.remove(fillTvRootClass);
        return false;
      }
      for (const element of document.querySelectorAll(`[${fillTvPlayerAttribute}]`)) {
        element.removeAttribute(fillTvPlayerAttribute);
      }
      document.documentElement.classList.toggle(fillTvRootClass, active);
      if (!active) {
        window.dispatchEvent(new window.Event('resize'));
        return true;
      }
      player.setAttribute(fillTvPlayerAttribute, 'true');
      let style = document.getElementById('web-remote-bilibili-fill-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'web-remote-bilibili-fill-style';
        style.textContent = `
          html.${fillTvRootClass}, html.${fillTvRootClass} body { overflow: hidden !important; }
          html.${fillTvRootClass} [${fillTvPlayerAttribute}] {
            position: fixed !important;
            inset: 0 !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: none !important;
            max-height: none !important;
            margin: 0 !important;
            transform: none !important;
            z-index: 2147483000 !important;
            background: #000 !important;
          }
          html.${fillTvRootClass} [${fillTvPlayerAttribute}] .bpx-player-video-area,
          html.${fillTvRootClass} [${fillTvPlayerAttribute}] .bpx-player-video-wrap,
          html.${fillTvRootClass} [${fillTvPlayerAttribute}] video {
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            max-height: none !important;
          }
        `;
        (document.head || document.documentElement).appendChild(style);
      }
      window.dispatchEvent(new window.Event('resize'));
      return true;
    }

    function toggleFillTv() {
      if (fillTvOverrideActive()) return setFillTvOverride(false);

      const before = builtInWebFullscreenActive();
      const control = firstElement([
        '[aria-label="\u7f51\u9875\u5168\u5c4f"]',
        '.bpx-player-ctrl-web',
        '.bilibili-player-video-btn-web-fullscreen'
      ], false);
      if (clickElement(control)) {
        setTimeout(() => {
          if (builtInWebFullscreenActive() === before && !before) setFillTvOverride(true);
        }, 140);
        return true;
      }
      return setFillTvOverride(!before);
    }

    function danmakuLayers() {
      return document.querySelectorAll('.bpx-player-render-dm-wrap,.bpx-player-row-dm-wrap,.bpx-player-bas-dm-wrap,.bpx-player-cmd-dm-wrap');
    }

    function clearDanmakuOverrideStyles() {
      for (const layer of danmakuLayers()) layer.style.removeProperty('visibility');
    }

    function applyDanmakuOverride() {
      if (typeof danmakuOverride !== 'boolean') return;
      for (const layer of danmakuLayers()) {
        if (danmakuOverride) layer.style.removeProperty('visibility');
        else layer.style.setProperty('visibility', 'hidden', 'important');
      }
    }

    function nativeDanmakuState(input, control) {
      if (input && 'checked' in input) return Boolean(input.checked);
      const ariaChecked = input && input.getAttribute('aria-checked');
      if (ariaChecked === 'true' || ariaChecked === 'false') return ariaChecked === 'true';
      const className = String((control && control.className) || '');
      if (/bui-danmaku-switch-state-1/.test(className)) return true;
      if (/bui-danmaku-switch-state-3/.test(className)) return false;
      return null;
    }
    const playerActions = {
      previous: ['[aria-label="上一个"]', '.bpx-player-ctrl-prev'],
      next: ['[aria-label="下一个"]', '.bpx-player-ctrl-next'],
      wide: ['[aria-label="宽屏"]', '.bpx-player-ctrl-wide'],
      webFullscreen: ['[aria-label="网页全屏"]', '.bpx-player-ctrl-web']
    };
    return {
      id: 'bilibili',
      snapshotEntries: searchResultEntries,
      activate: activateBilibiliElement,
      mediaAction,
      interactiveSelector: [
        '.header-login-entry',
        '.bpx-player-ctrl-btn',
        '[aria-label="弹幕显示隐藏"]',
        '.bpx-player-ctrl-quality-menu-item',
        '.bpx-player-ctrl-playbackrate-menu-item'
      ].join(','),
      kind(element) {
        return element.matches('.header-login-entry,.bpx-player-ctrl-btn,[aria-label="弹幕显示隐藏"],.bpx-player-ctrl-quality-menu-item,.bpx-player-ctrl-playbackrate-menu-item') ? 'button' : null;
      },
      priority(element, kind) {
        const href = String(element.getAttribute('href') || '');
        const className = String(element.className || '');
        if (/header-login-entry|go-login-btn/.test(className)) return -3000;
        if (element.matches('.nav-search-input')) return -2900;
        if (/bpx-player-ctrl|bpx-player-dm-switch/.test(className)) return -2500;
        if (kind === 'link' && /\/(video|bangumi\/play)\//i.test(href)) return -1200;
        return 0;
      },
      preferredTextInput() {
        return firstElement(['.nav-search-input', 'input[name="keyword"]', 'input[type="search"]']);
      },
      searchUrl(value) {
        const query = cleanText(value, 200);
        return query ? `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}` : '';
      },
      siteAction(action, value) {
        if (action === 'home') {
          window.location.assign('https://www.bilibili.com/');
          return true;
        }
        if (action === 'login') {
          const login = firstElement([
            '.header-login-entry',
            '.go-login-btn .header-login-entry',
            '.go-login-btn',
            '.bpx-player-toast-row-jump'
          ]);
          return clickElement(login);
        }
        if (action === 'danmaku') {
          const input = document.querySelector('.bui-danmaku-switch-input');
          const control = firstElement(['[aria-label="弹幕显示隐藏"]', '.bpx-player-dm-switch'], false);
          const nativeBefore = nativeDanmakuState(input, control);
          const before = typeof danmakuOverride === 'boolean' ? danmakuOverride : nativeBefore !== null ? nativeBefore : true;
          const target = !before;
          danmakuOverride = target;
          applyDanmakuOverride();

          let clicked = nativeBefore === target;
          if (!clicked) {
            clicked = clickElement(input)
              || clickElement(document.querySelector('.bui-danmaku-switch-label'))
              || clickElement(control);
          }
          setTimeout(() => {
            const nativeAfter = nativeDanmakuState(input, control);
            if (nativeAfter === target) {
              clearDanmakuOverrideStyles();
              danmakuOverride = null;
            } else {
              danmakuOverride = target;
              applyDanmakuOverride();
            }
          }, 120);
          return clicked || Boolean(playerContainer());
        }
        if (action === 'quality') {
          return clickElement(document.querySelector(`.bpx-player-ctrl-quality-menu-item[data-value="${value}"]`));
        }
        if (action === 'speed') {
          return clickElement(document.querySelector(`.bpx-player-ctrl-playbackrate-menu-item[data-value="${value}"]`));
        }
        if (action === 'webFullscreen') return toggleFillTv();
        return clickElement(firstElement(playerActions[action] || [], false));
      },
      siteState() {
        const login = firstElement(['.header-login-entry', '.go-login-btn .header-login-entry']);
        const account = firstElement(['.header-avatar-wrap', '.header-entry-mini', '.v-avatar'], false);
        const danmaku = document.querySelector('.bui-danmaku-switch-input');
        const quality = document.querySelector('.bpx-player-ctrl-quality-menu-item.bpx-state-active')
          || document.querySelector('.bpx-player-ctrl-quality-result');
        const video = document.querySelector('video');
        applyDanmakuOverride();
        return {
          id: 'bilibili',
          loginAvailable: Boolean(login),
          loggedIn: !login && Boolean(account),
          danmakuEnabled: typeof danmakuOverride === 'boolean' ? danmakuOverride : danmaku ? Boolean(danmaku.checked) : null,
          quality: cleanText(quality && quality.textContent, 40),
          playbackRate: video ? Number(video.playbackRate) || 1 : 1,
          playerAvailable: Boolean(playerContainer()) || isPlaybackPage(),
          searchPage: isSearchPage(),
          playbackPage: isPlaybackPage(),
          webFullscreenActive: builtInWebFullscreenActive() || fillTvOverrideActive()
        };
      }
    };
  }
  return { id: 'generic', priority: () => 0 };
}

function createPageAdapter() {
  const site = makeSiteDefinition();
  let elementMap = new Map();
  let sequence = 0;

  function scan() {
    const selector = site.interactiveSelector ? `${INTERACTIVE_SELECTOR},${site.interactiveSelector}` : INTERACTIVE_SELECTOR;
    const specialCandidates = site.snapshotEntries ? site.snapshotEntries() : [];
    const specialElements = new Set(specialCandidates.map((entry) => entry.element));
    const candidates = specialCandidates.concat(Array.from(document.querySelectorAll(selector))
      .filter((element) => !specialElements.has(element))
      .filter((element) => !element.closest('[data-web-remote-tv]'))
      .filter(visible)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const kind = (site.kind && site.kind(element)) || classify(element);
        return {
          element,
          rect,
          kind,
          label: elementLabel(element),
          detail: genericDetail(element, kind),
          group: '',
          priority: site.priority(element, kind)
        };
      })
      .filter((entry) => entry.label))
      .sort((left, right) => {
        const leftDedicated = left.group ? 0 : 1;
        const rightDedicated = right.group ? 0 : 1;
        const leftInView = left.rect.bottom >= 0 && left.rect.top <= window.innerHeight ? 0 : 1;
        const rightInView = right.rect.bottom >= 0 && right.rect.top <= window.innerHeight ? 0 : 1;
        return leftDedicated - rightDedicated
          || leftInView - rightInView
          || left.priority - right.priority
          || left.rect.top - right.rect.top
          || left.rect.left - right.rect.left;
      })
      .slice(0, 150);

    elementMap = new Map();
    sequence += 1;
    return candidates.map((entry, index) => {
      const id = `wr-${sequence.toString(36)}-${index.toString(36)}`;
      elementMap.set(id, entry.element);
      return {
        id,
        kind: entry.kind,
        label: entry.label,
        detail: entry.detail,
        group: entry.group || '',
        selected: entry.element === document.activeElement || entry.element.getAttribute('aria-current') === 'page'
      };
    });
  }

  function elementById(id) {
    const element = elementMap.get(id);
    return element && document.documentElement.contains(element) ? element : null;
  }

  function activate(element) {
    if (!element) return false;
    try {
      element.focus({ preventScroll: false });
    } catch {
      try { element.focus(); } catch { /* Ignore non-focusable elements. */ }
    }
    if (site.activate && site.activate(element)) return true;
    try {
      element.click();
      return true;
    } catch {
      return false;
    }
  }

  function moveFocus(current, direction) {
    const selector = site.interactiveSelector ? `${INTERACTIVE_SELECTOR},${site.interactiveSelector}` : INTERACTIVE_SELECTOR;
    const elements = Array.from(document.querySelectorAll(selector)).filter(visible);
    if (!elements.length) return null;
    const origin = current && visible(current) ? current : document.activeElement;
    if (!origin || !visible(origin)) return elements[0];

    const rect = origin.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const scored = [];
    for (const candidate of elements) {
      if (candidate === origin) continue;
      const candidateRect = candidate.getBoundingClientRect();
      const x = candidateRect.left + candidateRect.width / 2;
      const y = candidateRect.top + candidateRect.height / 2;
      const dx = x - originX;
      const dy = y - originY;
      const allowed = direction === 'left' ? dx < -2
        : direction === 'right' ? dx > 2
          : direction === 'up' ? dy < -2
            : dy > 2;
      if (!allowed) continue;
      const primary = direction === 'left' || direction === 'right' ? Math.abs(dx) : Math.abs(dy);
      const secondary = direction === 'left' || direction === 'right' ? Math.abs(dy) : Math.abs(dx);
      scored.push({ element: candidate, score: primary + secondary * 2.5 });
    }
    scored.sort((a, b) => a.score - b.score);
    return scored.length ? scored[0].element : origin;
  }

  function preferredTextInput() {
    if (site.preferredTextInput) {
      const preferred = site.preferredTextInput();
      if (preferred) return preferred;
    }
    const active = document.activeElement;
    if (active && (active.matches('input, textarea') || active.isContentEditable)) return active;
    const inputs = Array.from(document.querySelectorAll('input[type="search"], input:not([type]), input[type="text"], textarea, [contenteditable="true"]'));
    return inputs.find(visible) || null;
  }

  return {
    id: site.id,
    scan,
    elementById,
    activate,
    moveFocus,
    preferredTextInput,
    searchUrl: site.searchUrl || null,
    siteAction: site.siteAction || null,
    mediaAction: site.mediaAction || null,
    siteState: site.siteState || null,
    visible
  };
}

module.exports = { createPageAdapter, cleanText };
