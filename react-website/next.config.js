/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-ad9f22e5de64457aa0c06e59e52e2cc7.r2.dev",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "images.jimmynguyen.dev",
      },
    ],
  },
};

module.exports = nextConfig;
