import React  from 'react';
import { BrowserRouter } from 'react-router-dom';

import BaseLayout from './layout';
import './styles/index.less';

export default function App(): React.ReactElement {
	return (
		<BrowserRouter>
			<BaseLayout />
		</BrowserRouter>
	);
}

