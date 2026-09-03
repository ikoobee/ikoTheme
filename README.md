# ikoTheme

[![CI](https://github.com/ikoobee/ikoTheme/actions/workflows/ci.yml/badge.svg)](https://github.com/ikoobee/ikoTheme/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5-blueviolet.svg)](https://astro.build)

**An Astro blog theme where posts and projects are both first-class citizens.**

Built for indie developers and open-source authors who want one clean homepage
for their writing *and* their work: a main content stream (featured → latest
posts → projects → moments) plus a companion sidebar, dark mode, an archive
timeline, and reading enhancements — all static, all fast.

> 简体中文说明见 [README.zh-CN.md](README.zh-CN.md)。

## Status

🚧 **Feature-complete, pre-v1.0** — M1–M4 landed (layout, collections, search,
comments, RSS, per-post OG images, a11y pass, Lighthouse CI gate). See the
[roadmap](#roadmap) for what's next.

## Quick Start

Requirements: Node.js 20+ (22 recommended).

```bash
# from a clone of this repo (template usage once v1.0 is published:
#   npm create astro@latest -- --template ikoobee/ikoTheme)
npm install
npm run dev        # http://localhost:4321
```

Write content in `src/content/`:

| Collection | Path | What it drives |
|---|---|---|
| `posts` | `src/content/posts/*.md` | Blog articles (`/posts/<slug>`) |
| `projects` | `src/content/projects/*.md` | Project showcase (`/projects`) |
| `moments` | `src/content/moments/*.md` | Short-form updates (`/moments`) |
| `friends` | `src/content/friends/*.md` | Blogroll (`/links`) |

Site identity (name, author, nav, taglines…) is configured in one place:
[`src/config/site.ts`](src/config/site.ts).

```bash
npm run build      # static output in dist/
npm run check      # astro check (types + content schema)
```

## Features

- Two-zone homepage: prioritized main stream + natural-height companion sidebar
- Light/dark theme: system-aware, remembered, no flash on load
- Posts + projects as separate, schema-validated content collections
- Article page: auto TOC, reading time, word count, prev/next, related posts, license block,
  opt-in donation dialog (bring your own QR images)
- Pluggable comments: giscus / Waline / Twikoo adapters — pick one in
  `src/config/site.ts` (`COMMENTS.provider`), lazy-loaded on scroll, dark-mode synced
  (setup guide: [docs/comments.md](docs/comments.md))
- Full-site search: Pagefind (`Ctrl/⌘+K` or `/`), built as a post-build step
- RSS with full-text content, sitemap, SEO meta + default OG image
- Posts pagination (6 per page) once you have enough content
- Archive timeline with per-month publishing heatmap (computed from real data)
- Zero client-side JS by default; styles driven by design tokens

### Roadmap

- [x] M2: visual parity with the approved design prototype
- [x] M3: Pagefind search, comment adapters, RSS full text, donation dialog, pagination
- [x] M4: per-post OG images (build-time, sharp), accessibility pass (landmarks, skip link,
      AA contrast tokens), Lighthouse CI gate (4 categories ≥ 90)
- [ ] v1.0 release + template repo (`npm create astro@latest -- --template ikoobee/ikoTheme`)
- [ ] v1.1: i18n (zh/en), recent-searches, optional image lightbox

## License

[MIT](LICENSE) © 2026 Ethan (ikoobee)

## ☕ Sponsor / 赞赏

If this theme helps you ship your blog faster, consider
[sponsoring the author](https://github.com/sponsors/ikoobee) ☕

简体中文用户可查看 [README.zh-CN.md](README.zh-CN.md#-sponsor--赞赏) 的赞赏码。
