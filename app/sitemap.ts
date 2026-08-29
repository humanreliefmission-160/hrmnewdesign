import { MetadataRoute } from "next";
import { readdir } from "fs/promises";
import path from "path";
import { sanityClient } from "@/app/[locale]/lib/sanity/client";

const BASE_URL = "https://humanreliefmission.com";

// ── Detect available locales from messages/*.json ─────────────────────────────
async function getLocales(): Promise<string[]> {
  try {
    const messagesDir = path.join(process.cwd(), "messages");
    const files = await readdir(messagesDir);
    return files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    return ["en"];
  }
}

// ── Sanity queries (lightweight — only slug + noIndex + updatedAt) ────────────
const PROJECTS_SITEMAP_QUERY = `
  *[_type == "project" && defined(slug.current) && seo.noIndex != true] {
    "slug": slug.current,
    "_updatedAt": _updatedAt
  }
`;

const STAGES_SITEMAP_QUERY = `
  *[_type == "ecosystemStage" && defined(slug.current) && seo.noIndex != true] {
    "slug": slug.current,
    "_updatedAt": _updatedAt
  }
`;

const POLICIES_SITEMAP_QUERY = `
  *[_type == "policy" && defined(slug.current)] {
    "slug": slug.current,
    "_updatedAt": _updatedAt
  }
`;

interface SanityEntry {
  slug: string;
  _updatedAt: string;
}

// ── Sitemap ───────────────────────────────────────────────────────────────────
export const revalidate = 3600; // Rebuild sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [locales, projects, stages, policies] = await Promise.all([
    getLocales(),
    sanityClient.fetch<SanityEntry[]>(PROJECTS_SITEMAP_QUERY).catch(() => []),
    sanityClient.fetch<SanityEntry[]>(STAGES_SITEMAP_QUERY).catch(() => []),
    sanityClient.fetch<SanityEntry[]>(POLICIES_SITEMAP_QUERY).catch(() => []),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  // ── Static pages ────────────────────────────────────────────────────────────
  const staticPages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { path: "/donate", changeFrequency: "weekly", priority: 0.9 },
    { path: "/ecosystem", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/annual-reports", changeFrequency: "yearly", priority: 0.6 },
    { path: "/policies", changeFrequency: "yearly", priority: 0.5 },
  ];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // ── Dynamic Sanity pages ─────────────────────────────────────────────────────
  for (const locale of locales) {
    // Projects
    for (const project of projects) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    // Ecosystem stages
    for (const stage of stages) {
      entries.push({
        url: `${BASE_URL}/${locale}/ecosystem/${stage.slug}`,
        lastModified: stage._updatedAt ? new Date(stage._updatedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    // Policies
    for (const policy of policies) {
      entries.push({
        url: `${BASE_URL}/${locale}/policies/${policy.slug}`,
        lastModified: policy._updatedAt ? new Date(policy._updatedAt) : new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
