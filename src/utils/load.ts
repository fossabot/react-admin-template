import { ComponentType } from 'react';
import loadable, { LoadableComponent } from '@loadable/component';

export default function load<T extends ComponentType<any>>(
	callback: { (): Promise<{ default: T }>; },
): LoadableComponent<ComponentType> {
	return loadable(callback);
}

// import React, { ComponentType, LazyExoticComponent } from 'react';
//
// /**
//  * @warn Suspense 和 React.lazy不支持服务端渲染
//  * 如果不需要SSR并且不想用三方库，请至layout/index.tsx同步修改
//  * @param callback
//  */
// export default function load<T extends ComponentType<any>>(
// 	callback: { (): Promise<{ default: T }>; },
// ): LazyExoticComponent<T> {
// 	return React.lazy(callback);
// }

