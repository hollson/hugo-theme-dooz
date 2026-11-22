---
# ===== 基础信息（必填）=====
title: "{{ .Name }}"
slug: "{{ now.Unix }}"                 # URL 标识，生成 /post/<slug>
description: "一句话说清这条笔记的结论"
keywords: ""                           # 搜索关键词，多个用逗号分隔
date: {{ now.Format "2006-01-02T15:04:05Z07:00" }}
draft: true                          # 📢 设为 false 才会发布
tags: []                             # 标签，如 ["随笔", "效率"]
categories: []                       # 分类，如 ["随手记"]

# ===== 可选字段（按需取消注释）=====
# cover_image: "/post/cover.jpg"      # 列表缩略图
# libraries: ["mermaid", "katex"]    # 流程图 / 数学公式
---


一条好笔记，**结论先行、要点清晰**。下面的示例文字在正式发布前替换掉即可。

<br/>

## 💡 一. 结论

> 用一句话给出结论，让读者 10 秒内知道这条笔记讲什么。

例如：Hugo 的 archetype 是**文章模板**，新建文章时自动套用，能省去重复的 front matter 配置。

<br/>

## 📌 二. 要点

- **结论一句话**：先写结论，再写依据，别让读者猜。
- **关键细节**：补充一个容易被忽略的点，用 `行内代码` 标注命令或参数。
- **延伸思考**：留一个开放问题或后续方向。

顺手记下当时用到的命令，方便日后回看：

```bash
hugo new content --kind note content/note/your-note.md
```

<br/>

## 🔗 三. 补充

可以是一段延伸阅读、一个参考链接，或一点个人感悟：

| 资源 | 说明 |
| --- | --- |
| [Hugo Archetypes](https://gohugo.io/content-management/archetypes/) | 官方文档，讲模板机制 |
| [Hugo Commands](https://gohugo.io/commands/) | 命令速查 |

> 好的笔记不是写给别人看的，是写给未来的自己看的。

---

*随手记录，仅供参考。*
