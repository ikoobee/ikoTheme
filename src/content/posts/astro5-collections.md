---
title: Astro 5 内容集合实战：从 Markdown 到类型安全的站点
desc: Content Layer API 入门：定义 schema、glob 加载器、类型推导，以及迁移路上踩过的坑。
date: 2026-08-28
category: Tutorial
tags: [Astro, Content Collections, TypeScript]
---

内容集合（Content Collections）是 Astro 最被低估的能力：它让你的 Markdown 不再是「一堆字符串」，而是一组构建期校验过的数据。

## 定义集合与 schema

在 `src/content.config.ts` 里用 zod 声明每个集合的形状：

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(["Code", "Tutorial", "Essay", "Daily"]),
    tags: z.array(z.string()).default([]),
  }),
});
```

写错字段名或日期格式，构建直接失败并指出是哪个文件——这在二开主题时代是想都不敢想的体验。

## 类型推导直达页面

```astro
---
import { getCollection } from "astro:content";
const posts = await getCollection("posts", (p) => !p.data.draft);
---
{posts.map((p) => <h2>{p.data.title}</h2>)}
```

编辑器里 `p.data.` 的每一次补全，都来自你的 schema。

## 踩过的坑

- `z.coerce.date()` 接受字符串日期，但时区按 UTC 解析，展示时注意格式化
- glob 加载器的 `base` 是相对项目根目录，不是相对配置文件
- frontmatter-only 的 `.md`（没有正文）也是合法条目，`entry.body` 为 `undefined`

## 小结

内容集合换来的不是「又一个 API」，而是整条内容流水线的类型安全。主题作者把 schema 定义好，使用者写内容时就被保护了。
