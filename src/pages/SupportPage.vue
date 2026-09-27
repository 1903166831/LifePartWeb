<script setup lang="ts">
import { ref } from 'vue'
import { IconMail, IconCopy, IconSend, IconArrowRight, IconChevronRight } from '@tabler/icons-vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import InformationHero from '../components/InformationHero.vue'
import illustration from '../assets/support-illustration.png'
import { supportEmail, testFlightUrl } from '../config/site'

const groups = [
  {
    id: 'getting-started', title: '使用 LifePart', description: '从开始使用到安排每一天，\n这里有一些常见的问题。',
    questions: [
      { title: '如何开始安排我的第一个目标？', answer: '创建目标时，填写名称、截止日期和时间安排，再添加要推进的计划。确认前可以查看接下来七天的安排。保存后，正式安排从下一个可安排的日期开始，创建当天不会生成今日计划。' },
      { title: '如何记录今天的进度？', answer: '在「今天」打开计划的进度入口，选择当前完成的进度；也可以点击进度圆圈标记完成。当日进度可以修改。每天凌晨 4 点之后，上一天的记录只供回看，不能再补记或修改。' },
      { title: '安排被打乱了，应该怎么调整？', answer: '今天暂时无法执行的计划可以搁置，剩余时间会重新分配。需要调整后续节奏时，可以在「我的」中打开对应目标，修改时间或计划配置；未来安排会随之更新，过去的执行记录会保留。' },
    ],
  },
  {
    id: 'content', title: '管理记录', description: '关于记录、回顾和整理，\n帮助你照顾好自己的内容。',
    questions: [
      { title: '如何添加笔记、图片或文件？', answer: '从计划卡片的「关联内容」入口添加内容。可以写笔记、选择图片或文件，也可以主动拍照或扫描。内容保存后，可以再次打开查看或编辑。' },
      { title: '如何找到以前的内容和安排？', answer: '在「内容」页面查看和查找已保存的内容；在日历中选择日期，可以回看当时的安排与执行记录。计划关联的内容也可以从对应入口打开。' },
      { title: '如何编辑、删除或恢复内容？', answer: '打开内容详情后可以编辑或删除。删除的内容会在「最近删除」中保留 30 天，期间可以恢复，也可以提前永久删除。永久删除后无法恢复，请在操作前确认。' },
    ],
  },
  {
    id: 'devices', title: '数据与设备', description: '关于设备、数据和权限，\n了解你的记录如何保存。',
    questions: [
      { title: '我的数据保存在哪里？', answer: 'LifePart 的数据保存在用户设备上。当前版本不需要注册账号。你主动通过邮件或 TestFlight 提交的反馈，会由相应渠道接收和处理；详情见隐私政策。' },
      { title: '更换设备后，记录会自动同步吗？', answer: '当前版本没有账号与云同步功能，记录不会通过 LifePart 自动同步到另一台设备。更换设备或卸载应用前，请先确认设备上的重要内容已妥善保存。' },
      { title: '如何管理相机等权限？', answer: '拍照或扫描时，应用会请求相机权限。你可以在设备的系统设置中调整或关闭权限；选择图片或文件时由系统选择器提供所选内容。不授权相机仍可使用目标、进度和文字笔记。' },
    ],
  },
]
const copyMessage = ref('')
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(supportEmail)
    copyMessage.value = '邮箱已复制'
  } catch {
    copyMessage.value = '无法自动复制，请选择上方邮箱手动复制。'
  }
}
</script>

