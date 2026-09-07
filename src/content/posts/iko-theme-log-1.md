---
title: "ikoTheme 开发日志 #1：灯箱、公式与丝滑的页面过渡"
desc: v1.1 的四个新特性是怎么用零依赖、零常驻脚本的方式落地的——以及为什么块级公式必须独立成段。
date: 2026-09-04
category: Code
tags: [Astro, ikoTheme, 博客]
---

v1.0 发布之后，我对着同类主题的功能清单做了一次逐项对比，最后圈出四个「低成本、高感知」的候选：图片灯箱、LaTeX 公式、页面过渡、侧边栏配置化。v1.1 把它们全部落地了，这篇记录一下取舍。

## 灯箱：原生 `<dialog>` 就够了

市面上的灯箱方案几乎都要引库。但 2026 年了，原生 `<dialog>` 自带焦点管理、Esc 关闭和 `::backdrop`，配上三十行样式就是一个完整灯箱：

```html
<dialog id="lightbox">
  <img id="lightboxImg" alt="" />
  <button id="lightboxClose" aria-label="关闭预览">✕</button>
</dialog>
```

点击文章图片时把 `currentSrc` 灌进弹窗、`showModal()` 一气呵成。图注直接取 `alt` 文本，无障碍和懒加载都是白送的。

## 公式：构建期渲染，客户端零成本

数学公式走 remark-math + rehype-katex，在构建期就渲染成 HTML 和 CSS，浏览器不跑一行 JS。比如模拟退火的接受概率：

$$
P(\text{accept}) = \exp\left(-\frac{\Delta E}{T}\right)
$$

行内公式像 $\alpha = 0.95$ 这样写就行。踩过一个坑：`$$公式$$` 写在同一行不会被识别为块级公式，**独立成段**才是正确姿势——这个约定已经写进 README。

## 页面过渡：最难的不是动画

接入 Astro 的 `ClientRouter` 只要一行，难的是让全站脚本在「换页不刷新」的世界里继续正常工作。重构原则很简单：

- 常驻行为（主题切换、滚动监听）绑定在 `document` 上，用事件委托，永远只绑一次；
- 页面级初始化（筛选、打字机、评论区懒加载）全部挂到 `astro:page-load`，每次换页重新执行；
- 搜索弹窗和灯箱用 `transition:persist` 跨页保活，状态不丢。

Hero 的粒子动画加了 `isConnected` 自检，页面切走后循环自动终止，不留僵尸 rAF。

## 结果

本地 Lighthouse 实测：首页性能 99 / 无障碍 92 / 最佳实践 100 / SEO 100，文章页性能满分。四项全过 CI 门禁的 90 分线，「零默认客户端 JS」的底线也守住了。

下一个大项是 i18n（zh/en），体量够单独发一个版本。在那之前，先用这套主题把文章写起来。
