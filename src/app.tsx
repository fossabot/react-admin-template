import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Mobx from './mobx';

import BaseLayout from './layout';
import { renderRoutes } from './utils/render-routes';
import outsiders from './router/outsiders';
import './styles/index.less';

const App: React.FC = () => {
	return (
		<ConfigProvider locale={zhCN}>
			<Mobx>
				<BrowserRouter>
					<Switch>
						{renderRoutes(outsiders)}
					</Switch>
					<BaseLayout />
				</BrowserRouter>
			</Mobx>
		</ConfigProvider>
	);
};

export default App;
