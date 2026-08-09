'use strict';

(function startController() {
  const TOKEN_KEY = 'webRemoteTvToken';
  const CONFIG_KEY = 'webRemoteTvProfiles';
  const BILIBILI_DEFAULT_MIGRATION_KEY = 'webRemoteTvBilibiliDefaultV1';
  const SECTION_PREFERENCES_KEY = 'webRemoteTvSectionPreferencesV1';
  const SHOW_ALL_SECTIONS_KEY = 'webRemoteTvShowAllSectionsV1';
  const MANUAL_MODE_KEY = 'webRemoteTvManualModeV1';
  const SEEK_STEP_KEY = 'webRemoteTvSeekStepV1';
  const SEEK_STEPS = [5, 10, 15, 30, 60];
  const SCROLL_SENSITIVITY = 3.5;
  const SCROLL_MOMENTUM_DECAY = 0.88;
  const BILIBILI_PROFILE = { id: 'bilibili', name: 'Bilibili', urls: ['https://www.bilibili.com/'] };
  const dom = {};
  let token = localStorage.getItem(TOKEN_KEY) || '';
  let socket = null;
  let reconnectTimer = null;
  let state = null;
  let serviceInfo = null;
  let editorProfiles = [];
  let toastTimer = null;
  let configRestored = false;
  let pointerSession = null;
  let pointerPending = { dx: 0, dy: 0 };
  let pointerFrame = null;
  let scrollMomentum = null;
  let scrollMomentumFrame = null;
  let showAllSections = localStorage.getItem(SHOW_ALL_SECTIONS_KEY) === '1';
  let sectionContext = '';
  let sectionPreferences = {};
  try {
    const savedSectionPreferences = JSON.parse(localStorage.getItem(SECTION_PREFERENCES_KEY) || '{}');
    sectionPreferences = savedSectionPreferences && typeof savedSectionPreferences === 'object' && !Array.isArray(savedSectionPreferences)
      ? savedSectionPreferences : {};
  } catch { sectionPreferences = {}; }

  function byId(id) { return document.getElementById(id); }

  function cacheDom() {
    for (const id of [
      'connectionLabel', 'connectionDot', 'pairView', 'remoteView', 'pairForm', 'pinInput', 'pairError',
      'pageTitle', 'pageUrl', 'showTvOverlay', 'hideTvOverlay', 'toggleAllSections', 'profiles', 'editSitesButton', 'sitesEditor', 'closeSitesButton',
      'sitesForm', 'profileEditors', 'addProfileButton', 'sitesError', 'textForm', 'textInput', 'sendTextButton',
      'bilibiliPanel', 'bilibiliStatus', 'bilibiliQuality', 'applyBilibiliQuality', 'bilibiliSpeed', 'applyBilibiliSpeed',
      'bilibiliResultsPanel', 'bilibiliResultsStatus', 'bilibiliResultFilter', 'bilibiliResults', 'refreshBilibiliResults',
      'fillTvButton', 'bilibiliPlayerActions', 'bilibiliPlaybackSettings', 'danmakuButton', 'activateButton', 'touchMode', 'touchModeTitle', 'touchpad', 'touchpadHint',
      'touchPanel', 'dpadPanel', 'playerStatus', 'playerTime', 'seekStep', 'seekBack', 'seekForward',
      'refreshItems', 'itemFilter', 'pageItems', 'sitesPanel', 'sitesStatus', 'textPanel', 'textStatus', 'manualPanel',
      'manualStatus', 'playerPanel', 'itemsPanel', 'itemsStatus', 'diagnosticsPanel', 'diagTv', 'diagNavigation',
      'diagAdapter', 'diagSocket', 'diagError', 'forgetButton', 'toast'
    ]) dom[id] = byId(id);
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    dom.toast.textContent = message;
    dom.toast.classList.add('visible');
    toastTimer = setTimeout(() => dom.toast.classList.remove('visible'), 2400);
  }

  async function api(path, options) {
    const response = await fetch(path, {
      cache: 'no-store',
      ...options,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options && options.body ? { 'Content-Type': 'application/json' } : {}),
        ...((options && options.headers) || {})
      }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
    return payload;
  }

  function setConnection() {
    const phoneConnected = socket && socket.readyState === WebSocket.OPEN;
    const tvConnected = Boolean(state && state.tvConnected);
    dom.connectionDot.classList.toggle('connected', phoneConnected && tvConnected);
    dom.connectionDot.classList.toggle('partial', phoneConnected && !tvConnected);
    dom.connectionDot.setAttribute('aria-label', phoneConnected && tvConnected ? 'Connected' : 'Disconnected');
    dom.connectionLabel.textContent = !token ? 'Pair this phone'
      : !phoneConnected ? 'Reconnecting to local service…'
        : tvConnected ? 'Phone and television connected'
          : 'Phone connected · TV page bridge unavailable';
    dom.diagSocket.textContent = phoneConnected ? 'connected' : 'disconnected';
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return '--:--';
    const whole = Math.floor(seconds);
    const hours = Math.floor(whole / 3600);
    const minutes = Math.floor((whole % 3600) / 60);
    const rest = whole % 60;
    return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}` : `${minutes}:${String(rest).padStart(2, '0')}`;
  }

  function manualModeLabel() {
    if (dom.touchMode.value === 'dpad') return 'D-pad';
    if (dom.touchMode.value === 'scroll') return 'Scroll';
    return 'Pointer';
  }

  function updateManualMode() {
    const mode = ['pointer', 'scroll', 'dpad'].includes(dom.touchMode.value) ? dom.touchMode.value : 'pointer';
    dom.touchMode.value = mode;
    dom.touchPanel.hidden = mode === 'dpad';
    dom.dpadPanel.hidden = mode !== 'dpad';
    dom.touchModeTitle.textContent = mode === 'scroll' ? 'Scroll' : 'Pointer';
    dom.touchpadHint.textContent = mode === 'scroll' ? 'Drag to scroll the TV page' : 'Drag to move · Tap to click';
    dom.manualStatus.textContent = manualModeLabel();
  }

  function updateSeekStep() {
    const requested = Number(dom.seekStep.value);
    const step = SEEK_STEPS.includes(requested) ? requested : 5;
    dom.seekStep.value = String(step);
    dom.seekBack.dataset.value = String(-step);
    dom.seekForward.dataset.value = String(step);
    dom.seekBack.textContent = `−${step}s`;
    dom.seekForward.textContent = `+${step}s`;
  }

  function restoreControlPreferences() {
    const savedMode = localStorage.getItem(MANUAL_MODE_KEY);
    dom.touchMode.value = ['pointer', 'scroll', 'dpad'].includes(savedMode) ? savedMode : 'pointer';
    const savedSeek = Number(localStorage.getItem(SEEK_STEP_KEY));
    dom.seekStep.value = String(SEEK_STEPS.includes(savedSeek) ? savedSeek : 5);
    updateManualMode();
    updateSeekStep();
  }

  function renderState() {
    setConnection();
    if (!state) return;
    const page = state.page || {};
    const player = state.player || {};
    dom.pageTitle.textContent = page.title || page.hostname || 'Waiting for page…';
    dom.pageTitle.title = dom.pageTitle.textContent;
    dom.pageUrl.textContent = page.url || '';
    const playerAvailable = player.found || Boolean(page.site && page.site.playerAvailable);
    dom.playerStatus.textContent = player.found ? (player.paused ? 'Paused' : 'Playing')
      : page.site && page.site.playbackPage && playerAvailable ? 'Bilibili player ready'
        : playerAvailable ? 'Player loading' : 'No player';
    dom.playerTime.textContent = `${formatTime(player.currentTime)} / ${formatTime(player.duration)}`;
    dom.diagTv.textContent = state.tvConnected ? 'connected' : 'not connected';
    dom.diagNavigation.textContent = state.navigation ? state.navigation.status : 'idle';
    dom.diagAdapter.textContent = page.adapter || 'unknown';
    dom.diagError.textContent = state.lastLog ? state.lastLog.message : 'none';
    renderBilibili(page);
    renderProfiles();
    renderBilibiliResults(page);
    renderItems();
    renderSectionLayout(page, player);
  }

  function renderBilibili(page) {
    const active = page.adapter === 'bilibili';
    dom.bilibiliPanel.hidden = !active;
    if (!active) return;
    const site = page.site || {};
    const status = [];
    if (!site.playerAvailable) status.push(site.loggedIn ? 'Signed in' : site.loginAvailable ? 'Login available' : 'Account status unknown');
    if (site.webFullscreenActive) status.push('Fill TV');
    if (typeof site.danmakuEnabled === 'boolean') status.push(site.danmakuEnabled ? 'Danmu on' : 'Danmu off');
    if (site.quality) status.push(site.quality);
    if (!status.length) status.push(site.playerAvailable ? 'Player ready' : 'Ready');
    dom.bilibiliStatus.textContent = status.join(' · ');

    dom.bilibiliStatus.title = dom.bilibiliStatus.textContent;
    const fillLabel = site.webFullscreenActive ? 'Exit Fill TV' : 'Fill TV';
    dom.fillTvButton.textContent = fillLabel;
    dom.danmakuButton.textContent = site.danmakuEnabled === false ? 'Turn danmu on' : 'Turn danmu off';

    const rate = String(site.playbackRate || '');
    if (Array.from(dom.bilibiliSpeed.options).some((option) => option.value === rate)) dom.bilibiliSpeed.value = rate;
    const quality = String(site.quality || '').toLowerCase();
    const qualityValue = /自动|auto/.test(quality) ? '0'
      : /1080p\s*60/.test(quality) ? '116'
        : /1080p/.test(quality) ? '80'
          : /720p/.test(quality) ? '64'
            : /480p/.test(quality) ? '32'
              : /360p/.test(quality) ? '16' : '';
    if (qualityValue) dom.bilibiliQuality.value = qualityValue;
  }

  function renderProfiles() {
    if (!serviceInfo || !Array.isArray(serviceInfo.profiles)) return;
    const activeProfile = serviceInfo.profiles.find((profile) => state && state.activeProfileId === profile.id);
    dom.sitesStatus.textContent = activeProfile ? activeProfile.name : 'Switch site';
    dom.profiles.textContent = '';
    for (const profile of serviceInfo.profiles) {
      const row = document.createElement('div');
      row.className = `profile${state && state.activeProfileId === profile.id ? ' active' : ''}`;
      const name = document.createElement('span');
      name.className = 'profile-name';
      name.textContent = profile.name;
      const select = document.createElement('select');
      select.setAttribute('aria-label', `${profile.name} domain`);
      profile.urls.forEach((url, index) => {
        const option = document.createElement('option');
        option.value = url;
        option.textContent = profile.urls.length > 1 ? `${index + 1}. ${new URL(url).hostname}` : new URL(url).hostname;
        select.appendChild(option);
      });
      const open = document.createElement('button');
      open.type = 'button';
      open.textContent = state && state.activeProfileId === profile.id ? 'Reload' : 'Open';
      open.addEventListener('click', () => command({ type: 'navigate', profileId: profile.id, url: select.value }));
      row.append(name, select, open);
      dom.profiles.appendChild(row);
    }
  }

  function renderItems() {
    if (!state) return;
    const query = dom.itemFilter.value.trim().toLowerCase();
    const controls = (state.items || []).filter((item) => item.group !== 'bilibili-search-result');
    const items = controls.filter((item) => !query || `${item.label} ${item.detail} ${item.kind}`.toLowerCase().includes(query));
    dom.itemsStatus.textContent = `${controls.length} found`;
    dom.pageItems.textContent = '';
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'muted';
      empty.textContent = controls.length ? 'No matching controls.' : 'No visible controls were discovered yet.';
      dom.pageItems.appendChild(empty);
      return;
    }
    for (const item of items) {
      dom.pageItems.appendChild(createItemButton(item));
    }
  }

  function createItemButton(item, dedicatedVideo) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = dedicatedVideo ? 'page-item video-result' : 'page-item';
    const kind = document.createElement('span');
    kind.className = 'kind';
    kind.textContent = dedicatedVideo ? 'video' : item.kind;
    const copy = document.createElement('span');
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = item.label;
    copy.appendChild(label);
    if (item.detail) {
      const detail = document.createElement('span');
      detail.className = 'detail';
      detail.textContent = item.detail;
      copy.appendChild(detail);
    }
    button.append(kind, copy);
    button.addEventListener('click', () => {
      if (dedicatedVideo) showToast(`Opening ${item.label}`);
      command({ type: 'select', id: item.id }, false);
    });
    return button;
  }

  function renderBilibiliResults(page) {
    if (!state) return;
    const site = page.site || {};
    const allResults = (state.items || []).filter((item) => item.group === 'bilibili-search-result');
    const query = dom.bilibiliResultFilter.value.trim().toLowerCase();
    const results = allResults.filter((item) => !query || `${item.label} ${item.detail}`.toLowerCase().includes(query));
    dom.bilibiliResultsStatus.textContent = allResults.length ? `${allResults.length} videos` : site.searchPage ? 'Loading results' : 'No results';
    dom.bilibiliResults.textContent = '';
    if (!results.length) {
      const empty = document.createElement('p');
      empty.className = 'muted';
      empty.textContent = allResults.length ? 'No matching videos.' : site.searchPage ? 'Bilibili results are still loading. Tap Refresh if this remains empty.' : 'No Bilibili video results on this page.';
      dom.bilibiliResults.appendChild(empty);
      return;
    }
    for (const item of results) dom.bilibiliResults.appendChild(createItemButton(item, true));
  }

  function hasSectionPreference(panel) {
    return Boolean(panel && Object.prototype.hasOwnProperty.call(sectionPreferences, panel.dataset.section));
  }

  function setAutomaticOpen(panel, open) {
    if (!panel || hasSectionPreference(panel) || panel.open === open) return;
    panel.dataset.automaticToggle = 'true';
    panel.open = open;
    setTimeout(() => { delete panel.dataset.automaticToggle; }, 0);
  }

  function renderSectionLayout(page, player) {
    const site = page.site || {};
    const isBilibili = page.adapter === 'bilibili';
    const playerAvailable = Boolean(player.found || site.playerAvailable);
    const items = state && Array.isArray(state.items) ? state.items : [];
    const hasTextInput = isBilibili || items.some((item) => item.kind === 'input');
    const hasBilibiliResults = items.some((item) => item.group === 'bilibili-search-result');
    const isBilibiliSearch = isBilibili && Boolean(site.searchPage || hasBilibiliResults);
    const hasPageItems = items.some((item) => item.group !== 'bilibili-search-result');

    dom.toggleAllSections.textContent = showAllSections ? 'Use smart view' : 'Show all controls';
    dom.toggleAllSections.setAttribute('aria-pressed', String(showAllSections));
    dom.textStatus.textContent = hasTextInput ? (isBilibili ? 'Bilibili search' : 'Input detected') : 'No input detected';
    dom.manualStatus.textContent = manualModeLabel();
    if (!isBilibili) dom.fillTvButton.textContent = 'Fullscreen';
    dom.bilibiliPlayerActions.hidden = !(isBilibili && playerAvailable);
    dom.bilibiliPlaybackSettings.hidden = !(isBilibili && playerAvailable);

    dom.bilibiliPanel.hidden = !isBilibili;
    dom.bilibiliResultsPanel.hidden = !(isBilibiliSearch || (showAllSections && isBilibili));
    dom.textPanel.hidden = !(showAllSections || (hasTextInput && !playerAvailable));
    dom.playerPanel.hidden = !(showAllSections || playerAvailable);
    dom.itemsPanel.hidden = !(showAllSections || (hasPageItems && !playerAvailable && !isBilibiliSearch));
    dom.manualPanel.hidden = !(showAllSections || (!playerAvailable && !hasPageItems && !isBilibiliSearch));

    const nextContext = playerAvailable ? 'player' : isBilibiliSearch ? 'bilibiliResults' : isBilibili ? 'bilibili' : hasPageItems ? 'items' : 'manual';
    if (nextContext !== sectionContext) {
      sectionContext = nextContext;
      setAutomaticOpen(dom.playerPanel, nextContext === 'player');
      setAutomaticOpen(dom.bilibiliResultsPanel, nextContext === 'bilibiliResults');
      setAutomaticOpen(dom.bilibiliPanel, nextContext === 'bilibili');
      setAutomaticOpen(dom.itemsPanel, nextContext === 'items');
      setAutomaticOpen(dom.manualPanel, nextContext === 'manual');
      setAutomaticOpen(dom.textPanel, false);
      setAutomaticOpen(dom.sitesPanel, false);
    }
  }

  function bindSectionControls() {
    for (const panel of document.querySelectorAll('details[data-section]')) {
      const id = panel.dataset.section;
      if (Object.prototype.hasOwnProperty.call(sectionPreferences, id)) panel.open = Boolean(sectionPreferences[id]);
      panel.addEventListener('toggle', () => {
        if (panel.dataset.automaticToggle) return;
        sectionPreferences[id] = panel.open;
        localStorage.setItem(SECTION_PREFERENCES_KEY, JSON.stringify(sectionPreferences));
      });
    }
    dom.toggleAllSections.addEventListener('click', () => {
      showAllSections = !showAllSections;
      localStorage.setItem(SHOW_ALL_SECTIONS_KEY, showAllSections ? '1' : '0');
      renderState();
      showToast(showAllSections ? 'Showing every control section' : 'Smart view hides irrelevant sections');
    });
  }

  function renderProfileEditors() {
    dom.profileEditors.textContent = '';
    editorProfiles.forEach((profile, index) => {
      const fieldset = document.createElement('div');
      fieldset.className = 'profile-editor';
      const grid = document.createElement('div');
      grid.className = 'profile-editor-grid';
      const nameLabel = document.createElement('label');
      nameLabel.textContent = 'Name';
      const nameInput = document.createElement('input');
      nameInput.value = profile.name;
      nameInput.maxLength = 40;
      nameInput.addEventListener('input', () => { profile.name = nameInput.value; });
      nameLabel.appendChild(nameInput);
      const urlsLabel = document.createElement('label');
      urlsLabel.textContent = 'HTTPS domains (one per line)';
      const urlsInput = document.createElement('textarea');
      urlsInput.value = profile.urls.join('\n');
      urlsInput.addEventListener('input', () => { profile.urls = urlsInput.value.split(/\r?\n/).map((value) => value.trim()).filter(Boolean); });
      urlsLabel.appendChild(urlsInput);
      grid.append(nameLabel, urlsLabel);
      fieldset.appendChild(grid);
      if (!['1shows', 'cineby', 'bilibili'].includes(profile.id)) {
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'danger compact';
        remove.textContent = 'Remove custom site';
        remove.addEventListener('click', () => {
          editorProfiles.splice(index, 1);
          renderProfileEditors();
        });
        fieldset.appendChild(remove);
      }
      dom.profileEditors.appendChild(fieldset);
    });
  }

  function openEditor() {
    editorProfiles = JSON.parse(JSON.stringify((serviceInfo && serviceInfo.profiles) || []));
    renderProfileEditors();
    dom.sitesEditor.hidden = false;
    dom.sitesEditor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function saveProfiles(event) {
    event.preventDefault();
    dom.sitesError.textContent = '';
    try {
      const active = editorProfiles.some((profile) => profile.id === (state && state.activeProfileId)) ? state.activeProfileId : editorProfiles[0].id;
      const result = await api('/api/config', {
        method: 'PUT',
        body: JSON.stringify({ profiles: editorProfiles, activeProfileId: active })
      });
      serviceInfo.profiles = result.profiles;
      serviceInfo.activeProfileId = result.activeProfileId;
      localStorage.setItem(CONFIG_KEY, JSON.stringify(result));
      dom.sitesEditor.hidden = true;
      renderProfiles();
      showToast('Domains saved on this TV session');
    } catch (error) {
      dom.sitesError.textContent = error.message;
    }
  }

  async function restoreSavedConfig() {
    if (configRestored || !token) return;
    configRestored = true;
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) {
      localStorage.setItem(BILIBILI_DEFAULT_MIGRATION_KEY, '1');
      return;
    }
    try {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved.profiles) && !saved.profiles.some((profile) => profile.id === 'bilibili')) {
        saved.profiles.push(BILIBILI_PROFILE);
      }
      if (!localStorage.getItem(BILIBILI_DEFAULT_MIGRATION_KEY) && Array.isArray(saved.profiles)) {
        saved.profiles = saved.profiles.slice().sort((left, right) => {
          if (left.id === 'bilibili') return -1;
          if (right.id === 'bilibili') return 1;
          return 0;
        });
        saved.activeProfileId = 'bilibili';
      }
      const result = await api('/api/config', { method: 'PUT', body: JSON.stringify(saved) });
      if (serviceInfo) {
        serviceInfo.profiles = result.profiles;
        serviceInfo.activeProfileId = result.activeProfileId;
      }
      localStorage.setItem(CONFIG_KEY, JSON.stringify(result));
      localStorage.setItem(BILIBILI_DEFAULT_MIGRATION_KEY, '1');
    } catch (error) {
      showToast(`Saved domains were not restored: ${error.message}`);
    }
  }

  function handleMessage(message) {
    if (message.kind === 'state') state = message.state;
    if (message.kind === 'service_info') serviceInfo = message.info;
    if (message.kind === 'error') showToast(message.error || 'Command failed');
    renderState();
  }

  function connectSocket() {
    clearTimeout(reconnectTimer);
    if (!token) return;
    if (socket && (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN)) return;
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const nextSocket = new WebSocket(`${protocol}//${location.host}/ws?role=phone&token=${encodeURIComponent(token)}`);
    socket = nextSocket;
    nextSocket.addEventListener('open', () => {
      if (socket !== nextSocket) return;
      setConnection();
      command({ type: 'requestSnapshot' }, false);
    });
    nextSocket.addEventListener('message', (event) => {
      if (socket !== nextSocket) return;
      try { handleMessage(JSON.parse(event.data)); } catch { /* Ignore malformed local messages. */ }
    });
    nextSocket.addEventListener('close', () => {
      if (socket !== nextSocket) return;
      socket = null;
      setConnection();
      if (token) reconnectTimer = setTimeout(connectSocket, 1800);
    });
    nextSocket.addEventListener('error', () => {
      if (socket === nextSocket) setConnection();
    });
  }

  async function command(value, announce = true) {
    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ kind: 'command', requestId: String(Date.now()), command: value }));
      } else {
        await api('/api/command', { method: 'POST', body: JSON.stringify({ command: value }) });
      }
      if (announce && value.type === 'navigate') showToast(`Opening ${new URL(value.url).hostname}`);
      if (announce && value.type === 'site') showToast('Bilibili control sent');
    } catch (error) {
      showToast(error.message);
    }
  }

  async function pair(event) {
    event.preventDefault();
    dom.pairError.textContent = '';
    try {
      const payload = await api('/api/pair', {
        method: 'POST',
        body: JSON.stringify({ pin: dom.pinInput.value.trim(), clientName: navigator.userAgent.slice(0, 60) })
      });
      token = payload.token;
      localStorage.setItem(TOKEN_KEY, token);
      state = payload.state;
      serviceInfo = payload.info;
      dom.pairView.hidden = true;
      dom.remoteView.hidden = false;
      await restoreSavedConfig();
      renderState();
      connectSocket();
    } catch (error) {
      dom.pairError.textContent = error.message;
    }
  }

  function flushPointer() {
    pointerFrame = null;
    const dx = pointerPending.dx;
    const dy = pointerPending.dy;
    pointerPending = { dx: 0, dy: 0 };
    if (!dx && !dy) return;
    if (dom.touchMode.value === 'scroll') command({ type: 'scroll', dx: -dx * SCROLL_SENSITIVITY, dy: -dy * SCROLL_SENSITIVITY }, false);
    else command({ type: 'pointer', dx: dx * 1.4, dy: dy * 1.4 }, false);
  }

  function stopScrollMomentum() {
    if (scrollMomentumFrame) cancelAnimationFrame(scrollMomentumFrame);
    scrollMomentumFrame = null;
    scrollMomentum = null;
  }

  function stepScrollMomentum(now) {
    scrollMomentumFrame = null;
    if (!scrollMomentum || dom.touchMode.value !== 'scroll' || !socket || socket.readyState !== WebSocket.OPEN) {
      scrollMomentum = null;
      return;
    }
    const elapsed = Math.max(8, Math.min(32, now - scrollMomentum.at));
    const frameScale = elapsed / 16.67;
    command({
      type: 'scroll',
      dx: scrollMomentum.dx * frameScale,
      dy: scrollMomentum.dy * frameScale
    }, false);
    const decay = Math.pow(SCROLL_MOMENTUM_DECAY, frameScale);
    scrollMomentum.dx *= decay;
    scrollMomentum.dy *= decay;
    scrollMomentum.at = now;
    if (Math.hypot(scrollMomentum.dx, scrollMomentum.dy) < 0.8) {
      scrollMomentum = null;
      return;
    }
    scrollMomentumFrame = requestAnimationFrame(stepScrollMomentum);
  }

  function startScrollMomentum(session) {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    const idle = Math.max(0, performance.now() - session.at);
    const releaseFactor = Math.max(0, 1 - idle / 100);
    const vx = Math.max(-3, Math.min(3, session.vx * releaseFactor));
    const vy = Math.max(-3, Math.min(3, session.vy * releaseFactor));
    const dx = -vx * SCROLL_SENSITIVITY * 16.67;
    const dy = -vy * SCROLL_SENSITIVITY * 16.67;
    if (Math.hypot(dx, dy) < 4) return;
    scrollMomentum = { dx, dy, at: performance.now() };
    scrollMomentumFrame = requestAnimationFrame(stepScrollMomentum);
  }

  function pointerDown(event) {
    stopScrollMomentum();
    dom.touchpad.setPointerCapture(event.pointerId);
    dom.touchpad.classList.add('active');
    pointerSession = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      vx: 0,
      vy: 0,
      at: performance.now()
    };
  }

  function pointerMove(event) {
    if (!pointerSession || pointerSession.id !== event.pointerId) return;
    const now = performance.now();
    const elapsed = Math.max(4, now - pointerSession.at);
    const dx = event.clientX - pointerSession.x;
    const dy = event.clientY - pointerSession.y;
    pointerPending.dx += dx;
    pointerPending.dy += dy;
    pointerSession.vx = pointerSession.vx * 0.6 + (dx / elapsed) * 0.4;
    pointerSession.vy = pointerSession.vy * 0.6 + (dy / elapsed) * 0.4;
    pointerSession.x = event.clientX;
    pointerSession.y = event.clientY;
    pointerSession.at = now;
    if (!pointerFrame) pointerFrame = requestAnimationFrame(flushPointer);
  }

  function pointerUp(event) {
    if (!pointerSession || pointerSession.id !== event.pointerId) return;
    const session = pointerSession;
    const distance = Math.hypot(event.clientX - session.startX, event.clientY - session.startY);
    if (distance < 9 && dom.touchMode.value === 'pointer') command({ type: 'pointerClick' }, false);
    pointerSession = null;
    dom.touchpad.classList.remove('active');
    if (pointerFrame) {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = null;
      flushPointer();
    }
    if (event.type !== 'pointercancel' && dom.touchMode.value === 'scroll') startScrollMomentum(session);
  }

  function bindEvents() {
    bindSectionControls();
    dom.pairForm.addEventListener('submit', pair);
    dom.showTvOverlay.addEventListener('click', () => command({ type: 'overlay', action: 'show' }, false));
    dom.hideTvOverlay.addEventListener('click', () => command({ type: 'overlay', action: 'hide' }, false));
    dom.editSitesButton.addEventListener('click', openEditor);
    dom.closeSitesButton.addEventListener('click', () => { dom.sitesEditor.hidden = true; });
    dom.sitesForm.addEventListener('submit', saveProfiles);
    dom.addProfileButton.addEventListener('click', () => {
      const id = `custom-${Date.now().toString(36)}`;
      editorProfiles.push({ id, name: 'Custom site', urls: ['https://example.com/'] });
      renderProfileEditors();
    });
    dom.textForm.addEventListener('submit', (event) => {
      event.preventDefault();
      command({ type: 'text', value: dom.textInput.value, submit: true }, false);
    });
    dom.sendTextButton.addEventListener('click', () => command({ type: 'text', value: dom.textInput.value, submit: false }, false));
    document.querySelectorAll('[data-bilibili-action]').forEach((button) => button.addEventListener('click', () => command({
      type: 'site',
      site: 'bilibili',
      action: button.dataset.bilibiliAction
    })));
    dom.applyBilibiliQuality.addEventListener('click', () => command({ type: 'site', site: 'bilibili', action: 'quality', value: dom.bilibiliQuality.value }));
    dom.applyBilibiliSpeed.addEventListener('click', () => command({ type: 'site', site: 'bilibili', action: 'speed', value: dom.bilibiliSpeed.value }));
    document.querySelectorAll('[data-focus]').forEach((button) => button.addEventListener('click', () => command({ type: 'focus', direction: button.dataset.focus }, false)));
    document.querySelectorAll('[data-history]').forEach((button) => button.addEventListener('click', () => command({ type: 'history', action: button.dataset.history }, false)));
    dom.activateButton.addEventListener('click', () => command({ type: 'activate' }, false));
    document.querySelectorAll('[data-media]').forEach((button) => button.addEventListener('click', () => command({
      type: 'media',
      action: button.dataset.media,
      value: Number(button.dataset.value || 0)
    }, false)));
    dom.refreshItems.addEventListener('click', () => command({ type: 'requestSnapshot' }, false));
    dom.refreshBilibiliResults.addEventListener('click', () => command({ type: 'requestSnapshot' }, false));
    dom.itemFilter.addEventListener('input', renderItems);
    dom.bilibiliResultFilter.addEventListener('input', () => renderBilibiliResults((state && state.page) || {}));
    dom.touchMode.addEventListener('change', () => {
      stopScrollMomentum();
      localStorage.setItem(MANUAL_MODE_KEY, dom.touchMode.value);
      updateManualMode();
    });
    dom.seekStep.addEventListener('change', () => {
      localStorage.setItem(SEEK_STEP_KEY, dom.seekStep.value);
      updateSeekStep();
    });
    dom.touchpad.addEventListener('pointerdown', pointerDown);
    dom.touchpad.addEventListener('pointermove', pointerMove);
    dom.touchpad.addEventListener('pointerup', pointerUp);
    dom.touchpad.addEventListener('pointercancel', pointerUp);
    dom.forgetButton.addEventListener('click', async () => {
      try { await api('/api/session', { method: 'DELETE' }); } catch { /* Local cleanup still proceeds. */ }
      localStorage.removeItem(TOKEN_KEY);
      token = '';
      if (socket) socket.close();
      location.reload();
    });
  }

  async function initialize() {
    cacheDom();
    restoreControlPreferences();
    bindEvents();
    const pin = new URLSearchParams(location.search).get('pin');
    if (pin) dom.pinInput.value = pin.replace(/\D/g, '').slice(0, 6);
    if (!token) {
      dom.pairView.hidden = false;
      dom.remoteView.hidden = true;
      setConnection();
      if (pin && dom.pinInput.value.length === 6) dom.pinInput.focus();
      return;
    }
    try {
      const payload = await api('/api/state');
      state = payload.state;
      serviceInfo = payload.info;
      dom.pairView.hidden = true;
      dom.remoteView.hidden = false;
      await restoreSavedConfig();
      renderState();
      connectSocket();
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      token = '';
      dom.pairView.hidden = false;
      dom.remoteView.hidden = true;
      setConnection();
    }
  }

  document.addEventListener('DOMContentLoaded', initialize, { once: true });
})();
