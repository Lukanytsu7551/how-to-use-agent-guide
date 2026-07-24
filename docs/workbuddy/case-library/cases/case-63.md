# Case 63｜磁盘快满了？一句话让AI帮你扫描分类一键出报告

> **WorkBuddy 案例集 · 第 63 篇**
> 分类：办公协同与效率提升

---

## 一、场景描述

Mac 磁盘只剩 9.2 GB，233 GB 的盘 95.9% 已用，微信电脑老是提醒存储空间不足。以前遇到这种事，套路是：打开「关于本机」看一眼大数字然后懵、开终端敲 du -sh * 一个一个目录猜、搜过期教程、最后掏钱买清理工具会员。这次不折腾了，让 WorkBuddy 来。早上正好看到卡神开源了电脑清理技能 storage-analyzer，把链接扔给 WorkBuddy，三步搞定磁盘扫描和分类报告。

## 二、想要完成的任务

用 WorkBuddy + storage-analyzer 技能，先学习技能作用，再安全审计后安装，最后一句话扫描磁盘，生成带三级分类（可清理/需判断/谨慎）和清理命令的交互式 HTML 报告，全程只读不动文件。

## 三、使用的 Skill

| Skill / 能力 | 用途 | 来源 | 所需权限 |
|---|---|---|---|
| storage-analyzer | macOS/Windows 只读磁盘分析助手，扫描→AI 智能分类→交互式 HTML 报告 | GitHub 开源（KKKKhazix/khazix-skills，12.5k Stars） | 无 |
| skill-scanner | 腾讯朱雀实验室 A.I.G Skill Scanner 安全审计 | WorkBuddy 内置 | 无 |
| 文件系统只读扫描 | du/ls/stat 只读方式扫描 HOME 目录一二级子目录 | storage-analyzer 内置 | 无 |

## 四、前置条件

1. 已安装并登录 WorkBuddy 客户端
2. macOS 系统（也支持 Windows）
3. 能访问 GitHub 获取 storage-analyzer 仓库

## 五、在 WorkBuddy 中的操作

### 步骤 1：让 AI 研究技能作用
把 GitHub 链接扔给 WorkBuddy：「帮我看看这个 skill 有什么作用」。WorkBuddy 自己爬了仓库所有文件，出了份完整报告：macOS/Windows 只读磁盘分析助手，工作流是扫描→AI 智能分类→交互式 HTML 报告，亮点是三级分类（可清理/需判断/谨慎）、零依赖、全程只读。
**关键步骤**：先学习再安装，确认技能靠谱。

### 步骤 2：安全审计 + 安装
说一句「帮我安装这个 skill」。WorkBuddy 先调腾讯朱雀实验室的 skill-scanner 做安全审计：来源为 GitHub 开源仓库（12.5k Stars）社区活跃；会访问文件但扫描阶段只读，删除操作需用户在网页上二次确认且受白名单约束；没有发现联网行为，server.py 仅启动本地 127.0.0.1 服务；未发现危险操作，多层安全机制约束。审计通过后，7 个文件自动下到 ~/.workbuddy/skills/storage-analyzer/。
**关键步骤**：安装前自动做安全审计，不用手动检查。

### 步骤 3：一句话开扫
说一句「帮我看看存储」。WorkBuddy 自动触发 storage-analyzer 技能，背后跑三件事：① 跑 scan.py 只读方式把 HOME 目录下一级二级子目录全过一遍；② 拿扫描结果 + macOS 目录参考文档自动识别每个目录是干嘛的，然后分级；③ 生成交互式 HTML 报告。
**关键步骤**：一句话触发完整扫描+分类+报告流程。

### 步骤 4：查看报告
报告显示：总容量 233.5 GB，已用 224.2 GB（95.9%），剩余 9.2 GB（红灯），文件系统 APFS。三级分类：🟢 能放心清的约 10.6 GB（Library/Caches 5.5 GB/开发缓存 4.5 GB/Xcode CoreSimulator 1.5 GB）；🟡 得想想再清的约 56.3 GB（微信 15.8 GB/Docker 9.7 GB/Ollama 模型 6.7 GB/.gemini 备份 2.1 GB）；🔴 手别欠的约 10.3 GB（Anaconda3 4.7 GB/网易 MuMu 模拟器 3.6 GB）。每项都附清理命令。

## 六、提示词或任务指令

