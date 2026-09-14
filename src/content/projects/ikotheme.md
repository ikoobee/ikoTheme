---
name: ikoTheme
desc: 你正在看的这个博客的主题：文章与项目双一等公民，全文搜索、三评论适配、构建时 OG 图，Lighthouse 门禁 ≥ 90。
date: 2026-06-01
status: stable
tech: [Astro 5, TypeScript, Tailwind 4]
repo: https://github.com/ikoobee/ikoTheme
license: MIT
featured: true
---

## 为什么又造了一个轮子

用别的主题二开大半年，第三次解「上游更新 × 本地魔改」的合并冲突之后，我认了：需求清单已经和上游设计分道扬镳，不如从头写一套自己能维护的。

## 设计立场

- **零默认客户端 JS**：搜索、评论、灯箱全部懒加载，Lighthouse 四类 ≥ 90 由 CI 门禁固化
- **构建期完成一切**：KaTeX、OG 分享图、图片 srcset 都在 build 时渲染
- **配置单点**：站点身份、导航、评论、侧边栏板块全部收在 `src/config/site.ts`

## 内置能力

全文搜索（Pagefind）、giscus / Waline / Twikoo 三评论适配、RSS 全文、每篇文章构建时生成 OG 分享图、图片灯箱、页面过渡（View Transitions）、归档热力图。

## 模板使用

```bash
npm create astro@latest -- --template ikoobee/ikoTheme
```
