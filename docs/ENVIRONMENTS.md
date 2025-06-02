Toppage 環境構築まとめ
以下、今回 GitHub に記載する「Toppage の環境構築説明書」です。
そのまま README.md や Wiki、ドキュメントとしてコピーして使えます。

目次
プロジェクト構成と各サービスの役割

Supabase（DB）設定

Vite（ローカル開発）の構成

Vercel へのデプロイ

GitHub Pages との関係

まとめ：環境構築のポイント

プロジェクト構成と各サービスの役割
pgsql
コピーする
編集する
toppage/
├─ api/                     ← Vercel Functions（サーバーレス API）
│   ├─ get-count.ts         ← “views”／“likes”を返すエンドポイント
│   ├─ track.ts             ← “views”を +1 するエンドポイント
│   └─ like.ts              ← “likes”を +1 するエンドポイント
│
├─ public/                  ← 静的資産（favicon、index.html）
│   └─ index.html
│
├─ src/                     ← フロントエンド（Vue + TypeScript + Vite）
│   ├─ main.ts
│   ├─ App.vue
│   ├─ data/
│   │   └─ games.ts
│   └─ components/
│       ├─ GameList.vue
│       ├─ GameItem.vue
│       └─ GameStats.vue   ← “views”/“likes” を表示・リアルタイム更新
│
├─ vite.config.ts           ← Vite の設定（開発サーバのポート、HTML をアセット扱いに）
├─ package.json
├─ tsconfig.json
├─ .env.development         ← ローカル開発用環境変数
└─ vercel.json              ← Vercel デプロイ設定
api/ 配下

サーバーレス関数として Vercel 上にデプロイされる TypeScript ファイル群。

get-count.ts

/api/get-count?game=XXX&field=views などで “views” または “likes” の現在数を返す

track.ts

/api/track?game=XXX で DB の “views” を +1 し、新しい値を返す

like.ts

/api/like?game=XXX で DB の “likes” を +1 し、新しい値を返す

src/ 配下（Vue＋TypeScript＋Vite）

GameStats.vue

API を呼び出し、各ゲームの view/like カウントを取得して表示・リアルタイム更新

GameList.vue

ゲーム一覧を表示し、各アイテムに対して GameStats を埋め込む

GameItem.vue

各ゲームへのリンク（Play/Demo/Repo）を表示し、クリック時に GA4 のトラッキングを行う

vercel.json

"builds"：静的ビルド（npm run build → dist/）とサーバーレス関数（api/**/*.ts）を定義

"routes"：

/api/* → api/ 内の TS ファイルにルーティング

それ以外 → index.html（SPA）を返す

.env.development / .env.production

SUPABASE_URL / SUPABASE_KEY：Supabase プロジェクトへの接続情報

VITE_API_BASE（ローカル開発時のみ）：http://localhost:3000 を指定することでフロントがローカルの API を呼べるようにする

Supabase（DB）設定
テーブル定義

テーブル名：page_views

カラム：

game (text) ― ゲームを一意に表す文字列（例："tetris-vue"）

views (integer, default=0) ― 閲覧数

likes (integer, default=0) ― いいね数

game カラムに対してユニーク制約を張り（PRIMARY KEY または UNIQUE）、
upsert({ game, views }) などが動作するようにする

API からの操作

get-count.ts

ts
コピーする
編集する
const { data, error } = await supabase
  .from('page_views')
  .select(field)
  .eq('game', game)
  .single()

// error.code === 'PGRST116' は「行なし」なので 0 扱いにできる
track.ts

ts
コピーする
編集する
// 既存の views を取得
const { data, error: selErr } = await supabase
  .from('page_views')
  .select('views')
  .eq('game', game)
  .single()

const currentViews = data ? data.views : 0
const newViews = currentViews + 1

// upsert で更新または新規挿入
await supabase
  .from('page_views')
  .upsert({ game, views: newViews }, { onConflict: 'game' })
like.ts

ts
コピーする
編集する
// 既存の likes を取得
const { data, error: selErr } = await supabase
  .from('page_views')
  .select('likes')
  .eq('game', game)
  .single()

const currentLikes = data ? data.likes : 0
const newLikes = currentLikes + 1

// upsert で更新または新規挿入
await supabase
  .from('page_views')
  .upsert({ game, likes: newLikes }, { onConflict: 'game' })
CORS 設定（Vercel Functions 内でヘッダーを追加）

ts
コピーする
編集する
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

if (req.method === 'OPTIONS') {
  return res.status(204).end()
}
環境変数の取り扱い

ローカル開発用 (.env.development)

dotenv
コピーする
編集する
SUPABASE_URL="https://<your-project>.supabase.co"
SUPABASE_KEY="<your-supabase-key>"
VITE_API_BASE=http://localhost:3000
PORT=5173       # （任意）Vite 開発サーバのポート
Vercel 本番用（Vercel Dashboard → Environment Variables）

ini
コピーする
編集する
SUPABASE_URL  = https://<your-project>.supabase.co
SUPABASE_KEY  = <your-supabase-key>
フロント側では VITE_API_BASE を設定しない
→ 本番では相対パス /api/... が Vercel の Functions に自動的に届く

Vite（ローカル開発）の構成
vite.config.ts のポイント

ts
コピーする
編集する
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    // Vercel Dev (npx vercel dev) がセットする PORT=3000 を優先、
    // それが無ければ 5173 を使う
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
    // proxy は不要
  },
  // HTML をアセットとして扱い、import-analysis のエラーを防ぐ
  assetsInclude: ['**/*.html'],
})
ローカル起動コマンド

