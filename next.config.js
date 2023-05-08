/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx"],
  images: {
    domains: ["via.placeholder.com"],
    env: {
      NEXT_PUBLIC_DEV_MODE: process.env.NEXT_PUBLIC_DEV_MODE,
    },
  },
};

module.exports = nextConfig;
