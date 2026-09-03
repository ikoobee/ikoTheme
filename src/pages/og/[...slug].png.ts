import type { APIRoute } from "astro";
import sharp from "sharp";
import { SITE } from "../../config/site";
import { postsByDate, coverVisual, fmtDate } from "../../utils/content";

/**
 * Per-post OG image (1200x630), rendered at build time with sharp.
 * Font stack falls back across platforms; CI installs fonts-noto-cjk
 * so Chinese titles render deterministically in GitHub Actions.
 */

const FONT = "Noto Sans CJK SC, Noto Sans SC, Microsoft YaHei, PingFang SC, sans-serif";

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c,
  );
}

/** CJK chars count as 1 unit, latin/digits as ~0.55 — wrap title to max 2 lines */
function wrapTitle(title: string, maxUnits: number): string[] {
  const units = (s: string) =>
    [...s].reduce(
      (a, c) => a + (/[⺀-鿿豈-﫿＀-￯]/.test(c) ? 1 : 0.55),
      0,
    );
  if (units(title) <= maxUnits) return [title];
  const chars = [...title];
  const lines: string[] = [];
  let cur = "";
  for (const ch of chars) {
    if (units(cur + ch) > maxUnits && cur) {
      lines.push(cur);
      cur = ch;
      if (lines.length === 2) break;
    } else {
      cur += ch;
    }
  }
  if (lines.length < 2) {
    lines.push(cur);
  } else if (cur) {
    lines[1] += "…";
  }
  return lines.slice(0, 2);
}

export async function getStaticPaths() {
  const posts = await postsByDate();
  return posts.map((p) => ({ params: { slug: p.id } }));
}

export const GET: APIRoute = async ({ params }) => {
  const posts = await postsByDate();
  const post = posts.find((p) => p.id === params.slug);
  const title = post?.data.title ?? SITE.titleSuffix;
  const meta = post
    ? `${fmtDate(post.data.date)} · ${post.data.category} · ${SITE.name}`
    : SITE.name;

  // reuse the deterministic cover gradient of this post
  const hexes = post ? (coverVisual(post.id).g.match(/#[0-9a-f]{6}/gi) ?? []) : ["#6366f1", "#22d3ee"];
  const [c1, c2] = [hexes[0] ?? "#6366f1", hexes[1] ?? "#22d3ee"];

  const lines = wrapTitle(title, 17);
  const titleY = lines.length === 1 ? 330 : [290, 372];

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1060" cy="120" r="160" fill="#ffffff" opacity="0.08"/>
  <circle cx="150" cy="570" r="200" fill="#ffffff" opacity="0.06"/>
  <text x="84" y="112" font-family="${FONT}" font-size="30" fill="#ffffff" opacity="0.85">ikoTheme · ${esc(SITE.name)}</text>
  ${
    lines.length === 1
      ? `<text x="84" y="${titleY}" font-family="${FONT}" font-size="56" font-weight="bold" fill="#ffffff">${esc(lines[0])}</text>`
      : `<text x="84" y="${titleY[0]}" font-family="${FONT}" font-size="56" font-weight="bold" fill="#ffffff">${esc(lines[0])}</text>
  <text x="84" y="${titleY[1]}" font-family="${FONT}" font-size="56" font-weight="bold" fill="#ffffff">${esc(lines[1])}</text>`
  }
  <text x="84" y="560" font-family="${FONT}" font-size="26" fill="#ffffff" opacity="0.78">${esc(meta)}</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
