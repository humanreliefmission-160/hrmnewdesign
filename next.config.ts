import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  // Only externalize pure JS data-fetching packages.
  // Studio UI packages (sanity, @sanity/vision, next-sanity) bundle CSS
  // files that Node.js cannot load natively — keep those webpack-bundled.
  serverExternalPackages: [
    '@sanity/client',
    '@sanity/image-url',
  ],
  webpack: (config, { dev, isServer }) => {
    // In development, limit webpack memory usage
    if (dev) {
      config.cache = {
        type: 'filesystem',
        allowCollectingMemory: true,
        memoryCacheUnaffected: true,
      }
    }
    return config
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default withNextIntl(nextConfig);

