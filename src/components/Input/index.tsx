'use client';

import './styles.css';

import { useMemo, useRef } from 'react';

import { useBoolean } from 'codekit';
import { Input as NBInput, InputProps as NBInputProps } from 'next-bricks';

import { cn } from 'utils/cn';
import { Icon, IconName } from '../Icon';
import EyeAddon from './Addons/Eye';

export interface InputProps extends Omit<NBInputProps, 'ref'> {
	ref?: NBInputProps['ref'];
	icon?: IconName;
}

function Input({ icon, ...props }: InputProps) {
	// Refs
	const ref = useRef<HTMLInputElement>(null);

	// Boolean hooks
	const isText = useBoolean();
	const isFocused = useBoolean();

	// Memo vars
	const required = useMemo(() => props.required ?? true, [props.required]);

	const label = useMemo(() => {
		return props.label && !required
			? `${props.label} (Opcional)`
			: props.label;
	}, [props.label, required]);

	const customProps = useMemo(() => {
		if (isText.value) return { type: 'text' };

		return {};
	}, [isText.value]);

	// Functions
	function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
		props.onFocus?.(e);
		isFocused.setTrue();
	}

	function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		props.onBlur?.(e);
		isFocused.setFalse();
	}

	return (
		<div
			className="input"
			data-addon-active={
				isFocused.value || !!props.value || !!props.defaultValue
			}
			style={{ width: props.width }}
			suppressHydrationWarning
		>
			<NBInput
				width="100%"
				addon={icon ? () => <Icon name={icon} /> : undefined}
				{...props}
				{...customProps}
				label={label}
				ref={ref}
				required={required}
				className={cn('input', props.className)}
				onFocus={handleFocus}
				onBlur={handleBlur}
			>
				{(props.type === 'password' || props.role === 'password') && (
					<EyeAddon
						onShow={isText.setTrue}
						onHide={isText.setFalse}
					/>
				)}
				{props.children}
			</NBInput>
		</div>
	);
}

export default Input;
