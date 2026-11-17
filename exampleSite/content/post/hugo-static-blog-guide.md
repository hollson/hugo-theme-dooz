---
title: "Hugo 静态博客指南"
date: 2026-11-17T00:00:00+08:00
description: "一份手把手的 Hugo 静态博客搭建教程，从安装配置、创建文章和主题，到本地预览与正式发布，完整演示 GitHub Pages 自动部署流程，并推荐其他免费托管平台，零基础也能快速建好个人博客。"
keywords: "Hugo, 静态博客, Markdown, GitHub Pages"
draft: false
hideToc: false
enableToc: true
enableTocContent: false
author: "Hollson"
image: "https://gohugo.io/images/hugo-logo-wide.svg"
# cover: "https://gohugo.io/images/hugo-logo-wide.svg"
categories:
- 教程指南
tags:
- Hugo
pinned: false
archives:
- 2026
url: "/post/hugo-static-blog-guide/"
---


# Hugo 静态博客指南


<br/>

## 📖 一. Hugo概述

[Hugo](https://gohugo.io) 是 Go 语言开发、速度极快的开源静态网站生成器，用 Markdown 写内容即可直接生成静态网页。

<br/>

## ⚙️ 二. 安装Hugo

> 最新版安装包统一在 [Hugo Releases](https://github.com/gohugoio/hugo/releases) 下载，选 **extended** 版。

### 2.1 macOS 安装

```bash
tar -zxvf hugo_extended_0.169.0_darwin-arm64.tar.gz	 # Apple 芯片
tar -zxvf hugo_extended_0.169.0_darwin-amd64.tar.gz	 # Intel 芯片
sudo mv hugo /usr/local/bin/
hugo version
```

### 2.2 Windows 安装

下载安装 `hugo_extended_0.169.0_windows-amd64.zip`，加入**系统 PATH**，重开终端执行 `hugo version`。

### 2.3 验证与帮助

```bash
$ hugo version    # 查看版本
$ hugo help       # 查看帮助
```

**常用 usage**

```bash
命令格式:
  hugo                       # 直接构建站点
  hugo [command] [flags]     # 子命令 + 参数

常用子命令:
  new         # 新建内容/站点/主题：hugo new content | site | theme
  build       # 构建站点，产物输出到 public/
  server      # 启动本地服务器，默认 1313 端口，支持热重载
  mod         # 管理 Hugo Modules
  list        # 列出内容（drafts / future / expired …）
  version     # 查看版本

常用参数:
  -D, --buildDrafts           # 构建时包含草稿
  -F, --buildFuture           # 包含未来发布的文章
  -E, --buildExpired          # 包含已过期的文章
  -b, --baseURL string        # 站点根地址，部署到子路径时必填
  -d, --destination string    # 输出目录，默认 public
      --minify                # 压缩产物
      --gc                    # 构建后清理缓存
```

**命令示例**

```bash
hugo build --minify --gc              # 构建发布
hugo build -D                         # 构建含草稿
hugo server -D                        # 本地预览含草稿
hugo new content post/hello.md        # 新建一篇文章
hugo new site my_blog                 # 新建站点
```

<br/>

## 🏗️ 三. 创建项目

### 3.1 新建站点

```bash
hugo new site my_blog
cd my_blog
```

### 3.2 目录结构

```bash
$ tree my_blog/
├── archetypes/          # 内容模板：新建文章时的 front matter 骨架
│   └── default.md
├── assets/              # 需 Hugo Pipes 处理的资源（SCSS/TS），不直接输出
├── content/             # 正文，全部 Markdown
├── data/                # 结构化数据（yaml/json/toml），模板中可读
├── hugo.toml            # 站点配置
├── i18n/                # 多语言翻译
├── layouts/             # 模板，优先级高于主题
├── static/              # 原样拷贝到输出根目录的静态文件
└── themes/              # 主题
```

关键约定：

- `content/post/xxx.md` → `public/post/xxx/index.html`
- `static/images/a.png` → 正文引用 `/images/a.png`（原样拷贝，不做处理）
- 配置变长后可用 `config/_default/` 目录分文件（`params.toml`、`menus.toml` 等），Hugo 自动合并；

### 3.3 运行服务

```bash
hugo server
```

未装主题时会提示 `found no layout file ...` 且页面空白，属正常，装完主题（第五节）即恢复。

<br/>

## ✍️ 四. 创建文章

### 4.1 新建文章

```bash
hugo new content post/first-post.md
```

生成 `content/post/first-post.md`，骨架取自 `archetypes/default.md`：

```toml
+++
date = '2026-11-13T23:44:47+08:00'
draft = true
title = 'First Post'
+++
```

- `draft = true` 默认**不构建**，预览加 `-D`，发布前改 `false`
- `title` 由文件名生成，中文标题直接手写

### 4.2 元数据字段

| 字段 | 说明 |
| --- | --- |
| `title` | 标题，列表/详情/SEO 通用 |
| `date` | 发布日期，决定排序 |
| `draft` | `true` 为草稿，不构建 |
| `description` | 摘要，用于列表页与 SEO |
| `tags` / `categories` | 标签/分类，自动生成聚合页 |
| `slug` | URL 片段，不填取文件名 |
| `weight` | 排序权重，越小越前 |
| `aliases` | 旧链接 301 跳转 |

### 4.3 博客示例

`content/post/hugo-quickstart.md`：

````markdown
+++
title = 'Hugo 快速上手'
date = '2026-11-13T10:00:00+08:00'
draft = false
description = '从零搭建一个 Hugo 博客。'
tags = ['Hugo', '博客']
categories = ['技术']
slug = 'hugo-quickstart'
+++

## 开始

```bash
hugo new site my_blog && cd my_blog
```

图片放 `static/images/`，正文按站点根路径引用：

![示意图](/images/demo.png)
````

### 4.4 预览与构建

```bash
hugo server -D                  # 预览含草稿，http://localhost:1313，改完自动刷新
hugo build --minify --gc        # 构建，产物在 public/
```

`public/` 不要入库，`.gitignore` 加 `public/`、`resources/`。

<br/>

## 🎨 五. 博客主题

### 5.1 自建主题

```bash
hugo new theme my-hugo-theme
```

```bash
themes/my-hugo-theme/
├── archetypes/default.md
├── assets/css/main.css、assets/js/main.js
├── layouts/
│   ├── baseof.html          # 全站骨架
│   ├── home.html            # 首页
│   ├── page.html            # 文章/单页
│   ├── section.html         # 列表页
│   └── _partials/           # head、header、footer、menu
├── static/favicon.ico
├── theme.toml               # 主题元信息
└── hugo.toml                # 主题默认配置
```

`theme.toml` 填 `name`、`license`、`min_version` 后，在站点 `hugo.toml` 启用：

```toml
theme = 'my-hugo-theme'
```

改模板不要动 `themes/`（升级会被覆盖），把文件复制到站点 `layouts/` 再改——查找优先级 **站点 `layouts/` > 主题 `layouts/`**。

### 5.2 三方主题

> 以 [hugo-theme-dooz](https://github.com/hollson/hugo-theme-dooz) 为例，任意主题同理：

```bash
# 子模块方式（推荐，便于统一升级）
git submodule add https://github.com/hollson/hugo-theme-dooz.git themes/hugo-theme-dooz
git submodule update --init --recursive
```

```toml
# hugo.toml
theme = 'hugo-theme-dooz'
```

主题自带 `exampleSite/`，其中的配置与内容可直接对照抄用：

```text
themes/hugo-theme-dooz/exampleSite/
```

中文站建议加：

```toml
defaultContentLanguage = 'zh'
hasCJKLanguage = true
```

主题市场：<https://themes.gohugo.io>

<br/>

## 🚀 六. 发布博客

### 6.1 GitHub Pages

> 仓库需为 **public**（免费账户限制）。仓库名决定访问地址：

- `<用户名>.github.io` → `https://<用户名>.github.io`
- 其他仓库名 → `https://<用户名>.github.io/<仓库名>/`

**1. 初始化并推送**

```bash
git init
git add . && git commit -m 'init blog'
git branch -M main
git remote add origin git@github.com:<用户名>/<仓库名>.git
git push -u origin main
```

**2. 切换发布源**

仓库 → **Settings** → **Pages** → Source 选 **GitHub Actions**（选完即生效，无保存按钮）。

**3. 新建 `.github/workflows/hugo.yaml`**

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.169.0    # 与本地一致
    steps:
      - uses: actions/checkout@v6
        with:
          submodules: recursive     # 主题是子模块时必须开
          fetch-depth: 0

      - name: Install Hugo
        run: |
          wget -O ${{ runner.temp }}/hugo.deb \
            https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb
          sudo dpkg -i ${{ runner.temp }}/hugo.deb

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v6

      - name: Build
        env:
          HUGO_ENVIRONMENT: production
        run: hugo build --gc --minify --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Upload
        uses: actions/upload-pages-artifact@v5
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v5
```

**4. 推送**

```bash
git add .github/workflows/hugo.yaml
git commit -m 'add pages workflow'
git push
```

Actions 页面两个 job 变绿即上线。

两个必查项：

- `baseURL` 不要写死，项目站点必须用 CI 注入的 `base_url`，否则资源 404
- 主题为子模块时 `submodules: recursive` 不能省，且 `.gitmodules` 用 HTTPS 地址

自定义域名：Pages → **Custom domain** 填域名 + 配 DNS，勾 **Enforce HTTPS**。

### 6.2 自建Web网站

**Gitee Pages 已下线，`.gitee.io` 无法开通。** 

```bash
hugo build --minify --gc --baseURL https://blog.example.com/
tar -zcvf blog.tar.gz public

scp blog.tar.gz root@你的服务器:/srv/www/
ssh root@你的服务器 'cd /srv/www && tar -zxvf blog.tar.gz && rm -rf blog && mv public blog'
```

Nginx 配置：

```nginx
server {
    listen 80;
    server_name blog.example.com;
    root /srv/www/blog;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```

> `nginx -t && nginx -s reload` 生效，证书用 `certbot` 或云厂商 SSL。

其他可选：代码留 Gitee，发布走 Cloudflare Pages / Vercel / GitHub Pages；或对象存储（OSS / COS）静态托管 + CDN。

### 6.3 其他托管平台

不想自建服务器，可选下面几个，均有免费层，Hugo 官方 [Host and deploy](https://gohugo.io/host-and-deploy/) 也提供了对应部署指南：

| 平台 | 推荐理由 | 限制 |
| --- | --- | --- |
| **Cloudflare Pages** | 带宽不限量、自定义域名 + HTTPS、连 Git 自动构建，免费首选 | 国内访问速度一般 |
| **Vercel** | 部署最快，预览环境好用 | 免费 Hobby 仅限**个人非商用** |
| **Netlify** | 生态成熟，附加能力多 | 带宽与构建分钟有月度额度 |
| **GitLab Pages** | 自带 CI，**仓库可私有** | 免费层 CI 时长有限 |

> 产物统一是 `public/`，换平台只需改 `baseURL` 并指定构建命令 `hugo build --gc --minify`；免费额度以各平台官网为准。

<br/>

## 🔗 资源链接

> Hugo官网：https://gohugo.io
> 安装文档：https://gohugo.io/installation/
> 版本发布：https://github.com/gohugoio/hugo/releases
> 主题市场：https://themes.gohugo.io
> GitHubPages：https://docs.github.com/en/pages
