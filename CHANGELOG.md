# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-09-04

### Added

- Project scaffold: MIT license, bilingual README, CHANGELOG, CI (check + build), project-level CLAUDE.md
- M1 skeleton: Astro 5 + TypeScript + Tailwind 4 setup, design tokens, content collections
  (posts / projects / moments / friends) with zod schemas, Base layout (header / footer /
  theme toggle without FOUC), pages for home / posts / post detail / projects / archive /
  moments / links / about / 404, reading enhancements (TOC, reading time, prev/next,
  related posts, license block), archive publishing heatmap
- M2 polish: hero canvas particles (reduced-motion aware), oversized cover watermarks,
  article reading progress bar, copy button on shiki code blocks, projects status filter,
  posts category/tag filtering with shareable hash state (`#cat=` / `#tag=`)
- Comments: pluggable adapters for giscus / Waline / Twikoo — single active provider
  via config, lazy-loaded on scroll, giscus & Waline dark-mode synced
  (setup guide in docs/comments.md)
- Search: Pagefind full-site search modal (`Ctrl/⌘+K` or `/`), index built post-build
- RSS full-text feed (`/rss.xml`), SEO meta + default OG image, sitemap link in head
- Donation dialog on article pages (opt-in via `DONATE` config, user-supplied QR images)
- Posts pagination (`/posts/2/`+, 6 per page) with shared PostRow component
- Repo: bilingual Sponsor sections (EN → GitHub Sponsors link, zh → folded QR images
  from the sponsor-assets masters), FUNDING.yml pointing to ikoobee.com/sponsor
- M4 polish: per-post OG images rendered at build time (`/og/<slug>.png`, sharp,
  deterministic on CI via fonts-noto-cjk); accessibility pass (`<main>` landmark,
  skip-to-content link, search input aria-label, AA-contrast tertiary text and
  category/badge text via color-mix darkening); Lighthouse CI gate (4 categories
  ≥ 90) in a dedicated workflow job
