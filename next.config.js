/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    appDir: true,
  },
  output: 'standalone',
};

module.exports = nextConfig;