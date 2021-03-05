// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

import json from '@rollup/plugin-json';
import rollupCommonjs from '@rollup/plugin-commonjs';
import { rollupAdapter, fromRollup } from '@web/dev-server-rollup';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

const commonjs = fromRollup(rollupCommonjs);

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  // nodeResolve: true,
  open: '/',
  watch: !hmr,

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  /** Confgure bare import resolve plugin */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
    browser: true,
    preferBuiltins: false
   },

  mimeTypes: {
    // serve all json files as js
    '**/*.json': 'js',
    // serve .module.css files as js
    '**/*.module.css': 'js',
  },

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),

    commonjs({
      include: ['./node_modules/zen-observable/*', './node_modules/url/*'],
    }),
    rollupAdapter(json()),
  ],

  // See documentation for all available options
});
