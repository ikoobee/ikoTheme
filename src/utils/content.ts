import { getCollection, type CollectionEntry } from "astro:content";
import { SITE } from "../config/site";

export type Post = CollectionEntry<"posts">;
export type Project = CollectionEntry<"projects">;
export type Moment = CollectionEntry<"moments">;
export type Friend = CollectionEntry<"friends">;

/** posts per page — shared by /posts/ (page 1) and /posts/[...page] (pages ≥ 2) */
export const POSTS_PER_PAGE = 6;

/** all published posts, newest first */
export async function postsByDate(): Promise<Post[]> {
  return (await getCollection("posts", (p) => !p.data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function projectsAll(): Promise<Project[]> {
  return (await getCollection("projects")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function momentsAll(): Promise<Moment[]> {
  return (await getCollection("moments")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export async function friendsAll(): Promise<Friend[]> {
  return (await getCollection("friends")).sort((a, b) =>
    a.data.name.localeCompare(b.data.name),
  );
}

export function tagMap(posts: Post[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) m.set(t, (m.get(t) ?? 0) + 1);
  return m;
}

export function wordCount(p: Post): number {
  return (p.body ?? "").replace(/\s/g, "").length;
}

export function readingTime(p: Post): number {
  return Math.max(2, Math.round(wordCount(p) / 420));
}

/** related posts: same category (2 pts) + shared tags (1 pt each), top 2 */
export function relatedOf(p: Post, all: Post[]): Post[] {
  return all
    .filter((x) => x.id !== p.id)
    .map((x) => ({
      x,
      s:
        (x.data.category === p.data.category ? 2 : 0) +
        x.data.tags.filter((t) => p.data.tags.includes(t)).length,
    }))
    .filter((o) => o.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2)
    .map((o) => o.x);
}

export function siteDays(): number {
  return Math.max(1, Math.ceil((Date.now() - new Date(SITE.since).valueOf()) / 864e5));
}

export function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function fmtDateTime(d: Date): string {
  return d.toISOString().slice(0, 16).replace("T", " ");
}

/** github-slugger-compatible slug (matches rehype-slug heading ids) */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

export interface TocItem {
  depth: 2 | 3;
  text: string;
  id: string;
}

/** extract h2/h3 outline from markdown source (skips fenced code blocks) */
export function tocFrom(body: string): TocItem[] {
  const out: TocItem[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (m) {
      const text = m[2].trim();
      out.push({ depth: m[1].length as 2 | 3, text, id: slugify(text) });
    }
  }
  return out;
}

const COVER_GRADIENTS = [
  "linear-gradient(135deg,#6366f1,#22d3ee)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#10b981,#0ea5e9)",
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#334155,#0f172a)",
  "linear-gradient(135deg,#f43f5e,#f59e0b)",
  "linear-gradient(135deg,#14b8a6,#6366f1)",
  "linear-gradient(135deg,#64748b,#1e293b)",
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** deterministic gradient + glyph for cards without a cover image */
export function coverVisual(key: string): { g: string; glyph: string } {
  return { g: COVER_GRADIENTS[hash(key) % COVER_GRADIENTS.length], glyph: key.slice(0, 1).toUpperCase() };
}
