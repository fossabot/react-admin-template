import React, { Suspense, useState } from 'react';
import { Switch } from 'react-router';
import { Layout } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

import GlobalMenu from './components/global-menu';
import GlobalNav from './components/global-nav';
import LoadingComponent from '../components/loading-component';
import { renderRoutesDeep } from '../utils/render-routes';
import routes from '../router';
import s from './index.module.less';

const { Header, Sider, Content } = Layout;

function BaseLayout(): React.ReactElement {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout id="app-container">
			<Sider collapsedWidth={80} collapsed={collapsed}>
				<div className={s.appAside}>
					<Header className={s.appAsideLogo}>React Admin Template</Header>
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
}

export default BaseLayout;
