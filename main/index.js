const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');

process.on('unhandledRejection', (error) => {
	console.log('An error occurred(unhandledRejection)', error);
	if (process.env.BUILD_ENV === 'production') {
		app.quit();
	}
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
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

	mainWindow.loadURL(
		url.format({
			protocol: 'http:',
			pathname: `${process.env.RENDER_DEV_HOST_NAME}:${process.env.RENDER_DEV_PORT}`,
			slashes: true,
		}, {
			userAgent: 'aaaa',
		}),
	).then(() => {
		console.log(`Load Success: http://${process.env.RENDER_DEV_HOST_NAME}:${process.env.RENDER_DEV_PORT}`);
	});

	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
		mainWindow.center();
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
