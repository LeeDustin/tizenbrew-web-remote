'use strict';

const { createPageAdapter, cleanText } = require('./adapters');
const { createQrCanvas } = require('./qr');
const qrcode = require('qrcode-generator');
const FRAME_CHANNEL = 'web-remote-tv-frame-v1';
const BILIBILI_HOME = 'https://www.bilibili.com/';

function startEmbeddedFrameBridge() {
  function frameVideo() {
    const videos = Array.from(document.querySelectorAll('video'));
    videos.sort((left, right) => {
      const a = left.getBoundingClientRect();
      const b = right.getBoundingClientRect();
      return b.width * b.height - a.width * a.height;
    });
    return videos[0] || null;
  }

  function report() {
    const video = frameVideo();
    if (!video) return;
    const captions = Array.from(video.textTracks || []).some((track) => track.mode === 'showing');
    window.parent.postMessage({
      channel: FRAME_CHANNEL,
      kind: 'player',
      player: {
        found: true,
        paused: video.paused,
        currentTime: Number(video.currentTime) || 0,
        duration: Number.isFinite(video.duration) ? video.duration : 0,
        volume: Number(video.volume),
        muted: video.muted,
        captions
      }
    }, '*');
  }

  function media(command) {
    const video = frameVideo();
    if (!video) return;
    const action = command.action;
    const value = Number(command.value) || 0;
    if (action === 'toggle') video.paused ? video.play() : video.pause();
    if (action === 'play') video.play();
    if (action === 'pause') video.pause();
    if (action === 'seekBy') video.currentTime = Math.max(0, Math.min(Number.isFinite(video.duration) ? video.duration : Infinity, video.currentTime + value));
    if (action === 'volumeBy') {
      video.muted = false;
      video.volume = Math.max(0, Math.min(1, video.volume + value));
    }
    if (action === 'captions') {
      const tracks = Array.from(video.textTracks || []);
      const showing = tracks.some((track) => track.mode === 'showing');
      tracks.forEach((track, index) => { track.mode = !showing && index === 0 ? 'showing' : 'disabled'; });
    }
    if (action === 'fullscreen') {
      const request = video.requestFullscreen || video.webkitRequestFullscreen || video.webkitEnterFullscreen;
      if (request) request.call(video);
    }
    setTimeout(report, 100);
  }

  window.addEventListener('message', (event) => {
    const message = event.data;
    if (event.source !== window.parent || !message || message.channel !== FRAME_CHANNEL || message.kind !== 'command') return;
    const command = message.command || {};
    if (command.type === 'media') media(command);
    if (command.type === 'pointerClick') {
      const x = Math.max(0, Math.min(window.innerWidth - 1, Number(command.xRatio) * window.innerWidth));
      const y = Math.max(0, Math.min(window.innerHeight - 1, Number(command.yRatio) * window.innerHeight));
      const target = document.elementFromPoint(x, y);
      if (target) {
        try { target.focus(); } catch { /* Optional. */ }
        try { target.click(); } catch { /* Some canvas players ignore synthetic clicks. */ }
      }
    }
  });

  setInterval(report, 1000);
  document.addEventListener('play', report, true);
  document.addEventListener('pause', report, true);
}

