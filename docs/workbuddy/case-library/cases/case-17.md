# Case 17｜WorkBuddy 空目录一键清理

> **WorkBuddy 案例集 · 第 17 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

昨天打开 WorkBuddy 文件夹，里面突然冒出一大堆纯数字时间戳目录，比如 20260323122341、20260415002335 这类名称。点进去一看，全是空目录！密密麻麻一堆，强迫症真的忍不了。

关键是：自动化任务有专门的 automation-claw-* 目录，跟这些垃圾空目录完全两码事。留着没用，手动删又怕删错。

于是直接丢给 WorkBuddy 一句话：我目录里全是时间戳空目录，帮我写个安全脚本，只删空的，重要目录别动。AI 确认规则后，直接生成了安全脚本，10 秒搞定，目录瞬间清爽。

## 二、想要完成的任务

用 WorkBuddy 生成一个安全的 Python 清理脚本，自动扫描并删除 WorkBuddy 主目录下的时间戳空目录，跳过白名单与自动化任务目录，支持"先预览再执行"两步操作，避免误删。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy 对话能力 | 接收一句话需求、定位目录、确认规则、生成脚本 | 内置能力 | WorkBuddy 账号 |
| Bash / 代码执行 | 扫描目录、运行 Python 脚本（预览 + 执行） | 内置能力 | 本地文件读写、目录遍历 |
| 代码编辑能力（Write） | 生成 cleanup_workbuddy.py 脚本文件 | 内置能力 | 本地文件读写 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 本机存在 `~/WorkBuddy/` 主目录（注意不是 `~/.workbuddy/`）
3. 本机已安装 Python 3
4. WorkBuddy 主目录下存在时间戳命名的空目录需要清理
5. 重要目录已纳入白名单（如 Claw、cover-images、特定时间戳目录等）

## 五、在 WorkBuddy 中的操作

### 步骤 1：一句话提出需求
我跟 WorkBuddy 说：「我目录里全是时间戳空目录，帮我写个安全脚本，只删空的，重要目录别动。」
**关键步骤**：用一句话描述问题与边界要求（只删空、重要目录保留），AI 接收需求。

### 步骤 2：定位目录（AI 也会踩坑）
让 WorkBuddy 直接定位目录，结果它跑到 `~/.workbuddy/` 里啥也没有。我当场给它骂了一顿：「你给老子好好看看，workBuddy 在那个目录！」AI 才找到正确的 `~/WorkBuddy/` 主目录，扫描出 68 个数字目录、52 个是空的。就差一个点，AI 也会踩坑。
**关键步骤**：AI 误判为 `~/.workbuddy/`，经用户指正后定位到 `~/WorkBuddy/`，完成 68 个目录的扫描统计。

### 步骤 3：确认规则（只删空目录，重要目录一律保留）
跟 AI 明确要求：① 只删空的时间戳目录；② 有内容的目录绝对不动；③ Claw、cover-images、项目目录必须保留；④ automation-claw-* 自动化目录跳过不碰。AI 确认规则后，直接生成安全脚本。
**关键步骤**：明确 4 条清理规则，AI 据此生成对应逻辑的 Python 脚本。

### 步骤 4：WorkBuddy 生成清理脚本
AI 生成的 Python 脚本功能包括：指定 WorkBuddy 主目录为 `~/WorkBuddy`、设置白名单目录不会被删除、支持预览模式（不实际删除）、支持执行模式（真正删除）、自动跳过 automation-claw-* 自动化任务目录、只删除完全为空的目录。
**关键步骤**：AI 输出 `cleanup_workbuddy.py`，含 `--dry-run` 与 `--execute` 两个互斥参数。

### 步骤 5：两步使用，超级安全
第一步先预览（不会删任何东西）：运行 `python3 cleanup_workbuddy.py --dry-run`，查看待删除列表。第二步确认无误，再执行删除：运行 `python3 cleanup_workbuddy.py --execute`，正式清理空目录。
**关键步骤**：先 dry-run 预览，再 execute 执行，双保险避免误删。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `我目录里全是时间戳空目录，帮我写个安全脚本，只删空的，重要目录别动。` | 触发 AI 接收需求并开始定位目录 |
| 2 | `你给老子好好看看，workBuddy 在那个目录！` | 修正 AI 误判的 `~/.workbuddy/`，定位到 `~/WorkBuddy/` |
| 3 | （AI 确认规则）`只删空的时间戳目录 / 有内容不动 / Claw、cover-images、项目目录保留 / automation-claw-* 跳过` | 明确 4 条清理规则，AI 据此生成脚本 |
| 4 | `python3 cleanup_workbuddy.py --dry-run` | 预览模式，查看哪些目录会被删除 |
| 5 | `python3 cleanup_workbuddy.py --execute` | 执行模式，正式清理空目录 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 一个安全的 Python 清理脚本 `cleanup_workbuddy.py`
2. 完整的目录扫描报告（68 个目录，52 个空目录）
3. 已清理的 WorkBuddy 主目录（空目录全部移除）

### 结果证明

![WorkBuddy 目录中大量时间戳空目录](/images/workbuddy-cases/case-17/01.png)

![用户提醒 AI 找错目录](/images/workbuddy-cases/case-17/02.png)

![WorkBuddy 找到正确目录并统计 68 个数字目录](/images/workbuddy-cases/case-17/03.png)

### 清理规则表

| 规则 | 行为 |
|---|---|
| 只删空目录 | 目录必须完全为空才删除 |
| 白名单保留 | Claw、cover-images、指定时间戳目录不删 |
| automation-claw-* | 跳过自动化任务目录 |
| 有内容目录 | 一律不动 |
| 预览模式 | `--dry-run` 只展示不删除 |
| 执行模式 | `--execute` 正式清理 |

## 八、验收标准

- [ ] AI 能正确定位到 `~/WorkBuddy/` 主目录（非 `~/.workbuddy/`）
- [ ] 扫描出全部时间戳目录数量并标记空目录数（实测 68 个目录，52 个空）
- [ ] 生成的脚本支持 `--dry-run` 预览模式（不删除任何内容）
- [ ] 生成的脚本支持 `--execute` 执行模式（真正删除空目录）
- [ ] 白名单目录（Claw、cover-images、指定时间戳）不会被删除
- [ ] automation-claw-* 自动化任务目录被跳过
- [ ] 有内容的目录一律不动，只删完全为空的目录
- [ ] 先预览再执行的两步流程可正常跑通
- [ ] 10 秒内完成清理，目录瞬间清爽
