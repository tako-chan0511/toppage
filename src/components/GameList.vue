<!-- src/components/GameList.vue -->
<template>
  <div class="game-list">
    <GameItem
      v-for="game in games"
      :key="game.id"
      :game="game"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { GameInfo } from '@/data/games'
import GameItem from '@/components/GameItem.vue'  // ここが必須

const { games } = defineProps<{ games: GameInfo[] }>()
</script>

<style scoped>
.game-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 0;
  margin: 0;
}
.game-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.game-item:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* レスポンシブ対応 */
@media (max-width: 1024px) {
  .game-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .game-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .game-list {
    grid-template-columns: 1fr;
  }
}
</style>
