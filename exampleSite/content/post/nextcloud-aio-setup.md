---
title: "用 Nextcloud 部署私有网盘"
slug: "nextcloud-aio"
date: 2024-10-27T21:00:00+08:00
description: "手把手教你用 Nextcloud 官方 All-in-One 镜像搭建自己的私有网盘：从 Docker 一键启动、HTTPS 证书配置，到日常使用设置、版本升级与数据备份，步骤清晰可照抄，让你把照片和文件牢牢掌握在自己手里。"
keywords: "Nextcloud, 私有云, 私有网盘, Docker, AIO"
draft: false
hide_toc: false
enable_toc: true
enable_toc_content: false
hero_image: "/assets/blog2.jpg"
categories:
- 软件工程
archives:
- 2024
---



> 用一条命令把 Nextcloud 跑起来。数据库、缓存、HTTPS 证书都由官方 All-in-One 镜像自动配好，适合个人和小团队自建网盘。

## 🧭 一、方案选型

Nextcloud 有两种装法：All-in-One 和 Docker Compose。

AIO 只跑一个管理容器，其余组件自动搭好，点点鼠标就能装、能升级、能备份。Compose 适合已有 Nginx、需要自己掌握每个组件的场景。


## 🧰 二、环境准备

- 服务器或 NAS，4 GB 内存、双核起步，硬盘用 SSD
- 一个域名，解析到服务器 IP，放通 80 和 443 端口
- 已装 Docker。若是从 snap 装的，先换成官方版本，AIO 不兼容 snap

只想内网用可以不要域名，直接 IP 访问，但客户端同步会受限。

## 🚀 三、启动服务

```bash
sudo docker run -d \
  --name nextcloud-aio-mastercontainer \
  --restart always \
  --publish 80:80 \
  --publish 8080:8080 \
  --publish 8443:8443 \
  --volume nextcloud_aio_mastercontainer:/mnt/docker-aio-config \
  --volume /var/run/docker.sock:/var/run/docker.sock:ro \
  ghcr.io/nextcloud-releases/all-in-one:latest
```

容器名和卷名别改，自动升级和备份靠它们认路。8080 被占用就换个端口。

## ⚙️ 四、初始化

打开 `https://服务器IP:8080`，证书报错点继续访问。页面会给一串单词组成的口令，登录用的，先存好。

登录后三步：

1. **填域名**：系统自动检查解析和端口，签发证书。没有域名可以在这里免费申请 `xxx.dedyn.io`
2. **选组件**：Office 在线文档、Talk 视频会议（要开 3478 端口）、病毒扫描等，不勾也能用
3. **启动**：时区选 `Asia/Shanghai`，等几分钟容器全绿

然后访问 `https://你的域名`，用管理员账号登录。

## 🎛️ 五、基础配置

进「管理设置」，做三件事：

- **后台任务改 cron**：否则缩略图、邮件通知都会拖很久

  ```bash
  docker exec -u www-data nextcloud-aio-nextcloud php occ background:cron
  ```

- **配 SMTP**：在「基本设置」填邮箱，点测试发信确认能收到
- **开 2FA**：在「安全」里给管理员加两步验证

如果前面挂了反向代理，还要补 `trusted_domains` 和 `overwrite.cli.url`，不然会提示域名不受信任。

## 🔄 六、升级与备份

**升级**：AIO 面板点更新，等它跑完。大版本不能跳级。

**备份**：数据库、`config`、`data` 三样都要。面板里有 Borg 备份，设好目录和每天的时间即可。生成的加密密钥单独存好，丢了备份就打不开。

## 📚 七、参考资料

- 官网：<https://nextcloud.com/>
- 下载安装：<https://nextcloud.com/install/>
- 管理员手册：<https://docs.nextcloud.com/server/latest/admin_manual/>
- AIO 官方教程：<https://nextcloud.com/blog/how-to-install-the-nextcloud-all-in-one-on-linux/>
- AIO 源码：<https://github.com/nextcloud/all-in-one>
- 服务端源码：<https://github.com/nextcloud/server>
- 发行包下载：<https://download.nextcloud.com/server/releases/>
