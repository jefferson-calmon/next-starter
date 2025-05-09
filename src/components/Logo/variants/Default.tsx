import { VariantLogoProps } from '.';

const width = 505;
const height = 60;

export const factor = height / width;

export const Component = ({
	width = 'auto',
	height = 'auto',
	fill: _fill,
	...props
}: VariantLogoProps) => (
	<svg
		width={width}
		height={height}
		viewBox={`0 0 ${width} ${height}`}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{
			width,
			height,
		}}
		{...props}
	/>
);
