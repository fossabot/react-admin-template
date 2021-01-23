import React from 'react';
import { Breadcrumb } from 'antd';
import s from './index.module.less';

const GlobalBreadcrumb: React.FC = () => {
	return (
		<Breadcrumb className={s.breadcrumb}>
			<Breadcrumb.Item>Home</Breadcrumb.Item>
			<Breadcrumb.Item>Application Center</Breadcrumb.Item>
			<Breadcrumb.Item>Application List</Breadcrumb.Item>
			<Breadcrumb.Item>An Application</Breadcrumb.Item>
		</Breadcrumb>
	);
};

export default GlobalBreadcrumb;
