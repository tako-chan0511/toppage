今回「リモート（Vercel）では正常に動くが、ローカルでは白画面になる」問題の発生～解決までを、できるだけ簡潔に時系列でまとめます。

状況の確認

GitHub にプッシュすると、Vercel 上ではきちんとフロント（Vue＋Vite）もバックエンド（API）が動作する。

ただし、ローカルで npx vercel dev を実行すると、ブラウザで http://localhost:3000 にアクセスしても真っ白。API 自体は http://localhost:3000/api/get-count?... が正常（JSON が返る）なのにフロントが表示されない状態だった。

原因の切り分け

Vite と API を同じポート（3000）にまとめる仕組み自体は正しいが、

vite.config.ts の中で「server.port に process.env.PORT を使わせる or assetsInclude: ['**/*.html'] を入れていた」ため、ビルド時に index.html が誤って「静的アセット（JS モジュール）」として吐き出されるようになっていた。

その結果、Vercel ローカル（npx vercel dev）では以下の流れになっていた：

Vite が本来 5173 で起動すべきところを「環境変数 PORT=3000 を拾って 3000 で起動」

assetsInclude の影響で index.html が /assets/index-<hash>.html という JS ライクなファイルになり、結果としてブラウザに「export default '/assets/index-<hash>.html'」という文字列だけが表示される状態に。

最低限の修正ポイント

vite.config.ts の “port 設定” を固定で 5173 に戻す


// 誤っていた例：
server: {
  port: Number(process.env.PORT) || 5173, // ← ここで process.env.PORT=3000 を拾ってしまっていた
  …
}
↓


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
こうすることで、ローカルでは Vite が必ず 5173 番で立ち上がり、API 呼び出しは /api → http://localhost:3000 へ正しくプロキシされる。

assetsInclude: ['**/*.html'] を削除する

これによって、ビルド時に index.html が「静的 HTML」としてそのまま dist/index.html に出力され、誤って「JS モジュール化」される事態を防ぐ。

vercel.json の devCommand: "npm run dev" をそのまま維持

npx vercel dev を打つと、

まずバックエンド（API）が 3000 番で立ち上がり、

同時に npm run dev（＝Vite が 5173 で立ち上がる）が動き、

内部的に Vercel CLI が「localhost:3000 → localhost:5173（フロント） ＋ localhost:3000/api（API）」を同一ドメインにまとめる仕組みが働く。

最終的な挙動

ローカルで npx vercel dev を実行 → ターミナルに


VITE v6.x.x  ready in XXX ms
  ➜  Local:   http://localhost:3000/
Ready! Available at http://localhost:3000
と表示される

ブラウザで http://localhost:3000 を開くと、Vue アプリの画面が正しく表示される

/api/... へのリクエストもそのまま http://localhost:3000/api/... に届き、バックエンドが正しく応答する

ポイントのおさらい
「Vite はローカルで必ず 5173 を使う」ように固定する
→ process.env.PORT によって 3000 に上書きされないようにする。

assetsInclude による「index.html のモジュール化」を解除する
→ ビルド後も index.html が純粋に HTML として出力されるようにする。

Vercel CLI（npx vercel dev）は「フロントの 5173 ＋ API の 3000」を自動でマージして、最終的に「ブラウザからはすべて 3000 で見える」ようにしてくれる
→ 運用としては、「ターミナルは npx vercel dev を一回だけ実行」し、ブラウザを http://localhost:3000 にすれば開発中も本番に近い挙動で確認できる。

以上が今回の一連の流れです。これを踏まえれば、リモートでは問題なく動くのにローカルで真っ白になる、という状況は再現しなくなります。