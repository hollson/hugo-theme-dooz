---
title: "如何使用 Dooz 主题搭建 Hugo 博客"
subtitle: "自带搜索、目录、代码工具条，装好就能写"
slug: "how-to-use-hugo-theme-dooz"
date: 2026-11-23T00:30:00+08:00
description: "Dooz 是一个好看又好用的 Hugo 博客主题：自带站内搜索、文章目录、代码块工具条、分类归档和响应式布局。本文带你从安装、配置到写作发布，搭建一个拿得出手的个人博客。"
keywords: "Dooz, Hugo 主题, 博客主题, Hugo, 博客搭建"
cover_image: "/post/dooz_theme.png"
draft: false
hide_toc: false
enable_toc: true
enable_toc_content: false
author: "Hollson"
featured: true
pinned: true
categories:
- 写作指南
archives:
- 2026
---

> 如果你想要一个打开就好看、写长文也舒服的个人博客，又不想折腾服务器和数据库，Hugo 加 Dooz 主题是一个很轻的选择。
这篇文章不铺开讲 Hugo 的所有细节，只回答三个问题：**Dooz 为什么值得用、怎么把自己的博客跑起来、怎么把它改成你的样子**。照着做，半小时内就能看到自己的站点。

<br/>

## 🌟 一、为什么值得用 Dooz

Dooz 是一个为程序员和长期写作者准备的 Hugo 主题。它没有把功能堆成一座工具箱，而是把博客最常用的部分打磨好：打开就好看的首页、读长文不累的目录、写代码顺手的工具条，以及不用额外插件的搜索和分类归档。

它不提供托管服务，也不带后台数据库，只负责把 Markdown 文章生成一套好看的静态网页。

具体来说，它有三个很直观的优点：

- **第一眼就好看**：首页 Hero、克制的排版、5 套主题色，不需要懂设计也能搭出完整站点
- **长文读起来舒服**：固定侧边目录、代码块复制/折叠/行号、站内搜索，技术文章和生活记录都合适
- **装好就能写**：分类、标签、归档、评论、统计、置顶、精选、系列文章都已接好，按需开关，不用二次开发

如果你想要一个装好就能写、长期看着也不腻的 Hugo 主题，Dooz 值得先试试。**Hugo 负责把内容变成网站，Dooz 负责让这个网站好看、好读、好用。**

主题地址：<https://github.com/hollson/hugo-theme-dooz>

<br/>

## 🧰 二、准备环境

需要两样东西：

1. **Hugo**，建议安装 extended 版，版本不低于 `0.158.0`
2. **Git**，用来获取主题和后续部署

安装完成后在终端确认：

```bash
hugo version
git --version
```

macOS 可以直接：

```bash
brew install hugo
```

Windows 可以用 winget：

```bash
winget install Hugo.Hugo.Extended
```

