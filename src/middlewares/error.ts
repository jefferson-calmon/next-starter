/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server';

import { config } from 'codekit';
import { ZodError } from 'zod';

config();

export const withError = (
	handler: (request: NextRequest, ...rest: any) => Promise<any>,
) => {
	return async (request: NextRequest, ...rest: any) => {
		try {
			return await handler(request, ...rest);
		} catch (error: any) {
			let message = error.message;

			if (error instanceof ZodError) {
				message = (error as ZodError).issues[0].message;
			}

			console.error('ApiRouteError.message:', message);
			console.error('ApiRouteError:', error);

			return new Response(
				JSON.stringify({
					status: 'error',
					error: message,
					details: error,
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}
	};
};
