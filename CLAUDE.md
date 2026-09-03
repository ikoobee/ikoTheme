# ikoTheme

An Astro blog theme where posts and projects are both first-class citizens.
Design prototype & full tech spec: `d:\Workspace\design-lab\ikoTheme\`（定稿事实源，
视觉规格与里程碑以其为准）.

## 快速命令

- 本地运行：`npm run dev`
- 构建：`npm run build`（产物 `dist/`）
- 检查：`npm run check`（astro check：类型 + 内容 schema）
- 预览构建产物：`npm run preview`

## 结构导览

- `src/config/site.ts` — 站点身份唯一配置源（品牌/作者/导航/签名档/公告）
- `src/content.config.ts` — 四个内容集合的 zod schema
- `src/content/{posts,projects,moments,friends}/` — 全部内容（Markdown + frontmatter）
- `src/layouts/BaseLayout.astro` — HTML 骨架、防闪烁主题脚本、全局交互
- `src/components/` — base（Header/Footer/ThemeToggle/Icon）与 cards（PostCard/ProjectCard）
- `src/pages/` — 七页面 + 404，静态路由
- `src/styles/` — tokens（设计令牌）+ global（组件样式，移植自原型）

## 本项目专属约定

- **品牌层级**（见开发文档 §8）：站点品牌 `ikoobee.com`（导航/页脚）；笔名 `Ethan`
  （Hero/个人卡/署名/版权行）；主题名 `ikoTheme` 仅出现在页脚 Powered by。
- **英文优先**：代码、注释、commit、issue、PR 用英文；README 双语（英为主文件）。
- 样式：Tailwind 4 + `tokens.css` 设计令牌；颜色/圆角/阴影一律走令牌，不写裸值。
- 设计令牌与视觉规格的唯一事实源是原型（design-lab）；改动视觉先同步原型再落代码。
- M3 前（搜索/评论/赞赏/RSS 全文）不要在 README 正文宣称这些功能已实现。
- friends 用 `.md`（frontmatter-only）而非 JSON 集合——与开发文档 §6 的细微偏差，
  为降低 loader 风险，后续如改 JSON 同步更新文档。
