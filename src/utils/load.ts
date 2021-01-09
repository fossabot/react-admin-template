import React, { ComponentType, LazyExoticComponent } from 'react';
/**
 * @todo Suspense 和 React.lazy不支持服务端渲染
 * @param callback
 */
export default function load<T extends ComponentType<any>>(
	callback: { (): Promise<{ default: T }>; },
): LazyExoticComponent<T> {
	return React.lazy(callback);
}
