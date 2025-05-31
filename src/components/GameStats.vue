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

/**
 * 本番／開発環境問わず「現在のオリジン + /api」を叩くようにするため、
 * API_BASE は空文字にしておき、Vue+Vercel の場合は自動的に
 * window.location.origin が使われます。
 */
const API_BASE = ''

const props = defineProps<{ gameId: string }>()

/**
 * - views: ページビュー数。null → ローディング中、-1 → エラー、
 *   それ以外は正しい数値
 * - likes: いいね数。null → ローディング中、-1 → エラー、正数 → 表示
 */
const views  = ref<number | null>(null)
const likes  = ref<number | null>(null)

onMounted(async () => {
  try {
    // ────────────────
    // ① まず「現在のビュー数」を get-count で取得
    //    axios が params 内を自動で URL エンコードしてくれる
    const resView = await axios.get(
      `${API_BASE}/api/get-count`,
      {
        params: {
          game: props.gameId,
          field: 'views'
        }
      }
    )
    views.value = resView.data.count

    // ────────────────
    // ② 続いて「ビューを +１」して get-count 結果を画面に反映
    const { data: trackData } = await axios.get(
      `${API_BASE}/api/track`,
      {
        params: {
          game: props.gameId
        }
      }
    )
    views.value = trackData.views

    // ────────────────
    // ③ 最後に「現在のいいね数」を get-count で取得
    const resLike = await axios.get(
      `${API_BASE}/api/get-count`,
      {
        params: {
          game: props.gameId,
          field: 'likes'
        }
      }
    )
    likes.value = resLike.data.count

  } catch (e) {
    console.error('[GameStats] onMounted error:', e)
    // 何らかのエラーが起きたら -1 をセットして「Error」を表示させる
    views.value = -1
    likes.value = -1
  }
})

async function onLike() {
  try {
    // クリックされるたびに「いいねを +1」し、新しい値を受け取って表示
    const { data } = await axios.get(
      `${API_BASE}/api/like`,
      {
        params: {
          game: props.gameId
        }
      }
    )
    if (data.ok) {
      likes.value = data.likes
    }
  } catch (e) {
    console.error('[GameStats] onLike error:', e)
    likes.value = -1
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
  font-size: 1rem;
}
</style>
