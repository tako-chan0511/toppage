<!-- src/components/GameItem.vue -->
<template>
  <div class="game-item">
    <h2>{{ game.title }}</h2>
    <p class="description">{{ game.description }}</p>
    <div class="links">
      <!-- Play -->
      <a
        href="#"
        @click.prevent="handleClick(game.url)"
      >
        ▶ Play
      </a>

      <!-- Demo -->
      <a
        v-if="game.demoUrl"
        href="#"
        @click.prevent="handleClick(game.demoUrl!)"
      >
        📺 Demo
      </a>

      <!-- Repo -->
      <a
        v-if="game.repo"
        href="#"
        @click.prevent="handleClick(`https://github.com/${game.repo}`)"
      >
        📂 GitHub
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import type { GameInfo } from '@/data/games'
import { defineProps } from 'vue'

// gtag をグローバル変数として認識
declare const gtag: (...args: any[]) => void

const { game } = defineProps<{ game: GameInfo }>()

/**
 * クリック時の処理
 * 1) /api/track を叩いて views を +1
 * 2) カスタムイベント "view-updated" を window に dispatch（GameStats 側がこれを受け取る）
 * 3) GA4 イベントを送ったあと、window.open(url) で外部ページを開く
 */
async function handleClick(url: string) {
  console.log('[GameItem] handleClick start, game.id=', game.id)
  try {
    const { data } = await axios.get('/api/track', {
      params: { game: game.id }
    })
    console.log('[GameItem] /api/track response:', data)
    // ここで新しい views 値をイベントとして流す
    window.dispatchEvent(new CustomEvent('view-updated', {
      detail: {
        game: game.id,
        views: data.views as number
      }
    }))
  } catch (e) {
    console.error('[GameItem] track error:', e)
  }

  // GA4の outbound_click トラッキング (あれば)
  if (typeof gtag === 'function') {
    ;(window as any).gtag('event', 'outbound_click', {
      event_category: 'Game Hub',
      event_label: url,
      transport_type: 'beacon',
      event_callback: () => {
        window.open(url, '_blank')
      }
    })
    // 念のため 500ms 後に確実に開く
    setTimeout(() => {
      window.open(url, '_blank')
    }, 500)
  } else {
    // GA4 がなければ即座に開く
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

.links {
  display: flex;
  gap: 0.5rem;
}
.links a {
  flex: 1;
  display: inline-block;
  padding: 0.6rem 0;
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

.description {
  color: #333;
  margin: 0.5rem 0 1rem;
  font-size: 0.9rem;
}
</style>
