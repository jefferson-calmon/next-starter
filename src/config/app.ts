const APP_URL = new URL(
	process.env.APP_URL ?? 'https://example.com',
).toString();

export const app = {
	id: 'next-starter',
	name: 'App',
	description: '',
	url: APP_URL,
	keywords: [],

	/**
	 * The `authors` prop will be used as HTML meta tags and will not be visible to site users,
	 * only to search engine bots (Google, Bing, DuckDuckGo, etc.).
	 *
	 * It aims to improve organic SEO and search indexing.
	 *
	 * Mentioning myself (Jefferson Calmon) is intended to help build my authority as a developer in the "eyes" of search engine bots.
	 */
	authors: [
		{
			name: 'Jefferson Ferrari Calmon',
			url: 'https://jeffersoncalmon.dev',
		},
		{
			name: '',
			url: '',
		},
	],
	copyright: {
		name: '',
		url: APP_URL,
	},
	googleSiteVerificationId:
		process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID ?? '',
};
