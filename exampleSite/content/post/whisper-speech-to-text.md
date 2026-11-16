---
title: "Transcribe Audio Messages with Whisper"
date: 2026-11-15T20:42:00+08:00
description: "Transcribe audio from messages, meetings, and interviews with OpenAI Whisper and Python. Includes format conversion, the 25 MB limit, and a ready-to-run script."
keywords: "Whisper, speech to text, transcription, Python, OpenAI, audio"
draft: false
hideToc: false
enableToc: true
enableTocContent: false
image: "/img/post/whisper-speech-to-text-cover.webp"
cover: "/img/post/whisper-speech-to-text-cover.webp"
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

![Transcribe audio messages with Whisper](/img/post/ai/whisper-speech-to-text-cover.webp)

## Overview {data-icon="book"}

Whisper is OpenAI's speech recognition model: give it an audio file, and it returns text. Transcription depends on the audio, not the app used to record it. Audio exported from WeChat, Feishu, DingTalk, meetings, or a phone recorder can all be processed.

The Python script below converts unsupported formats to MP3 before calling Whisper. It is useful for transcribing voice messages, meeting recordings, and interview audio.

## Prerequisites {data-icon="tools"}

### 1. Install ffmpeg

Use ffmpeg to convert formats such as OGG and AMR:

```bash
# Ubuntu / Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg
```

### 2. Install the OpenAI SDK

```bash
pip install --upgrade openai
```

### 3. Set your API key

The script reads the key from an environment variable. Do not put it in your source code:

```bash
export OPENAI_API_KEY="sk-..."
```

The API call uploads the audio to OpenAI. For private or unpublished material, consider running Whisper locally or getting permission first.

## Formats and file size {data-icon="file"}

The API supports `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `wav`, and `webm`. Each file must be no larger than 25 MB. Split longer recordings with ffmpeg first.

WeChat voice messages commonly use the `silk` format, which ffmpeg cannot process directly. Convert them to `wav` with `silk-v3-decoder` first. AMR files can generally be converted directly to MP3.

## Python script {data-icon="code"}

Save this as `whisper_transcribe.py`:

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
        sys.exit(f"File not found: {audio}")

    if audio.suffix.lower() not in SUPPORTED:
        mp3 = audio.with_suffix(".mp3")
        try:
            subprocess.run(
                ["ffmpeg", "-y", "-i", str(audio), "-vn", "-ab", "192k", str(mp3)],
                check=True,
            )
        except FileNotFoundError:
            sys.exit("ffmpeg was not found. Install it first.")
        audio = mp3

    if audio.stat().st_size > MAX_SIZE:
        sys.exit("The file exceeds 25 MB. Split it into smaller parts first.")

    client = OpenAI()
    kwargs = {"model": "whisper-1", "response_format": "text"}
    if args.language != "auto":
        kwargs["language"] = args.language

    with audio.open("rb") as f:
        print(client.audio.transcriptions.create(file=f, **kwargs))


if __name__ == "__main__":
    main()
```

## Usage {data-icon="play"}

```bash
# Chinese (the default)
python3 whisper_transcribe.py voice-message.m4a

# Automatically detect the language
python3 whisper_transcribe.py meeting-recording.wav --language auto

# Specify English
python3 whisper_transcribe.py interview.mp3 --language en
```

Use `--language auto` when a recording contains many English technical terms. If speakers overlap or there is loud background music, denoise the audio or separate the vocals first for better results.

## References {data-icon="link"}

- [OpenAI Speech-to-Text documentation](https://platform.openai.com/docs/guides/speech-to-text)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [FFmpeg](https://ffmpeg.org/)
- [silk-v3-decoder for WeChat Silk audio](https://github.com/kn007/silk-v3-decoder)
