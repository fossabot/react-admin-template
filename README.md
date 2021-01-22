# React Admin Template

自用 React 项目开发模板，本分支作为项目快速启动模板，不会过多提交代码，只提供基础模板。

**注意**

1. **本项目模板同时引入了`Redux`和`Mobx`的演示，仅提供开始前的选择演示，所以切忌二者同时使用。**
2. **删除其中一个很容易，在`src/app.tsx`中`MobxProvider`和`ReduxProvider`二选一即可**
3. **路由权限数据使用了redux的状态，根据选择修改，入口在`src/layout/index.tsx`**
4. **演示页面文件在`src/pages/store-test`目录，对应路由在`src/router/tests.tsx`文件，直接删除即可**
5. **然后选择性删除`src/mobx`目录或`src/redux`目录。**
6. **若选择`Mobx`，请将`@reduxjs/toolkit`、`react-redux`、`reselect`卸载，反之请将`mobx`、`mobx-react`卸载**

## 注意事项

项目涉及权限管理默认使用`{ [(role | permission): string]: boolean }`格式返回，模板内处理也是此逻辑。
如果返回的是数组或其他格式，适配如下两点即可：

1. 路由相关 - 在`src/utils/render-routes.tsx`第`51`行修改，也可在调用`renderRoutes`方法的地方通过入参适配。
2. 操作权限 - 有操作权限的渲染会用`Permission`组件包裹，处理逻辑修改适配即可。

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

由于自家 CI 没得商量只传递一个环境变量`NODE_ENV`且会超出`development`、`test`、`production`范围，故而此项目`BABEL_ENV`、`NODE_ENV`已固定为`development`、`production`。
也就是说无论`NODE_ENV`传递什么值都会在赋值给`BUILD_ENV`后被强制矫正为`development`或`production`。**所以业务代码中请使用`BUILD_ENV`来判断真实的部署环境。**

## 五. 关于 Electron

本模板内置了`electron`相关功能，为了方便不需要`electron`的项项目并没有将主进程代码和渲染进程代码放置一起。
目录结构根据需要可以轻松自行调整，只需调整`.scripts/config/paths.js`文件相关变量即可轻松搞定。

### 不需要`electron`

> 如果不需要`electron`又不想其留在项目中，操作如下:

0. 删除`tsconfig.json`中`include`数组的`main`目录配置和`paths`对象中的`~/*`
1. 删除`.scripts/config/paths.js`中 electron 相关目录配置，有注释
2. 删除`.scripts/electron`文件夹和`.scripts/webpack/webpack.main.prod.config.js`
3. 为了好看，在`./config/paths.js`配置 web 文件打包输出目录`dist/render` -> `dist`
4. 删除根目录下`main`目录
5. 删除`package.json`文件中`scripts`对象的`electron`相关命令
6. 卸载`package.json`文件中的依赖
	1. `electron`
	2. `node-loader`
	3. `electron-debug`
	4. `electron-devtools-installer`
	5. `@types/electron-devtools-installer`
7. done

以上操作经实践暂无问题，如有问题请先查看控制台错误输出。

### 需要`electron`

> 如果希望将主进程、渲染进程放置于同一目录(以`src`为例，渲染进程代码`src/render`，主进程代码(`src/main`)，操作如下:

0. 删除`tsconfig.json`中`include`数组的`main`目录配置，将`src`替换为`src/render`
1. 将`tsconfig.json`中的`paths: { "~/*": ["./main/*"], "@/*": ["./src/*"] }`对象修改为`paths: { "~/*": ["./src/main/*"], "@/*": ["./src/render/*"] }`
2. `src`目录中新建`render`子目录，将`src`目录中原有所有文件移动到`src/render`目录
3. 将`main`目录移动到`src`目录与`render`目录同级
4. 修改`.scripts/config/paths.js`相关配置，将`src`修改为`src/render`，将`main`修改为`src/main`
5. done

以上操作经实践暂无问题，如有问题请先查看控制台错误输出。

## @todo

* 主进程代码修改后如何才能像渲染进程代码一样热加载，而不是每次重新启动程序
* 引入electron的打包脚本，更新功能