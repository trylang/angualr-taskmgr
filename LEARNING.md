# angualr-taskmgr
angualr4.x 完成的一个任务管理平台

安装VScode 网址：https://code.visualstudio.com；


1. 安装angular脚手架：npm i -g @angular/cli;  如果失败，先uninstall，再npm cache clean 清除缓存再重新安装；angular-cli是用typescript写的，所以要先装这两个：
npm install -g typescript typings.

2. 网址：chrome-extension-downloader.com ，chrome安装 Augury插件，ID：elgalmkoelokbchhkhacckoklkejnhcd 。 可以下载插件； 
3. npm i --save 包名：软件依赖； npm i --save-dev 包名：开发依赖；
4. ng new 项目名：新建angular项目； ng new taskmgr -si --style=scss;
5. ng build -prod: 生产环境编译; ng serve: 启动开发服务器；
6. ng g m core 创建核心模块；
7. ng g c core/header --spec=false 在core文件夹下创建header组件，并且不创建测试文件。

## 小技巧
1. html： div>header+main+footer 按回车快速建立模版；
          div*3+div.box*3 创建布局；
2. material设计库：materialdesignblog.com 有官方组件库；安装：npm i --save @angular/material;
   material文档库：https://material.angularjs.org/latest/；


Mock Rest API
json-server: 用于快速搭建 REST API 的利器
安装：npm install i -g json-server
启动：json-server/JSON文件位于的目录／xxx.json
支持：各种形式

###
在终端的当前目录，直接code . ，就直接可以打开编辑器。

###
使用 `ng g m core` 创建核心模块；


## 全局安装json-server报错，重新卸载nvm安装node。
$ sudo rm -rf .nvm .npm
$ brew install nvm
$ nvm install stable #安装最新稳定版 node
…
$ sudo npm install express

