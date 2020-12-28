/**
 * 自定义renderRoutes方法
 * 添加了路由级权限功能和深层路由功能
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isArray } from '../utils/functions';

function renderRoutes(routes, authData = {}, extraProps = {}) {
	const map = [];

	function helper(routerList) {
		routerList.forEach((route) => {
			const { key, path, exact, strict, some, authority = [] } = route;
			map.push(
				<Route
					key={key || path}
					path={path}
					exact={exact}
					strict={strict}
					render={(props) => {
						const list = isArray(authority) ? authority : [authority];
						const isNeedAuth = list.length > 0;
						const authorized = some
							? list.some((item) => authData[item])
							: list.every((item) => authData[item]);

						if (!isNeedAuth || (isNeedAuth && authorized)) {
							return <route.component {...props} {...extraProps} route={route} />;
						}

						return <Redirect to={{ pathname: '/403', state: { from: props.location } }} />;
					}}
				/>,
			);

			if (route.routes) helper(route.routes);
		});
	}

	helper(routes, authData, extraProps);

	return map;
}

// function renderRoutes(routes, authData = {}, extraProps = {}) {
// 	return routes
// 		? routes.map(route => {
// 				const { key, path, exact, strict, some, authority = [] } = route;
// 				return (
// 					<Route
// 						key={key || path}
// 						path={path}
// 						exact={exact}
// 						strict={strict}
// 						render={props => {
// 							const list = isArray(authority) ? authority : [authority]
// 							const isNeedAuth = list.length > 0;
// 							const authorized = some
// 								? list.some(item => authData[item])
// 								: list.every(item => authData[item]);
//
// 							if (!isNeedAuth || (isNeedAuth && authorized)) {
// 								return <route.component {...props} {...extraProps} route={route} />;
// 							}
//
// 							return <Redirect to={{ pathname: '/403', state: { from: props.location } }} />;
// 						}}
// 					/>
// 				);
// 		  })
// 		: null;
// }

export default renderRoutes;
