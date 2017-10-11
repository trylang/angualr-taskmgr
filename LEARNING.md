# angualr-taskmgr
angualr4.x 完成的一个任务管理平台

安装VScode 网址：https://code.visualstudio.com；


1. 安装angular脚手架：npm i -g @angular/cli;  如果失败，先uninstall，再npm cache clean 清除缓存再重新安装；
2. 网址：chrome-extension-downloader.com ，chrome安装 Augury插件，ID：elgalmkoelokbchhkhacckoklkejnhcd 。 可以下载插件； 
3. npm i --save 包名：软件依赖； npm i --save-dev 包名：开发依赖；
4. ng new 项目名：新建angular项目； ng new taskmgr -si --style=scss;
5. ng build -prod: 生产环境编译; ng serve: 启动开发服务器；

Mock Rest API
json-server: 用于快速搭建 REST API 的利器
安装：npm install i -g json-server
启动：json-server/JSON文件位于的目录／xxx.json
支持：各种形式

###
在终端的当前目录，直接code . ，就直接可以打开编辑器。

###
使用 `ng g m core` 创建核心模块；
