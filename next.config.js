/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['next-themes$'] = require.resolve('next-themes');
    }
    return config;
  },
};

module.exports = nextConfig;
