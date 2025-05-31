<template>
  <div class="stats">
    <!-- ページビュー数 -->
    <span>👁‍🗨 {{ views }}</span>

    <!-- いいね数 -->
    <button @click="onLike">👍 {{ likes }}</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 開発中の API ベース URL（ローカル環境）
const API_BASE = 'http://localhost:3000'

const props = defineProps<{ gameId: string }>()

const views = ref(0)
const likes = ref(0)

onMounted(async () => {
  // 1) 「現在のビュー数」を取得して表示
  const resView = await axios.get(`${API_BASE}/api/get-count`, {
    params: { game: props.gameId, field: 'views' }
  })
  views.value = resView.data.count

  // 2) 「ビュー数を +1」してから画面表示も +1
  const { data: trackData } = await axios.get(`${API_BASE}/api/track`, {
    params: { game: props.gameId }
  })
  views.value = trackData.views

  // 3) 「現在のいいね数」を取得して表示
  const resLike = await axios.get(`${API_BASE}/api/get-count`, {
    params: { game: props.gameId, field: 'likes' }
  })
  likes.value = resLike.data.count
})

async function onLike() {
  // クリックごとにいいねを +1 し、新しい値を受け取って画面更新
  const { data } = await axios.get(`${API_BASE}/api/like`, {
    params: { game: props.gameId }
  })
  if (data.ok) {
    likes.value = data.likes
  }
}
</script>

<style scoped>
.stats {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
