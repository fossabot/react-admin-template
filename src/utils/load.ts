import React from 'react';
// import loadable from '@loadable/component'
/**
 * @todo Suspense 和 React.lazy不支持服务端渲染
 * @param callback
 */
export default function load(callback: {(): Promise<any>}): React.LazyExoticComponent<React.ComponentType<any>> {
	return React.lazy(callback);
}
