// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command }) => {
  const isServe = command === 'serve'

  return {
    base: '/',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    // 開発モードのときだけ server 設定を追加
    ...(isServe
      ? {
          server: {
            // Vercel Dev（npx vercel dev）が渡す PORT があればそちらを使い、
            // なければローカル開発のデフォルト 5173 を使う
            port: Number(process.env.PORT) || 5173,
            strictPort: true,

            // ローカル開発中は /api → http://localhost:3000/api へ転送
            proxy: {
              '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
              },
            },
          },
        }
      : {}),

    // index.html をアセット扱いにして import‐analysis エラーを防ぐ
    assetsInclude: ['**/*.html'],
  }
})
