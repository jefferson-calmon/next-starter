import { Children } from 'types';

type QueryObject = Record<string, string | string[]>;

export interface LayoutProps {
	children: Children;
}

export interface PageProps<
	Params extends QueryObject = QueryObject,
	SearchParams extends QueryObject = QueryObject,
> {
	params?: Promise<Params>;
	searchParams: Promise<SearchParams>;
}

export interface RouteContext<Params extends QueryObject = QueryObject> {
	params: Promise<Params>;
}
