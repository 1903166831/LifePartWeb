import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  appType: 'mpa',
  base: '/',
  build: {
    rolldownOptions: {
      input: {
        Home: fileURLToPath(new URL('./index.html', import.meta.url)),
        Privacy: fileURLToPath(new URL('./privacy/index.html', import.meta.url)),
        Support: fileURLToPath(new URL('./support/index.html', import.meta.url)),
        Terms: fileURLToPath(new URL('./terms/index.html', import.meta.url)),
      },
    },
  },
})
