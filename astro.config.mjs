import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  // TODO: change this to your own domain when deploying
  site: "https://example.com",
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      // dual themes, switched via [data-theme] (see styles/global.css)
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
