<!-- src/components/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="profile">
        <span class="icon">🐙</span>
        <span class="nickname">たこちゃん</span>
      </div>
      <div class="contact">
        <!-- メールアイコンをクリック → mailto -->
        <a
          href="mailto:harakeisuke7@gmail.com"
          class="email-link"
          title="メールを送信"
        >
          ✉️
        </a>
      </div>
      <div class="links">
        <a
          href="https://drive.google.com/file/d/1WlJDKwFmWBnWE-wreKnda6xzluhI8mvL/view?usp=drive_link"
          target="_blank"
          rel="noopener"
        >
          自己紹介動画
        </a>
        <a
          href="https://drive.google.com/file/d/1jlYkGm6avzhk4nx03BXl1pu6rVKxipM3/view?usp=drive_link"
          target="_blank"
          rel="noopener"
        >
          64歳ロートルおじさんの挑戦動画
        </a>
        <a
          href="https://github.com/tako-chan0511/toppage/"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
      </div>
      <div class="copyright">
        © {{ new Date().getFullYear() }} たこちゃん All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// no script needed
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
  justify-content: flex-start; /* align items from the left */
  gap: 1.5rem;
  font-size: 0.9rem;
}
.profile {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.icon {
  font-size: 1.2rem;
}
.contact .email-link {
  font-size: 1.2rem;
  color: #42b983;
  text-decoration: none;
  transition: transform 0.2s;
}
.contact .email-link:hover {
  transform: scale(1.2);
}
.links a {
  margin: 0 0.5rem;
  color: #42b983;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
.copyright {
  color: #888;
  margin-left: auto;  /* push to the far right */
}
</style>
