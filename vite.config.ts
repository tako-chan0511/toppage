// vue/toppage/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command }) => {
  const isServe = command === 'serve'

  return {
    base: '/',
    plugins: [vue()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    // assetsInclude: ['**/*.html'],
    ...(isServe
      ? {
          server: {
            // Vercel が渡す PORT を優先、それ以外は 5173
            port: Number(process.env.PORT) || 5173,
            strictPort: true,
            // ローカルネットワークからもアクセス可に
            host: true,
            // API 呼び出しをバックエンドにプロキシ
            proxy: {
              '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
              },
            },
            // HMR を確実に動かす設定
            hmr: {
              protocol: 'ws',
              host: process.env.HOST || 'localhost',
              port: Number(process.env.PORT) || 5173,
            },
          },
        }
      : {}),
  }
})
