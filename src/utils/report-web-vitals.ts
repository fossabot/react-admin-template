const reportWebVitals = (onPerfEntry?: () => void): void => {
	if (onPerfEntry) {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
			getCLS(onPerfEntry); // Cumulative Layout Shift (CLS)
			getFID(onPerfEntry); // First Input Delay (FID)
			getLCP(onPerfEntry); // Largest Contentful Paint (LCP)
			getFCP(onPerfEntry); // First Contentful Paint (FCP)
			getTTFB(onPerfEntry); // Time to First Byte (TTFB)
		});
	}
};

export default reportWebVitals;
