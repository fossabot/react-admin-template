import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import BaseLayout from './layout';
import { renderRoutes } from './utils/render-routes';
import outsiders from './router/outsiders';
import './styles/index.less';

const App: React.FC = () => {
	return (
		<ConfigProvider locale={zhCN}>
			<BrowserRouter>
				<Switch>
					{renderRoutes(outsiders)}
					<BaseLayout />
				</Switch>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
