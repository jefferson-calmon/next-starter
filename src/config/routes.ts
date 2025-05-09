import { build, from, generate, get, Keys } from 'helpers/routes';

export const relations: Record<string, string> = {};

export const declarations = {
	'/': {},
	'#': {},
	'*': {},

	logout: {},
};

export const references: Partial<Record<Keys<typeof declarations>, string>> =
	{};

export const formattedRoutes = generate(declarations, relations);

export const routes = {
	all: formattedRoutes,
	get: get(formattedRoutes),
	from: from(formattedRoutes),
	build: build(formattedRoutes),
};

export type Route = keyof typeof formattedRoutes & string;
export type Routes = typeof formattedRoutes;
