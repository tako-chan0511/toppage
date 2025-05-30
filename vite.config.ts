// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// NODE_ENV ではなく VERCEL_ENV でも判定可
const isDev = process.env.NODE_ENV !== 'production'

export default defineConfig({
  base: isDev ? '/' : '/toppage/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
