/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"], // Add GitHub's avatar domain to allowed sources
  },
};

export default nextConfig;
