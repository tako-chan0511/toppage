<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__logo">
        <!-- たこちゃんアイコンに title をつける -->
        <span
          class="header__icon"
          title="
モダンなJavaScriptフレームワークである Vue 3 と React の学習を兼ねて作成したゲームポータルです。
ホスティングには GitHub Pages（静的）と Vercel＋Supabase（動的）を併用し、
トップページは Vercel（Vue＋FaaS［サーバーレス関数］）と Supabase（PostgreSQL の BaaS）で構成しています。
フロントエンドとバックエンドの通信には axios を活用し、アクセス数やいいね数といった動的データを扱える仕組みを構築しました。
サーバーレス関数（Vercel Functions）を用いて API エンドポイントを実装し、Supabase と連携しています。
ソースコードやアーキテクチャの詳細は画面下部（フッター）の GitHub ボタンからご覧いただけます。
機能追加やご要望がありましたら、フッターに記載されているメールアドレスまでお気軽にお知らせください。
          "
        >🐙</span>
        <h1 class="header__title">Game Hub</h1>
      </div>

      <!-- <p class="header__subtitle">…</p> を削除しておくか、コメントアウトしておきましょう -->
    </div>
  </header>
</template>

<script lang="ts" setup>
// ロジックは不要です
</script>

<style scoped>
.header {
  background-color: #1a1a1a;
  padding: 1.5rem 2rem;
}
.header__inner {
  max-width: 1280px;
  margin: 0 auto;
}
.header__logo {
  display: flex;
  align-items: center;
}
.header__icon {
  font-size: 3rem;
  margin-right: 0.5rem;

  /* タイトル表示を分かりやすくするためにカーソルを「？」（ヘルプ）アイコンに */
  cursor: help;
}
.header__title {
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  margin: 0;
}
/* もともとあった .header__subtitle は不要になるので削除 or コメントアウトしてください */
</style>
