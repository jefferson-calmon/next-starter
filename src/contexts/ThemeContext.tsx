'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { cookies, useSystemTheme } from 'codekit';

import { parseThemeToStyle } from 'helpers/theme/parseThemeToStyle';
import { Theme, THEME_COOKIE_KEY, ThemeName, themes } from '../styles/themes';

interface ThemeContextProps {
	children: React.ReactNode;
	currentTheme: Theme;
}

export interface ThemeContextData extends Theme {
	toggle: () => void;
}

export const ThemeContext = createContext({} as ThemeContextData);

const AUTO_DETECT_USER_THEME: boolean = false;

export function ThemeProvider(props: ThemeContextProps) {
	// States
	const [theme, setTheme] = useState<ThemeName>(props.currentTheme.name);

	// Hook para escutar o tema do sistema
	const systemTheme = useSystemTheme();

	// Memo vars
	const currentTheme = useMemo(() => themes[theme], [theme]);

	// Effects
	useEffect(() => {
		if (!AUTO_DETECT_USER_THEME) return;

		setTheme(systemTheme);
	}, [systemTheme]);

	// Functions
	function toggleTheme() {
		const newTheme = theme === 'light' ? 'dark' : 'light';

		setTheme(newTheme);

		cookies.set(THEME_COOKIE_KEY, newTheme, {
			expires: 9999,
		});
	}

	return (
		<ThemeContext.Provider
			value={{
				...currentTheme,
				toggle: toggleTheme,
			}}
		>
			<div
				className="theme-provider"
				style={{ ...parseThemeToStyle(currentTheme) }}
			>
				{props.children}
			</div>
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);
