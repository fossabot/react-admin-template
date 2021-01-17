const { app } = require('electron');

// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-unsafe-assignment
const installExtension = require('electron-devtools-installer');

// eslint-disable-next-line import/no-extraneous-dependencies
require('electron-debug')({ showDevTools: true });

app.on('ready', () => {
	// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-unsafe-assignment
	installExtension.default(installExtension.REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	installExtension.default(installExtension.REDUX_DEVTOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));

	installExtension.default(installExtension.MOBX_DEVTOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err));
});

// require('./index');
