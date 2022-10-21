/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_HOST: "https://shamamsa-app-test.herokuapp.com",
  },
};

module.exports = nextConfig;
