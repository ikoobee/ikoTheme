# 评论系统启用指南

ikoTheme 内置 **giscus / Waline / Twikoo** 三种评论适配器，同一时间**启用其一**。
未启用的适配器不会渲染、不进入客户端产物；已启用的适配器在滚动到评论区时才
加载脚本（懒加载），不影响首屏性能。

## 如何选择

| | giscus | Waline | Twikoo |
|---|---|---|---|
| 后端 | **零后端**（GitHub 托管一切） | 自部署 Serverless + 自选数据库 | 自部署 Serverless + MongoDB |
| 评论身份 | GitHub 账号 | 匿名（昵称+邮箱）/ 社交登录 | 匿名（昵称+邮箱） |
| 数据归属 | GitHub Discussions（公开可导出） | 完全自有（自己的数据库） | 自有（自己的 Mongo） |
| 适合读者 | 开发者为主 | 混合 / 大众读者 | 混合 / 大众读者 |
| 维护成本 | ≈0 | 中（函数 + 库 + SMTP） | 中低 |

一句话：读者全是开发者选 giscus；有大量非开发者读者选 Waline（功能与维护
活跃度最优）或 Twikoo（部署最简）。

## 通用切换方式

所有配置在 [`src/config/site.ts`](../src/config/site.ts) 的 `COMMENTS` 段：

```ts
export const COMMENTS: CommentsConfig = {
  provider: "none", // ← 改成 "giscus" | "waline" | "twikoo"
  ...
};
```

- `provider: "none"`（默认）：评论区完全不渲染，零痕迹。
- provider 已选但对应配置为空：评论区显示一条配置提示（不会白屏），按提示
  补全字段后重启 `npm run dev` 即可。

## giscus（推荐起步）

1. 准备一个**公开** GitHub 仓库（可以直接用你部署博客的仓库，或单独建一个）
2. 该仓库 **Settings → General → Features** 勾选 **Discussions**
3. 安装 giscus App：<https://github.com/apps/giscus> 并授权该仓库
4. 打开 <https://giscus.app>，填入仓库名，选好 Discussion 分类
   （建议 Announcements——只有维护者能发起），页面会生成一段代码，
   从中拷贝 `data-repo-id` 与 `data-category-id`
5. 填入配置并切换 provider：

```ts
provider: "giscus",
giscus: {
  repo: "yourname/your-repo",
  repoId: "R_xxxxxxxx",
  category: "Announcements",
  categoryId: "DIC_xxxxxxxx",
},
```

行为说明：语言固定 zh-CN、按 pathname 关联文章、表情回应开启；站点明暗主题
切换时评论区主题自动同步。

## Waline

1. 按 Waline 官方部署文档起一个 Serverless 后端（Vercel / Netlify / Cloudflare
   等）+ 数据库（免费档可选 Cloudflare D1、MongoDB Atlas 等）：
   <https://waline.js.org/guide/get-started/>
2. 部署完成后得到服务地址（如 `https://waline.example.com`）
3. 填入配置：

```ts
provider: "waline",
waline: {
  serverURL: "https://waline.example.com",
},
```

行为说明：中文界面；暗色模式跟随站点 `html[data-theme="dark"]`；管理后台、
邮件通知等在你的 Waline 服务端配置，与主题无关。

## Twikoo

1. 按 Twikoo 官方文档部署（Vercel / Netlify / Railway / 自托管）并绑定
   MongoDB：<https://twikoo.js.org/quick-start.html>
2. 填入配置：

```ts
provider: "twikoo",
twikoo: {
  envId: "https://your-twikoo.vercel.app",
},
```

行为说明：部署 URL 即 `envId`；管理面板在部署后的后台（首次访问评论区设置
管理员密码）；暗色样式跟随页面 CSS。

## FAQ

**可以同时开两种吗？**
不支持也不建议：同一场讨论被劈成两处、脚本权重翻倍、SEO 混乱。用 provider
单选切换即可。

**换方案后旧评论还在吗？**
各方案数据互相独立（GitHub Discussions / 你的数据库），切换 provider 后旧
评论不再展示但数据仍在原处，切回去即恢复。

**国内访问注意**
giscus 依赖 github.com（脚本与 iframe），国内个别网络环境下可能加载慢或不
稳定——可自托管 giscus 服务端或改用 Waline/Twikoo（自部署，可用性可控）。

**Dev 模式下评论区不显示？**
`provider` 为 `none` 时本就不渲染；已启用却不显示，检查对应配置字段是否为
空（会有提示条说明缺什么）。