也可以从 [Hugo Releases](https://github.com/gohugoio/hugo/releases) 下载对应系统的压缩包。装完记得重新打开终端，让 `hugo` 命令生效。

<br/>

## 👀 三、先跑一遍示例站

在动手改自己的配置之前，先看看主题完整效果。这一步只是体验，不用在这里写文章。

```bash
git clone https://github.com/hollson/hugo-theme-dooz.git
cd hugo-theme-dooz/exampleSite
hugo server -D --themesDir ../..
```

浏览器打开 <http://localhost:1313>。

示例站里有首页、文章、分类、标签、归档和搜索，可以挨个点一遍，确认这是不是你想要的风格。看完按 `Ctrl + C` 停止服务。

<br/>

## 🏗️ 四、创建自己的站点

### 4.1 新建站点并安装主题

```bash
hugo new site myblog
cd myblog
git init

git submodule add https://github.com/hollson/hugo-theme-dooz.git themes/hugo-theme-dooz
```

如果不想用子模块，也可以直接克隆：

```bash
git clone https://github.com/hollson/hugo-theme-dooz.git themes/hugo-theme-dooz
```

子模块的好处是以后升级主题只需要一条命令：

```bash
git submodule update --remote themes/hugo-theme-dooz
```

### 4.2 用示例配置起步

把主题自带的示例配置复制到站点根目录：

```bash
rm hugo.toml
cp themes/hugo-theme-dooz/exampleSite/config.toml config.toml
mkdir -p static/assets
```

Windows 没有 `rm`、`cp` 命令，手动删除自动生成的 `hugo.toml`，再把 `exampleSite/config.toml` 复制到站点根目录即可。

然后启动预览：

```bash
hugo server -D
```

打开 <http://localhost:1313>。能看到首页，说明主题已经接上了。

> 不建议长期直接改 `themes/hugo-theme-dooz/` 里的文件。主题升级会覆盖你的修改。需要定制模板时，把对应文件复制到站点自己的 `layouts/` 下再改。

<br/>

## 🧩 五、改 config.toml：先改这几处

示例配置写得很全，但新手不需要一次看完。先改下面这些，其他保持默认。

### 5.1 站点身份

```toml
baseURL = "https://your-domain.com/"
title = "我的博客"
theme = "hugo-theme-dooz"
locale = "zh-CN"
defaultContentLanguage = "zh"
hasCJKLanguage = true
```

- `baseURL` 最后一定要带 `/`
- 本地预览阶段可以先不动，部署前再改成真实域名
- 如果部署在子路径，比如 GitHub Pages 的项目站点，要写成 `https://用户名.github.io/仓库名/`

### 5.2 作者卡片和 Logo

```toml
[params]
  author = "你的名字"
  email = "you@example.com"
  city = "你的城市"
  avatar = "assets/avatar.jpg"
  aphorism = "一句话介绍自己"

  logoText = "你的 Logo 文字"
  # logo = "assets/logo.png"
```

图片路径有一个容易踩的坑：**配置里写 `assets/avatar.jpg`，文件要放在站点的 `static/assets/avatar.jpg`，不是站点的 `assets/` 目录。**

原因是 `static/` 下的文件会原样发布到网站根目录，而 `assets/` 是给 Hugo 处理资源用的，不会自动变成可访问的图片地址。同理，文章封面写 `/post/cover.jpg`，文件就放在 `static/post/cover.jpg`。

`logo` 和 `logoText` 二选一：配置了 `logo` 图片会优先显示；想用纯文字 Logo，就把 `logo` 注释掉。

### 5.3 首页、社交和页脚

```toml
  hero = "assets/hero.jpg"
  slogan = "记录学习，也记录生活。"

  github = "https://github.com/你的用户名"
  csdn = ""
  cnblog = ""
  # wechat = "assets/wechat.png"
```

- `hero` 是首页大图，放在 `static/assets/hero.jpg`
- 不需要的社交入口留空即可隐藏
- `wechat` 只有在配置了二维码图片时才显示入口
- 页脚的 `footerSocial`、`footerGroups`、`copyright`、`icp` 默认是演示内容，上线前记得换成自己的，或者删掉不需要的项

### 5.4 先别删的配置

这几项和主题功能直接相关，新手先保持原样：

| 配置 | 作用 |
| --- | --- |
| `theme = "hugo-theme-dooz"` | 不填主题不会生效 |
| `[outputs]` 里的 `JSON` | 站内搜索靠它读取文章数据 |
| `[taxonomies]` 里的 `tag`、`category`、`archive` | 分类、标签、归档页面靠它生成 |
| `[permalinks]` 的 `post = "/post/:slug/"` | 决定文章 URL 结构 |

侧边栏显示哪些模块，可以在 `sidebarHome`、`sidebarArticle` 等参数里调整。比如只想在文章页保留目录、相关文章和推荐阅读：

```toml
sidebarArticle = ["toc", "related", "recommended"]
```

主题色可以在 `themeName` 里换：`default`、`purple`、`navy`、`terracotta`、`amber`。想隐藏首页 Hero、只保留导航，把 `themeSlim` 设为 `true`。

<br/>

## ✍️ 六、写第一篇文章

### 6.1 新建文章

```bash
hugo new content post/my-first-post.md
```
打开生成的文件，会看到一份带注释的 front matter。把最关键的部分改成这样：

```yaml
---
title: "我的第一篇文章"
slug: "my-first-post"
date: 2026-11-23T10:00:00+08:00
description: "一句话说明这篇文章讲什么。"
draft: false
categories:
- 随笔
tags:
- Hugo
- 博客
archives:
- 2026
---
```

几个字段的作用：

| 字段 | 说明 |
| --- | --- |
| `title` | 文章标题，列表和详情页都会用 |
| `slug` | URL 里的名字，建议用简短英文 |
| `date` | 发布日期，影响排序和归档 |
| `description` | 列表摘要和 SEO 描述 |
| `draft` | `true` 是草稿，发布前改成 `false` |
| `categories` / `tags` | 分类和标签，会自动生成聚合页 |
| `archives` | 归档年份，建议和 `date` 的年份保持一致 |

### 6.2 正文从二级标题开始

主题已经用 `title` 生成了文章大标题，正文里不要再写一个 `# 标题`，直接从 `##` 开始：

```markdown
## 为什么写博客

正文段落之间空一行。

## 我准备写什么

- 学习笔记
- 项目复盘
- 生活记录
```

文章里的 `##`、`###` 会自动进入目录。目录显示到几级，由 `config.toml` 里的 `tocLevels` 控制，默认是 `["H2","H3"]`。

### 6.3 常用开关

```yaml
# 首页置顶
pinned: true

# 进侧边栏精选
featured: true

# 系列文章，相同 series 的文章会互相关联
series: "Hugo 入门"

# 文章封面
cover_image: "/post/cover.jpg"

# 单篇文章强制把侧边栏放右边
sidebar_position: "right"

# 需要流程图或数学公式时按需加载
libraries:
- mermaid
- katex
```

不需要的项留空或删掉即可。代码块不用额外配置，正常写 Markdown 代码围栏，主题会自动加上语言标识、复制和折叠按钮。

<br/>

## 🚀 七、预览和发布

写作时开着预览：

```bash
hugo server -D
```

`-D` 表示把草稿也显示出来。改完保存，浏览器会自动刷新。

准备发布时：

```bash
hugo build --gc --minify
```

生成的 `public/` 就是完整静态网站，把它上传到任何静态托管平台即可。常见选择：

- **GitHub Pages**：免费，适合个人博客，配好 Actions 后推送即部署
- **Cloudflare Pages**：带宽宽松，绑定 Git 仓库后自动构建
- **Vercel / Netlify**：部署快，适合想省事的人
- **自己的服务器 / 对象存储**：适合有域名和备案需求的站点

部署前重点检查两个地方：`baseURL` 是否和最终访问地址一致；`public/` 不要提交进 Git，在 `.gitignore` 里加上：

```gitignore
public/
resources/
```

GitHub Pages 的完整工作流、Nginx 配置和其他托管平台对比，可以看同站的 [Hugo 静态博客指南](/post/hugo-static-blog-guide/)。

<br/>

## ❓ 八、常见问题

**页面空白，提示 `found no layout file`**

主题没装好，或者 `config.toml` 里的 `theme` 名字和 `themes/` 下的目录名不一致。确认目录是 `themes/hugo-theme-dooz`，配置写 `theme = "hugo-theme-dooz"`。

**图片不显示**

先确认文件在 `static/` 下，而不是站点 `assets/` 下。配置写 `assets/avatar.jpg`，实际文件应是 `static/assets/avatar.jpg`；文章里引用 `/post/cover.jpg`，实际文件应是 `static/post/cover.jpg`。

**搜索没有结果**

检查 `config.toml` 是否保留了：

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

搜索至少要输入 2 个字符。刚改完配置时，重启一下 `hugo server`。

**评论或统计不显示**

示例配置里 Giscus、Waline、百度统计和 GA4 的账号都是空的，填上自己的 ID 才会加载。本地 `localhost` 预览会自动跳过统计，这是正常的。

**改了主题文件，升级后丢了**

不要直接改 `themes/`。模板文件复制到站点 `layouts/` 下覆盖；只改样式时，用 `assets/css/dooz.override.css`。

<br/>

## 🌱 九、接下来做什么

建议顺序是：先把站点跑起来，再换掉作者信息和首页图，然后写第一篇文章，最后再折腾评论、统计和主题色。不要一上来就把整份配置改完，容易不知道哪一步出了问题。

有用链接：

- Dooz 主题：<https://github.com/hollson/hugo-theme-dooz>
- Hugo 官方文档：<https://gohugo.io/documentation/>
- Hugo 安装说明：<https://gohugo.io/installation/>
- 同站 Markdown 语法速查：[Markdown 语法指南与示例](/post/markdown-syntax-guide/)
- 同站完整搭建与部署教程：[Hugo 静态博客指南](/post/hugo-static-blog-guide/)
