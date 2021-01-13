# redux

使用redux作为状态管理器，本项目使用了`@reduxjs/toolkit`作为redux套件只支持hooks，
redux-react的connect依然可以连接类组件。

**如果选择redux，请删掉mobx相关代码。**

建议全面拥抱hooks，毕竟它真香。

# 约定

为便于查找，保持namespace与文件名同名，全局的store会放置于pages同目录，所以请自行保证pages内文件与外部文件不同名。