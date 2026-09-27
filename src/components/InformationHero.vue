<script setup lang="ts">
defineProps<{ title: string; description: string; illustration: string; variant: 'privacy' | 'support' }>()
</script>

<template>
  <section class="information-hero" :class="variant" aria-labelledby="page-title">
    <img class="information-art" :src="illustration" alt="" width="1774" height="887" />
    <div class="information-copy shell">
      <p class="information-eyebrow">安静的信笺</p>
      <h1 id="page-title"><template v-if="variant === 'support'"><span>{{ title.split('，')[0] }}，</span><span class="support-title-end">{{ title.split('，')[1] }}</span></template><template v-else>{{ title }}</template></h1>
      <p class="information-description">{{ description }}</p>
    </div>
  </section>
</template>

<style scoped>
.information-hero { position: relative; min-height: 400px; padding-top: 104px; isolation: isolate; }
.information-art { position: absolute; z-index: -1; width: min(1300px, 100vw); max-width: none; right: 0; top: -82px; pointer-events: none; }
.information-copy { position: relative; }
.information-eyebrow { margin: 0 0 13px; color: var(--text-secondary); font-size: 18px; letter-spacing: .06em; }
h1 { margin: 0; font-family: Georgia, 'Songti SC', serif; font-size: clamp(56px, 6.7vw, 96px); line-height: 1.2; letter-spacing: .025em; }
.information-description { margin: 18px 0 0; max-width: 750px; font-size: 25px; color: var(--text-secondary); line-height: 1.6; white-space: pre-line; }
.support h1 { font-size: clamp(42px, 5.2vw, 75px); }
.support .information-art { width: min(1080px, 100vw); top: -106px; }
@media (max-width: 1000px) { .information-art { opacity: .65; } .support h1 { max-width: 680px; } .information-description { font-size: 21px; max-width: 590px; } }
@media (max-width: 700px) {
  .information-hero { min-height: 280px; padding-top: 62px; padding-bottom: 36px; }
  .information-art { width: 600px; top: -60px; right: -150px; opacity: .3; }
  .support .information-art { width: 540px; top: -90px; right: -20px; opacity: .3; }
  .information-eyebrow { font-size: 14px; margin-bottom: 12px; }
  h1 { font-size: 48px; }
  .support h1 { font-size: clamp(34px, 9.8vw, 44px); max-width: 420px; text-wrap: balance; }
  .support-title-end { display: block; white-space: nowrap; }
  .information-description { font-size: 17px; margin-top: 18px; }
}
</style>
