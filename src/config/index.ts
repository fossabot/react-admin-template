const config = {
	isSSR: process.env.SSR,
	environment: process.env.BUILD_ENV,
	isDevelopment: process.env.BUILD_ENV === 'development',
	isProduction: process.env.BUILD_ENV === 'production',
};

export default config;
