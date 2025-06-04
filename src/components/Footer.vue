<!-- src/components/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- 1. Toppage 全体の閲覧回数 -->
      <div class="footer-section toppage-views">
        <strong>参照回数:</strong>
        <span v-if="pageViews === null">Loading…</span>
        <span v-else-if="pageViews < 0">Error</span>
        <span v-else>{{ pageViews }}</span>
      </div>

      <!-- プロフィール・メール -->
      <div class="profile">
        <span class="icon">🐙</span>
        <span class="nickname">メール</span>
      </div>
      <div class="contact">
        <a
          href="mailto:harakeisuke7@gmail.com"
          class="email-link"
          title="メールを送信"
        >
        ✉️
        </a>
      </div>

      <!-- 2. 自己紹介動画／チャレンジ動画／GitHub リンク -->
      <div class="links">
        <!-- 自己紹介動画 -->
        <div class="link-item">
          <button @click="onClickItem(GAME_INTRO)">
            自己紹介 ▶
          </button>
          <span class="stats">
            👁‍🗨
            <span v-if="introItem.views === null">Loading…</span>
            <span v-else-if="introItem.views < 0">Error</span>
            <span v-else>{{ introItem.views }}</span>
          
            <button class="like-btn" @click="onLikeItem(GAME_INTRO)">👍</button>
            <span v-if="introItem.likes === null">Loading…</span>
            <span v-else-if="introItem.likes < 0">Error</span>
            <span v-else>{{ introItem.likes }}</span>
            
          </span>
        </div>

        <!-- チャレンジ動画 -->
        <div class="link-item">
          <button @click="onClickItem(GAME_CHALLENGE)">
            おじさんの挑戦 ▶
          </button>
          <span class="stats">
            👁‍🗨
            <span v-if="challengeItem.views === null">Loading…</span>
            <span v-else-if="challengeItem.views < 0">Error</span>
            <span v-else>{{ challengeItem.views }}</span>
          
            <button class="like-btn" @click="onLikeItem(GAME_CHALLENGE)">👍</button>
            <span v-if="challengeItem.likes === null">Loading…</span>
            <span v-else-if="challengeItem.likes < 0">Error</span>
            <span v-else>{{ challengeItem.likes }}</span>
           
          </span>
        </div>

        <!-- GitHub リンク -->
        <div class="link-item">
          <button @click="onClickItem(GAME_GITHUB)">
            Toppage GitHub 📂
          </button>
          <span class="stats">
            👁‍🗨
            <span v-if="githubItem.views === null">Loading…</span>
            <span v-else-if="githubItem.views < 0">Error</span>
            <span v-else>{{ githubItem.views }}</span>          
            <button class="like-btn" @click="onLikeItem(GAME_GITHUB)">👍</button>
            <span v-if="githubItem.likes === null">Loading…</span>
            <span v-else-if="githubItem.likes < 0">Error</span>
            <span v-else>{{ githubItem.likes }}</span>
           
          </span>
        </div>
      </div>

      <!-- コピーライト -->
      <div class="copyright">
        © {{ new Date().getFullYear() }} 🐙たこちゃん All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

/**
 * 各“gameId” の定義
 */
const GAME_TPAGE     = 'toppage'
const GAME_INTRO     = 'intro-video'
const GAME_CHALLENGE = 'challenge-video'
const GAME_GITHUB    = 'github-link'

/**
 * カウント情報を保持する型
 */
interface ItemStats {
  views: number | null
  likes: number | null
}

/**
 * ステート宣言
 */
const pageViews = ref<number | null>(null)

const introItem = ref<ItemStats>({ views: null, likes: null })
const challengeItem = ref<ItemStats>({ views: null, likes: null })
const githubItem = ref<ItemStats>({ views: null, likes: null })

/**
 * get-count API から指定フィールドの数値を取得
 */
async function fetchCount(gameId: string, field: 'views' | 'likes'): Promise<number> {
  try {
    const res = await axios.get('/api/get-count', {
      params: { game: gameId, field },
    })
    return res.data.count as number
  } catch (e) {
    console.error(`[Footer] fetchCount("${gameId}", "${field}") error:`, e)
    return -1
  }
}

/**
 * mount 時に最初の値を読み込み＆Toppage 全体の views を +1 する
 */
