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
        モダンなVue3とReactで勉強がてらに作ったゲームポータルです。<br>
        ゲームのホスティングはGitHub-PagesとVercelを活用しています。<br>
        ソースやアーキテクチャはGitHubボタンで確認してください。
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
  max-width: 700px;
  font-size: 1.5rem;
  color: #ddd;
  text-align: left;
}
</style>
