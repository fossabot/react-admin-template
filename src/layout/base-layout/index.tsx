import React, { useState } from 'react';
import { Switch } from 'react-router';
import { useLocation, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

import { getRedirectsRoutes, renderRoutesDeep } from '@/utils/render-routes';
import routes from '@/router';
import GlobalMenu from './components/global-menu';
import GlobalBreadcrumb from './components/global-breadcrumb';
import HeaderRight from './components/header-right';
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
					<section className={s.headerMenu}>
						<MenuFoldOutlined
							className={s.foldIcon}
							onClick={(): void => {
								setCollapsed(!collapsed);
							}}
						/>
						<GlobalBreadcrumb />
					</section>
					<HeaderRight />
				</Header>
				<Content className={s.appRouterView}>
					<Switch>
						{getRedirectsRoutes(routes)}
						{renderRoutesDeep(routes)}
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
