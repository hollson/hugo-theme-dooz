---
# ===== 一、基础信息（必填）=====
title: "{{ .Name }}"
description: "文章简介，用于列表摘要和 SEO，请认真填写"
date: {{ now.Format "2006-01-02T15:04:05Z07:00" }}
author: "{{ .Site.Params.author | default "Mafool" }}"
draft: true                          # 📢 设为 false 才会发布

# ===== 二、分类归档（常用）=====
tags: []                             # 标签，如 ["Hugo", "教程"]
categories: []                       # 分类，如 ["技术"]
# archives: ["2026"]                 # 归档年份；不填则按 date 自动归档

# ===== 三、封面图片（按需）=====
# image: "/post/cover.jpg"           # 列表封面；不填用站点默认图
# cover: "/post/cover.jpg"           # 文章头图；优先级高于 image

# ===== 四、SEO 与链接（按需）=====
# keywords: "SEO,关键字"              # 不填则取 description
# url: "/post/xxx/"                  # 自定义链接；不填按 permalinks 自动生成
# aliases: ["/posts/old-url/"]       # 旧链接重定向（改过 URL 时用）

# ===== 五、主题扩展（按需）=====
# subtitle: "副标题"                  # 标题下方的副标题
# pinned: true                       # 置顶显示
# enableToc: true                    # 生成目录（主题默认开启）
# hideToc: false                     # 正文里隐藏目录
# enableTocContent: false            # 目录内容是否展开
# libraries: ["mermaid", "katex"]    # 按需加载流程图 / 数学公式
# weight: 0                          # 排序权重，越小越靠前，可为负；排序优先级：pinned > weight > date
# lastmod: {{ now.Format "2006-01-02T15:04:05Z07:00" }}  # 最后修改时间
---


今天是{{ now.Format "2006-01-02" }}，欢迎开启新的博客。

> 以下写作说明在正式发布前删除即可。

## 快速开始

1. **填简介**：把 front matter 的 `description` 改成文章摘要（会被搜索引擎和列表页引用）。
2. **填分类标签**：按需写 `categories` 和 `tags`，例如 `tags: ["Hugo", "教程"]`。
3. **写正文**：从下一行开始用 Markdown 写作，段落之间**空一行**。
4. **插图**：图片放 `static/post/`，正文用 `![说明](/post/xxx.jpg)` 引用。
5. **预览**：`hugo server -D`，浏览器打开 `http://localhost:1313`。
6. **发布**：写完后把 `draft` 改为 `false`，再 `hugo build --gc --minify`。

## 常用写法

```markdown
## 二级标题（文章标题已由 front matter 提供，正文从二级标题开始）

正文段落，段落之间空一行；段内换行在行尾加两个空格。

**加粗** · *斜体* · [链接](https://example.com) · `行内代码`

> 引用块

- 列表项一
- 列表项二

![图片说明](/assets/blog.jpg)
```

需要流程图或数学公式时，取消 front matter 里 `libraries` 的注释（填 `mermaid` / `katex`），再用对应代码块即可。
