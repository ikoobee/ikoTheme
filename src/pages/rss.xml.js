import rss from "@astrojs/rss";
import { marked } from "marked";
import { SITE } from "../config/site";
import { postsByDate } from "../utils/content";

export async function GET(context) {
  const posts = await postsByDate();
  return rss({
    title: SITE.titleSuffix,
    description: SITE.description,
    site: context.site ?? SITE.domain,
    items: await Promise.all(
      posts.map(async (p) => ({
        title: p.data.title,
        description: p.data.desc,
        pubDate: p.data.date,
        link: `/posts/${p.id}/`,
        content: await marked.parse(p.body ?? ""),
      })),
    ),
  });
}
