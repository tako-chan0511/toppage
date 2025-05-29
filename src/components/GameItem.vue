<!-- src/components/GameItem.vue -->
<template>
  <div class="game-item">
    <h2>{{ game.title }}</h2>
    <p class="description">{{ game.description }}</p>
    <div class="links">
      <!-- Play -->
      <a
        :href="game.url"
        target="_blank"
        rel="noopener"
        @click.prevent="trackAndGo(game.url)"
      >
        ▶ Play
      </a>
      <!-- Demo -->
      <a
        v-if="game.demoUrl"
        :href="game.demoUrl"
        target="_blank"
        rel="noopener"
        @click.prevent="trackAndGo(game.demoUrl!)"
      >
        📺 Demo
      </a>
      <!-- Repo -->
      <a
        v-if="game.repo"
        :href="`https://github.com/${game.repo}`"
        target="_blank"
        rel="noopener"
        @click.prevent="trackAndGo(`https://github.com/${game.repo}`)"
      >
        📂 Repo
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
// gtag をグローバル変数として認識させる宣言
declare const gtag: (...args: any[]) => void

import type { GameInfo } from '@/data/games'
import { defineProps } from 'vue'

// props から game を直接取り出す
const { game } = defineProps<{ game: GameInfo }>()

/**
 * 外部リンククリックを GA4 に送信してから遷移するヘルパー
 */
function trackAndGo(url: string) {
  if (typeof gtag === 'function') {
    gtag('event', 'outbound_click', {
      event_category: 'Game Hub',
      event_label: url,
      transport_type: 'beacon',
      event_callback: () => {
        window.open(url, '_blank')
      },
    })
    // 万一に備えたタイムアウト保険
    setTimeout(() => {
      window.open(url, '_blank')
    }, 500)
  } else {
    // gtag が無ければ普通に遷移
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.game-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 1rem;
}
.links a {
  margin-right: 0.5rem;
  color: #42b983;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
/* デフォルト白文字 */
.description {
  color: #fff;
}
/* モバイル（幅480px以下）ではダークテキストに */
@media (max-width: 480px) {
  .game-item .description {
    color: #222 !important;
  }
}
</style>
