# React Admin Template

自用 React 项目开发模板，本分支作为项目快速启动模板，不会过多提交代码，只提供基础模板。
默认使用`TypeScript`开发，如若支持`JavaScript`，修改`tsconfig.json`中`allowJs: true`。

**注意**

1. **本项目模板同时引入了`Redux`和`Mobx`的演示，仅提供开始前的选择演示，所以切忌二者同时使用。**
2. **删除其中一个很容易，在`src/app.tsx`中`MobxProvider`和`ReduxProvider`二选一即可**
3. **路由权限数据使用了redux的状态，根据选择修改，入口在`src/layout/index.tsx`**
4. **演示页面文件在`src/pages/store-test`目录，对应路由在`src/router/tests.tsx`文件，直接删除即可**
5. **然后选择性删除`src/mobx`目录或`src/redux`目录。**
6. **若选择`Mobx`，请将`@reduxjs/toolkit`、`react-redux`、`reselect`卸载，反之请将`mobx`、`mobx-react`卸载**
7. **标签页组件`TabsBar(src/layout/base-layout/components/tabs-bar)`依赖了`redux`的状态，使用`mobx`请自行改造**

## 一. 本地开发

```shell script
# 安装依赖
> npm install

# 启动前会构建dll
> npm run start

# 启动不会构建dll，之前存在就用
> npm run dev

# 启动electron开发环境
> npm run electron
```

## 二. 代码风格

本项目对代码风格有一定的要求，具体参考`.eslintrc.js`、`.stylelintrc.js`、`.prettierrc.js`文件配置。

## 三. 提交规范

项目提交前会对`commit message`进行检查，不符合规范提交会被拒绝。`commit message`格式如下：

```
> type(scope?): subject // scope可选
```

提交的 `type` 可选值如下:

```javascript
[
 'build',
 'ci',
 'chore',
 'docs',
 'feat',
 'fix', 
 'perf',
 'refactor',
 'revert',
 'style',
 'test',
]
```

## 四. 打包构建

为了互不影响，`web`代码打包再`dist`目录，`electron`代码打包在`build`目录，其中渲染进程代码全部在`build/render`目录。

### 环境变量说明

一些`BuiltIns`、`Plugins`、`Loader`的环境变量默认值是`process.env.NODE_ENV`，
但是自家 CI 没得商量只传递一个环境变量`NODE_ENV`且会超出`development`、`test`、`production`范围，
同时为了变量扩展，此项目`BABEL_ENV`、`NODE_ENV`已固定为`development`、`production`。
也就是说无论`NODE_ENV`传递什么值都会在赋值给`BUILD_ENV`后被强制矫正为`development`或`production`。

**所以本模板中请使用`BUILD_ENV`来区分环境，`process.env.NODE_ENV`不再使用**

### 打包命令

本模板无内置`electron`安装包构建支持，具体是`electron-builder`、`electron-packager`亦或其他请自行选择。

> 如果`CI/CD`平台只支持`run build`，`electron`打包请自行适配

```shell script
# web开发环境打包
> npm run build:dev

# web测试环境打包
> npm run build:test

# web生产环境打包
> npm run build:prod

# electron开发环境打包
> npm run build:electron:dev

# electron测试环境打包
> npm run build:electron:test

# electron生产环境打包
> npm run build:electron:prod
```


## 五. 关于 Electron

本模板内置了`electron`相关功能，为了方便不需要`electron`的项项目并没有将主进程代码和渲染进程代码放置一起。
目录结构根据需要可以轻松自行调整，只需调整`.scripts/config/paths.js`文件相关变量即可轻松搞定。

### 不需要`electron`

> 如果不需要`electron`又不想其留在项目中，操作如下:

0. 删除`tsconfig.json`中`include`数组的`main`目录配置和`paths`对象中的`~/*`
1. 删除`.scripts/config/paths.js`中 electron 相关目录配置，有注释
2. 删除`.scripts/electron`文件夹`
3. 删除根目录下`main`目录
4. 删除`package.json`文件中`scripts`对象的`electron`相关命令
5. 卸载`package.json`文件中的依赖
	1. `electron`
	2. `node-loader`
	3. `electron-debug`
	4. `electron-devtools-installer`
	5. `@types/electron-devtools-installer`
	6. `electron-builder`
6. done

以上操作经实践暂无问题，如有问题请先查看控制台错误输出。

### 需要`electron`

> 如果希望将主进程、渲染进程放置于同一目录(以`src`为例，渲染进程代码`src/render`，主进程代码(`src/main`)，操作如下:

0. 删除`tsconfig.json`中`include`数组的`main`目录配置，将`src`替换为`src/render`
1. 将`tsconfig.json`中的`paths: { "~/*": ["./main/*"], "@/*": ["./src/*"] }`对象修改为`paths: { "~/*": ["./src/main/*"], "@/*": ["./src/render/*"] }`
2. `src`目录中新建`render`子目录，将`src`目录中原有所有文件移动到`src/render`目录
3. 将`main`目录移动到`src`目录与`render`目录同级
4. 修改`.scripts/config/paths.js`相关配置，将`src`修改为`src/render`，将`main`修改为`src/main`
5. done

## @todo

* 主进程代码修改后如何才能像渲染进程代码一样热加载，而不是每次重新启动程序
* 引入electron的打包脚本，更新功能