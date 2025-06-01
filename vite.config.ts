// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/',                 // ルートを常に “/” に設定
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // .html ファイルを JS として import 解析しないようにする
  assetsInclude: ['**/*.html'],
  server: {
    proxy: {
      // フロント側から /api/* へアクセスされたら、localhost:3000/api/* に自動転送する
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
