import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./prisma/**/*'],
      '/api/**/*': ['./prisma/**/*'],
    },
  },
};

export default nextConfig;
