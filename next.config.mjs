/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:'www.thecocktaildb.com',
                port: '',
                pathname: '/images/**',
            },
        ],
      },
      async headers() {
        return [
          {
            source: '/api/(.*)',
            headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
          },
        ];
      }

};

export default nextConfig;
