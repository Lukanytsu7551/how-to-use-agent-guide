# Case 61｜让AI帮你点麦当劳？WorkBuddy这个技能我玩嗨了

> **WorkBuddy 案例集 · 第 61 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

闲逛 WorkBuddy 的技能市场，突然看到一个熟悉的面孔——麦当劳助手。支持查菜单、查门店、领优惠券、比价、跟踪订单状态……功能还挺全的。顺手就点了「去试试」，结果发现背后用的是 MCP（Model Context Protocol）协议，需要先拿到麦当劳官方的 API Token 才能用。整个配置流程大约 3 分钟，之后想吃麦当劳，跟 WorkBuddy 说一句话就行。

## 二、想要完成的任务

在 WorkBuddy 中安装麦当劳助手技能，获取麦当劳 MCP Token 并配置信任连接器，最终通过一句话对话完成查优惠券和一键领取，全程不打开任何 App 或网页。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 麦当劳助手（mcd-order MCP） | 支持麦当劳点餐下单、菜单与门店查询、优惠券领取和比价、订单状态跟踪，并可提供营养成分/热量搭配建议、活动咨询、积分查询与兑换 | WorkBuddy 技能市场 | 麦当劳会员账号 + MCP Token |
| MCP 配置能力 | 把 Token 写入 ~/.workbuddy/mcp.json 并验证 | WorkBuddy 内置 | WorkBuddy 账号 |
| 连接器信任管理 | 首次连接 MCP 服务需手动信任确认 | WorkBuddy 内置 | WorkBuddy 账号 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 拥有麦当劳会员账号（手机号即可注册）
3. 能访问 https://open.mcd.cn/mcp 获取 MCP Token

## 五、在 WorkBuddy 中的操作

### 步骤 1：发现并安装麦当劳助手
在 WorkBuddy 技能市场搜索「麦当劳助手」，点击「去试试」。技能详情显示：支持麦当劳点餐下单、菜单与门店查询、优惠券领取和比价、订单状态跟踪，并可提供营养成分/热量搭配建议、活动咨询、积分查询与兑换。

### 步骤 2：尝试调用发现未配置
直接发了一句「帮我看看麦当劳有啥优惠」。WorkBuddy 提示：麦当劳 MCP 工具在当前会话中不可见，mcd-order 连接器还未被信任/启用，或者 MCP 配置尚未完成。需要先前往 https://open.mcd.cn/mcp/doc 获取 MCP Token。
**关键步骤**：第一次调用会失败，WorkBuddy 会给出获取 Token 的链接和配置指引。

### 步骤 3：获取麦当劳 MCP Token
打开 https://open.mcd.cn/mcp，点右上角「登录」，手机号 + 验证码登录。回到首页点「立即体验」，弹出 Token 对话框点「激活」，勾选同意服务条款点「同意」，拿到一串 Token，点复制图标拷下来。
**关键步骤**：Token 代表麦当劳会员身份，严禁分享。

### 步骤 4：把 Token 告诉 WorkBuddy
拿着 Token 直接发给 WorkBuddy：「2OxmzjhbS3g7SwEOtSmPwqJmZQumKV5N 这是我的 token，帮我配置下」。WorkBuddy 写入 mcd-order 配置，验证通过：mcd-order 配置正确，JSON 有效，认证头已设置。但提示还需手动完成一步：信任连接器。

### 步骤 5：信任麦当劳 MCP 连接器
打开 WorkBuddy 连接器管理页 → 自定义连接器，找到 mcd-order，点击蓝色的「信任」按钮。看到 mcd-order 变成绿色，显示 23/23 个工具已启用，说明连接成功。
**关键步骤**：必须手动点「信任」按钮，否则 MCP 不会自动生效。

### 步骤 6：查优惠 & 一键领券
重新问一句「查麦当劳优惠券」。WorkBuddy 同时查可领券、卡包已有券、和当月活动，返回 5 张可领取优惠券列表。接着说「帮我一键领取」，5 张券秒领全部到账，每张券都带独立券码。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我看看麦当劳有啥优惠` | 首次调用发现未配置，WorkBuddy 给出获取 Token 的链接和配置指引 |
| 2 | `2OxmzjhbS3g7SwEOtSmPwqJmZQumKV5N 这是我的 token，帮我配置下` | 把 Token 写入 ~/.workbuddy/mcp.json 并验证配置 |
| 3 | `查麦当劳优惠券` | 调用麦当劳 MCP 查询可领取优惠券、卡包已有券和当月活动 |
| 4 | `帮我一键领取` | 一键领取全部 5 张可领优惠券，每张券返回独立券码 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 麦当劳 MCP 连接器配置成功（mcd-order，23/23 个工具已启用）
2. 当前可领取优惠券清单（5 张：免费脆薯饼、满分饱饱双人早餐、11.9元麦辣鸡腿汉堡、19.9元小食任选2、好薯成双早餐）
3. 5 张优惠券全部领取到账，每张带独立券码（如 MCD6082FJ80R0110ESR09 等）

### 结果证明

![技能市场麦当劳助手](/images/workbuddy-cases/case-61/01.png)

![麦当劳助手详情页](/images/workbuddy-cases/case-61/02.png)

![首次调用提示未配置](/images/workbuddy-cases/case-61/03.png)

![Token 配置写入成功](/images/workbuddy-cases/case-61/04.png)

![信任连接器](/images/workbuddy-cases/case-61/05.png)

![查优惠券结果](/images/workbuddy-cases/case-61/06.png)

![一键领取成功](/images/workbuddy-cases/case-61/07.png)

## 八、验收标准

- [ ] 在技能市场找到「麦当劳助手」并查看详情
- [ ] 首次调用「帮我看看麦当劳有啥优惠」时提示 mcd-order 连接器未配置
- [ ] 访问 https://open.mcd.cn/mcp 登录麦当劳账号并激活获取 MCP Token
- [ ] 把 Token 发给 WorkBuddy，配置写入 ~/.workbuddy/mcp.json 并验证通过
- [ ] 在连接器管理页找到 mcd-order，点击「信任」按钮
- [ ] mcd-order 变成绿色，显示 23/23 个工具已启用
- [ ] 「查麦当劳优惠券」返回 5 张可领取优惠券清单
- [ ] 「帮我一键领取」5 张券全部到账，每张券带独立券码
- [ ] 全程不打开任何 App 或网页，跟 AI 聊几句就把事办了
- [ ] 第一次配置约 3 分钟，之后完全不用管
