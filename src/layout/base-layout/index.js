import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { Redirect, Switch } from 'react-router-dom';
import ErrorBoundary from '../../components/error-boundary';
import GlobalHeader from '../../components/global-header';
import GlobalBreadcrumb from '../../components/global-breadcrumb';
import GlobalMarquee from '../../components/global-marquee';
import GlobalAside from '../../components/global-aside';
import renderRoutes from '../../helper/render-routes';
import s from './index.module.less';

@inject('global', 'maps')
@observer
class BaseLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirectRouters: this.onGetRedirect(),
		};
	}

	componentDidMount() {
		const { global } = this.props;
		// 持久化换肤可本地化存储或者接口
		document.body.setAttribute('data-theme', global.theme);

		this.onSetTitleAndClass();
		this.props.history.listen(() => {
			this.onSetTitleAndClass();
		});
	}

	onGetRedirect() {
		const { route } = this.props;
		const redirectArr = [];
		if (route.redirect) {
			redirectArr.push(<Redirect exact key={route.path} from={route.path} to={route.redirect} />);
		}
		route.routes.forEach(item => {
			if (item.redirect) {
				redirectArr.push(<Redirect exact key={item.path} from={item.path} to={item.redirect} />);
			}
		});
		return redirectArr;
	}

	onSetTitleAndClass() {
		const {
			global: { systemTitleName },
			maps: { titleMap },
		} = this.props;
		const { pathname } = window.location;
		document.title = titleMap[pathname.replace(/\/$/, '')] || systemTitleName;
	}

	render() {
		const {
			route,
			global: {
				layoutConfig: { menuPosition, collapsed },
			},
			history: {
				location: { pathname },
			},
		} = this.props;
		const { redirectRouters } = this.state;
		const isLoginPage = pathname.replace(/\/$/, '') === '/login';

		return (
			<>
				{isLoginPage === false && (
					<>
						{menuPosition === 'aside' && <GlobalAside />}
						<div
							className={classnames(s['command-centre'], {
								'has-aside': menuPosition === 'aside',
								collapsed,
							})}
						>
							<GlobalHeader />
						</div>
					</>
				)}
				<div
					className={classnames(s['main-battlefield'], {
						[s['has-aside']]: menuPosition === 'aside',
						[s.collapsed]: collapsed,
					})}
				>
					{isLoginPage === false && (
						<>
							<GlobalBreadcrumb />
							<GlobalMarquee />
						</>
					)}
					<div className={classnames(s['drill-ground'])}>
						<ErrorBoundary>
							<Switch>
								{redirectRouters}
								{renderRoutes(route.routes)}
								<Redirect to="/404" />
							</Switch>
						</ErrorBoundary>
					</div>
				</div>
			</>
		);
	}
}

BaseLayout.propTypes = {
	route: PropTypes.object,
	global: PropTypes.object,
	history: PropTypes.object,
	maps: PropTypes.object,
};

export default BaseLayout;
