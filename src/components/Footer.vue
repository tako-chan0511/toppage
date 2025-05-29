<!-- src/components/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="profile">
        <span class="icon">🐙</span>
        <span class="nickname">たこちゃん</span>
      </div>
      <div class="contact">
        <a href="mailto:harakeisuke7@gmail.com">harakeisuke7@gmail.com</a>
      </div>
      <div class="links">
        <a
          href="https://drive.google.com/file/d/1A9zTYo1giZkOJRHcMa220sT-poCWqpHA/view"
          target="_blank"
          rel="noopener"
        >
          自己紹介動画
        </a>
        <a href="https://github.com/tako-chan0511" target="_blank" rel="noopener">
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
// スクリプト不要
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
  justify-content: center;
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
.contact a,
.links a {
  color: #42b983;
  text-decoration: none;
}
.links a {
  margin: 0 0.5rem;
}
.links a:hover,
.contact a:hover {
  text-decoration: underline;
}
copyright {
  color: #888;
}
</style>
