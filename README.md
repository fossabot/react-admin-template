# React Admin Template

自用 React 项目开发模板，本分支作为项目快速启动模板，不会过多提交代码，只提供基础模板。

**注意**
1. **本项目模板同时引入了`Redux`和`Mobx`的演示，仅提供开始前的选择演示，所以切忌二者同时使用。**
2. **删除其中一个很容易，在`src/app.tsx`中`MobxProvider`和`ReduxProvider`二选一即可**
3. **演示页面文件在`src/pages/store-test`目录，对应路由在`src/router/tests.tsx`文件，直接删除即可**
4. **然后选择性删除`src/mobx`目录或`src/redux`目录。**
5. **若选择`Mobx`，请将`@reduxjs/toolkit`、`react-redux`、`reselect`卸载，反之请将`mobx`、`mobx-react`卸载**

## 一. 本地开发

```shell script
# 安装依赖
> npm install

# 启动前会构建dll
> npm run start

# 启动不会构建dll，之前存在就用
> npm run dev
```

## 二. 代码风格

本项目对代码风格有一定的要求，具体参考`.eslintrc.js`、`.stylelintrc.js`、`.prettierrc.js`文件配置。

## 三. 提交规范

项目提交前会对`commit message`进行检查，不符合规范提交会被拒绝。`commit message`格式如下：

```
> type(scope?): subject // scope可选
```

提交的 type 只能是`['feature', 'refactor', 'chore', 'style', 'docs', 'perf', 'fix', 'build', 'revert', 'ci', 'test']`其中之一。

## 四. 打包构建

由于自家CI没得商量只传递一个环境变量`NODE_ENV`且会超出`development`、`test`、`production`范围，
故而此项目`BABEL_ENV`、`NODE_ENV`已固定为`development`、`production`，业务内环境变量统一由`BUILD_ENV`代替以判断部署环境。

## 五. electron

本模板内置了`electron`相关功能，如果不需要`electron`又不想其留在项目中，操作如下:

1. 删除`.scripts/config/paths.js`中electron相关目录配置
2. 删除`.scripts/webpack/webpack.main.prod.config.js`
3. 删除根目录下`main`目录
4. 卸载`package.json`文件中的`electron`、`node-loader`
5. 为了好看，在`./config/paths.js`配置web文件打包输出目录`dist/render` -> `dist`

