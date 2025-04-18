'use server';

import { cookies } from 'next/headers';

import {
	DEFAULT_THEME_NAME,
	THEME_COOKIE_KEY,
	ThemeName,
	themes,
} from 'styles/themes';

export async function getServerTheme() {
	const store = await cookies();

	const cookieTheme = store.get(THEME_COOKIE_KEY)?.value as ThemeName;
	const theme = cookieTheme ?? DEFAULT_THEME_NAME;

	return themes?.[theme] ?? themes[DEFAULT_THEME_NAME];
}
