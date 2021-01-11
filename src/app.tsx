import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import MobxProvider from './mobx';

import BaseLayout from './layout/base-layout';
import { getRedirectsRoutes, renderRoutes } from './utils/render-routes';
import outsiders from './router/outsiders';
import './styles/index.less';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<ConfigProvider locale={zhCN}>
				<MobxProvider>
					<Switch>
						{getRedirectsRoutes(outsiders)}
						{renderRoutes(outsiders)}
						<BaseLayout />
					</Switch>
				</MobxProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export default App;
