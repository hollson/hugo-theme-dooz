---
title:       "Golang之命令行教程"
subtitle:    "Go是用于管理Go源代码的工具"
description: "Go是由Robert Griesemer，Rob Pike和Ken Thompson在Google设计的一种静态类型的编译型编程语言。Go在语法上类似于C，但是具有内存安全性，垃圾回收，结构化类型和CSP样式的并发性。由于其域名golang.org，该语言通常称为“ Golang”，但专有名称是Go。"
date:        2020-03-19
author:      "shongsheng"
image:       "img/res/blog.jpg"
tags:        ["golang","command"]
categories:  ["Golang"]
archives:    2020
---


# 一. 命令行预览
Go命令行使用二级命令，格式`go <command> [arguments]`
```shell
$ go help
Go is a tool for managing Go source code.

Usage:

        go <command> [arguments]

The commands are:

        bug         start a bug report
        build       compile packages and dependencies
        clean       remove object files and cached files
        doc         show documentation for package or symbol
        env         print Go environment information
        fix         update packages to use new APIs
        fmt         gofmt (reformat) package sources
        generate    generate Go files by processing source
        get         add dependencies to current module and install them
        install     compile and install packages and dependencies
        list        list packages or modules
        mod         module maintenance
        run         compile and run Go program
        test        test packages
        tool        run specified go tool
        version     print Go version
        vet         report likely mistakes in packages

Use "go help <command>" for more information about a command.

Additional help topics:

        buildmode   build modes
        c           calling between Go and C
        cache       build and test caching
        environment environment variables
        filetype    file types
        go.mod      the go.mod file
        gopath      GOPATH environment variable
        gopath-get  legacy GOPATH go get
        goproxy     module proxy protocol
        importpath  import path syntax
        modules     modules, module versions, and more
        module-get  module-aware go get
        module-auth module authentication using go.sum
        module-private module configuration for non-public modules
        packages    package lists and patterns
        testflag    testing flags
        testfunc    testing functions

Use "go help <topic>" for more information about that topic.
```

---

# 二. 命令行说明

## 1. bug 
**说明：** 在浏览器,向Golang官方github`提交bug报告`。


## 2. build
**说明：** 编译项目和文件。
- 支持10种操作系统:`darwin,freebsd,linux,windows,android,dragonfly,netbsd,openbsd,plan9,solaris`
- 支持9种处理器架构:`arm,arm64,386,amd64,ppc64,ppc64le,mips64,mips64le,s390x`

**交叉编译：**
```shell
$ CGO_ENABLED=0 GOOS=darwin  GOARCH=amd64 go build -o demo.darwin.amd64
$ CGO_ENABLED=0 GOOS=linux   GOARCH=amd64 go build -o demo.linux.amd64
```


