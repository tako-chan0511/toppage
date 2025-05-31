<!-- src/components/GameStats.vue -->
<template>
  <div class="stats">
    <span>
      👁‍🗨
      <template v-if="views === null">Loading...</template>
      <template v-else-if="views < 0">Error</template>
      <template v-else>{{ views }}</template>
    </span>
    <button @click="onLike">
      👍
      <template v-if="likes === null">Loading...</template>
      <template v-else-if="likes < 0">Error</template>
      <template v-else>{{ likes }}</template>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Vercel（本番）も含めて使えるように「ベース URL を空文字」にする
const API_BASE = ''

const props = defineProps<{ gameId: string }>()

const views = ref<number | null>(null)
const likes = ref<number | null>(null)

onMounted(async () => {
  try {
    // ① 現在のビュー数を取得
    const resView = await axios.get(
      `${API_BASE}/api/get-count`,
      { params: { game: props.gameId, field: 'views' } }
    )
    views.value = resView.data.count

    // ② ビュー＋1
    const { data: trackData } = await axios.get(
      `${API_BASE}/api/track`,
      { params: { game: props.gameId } }
    )
    views.value = trackData.views

    // ③ いいね数を取得
    const resLike = await axios.get(
      `${API_BASE}/api/get-count`,
      { params: { game: props.gameId, field: 'likes' } }
    )
    likes.value = resLike.data.count
  } catch (e) {
    console.error('[GameStats] onMounted error:', e)
    views.value = -1
    likes.value = -1
  }
})

async function onLike() {
  try {
    const { data } = await axios.get(
      `${API_BASE}/api/like`,
      { params: { game: props.gameId } }
    )
    if (data.ok) {
      likes.value = data.likes
    }
  } catch (e) {
    console.error('[GameStats] onLike error:', e)
  }
}
</script>
