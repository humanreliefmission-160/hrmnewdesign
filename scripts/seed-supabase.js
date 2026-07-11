const fs = require('fs');
const path = require('path');

// 1. Load environment variables from .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  console.log('Loading env vars from .env.local...');
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const index = trimmed.indexOf('=');
      if (index !== -1) {
        const key = trimmed.substring(0, index).trim();
        let value = trimmed.substring(index + 1).trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!supabaseUrl || !supabaseServiceKey || !sanityProjectId || !sanityDataset) {
  console.error('Missing required environment variables. Please check .env.local.');
  process.exit(1);
}

const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
const { createClient: createSanityClient } = require('@sanity/client');

const supabase = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

const sanity = createSanityClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2025-05-11',
  useCdn: false, // get freshest data for seeding
});

async function seed() {
  try {
    console.log('--- Starting Sanity -> Supabase Sync Seed ---');

    // 1. Sync Ecosystem Stages
    console.log('\nFetching ecosystemStages from Sanity...');
    const sanityStages = await sanity.fetch(`
      *[_type == "ecosystemStage"] {
        _id,
        title,
        headerDescription,
        order
      }
    `);
    console.log(`Found ${sanityStages.length} stages in Sanity. Syncing to Supabase...`);

    const stageMap = new Map(); // maps sanity_id -> database UUID

    for (const stage of sanityStages) {
      const { data: upsertedStage, error: stageErr } = await supabase
        .from('ecosystem_stage')
        .upsert(
          {
            title: stage.title,
            description: stage.headerDescription || null,
            sort_order: stage.order || 0,
            sanity_id: stage._id,
          },
          { onConflict: 'sanity_id' }
        )
        .select('id, sanity_id')
        .single();

      if (stageErr) {
        console.error(`Error syncing stage ${stage.title}:`, stageErr);
      } else {
        console.log(`Synced stage: ${stage.title} (UUID: ${upsertedStage.id})`);
        stageMap.set(upsertedStage.sanity_id, upsertedStage.id);
      }
    }

    // 2. Sync Project Categories
    console.log('\nFetching projectCategories from Sanity...');
    const sanityCategories = await sanity.fetch(`
      *[_type == "projectCategory"] {
        _id,
        name,
        description
      }
    `);
    console.log(`Found ${sanityCategories.length} categories in Sanity. Syncing to Supabase...`);

    const categoryMap = new Map(); // maps sanity_id -> database UUID

    for (const cat of sanityCategories) {
      const { data: upsertedCat, error: catErr } = await supabase
        .from('project_category')
        .upsert(
          {
            name: cat.name,
            description: cat.description || null,
            sanity_id: cat._id,
          },
          { onConflict: 'sanity_id' }
        )
        .select('id, sanity_id')
        .single();

      if (catErr) {
        console.error(`Error syncing category ${cat.name}:`, catErr);
      } else {
        console.log(`Synced category: ${cat.name} (UUID: ${upsertedCat.id})`);
        categoryMap.set(upsertedCat.sanity_id, upsertedCat.id);
      }
    }

    // 3. Sync Projects
    console.log('\nFetching projects from Sanity...');
    const sanityProjects = await sanity.fetch(`
      *[_type == "project" && defined(slug.current)] {
        _id,
        name,
        "slug": slug.current,
        "projectCategoryRef": projectCategory._ref,
        "stageRef": ecosystemSection.stage._ref,
        "donationItems": donationSection.donationItems[] {
          _key,
          "slug": slug.current,
          itemTitle,
          itemSubtext,
          price,
          frequency
        }
      }
    `);
    console.log(`Found ${sanityProjects.length} projects in Sanity. Syncing to Supabase...`);

    for (const proj of sanityProjects) {
      // Resolve category UUID
      let categoryId = null;
      if (proj.projectCategoryRef) {
        categoryId = categoryMap.get(proj.projectCategoryRef) || null;
        if (!categoryId) {
          const { data } = await supabase
            .from('project_category')
            .select('id')
            .eq('sanity_id', proj.projectCategoryRef)
            .maybeSingle();
          if (data) categoryId = data.id;
        }
      }

      // Resolve stage UUID
      let stageId = null;
      if (proj.stageRef) {
        stageId = stageMap.get(proj.stageRef) || null;
        if (!stageId) {
          const { data } = await supabase
            .from('ecosystem_stage')
            .select('id')
            .eq('sanity_id', proj.stageRef)
            .maybeSingle();
          if (data) stageId = data.id;
        }
      }

      const { data: upsertedProj, error: projErr } = await supabase
        .from('project')
        .upsert(
          {
            name: proj.name,
            slug: proj.slug,
            sanity_id: proj._id,
            category_id: categoryId,
            stage_id: stageId,
            is_active: true,
          },
          { onConflict: 'sanity_id' }
        )
        .select('id');

      if (projErr) {
        console.error(`Error syncing project ${proj.name}:`, projErr);
        continue;
      }

      const projectDbId = upsertedProj?.[0]?.id;
      console.log(`Synced project: ${proj.name} (Slug: ${proj.slug})`);

      // Upsert each donation item into project_item table
      if (projectDbId && proj.donationItems && proj.donationItems.length > 0) {
        for (const item of proj.donationItems) {
          const compositeKey = `${proj._id}:${item._key}`;
          const { error: itemErr } = await supabase
            .from('project_item')
            .upsert(
              {
                project_id: projectDbId,
                sanity_id: compositeKey,
                slug: item.slug || null,
                title: item.itemTitle || 'Untitled',
                subtext: item.itemSubtext || null,
                price: item.price ?? null,
                frequency: Array.isArray(item.frequency) ? item.frequency : (item.frequency ? [item.frequency] : null),
                is_active: true,
              },
              { onConflict: 'sanity_id' }
            );

          if (itemErr) {
            console.error(`  Error syncing item "${item.itemTitle}" for project ${proj.name}:`, itemErr);
          } else {
            console.log(`  Synced item: ${item.itemTitle} (Key: ${compositeKey})`);
          }
        }
      }
    }

    console.log('\n--- Sync Seed Completed Successfully ---');
  } catch (err) {
    console.error('Unexpected error during seeding:', err);
    process.exit(1);
  }
}

seed();
