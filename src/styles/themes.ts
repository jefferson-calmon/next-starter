import { app } from 'config/app';

export type ThemeName = 'dark' | 'light';

export interface Theme {
	name: ThemeName;

	colors: {
		primary: string;
		secondary: string;

		background: string;
		foreground: string;
		line: string;

		title: string;
		text: string;
	};
}

export const dark: Theme = {
	name: 'dark',

	colors: {
		primary: '#ffffff',
		secondary: '',

		background: '#060606', // rgb(6, 6, 6)
		foreground: '#101010', // rgb(16, 16, 16)
		line: 'rgb(255 255 255 / 15%)',

		title: '#EDEDED',
		text: '#A1A1A1',
	},
};

export const light: Theme = {
	name: 'light',

	colors: {
		primary: '#000000',
		secondary: '',

		background: '#ffffff',
		foreground: '#f1f1f1',
		line: '#00000026',

		title: '#000',
		text: 'rgba(0, 0, 0, .75)',
	},
};

export const THEME_COOKIE_KEY = [app.id, 'theme'].join(':');
export const DEFAULT_THEME_NAME: ThemeName = 'dark';

export const themes: Record<ThemeName, Theme> = {
	dark,
	light,
};
