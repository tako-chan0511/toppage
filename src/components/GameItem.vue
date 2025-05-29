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
        📂 GitHub
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
// gtag をグローバル変数として認識
declare const gtag: (...args: any[]) => void

import type { GameInfo } from '@/data/games'
import { defineProps } from 'vue'

// props から game を直接取り出し
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
    // 保険として遅延オープン
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
  border-radius: 0.5rem;
  background: #fff;
  margin-bottom: 1rem;
}

/* Step2: ボタンを横並び＆同じサイズに */
.links {
  display: flex;
  gap: 0.5rem;
}
.links a {
  flex: 1;                           /* 幅を均等に */
  display: inline-block;
  padding: 0.6rem 0;                 /* 上下に余白を揃える */
  background-color: #42b983;
  color: #fff !important;
  text-align: center;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s;
}
.links a:hover {
  background-color: #369c6e;
}

/* 説明文 */
.description {
  color: #333;
  margin: 0.5rem 0 1rem;
  font-size: 0.9rem;
}
</style>
