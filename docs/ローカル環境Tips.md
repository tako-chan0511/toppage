# ローカル環境Tips

「リモート（Vercel）では正常に動くが、ローカルでは白画面になる」問題の発生～解決までを、簡潔に時系列でまとめます。

---

## 状況の確認

- GitHub にプッシュすると、Vercel 上ではフロント（Vue＋Vite）もバックエンド（API）も正常動作。
- しかしローカルで `npx vercel dev` を実行しても、ブラウザで `http://localhost:3000` にアクセスすると真っ白。
- API自体は `http://localhost:3000/api/get-count?...` で正常応答。

---

## 原因の切り分け

- Vite と API を同じポート（3000）でまとめる仕組み自体は正しい。
- しかし、`vite.config.ts` の中で
    - `server.port` に `process.env.PORT` を使わせていた
    - または `assetsInclude: ['**/*.html']` を入れていた
- そのため、ビルド時に `index.html` が誤って「静的アセット」ではなくJSモジュールとして扱われてしまった。

#### その結果（Vercel ローカル実行時の流れ）

1. Vite が本来 5173 で起動すべきところ、`PORT=3000` を拾って 3000 で起動
2. `assetsInclude` の影響で `index.html` が `/assets/index-<hash>.html` というJSライクなファイルに
3. 結果としてブラウザに「export default '/assets/index-<hash>.html'」と表示されてしまう

---

## 最低限の修正ポイント

### 1. `vite.config.ts` の `port` 設定を固定で 5173 に戻す

```diff
// 誤っていた例：
server: {
-  port: Number(process.env.PORT) || 5173, // ← ここで process.env.PORT=3000 を拾ってしまっていた
   …
}

// 修正後（常に 5173）：
server: {
  port: 5173,
  strictPort: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

こうすることで、ローカルでは Vite が必ず 5173 で立ち上がり、API呼び出しは `/api` → `http://localhost:3000` へ正しくプロキシされる。

---

### 2. `assetsInclude: ['**/*.html']` を削除する

- これにより、ビルド時に `index.html` が「静的 HTML」としてそのまま `dist/index.html` に出力され、誤って「JSモジュール化」される事態を防ぐ。

---

### 3. `vercel.json` の `devCommand: "npm run dev"` をそのまま維持

- `npx vercel dev` を打つと、
    - まずバックエンド（API）が3000番で立ち上がる
    - 同時に `npm run dev`（Viteが5173で立ち上がる）が動く
    - Vercel CLIが「localhost:3000 → localhost:5173（フロント）＋ localhost:3000/api（API）」を同一ドメインにまとめる

---

## 最終的な挙動

- ローカルで `npx vercel dev` を実行 → ターミナルに

    ```
    VITE v6.x.x  ready in XXX ms
      ➜  Local:   http://localhost:3000/
    Ready! Available at http://localhost:3000
    ```

- ブラウザで `http://localhost:3000` を開くと、Vueアプリの画面が正しく表示される
- `/api/...` へのリクエストもそのまま `http://localhost:3000/api/...` に届き、バックエンドが正しく応答

---

## ポイントのおさらい

- 「Viteはローカルで必ず5173を使う」ように固定する  
  → `process.env.PORT`によって3000に上書きされないようにする
- `assetsInclude`による「index.htmlのモジュール化」を解除する  
  → ビルド後も`index.html`が純粋なHTMLとして出力されるようにする
- Vercel CLI（`npx vercel dev`）は「フロントの5173＋APIの3000」を自動でマージし、最終的に「ブラウザからはすべて3000で見える」ようにしてくれる  
  → 運用としては「ターミナルは`npx vercel dev`を一回だけ実行」、ブラウザを`http://localhost:3000`にすれば開発中も本番に近い挙動で確認できる

---

以上が今回の一連の流れです。  
これを踏まえれば、リモートでは問題なく動くのにローカルで真っ白になる、という状況は再現しなくなります。