| 步骤 | 指令 | 作用 |
|---|---|---|
| 1 | `帮我看看这个 skill 有什么作用：https://github.com/KKKKhazix/khazix-skills/tree/main/storage-analyzer` | 让 WorkBuddy 爬仓库文件出报告，学习技能作用 |
| 2 | `帮我安装这个 skill` | 触发 skill-scanner 安全审计，审计通过后自动安装 |
| 3 | `帮我看看存储` | 一句话触发扫描+AI 分类+生成交互式 HTML 报告 |

## 七、在 WorkBuddy 中的效果

### 交付物
1. storage-analyzer 技能学习报告（作用/工作流/亮点）
2. skill-scanner 安全审计报告（来源可信度/是否动文件/是否联网/是否有危险操作四项检测全通过）
3. storage-analyzer 技能安装成功（7 个文件下到 ~/.workbuddy/skills/storage-analyzer/）
4. 交互式 HTML 存储分析报告
5. 磁盘概况：总容量 233.5 GB，已用 224.2 GB（95.9%），剩余 9.2 GB
6. 三级分类清单：🟢 可清理约 10.6 GB / 🟡 需判断约 56.3 GB / 🔴 谨慎约 10.3 GB
7. 每项附可复制清理命令（如 rm -rf ~/Library/Caches/* / docker system prune -a / xcrun simctl delete unavailable）

### 结果证明

![学习技能报告](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRMrFibGfWTicOLxjFHzpiaG4u05tEHWqS0mNcRrfPPxEXd2NFKWMGNnQILzGozVykPrhfz7Rz1YafMM1LZxHof4PfmD9FTe2AJPsU/640?wx_fmt=png&watermark=1#imgIndex=0)

![安全审计通过](https://mmbiz.qpic.cn/mmbiz_png/s516EMWvbRPWV3mTM7MVmISic3AyQIfccrcAx1chFhgJyfVKhX7pzaPxy86Wkpx0o7YhKNeQbBECq9s6adGobcKw8HpFHB9k6x3icE1oSaf58/640?wx_fmt=png&watermark=1#imgIndex=1)

![一句话开扫](https://mmbiz.qpic.cn/sz_mmbiz_png/s516EMWvbRM2s5cCcb75lwjdG6vCxntwrZzcfMN3e5QJSqUDeJiaDHPIboLxndP7KsiaSOA0iablym3LLZWLvb3u7FMuuJUmNeEfpXN5VpXv7U/640?wx_fmt=png&watermark=1#imgIndex=2)

![存储分析报告](https://mmbiz.qpic.cn/mmbiz_jpg/s516EMWvbROnPCHZO4kBOLnvgQbJBQElhibllYf6SN0ZKZQeOje1XrnFJtLKiaWIRoVCucHrZEdp6KQPEIcYJuia2cIctLce8JWjiaCic5XD7mRM/640?wx_fmt=jpeg&watermark=1#imgIndex=3)

## 八、验收标准

- [ ] 把 GitHub 链接扔给 WorkBuddy 能出技能学习报告
- [ ] 报告包含：macOS/Windows 只读磁盘分析助手、扫描→AI 智能分类→交互式 HTML 报告、三级分类零依赖全程只读
- [ ] 「帮我安装这个 skill」触发 skill-scanner 安全审计
- [ ] 安全审计四项检测：来源可信度/是否动文件/是否联网/是否有危险操作
- [ ] 审计通过后 7 个文件自动下到 ~/.workbuddy/skills/storage-analyzer/
- [ ] 「帮我看看存储」一句话触发扫描+AI 分类+HTML 报告
- [ ] 报告显示总容量 233.5 GB，已用 224.2 GB（95.9%），剩余 9.2 GB
- [ ] 🟢 可清理约 10.6 GB（Library/Caches 5.5 GB/开发缓存 4.5 GB/Xcode CoreSimulator 1.5 GB）
- [ ] 🟡 需判断约 56.3 GB（微信 15.8 GB/Docker 9.7 GB/Ollama 模型 6.7 GB/.gemini 备份 2.1 GB）
- [ ] 🔴 谨慎约 10.3 GB（Anaconda3 4.7 GB/网易 MuMu 模拟器 3.6 GB）
- [ ] 每项附可复制清理命令
- [ ] 扫描阶段全程只读，删除需在网页上手动确认
