import { ComponentProps, CSSProperties } from 'react';

export interface VariantLogoProps extends ComponentProps<'svg'> {
	fill: string;
	width: CSSProperties['width'];
	height: CSSProperties['height'];
}
