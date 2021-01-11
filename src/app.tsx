import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Mobx from './mobx';

import BaseLayout from './layout';
import { getRedirectsRoutes, renderRoutes } from './utils/render-routes';
import outsiders from './router/outsiders';
import './styles/index.less';

const App: React.FC = () => {
	return (
		<ConfigProvider locale={zhCN}>
			<Mobx>
				<BrowserRouter>
					<Switch>
						{getRedirectsRoutes(outsiders)}
						{renderRoutes(outsiders)}
						<BaseLayout />
					</Switch>
				</BrowserRouter>
			</Mobx>
		</ConfigProvider>
	);
};

export default App;
