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

🚧 **Under active development** (M1 milestone). Core layout, content
collections, and theming are landing; see the
[roadmap](#roadmap) for what ships next.

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
- Article page: auto TOC, reading time, word count, prev/next, related posts, license block
- Archive timeline with per-month publishing heatmap (computed from real data)
- Zero client-side JS by default; styles driven by design tokens

### Roadmap

- [ ] M2: full visual parity with the approved design prototype
- [ ] M3: Pagefind full-site search (`Ctrl/⌘+K`), giscus comments, RSS full text,
      OG image generation, donation dialog (user-supplied QR images)
- [ ] M4: Lighthouse 4×100, accessibility pass, bilingual README polish, v1.0 release

## License

[MIT](LICENSE) © 2026 Ethan (ikoobee)
