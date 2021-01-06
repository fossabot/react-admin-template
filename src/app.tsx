import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import BaseLayout from './layout';
import { renderRoutes } from './utils/render-routes';
import outsiders from './router/outsiders';
import './styles/index.less';

export default function App(): React.ReactElement {
	return (
		<BrowserRouter>
			<Switch>
				{renderRoutes(outsiders)}
				<BaseLayout />
			</Switch>
		</BrowserRouter>
	);
}
