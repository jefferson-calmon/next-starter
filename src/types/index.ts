/* eslint-disable @typescript-eslint/no-explicit-any */
export type Children = React.ReactNode | React.JSX.Element;

export interface LayoutProps {
	children: Children;
}

export interface PageProps {
	params: Record<string, string | string[]>;
	searchParams: Record<string, string | string[]>;
}

export type IsArray<T> = T extends any[] ? true : false;

export type RemoveArrayProps<T> = {
	[K in keyof T as IsArray<T[K]> extends true ? never : K]: T[K];
};

type Value = string | number | boolean;
export type Obj = Record<
	string,
	| Value
	| Record<string, Value | Record<string, Value | Record<string, Value>>>
>;
