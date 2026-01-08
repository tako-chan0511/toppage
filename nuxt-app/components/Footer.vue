<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section toppage-views">
        <strong>参照回数:</strong>
        <span>{{ pageViews ?? 'Loading…' }}</span>
      </div>

      <div class="links">
        <div v-for="item in footerItems" :key="item.id" class="link-item">
          <button @click="onClickItem(item)">{{ item.label }}</button>
          <span class="stats">
            👁‍🗨 {{ item.stats.views ?? '…' }}
            <button class="like-btn" @click="onLikeItem(item)">👍</button>
            {{ item.stats.likes ?? '…' }}
          </span>
        </div>
      </div>

      <div class="copyright">© {{ new Date().getFullYear() }} 🐙たこちゃん</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const pageViews = ref<number | null>(null)

// 型定義
type FooterItem = {
  id: string
  label: string
  url: string
  stats: { views: number | null; likes: number | null }
}

// 管理するアイテムの定義
const footerItems = ref<FooterItem[]>([
  { id: 'intro-video', label: '自己紹介 ▶', url: 'https://drive.google.com/...', stats: { views: null, likes: null } },
  { id: 'challenge-video', label: 'おじさんの挑戦 ▶', url: 'https://drive.google.com/...', stats: { views: null, likes: null } },
  { id: 'github-link', label: 'Toppage GitHub 📂', url: 'https://github.com/tako-chan0511/toppage/', stats: { views: null, likes: null } },
])

// 初期化処理
onMounted(async () => {
  // 1) Toppage の track (一回だけ実行)
  const trackRes = await $fetch<{ views: number }>('/api/track', { query: { game: 'toppage' } })
  pageViews.value = trackRes.views

  // 2) 各アイテムの数値を一括取得
  for (const item of footerItems.value) {
    const v = await $fetch<{ count: number }>('/api/get-count', { query: { game: item.id, field: 'views' } })
    const l = await $fetch<{ count: number }>('/api/get-count', { query: { game: item.id, field: 'likes' } })
    item.stats.views = v.count
    item.stats.likes = l.count
  }
})

async function onClickItem(item: FooterItem) {
  window.open(item.url, '_blank')
  const res = await $fetch<{ views: number }>('/api/track', { query: { game: item.id } })
  item.stats.views = res.views
}

async function onLikeItem(item: FooterItem) {
  const res = await $fetch<{ likes: number }>('/api/like', { query: { game: item.id } })
  item.stats.likes = res.likes
}
</script>

<style scoped>
.footer { background: #1a1a1a; color: #fff; padding: 1rem; }
.footer-content { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; font-size: 0.9rem; }
.links { display: flex; gap: 1rem; }
.link-item { display: flex; flex-direction: column; }
.link-item button { background: none; border: none; color: #42b983; cursor: pointer; text-align: left; }
.stats { font-size: 0.8rem; color: #ccc; }
.like-btn { background: #333; border: 1px solid #444; color: #fff; cursor: pointer; border-radius: 4px; padding: 0 4px; }
.copyright { margin-left: auto; color: #888; }
</style>