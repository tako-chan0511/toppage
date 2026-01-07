// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools はそのままでOK
  devtools: { enabled: true },

  // モジュールの登録
  modules: ['@nuxtjs/supabase'],

  // Supabase モジュールの設定
  supabase: {
    redirect: false
  },

  // サーバーサイド用環境設定
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },

  // 重複を削除し、推奨される日付（2024-04-03）一つに絞る
  compatibilityDate: '2024-04-03'
})