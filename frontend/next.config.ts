import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/avatars/**",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;
