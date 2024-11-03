import { defineConfig, loadEnv } from 'vite';
import _ from 'lodash';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isCustomDomain = _.isEqual(_.get(env, 'VITE_CUSTOM_DEPLOYMENT'), 'true');

  const isGenerateSourceMap = _.isEqual(_.get(env, 'VITE_GENERATE_SOURCEMAP'), 'true');

  return {
    plugins: [react()],
    base: isCustomDomain ? '/digital-marketing/' : '/',
    build: {
      sourcemap: isGenerateSourceMap,
    },
    resolve: {
      alias: {
        '#': resolve(__dirname, './src'),
        assets: resolve(__dirname, './src/assets'),
        components: resolve(__dirname, './src/components'),
        pages: resolve(__dirname, './src/pages'),
        utils: resolve(__dirname, './src/utils'),
        types: resolve(__dirname, './src/types'),
        public: resolve(__dirname, './public'),
      },
    },
  };
});
