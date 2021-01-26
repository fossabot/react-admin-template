const fs = require('fs');
const path = require('path');

const rootDirectory = fs.realpathSync(process.cwd());
const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];
const resolvePath = (relativePath) => path.resolve(rootDirectory, relativePath);
const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find((extension) =>
		fs.existsSync(resolveFn(`${filePath}.${extension}`)),
	);

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};

module.exports = {
	// global
	appRootPath: resolvePath('.'),
	appRootPkgJson: resolvePath('package.json'),
	appJsConfig: resolvePath('jsconfig.json'),
	appTsConfig: resolvePath('tsconfig.json'),
	appEslintConfig: resolvePath('.eslintrc.js'),
	appNodeModules: resolvePath('node_modules'),

	// electron
	appMainSrc: resolvePath('main'),
	appMainDevEntry: resolveModule(resolvePath, 'main/index.dev'),
	appMainEntry: resolveModule(resolvePath, 'main/index'),
	appMainStatics: resolvePath('main/statics'),
	appMainDistPath: resolvePath('dist/main'),
	appMainDistStatics: resolvePath('dist/main/statics'),

	// web
	appPublicPath: resolvePath('public'),
	favicon: resolvePath('public/favicon.ico'),
	appHtml: resolvePath('public/index.html'),
	spriteSvgPath: resolvePath('src/assets/svg-sprite'),
	appRenderSrc: resolvePath('src'),
	appRenderEntry: resolveModule(resolvePath, 'src/index'),
	appDllPath: resolvePath('node_modules/.cache/dll-plugin'),
	appRenderDistPath: resolvePath('dist/render'),
	globalLessVariables: resolvePath('src/styles/variables/*.less'),
	globalLessMixins: resolvePath('src/styles/mixins/*.less'),
};
