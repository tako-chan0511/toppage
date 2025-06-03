<!-- src/components/GameStats.vue -->
<template>
  <div class="stats">
    <span>
      👁‍🗨
      <template v-if="views === null">Loading…</template>
      <template v-else-if="views < 0">Error</template>
      <template v-else>{{ views }}</template>
    </span>
    <button @click="onLike">
      👍
      <template v-if="likes === null">Loading…</template>
      <template v-else-if="likes < 0">Error</template>
      <template v-else>{{ likes }}</template>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

const props = defineProps<{ gameId: string }>()

const views = ref<number | null>(null)
const likes = ref<number | null>(null)

/**
 * 指定フィールド（'views' or 'likes'）の現在値を API から取得
 */
async function fetchCount(field: 'views' | 'likes'): Promise<number> {
  try {
    const res = await axios.get('/api/get-count', {
      params: { game: props.gameId, field }
    })
    return res.data.count as number
  } catch (e) {
    console.error(`[GameStats] fetchCount("${field}") error:`, e)
    return -1
  }
}

/**
 * 初回マウント時の処理：views を +1（track）、その後両方を取得
 */
async function initStats() {
  try {
    // (1) track API で views +1
    await axios.get('/api/track', {
      params: { game: props.gameId }
    })

    // (2) 最新の views / likes を取得して反映
    views.value = await fetchCount('views')
    likes.value = await fetchCount('likes')
  } catch (e) {
    console.error('[GameStats] initStats error:', e)
    views.value = -1
    likes.value = -1
  }
}

/**
 * いいねボタン押下時の処理：like API → 返ってきた最新 likes を反映
 */
async function onLike() {
  try {
    const { data } = await axios.get('/api/like', {
      params: { game: props.gameId }
    })
    if (data.ok) {
      likes.value = data.likes as number
    }
  } catch (e) {
    console.error('[GameStats] onLike error:', e)
    likes.value = -1
  }
}

/**
 * “view-updated” カスタムイベントを受け取ったときのハンドラ
 * detail に { game: string, views: number } が入っている前提
 */
function onViewUpdated(event: Event) {
  const ev = event as CustomEvent<{ game: string; views: number }>
  if (ev.detail.game === props.gameId) {
    views.value = ev.detail.views
  }
}

onMounted(() => {
  initStats()
  // カスタムイベントを購読
  window.addEventListener('view-updated', onViewUpdated as EventListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('view-updated', onViewUpdated as EventListener)
})
</script>

<style scoped>
.stats {
  display: flex;
  gap: 1rem;
  align-items: center;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
