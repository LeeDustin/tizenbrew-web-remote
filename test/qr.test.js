'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const qrcode = require('qrcode-generator');
const { createQrCanvas } = require('../src/injected/qr');

test('pairing QR renders as a crisp canvas with a quiet zone', () => {
  const fills = [];
  const attributes = {};
  const canvas = {
    style: {},
    setAttribute(name, value) { attributes[name] = value; },
    getContext(type) {
      assert.equal(type, '2d');
      return {
        imageSmoothingEnabled: true,
        fillStyle: '',
        fillRect(...values) { fills.push({ color: this.fillStyle, values }); }
      };
    }
  };
  const document = {
    createElement(name) {
      assert.equal(name, 'canvas');
      return canvas;
    }
  };

  const result = createQrCanvas(document, qrcode, 'http://192.168.50.20:8182/?pin=123456');
  assert.equal(result, canvas);
  assert.equal(canvas.width, canvas.height);
  assert.ok(canvas.width <= 148);
  assert.ok(canvas.width >= 100);
  assert.equal(canvas.style.width, `${canvas.width}px`);
  assert.equal(attributes['aria-hidden'], 'true');
  assert.deepEqual(fills[0], { color: '#ffffff', values: [0, 0, canvas.width, canvas.height] });
  assert.ok(fills.filter((entry) => entry.color === '#000000').length > 100);
  assert.ok(fills.slice(1).every((entry) => entry.values[0] > 0 && entry.values[1] > 0));
});
