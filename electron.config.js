/**
 * electron configuration
 * @description 目前仅暴露electron-builder的全量配置
 */
const path = require('path');
// const builder = require("electron-builder");
const ICON_ICO = path.resolve(__dirname, './main/public/assets/app-icon/icon/icon.ico');
const ICON_ICNS = path.resolve(__dirname, './main/public/assets/app-icon/icon/icon.icns');
const paths = require('./.scripts/config/paths');
const { author } = require('./package.json');

// 可以考虑放到package.json里
const productName = 'React Admin Template';
const buildVersion = '0.0.1.0001';
const appId = 'come.react.admin.template';

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
		// Inject properties to `package.json`
		extraMetadata: {
			'[key: string]': 'string',
		},
		copyright: `Copyright © ${new Date().getFullYear()} ${author.name}`,
		// 网速有问题使用镜像
		// electronDownload: {
		// 	mirror: 'https://npm.taobao.org/mirrors/electron/',
		// },

		// `package.json` and `**/node_modules/**/*` only production dependencies will be copied
		// https://www.electron.build/configuration/contents.html#files
		// 此模板不需要copy node_modules，如有需要参考文档自行配置
		files: ['build', 'package.json', '!**/node_modules/**/*'],
		directories: {
			buildResources: 'build/main/public/assets',
			output: path.join(paths.appElectronReleasePath, `${productName}-release-${buildVersion}`),
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
};

module.exports = {
	cliOptions,
};
