# React Admin Template

自用 React 项目开发模板

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