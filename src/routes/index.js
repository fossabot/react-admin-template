import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import store from '../store';
import routes from './routes';
import namesMap from '../helper/names-map';
import Container from '../layout/container';

const { titleMap, breadcrumbNameMap } = namesMap(routes);
store.maps.titleMap = titleMap;
store.maps.breadcrumbNameMap = breadcrumbNameMap;

export default (
	<BrowserRouter>
		<Container>
			<Switch>
				{renderRoutes(routes)}
				<Redirect to="/404" />
			</Switch>
		</Container>
	</BrowserRouter>
);
