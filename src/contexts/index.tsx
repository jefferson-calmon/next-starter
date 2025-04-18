import { Theme } from 'styles/themes';
import { NextBricksContextProvider } from './NextBricksContext';
import { ThemeProvider } from './ThemeContext';

interface ContextProvidersProps {
	theme: Theme;
	children: React.ReactNode;
}

export function ContextProviders(props: ContextProvidersProps) {
	return (
		<ThemeProvider currentTheme={props.theme}>
			<NextBricksContextProvider>
				{props.children}
			</NextBricksContextProvider>
		</ThemeProvider>
	);
}
