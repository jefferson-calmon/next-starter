/* eslint-disable @typescript-eslint/no-explicit-any */
export type Children = React.ReactNode | React.JSX.Element;

export type IsArray<T> = T extends any[] ? true : false;

export type OmitArrayProps<T> = {
	[K in keyof T as IsArray<T[K]> extends true ? never : K]: T[K];
};

export type Value = string | number | boolean;

export type Obj = Record<
	string,
	| Value
	| Record<string, Value | Record<string, Value | Record<string, Value>>>
>;
