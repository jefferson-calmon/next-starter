import { NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export type CustomMiddleware = (
	request: NextRequest,
	event: NextFetchEvent,
	response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function chain(
	functions: MiddlewareFactory[],
	index = 0,
): CustomMiddleware {
	const current = functions[index];

	if (current) {
		// Chama o próximo middleware na cadeia
		const next = chain(functions, index + 1);

		// O current é uma função que recebe um middleware e retorna outro middleware
		return async (
			request: NextRequest,
			event: NextFetchEvent,
			response: NextResponse,
		) => {
			// Passa o próximo middleware para o current, que irá modificar ou ajustar o comportamento
			const nextResponse = await current(next)(request, event, response);

			// Se algum middleware retornar uma resposta (como NextResponse.redirect), retorna imediatamente
			if (nextResponse instanceof NextResponse) {
				return nextResponse;
			}

			// Caso contrário, continua a resposta normal
			return response;
		};
	}

	// Caso não haja mais middlewares, retorna a resposta original
	return (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse,
	) => {
		return response;
	};
}
