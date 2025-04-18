import { NextBricksContextProvider } from './NextBricksContext';

interface ContextProvidersProps {
	children: React.JSX.Element | React.ReactNode;
}

export function ContextProviders(props: ContextProvidersProps) {
	return (
		<NextBricksContextProvider>{props.children}</NextBricksContextProvider>
	);
}