async function initFooterStats() {
  try {
    // (1) Toppage全体の views を +1
    const trackRes = await axios.get('/api/track', { params: { game: GAME_TPAGE } })
    if (trackRes.data.ok) {
      pageViews.value = trackRes.data.views as number
    } else {
      // 万一、track が動かなかったら現状の値だけ fetch する
      pageViews.value = await fetchCount(GAME_TPAGE, 'views')
    }

    // (2) 自己紹介動画の初期 views/likes を取得
    introItem.value.views = await fetchCount(GAME_INTRO, 'views')
    introItem.value.likes = await fetchCount(GAME_INTRO, 'likes')

    // (3) チャレンジ動画の初期 views/likes を取得
    challengeItem.value.views = await fetchCount(GAME_CHALLENGE, 'views')
    challengeItem.value.likes = await fetchCount(GAME_CHALLENGE, 'likes')

    // (4) GitHub リンクの初期 views/likes を取得
    githubItem.value.views = await fetchCount(GAME_GITHUB, 'views')
    githubItem.value.likes = await fetchCount(GAME_GITHUB, 'likes')
  } catch (e) {
    console.error('[Footer] initFooterStats error:', e)
    pageViews.value = -1
    introItem.value.views = introItem.value.likes = -1
    challengeItem.value.views = challengeItem.value.likes = -1
    githubItem.value.views = githubItem.value.likes = -1
  }
}

/**
 * 各アイテムをクリックしたときの処理
 * ① /api/track?game=gameId で views++  
 * ② 新しいタブでリンクを開く
 */
async function onClickItem(gameId: string) {
  // 遷移先 URL を gameId に応じて切り替え
  let targetUrl = ''
  if (gameId === GAME_INTRO) {
    targetUrl = 'https://drive.google.com/file/d/1WlJDKwFmWBnWE-wreKnda6xzluhI8mvL/view?usp=drive_link'
  } else if (gameId === GAME_CHALLENGE) {
    targetUrl = 'https://drive.google.com/file/d/1jlYkGm6avzhk4nx03BXl1pu6rVKxipM3/view?usp=drive_link'
  } else if (gameId === GAME_GITHUB) {
    targetUrl = 'https://github.com/tako-chan0511/toppage/'
  } else {
    return
  }

  try {
    const res = await axios.get('/api/track', { params: { game: gameId } })
    if (res.data.ok) {
      const newCount = res.data.views as number
      if (gameId === GAME_INTRO) introItem.value.views = newCount
      if (gameId === GAME_CHALLENGE) challengeItem.value.views = newCount
      if (gameId === GAME_GITHUB) githubItem.value.views = newCount
    }
  } catch (e) {
    console.error(`[Footer] onClickItem("${gameId}") track error:`, e)
  }

  // 動画／リンクを新しいタブで開く
  window.open(targetUrl, '_blank')
}

/**
 * 各アイテムの「いいね」ボタンをクリックしたとき
 * ① /api/like?game=gameId で likes++  
 * ② 返却された新しい likes 値を反映
 */
async function onLikeItem(gameId: string) {
  try {
    const res = await axios.get('/api/like', { params: { game: gameId } })
    if (res.data.ok) {
      const newLikes = res.data.likes as number
      if (gameId === GAME_INTRO) introItem.value.likes = newLikes
      if (gameId === GAME_CHALLENGE) challengeItem.value.likes = newLikes
      if (gameId === GAME_GITHUB) githubItem.value.likes = newLikes
    }
  } catch (e) {
    console.error(`[Footer] onLikeItem("${gameId}") error:`, e)
    if (gameId === GAME_INTRO) introItem.value.likes = -1
    if (gameId === GAME_CHALLENGE) challengeItem.value.likes = -1
    if (gameId === GAME_GITHUB) githubItem.value.likes = -1
  }
}

onMounted(initFooterStats)
</script>

<style scoped>
.footer {
  background: #1a1a1a;
  color: #fff;
  padding: 1rem;
}
.footer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 0.9rem;
}

/* Toppage 全体の views 表示部分 */
.toppage-views {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* プロフィール部分 */
.profile {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.icon {
  font-size: 1.2rem;
}

/* メールリンク */
.contact .email-link {
  font-size: 1.2rem;
  color: #42b983;
  text-decoration: none;
  transition: transform 0.2s;
}
.contact .email-link:hover {
  transform: scale(1.2);
}

/* リンクセクション */
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.link-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.link-item button {
  background: none;
  border: none;
  color: #42b983;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 0.25rem;
}
.link-item button:hover {
  text-decoration: underline;
}

/* views/likes の表示 */
.stats {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}
.like-btn {
  margin-left: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  background-color: #e0e0e0;
  border: 1px solid #bbb;
  border-radius: 4px;
  cursor: pointer;
}
.like-btn:hover {
  background-color: #d0d0d0;
}

/* コピーライト */
.copyright {
  margin-left: auto;
  color: #888;
}
</style>
