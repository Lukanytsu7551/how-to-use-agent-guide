# 贡献指南

感谢你帮助完善 How to Use Agent。每次贡献应当帮助读者更快完成一个真实任务，并留下可以验证、复用和迁移的方法。

## 可以贡献什么

- 修正失效链接、过时截图、错别字和不准确表述。
- 补充 Codex、WorkBuddy 或 Agent Guide 的可复现教程、案例、章节与问题排查。
- 改进学习路径、导航、搜索、响应式体验与无障碍。
- 补充已核验的产品更新，并附原始来源和核对日期。

## 内容标准

1. **可复现**：写清环境、输入、关键步骤、交付物与预期结果。
2. **可验证**：说明读者如何确认任务成功，而不只描述过程。
3. **边界清楚**：区分产品事实、个人经验和适用条件。
4. **安全优先**：涉及文件、账号、密钥、发布或外部操作时说明权限、风险和人工确认点。
5. **尊重隐私与版权**：不要提交个人数据、访问凭据、内部资料或无权公开的素材。

## 修改内容

- Codex 教程入口位于 `docs/start/`、`docs/recipes/`、`docs/advanced/` 与 `docs/codex/`。
- WorkBuddy Guide 的入口位于 `docs/workbuddy/`；请沿现有侧栏和章节结构补充内容。
- Agent Guide 的现役书籍型入口位于 `docs/agent/index.md`、`docs/agent/preface.md`、`docs/agent/part-01/` 至 `docs/agent/part-10/` 和 `docs/agent/appendix-*.md`。
- `docs/agent/start/`、`docs/agent/recipes/`、`docs/agent/advanced/` 等旧入口仅用于兼容历史链接；新增 Agent 内容应进入现役 Part 目录。
- 参考手册位于 `docs/manual/`。
- 站点导航、主题与组件位于 `docs/.vitepress/`。

新增图片或附件时，请使用有意义的英文文件名，压缩体积，并完成脱敏处理。

## 本地验证

```bash
pnpm install
pnpm run build
pnpm test
```

提交前请确认：

- 修改页面和内部链接可访问。
- 图片、视频和代码示例可正常加载或运行。
- 桌面与移动宽度下文字不溢出、不遮挡。
- 没有提交密钥、个人信息、构建产物或无权公开的内容。

## Pull Request

PR 请说明：

- 改了什么；
- 为什么需要修改；
- 如何验证；
- 是否涉及产品事实更新；如涉及，请附来源和核对日期。

请让一个 PR 聚焦一个主题，便于审阅和回退。
