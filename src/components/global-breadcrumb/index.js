/**
 * 全局面包屑导航
 */

import React from 'react';
import { inject } from 'mobx-react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import s from './index.module.less';

function GlobalBreadcrumb(props) {
	const {
		maps: { breadcrumbNameMap },
		location: { pathname },
	} = props;

	const pathSnippets = pathname.split('/').filter(snippet => snippet);
	const extraBreadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
		const breadcrumbName = breadcrumbNameMap[url];

		if (!breadcrumbName) return null;

		return (
			<Breadcrumb.Item key={url}>
				<Link to={url}>{breadcrumbName}</Link>
			</Breadcrumb.Item>
		);
	});
	const breadcrumbItems = [
		<Breadcrumb.Item key="home">
			<Link to="/">
				<HomeOutlined />
				<span className={s.home}>首页</span>
			</Link>
		</Breadcrumb.Item>,
		...extraBreadcrumbItems,
	];

	return (
		<div className={s.breadcrumb}>
			<Breadcrumb>{breadcrumbItems}</Breadcrumb>
		</div>
	);
}

GlobalBreadcrumb.propTypes = {
	location: PropTypes.object,
	maps: PropTypes.object,
};

export default withRouter(inject('maps')(GlobalBreadcrumb));
