const config = {
	appName: process.env.APP_NAME as string,
	isSSR: process.env.SSR,
	environment: process.env.BUILD_ENV,
	isDevelopment: process.env.BUILD_ENV === 'development',
	isProduction: process.env.BUILD_ENV === 'production',
	mainCookieName: 'react-admin-template',
};

export default config;
