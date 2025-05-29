<!-- src/components/Header.vue -->
<template>
  <header class="site-header">
    <div class="logo-area">
      <a href="/" class="logo-text">🎮 Game Hub</a>
      <p class="tagline">
        　　　モダンなJavaScriptフレームワーク（Vue3＆React）を学ぶ2ために、  
        さまざまなゲームを作ってみました。
      </p>
    </div>
    <nav class="main-nav">
      <!-- <a href="#games">ゲーム一覧</a> -->
      <a href="https://github.com/tako-chan0511" target="_blank" rel="noopener">GitHub</a>
    </nav>
    <button class="menu-toggle" @click="$emit('toggle-menu')">☰</button>
  </header>
</template>

<script lang="ts" setup>
// 何も書かなくてもOK。mobile用のメニュー制御が必要ならここで emit を受け取ります。
</script>

<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: #fff;
  flex-wrap: wrap;
}
.logo-area {
  max-width: 60%;
}
.logo-text {
  font-size: 1.75rem;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
}
.tagline {
  margin: 0.25rem 0 0;
  font-size: 1.0rem;
  color: #ccc;
  line-height: 2.0;
}
.main-nav {
  display: flex;
  gap: 1rem;
}
.main-nav a {
  color: inherit;
  text-decoration: none;
  font-size: 0.95rem;
}
.main-nav a:hover {
  text-decoration: underline;
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: inherit;
  cursor: pointer;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .main-nav {
    display: none;
  }
  .menu-toggle {
    display: block;
  }
  .logo-area {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
