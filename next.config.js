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
  
  // function:
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            // includes 'unsafe-eval' so WASM can compile
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://auth.privy.io;
              style-src 'self' 'unsafe-inline';
              frame-ancestors 'self';
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },

  // keep your rewrites
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
