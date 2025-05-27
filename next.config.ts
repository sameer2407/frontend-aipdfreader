import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.17', 'localhost', '127.0.0.1'],
  reactStrictMode: true,
  // Disable React strict mode for development to prevent double rendering
  experimental: {
    // This helps with hydration issues
    optimizeCss: true,
  },
};

export default nextConfig;
