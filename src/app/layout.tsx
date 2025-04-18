import 'styles/global.css';

import type { Metadata, Viewport } from 'next';

import { CodeKitConfig } from 'codekit';
import 'next-bricks/dist/index.css';

import NavigationProgressBar from 'components/NavigationProgressBar';
import { app } from 'config/app';
import { ContextProviders } from 'contexts';
import { getServerTheme } from 'helpers/theme/getServerTheme';
import { parseThemeToStyle } from 'helpers/theme/parseThemeToStyle';
import { font } from 'styles/font';

type RootLayoutProps = Readonly<{
	children: React.ReactNode;
}>;

export const viewport: Viewport = {
	themeColor: '#fff',
	colorScheme: 'normal',
};

export const metadata: Metadata = {
	metadataBase: new URL(app.url),
	applicationName: app.name,
	title: {
		default: app.name,
		template: `%s - ${app.name}`,
	},
	description: app.description,
	keywords: app.keywords,
	robots: {
		index: true,
		follow: true,
	},
	verification: {
		google: app.googleSiteVerificationId,
	},
	authors: app.authors.map((author) => ({
		name: author.name,
		url: author.url,
	})),
	openGraph: {
		type: 'website',
		url: app.url,
		siteName: app.name,
		title: app.name,
		description: app.description,
		images: ['/og.png'],
	},
	twitter: {
		card: 'summary_large_image',
		site: app.url,
		title: app.name,
		description: app.description,
		images: ['/og.png'],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.png',
		apple: '/apple-touch-icon.png',
	},
	manifest: '/site.webmanifest',
};

export default async function RootLayout({ children }: RootLayoutProps) {
	const theme = await getServerTheme();

	return (
		<html
			lang="pt-BR"
			className={font.className}
			style={{ ...parseThemeToStyle(theme) }}
			suppressHydrationWarning
		>
			<body suppressHydrationWarning>
				<NavigationProgressBar />
				<CodeKitConfig />

				<ContextProviders theme={theme}>
					<div id="app">{children}</div>
				</ContextProviders>
			</body>
		</html>
	);
}
