<script setup lang="ts">
const location = window.location.pathname
</script>

<template>
  <header class="site-header shell">
    <a class="brand" href="/" aria-label="LifePart 首页">LifePart</a>
    <nav aria-label="主导航">
      <a href="/" :aria-current="location === '/' ? 'page' : undefined">首页</a>
      <a href="/privacy/" :aria-current="location === '/privacy/' ? 'page' : undefined">隐私政策</a>
      <a href="/support/" :aria-current="location === '/support/' ? 'page' : undefined">技术支持</a>
    </nav>
  </header>
</template>
