<script setup lang="ts">
import goalScreen from '../assets/feature-goal.png'
import todayScreen from '../assets/feature-today.png'
import contentScreen from '../assets/feature-content.png'
import reviewScreen from '../assets/feature-review.png'

type Stage = 'goal' | 'today' | 'content' | 'review'
defineProps<{ stage: Stage; preview?: boolean }>()
const emit = defineEmits<{ openPreview: [] }>()

const screenshots: Record<Stage, { src: string; alt: string; width: number; height: number }> = {
  goal: { src: goalScreen, alt: 'LifePart App 实际截图：确认初始安排，展示目标、时间、计划步骤与七日安排预览。', width: 1240, height: 1700 },
  today: { src: todayScreen, alt: 'LifePart App 实际截图：今日阅读和跑步计划，以及记录进度和关联内容入口。', width: 1240, height: 1400 },
  content: { src: contentScreen, alt: 'LifePart App 阅读笔记内容原图：标题、笔记正文，以及阅读效率公式 E 等于 K 除以 T 和变量说明。', width: 1190, height: 1610 },
  review: { src: reviewScreen, alt: 'LifePart App 实际截图：九月日历和 9 月 25 日的阅读计划回看。', width: 1240, height: 1980 },
}
</script>

<template>
  <div v-if="preview" class="screen-detail">
    <img :src="contentScreen" alt="LifePart App 阅读笔记内容原图，包含标题、正文和阅读效率公式。" width="1190" height="1610" />
  </div>
  <figure v-else class="feature-shot">
    <button v-if="stage === 'content'" type="button" class="shot-button" aria-label="打开阅读笔记详情预览" @click="emit('openPreview')">
      <img :src="screenshots.content.src" :alt="screenshots.content.alt" :width="screenshots.content.width" :height="screenshots.content.height" />
      <span>查看阅读笔记详情 ↗</span>
    </button>
    <img v-else :src="screenshots[stage].src" :alt="screenshots[stage].alt" :width="screenshots[stage].width" :height="screenshots[stage].height" />
  </figure>
</template>

<style scoped>
.feature-shot { margin: 0; width: fit-content; max-width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 24px; background: var(--surface); box-shadow: var(--shadow); }
.feature-shot > img, .shot-button img { display: block; width: auto; max-width: 100%; max-height: min(62vh, 560px); border-radius: 16px; object-fit: contain; }
.shot-button { display: block; width: fit-content; max-width: 100%; padding: 0; border: 0; background: none; color: var(--accent); text-align: center; }
.shot-button span { display: block; padding: 10px 4px 2px; font-size: 13px; font-weight: 700; }
.shot-button:hover span { text-decoration: underline; text-underline-offset: .2em; }
.screen-detail { display: grid; justify-items: center; }
.screen-detail img { display: block; width: min(100%, 540px); height: auto; border: 1px solid var(--border); border-radius: 16px; }
@media (max-width: 800px) {
  .feature-shot { margin-inline: auto; padding: 8px; border-radius: 20px; }
  .feature-shot > img, .shot-button img { max-height: 480px; max-width: min(100%, 330px); }
}
</style>
