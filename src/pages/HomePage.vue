<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import FeatureStage from '../components/FeatureStage.vue'
import closingDevices from '../assets/closing-devices.png'
import { IconArrowRight } from '@tabler/icons-vue'
import { testFlightUrl } from '../config/site'

type Stage = 'goal' | 'today' | 'content' | 'review'
const stages: { key: Stage; label: string; description: string }[] = [
  { key: 'goal', label: '目标', description: '从一个清晰的目标开始，让重要的事真正进入你的日常。' },
  { key: 'today', label: '今天', description: '把计划变成行动，在每一天的具体安排中，遇见更好的自己。' },
  { key: 'content', label: '内容', description: '不只记录做了什么，更记录你的思考与发现，让经历成为真正属于你的财富。' },
  { key: 'review', label: '回看', description: '在时间的坐标里，看见努力的轨迹，也看见一个更完整的自己。' },
]
const activeIndex = ref(0)
const scene = ref<HTMLElement | null>(null)
const previewDialog = ref<HTMLDialogElement | null>(null)
let frame = 0

function updateStage() {
  if (!scene.value || window.matchMedia('(max-width: 800px)').matches) return
  const top = scene.value.getBoundingClientRect().top + window.scrollY
  const scrollRange = Math.max(1, scene.value.offsetHeight - window.innerHeight)
  const progress = Math.min(1, Math.max(0, (window.scrollY - top) / scrollRange))
  activeIndex.value = Math.round(progress * (stages.length - 1))
}
function scheduleUpdate() {
  if (frame) return
  frame = window.requestAnimationFrame(() => { frame = 0; updateStage() })
}
function goToStage(index: number) {
  if (!scene.value) return
  const top = scene.value.getBoundingClientRect().top + window.scrollY
  const scrollRange = Math.max(1, scene.value.offsetHeight - window.innerHeight)
  window.scrollTo({ top: top + scrollRange * index / (stages.length - 1), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}
function openPreview() { previewDialog.value?.showModal() }
function closePreview() { previewDialog.value?.close() }
function closeOnBackdrop(event: MouseEvent) { if (event.target === previewDialog.value) closePreview() }
onMounted(() => { updateStage(); window.addEventListener('scroll', scheduleUpdate, { passive: true }); window.addEventListener('resize', scheduleUpdate) })
onUnmounted(() => { window.removeEventListener('scroll', scheduleUpdate); window.removeEventListener('resize', scheduleUpdate); if (frame) window.cancelAnimationFrame(frame) })
</script>

<template>
  <SiteHeader />
  <main>
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">更有意识地度过每一天</p>
        <h1 id="hero-title">人生不仅仅是此刻</h1>
        <p class="hero-subtitle">把时间变成可回顾的故事，在日常中看见真实的自己。</p>
        <div class="hero-actions"><a class="primary-link" :href="testFlightUrl" target="_blank" rel="noopener noreferrer">加入 TestFlight 体验版<IconArrowRight :size="18" aria-hidden="true" /></a><a href="#features">了解 LifePart <span aria-hidden="true">↗</span></a></div>
      </div>
      <div class="hero-side">
        <div class="hero-task"><span class="hero-task-icon">▤</span><div><strong>阅读</strong><div class="tiny-progress"><span></span></div></div><div><strong>2 小时 30 分钟</strong><small>进行中 · 50%</small></div></div>
        <p>设定目标、<br>规划当下、<br>持续记录。<br>在时间的长卷里，<br>看见改变。</p>
      </div>
      <div class="timeline" aria-label="从周一到周六的日期示意"><div v-for="(day, index) in ['09.21', '09.22', '09.23', '今天 · 09.24', '09.25', '09.26']" :key="day" class="timeline-day" :class="{ current: index === 3 }"><span class="timeline-dot"></span><strong>{{ day }}</strong><small>{{ ['周一', '周二', '周三', '周四', '周五', '周六'][index] }}</small></div></div>
    </section>

    <section id="features" class="features-intro shell"><h2>从设定目标，到回顾每一次进步</h2><p>在时间的流动中，建立属于自己的节奏。</p></section>

    <section ref="scene" class="desktop-scene shell" aria-label="LifePart 功能展示">
      <div class="scene-sticky">
        <div class="scene-nav"><span class="scene-count">0{{ activeIndex + 1 }} <span>/ 04</span></span><div class="scene-tabs" role="group" aria-label="选择功能展示"><button v-for="(stage, index) in stages" :key="stage.key" type="button" class="stage-label" :class="{ active: activeIndex === index }" :aria-current="activeIndex === index ? 'step' : undefined" @click="goToStage(index)"><span class="label-dot"></span>{{ stage.label }}</button></div><p class="scene-description">{{ stages[activeIndex]?.description }}</p></div>
        <div class="scene-visual"><Transition name="scene-fade" mode="out-in"><FeatureStage :key="stages[activeIndex]?.key" :stage="stages[activeIndex]!.key" @open-preview="openPreview" /></Transition></div>
      </div>
    </section>

    <section class="mobile-story shell" aria-label="LifePart 功能展示"><div v-for="(stage, index) in stages" :key="stage.key" class="mobile-chapter"><div class="mobile-chapter-heading"><span>0{{ index + 1 }} / 04</span><h2>{{ stage.label }}</h2><p>{{ stage.description }}</p></div><FeatureStage :stage="stage.key" @open-preview="openPreview" /></div></section>

    <section class="local-section shell"><div><h2>你的生活，留在你的设备。</h2><p>LifePart 的数据保存在用户设备上。</p><p>你可以记录日常安排，随时回看自己的变化。</p><a class="primary-link" :href="testFlightUrl" target="_blank" rel="noopener noreferrer">加入 TestFlight 体验版<IconArrowRight :size="18" aria-hidden="true" /></a></div><img :src="closingDevices" alt="浅色笔记本电脑、手机和一盆植物的插画" width="610" height="235" /></section>
  </main>
  <SiteFooter />
  <dialog ref="previewDialog" class="content-dialog" aria-label="阅读笔记详情预览" @click="closeOnBackdrop"><div class="dialog-inner"><div class="dialog-head"><span>阅读笔记详情</span><button type="button" aria-label="关闭预览" @click="closePreview">关闭 ✕</button></div><FeatureStage stage="content" preview /></div></dialog>
</template>

<style scoped>
.hero { position: relative; min-height: 475px; padding-top: 72px; display: grid; grid-template-columns: 1fr auto; align-items: start; gap: 40px; }
.eyebrow { margin: 0 0 10px; color: #8798ac; font-size: 15px; letter-spacing: .08em; }
h1, h2 { font-family: Georgia, 'Songti SC', serif; }
.hero h1 { margin: 0; font-size: clamp(46px, 5.8vw, 84px); line-height: 1.22; letter-spacing: .035em; font-weight: 700; text-wrap: balance; }
.hero-subtitle { margin: 9px 0 25px; font-size: 18px; color: var(--text-secondary); letter-spacing: .04em; }
.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 18px 30px; }
.hero-actions a { text-decoration-thickness: 1px; font-weight: 700; font-size: 14px; }
.hero-side { display: flex; align-items: center; gap: 34px; padding-top: 55px; }
.hero-side > p { margin: 0; font-size: 14px; line-height: 1.8; color: var(--text-secondary); }
.hero-task { display: flex; align-items: center; gap: 13px; width: 325px; padding: 18px; background: white; border-radius: 18px; box-shadow: var(--shadow); white-space: nowrap; font-size: 12px; }
.hero-task > div:last-child { margin-left: auto; text-align: right; }
.hero-task small { display: block; color: var(--accent); font-size: 10px; }
.hero-task-icon { display: grid; place-items: center; width: 38px; height: 38px; background: var(--accent-soft); border-radius: 11px; color: var(--accent); font-size: 22px; }
.tiny-progress { width: 78px; height: 4px; margin-top: 7px; background: #e8eef5; border-radius: 9px; }
.tiny-progress span { display: block; width: 50%; height: 100%; border-radius: inherit; background: var(--accent); }
.timeline { grid-column: 1 / -1; align-self: end; position: relative; display: flex; justify-content: space-around; width: 100%; border-top: 2px solid #b8d9f6; padding-top: 7px; }
.timeline-day { display: flex; flex-direction: column; align-items: center; color: #8799ad; font-size: 13px; line-height: 1.3; }
.timeline-day small { font-size: 11px; }
.timeline-day.current { color: var(--accent); }
.timeline-dot { width: 10px; height: 10px; margin-top: -13px; margin-bottom: 8px; border: 2px solid #b5d5f2; border-radius: 50%; background: var(--background); }
.timeline-day.current .timeline-dot { width: 17px; height: 17px; margin-top: -17px; margin-bottom: 5px; border: 4px solid #b5d8fc; background: var(--accent); box-shadow: 0 0 0 3px white; }
.features-intro { text-align: center; padding-top: 72px; padding-bottom: 32px; border-top: 1px solid var(--border); margin-top: 28px; }
.features-intro h2 { margin: 0; font-size: clamp(30px, 3vw, 42px); line-height: 1.3; }
.features-intro p { margin: 6px 0 0; color: var(--text-secondary); font-size: 16px; }
.desktop-scene { height: 340vh; position: relative; }
.scene-sticky { position: sticky; top: 60px; width: min(100%, 800px); height: calc(100vh - 80px); min-height: 690px; margin-inline: auto; display: grid; grid-template-columns: 230px minmax(0, 500px); align-items: center; gap: 70px; }
.scene-nav { align-self: center; }
.scene-count { color: var(--text-primary); font-weight: 700; letter-spacing: .04em; }
.scene-count span { color: var(--text-secondary); font-weight: 500; }
.scene-tabs { display: flex; flex-direction: column; align-items: stretch; margin: 22px 0 28px 9px; border-left: 1px solid #cfd9e2; }
.stage-label { display: flex; align-items: center; gap: 36px; width: 100%; height: 84px; margin-left: -7px; padding: 0; border: 0; background: none; text-align: left; color: #93a3b3; font-family: Georgia, 'Songti SC', serif; font-size: 29px; font-weight: 700; line-height: 1.25; transition: color .22s ease; }
.stage-label.active { color: var(--text-primary); }
.label-dot { flex: 0 0 13px; width: 13px; height: 13px; border: 2px solid #c9d8e6; border-radius: 50%; background: var(--background); }
.stage-label.active .label-dot { background: var(--accent); border-color: var(--accent); }
.scene-description { max-width: 200px; min-height: 90px; margin: 0 0 0 9px; color: var(--text-secondary); font-size: 15px; line-height: 1.75; }
.scene-visual { display: flex; align-items: center; justify-content: center; min-width: 0; max-height: calc(100vh - 95px); }
.scene-fade-enter-active, .scene-fade-leave-active { transition: opacity .2s ease; }
.scene-fade-enter-from, .scene-fade-leave-to { opacity: 0; }
.mobile-story { display: none; }
.local-section { min-height: 340px; display: flex; align-items: center; justify-content: space-between; gap: 40px; padding-block: 35px 60px; }
.local-section h2 { margin: 0 0 3px; font-size: 36px; }
.local-section p { margin: 3px 0; color: var(--text-secondary); font-size: 16px; }
.local-section .primary-link { margin-top: 20px; }
.local-section img { width: min(50%, 610px); mix-blend-mode: multiply; }
.content-dialog { width: min(640px, calc(100% - 24px)); max-height: min(88vh, 1000px); overflow-y: auto; padding: 0; border: 1px solid var(--border); border-radius: 24px; background: var(--surface); box-shadow: 0 25px 90px rgb(21 41 65 / 24%); }
.content-dialog::backdrop { background: rgb(27 40 57 / 45%); }
.dialog-inner { padding: 20px 24px 26px; }
.dialog-head { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 18px; font-weight: 700; }
.dialog-head button { border: 0; background: var(--accent-soft); color: var(--accent); border-radius: 999px; padding: 7px 15px; font-weight: 700; }
@media (max-width: 1100px) { .hero-side > p { display: none; } .scene-sticky { gap: 30px; grid-template-columns: 200px minmax(0, 1fr); } }
@media (max-width: 800px) { .hero { display: block; min-height: 0; padding-top: 60px; } .hero-side { padding-top: 35px; } .timeline { margin-top: 50px; } .desktop-scene { display: none; } .mobile-story { display: block; } .features-intro { padding-top: 60px; } .mobile-chapter { padding: 30px 0 55px; border-bottom: 1px solid var(--border); } .mobile-chapter-heading { margin-bottom: 20px; } .mobile-chapter-heading span { color: var(--text-secondary); font-size: 13px; font-weight: 700; } .mobile-chapter-heading h2 { margin: 3px 0; font-size: 34px; } .mobile-chapter-heading p { margin: 0; color: var(--text-secondary); } .local-section { min-height: 0; } }
@media (max-width: 700px) { .hero { padding-top: 50px; } .hero h1 { font-size: clamp(34px, 9.5vw, 50px); } .hero-subtitle { font-size: 15px; max-width: 330px; } .hero-side { padding-top: 35px; } .hero-task { width: min(100%, 350px); } .timeline { margin-top: 48px; } .timeline-day { font-size: 10px; } .timeline-day small { font-size: 9px; } .features-intro { padding-top: 55px; padding-bottom: 18px; } .features-intro h2 { font-size: 29px; } .features-intro p { font-size: 14px; } .local-section { flex-direction: column; align-items: flex-start; gap: 16px; padding-block: 55px; } .local-section h2 { font-size: 31px; } .local-section p { font-size: 14px; } .local-section img { width: 100%; } .dialog-inner { padding: 14px; } }
@media (prefers-reduced-motion: reduce) { .scene-fade-enter-active, .scene-fade-leave-active, .stage-label { transition: none; } }
</style>
