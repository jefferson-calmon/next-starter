'use client';

import { useEffect } from 'react';

import { clearSiteData, debounce, useBoolean } from 'codekit';
import { Loading } from 'next-bricks';

import Button from 'components/Button';
import { cn } from 'utils/cn';

import styles from './styles.module.css';

const timeoutInSeconds = 15;

function LoadingFullScreen() {
	// Boolean hooks
	const timeout = useBoolean(false);

	// Effects
	useEffect(() => {
		debounce(timeout.setTrue, timeoutInSeconds * 1000);
	}, [timeout.setTrue]);

	return (
		<div className={cn('loading-full-screen', styles.loadingFullScreen)}>
			<div className={cn('loader', styles.loader)}>
				<Loading
					type="spinner"
					spinner={{
						size: 36,
					}}
				/>
			</div>

			{timeout.value && (
				<div className={cn('text', styles.text)}>
					<p>
						Este carregamento está demorando mais que o esperado,
						tente recarregar a janela ou clique no botão abaixo.{' '}
						<br />
						<br />
						Se o problema persistir, entre em contato conosco.
					</p>

					<Button
						size="small"
						onClick={() => clearSiteData({ reload: true })}
					>
						Tentar novamente
					</Button>
				</div>
			)}
		</div>
	);
}

export default LoadingFullScreen;
