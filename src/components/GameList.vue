<!-- src/components/GameList.vue -->
<template>
  <div class="game-list">
    <div
      v-for="game in games"
      :key="game.id"
      class="game-item"
    >
      <h2><a :href="game.url" target="_blank">{{ game.title }}</a></h2>
      <p>{{ game.description }}</p>
      <div class="links">
        <a :href="game.url" target="_blank">PLAY</a>
        <a v-if="game.demoUrl" :href="game.demoUrl" target="_blank">DEMO</a>
        <a v-if="game.repo" :href="`https://github.com/${game.repo}`" target="_blank">REPO</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GameInfo } from '@/data/games'
// 修正後：分割代入で直接 games を取り出す
const { games } = defineProps<{ games: GameInfo[] }>()
</script>

<style scoped>
.game-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;              /* 各アイテム間のスペース */
  padding: 0;
  margin: 0;
}
.game-item {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.game-item h2 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}
.game-item p {
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}
.links a {
  margin-right: 0.5rem;
  font-size: 0.8rem;
  color: #0066cc;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
@media (max-width: 1024px) {
  /* タブレット以下で３列に */
  .game-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  /* スマホ縦画面は２列に */
  .game-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  /* 小さいスマホは１列に */
  .game-list {
    grid-template-columns: 1fr;
  }
}
</style>
