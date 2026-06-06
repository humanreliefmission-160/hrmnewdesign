import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

// Load env variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

console.log('Project ID:', projectId);
console.log('Dataset:', dataset);

if (!projectId || !dataset) {
  console.error('Error: Environment variables not loaded correctly.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-05-11',
  useCdn: true,
});

const queries = {
  HEADER_NAV_QUERY: `*[_type == "navigation" && placement == "header"][0]`,
  PROJECT_CATEGORIES_QUERY: `*[_type == "projectCategory"]`,
  ALL_PROJECTS_QUERY: `*[_type == "project"]`,
  HOMEPAGE_HERO_QUERY: `*[_type == "heroSlide"] | order(order asc)[0]`
};

async function runTest() {
  console.log('Starting Sanity fetch tests...');
  for (const [name, query] of Object.entries(queries)) {
    const start = Date.now();
    try {
      console.log(`Fetching ${name}...`);
      const result = await client.fetch(query);
      const duration = Date.now() - start;
      console.log(`Successfully fetched ${name} in ${duration}ms. Result count/presence:`, Array.isArray(result) ? result.length : (result ? 'Yes' : 'No'));
    } catch (err) {
      const duration = Date.now() - start;
      console.error(`Failed to fetch ${name} after ${duration}ms:`, err);
    }
  }
}

runTest();
