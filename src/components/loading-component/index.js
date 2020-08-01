/**
 * 目前仅用于react-loadable的loading状态
 */

import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import s from './index.module.less';

/**
 * @return {Node|null}
 */
export default function Index({ isLoading, error }) {
	if (isLoading) {
		return (
			<div className={s.loading}>
				<Spin size="large" tip="loading..." />
			</div>
		);
	}

	if (error) return <div>error...</div>;

	return null;
}

Index.propTypes = {
	isLoading: PropTypes.bool,
	error: PropTypes.object,
};
