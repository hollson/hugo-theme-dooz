---
title: "🎨 主题示例 - 微信绿：三分钟给博客搭一个自用图床"
slug: "dev-wechat-green-image-host"
date: 2026-11-14T09:00:00+08:00
description: "主题示例（dev-wechat-green 微信绿）：一篇面向普通读者的实操教程，演示步骤列表、命令代码、成本表格与验收清单。"
keywords: "微信绿, 图床, 教程, 实操, 主题示例"
draft: false
hide_toc: false
enable_toc: true
enable_toc_content: false
author: "Hollson"
categories:
- 主题示例
tags:
- 教程
- 图床
mdTheme: "dev-wechat-green"
series: "主题示例"
archives:
- 2026
---
# 主题示例 - 微信绿：三分钟给博客搭一个自用图床

写给不熟悉对象存储的博客作者：不需要买服务器，不需要写代码，只用一个存储桶 + 一个域名，就能把图片从「散落在仓库里」变成「统一托管」[^1]。

> [!TIP] 先说结论
> 图片放仓库会让 clone 越来越慢。用一个便宜的存储桶 + 自定义域名，一年成本通常不到一杯咖啡的钱。

## 准备

1. 注册对象存储，创建一个**公共读**的桶。
2. 绑定一个子域名，例如 `img.example.com`，开启 HTTPS。
3. 在本地装一个上传工具，`rclone` 或任意图床客户端都行。

```bash
# 配置 rclone 的 S3 兼容存储
rclone config create img s3 provider=Other   endpoint=https://s3.example.com   access_key_id=$ACCESS_KEY   secret_access_key=$SECRET_KEY

# 上传一张图并生成公开链接
rclone copy ./cover.png img:bucket/post/
```

## 目录结构

```text
bucket/
└── post/
    ├── 2026/
    │   ├── cover.png
    │   └── diagram.svg
    └── avatar.webp
```

按年份分目录，好处是迁移时可以整段带走，不必一张张找。

![本机 → 存储桶 → 图片链接](/post/image-host.jpg)

## 成本对照

| 方案 | 年成本 | 优点 | 缺点 |
| :--- | ---: | :--- | :--- |
| 图片放仓库 | 0 | 简单 | 仓库膨胀，clone 变慢 |
| 对象存储 + CDN | 约 ¥30 | 快、稳定 | 需要配域名 |
| 自建服务器 | 约 ¥200 | 可控 | 要维护、要备份 |

## 接入 Hugo

```toml
[params]
  imageCDN = "https://img.example.com"
```

正文里写绝对路径即可，换域名时全局替换一次就够。

## 验收

- [x] 图片能通过 HTTPS 访问
- [x] 桶策略为公共读，但禁止列出目录
- [x] 上传脚本带失败重试
- [ ] 在手机上检查一次加载速度

> [!CAUTION] 别把密钥写进仓库
> 上传脚本里的密钥请走环境变量，`.env` 要进 `.gitignore`。公开仓库泄露一次，账单会替你记住。

[^1]: 示例脚注：教程里的注释一般提示常见坑，而不是补充原理。
