# Case 18｜不用积分也能用！WorkBuddy 接入 Gemma 4

> **WorkBuddy 案例集 · 第 18 篇**
> 分类：AI能力扩展

---

## 一、场景描述

用过 WorkBuddy 的朋友都知道，它的内置模型调用是要消耗积分的，要花钱。免费额度用完、签到不够用，高频办公很快就见底，长期用也是一笔开销。

上周 Google 悄悄发布了 Gemma 4，开源、免费商用，最小的 2B 版本手机都能跑，最大的 27B 版本性能已经接近主流付费模型。很多人看到这个消息的第一反应是：听起来不错，但怎么用？

本篇完整走一遍流程——从安装 Ollama、下载 Gemma 4，到在 WorkBuddy 里接入自定义模型，全程不花一分钱，不扣 WorkBuddy 积分。Gemma 4 基于 Gemini 3 技术架构，支持 256K 超长上下文，采用 MoE 混合专家架构，Apache 2.0 开源协议，提供 2B/4B/26B/31B 四种规格。

## 二、想要完成的任务

在 WorkBuddy 中接入本地运行的 Gemma 4 模型（通过 Ollama），实现日常问答、文案写作、代码生成等场景的免费使用，不消耗 WorkBuddy 积分。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| WorkBuddy 自定义模型配置 | 接入 OpenAI 兼容协议的本地模型 | WorkBuddy 设置 | WorkBuddy 账号 |
| Ollama（本地模型运行） | 在本机启动 Gemma 4 模型 API 服务 | 第三方工具 | 本地安装 |
| Bash / 终端命令 | 安装 Ollama、下载模型、启动服务、版本验证 | 内置能力 | 命令执行 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. 本机操作系统为 Mac / Windows / Linux 之一
3. 本机内存 ≥ 8GB（2B 版本）/ 16GB（4B 推荐）/ 32GB（27B）
4. 已安装 Homebrew（Mac）或可访问 Ollama 官网（Windows）
5. 网络 available，可下载 Ollama 与 Gemma 4 模型文件（2B 约 7.2GB）
6. 端口 11434 未被占用

## 五、在 WorkBuddy 中的操作

### 步骤 1：安装 Ollama
Ollama 是目前本地运行大模型最简单、最稳定的工具，支持 Mac/Windows/Linux 全平台。
- Mac：终端执行 `brew install ollama`（无 Homebrew 需先安装，或去官网下载安装包拖入应用文件夹）
- Windows：从 Ollama 官网下载 Windows 版本，双击安装，系统自动配置环境
- Linux：终端执行 `curl -fsSL https://ollama.com/install.sh | sh`
安装完成后用 `ollama --version` 验证是否安装成功。
**关键步骤**：三平台任选其一安装 Ollama，并用 `ollama --version` 验证。

### 步骤 2：下载 Gemma 4 模型
根据电脑内存选择合适版本：8GB 以下用 2B、16GB 推荐 4B、32GB 及以上可跑 27B。下载并运行 2B 版本：`ollama run gemma3:e2b`。首次使用会自动下载模型文件（约 7.2GB），下载完成后自动进入对话界面，能正常回复即代表运行成功。输入退出命令即可回到正常终端界面。
**关键步骤**：根据内存选择版本，用 `ollama run` 拉取并验证模型可用。

### 步骤 3：启动 Ollama 服务
Ollama 会在本地启动一个 API 服务，供 WorkBuddy 调用。默认服务地址：`http://localhost:11434`。在终端输入 `ollama serve` 启动服务，启动成功后不要关闭终端窗口，保持后台运行。打开浏览器访问该地址，显示"Ollama is running"即正常。
**关键步骤**：执行 `ollama serve` 并保持后台运行，浏览器验证显示 "Ollama is running"。

### 步骤 4：在 WorkBuddy 配置自定义模型
Ollama 正常运行后即可接入 WorkBuddy，接入后走本地模型，不扣 WorkBuddy 积分。
- 第一步：打开 WorkBuddy，点击左下角设置图标，找到"自定义模型"入口
- 第二步：点击添加模型，按以下内容填写：
  - 模型类型：OpenAI 兼容
  - 模型名称：可自定义，例如 Gemma4:e2b（2B）
  - API 地址：`http://localhost:11434/v1`（必须带 /v1）
  - API Key：任意填写，本地模型不校验（作者填 ollama）
  - 模型 ID：`gemma4:e2b`（必须与下载的模型名称一致）
**关键步骤**：在 WorkBuddy 设置→自定义模型中添加 OpenAI 兼容模型，重点 API 地址必须带 `/v1`、模型 ID 必须与下载模型名一致。

