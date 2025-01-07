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
  output: "standalone",
  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://auth.privy.io;
              style-src 'self' 'unsafe-inline';
              connect-src 'self' https://auth.privy.io https://*.privy.io https://*.walletconnect.org https://*.walletconnect.com wss://*.walletconnect.org wss://*.walletconnect.com https://*.ethereum.org;
              frame-src 'self' https://auth.privy.io https://*.privy.io;
              img-src 'self' data: https: blob:;
              media-src 'self';
              font-src 'self';
              frame-ancestors 'self';
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;