/**
 * Electron 开发 dev 环境入口
 */
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

electronDebug();

(async function dev() {
	await app.whenReady();

	import('./utils/app-info');

	/** ************** extensions start *************** */
	const results = await Promise.allSettled([
		installExtension(REACT_DEVELOPER_TOOLS),
		installExtension(REDUX_DEVTOOLS),
		installExtension(MOBX_DEVTOOLS),
	]);

	results.forEach((result) => {
		if (result.status === 'fulfilled') {
			console.log(`Added Extension: ${result.value}`);
		}
		if (result.status === 'rejected') {
			console.log('An error occurred when added extension: ', result.reason);
		}
	});
	/** ************** extensions end *************** */

	mark('dev-end');

	console.log('Dev Ready');
})();
