# angualr-taskmgr

angualr4.x 完成的一个任务管理平台
安装VScode 网址：[https://code.visualstudio.com](https://code.visualstudio.com)；

1.安装angular脚手架：`npm i -g @angular/cli`; 如果失败，先uninstall，再`npm cache clean` 清除缓存再重新安装;angular-cli是用typescript写的, 所以要先装这两个: `npm install -g typescript typings`。

2.网址：[chrome-extension-downloader.com](chrome-extension-downloader.com) ，chrome安装 Augury插件，ID：elgalmkoelokbchhkhacckoklkejnhcd , 可以下载插件;

3.`npm i --save` 包名: 软件依赖: `npm i --save-dev` 包名：开发依赖;

4.`ng new` 项目名：新建angular项目; `ng new taskmgr -si --style=scss`;

5.`ng build -prod`: 生产环境编译; `ng serve`: 启动开发服务器；

6.`ng g m core` 创建核心模块;

7.`ng g c core/header --spec=false` 在core文件夹下创建header组件，并且不创建测试文件;

## 小技巧

- html： `div>header+main+footer` 按回车快速建立模版；`div*3+div.box*3` 创建布局；

- material设计库： [https://materialdesignblog.com](https://materialdesignblog.com) 有官方组件库；安装：`npm i --save @angular/material`;

- material文档库：[https://material.angularjs.org/latest/](https://material.angularjs.org/latest/)；

- material工具库：[https://material.io/color/](https://material.io/color/)；

## Mock Rest API

> json-server: 用于快速搭建 REST API 的利器
> 安装：`npm install i -g json-server`
> 启动：json-server/JSON文件位于的目录／xxx.json
> 支持：各种形式

## 全局安装json-server报错，重新卸载nvm安装node,步骤如下：

``` case:
  $ sudo rm -rf .nvm .npm
  $ brew install nvm
  $ nvm install stable #安装最新稳定版 node
  …
  $ sudo npm install express
```

----------

### **第一天学习心得：**

- material自定义svgIcon，需要额外引入import {httpModul} from '@angular/http'，才可找到正确的本地路径；

- 新建shared文件，专门用于导入和导出共用的module；

- 新建utills文件，专门写需要加载内容用到的函数，在只能加载一次的核心模块core中引用；

### **2017/10/29 学习心得：**

- 引入时间类库的方法： cnpm i --save date-fns; cnpm i --save-dev @types/date-fns.

- 在使用angular/cli工具创建新的模块时，会报错”ELOOP: too many symbolic links encountered“。是由于使用cnpm install 安装的结果。删除掉node_nodules,使用npm install 重新安装就好。

- 全局npm安装模块时，输入" $ npm install -g @angular/cli"时，会报错"npm WARN checkPermissions Missing write access"。解决方法是：删除掉 C:\Users\dd\AppData\Roaming\npm-cache\，C:\Users\dd\AppData\Roaming\npm\  两个文件夹 重新执行 npm install -g。

### **2017/11/4 学习心得：**

- 显示定义与隐形定义，是拿分号定义的，是typescript的定义形式。不是太懂

```如下：
  displayUser(user: {id: string; name: string}) {
      return user ? user.name : '';
    }

    //显性定义如下：效果与上面定义相同
    export interface User {
      id: string;
      name: string;
    }
```

- 聪明组件越少越好，笨组件越多越好。

- 建立简单组件的方法： ng g c shared/confirm-dialog -it -is --spec=false;