### 步骤 5：切换模型并使用
在 WorkBuddy 主界面的模型下拉列表中，选择刚刚添加的 Gemma 4。发送一条测试消息，能正常回复即配置成功。
**关键步骤**：在主界面下拉切换到 Gemma 4，发测试消息验证可用。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `brew install ollama` | Mac 安装 Ollama |
| 2 | `ollama --version` | 验证 Ollama 安装是否成功 |
| 3 | `ollama run gemma3:e2b` | 下载并运行 Gemma 4 2B 版本（首次约 7.2GB） |
| 4 | `ollama serve` | 启动本地 API 服务，供 WorkBuddy 调用 |
| 5 | （WorkBuddy 设置中）`模型类型=OpenAI 兼容 / API 地址=http://localhost:11434/v1 / 模型 ID=gemma4:e2b` | 在 WorkBuddy 添加自定义模型，接入本地 Gemma 4 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. 本机可用的 Ollama + Gemma 4 本地模型环境
2. WorkBuddy 中接入的自定义模型 Gemma4:e2b
3. 一个不消耗积分的本地 AI 工作流

### 结果证明

![ollama --version 安装验证](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRPa2RshnUibibPE2w2Mml4msibicntbwoLr68zgYa6yeQuoGMoLs3UPzwctUkq8iakcfaWetYcjEoZ7yPAB8p8aCzOFWaia6B3Tnn7F4/640?wx_fmt=png&from=appmsg#imgIndex=0)

![下载并运行 Gemma 4 2B 版本](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNItwADlbU6AlEgY7vLliaUB1sibXuUic499YmgSMkLvvksbaEmAlPo4jmN4Fh03XFsN6OFHG8mjJJhbTncQr0G94FWmetj4FRTw0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

![Ollama 服务启动成功](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNicYJickicnXyvvBy6aok0BhQiarHX5y60Vtn56tF4c3dDCsQicMTmYQ2COQQT9nic8Ptkjz47gRbx81IA67Mcd10zkUib3AHUj7icN6Y/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=2)

![WorkBuddy 设置页面自定义模型入口](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNg1RG1QKcBst2sEicZTPClbQ55MB122eqvMdlNZvicGoW3MSdAhyeuNeyyO2pJkQcicAGCqibGM30IcqWWzqhoSTmq9fPhkL4yibF8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

![添加模型配置信息](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRNWSoEDWq5PJmxGNFTGkA8ewvjvUeb7RvgDric6n370wHyWbF7cjnYARDc6cewb8ZXhiaVjLohaQMYOj51NYFibdtc4BF4nZhdj5M/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=4)

![WorkBuddy 中切换 Gemma 4 测试对话](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRNiaXJic9FGCL5cmbI5T5o0HXzA7iccYCRhxw6rtD1lGdxicUIJFHnSSXY8oNBXfSibCs5ia3jPZ7ib8utLPHU6S37tBQiaqwPJnWtW1yQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

### Gemma 4 模型规格对照

| 规格 | 适用内存 | 说明 |
|---|---|---|
| 2B | 8GB 以下 | 手机/低配电脑可跑 |
| 4B | 16GB | 速度与效果最均衡 |
| 26B | 32GB+ | 高性能电脑 |
| 31B | 32GB+ | 最大规格 |

### 实际体验（2B 版本）

| 维度 | 表现 |
|---|---|
| 日常问答/文案/代码 | 流畅 |
| 网络延迟 | 本地运行，比云端 API 更快 |
| 上下文 | 256K，可一次处理几十页 PDF |
| 中文理解 | 正常，偶尔略生硬，办公够用 |
| 成本 | 完全免费，无 Token 限制，不扣 WorkBuddy 积分 |

## 八、验收标准

- [ ] Ollama 安装成功，`ollama --version` 能正常输出版本号
- [ ] Gemma 4 模型下载完成，`ollama run gemma3:e2b` 可进入对话
- [ ] `ollama serve` 启动后，浏览器访问 `http://localhost:11434` 显示 "Ollama is running"
- [ ] WorkBuddy 设置中成功添加自定义模型（OpenAI 兼容）
- [ ] API 地址填写为 `http://localhost:11434/v1`（带 /v1）
- [ ] 模型 ID 与下载的模型名称一致（gemma4:e2b）
- [ ] WorkBuddy 主界面下拉列表可切换到 Gemma 4
- [ ] 发送测试消息能正常回复，确认配置成功
- [ ] 整个流程不消耗 WorkBuddy 积分
