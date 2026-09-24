# LifePart Web

LifePart 官方静态网站。当前四个页面仅含工程占位内容。

技术栈：Vue 3、TypeScript、Vite、npm、原生 CSS。LifePartWeb 与 LifePartApp 相互独立，不共享构建、依赖或资源。

## 本地开发

使用 Node.js 22.12+（22 系列）或 24+，CI 使用 Node.js 22。
以下命令均在 `LifePartWeb/` 内执行：

```sh
npm install
npm run dev
```

生产构建（先运行 Vue / TypeScript 类型检查，再构建全部页面）：

```sh
npm run build
```

本地预览生产产物：

```sh
npm run preview
```

干净安装或 CI 使用 `npm ci`，依赖版本由 `package-lock.json` 锁定。

## 多页面结构

| 路径 | HTML 入口 | 页面组件 |
| --- | --- | --- |
| `/` | `index.html` | `HomePage.vue` |
| `/privacy/` | `privacy/index.html` | `PrivacyPage.vue` |
| `/support/` | `support/index.html` | `SupportPage.vue` |
| `/terms/` | `terms/index.html` | `TermsPage.vue` |

`vite.config.ts` 的四个 HTML input 分别引用 `src/entries/` 中的独立 TypeScript 入口，挂载 `src/pages/` 中的页面组件。公共组件、全局样式和自身资源分别位于 `src/components/`、`src/styles/` 和 `src/assets/`。

使用 Vite MPA 模式与普通链接，不使用客户端 Router、hash 路由或 SPA fallback。`base: '/'` 面向自定义域名根路径，不适用于直接挂载在仓库名称子路径下。

构建输出可整体部署到提供目录 `index.html` 的静态托管：

```text
dist/
├── index.html
├── privacy/index.html
├── support/index.html
├── terms/index.html
├── CNAME
└── assets/
```

`node_modules/` 和 `dist/` 被根目录 `.gitignore` 排除，不提交构建产物。

## GitHub Pages 部署

生产目标域名：[lifepart.store](https://lifepart.store)。部署方式：GitHub Actions → GitHub Pages。

工作流位于 `.github/workflows/deploy-web.yml`：

1. `main` 上 `LifePartWeb/**` 或工作流自身变化触发，也支持 `workflow_dispatch`。
2. 构建 Job 检出仓库，设置 Node，在 `LifePartWeb` 内运行 `npm ci`、`npm run build`。
3. 官方 `upload-pages-artifact` 上传且仅上传 `LifePartWeb/dist`。
4. 部署 Job 等待构建成功，在 `main` 上通过官方 `configure-pages`、`deploy-pages` 发布到 `github-pages` environment。手动选择其他分支只构建，不发布。

构建只获得 `contents: read`，部署只获得 `pages: write` 与 `id-token: write`。并发组为 `pages`，不取消正在进行的部署。工作流不构建 iOS App。

## 用户需要完成的外部配置

代码不会修改 Pages Settings、DNS、账户套餐或仓库可见性。

1. 在 Repository Settings → Pages → Build and deployment 中选择 **GitHub Actions**，确认仓库允许相关 Actions，`github-pages` environment 允许从 `main` 部署。
2. 在 Pages 的 Custom domain 设置 `lifepart.store`。`public/CNAME` 会复制到 `dist/CNAME`，但 GitHub Actions 部署会忽略此文件的域名绑定作用，必须在 Settings 配置域名。
3. 在域名服务商为根域名 `@` 配置四条 A 记录：`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`。如需 IPv6，再按官方文档配置 AAAA；如需 `www`，为它建立指向仓库所有者默认 Pages 域名的 CNAME，不包含仓库路径。
4. 等待 DNS 检查和证书签发后，在 Pages 启用 **Enforce HTTPS**。将代码合并到 `main` 后检查 Actions；需要时手动运行工作流并选择 `main`。

私有仓库的 Pages 需要 GitHub Pro、Team 或 Enterprise 等支持套餐，GitHub Free 的私有仓库不支持；如果账户受限，需要用户处理套餐或发布决策，不能由工作流绕过。

参考：[Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、[域名与 DNS 配置](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。
