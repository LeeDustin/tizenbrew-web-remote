/* Web Remote TV page bridge - generated; edit src/ instead. */
"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/injected/adapters.js
  var require_adapters = __commonJS({
    "src/injected/adapters.js"(exports, module) {
      "use strict";
      var INTERACTIVE_SELECTOR = [
        "a[href]",
        "button",
        'input:not([type="hidden"])',
        "textarea",
        "select",
        '[role="button"]',
        '[role="link"]',
        '[role="menuitem"]',
        '[role="option"]',
        '[tabindex]:not([tabindex="-1"])',
        "video"
      ].join(",");
      function cleanText2(value, maximum) {
        return String(value || "").replace(/\s+/g, " ").trim().slice(0, maximum || 140);
      }
      function visible(element) {
        if (!element || typeof element.getBoundingClientRect !== "function") return false;
        const rect = element.getBoundingClientRect();
        if (rect.width < 3 || rect.height < 3) return false;
        const style = window.getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity || 1) > 0.02;
      }
      function elementLabel(element) {
        const tag = element.tagName.toLowerCase();
        const labelledBy = element.getAttribute("aria-labelledby");
        let labelledText = "";
        if (labelledBy) {
          labelledText = labelledBy.split(/\s+/).map((id) => {
            const label = document.getElementById(id);
            return label ? label.textContent : "";
          }).join(" ");
        }
        const candidates = [
          element.getAttribute("aria-label"),
          labelledText,
          element.getAttribute("title"),
          element.getAttribute("alt"),
          tag === "input" ? element.getAttribute("placeholder") : "",
          tag === "input" && !["password", "search", "text"].includes(String(element.type).toLowerCase()) ? element.value : "",
          element.textContent
        ];
        for (const candidate of candidates) {
          const label = cleanText2(candidate, 140);
          if (label) return label;
        }
        return tag === "video" ? "Video player" : tag;
      }
      function classify(element) {
        const tag = element.tagName.toLowerCase();
        const role = element.getAttribute("role");
        if (tag === "video") return "media";
        if (tag === "input" || tag === "textarea" || tag === "select" || element.isContentEditable) return "input";
        if (tag === "a" || role === "link") return "link";
        if (tag === "button" || role === "button" || role === "menuitem" || role === "option") return "button";
        return "other";
      }
      function genericDetail(element, kind) {
        if (kind === "input") return cleanText2(element.getAttribute("placeholder") || element.getAttribute("name") || "Text field", 100);
        if (kind === "link") {
          try {
            const url = new URL(element.href, window.location.href);
            return cleanText2(url.pathname === "/" ? url.hostname : url.pathname, 100);
          } catch {
            return "Link";
          }
        }
        return cleanText2(element.getAttribute("aria-description") || "", 100);
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
        try {
          element.focus();
        } catch {
        }
        try {
          element.click();
          return true;
        } catch {
          return false;
        }
      }
      function makeSiteDefinition() {
        const hostname = window.location.hostname.toLowerCase();
        if (hostname === "1shows.org" || hostname.endsWith(".1shows.org")) {
          return {
            id: "1shows",
            priority(element, kind) {
              const href = String(element.getAttribute("href") || "");
              if (kind === "input" && /search/i.test(`${element.type} ${element.name} ${element.placeholder}`)) return -1e3;
              if (kind === "link" && /\/(movie|tv|show|watch|search)/i.test(href)) return -500;
              return 0;
            }
          };
        }
        if (hostname === "cineby.at" || hostname.endsWith(".cineby.at")) {
          return {
            id: "cineby",
            priority(element, kind) {
              const href = String(element.getAttribute("href") || "");
              if (kind === "input" && /search/i.test(`${element.type} ${element.name} ${element.placeholder}`)) return -1e3;
              if (kind === "link" && /\/(movie|show|series|watch|search)/i.test(href)) return -500;
              return 0;
            }
          };
        }
        if (hostname === "bilibili.com" || hostname.endsWith(".bilibili.com")) {
          let locationPath = function() {
            if (window.location.pathname) return window.location.pathname;
            try {
              return new URL(window.location.href).pathname;
            } catch {
              return "/";
            }
          }, isSearchPage = function() {
            return hostname === "search.bilibili.com" && /^\/all(?:\/|$)/.test(locationPath());
          }, isPlaybackPage = function() {
            return /^\/(?:video\/|bangumi\/play\/|medialist\/play\/)/.test(locationPath());
          }, playerContainer = function() {
            return firstElement([
              ".bpx-player-container",
              "#bilibili-player",
              '[aria-label="\u54D4\u54E9\u54D4\u54E9\u64AD\u653E\u5668"]',
              ".player-wrap",
              ".bilibili-player",
              ".bilibili-player-video",
              ".bilibili-player-video-wrap",
              "video"
            ], false);
          }, searchResultEntries = function() {
            if (!isSearchPage()) return [];
            const cards = Array.from(document.querySelectorAll([
              ".bili-video-card",
              ".video-item.matrix",
              ".video-list-item",
              ".search-video-card"
            ].join(",")));
            const seen = /* @__PURE__ */ new Set();
            const results = [];
            for (const card of cards) {
              const link = card.querySelector([
                '.bili-video-card__info--right > a[href*="/video/"]',
                '.bili-video-card__info--tit a[href*="/video/"]',
                'a.title[href*="/video/"]',
                '.title a[href*="/video/"]',
                'a[href*="/video/"]'
              ].join(","));
              if (!link || !visible(link)) continue;
              let key = "";
              try {
                const url = new URL(link.href, window.location.href);
                const match = url.pathname.match(/\/video\/([^/]+)/i);
                key = match ? match[1].toLowerCase() : url.href;
              } catch {
                key = String(link.href || "");
              }
              if (!key || seen.has(key)) continue;
              seen.add(key);
              const titleNode = card.querySelector(".bili-video-card__info--tit,.title,h3");
              const ownerNode = card.querySelector(".bili-video-card__info--owner,.up-name,.so-icon.watch-num,.author");
              const durationNode = card.querySelector(".bili-video-card__stats__duration,.duration,.so-imgTag_rb");
              const title = cleanText2(titleNode && titleNode.textContent, 140) || elementLabel(link);
              const detail = [
                cleanText2(ownerNode && ownerNode.textContent, 70),
                cleanText2(durationNode && durationNode.textContent, 20)
              ].filter(Boolean).join(" \xB7 ");
              results.push({
                element: link,
                rect: link.getBoundingClientRect(),
                kind: "media",
                label: title,
                detail: cleanText2(detail || "Bilibili video", 100),
                group: "bilibili-search-result",
                priority: -4e3
              });
            }
            return results;
          }, activateBilibiliElement = function(element) {
            const link = element && (element.matches("a[href]") ? element : element.closest("a[href]"));
            if (!link) return false;
            try {
              const url = new URL(link.href, window.location.href);
              const targetHost = url.hostname.toLowerCase();
              if ((targetHost === "bilibili.com" || targetHost.endsWith(".bilibili.com")) && /^\/(?:video\/|bangumi\/play\/|medialist\/play\/)/.test(url.pathname)) {
                window.location.assign(url.href);
                return true;
              }
            } catch {
            }
            return false;
          }, dispatchPlayerKey = function(key, keyCode, count) {
            const target = playerContainer() || document.body || document.documentElement;
            if (!target) return false;
            for (let index = 0; index < count; index += 1) {
              for (const type of ["keydown", "keyup"]) {
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
          }, mediaAction = function(action, value) {
            const player = playerContainer();
            if (!player && !isPlaybackPage()) return false;
            if (action === "fullscreen") return toggleFillTv();
            if (action === "captions") {
              return clickElement(firstElement([
                '[aria-label*="\u5B57\u5E55"]',
                ".bpx-player-ctrl-subtitle",
                ".bilibili-player-video-btn-subtitle"
              ], false));
            }
            if (action === "toggle" || action === "play" || action === "pause") {
              const playControl = firstElement([
                '[aria-label="\u64AD\u653E/\u6682\u505C"]',
                ".bpx-player-ctrl-play",
                ".bilibili-player-video-btn-start",
                ".bilibili-player-video-state"
              ], false);
              if (!playControl) return dispatchPlayerKey("Space", 32, 1);
              const className = String(player && player.className || "");
              const paused = /bpx-state-paused|video-state-pause|state-pause/.test(className);
              const playing = /bpx-state-playing|video-state-playing|state-playing/.test(className);
              if (action === "play" && playing || action === "pause" && paused) return true;
              return clickElement(playControl);
            }
            if (action === "seekBy") {
              const amount = Number(value) || 0;
              return dispatchPlayerKey(amount < 0 ? "ArrowLeft" : "ArrowRight", amount < 0 ? 37 : 39, Math.max(1, Math.min(12, Math.ceil(Math.abs(amount) / 5))));
            }
            if (action === "volumeBy") {
              const amount = Number(value) || 0;
              return dispatchPlayerKey(amount < 0 ? "ArrowDown" : "ArrowUp", amount < 0 ? 40 : 38, Math.max(1, Math.min(10, Math.ceil(Math.abs(amount) / 0.1))));
            }
            return false;
          }, fillTvOverrideActive = function() {
            return document.documentElement.classList.contains(fillTvRootClass);
          }, builtInWebFullscreenActive = function() {
            const control = document.querySelector(".bpx-player-ctrl-web,.bilibili-player-video-btn-web-fullscreen");
            return Boolean(
              control && /bpx-state-entered|video-state-enter/.test(String(control.className || "")) || document.body.classList.contains("webscreen-fix")
            );
          }, setFillTvOverride = function(active) {
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
              window.dispatchEvent(new window.Event("resize"));
              return true;
            }
            player.setAttribute(fillTvPlayerAttribute, "true");
            let style = document.getElementById("web-remote-bilibili-fill-style");
            if (!style) {
              style = document.createElement("style");
              style.id = "web-remote-bilibili-fill-style";
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
            window.dispatchEvent(new window.Event("resize"));
            return true;
          }, toggleFillTv = function() {
            if (fillTvOverrideActive()) return setFillTvOverride(false);
            const before = builtInWebFullscreenActive();
            const control = firstElement([
              '[aria-label="\u7F51\u9875\u5168\u5C4F"]',
              ".bpx-player-ctrl-web",
              ".bilibili-player-video-btn-web-fullscreen"
            ], false);
            if (clickElement(control)) {
              setTimeout(() => {
                if (builtInWebFullscreenActive() === before && !before) setFillTvOverride(true);
              }, 140);
              return true;
            }
            return setFillTvOverride(!before);
          }, danmakuLayers = function() {
            return document.querySelectorAll(".bpx-player-render-dm-wrap,.bpx-player-row-dm-wrap,.bpx-player-bas-dm-wrap,.bpx-player-cmd-dm-wrap");
          }, clearDanmakuOverrideStyles = function() {
            for (const layer of danmakuLayers()) layer.style.removeProperty("visibility");
          }, applyDanmakuOverride = function() {
            if (typeof danmakuOverride !== "boolean") return;
            for (const layer of danmakuLayers()) {
              if (danmakuOverride) layer.style.removeProperty("visibility");
              else layer.style.setProperty("visibility", "hidden", "important");
            }
          }, nativeDanmakuState = function(input, control) {
            if (input && "checked" in input) return Boolean(input.checked);
            const ariaChecked = input && input.getAttribute("aria-checked");
            if (ariaChecked === "true" || ariaChecked === "false") return ariaChecked === "true";
            const className = String(control && control.className || "");
            if (/bui-danmaku-switch-state-1/.test(className)) return true;
            if (/bui-danmaku-switch-state-3/.test(className)) return false;
            return null;
          };
          let danmakuOverride = null;
          const fillTvRootClass = "web-remote-bilibili-fill-tv";
          const fillTvPlayerAttribute = "data-web-remote-fill-tv";
          const playerActions = {
            previous: ['[aria-label="\u4E0A\u4E00\u4E2A"]', ".bpx-player-ctrl-prev"],
            next: ['[aria-label="\u4E0B\u4E00\u4E2A"]', ".bpx-player-ctrl-next"],
            wide: ['[aria-label="\u5BBD\u5C4F"]', ".bpx-player-ctrl-wide"],
            webFullscreen: ['[aria-label="\u7F51\u9875\u5168\u5C4F"]', ".bpx-player-ctrl-web"]
          };
          return {
            id: "bilibili",
            snapshotEntries: searchResultEntries,
            activate: activateBilibiliElement,
            mediaAction,
            interactiveSelector: [
              ".header-login-entry",
              ".bpx-player-ctrl-btn",
              '[aria-label="\u5F39\u5E55\u663E\u793A\u9690\u85CF"]',
              ".bpx-player-ctrl-quality-menu-item",
              ".bpx-player-ctrl-playbackrate-menu-item"
            ].join(","),
            kind(element) {
              return element.matches('.header-login-entry,.bpx-player-ctrl-btn,[aria-label="\u5F39\u5E55\u663E\u793A\u9690\u85CF"],.bpx-player-ctrl-quality-menu-item,.bpx-player-ctrl-playbackrate-menu-item') ? "button" : null;
            },
            priority(element, kind) {
              const href = String(element.getAttribute("href") || "");
              const className = String(element.className || "");
              if (/header-login-entry|go-login-btn/.test(className)) return -3e3;
              if (element.matches(".nav-search-input")) return -2900;
              if (/bpx-player-ctrl|bpx-player-dm-switch/.test(className)) return -2500;
              if (kind === "link" && /\/(video|bangumi\/play)\//i.test(href)) return -1200;
              return 0;
            },
            preferredTextInput() {
              return firstElement([".nav-search-input", 'input[name="keyword"]', 'input[type="search"]']);
            },
            searchUrl(value) {
              const query = cleanText2(value, 200);
              return query ? `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}` : "";
            },
            siteAction(action, value) {
              if (action === "home") {
                window.location.assign("https://www.bilibili.com/");
                return true;
              }
              if (action === "login") {
                const login = firstElement([
                  ".header-login-entry",
                  ".go-login-btn .header-login-entry",
                  ".go-login-btn",
                  ".bpx-player-toast-row-jump"
                ]);
                return clickElement(login);
              }
              if (action === "danmaku") {
                const input = document.querySelector(".bui-danmaku-switch-input");
                const control = firstElement(['[aria-label="\u5F39\u5E55\u663E\u793A\u9690\u85CF"]', ".bpx-player-dm-switch"], false);
                const nativeBefore = nativeDanmakuState(input, control);
                const before = typeof danmakuOverride === "boolean" ? danmakuOverride : nativeBefore !== null ? nativeBefore : true;
                const target = !before;
                danmakuOverride = target;
                applyDanmakuOverride();
                let clicked = nativeBefore === target;
                if (!clicked) {
                  clicked = clickElement(input) || clickElement(document.querySelector(".bui-danmaku-switch-label")) || clickElement(control);
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
              if (action === "quality") {
                return clickElement(document.querySelector(`.bpx-player-ctrl-quality-menu-item[data-value="${value}"]`));
              }
              if (action === "speed") {
                return clickElement(document.querySelector(`.bpx-player-ctrl-playbackrate-menu-item[data-value="${value}"]`));
              }
              if (action === "webFullscreen") return toggleFillTv();
              return clickElement(firstElement(playerActions[action] || [], false));
            },
            siteState() {
              const login = firstElement([".header-login-entry", ".go-login-btn .header-login-entry"]);
              const account = firstElement([".header-avatar-wrap", ".header-entry-mini", ".v-avatar"], false);
              const danmaku = document.querySelector(".bui-danmaku-switch-input");
              const quality = document.querySelector(".bpx-player-ctrl-quality-menu-item.bpx-state-active") || document.querySelector(".bpx-player-ctrl-quality-result");
              const video = document.querySelector("video");
              applyDanmakuOverride();
              return {
                id: "bilibili",
                loginAvailable: Boolean(login),
                loggedIn: !login && Boolean(account),
                danmakuEnabled: typeof danmakuOverride === "boolean" ? danmakuOverride : danmaku ? Boolean(danmaku.checked) : null,
                quality: cleanText2(quality && quality.textContent, 40),
                playbackRate: video ? Number(video.playbackRate) || 1 : 1,
                playerAvailable: Boolean(playerContainer()) || isPlaybackPage(),
                searchPage: isSearchPage(),
                playbackPage: isPlaybackPage(),
                webFullscreenActive: builtInWebFullscreenActive() || fillTvOverrideActive()
              };
            }
          };
        }
        return { id: "generic", priority: () => 0 };
      }
      function createPageAdapter2() {
        const site = makeSiteDefinition();
        let elementMap = /* @__PURE__ */ new Map();
        let sequence = 0;
        function scan() {
          const selector = site.interactiveSelector ? `${INTERACTIVE_SELECTOR},${site.interactiveSelector}` : INTERACTIVE_SELECTOR;
          const specialCandidates = site.snapshotEntries ? site.snapshotEntries() : [];
          const specialElements = new Set(specialCandidates.map((entry) => entry.element));
          const candidates = specialCandidates.concat(Array.from(document.querySelectorAll(selector)).filter((element) => !specialElements.has(element)).filter((element) => !element.closest("[data-web-remote-tv]")).filter(visible).map((element) => {
            const rect = element.getBoundingClientRect();
            const kind = site.kind && site.kind(element) || classify(element);
            return {
              element,
              rect,
              kind,
              label: elementLabel(element),
              detail: genericDetail(element, kind),
              group: "",
              priority: site.priority(element, kind)
            };
          }).filter((entry) => entry.label)).sort((left, right) => {
            const leftDedicated = left.group ? 0 : 1;
            const rightDedicated = right.group ? 0 : 1;
            const leftInView = left.rect.bottom >= 0 && left.rect.top <= window.innerHeight ? 0 : 1;
            const rightInView = right.rect.bottom >= 0 && right.rect.top <= window.innerHeight ? 0 : 1;
            return leftDedicated - rightDedicated || leftInView - rightInView || left.priority - right.priority || left.rect.top - right.rect.top || left.rect.left - right.rect.left;
          }).slice(0, 150);
          elementMap = /* @__PURE__ */ new Map();
          sequence += 1;
          return candidates.map((entry, index) => {
            const id = `wr-${sequence.toString(36)}-${index.toString(36)}`;
            elementMap.set(id, entry.element);
            return {
              id,
              kind: entry.kind,
              label: entry.label,
              detail: entry.detail,
              group: entry.group || "",
              selected: entry.element === document.activeElement || entry.element.getAttribute("aria-current") === "page"
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
            try {
              element.focus();
            } catch {
            }
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
            const allowed = direction === "left" ? dx < -2 : direction === "right" ? dx > 2 : direction === "up" ? dy < -2 : dy > 2;
            if (!allowed) continue;
            const primary = direction === "left" || direction === "right" ? Math.abs(dx) : Math.abs(dy);
            const secondary = direction === "left" || direction === "right" ? Math.abs(dy) : Math.abs(dx);
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
          if (active && (active.matches("input, textarea") || active.isContentEditable)) return active;
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
      module.exports = { createPageAdapter: createPageAdapter2, cleanText: cleanText2 };
    }
  });

  // src/injected/qr.js
  var require_qr = __commonJS({
    "src/injected/qr.js"(exports, module) {
      "use strict";
      function createQrCanvas2(document2, qrcode2, value) {
        if (!document2 || typeof document2.createElement !== "function") throw new Error("QR rendering requires a document.");
        if (typeof qrcode2 !== "function") throw new Error("QR generator is unavailable.");
        const code = qrcode2(0, "L");
        code.addData(String(value || ""));
        code.make();
        const moduleCount = code.getModuleCount();
        const quietZone = 4;
        const cellSize = Math.max(2, Math.floor(148 / (moduleCount + quietZone * 2)));
        const dimension = (moduleCount + quietZone * 2) * cellSize;
        const canvas = document2.createElement("canvas");
        canvas.width = dimension;
        canvas.height = dimension;
        canvas.setAttribute("aria-hidden", "true");
        canvas.style.width = `${dimension}px`;
        canvas.style.height = `${dimension}px`;
        const context = canvas.getContext && canvas.getContext("2d");
        if (!context) throw new Error("Canvas rendering is unavailable.");
        context.imageSmoothingEnabled = false;
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, dimension, dimension);
        context.fillStyle = "#000000";
        for (let row = 0; row < moduleCount; row += 1) {
          for (let column = 0; column < moduleCount; column += 1) {
            if (!code.isDark(row, column)) continue;
            context.fillRect(
              (column + quietZone) * cellSize,
              (row + quietZone) * cellSize,
              cellSize,
              cellSize
            );
          }
        }
        return canvas;
      }
      module.exports = { createQrCanvas: createQrCanvas2 };
    }
  });

  // src/injected/recovery.js
  var require_recovery = __commonJS({
    "src/injected/recovery.js"(exports, module) {
      "use strict";
      var PAIRING_SEQUENCE = ["up", "up", "down", "down", "ok"];
      function remoteKey(event) {
        const code = Number(event && (event.keyCode || event.which));
        if (code === 38) return "up";
        if (code === 40) return "down";
        if (code === 13) return "ok";
        if (code === 403) return "recover";
        const key = String(event && (event.key || event.keyName) || "").toLowerCase();
        if (key === "arrowup" || key === "up") return "up";
        if (key === "arrowdown" || key === "down") return "down";
        if (key === "enter" || key === "ok" || key === "done") return "ok";
        if (key === "colorf0red" || key === "red") return "recover";
        return "";
      }
      function createPairingShortcut2(onComplete, options) {
        const settings = options || {};
        const now = typeof settings.now === "function" ? settings.now : Date.now;
        const maximumGap = Number(settings.maximumGap) || 2500;
        let index = 0;
        let lastAt = 0;
        return function pairingShortcut(event) {
          if (!event || event.repeat) return false;
          const key = remoteKey(event);
          const currentTime = now();
          if (!key || lastAt && currentTime - lastAt > maximumGap) index = 0;
          lastAt = currentTime;
          if (!key) return false;
          if (key === "recover") index = PAIRING_SEQUENCE.length;
          else if (key === PAIRING_SEQUENCE[index]) index += 1;
          else index = key === PAIRING_SEQUENCE[0] ? 1 : 0;
          if (index < PAIRING_SEQUENCE.length) return false;
          index = 0;
          lastAt = 0;
          if (typeof event.preventDefault === "function") event.preventDefault();
          if (typeof event.stopPropagation === "function") event.stopPropagation();
          if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
          onComplete();
          return true;
        };
      }
      module.exports = { PAIRING_SEQUENCE, createPairingShortcut: createPairingShortcut2, remoteKey };
    }
  });

  // node_modules/.pnpm/qrcode-generator@1.4.4/node_modules/qrcode-generator/qrcode.js
  var require_qrcode = __commonJS({
    "node_modules/.pnpm/qrcode-generator@1.4.4/node_modules/qrcode-generator/qrcode.js"(exports, module) {
      var qrcode2 = (function() {
        var qrcode3 = function(typeNumber, errorCorrectionLevel) {
          var PAD0 = 236;
          var PAD1 = 17;
          var _typeNumber = typeNumber;
          var _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
          var _modules = null;
          var _moduleCount = 0;
          var _dataCache = null;
          var _dataList = [];
          var _this = {};
          var makeImpl = function(test, maskPattern) {
            _moduleCount = _typeNumber * 4 + 17;
            _modules = (function(moduleCount) {
              var modules = new Array(moduleCount);
              for (var row = 0; row < moduleCount; row += 1) {
                modules[row] = new Array(moduleCount);
                for (var col = 0; col < moduleCount; col += 1) {
                  modules[row][col] = null;
                }
              }
              return modules;
            })(_moduleCount);
            setupPositionProbePattern(0, 0);
            setupPositionProbePattern(_moduleCount - 7, 0);
            setupPositionProbePattern(0, _moduleCount - 7);
            setupPositionAdjustPattern();
            setupTimingPattern();
            setupTypeInfo(test, maskPattern);
            if (_typeNumber >= 7) {
              setupTypeNumber(test);
            }
            if (_dataCache == null) {
              _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
            }
            mapData(_dataCache, maskPattern);
          };
          var setupPositionProbePattern = function(row, col) {
            for (var r = -1; r <= 7; r += 1) {
              if (row + r <= -1 || _moduleCount <= row + r) continue;
              for (var c = -1; c <= 7; c += 1) {
                if (col + c <= -1 || _moduleCount <= col + c) continue;
                if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
                  _modules[row + r][col + c] = true;
                } else {
                  _modules[row + r][col + c] = false;
                }
              }
            }
          };
          var getBestMaskPattern = function() {
            var minLostPoint = 0;
            var pattern = 0;
            for (var i = 0; i < 8; i += 1) {
              makeImpl(true, i);
              var lostPoint = QRUtil.getLostPoint(_this);
              if (i == 0 || minLostPoint > lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
              }
            }
            return pattern;
          };
          var setupTimingPattern = function() {
            for (var r = 8; r < _moduleCount - 8; r += 1) {
              if (_modules[r][6] != null) {
                continue;
              }
              _modules[r][6] = r % 2 == 0;
            }
            for (var c = 8; c < _moduleCount - 8; c += 1) {
              if (_modules[6][c] != null) {
                continue;
              }
              _modules[6][c] = c % 2 == 0;
            }
          };
          var setupPositionAdjustPattern = function() {
            var pos = QRUtil.getPatternPosition(_typeNumber);
            for (var i = 0; i < pos.length; i += 1) {
              for (var j = 0; j < pos.length; j += 1) {
                var row = pos[i];
                var col = pos[j];
                if (_modules[row][col] != null) {
                  continue;
                }
                for (var r = -2; r <= 2; r += 1) {
                  for (var c = -2; c <= 2; c += 1) {
                    if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                      _modules[row + r][col + c] = true;
                    } else {
                      _modules[row + r][col + c] = false;
                    }
                  }
                }
              }
            }
          };
          var setupTypeNumber = function(test) {
            var bits = QRUtil.getBCHTypeNumber(_typeNumber);
            for (var i = 0; i < 18; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
            }
            for (var i = 0; i < 18; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
            }
          };
          var setupTypeInfo = function(test, maskPattern) {
            var data = _errorCorrectionLevel << 3 | maskPattern;
            var bits = QRUtil.getBCHTypeInfo(data);
            for (var i = 0; i < 15; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              if (i < 6) {
                _modules[i][8] = mod;
              } else if (i < 8) {
                _modules[i + 1][8] = mod;
              } else {
                _modules[_moduleCount - 15 + i][8] = mod;
              }
            }
            for (var i = 0; i < 15; i += 1) {
              var mod = !test && (bits >> i & 1) == 1;
              if (i < 8) {
                _modules[8][_moduleCount - i - 1] = mod;
              } else if (i < 9) {
                _modules[8][15 - i - 1 + 1] = mod;
              } else {
                _modules[8][15 - i - 1] = mod;
              }
            }
            _modules[_moduleCount - 8][8] = !test;
          };
          var mapData = function(data, maskPattern) {
            var inc = -1;
            var row = _moduleCount - 1;
            var bitIndex = 7;
            var byteIndex = 0;
            var maskFunc = QRUtil.getMaskFunction(maskPattern);
            for (var col = _moduleCount - 1; col > 0; col -= 2) {
              if (col == 6) col -= 1;
              while (true) {
                for (var c = 0; c < 2; c += 1) {
                  if (_modules[row][col - c] == null) {
                    var dark = false;
                    if (byteIndex < data.length) {
                      dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                    }
                    var mask = maskFunc(row, col - c);
                    if (mask) {
                      dark = !dark;
                    }
                    _modules[row][col - c] = dark;
                    bitIndex -= 1;
                    if (bitIndex == -1) {
                      byteIndex += 1;
                      bitIndex = 7;
                    }
                  }
                }
                row += inc;
                if (row < 0 || _moduleCount <= row) {
                  row -= inc;
                  inc = -inc;
                  break;
                }
              }
            }
          };
          var createBytes = function(buffer, rsBlocks) {
            var offset = 0;
            var maxDcCount = 0;
            var maxEcCount = 0;
            var dcdata = new Array(rsBlocks.length);
            var ecdata = new Array(rsBlocks.length);
            for (var r = 0; r < rsBlocks.length; r += 1) {
              var dcCount = rsBlocks[r].dataCount;
              var ecCount = rsBlocks[r].totalCount - dcCount;
              maxDcCount = Math.max(maxDcCount, dcCount);
              maxEcCount = Math.max(maxEcCount, ecCount);
              dcdata[r] = new Array(dcCount);
              for (var i = 0; i < dcdata[r].length; i += 1) {
                dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
              }
              offset += dcCount;
              var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
              var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
              var modPoly = rawPoly.mod(rsPoly);
              ecdata[r] = new Array(rsPoly.getLength() - 1);
              for (var i = 0; i < ecdata[r].length; i += 1) {
                var modIndex = i + modPoly.getLength() - ecdata[r].length;
                ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
              }
            }
            var totalCodeCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) {
              totalCodeCount += rsBlocks[i].totalCount;
            }
            var data = new Array(totalCodeCount);
            var index = 0;
            for (var i = 0; i < maxDcCount; i += 1) {
              for (var r = 0; r < rsBlocks.length; r += 1) {
                if (i < dcdata[r].length) {
                  data[index] = dcdata[r][i];
                  index += 1;
                }
              }
            }
            for (var i = 0; i < maxEcCount; i += 1) {
              for (var r = 0; r < rsBlocks.length; r += 1) {
                if (i < ecdata[r].length) {
                  data[index] = ecdata[r][i];
                  index += 1;
                }
              }
            }
            return data;
          };
          var createData = function(typeNumber2, errorCorrectionLevel2, dataList) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
            var buffer = qrBitBuffer();
            for (var i = 0; i < dataList.length; i += 1) {
              var data = dataList[i];
              buffer.put(data.getMode(), 4);
              buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
              data.write(buffer);
            }
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) {
              totalDataCount += rsBlocks[i].dataCount;
            }
            if (buffer.getLengthInBits() > totalDataCount * 8) {
              throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
            }
            if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
              buffer.put(0, 4);
            }
            while (buffer.getLengthInBits() % 8 != 0) {
              buffer.putBit(false);
            }
            while (true) {
              if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
              }
              buffer.put(PAD0, 8);
              if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
              }
              buffer.put(PAD1, 8);
            }
            return createBytes(buffer, rsBlocks);
          };
          _this.addData = function(data, mode) {
            mode = mode || "Byte";
            var newData = null;
            switch (mode) {
              case "Numeric":
                newData = qrNumber(data);
                break;
              case "Alphanumeric":
                newData = qrAlphaNum(data);
                break;
              case "Byte":
                newData = qr8BitByte(data);
                break;
              case "Kanji":
                newData = qrKanji(data);
                break;
              default:
                throw "mode:" + mode;
            }
            _dataList.push(newData);
            _dataCache = null;
          };
          _this.isDark = function(row, col) {
            if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
              throw row + "," + col;
            }
            return _modules[row][col];
          };
          _this.getModuleCount = function() {
            return _moduleCount;
          };
          _this.make = function() {
            if (_typeNumber < 1) {
              var typeNumber2 = 1;
              for (; typeNumber2 < 40; typeNumber2++) {
                var rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
                var buffer = qrBitBuffer();
                for (var i = 0; i < _dataList.length; i++) {
                  var data = _dataList[i];
                  buffer.put(data.getMode(), 4);
                  buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
                  data.write(buffer);
                }
                var totalDataCount = 0;
                for (var i = 0; i < rsBlocks.length; i++) {
                  totalDataCount += rsBlocks[i].dataCount;
                }
                if (buffer.getLengthInBits() <= totalDataCount * 8) {
                  break;
                }
              }
              _typeNumber = typeNumber2;
            }
            makeImpl(false, getBestMaskPattern());
          };
          _this.createTableTag = function(cellSize, margin) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var qrHtml = "";
            qrHtml += '<table style="';
            qrHtml += " border-width: 0px; border-style: none;";
            qrHtml += " border-collapse: collapse;";
            qrHtml += " padding: 0px; margin: " + margin + "px;";
            qrHtml += '">';
            qrHtml += "<tbody>";
            for (var r = 0; r < _this.getModuleCount(); r += 1) {
              qrHtml += "<tr>";
              for (var c = 0; c < _this.getModuleCount(); c += 1) {
                qrHtml += '<td style="';
                qrHtml += " border-width: 0px; border-style: none;";
                qrHtml += " border-collapse: collapse;";
                qrHtml += " padding: 0px; margin: 0px;";
                qrHtml += " width: " + cellSize + "px;";
                qrHtml += " height: " + cellSize + "px;";
                qrHtml += " background-color: ";
                qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
                qrHtml += ";";
                qrHtml += '"/>';
              }
              qrHtml += "</tr>";
            }
            qrHtml += "</tbody>";
            qrHtml += "</table>";
            return qrHtml;
          };
          _this.createSvgTag = function(cellSize, margin, alt, title) {
            var opts = {};
            if (typeof arguments[0] == "object") {
              opts = arguments[0];
              cellSize = opts.cellSize;
              margin = opts.margin;
              alt = opts.alt;
              title = opts.title;
            }
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            alt = typeof alt === "string" ? { text: alt } : alt || {};
            alt.text = alt.text || null;
            alt.id = alt.text ? alt.id || "qrcode-description" : null;
            title = typeof title === "string" ? { text: title } : title || {};
            title.text = title.text || null;
            title.id = title.text ? title.id || "qrcode-title" : null;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var c, mc, r, mr, qrSvg = "", rect;
            rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
            qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
            qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
            qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
            qrSvg += ' preserveAspectRatio="xMinYMin meet"';
            qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
            qrSvg += ">";
            qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
            qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
            qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
            qrSvg += '<path d="';
            for (r = 0; r < _this.getModuleCount(); r += 1) {
              mr = r * cellSize + margin;
              for (c = 0; c < _this.getModuleCount(); c += 1) {
                if (_this.isDark(r, c)) {
                  mc = c * cellSize + margin;
                  qrSvg += "M" + mc + "," + mr + rect;
                }
              }
            }
            qrSvg += '" stroke="transparent" fill="black"/>';
            qrSvg += "</svg>";
            return qrSvg;
          };
          _this.createDataURL = function(cellSize, margin) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            return createDataURL(size, size, function(x, y) {
              if (min <= x && x < max && min <= y && y < max) {
                var c = Math.floor((x - min) / cellSize);
                var r = Math.floor((y - min) / cellSize);
                return _this.isDark(r, c) ? 0 : 1;
              } else {
                return 1;
              }
            });
          };
          _this.createImgTag = function(cellSize, margin, alt) {
            cellSize = cellSize || 2;
            margin = typeof margin == "undefined" ? cellSize * 4 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var img = "";
            img += "<img";
            img += ' src="';
            img += _this.createDataURL(cellSize, margin);
            img += '"';
            img += ' width="';
            img += size;
            img += '"';
            img += ' height="';
            img += size;
            img += '"';
            if (alt) {
              img += ' alt="';
              img += escapeXml(alt);
              img += '"';
            }
            img += "/>";
            return img;
          };
          var escapeXml = function(s) {
            var escaped = "";
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charAt(i);
              switch (c) {
                case "<":
                  escaped += "&lt;";
                  break;
                case ">":
                  escaped += "&gt;";
                  break;
                case "&":
                  escaped += "&amp;";
                  break;
                case '"':
                  escaped += "&quot;";
                  break;
                default:
                  escaped += c;
                  break;
              }
            }
            return escaped;
          };
          var _createHalfASCII = function(margin) {
            var cellSize = 1;
            margin = typeof margin == "undefined" ? cellSize * 2 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            var y, x, r1, r2, p;
            var blocks = {
              "\u2588\u2588": "\u2588",
              "\u2588 ": "\u2580",
              " \u2588": "\u2584",
              "  ": " "
            };
            var blocksLastLineNoMargin = {
              "\u2588\u2588": "\u2580",
              "\u2588 ": "\u2580",
              " \u2588": " ",
              "  ": " "
            };
            var ascii = "";
            for (y = 0; y < size; y += 2) {
              r1 = Math.floor((y - min) / cellSize);
              r2 = Math.floor((y + 1 - min) / cellSize);
              for (x = 0; x < size; x += 1) {
                p = "\u2588";
                if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
                  p = " ";
                }
                if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
                  p += " ";
                } else {
                  p += "\u2588";
                }
                ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
              }
              ascii += "\n";
            }
            if (size % 2 && margin > 0) {
              return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("\u2580");
            }
            return ascii.substring(0, ascii.length - 1);
          };
          _this.createASCII = function(cellSize, margin) {
            cellSize = cellSize || 1;
            if (cellSize < 2) {
              return _createHalfASCII(margin);
            }
            cellSize -= 1;
            margin = typeof margin == "undefined" ? cellSize * 2 : margin;
            var size = _this.getModuleCount() * cellSize + margin * 2;
            var min = margin;
            var max = size - margin;
            var y, x, r, p;
            var white = Array(cellSize + 1).join("\u2588\u2588");
            var black = Array(cellSize + 1).join("  ");
            var ascii = "";
            var line = "";
            for (y = 0; y < size; y += 1) {
              r = Math.floor((y - min) / cellSize);
              line = "";
              for (x = 0; x < size; x += 1) {
                p = 1;
                if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
                  p = 0;
                }
                line += p ? white : black;
              }
              for (r = 0; r < cellSize; r += 1) {
                ascii += line + "\n";
              }
            }
            return ascii.substring(0, ascii.length - 1);
          };
          _this.renderTo2dContext = function(context, cellSize) {
            cellSize = cellSize || 2;
            var length = _this.getModuleCount();
            for (var row = 0; row < length; row++) {
              for (var col = 0; col < length; col++) {
                context.fillStyle = _this.isDark(row, col) ? "black" : "white";
                context.fillRect(row * cellSize, col * cellSize, cellSize, cellSize);
              }
            }
          };
          return _this;
        };
        qrcode3.stringToBytesFuncs = {
          "default": function(s) {
            var bytes = [];
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charCodeAt(i);
              bytes.push(c & 255);
            }
            return bytes;
          }
        };
        qrcode3.stringToBytes = qrcode3.stringToBytesFuncs["default"];
        qrcode3.createStringToBytes = function(unicodeData, numChars) {
          var unicodeMap = (function() {
            var bin = base64DecodeInputStream(unicodeData);
            var read = function() {
              var b = bin.read();
              if (b == -1) throw "eof";
              return b;
            };
            var count = 0;
            var unicodeMap2 = {};
            while (true) {
              var b0 = bin.read();
              if (b0 == -1) break;
              var b1 = read();
              var b2 = read();
              var b3 = read();
              var k = String.fromCharCode(b0 << 8 | b1);
              var v = b2 << 8 | b3;
              unicodeMap2[k] = v;
              count += 1;
            }
            if (count != numChars) {
              throw count + " != " + numChars;
            }
            return unicodeMap2;
          })();
          var unknownChar = "?".charCodeAt(0);
          return function(s) {
            var bytes = [];
            for (var i = 0; i < s.length; i += 1) {
              var c = s.charCodeAt(i);
              if (c < 128) {
                bytes.push(c);
              } else {
                var b = unicodeMap[s.charAt(i)];
                if (typeof b == "number") {
                  if ((b & 255) == b) {
                    bytes.push(b);
                  } else {
                    bytes.push(b >>> 8);
                    bytes.push(b & 255);
                  }
                } else {
                  bytes.push(unknownChar);
                }
              }
            }
            return bytes;
          };
        };
        var QRMode = {
          MODE_NUMBER: 1 << 0,
          MODE_ALPHA_NUM: 1 << 1,
          MODE_8BIT_BYTE: 1 << 2,
          MODE_KANJI: 1 << 3
        };
        var QRErrorCorrectionLevel = {
          L: 1,
          M: 0,
          Q: 3,
          H: 2
        };
        var QRMaskPattern = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7
        };
        var QRUtil = (function() {
          var PATTERN_POSITION_TABLE = [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50],
            [6, 30, 54],
            [6, 32, 58],
            [6, 34, 62],
            [6, 26, 46, 66],
            [6, 26, 48, 70],
            [6, 26, 50, 74],
            [6, 30, 54, 78],
            [6, 30, 56, 82],
            [6, 30, 58, 86],
            [6, 34, 62, 90],
            [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98],
            [6, 30, 54, 78, 102],
            [6, 28, 54, 80, 106],
            [6, 32, 58, 84, 110],
            [6, 30, 58, 86, 114],
            [6, 34, 62, 90, 118],
            [6, 26, 50, 74, 98, 122],
            [6, 30, 54, 78, 102, 126],
            [6, 26, 52, 78, 104, 130],
            [6, 30, 56, 82, 108, 134],
            [6, 34, 60, 86, 112, 138],
            [6, 30, 58, 86, 114, 142],
            [6, 34, 62, 90, 118, 146],
            [6, 30, 54, 78, 102, 126, 150],
            [6, 24, 50, 76, 102, 128, 154],
            [6, 28, 54, 80, 106, 132, 158],
            [6, 32, 58, 84, 110, 136, 162],
            [6, 26, 54, 82, 110, 138, 166],
            [6, 30, 58, 86, 114, 142, 170]
          ];
          var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
          var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
          var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
          var _this = {};
          var getBCHDigit = function(data) {
            var digit = 0;
            while (data != 0) {
              digit += 1;
              data >>>= 1;
            }
            return digit;
          };
          _this.getBCHTypeInfo = function(data) {
            var d = data << 10;
            while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
              d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
            }
            return (data << 10 | d) ^ G15_MASK;
          };
          _this.getBCHTypeNumber = function(data) {
            var d = data << 12;
            while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
              d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
            }
            return data << 12 | d;
          };
          _this.getPatternPosition = function(typeNumber) {
            return PATTERN_POSITION_TABLE[typeNumber - 1];
          };
          _this.getMaskFunction = function(maskPattern) {
            switch (maskPattern) {
              case QRMaskPattern.PATTERN000:
                return function(i, j) {
                  return (i + j) % 2 == 0;
                };
              case QRMaskPattern.PATTERN001:
                return function(i, j) {
                  return i % 2 == 0;
                };
              case QRMaskPattern.PATTERN010:
                return function(i, j) {
                  return j % 3 == 0;
                };
              case QRMaskPattern.PATTERN011:
                return function(i, j) {
                  return (i + j) % 3 == 0;
                };
              case QRMaskPattern.PATTERN100:
                return function(i, j) {
                  return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                };
              case QRMaskPattern.PATTERN101:
                return function(i, j) {
                  return i * j % 2 + i * j % 3 == 0;
                };
              case QRMaskPattern.PATTERN110:
                return function(i, j) {
                  return (i * j % 2 + i * j % 3) % 2 == 0;
                };
              case QRMaskPattern.PATTERN111:
                return function(i, j) {
                  return (i * j % 3 + (i + j) % 2) % 2 == 0;
                };
              default:
                throw "bad maskPattern:" + maskPattern;
            }
          };
          _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
            var a = qrPolynomial([1], 0);
            for (var i = 0; i < errorCorrectLength; i += 1) {
              a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
            }
            return a;
          };
          _this.getLengthInBits = function(mode, type) {
            if (1 <= type && type < 10) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 10;
                case QRMode.MODE_ALPHA_NUM:
                  return 9;
                case QRMode.MODE_8BIT_BYTE:
                  return 8;
                case QRMode.MODE_KANJI:
                  return 8;
                default:
                  throw "mode:" + mode;
              }
            } else if (type < 27) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 12;
                case QRMode.MODE_ALPHA_NUM:
                  return 11;
                case QRMode.MODE_8BIT_BYTE:
                  return 16;
                case QRMode.MODE_KANJI:
                  return 10;
                default:
                  throw "mode:" + mode;
              }
            } else if (type < 41) {
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 14;
                case QRMode.MODE_ALPHA_NUM:
                  return 13;
                case QRMode.MODE_8BIT_BYTE:
                  return 16;
                case QRMode.MODE_KANJI:
                  return 12;
                default:
                  throw "mode:" + mode;
              }
            } else {
              throw "type:" + type;
            }
          };
          _this.getLostPoint = function(qrcode4) {
            var moduleCount = qrcode4.getModuleCount();
            var lostPoint = 0;
            for (var row = 0; row < moduleCount; row += 1) {
              for (var col = 0; col < moduleCount; col += 1) {
                var sameCount = 0;
                var dark = qrcode4.isDark(row, col);
                for (var r = -1; r <= 1; r += 1) {
                  if (row + r < 0 || moduleCount <= row + r) {
                    continue;
                  }
                  for (var c = -1; c <= 1; c += 1) {
                    if (col + c < 0 || moduleCount <= col + c) {
                      continue;
                    }
                    if (r == 0 && c == 0) {
                      continue;
                    }
                    if (dark == qrcode4.isDark(row + r, col + c)) {
                      sameCount += 1;
                    }
                  }
                }
                if (sameCount > 5) {
                  lostPoint += 3 + sameCount - 5;
                }
              }
            }
            ;
            for (var row = 0; row < moduleCount - 1; row += 1) {
              for (var col = 0; col < moduleCount - 1; col += 1) {
                var count = 0;
                if (qrcode4.isDark(row, col)) count += 1;
                if (qrcode4.isDark(row + 1, col)) count += 1;
                if (qrcode4.isDark(row, col + 1)) count += 1;
                if (qrcode4.isDark(row + 1, col + 1)) count += 1;
                if (count == 0 || count == 4) {
                  lostPoint += 3;
                }
              }
            }
            for (var row = 0; row < moduleCount; row += 1) {
              for (var col = 0; col < moduleCount - 6; col += 1) {
                if (qrcode4.isDark(row, col) && !qrcode4.isDark(row, col + 1) && qrcode4.isDark(row, col + 2) && qrcode4.isDark(row, col + 3) && qrcode4.isDark(row, col + 4) && !qrcode4.isDark(row, col + 5) && qrcode4.isDark(row, col + 6)) {
                  lostPoint += 40;
                }
              }
            }
            for (var col = 0; col < moduleCount; col += 1) {
              for (var row = 0; row < moduleCount - 6; row += 1) {
                if (qrcode4.isDark(row, col) && !qrcode4.isDark(row + 1, col) && qrcode4.isDark(row + 2, col) && qrcode4.isDark(row + 3, col) && qrcode4.isDark(row + 4, col) && !qrcode4.isDark(row + 5, col) && qrcode4.isDark(row + 6, col)) {
                  lostPoint += 40;
                }
              }
            }
            var darkCount = 0;
            for (var col = 0; col < moduleCount; col += 1) {
              for (var row = 0; row < moduleCount; row += 1) {
                if (qrcode4.isDark(row, col)) {
                  darkCount += 1;
                }
              }
            }
            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
            lostPoint += ratio * 10;
            return lostPoint;
          };
          return _this;
        })();
        var QRMath = (function() {
          var EXP_TABLE = new Array(256);
          var LOG_TABLE = new Array(256);
          for (var i = 0; i < 8; i += 1) {
            EXP_TABLE[i] = 1 << i;
          }
          for (var i = 8; i < 256; i += 1) {
            EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
          }
          for (var i = 0; i < 255; i += 1) {
            LOG_TABLE[EXP_TABLE[i]] = i;
          }
          var _this = {};
          _this.glog = function(n) {
            if (n < 1) {
              throw "glog(" + n + ")";
            }
            return LOG_TABLE[n];
          };
          _this.gexp = function(n) {
            while (n < 0) {
              n += 255;
            }
            while (n >= 256) {
              n -= 255;
            }
            return EXP_TABLE[n];
          };
          return _this;
        })();
        function qrPolynomial(num, shift) {
          if (typeof num.length == "undefined") {
            throw num.length + "/" + shift;
          }
          var _num = (function() {
            var offset = 0;
            while (offset < num.length && num[offset] == 0) {
              offset += 1;
            }
            var _num2 = new Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i += 1) {
              _num2[i] = num[i + offset];
            }
            return _num2;
          })();
          var _this = {};
          _this.getAt = function(index) {
            return _num[index];
          };
          _this.getLength = function() {
            return _num.length;
          };
          _this.multiply = function(e) {
            var num2 = new Array(_this.getLength() + e.getLength() - 1);
            for (var i = 0; i < _this.getLength(); i += 1) {
              for (var j = 0; j < e.getLength(); j += 1) {
                num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
              }
            }
            return qrPolynomial(num2, 0);
          };
          _this.mod = function(e) {
            if (_this.getLength() - e.getLength() < 0) {
              return _this;
            }
            var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
            var num2 = new Array(_this.getLength());
            for (var i = 0; i < _this.getLength(); i += 1) {
              num2[i] = _this.getAt(i);
            }
            for (var i = 0; i < e.getLength(); i += 1) {
              num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
            }
            return qrPolynomial(num2, 0).mod(e);
          };
          return _this;
        }
        ;
        var QRRSBlock = (function() {
          var RS_BLOCK_TABLE = [
            // L
            // M
            // Q
            // H
            // 1
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            // 2
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            // 3
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            // 4
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            // 5
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            // 6
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            // 7
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            // 8
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            // 9
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            // 10
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            // 11
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            // 12
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            // 13
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            // 14
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            // 15
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12, 7, 37, 13],
            // 16
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            // 17
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            // 18
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            // 19
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            // 20
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            // 21
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            // 22
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            // 23
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            // 24
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            // 25
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            // 26
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            // 27
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            // 28
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            // 29
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            // 30
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            // 31
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            // 32
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            // 33
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            // 34
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            // 35
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            // 36
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            // 37
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            // 38
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            // 39
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            // 40
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
          ];
          var qrRSBlock = function(totalCount, dataCount) {
            var _this2 = {};
            _this2.totalCount = totalCount;
            _this2.dataCount = dataCount;
            return _this2;
          };
          var _this = {};
          var getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
            switch (errorCorrectionLevel) {
              case QRErrorCorrectionLevel.L:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
              case QRErrorCorrectionLevel.M:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
              case QRErrorCorrectionLevel.Q:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
              case QRErrorCorrectionLevel.H:
                return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
              default:
                return void 0;
            }
          };
          _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
            var rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
            if (typeof rsBlock == "undefined") {
              throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
            }
            var length = rsBlock.length / 3;
            var list = [];
            for (var i = 0; i < length; i += 1) {
              var count = rsBlock[i * 3 + 0];
              var totalCount = rsBlock[i * 3 + 1];
              var dataCount = rsBlock[i * 3 + 2];
              for (var j = 0; j < count; j += 1) {
                list.push(qrRSBlock(totalCount, dataCount));
              }
            }
            return list;
          };
          return _this;
        })();
        var qrBitBuffer = function() {
          var _buffer = [];
          var _length = 0;
          var _this = {};
          _this.getBuffer = function() {
            return _buffer;
          };
          _this.getAt = function(index) {
            var bufIndex = Math.floor(index / 8);
            return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
          };
          _this.put = function(num, length) {
            for (var i = 0; i < length; i += 1) {
              _this.putBit((num >>> length - i - 1 & 1) == 1);
            }
          };
          _this.getLengthInBits = function() {
            return _length;
          };
          _this.putBit = function(bit) {
            var bufIndex = Math.floor(_length / 8);
            if (_buffer.length <= bufIndex) {
              _buffer.push(0);
            }
            if (bit) {
              _buffer[bufIndex] |= 128 >>> _length % 8;
            }
            _length += 1;
          };
          return _this;
        };
        var qrNumber = function(data) {
          var _mode = QRMode.MODE_NUMBER;
          var _data = data;
          var _this = {};
          _this.getMode = function() {
            return _mode;
          };
          _this.getLength = function(buffer) {
            return _data.length;
          };
          _this.write = function(buffer) {
            var data2 = _data;
            var i = 0;
            while (i + 2 < data2.length) {
              buffer.put(strToNum(data2.substring(i, i + 3)), 10);
              i += 3;
            }
            if (i < data2.length) {
              if (data2.length - i == 1) {
                buffer.put(strToNum(data2.substring(i, i + 1)), 4);
              } else if (data2.length - i == 2) {
                buffer.put(strToNum(data2.substring(i, i + 2)), 7);
              }
            }
          };
          var strToNum = function(s) {
            var num = 0;
            for (var i = 0; i < s.length; i += 1) {
              num = num * 10 + chatToNum(s.charAt(i));
            }
            return num;
          };
          var chatToNum = function(c) {
            if ("0" <= c && c <= "9") {
              return c.charCodeAt(0) - "0".charCodeAt(0);
            }
            throw "illegal char :" + c;
          };
          return _this;
        };
        var qrAlphaNum = function(data) {
          var _mode = QRMode.MODE_ALPHA_NUM;
          var _data = data;
          var _this = {};
          _this.getMode = function() {
            return _mode;
          };
          _this.getLength = function(buffer) {
            return _data.length;
          };
          _this.write = function(buffer) {
            var s = _data;
            var i = 0;
            while (i + 1 < s.length) {
              buffer.put(
                getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)),
                11
              );
              i += 2;
            }
            if (i < s.length) {
              buffer.put(getCode(s.charAt(i)), 6);
            }
          };
          var getCode = function(c) {
            if ("0" <= c && c <= "9") {
              return c.charCodeAt(0) - "0".charCodeAt(0);
            } else if ("A" <= c && c <= "Z") {
              return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
            } else {
              switch (c) {
                case " ":
                  return 36;
                case "$":
                  return 37;
                case "%":
                  return 38;
                case "*":
                  return 39;
                case "+":
                  return 40;
                case "-":
                  return 41;
                case ".":
                  return 42;
                case "/":
                  return 43;
                case ":":
                  return 44;
                default:
                  throw "illegal char :" + c;
              }
            }
          };
          return _this;
        };
        var qr8BitByte = function(data) {
          var _mode = QRMode.MODE_8BIT_BYTE;
          var _data = data;
          var _bytes = qrcode3.stringToBytes(data);
          var _this = {};
          _this.getMode = function() {
            return _mode;
          };
          _this.getLength = function(buffer) {
            return _bytes.length;
          };
          _this.write = function(buffer) {
            for (var i = 0; i < _bytes.length; i += 1) {
              buffer.put(_bytes[i], 8);
            }
          };
          return _this;
        };
        var qrKanji = function(data) {
          var _mode = QRMode.MODE_KANJI;
          var _data = data;
          var stringToBytes = qrcode3.stringToBytesFuncs["SJIS"];
          if (!stringToBytes) {
            throw "sjis not supported.";
          }
          !(function(c, code) {
            var test = stringToBytes(c);
            if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
              throw "sjis not supported.";
            }
          })("\u53CB", 38726);
          var _bytes = stringToBytes(data);
          var _this = {};
          _this.getMode = function() {
            return _mode;
          };
          _this.getLength = function(buffer) {
            return ~~(_bytes.length / 2);
          };
          _this.write = function(buffer) {
            var data2 = _bytes;
            var i = 0;
            while (i + 1 < data2.length) {
              var c = (255 & data2[i]) << 8 | 255 & data2[i + 1];
              if (33088 <= c && c <= 40956) {
                c -= 33088;
              } else if (57408 <= c && c <= 60351) {
                c -= 49472;
              } else {
                throw "illegal char at " + (i + 1) + "/" + c;
              }
              c = (c >>> 8 & 255) * 192 + (c & 255);
              buffer.put(c, 13);
              i += 2;
            }
            if (i < data2.length) {
              throw "illegal char at " + (i + 1);
            }
          };
          return _this;
        };
        var byteArrayOutputStream = function() {
          var _bytes = [];
          var _this = {};
          _this.writeByte = function(b) {
            _bytes.push(b & 255);
          };
          _this.writeShort = function(i) {
            _this.writeByte(i);
            _this.writeByte(i >>> 8);
          };
          _this.writeBytes = function(b, off, len) {
            off = off || 0;
            len = len || b.length;
            for (var i = 0; i < len; i += 1) {
              _this.writeByte(b[i + off]);
            }
          };
          _this.writeString = function(s) {
            for (var i = 0; i < s.length; i += 1) {
              _this.writeByte(s.charCodeAt(i));
            }
          };
          _this.toByteArray = function() {
            return _bytes;
          };
          _this.toString = function() {
            var s = "";
            s += "[";
            for (var i = 0; i < _bytes.length; i += 1) {
              if (i > 0) {
                s += ",";
              }
              s += _bytes[i];
            }
            s += "]";
            return s;
          };
          return _this;
        };
        var base64EncodeOutputStream = function() {
          var _buffer = 0;
          var _buflen = 0;
          var _length = 0;
          var _base64 = "";
          var _this = {};
          var writeEncoded = function(b) {
            _base64 += String.fromCharCode(encode(b & 63));
          };
          var encode = function(n) {
            if (n < 0) {
            } else if (n < 26) {
              return 65 + n;
            } else if (n < 52) {
              return 97 + (n - 26);
            } else if (n < 62) {
              return 48 + (n - 52);
            } else if (n == 62) {
              return 43;
            } else if (n == 63) {
              return 47;
            }
            throw "n:" + n;
          };
          _this.writeByte = function(n) {
            _buffer = _buffer << 8 | n & 255;
            _buflen += 8;
            _length += 1;
            while (_buflen >= 6) {
              writeEncoded(_buffer >>> _buflen - 6);
              _buflen -= 6;
            }
          };
          _this.flush = function() {
            if (_buflen > 0) {
              writeEncoded(_buffer << 6 - _buflen);
              _buffer = 0;
              _buflen = 0;
            }
            if (_length % 3 != 0) {
              var padlen = 3 - _length % 3;
              for (var i = 0; i < padlen; i += 1) {
                _base64 += "=";
              }
            }
          };
          _this.toString = function() {
            return _base64;
          };
          return _this;
        };
        var base64DecodeInputStream = function(str) {
          var _str = str;
          var _pos = 0;
          var _buffer = 0;
          var _buflen = 0;
          var _this = {};
          _this.read = function() {
            while (_buflen < 8) {
              if (_pos >= _str.length) {
                if (_buflen == 0) {
                  return -1;
                }
                throw "unexpected end of file./" + _buflen;
              }
              var c = _str.charAt(_pos);
              _pos += 1;
              if (c == "=") {
                _buflen = 0;
                return -1;
              } else if (c.match(/^\s$/)) {
                continue;
              }
              _buffer = _buffer << 6 | decode(c.charCodeAt(0));
              _buflen += 6;
            }
            var n = _buffer >>> _buflen - 8 & 255;
            _buflen -= 8;
            return n;
          };
          var decode = function(c) {
            if (65 <= c && c <= 90) {
              return c - 65;
            } else if (97 <= c && c <= 122) {
              return c - 97 + 26;
            } else if (48 <= c && c <= 57) {
              return c - 48 + 52;
            } else if (c == 43) {
              return 62;
            } else if (c == 47) {
              return 63;
            } else {
              throw "c:" + c;
            }
          };
          return _this;
        };
        var gifImage = function(width, height) {
          var _width = width;
          var _height = height;
          var _data = new Array(width * height);
          var _this = {};
          _this.setPixel = function(x, y, pixel) {
            _data[y * _width + x] = pixel;
          };
          _this.write = function(out) {
            out.writeString("GIF87a");
            out.writeShort(_width);
            out.writeShort(_height);
            out.writeByte(128);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(255);
            out.writeByte(255);
            out.writeByte(255);
            out.writeString(",");
            out.writeShort(0);
            out.writeShort(0);
            out.writeShort(_width);
            out.writeShort(_height);
            out.writeByte(0);
            var lzwMinCodeSize = 2;
            var raster = getLZWRaster(lzwMinCodeSize);
            out.writeByte(lzwMinCodeSize);
            var offset = 0;
            while (raster.length - offset > 255) {
              out.writeByte(255);
              out.writeBytes(raster, offset, 255);
              offset += 255;
            }
            out.writeByte(raster.length - offset);
            out.writeBytes(raster, offset, raster.length - offset);
            out.writeByte(0);
            out.writeString(";");
          };
          var bitOutputStream = function(out) {
            var _out = out;
            var _bitLength = 0;
            var _bitBuffer = 0;
            var _this2 = {};
            _this2.write = function(data, length) {
              if (data >>> length != 0) {
                throw "length over";
              }
              while (_bitLength + length >= 8) {
                _out.writeByte(255 & (data << _bitLength | _bitBuffer));
                length -= 8 - _bitLength;
                data >>>= 8 - _bitLength;
                _bitBuffer = 0;
                _bitLength = 0;
              }
              _bitBuffer = data << _bitLength | _bitBuffer;
              _bitLength = _bitLength + length;
            };
            _this2.flush = function() {
              if (_bitLength > 0) {
                _out.writeByte(_bitBuffer);
              }
            };
            return _this2;
          };
          var getLZWRaster = function(lzwMinCodeSize) {
            var clearCode = 1 << lzwMinCodeSize;
            var endCode = (1 << lzwMinCodeSize) + 1;
            var bitLength = lzwMinCodeSize + 1;
            var table = lzwTable();
            for (var i = 0; i < clearCode; i += 1) {
              table.add(String.fromCharCode(i));
            }
            table.add(String.fromCharCode(clearCode));
            table.add(String.fromCharCode(endCode));
            var byteOut = byteArrayOutputStream();
            var bitOut = bitOutputStream(byteOut);
            bitOut.write(clearCode, bitLength);
            var dataIndex = 0;
            var s = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;
            while (dataIndex < _data.length) {
              var c = String.fromCharCode(_data[dataIndex]);
              dataIndex += 1;
              if (table.contains(s + c)) {
                s = s + c;
              } else {
                bitOut.write(table.indexOf(s), bitLength);
                if (table.size() < 4095) {
                  if (table.size() == 1 << bitLength) {
                    bitLength += 1;
                  }
                  table.add(s + c);
                }
                s = c;
              }
            }
            bitOut.write(table.indexOf(s), bitLength);
            bitOut.write(endCode, bitLength);
            bitOut.flush();
            return byteOut.toByteArray();
          };
          var lzwTable = function() {
            var _map = {};
            var _size = 0;
            var _this2 = {};
            _this2.add = function(key) {
              if (_this2.contains(key)) {
                throw "dup key:" + key;
              }
              _map[key] = _size;
              _size += 1;
            };
            _this2.size = function() {
              return _size;
            };
            _this2.indexOf = function(key) {
              return _map[key];
            };
            _this2.contains = function(key) {
              return typeof _map[key] != "undefined";
            };
            return _this2;
          };
          return _this;
        };
        var createDataURL = function(width, height, getPixel) {
          var gif = gifImage(width, height);
          for (var y = 0; y < height; y += 1) {
            for (var x = 0; x < width; x += 1) {
              gif.setPixel(x, y, getPixel(x, y));
            }
          }
          var b = byteArrayOutputStream();
          gif.write(b);
          var base64 = base64EncodeOutputStream();
          var bytes = b.toByteArray();
          for (var i = 0; i < bytes.length; i += 1) {
            base64.writeByte(bytes[i]);
          }
          base64.flush();
          return "data:image/gif;base64," + base64;
        };
        return qrcode3;
      })();
      !(function() {
        qrcode2.stringToBytesFuncs["UTF-8"] = function(s) {
          function toUTF8Array(str) {
            var utf8 = [];
            for (var i = 0; i < str.length; i++) {
              var charcode = str.charCodeAt(i);
              if (charcode < 128) utf8.push(charcode);
              else if (charcode < 2048) {
                utf8.push(
                  192 | charcode >> 6,
                  128 | charcode & 63
                );
              } else if (charcode < 55296 || charcode >= 57344) {
                utf8.push(
                  224 | charcode >> 12,
                  128 | charcode >> 6 & 63,
                  128 | charcode & 63
                );
              } else {
                i++;
                charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i) & 1023);
                utf8.push(
                  240 | charcode >> 18,
                  128 | charcode >> 12 & 63,
                  128 | charcode >> 6 & 63,
                  128 | charcode & 63
                );
              }
            }
            return utf8;
          }
          return toUTF8Array(s);
        };
      })();
      (function(factory) {
        if (typeof define === "function" && define.amd) {
          define([], factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        }
      })(function() {
        return qrcode2;
      });
    }
  });

  // src/injected/index.js
  var { createPageAdapter, cleanText } = require_adapters();
  var { createQrCanvas } = require_qr();
  var { createPairingShortcut } = require_recovery();
  var qrcode = require_qrcode();
  var FRAME_CHANNEL = "web-remote-tv-frame-v1";
  var BILIBILI_HOME = "https://www.bilibili.com/";
  function allVideosDeep() {
    const direct = Array.from(document.querySelectorAll("video"));
    if (direct.length) return direct;
    const videos = [];
    const roots = [document];
    const visited = [];
    while (roots.length) {
      const root = roots.shift();
      if (!root || visited.includes(root)) continue;
      visited.push(root);
      for (const element of Array.from(root.querySelectorAll("*"))) {
        if (element.shadowRoot) roots.push(element.shadowRoot);
      }
      if (root !== document) videos.push(...Array.from(root.querySelectorAll("video")));
    }
    return videos;
  }
  function startEmbeddedFrameBridge() {
    function requestRecovery() {
      window.parent.postMessage({ channel: FRAME_CHANNEL, kind: "recovery" }, "*");
    }
    const pairingShortcut = createPairingShortcut(requestRecovery);
    window.addEventListener("keydown", pairingShortcut, true);
    function frameVideo() {
      const videos = allVideosDeep();
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
      const captions = Array.from(video.textTracks || []).some((track) => track.mode === "showing");
      window.parent.postMessage({
        channel: FRAME_CHANNEL,
        kind: "player",
        player: {
          found: true,
          paused: video.paused,
          currentTime: Number(video.currentTime) || 0,
          duration: Number.isFinite(video.duration) ? video.duration : 0,
          volume: Number(video.volume),
          muted: video.muted,
          captions
        }
      }, "*");
    }
    function media(command) {
      const video = frameVideo();
      if (!video) return;
      const action = command.action;
      const value = Number(command.value) || 0;
      if (action === "toggle") video.paused ? video.play() : video.pause();
      if (action === "play") video.play();
      if (action === "pause") video.pause();
      if (action === "seekBy") video.currentTime = Math.max(0, Math.min(Number.isFinite(video.duration) ? video.duration : Infinity, video.currentTime + value));
      if (action === "volumeBy") {
        video.muted = false;
        video.volume = Math.max(0, Math.min(1, video.volume + value));
      }
      if (action === "captions") {
        const tracks = Array.from(video.textTracks || []);
        const showing = tracks.some((track) => track.mode === "showing");
        tracks.forEach((track, index) => {
          track.mode = !showing && index === 0 ? "showing" : "disabled";
        });
      }
      if (action === "fullscreen") {
        const request = video.requestFullscreen || video.webkitRequestFullscreen || video.webkitEnterFullscreen;
        if (request) request.call(video);
      }
      setTimeout(report, 100);
    }
    window.addEventListener("message", (event) => {
      const message = event.data;
      if (!message || message.channel !== FRAME_CHANNEL) return;
      if (message.kind === "recovery" && event.source !== window.parent) {
        requestRecovery();
        return;
      }
      if (event.source !== window.parent || message.kind !== "command") return;
      const command = message.command || {};
      if (command.type === "media") media(command);
      if (command.type === "pointerClick") {
        const x = Math.max(0, Math.min(window.innerWidth - 1, Number(command.xRatio) * window.innerWidth));
        const y = Math.max(0, Math.min(window.innerHeight - 1, Number(command.yRatio) * window.innerHeight));
        const target = document.elementFromPoint(x, y);
        if (target) {
          try {
            target.focus();
          } catch {
          }
          try {
            target.click();
          } catch {
          }
        }
      }
    });
    setInterval(report, 1e3);
    document.addEventListener("play", report, true);
    document.addEventListener("pause", report, true);
  }
  (function startWebRemoteBridge() {
    try {
      if (window.top !== window.self) {
        startEmbeddedFrameBridge();
        return;
      }
    } catch {
      return;
    }
    if (window.__WEB_REMOTE_TV_BRIDGE_STARTED__) return;
    Object.defineProperty(window, "__WEB_REMOTE_TV_BRIDGE_STARTED__", { value: true, configurable: false });
    const LOCAL_HTTP = "http://127.0.0.1:8182";
    const LOCAL_WS = "ws://127.0.0.1:8182/ws?role=tv";
    let adapter = createPageAdapter();
    let socket = null;
    let socketTimer = null;
    let reconnectTimer = null;
    let pollAbort = null;
    let polling = false;
    let pageActive = true;
    let transport = "connecting";
    let serviceInfo = null;
    let overlay = null;
    let overlayVisible = false;
    let overlayPinned = false;
    let focusedElement = null;
    let pointerX = Math.round(window.innerWidth / 2);
    let pointerY = Math.round(window.innerHeight / 2);
    let scanTimer = null;
    let lastPageSignature = "";
    let lastPlayerSignature = "";
    let embeddedPlayer = null;
    let embeddedPlayerSeenAt = 0;
    let embeddedPlayerWindow = null;
    let lastError = "";
    let siteFillTvActive = false;
    let lastOverlayBackAt = 0;
    function postState(message) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
        return Promise.resolve();
      }
      return fetch(`${LOCAL_HTTP}/api/tv/state`, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(message),
        cache: "no-store"
      }).catch((error) => {
        lastError = `State bridge: ${error.message}`;
        updateOverlay();
      });
    }
    function pageState(force) {
      const page = {
        title: document.title || "",
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
        postState({ kind: "page", page });
      }
    }
    function bestVideo() {
      const videos = allVideosDeep();
      if (adapter.id === "bilibili") {
        const playerVideos = Array.from(document.querySelectorAll([
          ".bpx-player-container video",
          "#bilibili-player video",
          ".bpx-player-video-wrap video",
          ".bilibili-player-video video",
          ".bilibili-player-video-wrap video"
        ].join(",")));
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
      const captions = video ? Array.from(video.textTracks || []).some((track) => track.mode === "showing") : false;
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
        postState({ kind: "player", player });
      }
    }
    function snapshot() {
      const items = adapter.scan();
      postState({ kind: "snapshot", items });
    }
    function scheduleSnapshot() {
      clearTimeout(scanTimer);
      scanTimer = setTimeout(snapshot, 800);
    }
    function createOverlay() {
      if (overlay && document.documentElement.contains(overlay.host)) return;
      const host = document.createElement("div");
      host.id = "web-remote-tv-host";
      host.setAttribute("data-web-remote-tv", "true");
      const root = host.attachShadow ? host.attachShadow({ mode: "closed" }) : host;
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
          <div class="top"><div class="mark">\u2197</div><div><h1>Web Remote TV</h1><div class="sub">Scan with a phone on the same Wi-Fi</div></div></div>
          <div class="pair"><div class="qr" role="img" aria-label="Pairing QR code"></div><div><div class="pin-label">Pairing PIN</div><div class="pin">------</div><div class="url">Starting local service\u2026</div></div></div>
          <div class="diag"></div>
        </section>
        <button class="chip" type="button">Phone Remote</button>
        <div class="pointer"></div>
        <div class="focus"></div>
      </div>`;
      root.querySelector(".sub").textContent = "Remote recovery: Red or \u2191 \u2191 \u2193 \u2193 OK \xB7 Back hides";
      const panel = root.querySelector(".panel");
      const chip = root.querySelector(".chip");
      root.querySelector(".min").addEventListener("click", () => setOverlay(false));
      chip.addEventListener("click", () => setOverlay(true, true));
      document.documentElement.appendChild(host);
      overlay = {
        host,
        root,
        panel,
        chip,
        qr: root.querySelector(".qr"),
        pin: root.querySelector(".pin"),
        url: root.querySelector(".url"),
        diag: root.querySelector(".diag"),
        pointer: root.querySelector(".pointer"),
        focus: root.querySelector(".focus")
      };
      updatePointer();
      updateOverlay();
      syncOverlayVisibility();
    }
    function setOverlay(show, pinned, notifyService = true) {
      overlayVisible = show;
      overlayPinned = Boolean(show && pinned);
      syncOverlayVisibility();
      if (notifyService) postState({ kind: "overlay", visible: overlayVisible, pinned: overlayPinned });
    }
    function applyOverlayState(info) {
      const next = info && info.overlay;
      if (!next || typeof next.visible !== "boolean") return;
      setOverlay(next.visible, next.pinned, false);
    }
    function syncOverlayVisibility() {
      if (!overlay) return;
      overlay.panel.classList.toggle("hidden", !overlayVisible || siteFillTvActive && !overlayPinned);
      overlay.chip.classList.toggle("visible", !overlayVisible && !siteFillTvActive);
    }
    function updateOverlay() {
      if (!overlay) return;
      const data = serviceInfo || {};
      overlay.pin.textContent = data.pin || "------";
      overlay.url.textContent = data.pairUrl || data.addresses && data.addresses[0] || "Local service unavailable";
      if (data.pin && data.pairUrl && overlay.qr.getAttribute("data-value") !== data.pairUrl) {
        try {
          const canvas = createQrCanvas(document, qrcode, data.pairUrl);
          overlay.qr.textContent = "";
          overlay.qr.appendChild(canvas);
          overlay.qr.setAttribute("data-value", data.pairUrl);
        } catch (error) {
          lastError = `QR code: ${error.message}`;
          overlay.qr.textContent = "Use the address";
        }
      }
      overlay.diag.innerHTML = "";
      const rows = [
        ["Site adapter", adapter.id],
        ["Bridge", transport],
        ["Phone", data.phoneCount ? `${data.phoneCount} connected` : "not connected"],
        ["Recovery", "Red key or \u2191 \u2191 \u2193 \u2193 OK"],
        ["Page", cleanText(window.location.hostname, 80)],
        ["Last error", lastError || "none"]
      ];
      for (const row of rows) {
        const line = document.createElement("div");
        const strong = document.createElement("strong");
        strong.textContent = `${row[0]}: `;
        line.appendChild(strong);
        line.appendChild(document.createTextNode(row[1]));
        overlay.diag.appendChild(line);
      }
    }
    function updatePointer() {
      if (!overlay) return;
      overlay.pointer.style.left = `${pointerX}px`;
      overlay.pointer.style.top = `${pointerY}px`;
    }
    function showFocus(element) {
      focusedElement = element;
      if (!overlay || !element || !adapter.visible(element)) {
        if (overlay) overlay.focus.style.display = "none";
        return;
      }
      const rect = element.getBoundingClientRect();
      overlay.focus.style.display = "block";
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
      if (!element) throw new Error("No visible text or search field was found.");
      element.focus();
      if (element.isContentEditable) {
        element.textContent = value;
      } else {
        const prototype = element.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(prototype, "value");
        if (setter && setter.set) setter.set.call(element, value);
        else element.value = value;
      }
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
      if (submit) {
        element.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
        element.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true }));
        if (element.form) {
          if (typeof element.form.requestSubmit === "function") element.form.requestSubmit();
          else element.form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }
      }
      showFocus(element);
    }
    function fallbackMediaKey(action) {
      const mapping = {
        toggle: { key: "MediaPlayPause", code: 10252 },
        play: { key: "MediaPlay", code: 415 },
        pause: { key: "MediaPause", code: 19 }
      };
      const value = mapping[action];
      if (!value) return;
      for (const type of ["keydown", "keyup"]) {
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
      return Array.from(document.querySelectorAll("iframe")).map((frame) => ({ frame, window: frame.contentWindow })).filter((entry) => entry.window);
    }
    function relayToFrames(command) {
      const frames = frameWindows();
      frames.forEach((entry) => entry.window.postMessage({ channel: FRAME_CHANNEL, kind: "command", command }, "*"));
      return frames.length;
    }
    function relayToEmbeddedPlayer(command) {
      if (!embeddedPlayerWindow || !embeddedPlayer || Date.now() - embeddedPlayerSeenAt >= 3500) return false;
      embeddedPlayerWindow.postMessage({ channel: FRAME_CHANNEL, kind: "command", command }, "*");
      return true;
    }
    function mediaCommand(action, value) {
      const video = bestVideo();
      if (!video) {
        const command = { type: "media", action, value };
        if (relayToEmbeddedPlayer(command)) {
          setTimeout(() => playerState(true), 100);
          return;
        }
        if (adapter.mediaAction && adapter.mediaAction(action, value)) {
          setTimeout(() => {
            pageState(true);
            playerState(true);
          }, 180);
          return;
        }
        fallbackMediaKey(action);
        if (!relayToFrames(command)) {
          throw new Error("No accessible video or embedded player frame was found.");
        }
        lastError = "Media command forwarded to embedded player frame.";
        updateOverlay();
        return;
      }
      if (action === "toggle") video.paused ? video.play() : video.pause();
      if (action === "play") video.play();
      if (action === "pause") video.pause();
      if (action === "seekBy") video.currentTime = Math.max(0, Math.min(Number.isFinite(video.duration) ? video.duration : Infinity, video.currentTime + value));
      if (action === "volumeBy") {
        video.muted = false;
        video.volume = Math.max(0, Math.min(1, video.volume + value));
      }
      if (action === "captions") {
        const tracks = Array.from(video.textTracks || []);
        const showing = tracks.some((track) => track.mode === "showing");
        tracks.forEach((track, index) => {
          track.mode = !showing && index === 0 ? "showing" : "disabled";
        });
      }
      if (action === "fullscreen") {
        if (adapter.id === "bilibili" && adapter.siteAction && adapter.siteAction("webFullscreen")) {
          setTimeout(() => {
            pageState(true);
            playerState(true);
          }, 250);
          return;
        }
        const target = video.closest(".bpx-player-container,[data-player],.player") || video;
        const requestTarget = target.requestFullscreen || target.webkitRequestFullscreen ? target : video;
        const request = requestTarget.requestFullscreen || requestTarget.webkitRequestFullscreen || requestTarget.webkitEnterFullscreen;
        if (request) {
          const result = request.call(requestTarget);
          if (result && typeof result.catch === "function") result.catch(() => {
          });
        }
      }
      setTimeout(() => playerState(true), 100);
    }
    function execute(command) {
      try {
        if (command.type === "navigate") {
          window.location.replace(command.url);
          return;
        }
        if (command.type === "history") {
          if (command.action === "back") window.history.back();
          if (command.action === "forward") window.history.forward();
          if (command.action === "reload") window.location.reload();
          return;
        }
        if (command.type === "focus") {
          const next = adapter.moveFocus(focusedElement, command.direction);
          if (next) {
            next.focus();
            next.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
            showFocus(next);
          }
        }
        if (command.type === "activate") adapter.activate(focusedElement || document.activeElement);
        if (command.type === "scroll") window.scrollBy({ left: command.dx, top: command.dy, behavior: "smooth" });
        if (command.type === "pointer") {
          pointerX = Math.max(0, Math.min(window.innerWidth - 1, pointerX + command.dx));
          pointerY = Math.max(0, Math.min(window.innerHeight - 1, pointerY + command.dy));
          updatePointer();
        }
        if (command.type === "pointerClick") {
          const target = document.elementFromPoint(pointerX, pointerY);
          if (target && target !== overlay.host) {
            if (target.tagName === "IFRAME" && target.contentWindow) {
              const rect = target.getBoundingClientRect();
              target.contentWindow.postMessage({
                channel: FRAME_CHANNEL,
                kind: "command",
                command: {
                  type: "pointerClick",
                  xRatio: (pointerX - rect.left) / Math.max(1, rect.width),
                  yRatio: (pointerY - rect.top) / Math.max(1, rect.height)
                }
              }, "*");
            } else {
              showFocus(target);
              adapter.activate(target);
            }
          }
        }
        if (command.type === "text") setText(command.value, command.submit);
        if (command.type === "media") mediaCommand(command.action, command.value);
        if (command.type === "site") {
          if (command.site !== adapter.id || !adapter.siteAction) throw new Error(`The ${command.site} controls are not available on this page.`);
          if (!adapter.siteAction(command.action, command.value)) throw new Error(`Bilibili control "${command.action}" is not available on this page.`);
          setTimeout(() => {
            pageState(true);
            playerState(true);
            snapshot();
          }, 250);
        }
        if (command.type === "select") {
          const element = adapter.elementById(command.id);
          showFocus(element);
          adapter.activate(element);
        }
        if (command.type === "requestSnapshot") snapshot();
        if (command.type === "overlay") {
          const show = command.action === "toggle" ? !overlayVisible : command.action === "show";
          setOverlay(show, show);
        }
        scheduleSnapshot();
      } catch (error) {
        lastError = cleanText(error.message, 260);
        postState({ kind: "log", level: "warn", message: lastError });
        updateOverlay();
      }
    }
    function processServiceMessage(message) {
      if (!message || typeof message !== "object") return;
      if (message.kind === "service_info") {
        serviceInfo = message.info;
        applyOverlayState(serviceInfo);
        updateOverlay();
      }
      if (message.kind === "command") execute(message.command || {});
      if (message.kind === "ping") postState({ kind: "pong", at: Date.now() });
    }
    async function bootstrapServiceInfo() {
      try {
        const response = await fetch(`${LOCAL_HTTP}/api/tv-info?t=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        serviceInfo = await response.json();
        applyOverlayState(serviceInfo);
        updateOverlay();
      } catch (error) {
        if (!serviceInfo) {
          lastError = `Pairing info unavailable: ${error.message}`;
          setOverlay(true, false, false);
          updateOverlay();
        }
      }
    }
    async function pollLoop() {
      if (polling) return;
      polling = true;
      transport = "HTTP fallback";
      updateOverlay();
      while (pageActive && polling && (!socket || socket.readyState !== WebSocket.OPEN)) {
        try {
          pollAbort = typeof AbortController === "function" ? new AbortController() : null;
          const response = await fetch(`${LOCAL_HTTP}/api/tv/poll?t=${Date.now()}`, {
            cache: "no-store",
            signal: pollAbort ? pollAbort.signal : void 0
          });
          const payload = await response.json();
          serviceInfo = payload.info || serviceInfo;
          (payload.messages || []).forEach(processServiceMessage);
          lastError = "";
          pageState(false);
          playerState(false);
          updateOverlay();
        } catch (error) {
          if (error.name !== "AbortError") {
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
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
      if (!pageActive) return;
      if (socket && (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN)) return;
      let nextSocket;
      try {
        nextSocket = new WebSocket(LOCAL_WS);
        socket = nextSocket;
      } catch (error) {
        lastError = `WebSocket: ${error.message}`;
        pollLoop();
        return;
      }
      socketTimer = setTimeout(() => {
        if (pageActive && socket === nextSocket && nextSocket.readyState !== WebSocket.OPEN) pollLoop();
      }, 2200);
      nextSocket.addEventListener("open", () => {
        if (!pageActive || socket !== nextSocket) {
          try {
            nextSocket.close();
          } catch {
          }
          return;
        }
        clearTimeout(socketTimer);
        transport = "WebSocket";
        lastError = "";
        if (pollAbort) pollAbort.abort();
        polling = false;
        pageState(true);
        playerState(true);
        snapshot();
        updateOverlay();
      });
      nextSocket.addEventListener("message", (event) => {
        if (!pageActive || socket !== nextSocket) return;
        try {
          processServiceMessage(JSON.parse(event.data));
        } catch {
        }
      });
      nextSocket.addEventListener("close", () => {
        if (socket !== nextSocket) return;
        socket = null;
        if (!pageActive) return;
        transport = "reconnecting";
        updateOverlay();
        pollLoop();
        reconnectTimer = setTimeout(connectSocket, 1800);
      });
      nextSocket.addEventListener("error", () => {
        if (!pageActive || socket !== nextSocket) return;
        lastError = "WebSocket connection failed; trying HTTP fallback.";
        updateOverlay();
      });
    }
    function suspendBridge() {
      pageActive = false;
      clearTimeout(socketTimer);
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
      polling = false;
      if (pollAbort) pollAbort.abort();
      pollAbort = null;
      const previousSocket = socket;
      socket = null;
      if (previousSocket) {
        try {
          previousSocket.close(1e3, "Page navigation");
        } catch {
        }
      }
    }
    function resumeBridge() {
      if (pageActive && socket && (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN)) return;
      pageActive = true;
      transport = "connecting";
      bootstrapServiceInfo();
      connectSocket();
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
    window.addEventListener("message", (event) => {
      const message = event.data;
      if (!message || message.channel !== FRAME_CHANNEL) return;
      if (!frameWindows().some((entry) => entry.window === event.source)) return;
      if (message.kind === "recovery") {
        setOverlay(true, true);
        updateOverlay();
        return;
      }
      if (message.kind !== "player") return;
      embeddedPlayer = message.player;
      embeddedPlayerSeenAt = Date.now();
      embeddedPlayerWindow = event.source;
      playerState(true);
    });
    function emergencyHome(event) {
      const isBack = isBackKey(event);
      const hostname = String(window.location.hostname || "").toLowerCase();
      const onBilibili = hostname === "bilibili.com" || hostname.endsWith(".bilibili.com");
      if (!isBack || Date.now() - lastOverlayBackAt < 500 || onBilibili) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.replace(BILIBILI_HOME);
    }
    function isBackKey(event) {
      const keyCode = Number(event && (event.keyCode || event.which));
      const key = String(event && (event.keyName || event.key) || "").toLowerCase();
      return key === "back" || key === "escape" || keyCode === 10009;
    }
    function hideOverlayWithBack(event) {
      if (!overlayVisible || !isBackKey(event)) return;
      lastOverlayBackAt = Date.now();
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
      setOverlay(false);
    }
    const pairingShortcut = createPairingShortcut(() => {
      setOverlay(true, true);
      updateOverlay();
    });
    try {
      if (typeof tizen !== "undefined" && tizen.tvinputdevice) tizen.tvinputdevice.registerKey("ColorF0Red");
    } catch {
    }
    window.addEventListener("keydown", pairingShortcut, true);
    window.addEventListener("keydown", hideOverlayWithBack, true);
    window.addEventListener("keydown", emergencyHome, true);
    document.addEventListener("tizenhwkey", hideOverlayWithBack, true);
    document.addEventListener("tizenhwkey", emergencyHome, true);
    window.addEventListener("pagehide", suspendBridge);
    window.addEventListener("pageshow", resumeBridge);
    if (document.documentElement) initializeDom();
    else document.addEventListener("DOMContentLoaded", initializeDom, { once: true });
    bootstrapServiceInfo();
    connectSocket();
    setInterval(() => {
      const signature = `${window.location.href}|${document.title}|${document.readyState}`;
      if (signature !== lastPageSignature) pageState(false);
      playerState(false);
      if (focusedElement) showFocus(focusedElement);
      if (!overlay || !document.documentElement.contains(overlay.host)) createOverlay();
    }, 1e3);
  })();
})();
