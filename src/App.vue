<!-- src/App.vue -->
<template>
  <div class="container">
    <h1>🎮 ゲームハブ</h1>
    <GameList :games="games" />
  </div>
</template>

<script lang="ts" setup>
import GameList from '@/components/GameList.vue'
import { games } from '@/data/games'
</script>

<style>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
