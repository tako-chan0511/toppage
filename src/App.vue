// src/App.vue（更新）
<template>
  <div id="app">
    <Header />
    <main>
      <!-- <h1>🎮 ゲームハブ</h1> -->
      <GameList :games="games" />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import GameList from '@/components/GameList.vue'
import { games } from '@/data/games'
</script>

<style>
main {
  padding: 2rem;
}
</style>