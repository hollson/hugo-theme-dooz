> [中文文档](./README-ZH.md)

# Dooz

A clean, elegant Hugo theme for programmers and long-form writers. It ships with site search, an article table of contents, a CSDN-style code block toolbar, and configurable branding.

## Features

- Home page, post list, categories, tags and archives
- Built-in search with title-first scoring
- CSDN-style code blocks: language label, copy, expand/collapse
- Sticky article TOC on the left, natural page scroll for the body
- Configurable logo text, font family and font weight
- Optional GitHub / CSDN / CNBlog / email / WeChat links
- Responsive layout with a collapsed mobile navbar
- Chinese and English UI strings

## Install

Requires Hugo **0.158.0** or newer.

```bash
hugo new site myblog
cd myblog
git clone https://github.com/yourname/hugo-theme-dooz.git themes/hugo-theme-dooz
```

Or as a submodule:

```bash
git submodule add https://github.com/yourname/hugo-theme-dooz.git themes/hugo-theme-dooz
```

Enable it in `hugo.toml`:

```toml
theme = "hugo-theme-dooz"
```

## Try the demo

```bash
cp -rp themes/hugo-theme-dooz/exampleSite/* ./
hugo server -D
```

Open <http://localhost:1313>. All author details, emails, social links and avatars in `exampleSite` are placeholders.

Runtime CSS, JavaScript, fonts, KaTeX, and Mermaid assets are bundled locally, so page rendering does not require a CDN. External links in sample content are only followed when clicked.

## Configuration

See [`exampleSite/config.toml`](exampleSite/config.toml) for the full example.

```toml
baseURL = "https://example.com/"
title = "Dooz Demo"
theme = "hugo-theme-dooz"
locale = "zh-CN"
defaultContentLanguage = "zh"
hasCJKLanguage = true

[pagination]
  pagerSize = 10

[outputs]
  home = ["HTML", "RSS", "JSON"]  # JSON is used by the built-in search

[params]
  author = "Example Author"
  email = "hello@example.com"
  avatar = "img/res/avatar.svg"
  aphorism = "Code, and a life around it."

  logoText = "Dooz"
  logoFontFamily = '"Fraunces", "Bodoni 72", Didot, Georgia, serif'
  logoFontWeight = 700

  github = "https://github.com/example"
  csdn = "https://blog.csdn.net/example"
  cnblog = "https://www.cnblogs.com/example/"
  # wechat = "img/wechat.png"

  repo = "https://github.com/yourname/hugo-theme-dooz"
  hero = "img/res/hero.jpg"
  slogan = "Simple and quiet, made for writing."
```

## Content

```bash
hugo new content post/my-first-post.md
```

```toml
+++
title = "My first post"
date = 2026-03-22
description = "One sentence for the list and SEO."
cover = "img/res/hero.jpg"
categories = ["Notes"]
tags = ["Hugo"]
archives = "2026"
author = "Example Author"
+++
```

### H2 icons

Enable Goldmark attributes:

```toml
[markup.goldmark.parser]
  attribute = true
```

Then use:

```markdown
## Overview {data-icon="book"}
## Setup {data-icon="tools"}
## Code {data-icon="code"}
```

Available icons: `book`, `tools`, `file`, `code`, `play`, `link`.

## Docs

- [Hugo static blog guide](docs/Hugo静态博客指南.md)
- [Theme features and configuration](docs/theme-features.md)

## Contributing

Issues and pull requests are welcome. Do not include real personal QR codes, email addresses or phone numbers in demos, screenshots or docs.

## License

[MIT](LICENSE)
