<!-- src/components/GameItem.vue -->
<template>
  <div class="game-item">
    <h2>{{ game.title }}</h2>
    <p class="description">{{ game.description }}</p>
    <div class="links">
      <!-- Play リンク -->
      <a
        :href="game.url"
        target="_blank"
        rel="noopener"
        @click.prevent="trackAndGo(game.url)"
      >
        ▶ Play
      </a>
      <!-- Demo リンク -->
      <a
        v-if="game.demoUrl"
        :href="game.demoUrl"
        target="_blank"
        rel="noopener"
        @click.prevent="trackAndGo(game.demoUrl!)"
      >
        📺 Demo
      </a>
      <!-- Repo リンク -->
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
import type { GameInfo } from '@/data/games'
import { defineProps } from 'vue'

// props から直接 game を受け取る
const { game } = defineProps<{ game: GameInfo }>()

/**
 * 外部リンククリックを GA4 に送信してから遷移する
 * transport_type: 'beacon' と event_callback で送信完了後に開き、
 * タイムアウト保険も入れておく
 */
function trackAndGo(url: string) {
  if (typeof gtag === 'function') {
    gtag('event', 'outbound_click', {
      event_category: 'Game Hub',
      event_label: url,
      transport_type: 'beacon',
      event_callback: () => {
        window.open(url, '_blank')
      }
    })
    // タイムアウト保険：500ms後に飛ばす
    setTimeout(() => {
      window.open(url, '_blank')
    }, 500)
  } else {
    // gtag がなければそのまま開く
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
/* 説明文はデフォルト白文字 */
.description {
  color: #fff;
}
/* モバイル（幅480px以下）では読みやすいダークテキストに */
@media (max-width: 480px) {
  .game-item .description {
    color: #222 !important;
  }
}
</style>
