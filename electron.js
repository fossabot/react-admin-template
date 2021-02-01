/**
 * electron-builder configuration
 */
const path = require('path');
const builder = require("electron-builder")

const paths = require('./.scripts/config/paths');
const {
	name: productName,
	version,
	buildVersion,
	appId
} = require('./package.json');

const ICON_ICO = path.resolve(__dirname, './assets/app-icon/icon/icon.ico')
const ICON_ICNS = path.resolve(__dirname, './assets/app-icon/icon/icon.icns')

module.exports = {
	targets: builder.Platform.WINDOWS.createTarget(),
	// https://www.electron.build/configuration/configuration#configuration
	config: {
		productName,
		buildVersion,
		appId,
		files: ['build', 'assets', 'package.json'],
		asar: false,
		directories: {
			buildResources: 'assets',
			output: path.join(paths.appElectronReleasePath, `${productName}-release-${version}.${buildVersion}`),
		},
		win: {
			icon: ICON_ICO,
			target: ['msi'],
		},
		mac: {
			icon: ICON_ICNS,
		},
		dmg: {
			icon: ICON_ICNS,
			contents: [
				{ x: 130, y: 220 },
				{ x: 410, y: 220, type: 'link', path: '/Applications' },
			],
		},
		linux: {
			icon: ICON_ICNS,
			target: ['deb', 'rpm', 'AppImage'],
			category: 'Development',
		},
	},
}