npm run dev → フロントが http://localhost:5173 で起動

npx vercel dev →

Vercel Dev が PORT=3000 を渡すので、Vite は http://localhost:3000 で起動

/api/* へのリクエストは同プロセス内のサーバーレス関数（api/*.ts）に自動ルーティング

フロント側コード（GameStats.vue など）での API 呼び出し例

ts
コピーする
編集する
const API_BASE = import.meta.env.VITE_API_BASE || ''

async function fetchCount(field: 'views' | 'likes'): Promise<number> {
  const url = `${API_BASE}/api/get-count`
  const res = await axios.get(url, {
    params: { game: gameId, field },
  })
  return res.data.count as number
}
ローカル開発中：VITE_API_BASE = http://localhost:3000

Vercel Dev／本番：VITE_API_BASE は空文字 → 相対パス /api/get-count が呼ばれる

Vercel へのデプロイ
vercel.json の内容

jsonc
コピーする
編集する
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "api/**/*.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1.ts" },
    { "handle": "filesystem" },
    { "src": "/(.*)",     "dest": "/index.html" }
  ]
}
静的ビルド（@vercel/static-build）

package.json をトリガーに npm run build → dist/ をデプロイ

サーバーレス関数（@vercel/node）

api/**/*.ts が Node ランタイムにトランスパイルされる

ルーティング設定

/api/* → api/*.ts 関数を実行

そのほか（ファイルシステムにマッチしないパス）は index.html を返す

本番環境での挙動

フロントは https://<project>.vercel.app/ を開くと即座に dist/index.html が返り、Vue SPA が動作

/api/track などを叩くとサーバーレス関数が実行され、Supabase にクエリを送り結果を返す

環境変数は Vercel ダッシュボードで設定済み → process.env.SUPABASE_URL / process.env.SUPABASE_KEY が使われる

GitHub Pages との関係
GitHub Pages は「静的ファイルをホストする」だけの機能

npm run build:gh → vite build --base /toppage/ で dist/ を生成

npm run deploy → gh-pages -d dist で GitHub リポジトリの gh-pages ブランチへデプロイ

その結果、https://<username>.github.io/toppage/ で静的フロント画面だけが公開できる

今回のプロジェクトのパターン

フルスタックを Vercel にまとめる

静的フロント（dist/）もサーバーレス API（api/）も同一ドメイン（Vercel）で動かす

GitHub Pages は不要

フロントだけ GitHub Pages、API は Vercel

.env.production で VITE_API_BASE=https://<your-vercel-domain> を設定

フロントは GitHub Pages（https://<username>.github.io/toppage/）にホスト

API リクエストは Vercel の機能に飛ぶ

ローカル開発では Vercel Dev または Vite のみで完結

まとめ：環境構築のポイント
Supabase テーブル準備

テーブル名：page_views

カラム：game (text, unique), views (integer), likes (integer)

upsert を正しく動かすために game にユニーク制約を付与

ローカル開発環境

.env.development に Supabase 接続情報と VITE_API_BASE=http://localhost:3000 を記載

vite.config.ts で：

ts
コピーする
編集する
server: {
  port: Number(process.env.PORT) || 5173,
  strictPort: true,
},
assetsInclude: ['**/*.html'],
npx vercel dev で PORT=3000 → Vite が http://localhost:3000 で起動。

/api/* は自動的に同プロセスの関数にルーティングされる

Vercel 本番環境

vercel.json で静的ビルドとサーバーレス関数を定義

Vercel Dashboard で SUPABASE_URL / SUPABASE_KEY を登録

本番ではフロントから相対パス /api/* を叩けば自動的に Functions が動く

GitHub Pages の使い方

“フロントだけ” を静的ホスティングしたい場合：

npm run build:gh → gh-pages -d dist

.env.production に VITE_API_BASE=https://<your-vercel-domain> を設定

これにより、フロントは GitHub Pages、API は Vercel という構成も可能

以上を参考にしていただければ、Toppage の開発・本番環境構築がスムーズに行えます。