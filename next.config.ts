import { NextConfig } from "next";
import { Configuration } from "webpack";

const withImages = require("next-images");

const nextConfig: NextConfig = withImages({
  webpack(config: Configuration) {
    return config;
  },
});

export default nextConfig;
