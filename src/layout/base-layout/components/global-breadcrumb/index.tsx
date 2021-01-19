import React from 'react';
import { Breadcrumb } from 'antd';
import routes from '@/router';

const GlobalBreadcrumb: React.FC = () => {
	console.log(routes);

	return (
		<Breadcrumb routes={routes}>
			<Breadcrumb.Item>Home</Breadcrumb.Item>
			<Breadcrumb.Item>Application Center</Breadcrumb.Item>
			<Breadcrumb.Item>Application List</Breadcrumb.Item>
			<Breadcrumb.Item>An Application</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default GlobalBreadcrumb;
