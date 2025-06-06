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
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // index.html のような .html ファイルをアセットとして扱う
    assetsInclude: ['**/*.html'],

    // “serve” モード (npm run dev / npx vercel dev 時) のみ server 設定
    ...(isServe
      ? {
          server: {
            // 常に 5173 番を使う
            port: 5173,
            strictPort: true,
            // /api → http://localhost:3000 に常時 proxy
            proxy: {
              '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
              },
            },
          },
        }
      : {}),
  }
})
