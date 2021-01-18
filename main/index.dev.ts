import { app } from 'electron';
import electronDebug from 'electron-debug';
import installExtension, {
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS,
	MOBX_DEVTOOLS,
} from 'electron-devtools-installer';
import { mark, performanceStart } from './utils/performance';

performanceStart();

mark('dev-start');

(async function dev() {
	await app.whenReady();

	electronDebug();

	const names = await Promise.all([
		installExtension(REACT_DEVELOPER_TOOLS),
		installExtension(REDUX_DEVTOOLS),
		installExtension(MOBX_DEVTOOLS),
	]);

	names.forEach((name) => {
		console.log(`Added Extension: ${name}`);
	});
	console.log('Dev Ready');

	mark('dev-end');
})();

require('./index');
