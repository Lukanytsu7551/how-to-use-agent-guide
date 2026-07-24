# Case 10｜接入通义千问！5步搞定WorkBuddy自定义模型

> **WorkBuddy 案例集 · 第 10 篇**
> 分类：AI能力扩展

---

## 一、场景描述

WorkBuddy 自带默认模型，日常聊天、简单问答完全够用。但当有这些需求时，就需要更强的东西：写长文时需要更稳定的输出质量；跑代码任务时需要更靠谱的逻辑能力；不同场景想切换不同模型（比如写文案用一个、写代码用另一个）。

群里讨论说阿里云刚出的 Qwen-Plus 代码能力强、体验很丝滑，那就试试接入到 WorkBuddy 中。默认模型做不到面面俱到，但 WorkBuddy 支持接入任意兼容 OpenAI 接口的模型，相当于给数字搭子换了一颗更强大的大脑。

接入方法就一种，学会一次，终身受用。这套方法适用于所有支持 OpenAI 兼容接口的模型（Qwen、GLM、DeepSeek、GPT 等），只是地址不同。

## 二、想要完成的任务

在 WorkBuddy 中接入通义千问 Qwen-Plus 模型，掌握「自定义模型接入」这一通用技能，实现不同场景切换不同模型。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| 自定义模型配置 | 添加 OpenAI 兼容协议的模型到 WorkBuddy | WorkBuddy 内置 | 本地配置写入 |
| 模型切换 | 在聊天界面切换不同模型使用 | WorkBuddy 内置 | 无 |

## 四、前置条件

1. 已安装 WorkBuddy 客户端并登录
2. 拥有阿里云账号（用于百炼平台获取 API Key）
3. 已在阿里云百炼平台开通 Qwen-Plus 模型服务
4. 了解 OpenAI 兼容接口的基本概念

## 五、在 WorkBuddy 中的操作

### 步骤 1：从千问官网进入阿里云百炼

打开浏览器访问千问官网 `https://tongyi.aliyun.com/`，点击右上角「API 服务」，页面会跳转到阿里云百炼 `bailian.console.aliyun.com`。

**关键步骤**：不要直接访问百炼官网，而是从千问官网的入口进入，后续操作会更顺畅。

### 步骤 2：进入百炼控制台

在阿里云百炼页面，点击「立即体验 Qwen3.6」，跳转到控制台后台。

**关键步骤**：进入控制台后台，准备创建 API Key。

### 步骤 3：创建 API Key

进入控制台后，左侧菜单找到「API Key」，点击右上角「创建 API Key」，填写描述（随便起名，比如「WorkBuddy 专用」），点击「确定」，复制生成的密钥字符串。

**关键步骤**：这个密钥只显示一次，复制完赶紧存好，丢了只能重新生成。

### 步骤 4：在 WorkBuddy 中配置模型

打开 WorkBuddy 客户端，点击左下角「设置」图标，进入「模型」选项，点击「添加模型」，选择「自定义 / Custom」，填写以下信息：

| 字段 | 填什么 |
|---|---|
| 接口地址 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| API Key | 粘贴第三步复制的密钥 |
| 模型名称 | `qwen-plus` |

填写完成后点击「保存」。

**关键步骤**：Base URL 必须带上完整路径 `/compatible-mode/v1`，漏了就调不通；模型 ID `qwen-plus` 是全小写，写成 `Qwen-Plus` 会找不到模型。

### 步骤 5：切换使用

配置完成后，在聊天界面左下角点击模型下拉菜单，选择「qwen-plus」即可使用。

**关键步骤**：在聊天界面左下角模型下拉菜单中，找到并选择「qwen-plus」开始使用。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 5 | `写一个 Python 函数，判断输入的字符串是否为回文（正读反读都一样），要求处理大小写和空格，带注释。` | 实测对比 Qwen-Plus 与其他模型的代码能力 |

### 其他模型平台的配置参考

- 智谱 GLM：去 `open.bigmodel.cn` 获取 API Key，Base URL 填 `https://open.bigmodel.cn/api/paas/v4`
- DeepSeek：去 `platform.deepseek.com` 获取，Base URL 填 `https://api.deepseek.com`
- OpenAI：去 `platform.openai.com` 获取，Base URL 填 `https://api.openai.com`

## 七、在 WorkBuddy 中的效果

### 交付物

1. 阿里云百炼平台创建的 API Key（描述：WorkBuddy 自定义使用）
2. WorkBuddy 中已保存的 qwen-plus 自定义模型配置
3. 在聊天界面可随时切换使用 qwen-plus 模型

### 结果证明

![同一个 WorkBuddy 可自由切换不同模型大脑](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPHpTRgSHjwDP4rjDWXFWKanRKQ6mdxY52AS4TicmCGEnoZ4bDx28ic8rIstepiaceLiaRia6dQyZ72orMXFDntes3ib4udzMoScicem0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=0)

