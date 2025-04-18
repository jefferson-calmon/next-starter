import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server = {
	APP_URL: z.string(),
};

const client = {
	NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID: z.string(),
};

export const env = createEnv({
	server,
	client,

	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID:
			process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID,
	},
});
