<!-- src/components/GameStats.vue -->
<template>
  <div class="stats">
    <span>👁‍🗨 {{ views }}</span>
    <button @click="onLike">👍 {{ likes }}</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps<{ gameId: string }>()

const views = ref(0)
const likes = ref(0)

// 初回マウント時に取得・カウントアップ
onMounted(async () => {
  await axios.get('/api/track', { params: { game: props.gameId } })
  const { data } = await axios.get('/api/get-count', { params: { game: props.gameId } })
  views.value = data.count
  likes.value = data.count
})

async function onLike() {
  const { data } = await axios.get('/api/like', { params: { game: props.gameId } })
  if (data.ok) likes.value = data.count
}
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
