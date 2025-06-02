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
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps<{ gameId: string }>();
const views = ref<number | null>(null);
const likes = ref<number | null>(null);

async function fetchCount(field: 'views' | 'likes'): Promise<number> {
  try {
    const res = await axios.get('/api/get-count', {
      params: { game: props.gameId, field },
    });
    return res.data.count as number;
  } catch (e) {
    console.error(`[GameStats] fetchCount("${field}") error:`, e);
    return -1;
  }
}

async function initStats() {
  try {
    // (1) まず track（views+1） を叩く
    await axios.get('/api/track', { params: { game: props.gameId } });

    // (2) 最新の views / likes を取得して反映
    views.value = await fetchCount('views');
    likes.value = await fetchCount('likes');
  } catch (e) {
    console.error('[GameStats] initStats error:', e);
    views.value = -1;
    likes.value = -1;
  }
}

async function onLike() {
  try {
    const { data } = await axios.get('/api/like', { params: { game: props.gameId } });
    if (data.ok) {
      likes.value = data.likes as number;
    }
  } catch (e) {
    console.error('[GameStats] onLike error:', e);
    likes.value = -1;
  }
}

onMounted(initStats);
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
