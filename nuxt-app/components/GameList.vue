<template>
  <div class="game-list">
    <div
      v-for="game in games"
      :key="game.id"
      class="game-item-wrapper"
    >
      <GameItem :game="game" />
      <GameStats :gameId="game.id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GameInfo } from '~/data/games'

// Props 定義
defineProps<{ games: GameInfo[] }>()
</script>

<style scoped>
.game-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 0;
  margin: 0;
}
.game-item-wrapper {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
}
.game-item-wrapper:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* レスポンシブ対応 */
@media (max-width: 1024px) { .game-list { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .game-list { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .game-list { grid-template-columns: 1fr; } }
</style>