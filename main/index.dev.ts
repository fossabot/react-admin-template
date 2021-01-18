import { app } from 'electron';
import installExtension, {
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS,
	MOBX_DEVTOOLS,
// eslint-disable-next-line import/no-extraneous-dependencies
} from 'electron-devtools-installer';

// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-unsafe-call
require('electron-debug')({ showDevTools: true });

app.on('ready', () => {
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	installExtension(REDUX_DEVTOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	installExtension(MOBX_DEVTOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
});

require('./index');
