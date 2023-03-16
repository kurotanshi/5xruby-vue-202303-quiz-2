import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/youbike-api': {
        target: 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: path => path.replace(/^\/youbike-api/, ''),
      },
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
