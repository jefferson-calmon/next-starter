import Loader from 'nextjs-toploader';

export function NavigationProgress() {
	return (
		<Loader
			color="#000"
			initialPosition={0.3}
			crawl={true}
			crawlSpeed={200}
			height={2.5}
			showSpinner={true}
		/>
	);
}
