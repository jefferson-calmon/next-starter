import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		typedEnv: true,
	},

	transpilePackages: ['lucide-react', 'geist'],
	typedRoutes: true,

	rewrites: async () => {
		return [{ source: '/ping', destination: '/api/ping' }];
	},
};

export default nextConfig;
