# Toppage ローカル→リモート デプロイ TIPS

## 1. ローカル開発環境の構築（前提）

- **フロントエンド（Vite/Vue3）：**
  ```bash
  npm run dev
  ```
  で http://localhost:5173 を起動

- **バックエンド（Vercel Functions）：**
  ```bash
  npx vercel dev --listen 3000
  ```
  で `/api/*` をプレビュー

> ２つのターミナルを並列起動して動作確認

---

## 2. Vite 側の設定 (`vite.config.ts`)

```ts
export default defineConfig({
  plugins: [vue()],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
    host: true,                   // LAN からも見えるように
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    hmr: {
      protocol: 'ws',
      host: process.env.HOST || 'localhost',
      port: Number(process.env.PORT) || 5173,
    },
  },
  // index.html を JS として解析しない
  assetsInclude: ['**/*.html'],
});
```

---

## 3. Vercel Functions の注意点

- dotenv は不要かつ未インストール → `import 'dotenv/config'` は必ず削除
- 環境変数は Vercel ダッシュボードで All / Preview / Production のいずれにも登録
  - `SUPABASE_URL`
  - `SUPABASE_KEY`（匿名キー）
  - `SUPABASE_SERVICE_ROLE_KEY`（書き込み用サービスロールキー）
- 関数内で実際に受け取れているか、冒頭で `console.log(process.env.SUPABASE_URL, …)` を出力して確認

---

## 4. Supabase クライアント初期化

```ts
// 読み取り only
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// 書き込みを伴う API （track）ではサービスロールキーを使用
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

---

## 5. CORS 対応（Functions レイヤーで OK）

```ts
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
if (req.method === 'OPTIONS') return res.status(204).end();
```

---

## 6. GitHub & Vercel の連携設定

- Production Branch を開発中の **hara_20250611** ブランチに変更
- 新しい公開ドメインは Vercel 設定画面 → General → Project Name や Domains で `hara0511toppage.vercel.app` 等を登録
- 
  ```bash
  git push origin hara_20250611
  ```
  すると自動デプロイ＋本番反映される

---

## 7. デバッグ＆トラブルシュート

- **ターミナルをクリア：**
  ```bash
  npx kill-port 5173 3000
  ```
  で残プロセスを掃除

- **Vercel ローカルキャッシュ削除（PowerShell）：**
  ```powershell
  Remove-Item -Recurse -Force .vercel
  npx vercel logout
  npx vercel login
  ```

- **ログ確認：** Vercel ダッシュボードの Functions > Logs で環境変数やエラーを追う
- **ブラウザキャッシュ無効化 & 拡張機能オフ**
