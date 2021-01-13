import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import BaseLayout from './layout/base-layout';
import { getRedirectsRoutes, renderRoutes } from './utils/render-routes';
import outsiders from './router/outsiders';
import './styles/index.less';

import MobxProvider from './mobx';
import ReduxProvider from './redux';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<ConfigProvider locale={zhCN}>
				{/* @warn @todo 删除。此处仅是模板示例，真实项目请选择其一。⚠CAUTION: One of MobxProvider and ReduxProvider */}
				<MobxProvider>
					<ReduxProvider>
						<Switch>
							{getRedirectsRoutes(outsiders)}
							{renderRoutes(outsiders)}
							<BaseLayout />
						</Switch>
					</ReduxProvider>
				</MobxProvider>
			</ConfigProvider>
		</BrowserRouter>
	);
};

export default App;