## 3. clean  
**说明：** 清理生成的可执行文件和包(不支持自定义的编译文件名),参考[install示例](#10-install)。
- `-i` 清除关联的安装的包和可运行文件，也就是通过go install安装的文件   
- `-n` 把需要执行的清除命令打印出来，但是不执行，这样就可以很容易的知道底层是如何运行的 
- `-r` 循环的清除在import中引入的包 
- `-x` 打印出来执行的详细命令，其实就是-n打印的执行版本


## 4. doc  
**说明：** 查看源码文档，格式：`go doc 包名.成员名`,成员可以是`常量、变量、结构体、函数、方法...`,如：
```shell
$ go doc fmt | less     #查看标准库文档，使用less输出(空格和w控制上下翻动)
$ go doc fmt.Println    #查看方法
$ go doc builtin        #查看内置包builtin的包结构
```


## 5.env
**说明：** 打印环境信息。

|名称 | 说明|
|-------|-------|
|CGO_ENABLED &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|指明cgo工具是否可用的标识|
|GOARCH|程序构建环境的目标计算架构|
|GOBIN|存放可执行文件的目录的绝对路径|
|GOCHAR|程序构建环境的目标计算架构的单字符标识|
|GOEXE|可执行文件的后缀|
|GOHOSTARCH|程序运行环境的目标计算架构|
|GOOS|程序构建环境的目标操作系统|
|GOHOSTOS|程序运行环境的目标操作系统|
|GOPATH|工作区目录的绝对路径|
|GORACE|用于数据竞争检测的相关选项|
|GOROOT|Go语言的安装目录的绝对路径|
|GOTOOLDIR|Go工具目录的绝对路径|



## 6. fix  
**说明：** 源码库升级，可参考：[go fix与go tool fix](https://github.com/hyper0x/go_command_tutorial/blob/71833ffcab991a2931d3106490d96008f45c3177/0.10.md)



## 7. fmt
**说明：** 格式化源码文件 [查看参考文章](https://www.jianshu.com/p/104b33439ac2)
```shell
$ go fmt main.go
```


## 8. generate  
**说明：** 查找项目中所有源码，执行代码中诸如`//go:generate cmd`的注解命令 ，[参考链接](https://www.jianshu.com/p/a866147021da) 。
```go
//go:generate echo hello
//go:generate go run main.go
//go:generate  echo file=$GOFILE pkg=$GOPACKAGE
func main() {
	fmt.Println("main func")
}
```
```shell 
$ go generate #执行自动生成命令
```


## 9. get 
**说明：** 下载安装源码包，如：
```shell
go get github.com/go-redis/redis/v7
```

- `-d` 只下载不安装
- `-f` 只有在你包含了-u参数的时候才有效，不让-u去验证import中的每一个都已经获取了，这对于本地fork的包特别有用
- `-fix` 在获取源码之后先运行fix，然后再去做其他的事情
- `-t` 同时也下载需要为运行测试所需要的包
- `-u` 强制使用网络去更新包和它的依赖包
- `-v` 显示执行的命令



## 10. install  
**说明：** 编译并安装
- 第一步：生成结果文件(可执行文件或者`.a`包)；
- 第二步：把编译好的结果移到`$GOPATH/bin`；

```shell
# 创建main文件，并初始化mod
go mod init my-first-pro

# 项目目录
$ tree
.
├── go.mod
└── main.go

# 编译安装
# go install

# 查看生成到文件
$ ll $GOPATH/bin
$ ll $GOPATH/pkg/darwin_amd64

# 清理生成到文件
$ go  clean -x -i
```

## 11. list  
**说明：** 查看包路径、名称、导入项、代码文件，测试文件，依赖项等信息。
```shell
$ go list -json errors|less
```
```json
{
        "Dir": "/usr/local/go/src/errors",
        "ImportPath": "errors",
        "Name": "errors",
        "Doc": "Package errors implements functions to manipulate errors.",
        "Target": "/usr/local/go/pkg/darwin_amd64/errors.a",
        "Root": "/usr/local/go",
        "Match": [
                "errors"
        ],
        "Goroot": true,
        "Standard": true,
        "GoFiles": [
                "errors.go",
                "wrap.go"
        ],
        "Imports": [
                "internal/reflectlite"
        ],
        "Deps": [
                "internal/bytealg",
                "internal/cpu",
                "internal/reflectlite",
                "runtime",
                "runtime/internal/atomic",
                "runtime/internal/math",
                "runtime/internal/sys",
                "unsafe"
        ],
        "XTestGoFiles": [
                "errors_test.go",
                "example_test.go",
                "wrap_test.go"
        ],
        "XTestImports": [
                "errors",
                "fmt",
                "os",
                "reflect",
                "testing",
                "time"
        ]
}
```



## 12. mod  
**说明：** 依赖包管理, [参考链接](https://blog.csdn.net/Gusand/article/details/99507561) 。


## 13. run
**说明：** 运行Golang程序。



## 14. test  
**说明：** 执行单元测试。
- `-bench regexp` 执行相应的benchmarks，例如 -bench=.
- `-cover` 开启测试覆盖率
- `-run regexp` 只运行regexp匹配的函数，例如 -run=Array 那么就执行包含有Array开头的函数
- `-v` 显示测试的详细命令
```shell
$ go test demo_test.go demo.go           # 单元测试
$ go test --cover demo_test.go demo.go   # 单元测试覆盖率
$ go test -bench=. demo_test.go demo.go  # 性能测试
```


## 15. tool  
**说明：** 运行指定的go工具, 如：`go tool pprof` 。



## 16. version  
**说明：** 打印golang版本信息。


## 17. vet  
**说明：** 用于检查静态错误,即编译不易发现的错误。[查看参考文章](https://studygolang.com/articles/9619)
```shell
$ go tool vet <directory|files>
```
```go
func main() {
   // 1.可疑代码
   var i = 0
   fmt.Println(i != 0 || i != 1)
   fmt.Println(i == 0 && i == 1)

   //// 2.格式化参数错误
   fmt.Printf("%d\n", "hello")

   // 3.除零错误
   fmt.Println(2 / 0)

   // 4. 读不到的代码
   goto OVER
   fmt.Println("hello")
OVER:

   // 5.竞态代码
   words := []string{"foo", "bar", "baz"}
   for _, word := range words {
      go func() {
         fmt.Println(word)
      }()
   }
}
```


## 18. godoc  
**说明：** 用于展示指定代码包的文档。
```shell
$ godoc fmt
$ godoc fmt Printf
$ godoc fmt Printf Println
$ godoc -src fmt Printf
$ godoc cmd/go
$ godoc -http=:9999  #启动$GOROOT\doc下的帮助站点
```

## 19. help  
**说明：** 帮助命令
```shell
$ go help modules
$ go help vet
```

>参考：
> https://github.com/hyper0x/go_command_tutorial
