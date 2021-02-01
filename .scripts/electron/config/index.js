/**
 * electron-builder configuration
 * https://www.electron.build/configuration/configuration
 */
const path = require('path');
const paths = require('../../config/paths');

const ICON_ICO = path.resolve(__dirname, '../../../assets/app-icon/icon/icon.ico')
const ICON_ICNS = path.resolve(__dirname, '../../../assets/app-icon/icon/icon.icns')

const {
	npm_package_name: productName,
	npm_package_buildVersion: buildVersion,
	npm_package_appId: appId,
	npm_package_version: version,
} = process.env

const config = {
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
		target: ['nsis', 'msi'],
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
}

module.exports = {
	config,
}