![千问官网点击右上角 API 服务入口](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRMRdicLFtyqt59m51SRcgTvPByM8YsfgxC8CRUydwg0DBNGia6mtEZ3tiaDQfsWFTIYjk2ZuMMGtnCMF4O9umXRN38PajOjjPvXPQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![阿里云百炼平台首页](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNWGRsic7y9T5RNeke2Q1kxyIyicAoQucAQH4lkWib98Jiam2V2vWO8OrdDsoZ5KC6F9XVYVV71p89QKCrlcPuMibicMia6Fsdbj6amYw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![阿里云百炼体验中心页面](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNoShlBibfubLv1Zs0CRldFJV7V9ib86qDyz1fhERXGc3w4PJum6JV3G3q8oyyuic4tbAtvibfdQVJfNA8Gr0GbZatQFWVnD5Vu0D8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![百炼控制台创建 API Key 页面](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRN4XYVkTRRiapribI7zVDicl8IyyhG3CYibicwxVYJciarqKsX1koJuooJpiajp6f2ohjM18csrialzdpHibR1vgwwZ9C8dSViaapnsMbRfc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![百炼控制台填写 API Key 描述并创建](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbROE9NN9TzpPo4yzJYLr6BuSMPH8EiamlnvELmgNgtZZBnTJKJQpoYImrDMXQbx0kC3DAXibnWwFdItxsYhDFabXOVYqPNyJKdXCU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

![API Key 创建成功并复制密钥](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROEd8BUoUusovNfPpF8YfNp7CX8UG70NpNjV0xz2IqgPTVv6H6L7Qt5px46iaphlHicStR4AUUrpNxk8ia63IeC8uM2BgictjkH9ib0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

![WorkBuddy 设置中进入模型选项](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPXMN0HXjMK3s78picUm6UQS2tdiaibyvShwic3VLRNmtyCXB0qVictxMibQBfkFqMfGonBmdFibmOOt6Q5otCokBcQsB56knH3TQXHgA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

![WorkBuddy 添加自定义模型选择 Custom](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNtJHmIxPO03MmYIaYxIOibV0Y3hDibuia6o26kEW2B7ZUNuSHia2EbY6Md1AfPpYibbIKVlXTj8Ul0zD11u9ricxbVw0uBEiaGpyjSgg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

![WorkBuddy 填写接口地址 API Key 模型名称并保存](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbROuEJGrBV7iatr4aHTblBGia55NlV4pxamm27EjDFcYGWSYS4mVzRQq6zCp5ibe56SqzzoVOPmV7C0baWS8iaIAg9OAiaukoKCuu26I/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

![在聊天界面左下角模型下拉菜单切换 qwen-plus](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNiaJokKdny2M0yacOk1aicd9eQWIDGKos3IDrZJMRgZERp6icvWhBibZYgIn432ianJHKLXeIxicRV6I8HjJMkjptafo7ib3JY2ove7Q/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

### Qwen-Plus 与 GLM-5-Turbo 代码能力对比

用同一个轻量题目「写一个 Python 函数，判断输入的字符串是否为回文」测试：

| 对比项 | GLM-5-Turbo | Qwen-Plus |
|---|---|---|
| 注释 | 无 | 完整 docstring + 行内注释 |
| 边界处理 | 只去空格 | 去除所有非字母字符 |
| 类型标注 | 无 | `text: str` -> `bool` |
| 使用示例 | 无 | 两个 doctest 示例 |
| 变量命名 | `text` | `cleaned`（语义清晰） |

在轻量任务上，Qwen-Plus 确实表现更好——结构规范、考虑周全、拿过来就能用。但生成长文本（比如整篇公众号文章）时，响应变慢、额度消耗也很快，更适合代码类、短文本类任务。

## 八、验收标准

- [ ] 从千问官网 `tongyi.aliyun.com` 点击「API 服务」跳转到阿里云百炼
- [ ] 在百炼控制台「API Key」菜单中成功创建 API Key
- [ ] API Key 描述填写（如「WorkBuddy 自定义使用」），密钥已复制保存
- [ ] WorkBuddy 设置 → 模型 → 添加模型 → 选择「自定义 / Custom」
- [ ] 接口地址填写为 `https://dashscope.aliyuncs.com/compatible-mode/v1`（含完整路径）
- [ ] API Key 粘贴时无多余空格或换行
- [ ] 模型名称填写为全小写 `qwen-plus`
- [ ] 点击「保存」后模型配置写入本地 `models.json`
- [ ] 在聊天界面左下角模型下拉菜单中能看到并选择「qwen-plus」
- [ ] 使用 qwen-plus 模型可正常对话，调用不报错
- [ ] 掌握了切换其他模型（GLM、DeepSeek、OpenAI）的方法，只需替换接口地址和 API Key
