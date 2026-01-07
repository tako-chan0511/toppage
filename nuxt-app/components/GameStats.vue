<template>
  <div class="stats">
    <span>
      👁‍🗨
      <template v-if="status === 'pending'">Loading…</template>
      <template v-else-if="error">Error</template>
      <template v-else>{{ views }}</template>
    </span>
    <button @click="onLike">
      👍
      <template v-if="status === 'pending'">Loading…</template>
      <template v-else-if="error">Error</template>
      <template v-else>{{ likes }}</template>
    </button>
  </div>
</template>

<script lang="ts" setup>
// Nuxt 3 では ref, computed, onMounted などの Vue API は自動インポートされます
const props = defineProps<{ gameId: string }>()

/**
 * useFetch を使用して API からデータを取得
 * key を指定することで、同一 gameId のデータを効率的に管理できます
 */
const { data, status, error, refresh } = await useFetch('/api/get-count', {
  query: { game: props.gameId, field: 'all' }, // field: 'all' に対応するように API を調整するか、個別に取得します
  // 初期状態を views/likes 両方持てるように想定
})

// 個別に取得する場合の推奨パターン（views と likes をそれぞれ管理）
const { data: viewsRes, refresh: refreshViews } = await useFetch('/api/get-count', {
  key: `views-${props.gameId}`,
  query: { game: props.gameId, field: 'views' }
})

const { data: likesRes, refresh: refreshLikes } = await useFetch('/api/get-count', {
  key: `likes-${props.gameId}`,
  query: { game: props.gameId, field: 'likes' }
})

const views = computed(() => viewsRes.value?.count ?? 0)
const likes = computed(() => likesRes.value?.count ?? 0)

/**
 * いいねボタン押下時の処理
 * 実行時のアクションには $fetch を使用します
 */
async function onLike() {
  try {
    const res = await $fetch('/api/like', {
      query: { game: props.gameId }
    })
    if (res.ok) {
      // 成功したら likes のデータだけを再取得（リフレッシュ）する
      refreshLikes()
    }
  } catch (e) {
    console.error('[GameStats] onLike error:', e)
  }
}

/**
 * 外部（GameItemなど）でカウントアップが発生した際の同期処理
 * Nuxt 3 でもカスタムイベントを利用して同期可能です
 */
function onViewUpdated(event: any) {
  if (event.detail.game === props.gameId) {
    // サーバーから再取得して最新の状態にする
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