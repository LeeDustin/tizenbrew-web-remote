'use strict';

const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');
const babel = require('@babel/core');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

async function build() {
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(path.join(dist, 'controller'), { recursive: true });

  const controllerAssets = {};
  for (const file of ['index.html', 'app.js', 'styles.css', 'manifest.webmanifest', 'icon.svg']) {
    controllerAssets[file] = fs.readFileSync(path.join(root, 'src/controller', file), 'utf8').replace(/\r\n/g, '\n');
  }

  const modernService = path.join(dist, 'service-modern.js');
  await Promise.all([
    esbuild.build({
      entryPoints: [path.join(root, 'src/service/server.js')],
      outfile: modernService,
      bundle: true,
      platform: 'node',
      target: ['node10'],
      format: 'cjs',
      minify: false,
      sourcemap: false,
      define: {
        __WEB_REMOTE_CONTROLLER_ASSETS__: JSON.stringify(controllerAssets)
      },
      banner: { js: '/* Web Remote TV service - generated. The phone UI is embedded below; edit src/ instead. */' }
    }),
    esbuild.build({
      entryPoints: [path.join(root, 'src/injected/index.js')],
      outfile: path.join(dist, 'injected.js'),
      bundle: true,
      platform: 'browser',
      target: ['chrome85'],
      format: 'iife',
      minify: false,
      sourcemap: false,
      banner: { js: '/* Web Remote TV page bridge - generated; edit src/ instead. */' }
    })
  ]);

  const legacyService = await babel.transformFileAsync(modernService, {
    presets: [[require.resolve('@babel/preset-env'), {
      targets: { node: '4.4' },
      modules: false,
      bugfixes: true
    }]],
    sourceMaps: false,
    comments: true,
    compact: false
  });
  fs.writeFileSync(path.join(dist, 'service.js'), legacyService.code, 'utf8');
  fs.rmSync(modernService, { force: true });

  for (const file of Object.keys(controllerAssets)) {
    fs.copyFileSync(
      path.join(root, 'src/controller', file),
      path.join(dist, 'controller', file)
    );
  }

  console.log('Built dist/service.js, dist/injected.js, and the phone controller.');
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
