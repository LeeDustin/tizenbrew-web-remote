'use strict';

const PAIRING_SEQUENCE = ['up', 'up', 'down', 'down', 'ok'];

function remoteKey(event) {
  const code = Number(event && (event.keyCode || event.which));
  if (code === 38) return 'up';
  if (code === 40) return 'down';
  if (code === 13) return 'ok';

  const key = String(event && (event.key || event.keyName) || '').toLowerCase();
  if (key === 'arrowup' || key === 'up') return 'up';
  if (key === 'arrowdown' || key === 'down') return 'down';
  if (key === 'enter' || key === 'ok' || key === 'done') return 'ok';
  return '';
}

function createPairingShortcut(onComplete, options) {
  const settings = options || {};
  const now = typeof settings.now === 'function' ? settings.now : Date.now;
  const maximumGap = Number(settings.maximumGap) || 2500;
  let index = 0;
  let lastAt = 0;

  return function pairingShortcut(event) {
    if (!event || event.repeat) return false;
    const key = remoteKey(event);
    const currentTime = now();
    if (!key || (lastAt && currentTime - lastAt > maximumGap)) index = 0;
    lastAt = currentTime;
    if (!key) return false;

    if (key === PAIRING_SEQUENCE[index]) index += 1;
    else index = key === PAIRING_SEQUENCE[0] ? 1 : 0;
    if (index < PAIRING_SEQUENCE.length) return false;

    index = 0;
    lastAt = 0;
    if (typeof event.preventDefault === 'function') event.preventDefault();
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    onComplete();
    return true;
  };
}

module.exports = { PAIRING_SEQUENCE, createPairingShortcut, remoteKey };
