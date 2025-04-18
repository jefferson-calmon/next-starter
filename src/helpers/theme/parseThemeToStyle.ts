import { hexToRgb } from 'codekit';

import { Theme } from 'styles/themes';

export function parseThemeToStyle(theme: Theme) {
	const style = Object.entries(theme.colors).reduce(
		(acc, [key, value]) => {
			acc[`--color-${key}`] = value;

			const rgb = toRGB(value);
			if (rgb) acc[`--color-${key}-rgb`] = rgb;

			return acc;
		},
		{} as Record<string, string>,
	);

	return style as React.CSSProperties;
}

// Utilities
export function normalizeHex(hex: string): string {
	let cleanHex = hex.replace(/^#/, '');

	if (cleanHex.length === 3) {
		cleanHex = cleanHex
			.split('')
			.map((c) => c + c)
			.join('');
	} else if (cleanHex.length === 8) {
		cleanHex = cleanHex.slice(0, 6);
	}

	if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
		throw new Error(`Formato de cor hex inválido: ${hex}`);
	}

	return `#${cleanHex.toLowerCase()}`;
}

function toRGB(color: string) {
	const isHex = color.startsWith('#');

	if (isHex) return hexToRgb(normalizeHex(color)).join(', ');

	return '';
}
