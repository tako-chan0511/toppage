<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__logo">
        <!-- たこちゃんアイコン -->
        <span class="header__icon">🐙</span>
        <h1 class="header__title">Game Hub</h1>
      </div>
      <p class="header__subtitle">
  モダンなJavaScriptフレームワークである Vue 3 と React の学習を兼ねて作成したゲームポータルです。<br>
  ホスティングには GitHub Pages（静的）と Vercel＋Supabase（動的）を併用し、<br>
  トップページは Vercel（Vue＋FaaS［サーバーレス関数］）と Supabase（PostgreSQL の BaaS）で構成しています。<br>
  フロントエンドとバックエンドの通信には axios を活用し、アクセス数やいいね数といった動的データを扱える仕組みを構築しました。<br>
  サーバーレス関数（Vercel Functions）を用いて API エンドポイントを実装し、Supabase と連携しています。<br>
  ソースコードやアーキテクチャの詳細は画面下部（フッター）の GitHub ボタンからご覧いただけます。<br>
  機能追加やご要望がありましたら、フッターに記載されているメールアドレスまでお気軽にお知らせください。<br>
      </p>
    </div>
  </header>
</template>

<script lang="ts" setup>
// 特にロジック不要
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
}
.header__title {
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  margin: 0;
}
.header__subtitle {
  /* 右左を auto にして要素自体を中央寄せ、要素内テキストは左揃え */
  margin: 0.75rem auto 0;
  max-width: 1200px;
  font-size: 1.2rem;
  color: #ddd;
  text-align: left;
}
</style>
