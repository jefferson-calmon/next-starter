'use client';

import { useBoolean } from 'codekit';

import Icon from 'components/Icon';

import styles from './styles.module.css';

interface ComponentProps {
	onShow?: () => void;
	onHide?: () => void;
}

function EyeAddon(props: ComponentProps) {
	// Boolean hooks
	const isEyeOff = useBoolean(false);

	// Functions
	function handleChange() {
		const newValue = !isEyeOff.value;

		isEyeOff.setValue(newValue);

		if (newValue) props.onShow?.();
		if (!newValue) props.onHide?.();
	}

	return (
		<div className={styles.eye} onClick={handleChange}>
			<Icon name={isEyeOff.value ? 'EyeOff' : 'Eye'} color="#6B7280" />
		</div>
	);
}

export default EyeAddon;
