# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
