import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/style.scss";',
      },
    },
  },
  server: {
    port: 8082,
    hot: true,
    hmr: {
      overlay: false, //TODO: @Manuel --> Strategy??
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './src/main.js',
      },
    },
  },
  optimizeDeps: {
    include: [
      'bootstrap',
      '@popperjs/core',
      'pinia',
      'vue',
    ],
  },
});