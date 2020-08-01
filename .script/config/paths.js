const fs = require('fs');
const path = require('path');

const rootDirectory = fs.realpathSync(process.cwd());
const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];
const resolvePath = relativePath => path.resolve(rootDirectory, relativePath);
const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find(extension =>
		fs.existsSync(resolveFn(`${filePath}.${extension}`)),
	);

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};

module.exports = {
	favicon: resolvePath('public/favicon.ico'),
	appRootPath: resolvePath('.'),
	appDllPath: resolvePath('dll'),
	appDistPath: resolvePath('dist'),
	appPublicPath: resolvePath('public'),
	appTplHtml: resolvePath('public/index.html'),
	appSrc: resolvePath('src'),
	appEntry: resolveModule(resolvePath, 'src/index'),
	appPackageJson: resolvePath('package.json'),
	appTsConfig: resolvePath('tsconfig.json'),
	appNodeModules: resolvePath('node_modules'),
	appGlobalVariables: resolvePath('src/styles/variables/*.less'),
	appGlobalMixins: resolvePath('src/styles/mixins/*.less'),
};
