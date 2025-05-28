<!-- src/components/GameItem.vue -->
<template>
  <div class="game-item">
    <h2>{{ game.title }}</h2>
    <p>{{ game.description }}</p>
    <div class="links">
      <a :href="game.url" target="_blank" rel="noopener">▶ Play</a>
      <a
        v-if="game.demoUrl"
        :href="game.demoUrl"
        target="_blank"
        rel="noopener"
      >
        📺 Demo
      </a>
      <a
        v-if="game.repo"
        :href="`https://github.com/${game.repo}`"
        target="_blank"
        rel="noopener"
      >
        📂 Repo
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GameInfo } from '@/data/games'
import { defineProps } from 'vue'

const props = defineProps<{
  game: GameInfo
}>()
</script>

<style scoped>
.game-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.links a {
  margin-right: 0.5rem;
  color: #42b983;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
</style>
