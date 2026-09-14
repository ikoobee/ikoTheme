---
name: classroom-seating
desc: 纯前端教室排座工具：硬约束 + 10 条规则加权，爬山×模拟退火寻优，数据全部留在本地。
date: 2024-11-01
status: stable
tech: [Vanilla JS, 模拟退火]
repo: https://github.com/ikoobee/classroom-seating
license: MIT
featured: true
---

## 起因

当班主任的朋友吐槽：「每次换座位都要权衡四十多个学生的关系，比写代码难。」——那就交给代码。

## 核心思路

把老师的直觉拆成 10 条可计算的规则（想同桌、要隔开、视力优先……），每条一个权重，组合成目标函数，再用模拟退火在 3 秒预算内寻优。

## 工程决策

- **纯前端 + WebWorker**：换座位不该需要装个 App
- **数据全本地**：学生名单不出浏览器，localStorage 持久化 + 导入导出
- **零构建**：Vanilla ES Modules，一个 HTML 直接跑

上线一学期后的评价：「它给的方案不总是我心里的最优，但从来不会离谱。」
