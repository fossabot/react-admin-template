# React template

自用 React 项目开发模板

> 因为项目几乎都是暗色主题，个别多主题，故而基于`antd`的暗色主题适配的亮色主题，模板亮色主题未完全适配，需要的时候自行处理。当然也可以基于亮色主题去适配暗色主题。可虑到扩展性、易调试性以及可能的兼容性，不考虑动态替换`less`变量的方案。如果只需要亮色主题，直接修改`.antdthemerc.js`即可。

## 开发注意

1. 目前为了清晰、降低路由配置复杂度，将菜单配置单独分离开来放在`/src/config/menu.ts`文件中。

2. 默认主题在`.antdthemerc.js`中配置，主题适配可以基于 antd 的暗色或亮色为主要主题进行适配。

3. 本地开发代理可以在根目录`dev-proxy.js`文件配置。

4. 项目支持 ts 编写。

## 一. 注意事项

1. 为了包管理工具统一并保正依赖包结构树一致性，本项目使用`npm`作为包管理工具，不建议在此项目使用`yarn`或其他包管理工具。

2. 在`.gitignore`文件中已忽略`yarn.lock`提交至版本库，请不要私自删除。

3. 项目 style 样式表已实现模块化，如果必须使用非模块化样式表，请使用页面级 class 作为作用域。页面级 class 已经自动生成，可页面查看。

## 二. 本地开发

```shell script
# 安装依赖
> npm install

# 只是启动项目，有dll就用，没有就不用
> npm run dev

# 会检查并构建dll并启动项目
> npm run start

# 将自动检查并条件性构建dll并启动项目
> npm run start
```

## 三. 代码风格

本项目对代码风格有一定的要求，具体参考`.eslintrc.js`、`.stylelintrc.js`、`.prettierrc.js`文件配置。

## 四. 提交规范

项目提交前会对`commit message`进行检查，不符合规范提交会被拒绝。`commit message`格式如下：

```
> type(scope?): subject // scope可选
```

提交的 type 只能是`['feature', 'refactor', 'chore', 'style', 'docs', 'perf', 'fix', 'build', 'revert', 'ci', 'test']`其中之一。

## 五. 项目文档

项目相关文档可放置于对应目录的 README.md 下，考虑到本项目不是组件库，所以不会引入 Docz 之类的工具增加复杂度与学习成本。

目前根目录有个 doc 文件夹，采用 `gitbook` 搭建，需要全局安装`gitbook-cli`方可运行。相关文档可以放置于此，也可以不使用。

## 六 打包发布

```shell script
# 环境变量来自持续集成工具传递的参数，依然是NODE_ENV
> npm run build

# 指定开发环境变量打包
> npm run build:dev

# 指定测试环境变量打包
> npm run build:test

# 指定生产环境变量打包
> npm run build:prod
```
