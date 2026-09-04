import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/*': ['./prisma/**/*'],
    '/api/**/*': ['./prisma/**/*'],
  },
};

export default nextConfig;
