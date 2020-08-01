import React from 'react';
import { inject, observer } from 'mobx-react';
import { GlobalOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import GlobalMenu from '../global-menu';
import s from './index.module.less';

function GlobalAside(props) {
	const {
		systemTitleName,
		layoutConfig: { collapsed },
		onSetLayoutConfig,
	} = props.global;

	return (
		<div className={classNames('app-aside-panel', s.aside, { [s.collapsed]: collapsed })}>
			<div
				className={s['aside-header']}
				onClick={() => onSetLayoutConfig({ collapsed: !collapsed })}
			>
				<GlobalOutlined style={{ fontSize: 20 }} />
				<span className={s.title}>{systemTitleName}</span>
			</div>

			<GlobalMenu
				className={s['aside-menu-content']}
				mode="inline"
				position="aside"
				inlineCollapsed={collapsed}
			/>
		</div>
	);
}

GlobalAside.propTypes = {
	global: PropTypes.object,
};

export default inject('global')(observer(GlobalAside));
