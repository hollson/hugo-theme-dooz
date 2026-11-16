---
title: "用 Whisper 转写语音消息"
date: 2026-11-15T20:42:00+08:00
description: "用 OpenAI Whisper 和 Python 转写语音消息、会议和采访，包含格式转换、25 MB 限制和可直接运行的脚本。"
keywords: "Whisper, 语音转文字, 转写, Python, OpenAI, 音频"
draft: false
hideToc: false
enableToc: true
enableTocContent: false
image: "/post/whisper-speech-to-text-cover.webp"
cover: "/post/whisper-speech-to-text-cover.webp"
categories:
- AI
tags:
- whisper
- speech-to-text
pinned: true
archives:
- 2026
url: "/post/whisper-speech-to-text/"
---


![用 Whisper 把语音消息转成文字](/post/whisper-speech-to-text-cover.webp)

## 概述 {data-icon="book"}

Whisper 是 OpenAI 的语音识别模型：给它一个音频文件，它返回文字。转写只看音频，和录音用的 App 无关。微信、飞书、钉钉、会议、手机录音，只要能导出音频，都能处理。

下面是一个 Python 脚本：格式不对先转 mp3，再调用 Whisper。适合整理语音消息、会议记录和采访素材。

## 准备工作 {data-icon="tools"}

### 1. 安装 ffmpeg

用来把 ogg、amr 等格式转成 mp3：

```bash
# Ubuntu / Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg
```

### 2. 安装 OpenAI SDK

```bash
pip install --upgrade openai
```

### 3. 设置 API Key

脚本从环境变量读取密钥，不要把 Key 写进代码：

```bash
export OPENAI_API_KEY="sk-..."
```

调用 API 会把音频上传到 OpenAI。涉及隐私或未公开内容时，建议本地部署 Whisper，或先取得授权。

## 格式与大小 {data-icon="file"}

接口支持 `mp3`、`mp4`、`mpeg`、`mpga`、`m4a`、`wav`、`webm`，单个文件不超过 25 MB。超长录音先用 ffmpeg 分段。

微信语音常见 `silk` 格式，ffmpeg 不能直接处理，需要先用 `silk-v3-decoder` 转成 `wav`；`amr` 一般可以直接转 mp3。

## Python 脚本 {data-icon="code"}

保存为 `whisper.py`：

```python
#!/usr/bin/env python3
import argparse
import subprocess
import sys
from pathlib import Path

from openai import OpenAI

SUPPORTED = {".mp3", ".mp4", ".mpeg", ".mpga", ".m4a", ".wav", ".webm"}
MAX_SIZE = 25 * 1024 * 1024


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("audio", type=Path)
    parser.add_argument("--language", default="zh", help="zh / en / auto")
    args = parser.parse_args()

    audio = args.audio
    if not audio.is_file():
        sys.exit(f"文件不存在：{audio}")

    if audio.suffix.lower() not in SUPPORTED:
        mp3 = audio.with_suffix(".mp3")
        try:
            subprocess.run(
                ["ffmpeg", "-y", "-i", str(audio), "-vn", "-ab", "192k", str(mp3)],
                check=True,
            )
        except FileNotFoundError:
            sys.exit("未找到 ffmpeg，请先安装")
        audio = mp3

    if audio.stat().st_size > MAX_SIZE:
        sys.exit("文件超过 25 MB，请先分段")

    client = OpenAI()
    kwargs = {"model": "whisper-1", "response_format": "text"}
    if args.language != "auto":
        kwargs["language"] = args.language

    with audio.open("rb") as f:
        print(client.audio.transcriptions.create(file=f, **kwargs))


if __name__ == "__main__":
    main()
```

## 使用方式 {data-icon="play"}

```bash
# 中文，默认按 zh 识别
python3 whisper.py 语音消息.m4a

# 自动识别语言
python3 whisper.py 会议录音.wav --language auto

# 指定英文
python3 whisper.py 采访.mp3 --language en
```

录音里英文术语多时用 `--language auto`；多人重叠或背景音乐重时，先降噪或分离人声，结果会更稳。

## 参考链接 {data-icon="link"}

- [OpenAI Speech to Text 文档](https://platform.openai.com/docs/guides/speech-to-text)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [FFmpeg](https://ffmpeg.org/)
- [silk-v3-decoder（微信 silk 解码）](https://github.com/kn007/silk-v3-decoder)
