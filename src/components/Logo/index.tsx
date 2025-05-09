'use client';

import { useMemo } from 'react';

import { readableColor } from 'polished';

import { useTheme } from 'contexts/ThemeContext';
import { VariantLogoProps } from './variants';
import * as Default from './variants/Default';

import styles from './styles.module.css';

type Variant = 'default';
type VariantLogo = (props: VariantLogoProps) => React.JSX.Element;

interface LogoProps {
	variant: Variant;
	width: number;
	fill?: string & 'auto';
}

const variants: Record<Variant, VariantLogo> = {
	default: Default.Component,
};

const factors: Record<Variant, number> = {
	default: Default.factor,
};

function Logo({ width, variant, fill = 'auto' }: LogoProps) {
	// Hooks
	const theme = useTheme();

	// Memo vars
	const sizes = useMemo(() => {
		const factor = factors[variant];

		const height = factor * width;

		return { width, height };
	}, [variant, width]);

	const color = useMemo(() => {
		if (fill === 'auto') return readableColor(theme.colors.background);

		return fill;
	}, [fill, theme.colors.background]);

	const VariantLogo = useMemo(() => variants[variant], [variant]);

	return (
		<div
			className={styles.logo}
			style={{
				width: `${sizes.width / 16}rem`,
				height: `${sizes.height / 16}rem`,
			}}
		>
			<VariantLogo
				width={sizes.width}
				height={sizes.height}
				fill={color}
			/>
		</div>
	);
}

export default Logo;
