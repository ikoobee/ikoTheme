import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import {
  transformerNotationDiff,
  transformerMetaHighlight,
} from "@shikijs/transformers";

/**
 * GitHub-style callouts — `:::note` / `:::tip` / `:::warning` / `:::danger`
 * containers, rendered at build time (remark-directive provides the syntax,
 * this plugin maps names to styled divs with a title row).
 */
const CALLOUTS = {
  note: "ℹ️ 提示",
  tip: "💡 建议",
  warning: "⚠️ 注意",
  danger: "🚫 警告",
};
function remarkCallouts() {
  const walk = (node) => {
    for (const child of node.children ?? []) {
      if (child.type === "containerDirective" && CALLOUTS[child.name]) {
        child.data = child.data ?? {};
        child.data.hName = "div";
        child.data.hProperties = { className: ["callout", `callout-${child.name}`] };
        const title = {
          type: "paragraph",
          data: { hName: "p", hProperties: { className: ["callout-title"] } },
          children: [{ type: "text", value: CALLOUTS[child.name] }],
        };
        child.children.unshift(title);
      }
      walk(child);
    }
  };
  return (tree) => walk(tree);
}

/**
 * Code block chrome via the `pre` hook: adds the `line-numbers` class (CSS
 * counters) and `data-title`/`data-lang` attributes (rendered as a header
 * strip by CSS). Long-block folding is done client-side in BaseLayout when
 * the copy-button wrapper is built.
 *
 * CAUTION: any exception inside a shiki transformer is swallowed by Astro
 * and silently renders the WHOLE article body empty. `this.options.meta` is
 * an object ({ __raw }), not a string — read `meta.__raw` (found the hard way).
 */
function transformerCodeChrome() {
  return {
    name: "iko:code-chrome",
    pre(pre) {
      // NOTE: this.options.meta is an OBJECT ({ __raw }) in Astro's shiki
      // context — call .match on the string and the render silently dies.
      const meta = this.options.meta?.__raw ?? "";
      const title = meta.match(/title="([^"]+)"/)?.[1];
      pre.properties.class = `${pre.properties.class ?? ""} line-numbers`.trim();
      if (title) pre.properties.dataTitle = title;
      pre.properties.dataLang = this.options.lang;
    },
  };
}

/**
 * Sitemap lastmod — maps routes to content dates by scanning frontmatter
 * (posts get `updated ?? date`, list pages get the newest content date).
 */
function frontmatterDates(dir) {
  const map = new Map();
  const full = path.resolve(dir);
  if (!fs.existsSync(full)) return map;
  for (const f of fs.readdirSync(full)) {
    if (!f.endsWith(".md")) continue;
    const slug = f.replace(/\.md$/, "");
    const text = fs.readFileSync(path.join(full, f), "utf8");
    const fm = text.split("---")[1] ?? "";
    const pick = (key) => fm.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim();
    const d = pick("updated") ?? pick("date");
    if (d) map.set(slug, new Date(d).toISOString());
  }
  return map;
}
const postDates = frontmatterDates("./src/content/posts");
const projectDates = frontmatterDates("./src/content/projects");
const newest = (m) => (m.size ? new Date(Math.max(...[...m.values()].map(Date.parse))).toISOString() : undefined);

// https://astro.build/config
export default defineConfig({
  // TODO: change this to your own domain when deploying
  site: "https://example.com",
  integrations: [
    sitemap({
      serialize(item) {
        const m = item.url.match(/\/posts\/([^/]+)\/?$/);
        const p = new URL(item.url).pathname;
        if (m && postDates.has(m[1])) item.lastmod = postDates.get(m[1]);
        else if (p === "/projects/") item.lastmod = newest(projectDates);
        else if (p === "/" || p === "/posts/") item.lastmod = newest(postDates);
        return item;
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, remarkCallouts],
    rehypePlugins: [rehypeSlug, rehypeKatex],
    shikiConfig: {
      // dual themes, switched via [data-theme] (see styles/global.css)
      themes: { light: "github-light", dark: "github-dark" },
      transformers: [
        transformerNotationDiff(),
        transformerMetaHighlight(),
        transformerCodeChrome(),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
