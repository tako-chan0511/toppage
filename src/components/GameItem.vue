<!-- src/components/GameItem.vue -->
<template>
  <div class="game-item">
    <!-- タイトルの先頭にアイコン挿入 -->
    <h2>{{ game.title }}</h2>
    <p class="description">{{ game.description }}</p>
    <div class="links">
      <!-- Play -->
      <a
        class="btn btn-play"
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
        class="btn btn-demo"
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
        class="btn btn-repo"
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
    setTimeout(() => {
      window.open(url, '_blank')
    }, 500)
  } else {
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

.links {
  margin-top: 0.5rem;
}
.btn {
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 4px;
  background-color: #42b983;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: background-color .2s;
}
.btn-play {
  background-color: #42b983;
  color: #fff;
}
.btn-demo {
  background-color: #ffae00;
  color: #fff;
}
.btn-repo {
  background-color: #333;
  color: #fff;
}
.btn:hover { background-color: #36a36d; }

.description {
  color: #555;
  margin: 0.5rem 0;
}
@media (max-width: 480px) {
  .game-item .description {
    color: #222 !important;
  }
}
</style>
