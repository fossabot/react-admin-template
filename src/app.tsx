import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { ConfigProvider, message, notification } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import Routers from './routes';
import store from './store';

import 'moment/locale/zh-cn';
import './styles/common.less';
import './theme/light.less';
import './theme/dark.less';

moment.locale('zh-cn');
configure({ enforceActions: 'observed' });
message.config({
	duration: 1.5,
	maxCount: 3,
});
notification.config({
	placement: 'bottomRight',
	duration: 2,
});

export default function App() {
	return (
		<ConfigProvider locale={zhCN}>
			<Provider {...store}>{Routers}</Provider>
		</ConfigProvider>
	);
}
