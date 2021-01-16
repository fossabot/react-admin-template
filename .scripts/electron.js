/**
 * electron 开发启动
 * 如果不需要electron又不想其留在项目中，操作如下
 * 1. 删除`./config/paths.js`中electron相关目录配置
 * 2. 删除`./webpack/webpack.main.prod.config.js`
 * 3. 删除根目录下`main`目录
 * 4. 卸载`package.json`文件中的`electron`、`node-loader`
 * 5. 删除本文件
 * 6. 为了好看，在`./config/paths.js`配置web文件打包输出目录`dist/render` -> `dist`
 */
