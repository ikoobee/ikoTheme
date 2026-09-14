# ikoTheme

[![CI](https://github.com/ikoobee/ikoTheme/actions/workflows/ci.yml/badge.svg)](https://github.com/ikoobee/ikoTheme/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5-blueviolet.svg)](https://astro.build)

**一套「文章 + 项目」双一等公民的 Astro 博客主题。**

English documentation: [README.md](README.md)

为独立开发者与开源作者打造：用一个干净的首页同时展示作品与写作——主内容流
（精选 → 最新文章 → 开源项目 → 动态）+ 右侧伴随栏，文章与项目都有独立详情页，
暗色模式、归档时间线、阅读增强、图片灯箱、KaTeX 数学公式、页面过渡、
告示块与代码块增强，全静态、零默认客户端 JS。

> ✅ **v1.1 已发布**——v1.0 全部能力（布局、内容集合、全文搜索、评论适配、RSS、每篇文章动态分享图、无障碍走查、Lighthouse CI 门禁）之上，新增图片灯箱、KaTeX 数学公式、页面过渡与侧边栏配置化，进度以 [README.md](README.md#roadmap) 的 Roadmap 为准。

## 快速开始

环境要求：Node.js 20+（推荐 22）。

```bash
# 模板方式创建：
npm create astro@latest -- --template ikoobee/ikoTheme
# 或克隆本仓库后：
npm install
npm run dev        # http://localhost:4321
```

内容全部放在 `src/content/`：

| 集合 | 路径 | 驱动页面 |
|---|---|---|
| `posts` | `src/content/posts/*.md` | 博客文章（`/posts/<slug>`） |
| `projects` | `src/content/projects/*.md` | 项目展示 + 详情页（`/projects/<slug>`） |
| `moments` | `src/content/moments/*.md` | 短动态（`/moments`） |
| `friends` | `src/content/friends/*.md` | 友链（`/links`） |

写作增强（全部构建期渲染，零客户端 JS）：`:::note` / `:::tip` / `:::warning` /
`:::danger` 告示块；代码块 `` ```js title="x.ts" {1,3-4} `` 文件名栏、行号、
`[!code ++]` / `[!code --]` 增删高亮，超过 24 行自动折叠；文章封面图把
`cover: ./cover.jpg` 写进 frontmatter（图片与 md 同目录，构建期出 srcset/webp，
无图自动回退渐变占位）；`updated: 2026-09-04` 可选字段展示「最后更新于」。

站点身份（名称、作者、导航、签名档、首页侧边栏板块……）统一在
[`src/config/site.ts`](src/config/site.ts) 一处配置（侧边栏由 `SIDEBAR` 数组
控制显示与顺序）；评论系统同样在此切换：
内置 **giscus / Waline / Twikoo** 三种适配器，`COMMENTS.provider` 三选一开启
（启用指南见 [docs/comments.md](docs/comments.md)），未启用的适配器不进入客户端
产物，全部懒加载。站内全文搜索（Pagefind）由 `npm run build` 自动生成索引；
数学公式用 `$…$`（行内）或 `$$…$$`（独立成段）书写，构建期由 KaTeX 渲染。

```bash
npm run build      # 构建产物到 dist/，并生成 Pagefind 搜索索引
npm run preview    # 本地预览构建产物（可体验搜索/RSS）
npm run check      # astro check（类型 + 内容 schema 校验）
```

## 许可证

[MIT](LICENSE) © 2026 Ethan (ikoobee)

## ☕ Sponsor / 赞赏

如果这个主题帮你更快搭好了博客，欢迎请作者喝杯咖啡 ☕

<details>
<summary>赞赏码 / Donation</summary>
<img src="docs/images/donate-wechat.png" width="220" alt="微信赞赏码" />
<img src="docs/images/donate-alipay.png" width="220" alt="支付宝收钱码" />
</details>
