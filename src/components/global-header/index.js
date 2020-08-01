/**
 * 导航栏
 */

import React from 'react';
import { inject, useObserver } from 'mobx-react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import GlobalAccount from '../global-account';
import GlobalMenu from '../global-menu';

import s from './index.module.less';
import logo from '../../assets/icon/icon_logo.png';

function GlobalHeader(props) {
	return useObserver(() => {
		const {
			systemTitleName,
			layoutConfig: { menuPosition },
		} = props.global;
		const isMenuHeader = menuPosition === 'header';

		return (
			<div className={classnames(s.container, { [s['menu-aside']]: !isMenuHeader })}>
				{isMenuHeader && (
					<>
						<div className={s['nav-header-left']}>
							<Link to="/">
								<img className={s.logo} src={logo} alt="logo" />
								<span className={s['system-name']}>{systemTitleName}</span>
							</Link>
						</div>

						<div className={classnames('nav-header-menu', s['nav-header-menu'])}>
							<GlobalMenu mode="horizontal" position="header" />
						</div>
					</>
				)}

				<GlobalAccount />
			</div>
		);
	});
}

GlobalHeader.propTypes = {
	global: PropTypes.object,
};

export default inject('global')(GlobalHeader);
