// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 開発ツールの有効化
  devtools: { enabled: true },

  // モジュールの登録
  modules: ['@nuxtjs/supabase'],

  // Supabase モジュールの設定
  // モジュールが内部で自動的に接続を確立するために必要です
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false // 認証によるリダイレクトを無効化
  },

  // サーバーサイド（Nitro）で環境変数を扱うための設定
  runtimeConfig: {
    // server/api 内で useRuntimeConfig() を通じて取得可能になります
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    
    // クライアントサイドでも必要な場合は public 内に記述します
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },

  // Nuxt の動作互換性の日付設定
  compatibilityDate: '2024-04-03'
})