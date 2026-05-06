import baseX from 'base-x';

const b58 = baseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

type Id<TPrefix extends string> = `${TPrefix}_${string}` & {
	readonly __brand: TPrefix;
};

const PREFIXES = {
	// Always use 2, 3 or 4 chars per prefix
	test: 'tst',
} as const;

type Prefix = keyof typeof PREFIXES;

const EPOCH = 1_700_000_000_000; // Nov 2023

export function id<T extends Prefix>(prefix: T): Id<(typeof PREFIXES)[T]> {
	const buf = new Uint8Array(16);

	const t = Date.now() - EPOCH;
	const hi = Math.floor(t / 0x100000000);
	const lo = t >>> 0;

	buf[0] = (hi >>> 8) & 0xff;
	buf[1] = hi & 0xff;
	buf[2] = (lo >>> 24) & 0xff;
	buf[3] = (lo >>> 16) & 0xff;
	buf[4] = (lo >>> 8) & 0xff;
	buf[5] = lo & 0xff;

	crypto.getRandomValues(buf.subarray(6));

	return `${PREFIXES[prefix]}_${b58.encode(buf)}` as Id<(typeof PREFIXES)[T]>;
}

export function extractTimestamp(value: string): Date | null {
	const underscore = value.indexOf('_');
	if (underscore === -1) return null;

	try {
		const buf = b58.decode(value.slice(underscore + 1));
		if (buf.length < 6) return null;

		const hi = buf[0] * 0x100 + buf[1];
		const lo =
			(buf[2] * 0x1000000 +
				buf[3] * 0x10000 +
				buf[4] * 0x100 +
				buf[5]) >>>
			0;

		const ts = hi * 0x100000000 + lo;

		return new Date(ts + EPOCH);
	} catch {
		return null;
	}
}

export function isId<T extends Prefix>(
	value: string,
	prefix: T,
): value is Id<(typeof PREFIXES)[T]> {
	return value.startsWith(`${PREFIXES[prefix]}_`);
}
