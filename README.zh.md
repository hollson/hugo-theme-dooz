> [English Doc](./README.md)

# Dooz

一个适合程序员和长期写作者的 Hugo 主题：克制的排版、内置搜索、文章目录、代码块工具条，以及可配置的 Logo 和社交链接。

## 特性

- 首页 Hero、文章列表、分类、标签、归档
- 全站搜索：标题优先评分，输入至少 2 个字符，结果列表可滚动
- CSDN 风格代码块：语言标识、复制、展开/收起，超过 20 行自动折叠
- 详情页左侧目录固定，正文自然滚动
- Logo 文本、字体、字重全部可配置
- GitHub / CSDN / 博客园 / 邮箱等社交入口按需显示
- 微信二维码为可选能力，示例站默认不包含
- 响应式布局，移动端折叠导航
- 支持中英文与自定义 i18n

## 安装

需要 Hugo **0.158.0** 或更高版本。

```bash
hugo new site myblog
cd myblog
git clone https://github.com/yourname/hugo-theme-dooz.git themes/hugo-theme-dooz
```

或者作为子模块：

```bash
git submodule add https://github.com/yourname/hugo-theme-dooz.git themes/hugo-theme-dooz
```

在 `hugo.toml` 中启用：

```toml
theme = "hugo-theme-dooz"
```

## 快速体验示例站

```bash
cp -rp themes/hugo-theme-dooz/exampleSite/* ./
hugo server -D
```

打开 <http://localhost:1313>。示例站里的作者、邮箱、社交链接、头像都是占位数据，可直接替换。

主题运行所需的 CSS、JavaScript、字体及 KaTeX、Mermaid 资源均随主题本地提供，页面渲染不依赖 CDN。示例文章中的外部链接仅在点击时访问。

## 配置

最小配置如下，完整示例见 [`exampleSite/config.toml`](exampleSite/config.toml)：

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
  home = ["HTML", "RSS", "JSON"]  # JSON 供站内搜索使用

[params]
  author = "Hollson"
  email = "hello@example.com"
  city = "示例城市"
  avatar = "img/res/avatar.svg"
  aphorism = "写代码，也写生活。"

  logoText = "Dooz"
  logoFontFamily = '"Fraunces", "Bodoni 72", Didot, Georgia, serif'
  logoFontWeight = 700

  github = "https://github.com/example"
  csdn = "https://blog.csdn.net/example"
  cnblog = "https://www.cnblogs.com/example/"
  # wechat = "img/wechat.png"    # 可选，不填则不显示二维码入口

  repo = "https://github.com/yourname/hugo-theme-dooz"

  hero = "img/res/hero.jpg"
  slogan = "简单、克制，适合长期写作。"
```

### Logo

- `logoText`：显示在导航和页脚的 Logo 文本
- `logoFontFamily`：CSS 字体栈
- `logoFontWeight`：字重

### 社交链接

只渲染已配置的入口。设为空字符串或删除对应键即可隐藏；`wechat` 只在配置了二维码图片时显示入口和弹窗。

## 写文章

```bash
hugo new content post/my-first-post.md
```

Front matter 示例：

```toml
+++
title = "我的第一篇文章"
date = 2026-03-22
description = "用于列表摘要和 SEO 的一句话。"
hero_image = "img/res/hero.jpg"
categories = ["随笔"]
tags = ["Hugo", "写作"]
archives = "2026"
author = "Hollson"
pinned = false
+++
```

### H2 标题图标

主题支持给文章内的 H2 加轻量线性图标，需要开启 Goldmark 的属性解析：

```toml
[markup.goldmark.parser]
  attribute = true
```

然后在标题后加属性：

```markdown
## 概述 {data-icon="book"}
## 准备工作 {data-icon="tools"}
## 示例代码 {data-icon="code"}
```

当前内置图标：`book`、`tools`、`file`、`code`、`play`、`link`。

## 文档

- [Hugo 静态博客指南](docs/Hugo静态博客指南.md)：安装、内容、主题、部署
- [主题功能与配置](docs/theme-features.md)：搜索、代码块、目录、Logo、页脚

## 贡献

欢迎提交 Issue 或 Pull Request。请勿在示例站、截图或文档中提交真实个人二维码、邮箱、手机号等隐私信息。

## License

[MIT](LICENSE)


特点：
- 评论
- 自定义 logo
- 文章 置顶、精选、分类、标签、系列灵活配置
- 丰富的主题色


- 代码块：复制、展开/收起、折叠、语言标识、行号、行高亮、复制按钮
- 目录：自动生成、固定、滚动
- 响应式布局，移动端折叠导航
- 支持中英文与自定义 i18n
- 可选的微信二维码入口
- 导航栏需要显示哪些也可以定制

# TODO: 4. 微信公众号主题
# TODO: 5. 优化readme
# TODO: 7. 优化页面滑动
# TODO: 11. 适应宽屏可移动端（页面适配工具）
<!-- # TODO: 12. Logo可替换成图片 -->
# TODO: 13. 首页布局和侧边栏模板可定制，如侧边栏放左还是右，侧边栏显示哪些模块
# TODO: 14. 清理主题中的所有注释，代码中的内容中文换英文，如alt和console.log的内容
# TODO: 15. 导航栏需要显示哪些也可以定制
# TODO: 16. 文章详情页的侧边栏模块也能配置
# TODO: 17. 文章的front matter可以执行markdown文章主题，如微信公众号风格等
# TODO: 版本已经是最新时，不弹公告




