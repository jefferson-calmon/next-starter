import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server = {};

const client = {
	NEXT_PUBLIC_BASE_URL: z.string(),
	NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID: z.string(),
};

export const env = createEnv({
	server,
	client,

	runtimeEnv: {
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID:
			process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID,
	},
});
