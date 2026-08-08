'use strict';

function createQrCanvas(document, qrcode, value) {
  if (!document || typeof document.createElement !== 'function') throw new Error('QR rendering requires a document.');
  if (typeof qrcode !== 'function') throw new Error('QR generator is unavailable.');

  const code = qrcode(0, 'L');
  code.addData(String(value || ''));
  code.make();

  const moduleCount = code.getModuleCount();
  const quietZone = 4;
  const cellSize = Math.max(2, Math.floor(148 / (moduleCount + quietZone * 2)));
  const dimension = (moduleCount + quietZone * 2) * cellSize;
  const canvas = document.createElement('canvas');
  canvas.width = dimension;
  canvas.height = dimension;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.width = `${dimension}px`;
  canvas.style.height = `${dimension}px`;

  const context = canvas.getContext && canvas.getContext('2d');
  if (!context) throw new Error('Canvas rendering is unavailable.');
  context.imageSmoothingEnabled = false;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, dimension, dimension);
  context.fillStyle = '#000000';
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

module.exports = { createQrCanvas };
