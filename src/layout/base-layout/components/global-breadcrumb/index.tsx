import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getParentsRouteByPath } from '@/utils/temp-utils';
import useEnhancedEffect from '@/utils/use-enhanced-effect';
import routes from '@/router';
import { IRouterConfig } from '@/utils/render-routes';
import s from './index.module.less';

const GlobalBreadcrumb: React.FC = () => {
	const location = useLocation();
	const [breadcrumbs, setBreadcrumbs] = useState<IRouterConfig[]>([]);
	useEnhancedEffect(() => {
		const pathname = location.pathname.replace(/\/$/, '');
		setBreadcrumbs(getParentsRouteByPath(routes, pathname) as IRouterConfig[] || []);
	}, [location.pathname]);
	return (
		<Breadcrumb className={s.breadcrumb}>
			<Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
			{breadcrumbs.reverse().map(({ path, children, meta }) => (
				<Breadcrumb.Item key={path}>
					{children?.length ? meta?.title : <Link to={path}>{meta?.title}</Link>}
				</Breadcrumb.Item>
			))}
		</Breadcrumb>
	);
};

export default GlobalBreadcrumb;
