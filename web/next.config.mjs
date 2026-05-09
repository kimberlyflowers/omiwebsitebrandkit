/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/members",
        destination: "https://members.outpouringmissions.live/access",
        permanent: false,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["@react-three/drei", "framer-motion"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
