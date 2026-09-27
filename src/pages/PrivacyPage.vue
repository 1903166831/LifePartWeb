<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { IconMail } from '@tabler/icons-vue'
import SiteHeader from '../components/SiteHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import InformationHero from '../components/InformationHero.vue'
import privacyIllustration from '../assets/privacy-illustration.png'
import { developerName, supportEmail } from '../config/site'

const sections = [
  { id: 'data', label: '数据保存' },
  { id: 'permissions', label: '权限使用' },
  { id: 'contact', label: '联系我们' },
]
const activeSection = ref('data')
let frame = 0

function updateSection() {
  let current = sections[0]!.id
  for (const section of sections) {
    if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= window.innerHeight * .3) current = section.id
  }
  activeSection.value = current
}
function scheduleUpdate() {
  if (frame) return
  frame = window.requestAnimationFrame(() => { frame = 0; updateSection() })
}
onMounted(() => {
  updateSection()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate)
})
onUnmounted(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  if (frame) window.cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="privacy-page">
    <SiteHeader />
    <main>
      <InformationHero title="隐私政策" description="认真说明每一项与你有关的选择。" :illustration="privacyIllustration" variant="privacy" />
      <div class="privacy-intro shell">
        <p>LifePart 珍视你的信任。<br />这份页面用平实的语言，说明我们如何保存与处理相关信息，<br class="desktop-break" />以及你可以做出的选择。希望它像一封安静的信，让你在使用时更安心。</p>
        <p class="policy-meta">发布主体：个人开发者 {{ developerName }}<span>生效日期：2026 年 9 月 27 日</span></p>
      </div>
      <div class="privacy-layout shell">
        <nav class="policy-toc" aria-label="隐私政策目录">
          <a v-for="section in sections" :key="section.id" :href="'#' + section.id" :aria-current="activeSection === section.id ? 'location' : undefined">{{ section.label }}</a>
        </nav>
        <div class="policy-content">
          <section id="data" class="policy-section" aria-labelledby="data-title">
            <span class="section-number" aria-hidden="true">01</span>
            <div>
              <h2 id="data-title">数据保存</h2>
              <p class="section-opening">你的记录属于你。</p>
              <p>LifePart 的数据保存在用户设备上，包括你创建的目标、计划、执行进度、复盘，以及关联内容中的笔记、图片和文件。当前版本不提供账号或云同步。</p>
              <h3>由你管理的记录</h3>
              <p>你可以在 App 中查看记录，并编辑或删除关联内容。普通删除的关联内容会在“最近删除”中保留 30 天，期间可以恢复；永久删除或保留期结束后，会清理对应内容及附件。已结算的历史执行结果保持原样，不提供补记或修改。</p>
              <h3>你主动提交的反馈</h3>
              <p>通过邮箱联系时，我们会收到你的邮箱地址、问题描述，以及你主动附上的截图或文件。这些信息仅用于回复、排查问题和改进 LifePart，保留至相关反馈处理完成，完成后删除。你也可以通过联系邮箱申请删除反馈资料。</p>
              <p>通过 TestFlight 提交的反馈、截图及测试诊断信息由 Apple 平台管理，开发者可查看平台提供的相关资料，用于排查问题。其收集、保存和处理方式请参阅 <a href="https://www.apple.com/legal/privacy/data/en/test-flight/" target="_blank" rel="noopener noreferrer">Apple 的 TestFlight 隐私说明</a>。</p>
              <p>本官网不读取你设备上的 App 数据。网站托管及邮件服务会按各自规则处理提供服务所需的信息。</p>
            </div>
          </section>
          <section id="permissions" class="policy-section" aria-labelledby="permissions-title">
            <span class="section-number" aria-hidden="true">02</span>
            <div>
              <h2 id="permissions-title">权限使用</h2>
              <p>仅在你主动使用相关功能时，LifePart 才会调用对应的系统能力。</p>
              <ul>
                <li><strong>相机：</strong>用于拍照或扫描文稿，并将结果添加到关联内容；使用前由系统请求授权。</li>
                <li><strong>照片与文件：</strong>通过系统选择器导入你选中的内容，不需要你开放整个照片图库。</li>
                <li><strong>粘贴：</strong>在你主动粘贴时，将文字或图片加入正在编辑的内容。</li>
              </ul>
              <p>你可以在设备的系统设置中调整相机权限。未授权相机时，创建目标、记录进度及编辑文字等基本功能仍可使用。</p>
            </div>
          </section>
          <section id="contact" class="policy-section" aria-labelledby="contact-title">
            <span class="section-number" aria-hidden="true">03</span>
            <div>
              <h2 id="contact-title">联系我们</h2>
              <p>如果你对本政策、反馈资料的处理有疑问，或希望申请查阅、更正、删除已提交的反馈，请通过以下邮箱联系个人开发者 {{ developerName }}。</p>
              <p>设备中的 App 数据由你在 App 内管理；开发者无法远程读取或代你修改这些记录。政策发生变化时，我们会更新本页说明。</p>
              <a class="policy-email" :href="'mailto:' + supportEmail"><IconMail :size="25" stroke="1.6" aria-hidden="true" /><span>联系邮箱：<span class="email-address">{{ supportEmail }}</span></span></a>
            </div>
          </section>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.privacy-page { overflow: clip; --text-secondary: #65758b; }
.privacy-intro { padding-bottom: 50px; }
.privacy-intro > p:first-child { margin: 0; font-size: 20px; line-height: 1.9; color: var(--text-secondary); }
.policy-meta { display: flex; flex-wrap: wrap; gap: 8px 30px; color: var(--text-secondary); font-size: 13px; margin: 22px 0 0; }
.privacy-layout { display: grid; grid-template-columns: minmax(0, 1fr) 175px; gap: 80px; align-items: start; padding-bottom: 30px; }
.policy-toc { grid-column: 2; grid-row: 1; position: sticky; top: 100px; padding-left: 23px; border-left: 1px solid #d3dce6; margin-top: 30px; }
.policy-toc a { position: relative; display: block; padding: 8px 0; margin-bottom: 29px; color: var(--text-secondary); font-size: 15px; font-weight: 600; text-decoration: none; }
.policy-toc a:last-child { margin-bottom: 0; }
.policy-toc a::before { content: ''; position: absolute; width: 11px; height: 11px; border: 1.5px solid #a9bfda; background: var(--background); border-radius: 50%; left: -29px; top: 16px; }
.policy-toc a[aria-current] { color: var(--text-primary); }
.policy-toc a[aria-current]::before { background: var(--accent); border-color: var(--accent); }
.policy-content { grid-column: 1; grid-row: 1; }
.policy-section { display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 50px; padding: 40px 0 48px; border-bottom: 1px solid var(--border); scroll-margin-top: 45px; }
.policy-section:last-child { border-bottom: 0; }
.section-number { font-family: Georgia, serif; font-size: 25px; color: #9b86df; padding-top: 6px; }
.section-number::after { content: ''; display: block; width: 26px; height: 1px; margin-top: 18px; background: #d9ccff; }
h2 { margin: 0 0 20px; font: 700 44px/1.3 Georgia, 'Songti SC', serif; }
h3 { margin: 25px 0 7px; font-size: 19px; font-weight: 600; }
.policy-section p, .policy-section li { margin: 0 0 20px; font-size: 20px; line-height: 1.9; color: var(--text-secondary); }
.policy-section .section-opening { margin-bottom: 0; }
.policy-section p:last-child { margin-bottom: 0; }
.policy-section ul { margin: 18px 0 24px; padding-left: 1.2em; }
.policy-section li { margin-bottom: 12px; }
.policy-section strong { color: var(--text-primary); font-weight: 600; }
.policy-email { display: inline-flex; align-items: center; gap: 14px; color: var(--text-secondary); text-decoration: none; font-size: 18px; }
.policy-email svg, .email-address { color: var(--accent); }
.email-address { margin-left: 10px; text-decoration: underline; }
@media (max-width: 1000px) { .privacy-layout { gap: 35px; grid-template-columns: minmax(0, 1fr) 135px; } .policy-section { gap: 25px; } .policy-section p, .policy-section li { font-size: 17px; } }
@media (max-width: 700px) {
  .privacy-intro { padding-bottom: 25px; }
  .privacy-intro > p:first-child { font-size: 15px; }
  .desktop-break { display: none; }
  .policy-meta { font-size: 12px; gap: 5px 15px; }
  .privacy-layout { display: flex; flex-direction: column; gap: 0; }
  .policy-toc { position: static; display: flex; flex-wrap: wrap; gap: 12px 22px; border-left: 0; padding: 0 0 18px; margin: 0; }
  .policy-toc a { font-size: 14px; margin: 0; padding: 11px 0; }
  .policy-toc a::before { display: none; }
  .policy-toc a[aria-current] { text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 6px; }
  .policy-section { grid-template-columns: 30px minmax(0, 1fr); gap: 17px; padding: 30px 0 35px; scroll-margin-top: 20px; }
  .section-number { font-size: 20px; padding-top: 3px; }
  .section-number::after { width: 19px; margin-top: 12px; }
  h2 { font-size: 29px; margin-bottom: 17px; }
  h3 { font-size: 17px; }
  .policy-section p, .policy-section li { font-size: 15px; line-height: 1.85; }
  .policy-email { font-size: 14px; gap: 8px; flex-wrap: wrap; }
  .email-address { margin-left: 4px; }
}
</style>
