import { MetadataRoute } from "next";

const BASE_URL = "https://humanreliefmission.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Admin donations panel (obfuscated route)
          "/*/Agf8vPMDf7/",
          // Operations dashboard & database
          "/*/dashboard/",
          "/*/database/",
          // All API routes
          "/api/",
          // Sanity Studio
          "/studio/",
          // Test routes
          "/*/test/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
