import React from 'react';
import { configure } from 'mobx';
import { Provider, ProviderProps } from 'mobx-react';
import store from './store';

configure({ enforceActions: 'observed' });

function MobxProvider(props: ProviderProps): React.ReactElement {
	return (
		<Provider {...store}>
			{props.children}
		</Provider>
	);
}

export default MobxProvider;
