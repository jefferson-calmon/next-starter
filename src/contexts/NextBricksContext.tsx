'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react';

import { NextBricksProvider } from 'next-bricks';

import { app } from 'config/app';
import { useTheme } from './ThemeContext';

interface NextBricksContextProps {
	children: React.ReactNode;
}

export interface NextBricksContextData {}

export const NextBricksContext = createContext({} as NextBricksContextData);

export function NextBricksContextProvider(props: NextBricksContextProps) {
	// Hooks
	const theme = useTheme();

	return (
		<NextBricksContext.Provider value={{}}>
			<NextBricksProvider
				appName={app.name}
				theme={{
					colors: {
						primary: theme.colors.primary,
						background: theme.colors.background,
						line: theme.colors.line,
					},
				}}
			>
				{props.children}
			</NextBricksProvider>
		</NextBricksContext.Provider>
	);
}

export const useNextBricks = () => useContext(NextBricksContext);

export const withNextBricksContext = (
	Page: (...props: any) => React.JSX.Element,
) =>
	function PageWithNextBricksContextProvider(...props: any) {
		return (
			<NextBricksContextProvider>
				<Page {...props} />
			</NextBricksContextProvider>
		);
	};
