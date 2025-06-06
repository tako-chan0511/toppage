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
  console.log(`[GameStats] fetchCount("${field}") start`)
  try {
    const res = await axios.get('/api/get-count', {
      params: { game: props.gameId, field }
    })
    console.log(`[GameStats] fetchCount("${field}") response:`, res.data.count)
    return res.data.count as number
  } catch (e) {
    console.error(`[GameStats] fetchCount("${field}") error:`, e)
    return -1
  } finally {
    console.log(`[GameStats] fetchCount("${field}") end`)
  }
}

/**
 * 初回マウント時の処理：views/likes を取得（ビューの +1 は外部で制御）
 */
async function initStats() {
  console.log('[GameStats] initStats start')
  try {
    views.value = await fetchCount('views')
    console.log('[GameStats] views set to', views.value)
    likes.value = await fetchCount('likes')
    console.log('[GameStats] likes set to', likes.value)
  } catch (e) {
    console.error('[GameStats] initStats error:', e)
    views.value = -1
    likes.value = -1
  } finally {
    console.log('[GameStats] initStats end')
  }
}

/**
 * いいねボタン押下時の処理：like API → 返ってきた最新 likes を反映
 */
async function onLike() {
  console.log('[GameStats] onLike start')
  try {
    const { data } = await axios.get('/api/like', {
      params: { game: props.gameId }
    })
    console.log('[GameStats] onLike response:', data)
    if (data.ok) {
      likes.value = data.likes as number
      console.log('[GameStats] likes updated to', likes.value)
    }
  } catch (e) {
    console.error('[GameStats] onLike error:', e)
    likes.value = -1
  } finally {
    console.log('[GameStats] onLike end')
  }
}

/**
 * “view-updated” カスタムイベントを受け取ったときのハンドラ
 * detail に { game: string, views: number } が入っている前提
 */
function onViewUpdated(event: Event) {
  const ev = event as CustomEvent<{ game: string; views: number }>
  console.log('[GameStats] onViewUpdated event:', ev.detail)
  if (ev.detail.game === props.gameId) {
    views.value = ev.detail.views
    console.log('[GameStats] views updated to', views.value)
  }
}

onMounted(() => {
  console.log('[GameStats] onMounted')
  initStats()
  // カスタムイベントを購読
  window.addEventListener('view-updated', onViewUpdated as EventListener)
})

onBeforeUnmount(() => {
  console.log('[GameStats] onBeforeUnmount')
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
