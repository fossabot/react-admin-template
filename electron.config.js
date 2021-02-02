/**
 * electron configuration
 * @description 目前仅暴露electron-builder的全量配置
 */
const path = require('path');
// const builder = require("electron-builder")

const paths = require('./.scripts/config/paths');
const {
	name: productName,
	version,
	buildVersion,
	appId
} = require('./package.json');

const ICON_ICO = path.resolve(__dirname, './main/public/assets/app-icon/icon/icon.ico')
const ICON_ICNS = path.resolve(__dirname, './main/public/assets/app-icon/icon/icon.icns')
const outputPath = path.join(paths.appElectronReleasePath, `${productName}-release-${version}.${buildVersion}`);

/**
 * For electron-builder
 * https://www.electron.build/configuration/configuration#configuration
 */
const cliOptions = {
	// targets: builder.Platform.WINDOWS.createTarget(),
	config: {
		productName,
		buildVersion,
		appId,
		asar: false,
		files: ['build', 'package.json'],
		directories: {
			buildResources: 'build/main/public/assets',
			output: outputPath,
		},
		nsis: {
			oneClick: false,
			deleteAppDataOnUninstall: true,
			allowToChangeInstallationDirectory: true,
		},
		win: {
			icon: ICON_ICO,
			target: ['msi'],
		},
		mac: {
			icon: ICON_ICNS,
			target: ['dmg', 'pkg', 'zip']
		},
		dmg: {
			icon: ICON_ICNS,
			contents: [
				{ x: 130, y: 220, type: 'file' },
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

module.exports = {
	cliOptions,
};
