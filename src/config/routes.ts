/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Routes from '../../.next/dev/types/routes';

export type Route = Routes.AppRoutes;
export type RouteApi = Routes.AppRouteHandlerRoutes;
export type RouteParamsMap = Routes.ParamMap;
export type RouteParams<TRoute extends Route> =
	TRoute extends keyof RouteParamsMap ? RouteParamsMap[TRoute] : never;

function isRouteDynamic(route: string): route is keyof RouteParamsMap {
	return /\[.+\]/.test(route);
}

function hasRouteParams<R extends Route>(
	route: R,
	params: any,
): params is RouteParams<R> {
	return isRouteDynamic(route) && params !== undefined;
}

function get<R extends Route>(
	route: R,
	...args: RouteParams<R> extends never ? [] : [RouteParams<R>]
) {
	if (hasRouteParams(route, args[0])) {
		const [params] = args;

		let href = route as string;

		for (const key in params) {
			href = href.replace(`[${key}]`, (params as any)?.[key]);
		}

		return href;
	}

	return route;
}

export const routes = {
	get,
};
