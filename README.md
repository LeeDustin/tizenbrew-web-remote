# Web Remote TV for TizenBrew

A phone-first remote for web video sites on Samsung TVs. The TV remains the
playback screen while an Android-friendly local web app handles site switching,
text entry, navigation, pointer input, and media controls.

The default site profile is the desktop **Bilibili** website. **1Shows** and
**Cineby** are included as selectable alternatives. Additional public HTTPS
domains can be added from the phone. Site profiles only control pages already
loaded in the TV web view; this project does
not extract stream URLs, proxy video, bypass DRM, discover mirrors, or disable
access controls.

## Compatibility target

- Samsung QA55Q70BAJXZK (2022)
- Tizen 6.5 / Chromium 85
- TizenBrew 2.0.5
- Android 16 / One UI 8.5 controller

## Build and verify

Node.js 16 or newer is required on the development computer.

```sh
pnpm install
pnpm run verify
```

Generated TizenBrew entry points are committed under `dist/` so the TV does not
need to compile the source.

## Install through TizenBrew

1. Build and commit the repository, including `dist/`.
2. Push it to a GitHub repository.
3. In TizenBrew, choose **Add GitHub Module** and enter `owner/repository`.
4. Launch **Web Remote TV**.
5. Scan the QR code shown on the TV, or open the displayed LAN address and enter
   the six-digit PIN.

## Phone controls

- Switch between 1Shows, Cineby, Bilibili, and user-added public HTTPS domains.
- Press the TV remote's **Back** key on any non-Bilibili site for an emergency
  return to Bilibili; phone-driven site switches also replace redirect pages.
- Browse a simplified list of visible links, buttons, and inputs.
- Use a directional pad or touchpad when semantic discovery is incomplete.
- Send text to the currently focused search/input field.
- Play/pause, seek, adjust volume, toggle captions, and request fullscreen when
  the player is accessible from the top-level page or a frame where TizenBrew's
  module script is active.
- On Bilibili, open the official login dialog, search the desktop site, toggle
  danmu, move between videos/parts, select quality and speed, and enter wide or
  web-fullscreen mode.

For Bilibili login, tap **Login / QR** on the phone and scan the QR code shown by
Bilibili on the television. The remote does not read passwords, QR contents,
cookies, or account tokens. Login availability, paid quality levels, regional
availability, and subscription-only content remain controlled by Bilibili.

Cross-origin players are handled by a small, bounded frame bridge. Player sites
can still reject synthetic clicks, programmatic playback, or fullscreen, so the
touchpad, directional pad, and activation controls remain the fallback.

The manifest intentionally uses TizenBrew 2.0.5's normal injection mode. Its
document-start mode can leave the module picker waiting for a debugger event
instead of navigating to the selected website.

## Security model

Remote websites are untrusted. The local service therefore:

- pairs phones with a short-lived on-screen PIN;
- issues random bearer tokens stored only in the phone browser;
- limits request sizes and failed pairing attempts;
- accepts only an explicit allowlist of bounded commands;
- restricts TV WebSocket connections to loopback;
- does not expose arbitrary JavaScript execution, filesystem operations,
  credentials, shell commands, or privileged Tizen APIs;
- permits navigation only to public HTTPS hostnames.

Do not enter reused passwords, payment details, or sensitive personal data into
untrusted sites. Decline notification and download prompts.

## Device verification checklist

Automated tests cover pairing, authorization, command validation, static assets,
WebSocket messaging, and the production build. These items require the TV:

1. The injected overlay appears on Bilibili with a canvas-rendered pairing QR.
2. The QR address uses the TV's reachable Wi-Fi or Ethernet address.
3. The phone connects while both devices are on the same LAN.
4. Selecting Cineby navigates and the bridge reconnects after the page load.
5. Selecting Bilibili opens the desktop site; search stays in the TV page.
6. Bilibili's login dialog displays a scannable QR code and survives navigation.
7. Danmu, quality, speed, previous/next, wide mode, and web fullscreen work on a
   normal Bilibili video page.
8. Search, semantic buttons, touchpad, Back, and media controls work.
9. Embedded-player state appears and its media controls work, or fall back
   cleanly when the player rejects programmatic control.
10. The bridge reconnects after TV reload and phone sleep.

The overlay's **Diagnostics** section reports the active adapter, page URL,
controller connection, and last bridge error.
