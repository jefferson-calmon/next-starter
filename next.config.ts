import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	transpilePackages: ['lucide-react', 'geist'],
	rewrites: async () => {
		return [{ source: '/ping', destination: '/api/ping' }];
	},
};

export default nextConfig;
