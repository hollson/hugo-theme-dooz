---
title: "Deploy a Private Cloud with Nextcloud AIO"
date: 2024-10-27T21:00:00+08:00
description: "Deploy a private cloud with the official Nextcloud All-in-One image. Covers Docker startup, HTTPS setup, basic configuration, upgrades, and backups."
keywords: "Nextcloud, private cloud, self-hosted, Docker, AIO"
draft: false
hideToc: false
enableToc: true
enableTocContent: false
image: "/assets/blog2.jpg"
cover: "/img/post/nextcloud-aio-cover.webp"
categories:
- Operations
tags:
- nextcloud
- private-cloud
pinned: true
archives:
- 2024
url: "/post/nextcloud-aio/"
---

Bring up Nextcloud with a single command. The official All-in-One image takes care of the database, cache, and HTTPS certificates, making it a convenient choice for individuals and small teams.

## 1. Choose a deployment method

Nextcloud can be installed with either All-in-One (AIO) or Docker Compose.

AIO runs a single management container and sets up the other components for you. Installation, upgrades, and backups are managed through a web interface. Docker Compose is a better fit if you already use Nginx or want to manage each component yourself.

## 2. Prepare the environment

- A server or NAS with at least 4 GB of memory and two CPU cores; an SSD is recommended.
- A domain name pointed at the server's IP address, with ports 80 and 443 open.
- Docker installed. If you installed Docker through Snap, replace it with the official version; AIO is not compatible with the Snap package.

A domain is not required for LAN-only access; you can connect directly by IP, but client synchronization may be limited.

## 3. Start the service

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

Keep the container and volume names unchanged; AIO uses them for upgrades and backups. If port 8080 is already in use, publish a different host port.

## 4. Complete the initial setup

Open `https://SERVER_IP:8080`. Your browser will warn about the certificate; continue to the page. It will show a passphrase made up of several words. Save it, as you will need it to sign in.

After signing in:

1. **Enter your domain.** AIO checks the DNS record and ports, then obtains a certificate. If you do not have a domain, you can request a free `xxx.dedyn.io` domain here.
2. **Choose optional components.** Online office documents, Talk video calls (which require port 3478), and virus scanning are optional.
3. **Start the containers.** Set the time zone to `Asia/Shanghai` and wait a few minutes for all containers to become healthy.

Then visit `https://YOUR_DOMAIN` and sign in with the administrator account.

## 5. Configure the basics

In **Administration settings**, take care of these three items:

- **Switch background jobs to cron.** Otherwise, tasks such as thumbnail generation and email notifications can take much longer.

  ```bash
  docker exec -u www-data nextcloud-aio-nextcloud php occ background:cron
  ```

- **Configure SMTP.** Enter your email settings under **Basic settings** and send a test message to confirm delivery.
- **Enable two-factor authentication.** Add a second factor for the administrator under **Security**.

If you use a reverse proxy, also configure `trusted_domains` and `overwrite.cli.url`; otherwise, Nextcloud may report that the domain is not trusted.

## 6. Upgrade and back up

**Upgrade:** Start the update from the AIO panel and wait for it to finish. Major versions cannot be skipped.

**Back up:** Include the database, `config`, and `data`. AIO provides Borg backups in its panel; configure a destination and daily schedule. Store the generated encryption key separately—without it, the backup cannot be opened.

## 7. References

- [Nextcloud](https://nextcloud.com/)
- [Download and install](https://nextcloud.com/install/)
- [Administrator manual](https://docs.nextcloud.com/server/latest/admin_manual/)
- [Official AIO tutorial](https://nextcloud.com/blog/how-to-install-the-nextcloud-all-in-one-on-linux/)
- [AIO source code](https://github.com/nextcloud/all-in-one)
- [Server source code](https://github.com/nextcloud/server)
- [Server releases](https://download.nextcloud.com/server/releases/)
