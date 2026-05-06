import { MetadataRoute } from 'next';

import { app } from 'config/app';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/', '/admin/', '/_next/', '/private/'],
			},
			{
				userAgent: [
					'GPTBot',
					'ChatGPT-User',
					'CCBot',
					'anthropic-ai',
					'Claude-Web',
					'Google-Extended',
					'PerplexityBot',
				],
				disallow: '/',
			},
		],
		host: app.url,
		sitemap: `${app.url}/sitemap.xml`,
	};
}
