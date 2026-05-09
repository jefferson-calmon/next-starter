import { ObjectType, Trim } from 'shared/types';

const ERRORS = {
	// auth: {
	// 	UNAUTHORIZED: 'Você não tem autorização para acessar este recurso.',
	// },
	// user: {
	// 	NOT_FOUND: 'Não foi possível encontrar o usuário com id "{{ id }}".',
	// },
} as const;

const REGEX_CACHE = new Map<string, RegExp>();

type ErrorGroup = keyof typeof ERRORS;

type ErrorCode<TGroup extends ErrorGroup> = keyof (typeof ERRORS)[TGroup] &
	string;

type ErrorMessage<
	TGroup extends ErrorGroup,
	TCode extends ErrorCode<TGroup>,
> = (typeof ERRORS)[TGroup][TCode] & string;

type ErrorVars<
	TGroup extends ErrorGroup,
	TCode extends ErrorCode<TGroup>,
	TMessage extends string = ErrorMessage<TGroup, TCode>,
> = TMessage extends `${infer _Start}{{${infer Var}}}${infer _End}`
	? Trim<Var> | ErrorVars<TGroup, TCode, `${_Start}${_End}`>
	: never;

type ErrorParamsArg<
	TGroup extends ErrorGroup,
	TCode extends ErrorCode<TGroup>,
	TMessage extends ErrorMessage<TGroup, TCode> = ErrorMessage<TGroup, TCode>,
	TVars extends ErrorVars<TGroup, TCode, TMessage> = ErrorVars<
		TGroup,
		TCode,
		TMessage
	>,
> = [TVars] extends [never]
	? []
	: [
			params: [TVars] extends [never]
				? never
				: Record<TVars, string | number | boolean>,
		];

function render<
	TErrorGroup extends ErrorGroup,
	TErrorCode extends ErrorCode<TErrorGroup>,
	TErrorMessage extends ErrorMessage<TErrorGroup, TErrorCode>,
>(
	group: TErrorGroup,
	code: TErrorCode,
	...args: ErrorParamsArg<TErrorGroup, TErrorCode>
) {
	const message = ERRORS[group][code] as TErrorMessage;

	const [params] = args;
	if (!params) return message;

	let result: string = message;

	for (const key of Object.keys(params)) {
		result = result.replace(
			getOrCreateRegex(key),
			String((params as ObjectType)[key]),
		);
	}

	return result;
}

function create<TErrorGroup extends ErrorGroup>(group: TErrorGroup) {
	return function <
		TErrorCode extends ErrorCode<TErrorGroup>,
		TErrorMessage extends ErrorMessage<TErrorGroup, TErrorCode> =
			ErrorMessage<TErrorGroup, TErrorCode>,
	>(
		key: TErrorCode,
		...args: ErrorParamsArg<TErrorGroup, TErrorCode>
	): string {
		return render<TErrorGroup, TErrorCode, TErrorMessage>(
			group,
			key,
			...args,
		);
	};
}

// Utils
function getOrCreateRegex(key: string): RegExp {
	let re = REGEX_CACHE.get(key);
	if (!re) {
		re = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
		REGEX_CACHE.set(key, re);
	}
	return re;
}

// API
export const errors = {
	create,
	render,
};
