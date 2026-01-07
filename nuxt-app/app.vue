<template>
  <div>
    <Header />
    <main style="padding: 2rem; max-width: 1280px; margin: 0 auto;">
      <GameList :games="games" />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { games } from '~/data/games'
</script>