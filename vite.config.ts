import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: '@import "./src/assets/scss/style.scss";',
        },
    },
},
  resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
  },
  server: {
    port: 8080,
    hmr: { overlay: false },
  }
})