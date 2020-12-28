import 'core-js';
import React from 'react';
import ReactDom from 'react-dom';
import 'mobx-react-lite/batchingForReactDom';
import getAppInfo from './utils/app-info';

import App from './app';

getAppInfo(true);

const MOUNT_NODE = document.querySelector('#app');

ReactDom.render(<App />, MOUNT_NODE);

// if (process.env.NODE_ENV === 'development') {
// 	const { setConfig, AppContainer } = require('react-hot-loader');
// 	setConfig({
// 		logLevel: 'error',
// 	});
//
// 	ReactDom.render(
// 		<AppContainer>
// 			<App />
// 		</AppContainer>,
// 		MOUNT_NODE,
// 	);
//
// 	if (module.hot) {
// 		module.hot.accept();
// 	}
// } else {
// 	ReactDom.render(<App />, MOUNT_NODE);
// }
