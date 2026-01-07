<template>
  <div class="game-card">
    <h2>{{ game.title }}</h2>
    <p class="description">{{ game.description }}</p>
    <div class="links">
      <a href="#" @click.prevent="handleClick(game.url)">▶ Play</a>
      <a v-if="game.demoUrl" href="#" @click.prevent="handleClick(game.demoUrl!)">📺 Demo</a>
      <a v-if="game.repo" href="#" @click.prevent="handleClick(`https://github.com/${game.repo}`)">📂 GitHub</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GameInfo } from '~/data/games'

const { game } = defineProps<{ game: GameInfo }>()

async function handleClick(url: string) {
  // 1) ポップアップブロック回避のため先に開く
  const newWindow = window.open('about:blank', '_blank')
  if (!newWindow) return

  try {
    // 2) track API を叩く (Nuxt 3 の $fetch)
    const data = await $fetch<{ views: number }>('/api/track', {
      query: { game: game.id }
    })

    // 3) 他のコンポーネント(GameStats)に通知
    window.dispatchEvent(new CustomEvent('view-updated', {
      detail: { game: game.id, views: data.views }
    }))
  } catch (e) {
    console.error('[GameItem] track error:', e)
  }

  // 4) リダイレクト
  const gtag = (window as any).gtag
  if (typeof gtag === 'function') {
    gtag('event', 'outbound_click', {
      event_category: 'Game Hub',
      event_label: url,
      event_callback: () => { newWindow.location.href = url }
    })
    setTimeout(() => { newWindow.location.href = url }, 500)
  } else {
    newWindow.location.href = url
  }
}
</script>

<style scoped>
.game-card { padding: 1rem; border: 1px solid #ddd; border-radius: 0.5rem; background: #fff; margin-bottom: 1rem; }
.links { display: flex; gap: 0.5rem; }
.links a { flex: 1; display: inline-block; padding: 0.6rem 0; background-color: #42b983; color: #fff !important; text-align: center; border-radius: 0.5rem; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: background-color 0.2s; }
.links a:hover { background-color: #369c6e; }
.description { color: #333; margin: 0.5rem 0 1rem; font-size: 0.9rem; }
</style>