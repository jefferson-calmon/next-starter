'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { cookies, useSystemTheme } from 'codekit';

import { Theme, ThemeName, themes } from '../styles/themes';

interface ThemeContextProps {
	children: React.ReactNode;
}

export interface ThemeContextData extends Theme {
	toggle: () => void;
}

export const ThemeContext = createContext({} as ThemeContextData);

const DEFAULT_THEME_NAME: ThemeName = 'light';
const AUTO_DETECT_USER_THEME: boolean = false;

export function ThemeProvider(props: ThemeContextProps) {
	// States
	const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME_NAME);

	// Hook para escutar o tema do sistema
	const systemTheme = useSystemTheme();

	// Memo vars
	const currentTheme = useMemo(() => themes[theme], [theme]);

	// Effects
	useEffect(() => {
		let theme = cookies.get('theme') as ThemeName | undefined;

		if (!theme && AUTO_DETECT_USER_THEME) {
			// Usa o tema do sistema caso não haja tema armazenado
			theme = systemTheme;
		}

		setTheme(theme ?? DEFAULT_THEME_NAME);
	}, [systemTheme]); // Dependência adicionada para atualizar quando o tema do sistema mudar

	// Functions
	function toggleTheme() {
		const newTheme = theme === 'light' ? 'dark' : 'light';

		setTheme(newTheme);

		// Store the new theme in local storage and cookies
		localStorage.setItem('theme', newTheme);
		cookies.set('theme', newTheme, {
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
				style={
					{
						'--color-primary': currentTheme.colors.primary,
						'--color-secondary': currentTheme.colors.secondary,

						'--color-title': currentTheme.colors.title,
						'--color-text': currentTheme.colors.text,

						'--color-foreground': currentTheme.colors.foreground,
						'--color-background': currentTheme.colors.background,

						'--color-line': currentTheme.colors.line,
					} as React.CSSProperties
				}
			>
				{props.children}
			</div>
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);

export const withThemeContext = (Page: (...props: any) => React.JSX.Element) =>
	function PageWithThemeProvider(...props: any) {
		return (
			<ThemeProvider>
				<div>
					<Page {...props} />
				</div>
			</ThemeProvider>
		);
	};
