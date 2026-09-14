---
name: loadwise
desc: 跨境装柜规划引擎：重量/堆叠/旋转/间隙/支撑的确定性约束求解，附方案校验器与柜型库。
date: 2026-08-20
status: wip
tech: [TypeScript, Vitest]
repo: https://github.com/ikoobee/loadwise
license: MIT
featured: false
---

## 解决什么问题

跨境物流的装柜环节长期靠老师傅「拍脑袋」：货能不能压、能不能转、间隙留多少，全凭经验。装错一次，货损 + 目的港罚款可能吃掉整柜利润。

LoadWise 把这些经验翻译成确定性约束：载重上限、堆叠规则、旋转模式、货物间隙、底部支撑，全部显式建模。

## 引擎形态

- 纯 TypeScript，pnpm workspace 单仓多包
- 核心求解器不依赖任何 UI 框架，可嵌入网页 / CLI / 服务端
- 附带**方案校验器**：给定装柜方案输出全部违约项，供回归测试
- 内置常用柜型库（20GP / 40GP / 40HQ / 45HQ）

## 状态

open-core 基座：引擎与校验器 MIT 开源，可视化与批量规划作为商业版演进。项目进行中。