<template>
  <div class="support-page">
    <SiteHeader />
    <main>
      <InformationHero title="遇到问题，我们一起解决。" :description="'无论是使用中的小疑问，还是不确定的地方，\n这里整理了一些常见问题，希望能帮到你。'" :illustration="illustration" variant="support" />
      <section class="support-faq shell" aria-label="常见问题">
        <div v-for="(group, index) in groups" :key="group.id" class="faq-group">
          <div class="faq-category" :class="{ first: index === 0 }">
            <h2 :id="group.id">{{ group.title }}</h2>
            <p>{{ group.description }}</p>
          </div>
          <div class="faq-questions" :aria-labelledby="group.id">
            <details v-for="question in group.questions" :key="question.title">
              <summary><span>{{ question.title }}</span><IconChevronRight :size="18" stroke="1.5" aria-hidden="true" /></summary>
              <p>{{ question.answer }}</p>
            </details>
          </div>
        </div>
      </section>
      <section class="support-contact shell" aria-labelledby="contact-title">
        <div class="contact-intro">
          <h2 id="contact-title">联系我们 · 参与测试</h2>
          <p>如果你在使用过程中遇到问题，或有任何意见和建议，欢迎通过 TestFlight 或发送邮件与我联系。你的反馈会帮助 LifePart 变得更好。</p>
        </div>
        <div class="contact-email">
          <h3><IconMail :size="25" stroke="1.5" aria-hidden="true" />联系邮箱</h3>
          <div class="email-actions"><a :href="`mailto:${supportEmail}`">{{ supportEmail }}</a><button type="button" aria-label="复制联系邮箱" @click="copyEmail"><IconCopy :size="19" stroke="1.5" aria-hidden="true" /></button></div>
          <p class="copy-status" role="status">{{ copyMessage }}</p>
        </div>
        <div class="contact-test">
          <h3><IconSend :size="25" stroke="1.5" aria-hidden="true" />加入 TestFlight 体验版</h3>
          <a class="primary-link" :href="testFlightUrl" target="_blank" rel="noopener noreferrer">加入 TestFlight 体验版<IconArrowRight :size="19" stroke="1.5" aria-hidden="true" /></a>
          <p>目前提供测试版本。你可以通过 TestFlight 发送反馈，也可以直接邮件联系。</p>
        </div>
        <p class="contact-note">体验版通过 TestFlight 提供。正式版本发布信息会在官网更新。</p>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.support-page { overflow: clip; --text-secondary: #65758b; }
.support-faq { padding-bottom: 32px; }
.faq-group { display: grid; grid-template-columns: 40% 1fr; gap: 50px; padding-block: 0 32px; }
.faq-category { position: relative; padding: 6px 0 0 92px; }
.faq-category::before { content: ''; position: absolute; left: 24px; top: 0; bottom: -32px; width: 1px; background: #ccd8e4; }
.faq-group:last-child .faq-category::before { bottom: 22px; }
.faq-category::after { content: ''; position: absolute; left: 18px; top: 20px; width: 13px; height: 13px; border: 2px solid #a9bfd5; background: var(--background); border-radius: 50%; }
.faq-category.first::after { background: var(--accent); border-color: var(--accent); }
.faq-category h2 { margin: 0 0 7px; font: 700 38px/1.4 Georgia, 'Songti SC', serif; }
.faq-category p { white-space: pre-line; margin: 0; color: var(--text-secondary); font-size: 20px; line-height: 1.75; }
details { border-bottom: 1px solid var(--border); }
summary { display: flex; align-items: center; justify-content: space-between; gap: 14px; min-height: 56px; padding: 13px 4px 13px 0; list-style: none; font-size: 20px; cursor: pointer; }
summary::-webkit-details-marker { display: none; }
summary svg { flex-shrink: 0; color: #8ca6c0; transition: transform .15s ease; }
details[open] summary { color: var(--accent); }
details[open] summary svg { transform: rotate(90deg); }
details p { margin: 0; padding: 5px 26px 20px 0; font-size: 16px; line-height: 1.85; color: var(--text-secondary); }
.support-contact { display: grid; grid-template-columns: 1.25fr 1fr 1fr; gap: 26px; border-radius: 26px; background: var(--purple-soft); padding: 38px 34px 23px; margin-bottom: 38px; }
.contact-intro h2 { margin: 0 0 14px; font: 700 31px/1.4 Georgia, 'Songti SC', serif; }
.contact-intro p { margin: 0; color: var(--text-secondary); font-size: 15px; line-height: 1.8; }
.contact-email, .contact-test { border-left: 1px solid #d7cfea; padding-left: 26px; }
.support-contact h3 { display: flex; align-items: center; gap: 12px; margin: 0 0 13px; font-size: 16px; font-weight: 600; }
.support-contact h3 svg { color: var(--accent); flex-shrink: 0; }
.email-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; font-size: 17px; }
.email-actions button { display: inline-flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; padding: 10px; color: var(--accent); border: 0; background: transparent; border-radius: 4px; }
.copy-status { min-height: 22px; color: var(--text-secondary); font-size: 13px; margin: 8px 0 0; }
.contact-test .primary-link { padding: 12px 23px; font-size: 14px; }
.contact-test p { font-size: 13px; line-height: 1.65; color: var(--text-secondary); margin: 15px 0 0; }
.contact-note { grid-column: 1 / -1; text-align: center; margin: 0; padding-top: 7px; color: var(--text-secondary); font-size: 13px; }
@media (max-width: 1100px) {
  .faq-group { grid-template-columns: 37% 1fr; gap: 25px; }
  .faq-category { padding-left: 62px; }
  .faq-category h2 { font-size: 29px; }
  .faq-category p { font-size: 16px; }
  summary { font-size: 16px; }
  .support-contact { grid-template-columns: 1fr 1fr; }
  .contact-intro { grid-column: 1 / -1; }
  .contact-email { padding-left: 0; border-left: 0; }
}
@media (max-width: 700px) {
  .support-faq { padding-bottom: 12px; }
  .faq-group { display: block; padding-bottom: 35px; }
  .faq-category { padding: 0 0 13px 26px; }
  .faq-category::before { left: 5px; bottom: 12px; }
  .faq-group:last-child .faq-category::before { bottom: 12px; }
  .faq-category::after { left: 0; top: 13px; width: 11px; height: 11px; }
  .faq-category h2 { font-size: 27px; }
  .faq-category p { font-size: 14px; white-space: normal; }
  summary { min-height: 55px; font-size: 15px; padding-block: 15px; }
  details p { font-size: 14px; padding-right: 9px; }
  .support-contact { display: block; border-radius: 20px; padding: 25px 22px 20px; margin-bottom: 30px; }
  .contact-intro h2 { font-size: 26px; }
  .contact-intro p { font-size: 14px; }
  .contact-email, .contact-test { padding: 22px 0 0; margin-top: 22px; border-left: 0; border-top: 1px solid #d7cfea; }
  .support-contact h3 { font-size: 15px; }
  .email-actions { font-size: 16px; }
  .contact-note { font-size: 12px; margin-top: 24px; }
}
</style>
