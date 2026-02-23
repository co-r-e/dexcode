import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["jiti"],
  devIndicators: false,
};

export default nextConfig;
