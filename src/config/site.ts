/**
 * Site identity — the single source of truth for branding.
 *
 * Brand hierarchy (see design doc §8, keep consistent everywhere):
 *  - site brand  : `ikoobee.com`  → navbar logo, footer, <title> suffix
 *  - author name : `Ethan`        → hero, profile card, bylines, copyright
 *  - theme name  : `ikoTheme`     → footer "Powered by" only
 */

export const SITE = {
  /** site brand shown in navbar/footer */
  name: "ikoobee.com",
  /** <title> suffix */
  titleSuffix: "Ethan · ikoobee.com",
  author: {
    name: "Ethan",
    handle: "ikoobee",
    email: "ikoobee@outlook.com",
    github: "https://github.com/ikoobee",
  },
  motto: "「运气是计划之外的东西」",
  /** TODO: change to your own domain (also update astro.config.mjs) */
  domain: "https://example.com",
  /** site start date, drives the "running days" stat */
  since: "2025-06-01",
  description: "Ethan 的个人自留地：写代码、造工具、记录把想法变成产品的过程。",
  taglines: [
    "把想法一个个做成产品的人。",
    "代码 · 随笔 · 项目集。",
    "构建中，而非完美中。",
    "Astro 玩家 / 终身学习者。",
  ],
  heroBadges: ["🛠 独立开发者", "📝 技术写作者", "🌏 开源爱好者"],
  announcement: {
    enabled: true,
    text: "ikoTheme M4 打磨完成：每篇文章自动生成分享图、无障碍与 Lighthouse 门禁就绪 🎉",
    link: "/posts/iko-theme-log-0/",
  },
  copyright: `© ${new Date().getFullYear()} Ethan (ikoobee)`,
  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
} as const;

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export const NAV: NavItem[] = [
  { id: "projects", label: "项目", href: "/projects/", icon: "rocket" },
  { id: "posts", label: "文章", href: "/posts/", icon: "pen" },
  { id: "archive", label: "归档", href: "/archive/", icon: "archive" },
  { id: "moments", label: "动态", href: "/moments/", icon: "chat" },
  { id: "links", label: "友链", href: "/links/", icon: "link" },
  { id: "about", label: "关于", href: "/about/", icon: "user" },
];

export const CATEGORIES = ["Code", "Tutorial", "Essay", "Daily"] as const;
export type Category = (typeof CATEGORIES)[number];

/**
 * Comment system — all three adapters are built in; pick ONE active provider.
 * Dormant adapters cost nothing client-side (they are never rendered).
 * All adapters lazy-load when scrolled into view.
 */
export type CommentsProvider = "giscus" | "waline" | "twikoo" | "none";

export interface CommentsConfig {
  provider: CommentsProvider;
  /** giscus: powered by GitHub Discussions — get repoId/categoryId at https://giscus.app */
  giscus: { repo: string; repoId: string; category: string; categoryId: string };
  /** waline: self-hosted serverless — https://waline.js.org */
  waline: { serverURL: string };
  /** twikoo: self-hosted serverless — https://twikoo.js.org */
  twikoo: { envId: string };
}

export const COMMENTS: CommentsConfig = {
  provider: "none", // switch to "giscus" | "waline" | "twikoo" to enable
  giscus: {
    repo: "ikoobee/ikoTheme", // TODO: your public repo with Discussions enabled
    repoId: "", // TODO: fill from giscus.app
    category: "Announcements",
    categoryId: "", // TODO: fill from giscus.app
  },
  waline: {
    serverURL: "", // TODO: e.g. https://waline.example.com
  },
  twikoo: {
    envId: "", // TODO: your twikoo deployment url
  },
};

/**
 * Donation dialog on article pages — disabled by default.
 * Put YOUR QR images at public/donate/ (never commit real payment QRs
 * you don't want public), then flip `enabled`.
 */
export const DONATE = {
  enabled: false,
  wechat: "/donate/wechat.png",
  alipay: "/donate/alipay.png",
  note: "如果文章帮到了你，可以请我喝杯咖啡 ☕",
};

/** zh-CN labels for project statuses */
export const STATUS_LABEL: Record<string, string> = {
  wip: "进行中",
  stable: "稳定",
  active: "活跃",
  beta: "测试",
  maintenance: "维护",
  archived: "归档",
};

export const SKILLS = [
  "Astro",
  "TypeScript",
  "Node.js",
  "Python",
  "算法",
  "DevOps",
  "Canvas",
  "CLI",
];

export const TIMELINE = [
  { year: "2023", title: "注册 ikoobee，开始沉淀个人品牌", desc: "从一串用户名开始，把散落各处的作品收拢到一处。" },
  { year: "2024", title: "classroom-seating 发布", desc: "第一个有点人气的开源项目，模拟退火排座工具。" },
  { year: "2025", title: "开始认真写博客", desc: "从 Hexo 起步，慢慢找到自己的选题节奏。" },
  { year: "2026", title: "ikoobee.com 上线 · ikoTheme 启动", desc: "个人官网与自研 Astro 主题双线推进。" },
];
