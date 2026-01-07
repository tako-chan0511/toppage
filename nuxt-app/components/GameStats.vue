<template>
  <div class="stats">
    <span>
      👁‍🗨
      <template v-if="viewsStatus === 'pending'">Loading…</template>
      <template v-else-if="viewsError">Error</template>
      <template v-else>{{ views }}</template>
    </span>
    <button @click="onLike">
      👍
      <template v-if="likesStatus === 'pending'">Loading…</template>
      <template v-else-if="likesError">Error</template>
      <template v-else>{{ likes }}</template>
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ gameId: string }>()

// 1. views を個別に取得
const { 
  data: viewsRes, 
  status: viewsStatus, 
  error: viewsError, 
  refresh: refreshViews 
} = await useFetch('/api/get-count', {
  key: `views-${props.gameId}`,
  query: { game: props.gameId, field: 'views' }
})

// 2. likes を個別に取得
const { 
  data: likesRes, 
  status: likesStatus, 
  error: likesError, 
  refresh: refreshLikes 
} = await useFetch('/api/get-count', {
  key: `likes-${props.gameId}`,
  query: { game: props.gameId, field: 'likes' }
})

const views = computed(() => viewsRes.value?.count ?? 0)
const likes = computed(() => likesRes.value?.count ?? 0)

async function onLike() {
  try {
    const res = await $fetch<{ ok: boolean }>('/api/like', {
      query: { game: props.gameId }
    })
    if (res.ok) {
      refreshLikes()
    }
  } catch (e) {
    console.error('[GameStats] onLike error:', e)
  }
}

function onViewUpdated(event: any) {
  if (event.detail.game === props.gameId) {
    refreshViews()
  }
}

onMounted(() => {
  window.addEventListener('view-updated', onViewUpdated)
})

onUnmounted(() => {
  window.removeEventListener('view-updated', onViewUpdated)
})
</script>