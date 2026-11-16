---
title: "Dooz 主题功能示例"
date: 2026-03-22T10:00:00+08:00
description: "用一篇示例文章展示 Dooz 的标题图标、代码块工具条、文章目录和搜索入口。"
keywords: "Hugo,Dooz,主题,代码块,搜索"
image: "assets/hero.jpg"
cover: "assets/hero.jpg"
categories: ["主题"]
tags: ["Hugo", "主题", "示例"]
archives: "2026"
author: "示例作者"
pinned: true
weight: 1
---

这是一篇放在 `exampleSite/content/post/` 的示例文章。它没有真实个人信息，用来演示主题的排版和交互。

## 快速开始 {data-icon="play"}

复制示例站配置并启动：

```bash
cp -rp themes/hugo-theme-dooz/exampleSite/* ./
hugo server -D
```

打开 <http://localhost:1313> 即可看到首页、文章列表和这篇文章。

## 配置 Logo {data-icon="tools"}

Logo 的文本、字体和字重都在站点参数中：

```toml
[params]
  logoText = "Dooz"
  logoFontFamily = '"Fraunces", "Bodoni 72", Didot, Georgia, serif'
  logoFontWeight = 700
  logoFontUrl = ""
```

`logoFontUrl` 留空时使用系统字体，不请求外部资源。

## 代码块工具条 {data-icon="code"}

代码块顶部会显示语言、状态点和操作按钮：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Dooz")
}
```

超过 20 行的代码默认折叠，可以展开、收起和复制。代码区使用深色背景，和正文形成清晰分层。

## 搜索 {data-icon="book"}

导航栏的搜索框会读取首页 JSON 索引。标题命中的权重高于正文；输入至少 2 个字符才开始搜索，结果面板固定高度并可滚动。

## 目录与侧栏 {data-icon="file"}

详情页左侧目录会随页面滚动固定，正文正常滚动。目录、最近文章、相关文章和标签都在侧栏中完整展开。

## 参考 {data-icon="link"}

- [Hugo 官方文档](https://gohugo.io/documentation/)
- 仓库内的 `exampleSite/config.toml` 与 `docs/theme-features.md`
