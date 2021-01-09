import React, { Suspense, useState } from 'react';
import { Switch } from 'react-router';
import { useLocation, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

import GlobalMenu from './components/global-menu';
import GlobalNav from './components/global-nav';
import LoadingComponent from '../components/loading-component';
import { renderRoutesDeep } from '../utils/render-routes';
import routes from '../router';
import s from './index.module.less';

const { Header, Sider, Content } = Layout;

const BaseLayout: React.FC = () => {
	const location = useLocation();
	const history = useHistory();
	const [collapsed, setCollapsed] = useState(false);

	function onNavToRoot(): void {
		if (location.pathname !== '/') {
			history.push('/');
		}
	}

	return (
		<Layout id="app-container">
			<Sider collapsedWidth={80} collapsed={collapsed}>
				<div className={s.appAside}>
					<Header className={s.appAsideLogo} onClick={onNavToRoot}>
						React Admin Template
					</Header>
					<GlobalMenu />
				</div>
			</Sider>
			<Layout>
				<Header className={s.appHeader}>
					<MenuFoldOutlined
						className={s.foldIcon}
						onClick={(): void => {
							setCollapsed(!collapsed);
						}}
					/>
					<GlobalNav />
				</Header>
				<Content className={s.appRouterView}>
					{/* @todo Suspense 和 React.lazy不支持服务端渲染 */}
					<Suspense fallback={<LoadingComponent />}>
						<Switch>{renderRoutesDeep(routes)}</Switch>
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
