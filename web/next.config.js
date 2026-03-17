import "./src/env.js";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Development (Turbopack)
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },

  // Production (Webpack)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },

  // Runtime config (optional)
  ...(process.env.PUBLIC_URL && {
    serverRuntimeConfig: {
      hostname: new URL(process.env.PUBLIC_URL).hostname,
    },
    publicRuntimeConfig: {
      hostname: new URL(process.env.PUBLIC_URL).hostname,
    },
  }),

  output: "standalone",
};

export default withNextIntl(config);
