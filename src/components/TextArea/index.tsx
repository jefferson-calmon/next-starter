'use client';

import { useMemo } from 'react';

import { useBoolean } from 'codekit';
import {
	TextArea as NBTextArea,
	TextAreaProps as NBTextAreaProps,
} from 'next-bricks';

export interface TextAreaProps extends Omit<NBTextAreaProps, 'ref'> {}

function TextArea({ ...props }: TextAreaProps) {
	// Boolean hooks
	const isFocused = useBoolean();

	// Memo vars
	const required = useMemo(() => props.required ?? true, [props.required]);

	const label = useMemo(() => {
		return props.label && !required
			? `${props.label} (Opcional)`
			: props.label;
	}, [props.label, required]);

	return (
		<div
			className="TextArea"
			data-addon-active={
				isFocused.value || !!props.value || !!props.defaultValue
			}
			style={{ width: props.width }}
			suppressHydrationWarning
		>
			<NBTextArea
				width="100%"
				{...props}
				label={label}
				required={required}
			/>
		</div>
	);
}

export default TextArea;
