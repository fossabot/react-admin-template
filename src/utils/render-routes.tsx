import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router';

export interface IRouteComponentProps extends RouteComponentProps {
	route: IRouterConfig;
}

export interface IRouterConfig {
	key?: string;
	path: string;
	exact?: boolean;
	strict?: boolean;
	sensitive?: boolean;
	redirect?: string;
	// eslint-disable-next-line no-unused-vars
	render?: (props: IRouteComponentProps) => React.ReactNode;
	component?: React.ComponentType<IRouteComponentProps> | React.ComponentType<any>;
	meta?: {
		// metadata
		title?: string; // document title
		icon?: React.ReactElement | string; // icon in menu or tabs
		pin?: boolean; // fixed in tabs
		cache?: boolean; // cache
		hidden?: boolean; // hide in menu
		showInTabs?: boolean; // show in tabs
		some?: boolean; // authority logic
		authorities?: string[]; // authorities
		fallback?: string; // fallback url
	};
	routes?: IRouterConfig[]; // child routes
}

export interface ICommonObject {
	[key: string]: any;
}

export interface IExtraProps extends ICommonObject {
	permissions?: { [key: string]: boolean };
}

function generatorRoute(
	route: IRouterConfig,
	index: number,
	extraProps?: IExtraProps,
): React.ReactElement {
	const permissions = extraProps?.permissions;
	const meta = route?.meta;
	const fallback = meta?.fallback;
	const authorities = meta?.authorities;
	const authorizationRequired = authorities && authorities?.length > 0;
	const authorized = meta?.some
		? authorities?.some((value) => permissions?.[value])
		: authorities?.every((value) => permissions?.[value]);

	return (
		<Route
			key={route.key || index}
			path={route.path}
			exact={route.exact}
			strict={route.strict}
			render={(props): React.ReactNode => {
				if (authorizationRequired && !authorized) {
					return (
						<Redirect
							to={{
								pathname: fallback || '/403',
								state: { from: props.location },
							}}
						/>
					);
				}
				if (route.render) {
					return route.render({ ...props, ...extraProps, route });
				}
				if (route.component) {
					return <route.component {...props} {...extraProps} route={route} />;
				}
				return null;
			}}
		/>
	);
}

function renderRoutes(
	routes: IRouterConfig[],
	extraProps?: IExtraProps,
): React.ReactElement[] | null {
	if (routes) {
		return routes.map((route, index) => {
			return generatorRoute(route, index, extraProps);
		});
	}
	return null;
}

function renderRoutesDeep(routes: IRouterConfig[], extraProps?: IExtraProps): React.ReactElement[] {
	const routers: React.ReactElement[] = [];

	function travel(routerList: IRouterConfig[]): void {
		routerList.forEach((route, index) => {
			routers.push(generatorRoute(route, index, extraProps));

			if (Array.isArray(route.routes)) {
				travel(route.routes);
			}
		});
	}

	if (Array.isArray(routes)) {
		travel(routes);
	}

	return routers;
}

export { renderRoutes, renderRoutesDeep };
