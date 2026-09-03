# ikoTheme

[![CI](https://github.com/ikoobee/ikoTheme/actions/workflows/ci.yml/badge.svg)](https://github.com/ikoobee/ikoTheme/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5-blueviolet.svg)](https://astro.build)

**一套「文章 + 项目」双一等公民的 Astro 博客主题。**

English documentation: [README.md](README.md)

为独立开发者与开源作者打造：用一个干净的首页同时展示作品与写作——主内容流
（精选 → 最新文章 → 开源项目 → 动态）+ 右侧伴随栏，暗色模式、归档时间线、
阅读增强，全静态、零默认客户端 JS。

> 🚧 **开发中**（M1 里程碑），功能以 [README.md](README.md#roadmap) 的 Roadmap 为准。

## 快速开始

环境要求：Node.js 20+（推荐 22）。

```bash
# 克隆本仓库后（v1.0 发布后可用模板方式创建：
#   npm create astro@latest -- --template ikoobee/ikoTheme）
npm install
npm run dev        # http://localhost:4321
```

内容全部放在 `src/content/`：

| 集合 | 路径 | 驱动页面 |
|---|---|---|
| `posts` | `src/content/posts/*.md` | 博客文章（`/posts/<slug>`） |
| `projects` | `src/content/projects/*.md` | 项目展示（`/projects`） |
| `moments` | `src/content/moments/*.md` | 短动态（`/moments`） |
| `friends` | `src/content/friends/*.md` | 友链（`/links`） |

站点身份（名称、作者、导航、签名档……）统一在
[`src/config/site.ts`](src/config/site.ts) 一处配置。

```bash
npm run build      # 产物输出 dist/
npm run check      # astro check（类型 + 内容 schema 校验）
```

## 许可证

[MIT](LICENSE) © 2026 Ethan (ikoobee)
