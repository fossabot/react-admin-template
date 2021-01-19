import React from 'react';
import { Breadcrumb } from 'antd';

const GlobalBreadcrumb: React.FC = () => {
	return (
		<Breadcrumb>
			<Breadcrumb.Item>Home</Breadcrumb.Item>
			<Breadcrumb.Item>Application Center</Breadcrumb.Item>
			<Breadcrumb.Item>Application List</Breadcrumb.Item>
			<Breadcrumb.Item>An Application</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default GlobalBreadcrumb;
