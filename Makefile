all: help

## build@生成静态内容
.PHONY:build
build:	
	@hugo


# 伪命令，make clean，clean可能是一个文件名或命令
## deploy@发布到Wen服务器【mafool.com】
.PHONY:deploy
deploy:
	echo -e "\033[0;32m开始发布到mafool.ccom上...\033[0m"

	#编译
	rm -rf ./public/*
	hugo -v --baseURL=http://www.mafool.com
	echo -e "\033[0;32m编译完成...\033[0m"

	# 打包上传
	rm -f mafool-blog.tar.gz
	tar -zcvf mafool-blog.tar.gz public
	scp mafool-blog.tar.gz root@www.mafool.com:/srv/www/

	echo -e "\033[0;32m执行远程清理...\033[0m"
	ssh root@www.mafool.com 'rm -rf /srv/www/mafool-blog'
	ssh root@www.mafool.com 'cd /srv/www && tar -zxvf mafool-blog.tar.gz && mv public mafool-blog && nginx -s reload'
	rm -f mafool-blog.tar.gz

## clean@清理编译、日志和缓存等数据。
.PHONY:clean
clean:
	@rm -rf ./bin;
	@rm -rf ./logs;
	@rm -rf ./log;
	@rm -rf ./cache;
	@rm -rf ./pid;
	@rm -rf ./pid;
	@rm -rf ./release;
	@rm -rf ./debug;
	@rm -rf ./tmp;
	@rm -rf ./temp;
	@rm -rf ./public;
	@rm -rf ./resources;
	@rm -rf .hugo_build.lock
	@rm -rf ./vendor/*;
	@echo "\033[31m ✅  清理完毕\033[0m";


## draft@查看草稿文章列表
.PHONY:draft
draft:	
	grep -rine 'draft= true' ./content/post


## commit <msg>@提交Git如:make push [msg=<message>]。
.PHONY:commit
message:=$(if $(msg),$(msg),"Rebuilded at $$(date '+%Y年%m月%d日 %H时%M分%S秒')")
commit:
	@echo "\033[0;34mPush to remote...\033[0m"
	@git add .
	@git commit -m $(message)
	@echo "\033[0;31m 💿 Commit完毕\033[0m"


## push <msg>@提交并推送到Git仓库，如:make push [msg=<message>]。
.PHONY:push
push:commit
	@git push #origin master
	@echo "\033[0;31m ⬆️ Push完毕\033[0m"


## run@运行(端口号：1313)
.PHONY:run
run:
	@rm -rf ./public;
	@sleep 3 && open "http://127.0.0.1:1313" &
	@hugo -D -F server -p 1313; 

## save@提交到本地仓库
.PHONY:save
save:
	git add .
	msg="rebuilding site $(date)"
	if [ $# -eq 1 ]; then \
		msg="$1" ; \
	fi
	git commit -m "$msg"
	echo "saved"

## update@更新Git和Submodule
.PHONY:update
update:
	@git submodule update --init --recursive;


## help@查看make帮助
.PHONY:help
help:Makefile
	@echo "Usage:\n  make [command]"
	@echo
	@echo "Available Commands:"
	@sed -n "s/^##//p" $< | column -t -s '@' |grep --color=auto "^[[:space:]][a-z]\+[[:space:]]"
	@echo
	@echo "For more to see https://makefiletutorial.com/"