(function startWebRemoteBridge() {
  // TizenBrew 2.0.5 evaluates module scripts in subframe contexts too. A single
  // top-level bridge must own the local TV session or iframe connections would
  // repeatedly replace each other.
  try {
    if (window.top !== window.self) {
      startEmbeddedFrameBridge();
      return;
    }
  } catch {
    return;
  }
  if (window.__WEB_REMOTE_TV_BRIDGE_STARTED__) return;
  Object.defineProperty(window, '__WEB_REMOTE_TV_BRIDGE_STARTED__', { value: true, configurable: false });

  const LOCAL_HTTP = 'http://127.0.0.1:8182';
  const LOCAL_WS = 'ws://127.0.0.1:8182/ws?role=tv';
  let adapter = createPageAdapter();
  let socket = null;
  let socketTimer = null;
  let pollAbort = null;
  let polling = false;
  let transport = 'connecting';
  let serviceInfo = null;
  let overlay = null;
  let overlayVisible = true;
  let focusedElement = null;
  let pointerX = Math.round(window.innerWidth / 2);
  let pointerY = Math.round(window.innerHeight / 2);
  let scanTimer = null;
  let lastPageSignature = '';
  let lastPlayerSignature = '';
  let embeddedPlayer = null;
  let embeddedPlayerSeenAt = 0;
  let lastError = '';
  let siteFillTvActive = false;

  function postState(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
      return Promise.resolve();
    }
    return fetch(`${LOCAL_HTTP}/api/tv/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(message),
      cache: 'no-store'
    }).catch((error) => {
      lastError = `State bridge: ${error.message}`;
      updateOverlay();
    });
  }

  function pageState(force) {
    const page = {
      title: document.title || '',
      url: window.location.href,
      hostname: window.location.hostname,
      adapter: adapter.id,
      readyState: document.readyState,
      site: adapter.siteState ? adapter.siteState() : null
    };
    siteFillTvActive = Boolean(page.site && page.site.webFullscreenActive);
    syncOverlayVisibility();
    const signature = JSON.stringify(page);
    if (force || signature !== lastPageSignature) {
      lastPageSignature = signature;
      postState({ kind: 'page', page });
    }
  }

  function bestVideo() {
    const videos = Array.from(document.querySelectorAll('video'));
    if (adapter.id === 'bilibili') {
      const playerVideos = Array.from(document.querySelectorAll([
        '.bpx-player-container video',
        '#bilibili-player video',
        '.bilibili-player-video video'
      ].join(',')));
      if (playerVideos.length) {
        playerVideos.sort((left, right) => {
          const a = left.getBoundingClientRect();
          const b = right.getBoundingClientRect();
          return b.width * b.height - a.width * a.height;
        });
        return playerVideos[0];
      }
    }
    videos.sort((left, right) => {
      const a = left.getBoundingClientRect();
      const b = right.getBoundingClientRect();
      return b.width * b.height - a.width * a.height;
    });
    return videos[0] || null;
  }

  function playerState(force) {
    const video = bestVideo();
    const captions = video ? Array.from(video.textTracks || []).some((track) => track.mode === 'showing') : false;
    const player = video ? {
      found: true,
      paused: video.paused,
      currentTime: Number(video.currentTime) || 0,
      duration: Number.isFinite(video.duration) ? video.duration : 0,
      volume: Number(video.volume),
      muted: video.muted,
      captions
    } : embeddedPlayer && Date.now() - embeddedPlayerSeenAt < 3500 ? embeddedPlayer : {
      found: false,
      paused: true,
      currentTime: 0,
      duration: 0,
      volume: 1,
      muted: false,
      captions: false
    };
    const signature = JSON.stringify(player);
    if (force || signature !== lastPlayerSignature) {
      lastPlayerSignature = signature;
      postState({ kind: 'player', player });
    }
  }

  function snapshot() {
    const items = adapter.scan();
    postState({ kind: 'snapshot', items });
  }

  function scheduleSnapshot() {
    clearTimeout(scanTimer);
    scanTimer = setTimeout(snapshot, 800);
  }

  function createOverlay() {
    if (overlay && document.documentElement.contains(overlay.host)) return;
    const host = document.createElement('div');
    host.id = 'web-remote-tv-host';
    host.setAttribute('data-web-remote-tv', 'true');
    const root = host.attachShadow ? host.attachShadow({ mode: 'closed' }) : host;
    root.innerHTML = `
      <style>
        :host, .root { all: initial; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        .panel { position: fixed; z-index: 2147483647; top: 22px; left: 22px; width: 390px; color: #f8fafc; background: rgba(8, 15, 28, .96); border: 2px solid rgba(125, 211, 252, .8); border-radius: 18px; box-shadow: 0 18px 55px rgba(0,0,0,.55); padding: 18px; pointer-events: auto; }
        .panel.hidden { display: none; }
        .top { display: flex; align-items: center; gap: 12px; }
        .mark { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px; background: #0ea5e9; color: #001018; font-size: 25px; font-weight: 900; }
        h1 { margin: 0; font-size: 22px; line-height: 1.1; color: #fff; }
        .sub { color: #9fb2c8; font-size: 13px; margin-top: 3px; }
        .pair { display: grid; grid-template-columns: 154px 1fr; gap: 16px; align-items: center; margin-top: 16px; }
        .qr { display: grid; place-items: center; width: 154px; height: 154px; overflow: hidden; border-radius: 10px; background: white; color: #111827; font-size: 13px; text-align: center; }
        .qr canvas { display: block; image-rendering: pixelated; }
        .pin-label { color: #a9bdd0; font-size: 13px; text-transform: uppercase; letter-spacing: .12em; }
        .pin { color: #7dd3fc; font-size: 36px; font-weight: 800; letter-spacing: .12em; margin: 4px 0 10px; }
        .url { color: #d8e8f7; font-size: 14px; overflow-wrap: anywhere; line-height: 1.35; }
        .diag { margin-top: 14px; padding-top: 12px; border-top: 1px solid #26384d; color: #9fb2c8; font-size: 12px; line-height: 1.55; }
        .diag strong { color: #dbeafe; }
        .min { position: absolute; top: 10px; right: 12px; border: 0; border-radius: 8px; background: #1d2d42; color: white; padding: 7px 10px; font-size: 13px; }
        .chip { position: fixed; z-index: 2147483647; top: 18px; left: 18px; display: none; color: white; background: rgba(8,15,28,.9); border: 2px solid #38bdf8; border-radius: 999px; padding: 10px 15px; font: 700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; pointer-events: auto; }
        .chip.visible { display: block; }
        .pointer { position: fixed; z-index: 2147483646; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; background: #0ea5e9; box-shadow: 0 2px 9px rgba(0,0,0,.7); transform: translate(-50%, -50%); pointer-events: none; }
        .focus { position: fixed; z-index: 2147483645; display: none; border: 4px solid #38bdf8; border-radius: 10px; box-shadow: 0 0 0 3px rgba(0,0,0,.65); pointer-events: none; transition: left .1s, top .1s, width .1s, height .1s; }
      </style>
      <div class="root">
        <section class="panel">
          <button class="min" type="button">Hide</button>
          <div class="top"><div class="mark">↗</div><div><h1>Web Remote TV</h1><div class="sub">Scan with a phone on the same Wi-Fi</div></div></div>
          <div class="pair"><div class="qr" role="img" aria-label="Pairing QR code"></div><div><div class="pin-label">Pairing PIN</div><div class="pin">------</div><div class="url">Starting local service…</div></div></div>
          <div class="diag"></div>
        </section>
        <button class="chip" type="button">Phone Remote</button>
        <div class="pointer"></div>
        <div class="focus"></div>
      </div>`;
    const panel = root.querySelector('.panel');
    const chip = root.querySelector('.chip');
    root.querySelector('.min').addEventListener('click', () => setOverlay(false));
    chip.addEventListener('click', () => setOverlay(true));
    document.documentElement.appendChild(host);
    overlay = {
      host,
      root,
      panel,
      chip,
      qr: root.querySelector('.qr'),
      pin: root.querySelector('.pin'),
      url: root.querySelector('.url'),
      diag: root.querySelector('.diag'),
      pointer: root.querySelector('.pointer'),
      focus: root.querySelector('.focus')
    };
    updatePointer();
    updateOverlay();
    syncOverlayVisibility();
  }

  function setOverlay(show) {
    overlayVisible = show;
    syncOverlayVisibility();
  }

  function syncOverlayVisibility() {
    if (!overlay) return;
    overlay.panel.classList.toggle('hidden', !overlayVisible || siteFillTvActive);
    overlay.chip.classList.toggle('visible', !overlayVisible && !siteFillTvActive);
  }

  function updateOverlay() {
    if (!overlay) return;
    const data = serviceInfo || {};
    overlay.pin.textContent = data.pin || '------';
    overlay.url.textContent = data.pairUrl || (data.addresses && data.addresses[0]) || 'Local service unavailable';
    if (data.pin && data.pairUrl && overlay.qr.getAttribute('data-value') !== data.pairUrl) {
      try {
        const canvas = createQrCanvas(document, qrcode, data.pairUrl);
        overlay.qr.textContent = '';
        overlay.qr.appendChild(canvas);
        overlay.qr.setAttribute('data-value', data.pairUrl);
      } catch (error) {
        lastError = `QR code: ${error.message}`;
        overlay.qr.textContent = 'Use the address';
      }
    }
    overlay.diag.innerHTML = '';
    const rows = [
      ['Site adapter', adapter.id],
      ['Bridge', transport],
      ['Phone', data.phoneCount ? `${data.phoneCount} connected` : 'not connected'],
      ['Page', cleanText(window.location.hostname, 80)],
      ['Last error', lastError || 'none']
    ];
    for (const row of rows) {
      const line = document.createElement('div');
      const strong = document.createElement('strong');
      strong.textContent = `${row[0]}: `;
      line.appendChild(strong);
      line.appendChild(document.createTextNode(row[1]));
      overlay.diag.appendChild(line);
    }
    if (data.phoneCount && overlayVisible) setTimeout(() => setOverlay(false), 1300);
  }

  function updatePointer() {
    if (!overlay) return;
    overlay.pointer.style.left = `${pointerX}px`;
    overlay.pointer.style.top = `${pointerY}px`;
  }

  function showFocus(element) {
    focusedElement = element;
    if (!overlay || !element || !adapter.visible(element)) {
      if (overlay) overlay.focus.style.display = 'none';
      return;
    }
    const rect = element.getBoundingClientRect();
    overlay.focus.style.display = 'block';
    overlay.focus.style.left = `${Math.max(0, rect.left - 5)}px`;
    overlay.focus.style.top = `${Math.max(0, rect.top - 5)}px`;
    overlay.focus.style.width = `${Math.max(8, rect.width + 10)}px`;
    overlay.focus.style.height = `${Math.max(8, rect.height + 10)}px`;
  }

  function setText(value, submit) {
    if (submit && adapter.searchUrl) {
      const searchUrl = adapter.searchUrl(value);
      if (searchUrl) {
        window.location.assign(searchUrl);
        return;
      }
    }
    const element = adapter.preferredTextInput();
    if (!element) throw new Error('No visible text or search field was found.');
    element.focus();
    if (element.isContentEditable) {
      element.textContent = value;
    } else {
      const prototype = element.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(prototype, 'value');
      if (setter && setter.set) setter.set.call(element, value);
      else element.value = value;
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    if (submit) {
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
      element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true }));
      if (element.form) {
        if (typeof element.form.requestSubmit === 'function') element.form.requestSubmit();
        else element.form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    }
    showFocus(element);
  }

  function fallbackMediaKey(action) {
    const mapping = {
      toggle: { key: 'MediaPlayPause', code: 10252 },
      play: { key: 'MediaPlay', code: 415 },
      pause: { key: 'MediaPause', code: 19 }
    };
    const value = mapping[action];
    if (!value) return;
    for (const type of ['keydown', 'keyup']) {
      document.dispatchEvent(new KeyboardEvent(type, {
        key: value.key,
        keyCode: value.code,
        which: value.code,
        bubbles: true,
        cancelable: true
      }));
    }
  }

  function frameWindows() {
    return Array.from(document.querySelectorAll('iframe')).map((frame) => ({ frame, window: frame.contentWindow })).filter((entry) => entry.window);
  }

  function relayToFrames(command) {
    const frames = frameWindows();
    frames.forEach((entry) => entry.window.postMessage({ channel: FRAME_CHANNEL, kind: 'command', command }, '*'));
    return frames.length;
  }

  function mediaCommand(action, value) {
    const video = bestVideo();
    if (!video) {
      fallbackMediaKey(action);
      if (!relayToFrames({ type: 'media', action, value })) {
        throw new Error('No accessible video or embedded player frame was found.');
      }
      lastError = 'Media command forwarded to embedded player frame.';
      updateOverlay();
      return;
    }
    if (action === 'toggle') video.paused ? video.play() : video.pause();
    if (action === 'play') video.play();
    if (action === 'pause') video.pause();
    if (action === 'seekBy') video.currentTime = Math.max(0, Math.min(Number.isFinite(video.duration) ? video.duration : Infinity, video.currentTime + value));
    if (action === 'volumeBy') {
      video.muted = false;
      video.volume = Math.max(0, Math.min(1, video.volume + value));
    }
    if (action === 'captions') {
      const tracks = Array.from(video.textTracks || []);
      const showing = tracks.some((track) => track.mode === 'showing');
      tracks.forEach((track, index) => { track.mode = !showing && index === 0 ? 'showing' : 'disabled'; });
    }
    if (action === 'fullscreen') {
      if (adapter.id === 'bilibili' && adapter.siteAction && adapter.siteAction('webFullscreen')) {
        setTimeout(() => {
          pageState(true);
          playerState(true);
        }, 250);
        return;
      }
      const target = video.closest('.bpx-player-container,[data-player],.player') || video;
      const requestTarget = target.requestFullscreen || target.webkitRequestFullscreen ? target : video;
      const request = requestTarget.requestFullscreen || requestTarget.webkitRequestFullscreen || requestTarget.webkitEnterFullscreen;
      if (request) {
        const result = request.call(requestTarget);
        if (result && typeof result.catch === 'function') result.catch(() => {});
      }
    }
    setTimeout(() => playerState(true), 100);
  }

  function execute(command) {
    try {
      if (command.type === 'navigate') {
        window.location.replace(command.url);
        return;
      }
      if (command.type === 'history') {
        if (command.action === 'back') window.history.back();
        if (command.action === 'forward') window.history.forward();
        if (command.action === 'reload') window.location.reload();
        return;
      }
      if (command.type === 'focus') {
        const next = adapter.moveFocus(focusedElement, command.direction);
        if (next) {
          next.focus();
          next.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
          showFocus(next);
        }
      }
      if (command.type === 'activate') adapter.activate(focusedElement || document.activeElement);
      if (command.type === 'scroll') window.scrollBy({ left: command.dx, top: command.dy, behavior: 'smooth' });
      if (command.type === 'pointer') {
        pointerX = Math.max(0, Math.min(window.innerWidth - 1, pointerX + command.dx));
        pointerY = Math.max(0, Math.min(window.innerHeight - 1, pointerY + command.dy));
        updatePointer();
      }
      if (command.type === 'pointerClick') {
        const target = document.elementFromPoint(pointerX, pointerY);
        if (target && target !== overlay.host) {
          if (target.tagName === 'IFRAME' && target.contentWindow) {
            const rect = target.getBoundingClientRect();
            target.contentWindow.postMessage({
              channel: FRAME_CHANNEL,
              kind: 'command',
              command: {
                type: 'pointerClick',
                xRatio: (pointerX - rect.left) / Math.max(1, rect.width),
                yRatio: (pointerY - rect.top) / Math.max(1, rect.height)
              }
            }, '*');
          } else {
            showFocus(target);
            adapter.activate(target);
          }
        }
      }
      if (command.type === 'text') setText(command.value, command.submit);
      if (command.type === 'media') mediaCommand(command.action, command.value);
      if (command.type === 'site') {
        if (command.site !== adapter.id || !adapter.siteAction) throw new Error(`The ${command.site} controls are not available on this page.`);
        if (!adapter.siteAction(command.action, command.value)) throw new Error(`Bilibili control "${command.action}" is not available on this page.`);
        setTimeout(() => {
          pageState(true);
          playerState(true);
          snapshot();
        }, 250);
      }
      if (command.type === 'select') {
        const element = adapter.elementById(command.id);
        showFocus(element);
        adapter.activate(element);
      }
      if (command.type === 'requestSnapshot') snapshot();
      if (command.type === 'overlay') setOverlay(command.action === 'toggle' ? !overlayVisible : command.action === 'show');
      scheduleSnapshot();
    } catch (error) {
      lastError = cleanText(error.message, 260);
      postState({ kind: 'log', level: 'warn', message: lastError });
      updateOverlay();
    }
  }

  function processServiceMessage(message) {
    if (!message || typeof message !== 'object') return;
    if (message.kind === 'service_info') {
      serviceInfo = message.info;
      updateOverlay();
    }
    if (message.kind === 'command') execute(message.command || {});
    if (message.kind === 'ping') postState({ kind: 'pong', at: Date.now() });
  }

  async function bootstrapServiceInfo() {
    try {
      const response = await fetch(`${LOCAL_HTTP}/api/tv-info?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      serviceInfo = await response.json();
      updateOverlay();
    } catch (error) {
      if (!serviceInfo) {
        lastError = `Pairing info unavailable: ${error.message}`;
        updateOverlay();
      }
    }
  }

  async function pollLoop() {
    if (polling) return;
    polling = true;
    transport = 'HTTP fallback';
    updateOverlay();
    while (polling && (!socket || socket.readyState !== WebSocket.OPEN)) {
      try {
        pollAbort = typeof AbortController === 'function' ? new AbortController() : null;
        const response = await fetch(`${LOCAL_HTTP}/api/tv/poll?t=${Date.now()}`, {
          cache: 'no-store',
          signal: pollAbort ? pollAbort.signal : undefined
        });
        const payload = await response.json();
        serviceInfo = payload.info || serviceInfo;
        (payload.messages || []).forEach(processServiceMessage);
        lastError = '';
        pageState(false);
        playerState(false);
        updateOverlay();
      } catch (error) {
        if (error.name !== 'AbortError') {
          lastError = `Local bridge unavailable: ${error.message}`;
          updateOverlay();
          await new Promise((resolve) => setTimeout(resolve, 1800));
        }
      }
    }
    polling = false;
  }

  function connectSocket() {
    clearTimeout(socketTimer);
    try {
      socket = new WebSocket(LOCAL_WS);
    } catch (error) {
      lastError = `WebSocket: ${error.message}`;
      pollLoop();
      return;
    }
    socketTimer = setTimeout(() => {
      if (!socket || socket.readyState !== WebSocket.OPEN) pollLoop();
    }, 2200);
    socket.addEventListener('open', () => {
      clearTimeout(socketTimer);
      transport = 'WebSocket';
      lastError = '';
      if (pollAbort) pollAbort.abort();
      polling = false;
      pageState(true);
      playerState(true);
      snapshot();
      updateOverlay();
    });
    socket.addEventListener('message', (event) => {
      try { processServiceMessage(JSON.parse(event.data)); } catch { /* Ignore malformed local messages. */ }
    });
    socket.addEventListener('close', () => {
      transport = 'reconnecting';
      updateOverlay();
      pollLoop();
      setTimeout(connectSocket, 5000);
    });
    socket.addEventListener('error', () => {
      lastError = 'WebSocket connection failed; trying HTTP fallback.';
      updateOverlay();
    });
  }

  function initializeDom() {
    createOverlay();
    pageState(true);
    playerState(true);
    scheduleSnapshot();
    const observer = new MutationObserver(() => {
      if (!overlay || !document.documentElement.contains(overlay.host)) createOverlay();
      scheduleSnapshot();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  window.addEventListener('message', (event) => {
    const message = event.data;
    if (!message || message.channel !== FRAME_CHANNEL || message.kind !== 'player') return;
    if (!frameWindows().some((entry) => entry.window === event.source)) return;
    embeddedPlayer = message.player;
    embeddedPlayerSeenAt = Date.now();
    playerState(true);
  });

  function emergencyHome(event) {
    const keyCode = Number(event.keyCode || event.which);
    const isBack = event.keyName === 'back' || event.key === 'Back' || event.key === 'Escape' || keyCode === 10009;
    const hostname = String(window.location.hostname || '').toLowerCase();
    const onBilibili = hostname === 'bilibili.com' || hostname.endsWith('.bilibili.com');
    if (!isBack || onBilibili) return;
    event.preventDefault();
    event.stopPropagation();
    window.location.replace(BILIBILI_HOME);
  }

  window.addEventListener('keydown', emergencyHome, true);
  document.addEventListener('tizenhwkey', emergencyHome, true);

  if (document.documentElement) initializeDom();
  else document.addEventListener('DOMContentLoaded', initializeDom, { once: true });

  bootstrapServiceInfo();
  connectSocket();
  setInterval(() => {
    const signature = `${window.location.href}|${document.title}|${document.readyState}`;
    if (signature !== lastPageSignature) pageState(false);
    playerState(false);
    if (focusedElement) showFocus(focusedElement);
    if (!overlay || !document.documentElement.contains(overlay.host)) createOverlay();
  }, 1000);
})();
