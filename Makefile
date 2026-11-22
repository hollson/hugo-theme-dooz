all: help

## build@构建示例站（生产压缩）
.PHONY: build
build:
	@cd exampleSite && hugo --gc --cleanDestinationDir --minify --themesDir "$$(dirname "$$(dirname "$$(pwd)")")" && echo "✅ 示例站构建完成：exampleSite/public"

## run@本地预览示例站（含草稿）
.PHONY: run
run:
	@cd exampleSite && hugo server -D --themesDir "$$(dirname "$$(dirname "$$(pwd)")")" --bind 0.0.0.0 -p 1314

## clean@清理示例站构建产物与缓存
.PHONY: clean
clean:
	@rm -rf exampleSite/public exampleSite/resources exampleSite/.hugo_build.lock
	@echo "已清理示例站的 public、resources 与构建锁"

## draft@列出示例站草稿文章
.PHONY: draft
draft:
	@grep -rine 'draft[=: ]+true' exampleSite/content/post || true

## help@查看帮助
.PHONY: help
help: Makefile
	@echo "Usage:"
	@echo "  make [command]"
	@echo
	@echo "Available Commands:"
	@sed -n "s/^##//p" $< | column -t -s '@' | grep --color=auto "^[[:space:]][a-z]\+[[:space:]]"
