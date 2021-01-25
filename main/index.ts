import path from 'path';
import url from 'url';
import { app, BrowserWindow } from 'electron';
import config from './config';
import { mark, performanceEnd } from './utils/performance';

const { name, version } = config;

mark('main-start');

process.on('unhandledRejection', (error) => {
	console.log('An error occurred(unhandledRejection)', error);
	if (process.env.BUILD_ENV === 'production') {
		app.quit();
	}
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

function createWindow() {
	mark('main-window-create-start');

	// Create the browser window.
	mainWindow = new BrowserWindow({
		minWidth: 1366,
		minHeight: 768,
		frame: true,
		show: false,
		transparent: false,
		backgroundColor: '#1f1f1f',
		webPreferences: {
			webSecurity: true,
			nodeIntegration: true,
			preload: path.resolve(__dirname, 'statics/preload.js'),
		},
	});

	const originUa = mainWindow.webContents.getUserAgent();
	mainWindow.webContents.setUserAgent(`${originUa} ${name as string}/${version as string}`);

	mark('main-window-source-load-start');

	const { RENDER_DEV_HOST_NAME, RENDER_DEV_PORT } = process.env;
	// 此处不做容错判断，无意义。如果不改启动方式不会出错，如果改了启动方式则默认知道如何关联
	const pathname = `${RENDER_DEV_HOST_NAME as string}:${RENDER_DEV_PORT as string}`;

	mainWindow.loadURL(url.format({
		protocol: 'http',
		pathname,
		slashes: true,
	})).then(() => {
		console.log(`Main Window Load Success: http://${pathname}`);
	});

	mainWindow.on('ready-to-show', () => {
		if (mainWindow) {
			mainWindow.show();
			mainWindow.center();
		}
		mark('main-window-create-end');
	});

	mainWindow.webContents.on('did-finish-load', () => {
		mark('main-window-source-load-end');
		try {
			// const list = getMarks();
			// console.log('performance:', JSON.stringify(list, null, 2));
		} catch (err) {
			console.log(err);
		}

		performanceEnd();
	});

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	setTimeout(() => {
		// mainWindow.webContents.reloadIgnoringCache();
	}, 5000);

	if (process.env.BUILD_ENV === 'development') {
		// mainWindow.webContents.openDevTools();
	}
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

mark('main-end');
