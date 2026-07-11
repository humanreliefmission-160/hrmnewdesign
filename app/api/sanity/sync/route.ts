import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { createServerClient } from '@/app/[locale]/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get(SIGNATURE_HEADER_NAME) || '';
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    // Verify signature only when a real secret is configured.
    // If SANITY_WEBHOOK_SECRET is absent, empty, or still the placeholder '#',
    // skip validation so development / unconfigured environments still work.
    const effectiveSecret = secret && secret !== '#' ? secret : null;
    if (effectiveSecret && !isValidSignature(rawBody, signature, effectiveSecret)) {
      console.warn('[Sanity Sync Webhook] Unauthorized — invalid request signature.');
      return Response.json({ message: 'Invalid signature' }, { status: 401 });
    }
    if (!effectiveSecret) {
      console.warn('[Sanity Sync Webhook] No webhook secret configured — skipping signature check.');
    }

    const payload = JSON.parse(rawBody);
    const { _id, _type, _action } = payload;

    if (!_id || !_type) {
      return Response.json({ error: 'Missing required document fields (_id, _type)' }, { status: 400 });
    }

    console.log(`[Sanity Sync Webhook] Received webhook for type: ${_type}, action: ${_action || 'save'}, id: ${_id}`);

    const supabase = createServerClient();

    // Handle Deletions
    if (_action === 'delete' || payload._deleted) {
      if (_type === 'project') {
        // Soft delete projects by marking as inactive
        const { error } = await supabase
          .from('project')
          .update({ is_active: false })
          .eq('sanity_id', _id);

        if (error) {
          console.error(`[Sanity Sync Webhook] Error marking project inactive:`, error);
          return Response.json({ error: error.message }, { status: 500 });
        }
        console.log(`[Sanity Sync Webhook] Marked project ${_id} as inactive.`);
      } else if (_type === 'projectCategory') {
        const { error } = await supabase
          .from('project_category')
          .delete()
          .eq('sanity_id', _id);

        if (error) {
          console.error(`[Sanity Sync Webhook] Error deleting category ${_id}:`, error);
          // Don't crash if restricted by FK
        }
      } else if (_type === 'ecosystemStage') {
        const { error } = await supabase
          .from('ecosystem_stage')
          .delete()
          .eq('sanity_id', _id);

        if (error) {
          console.error(`[Sanity Sync Webhook] Error deleting stage ${_id}:`, error);
        }
      }
      return Response.json({ success: true, action: 'delete' });
    }

    // Handle Upserts (Create & Update)
    if (_type === 'ecosystemStage') {
      const { error } = await supabase
        .from('ecosystem_stage')
        .upsert(
          {
            title: payload.title,
            description: payload.headerDescription || null,
            sort_order: payload.order || 0,
            sanity_id: _id,
          },
          { onConflict: 'sanity_id' }
        );

      if (error) {
        console.error('[Sanity Sync Webhook] Error upserting stage:', error);
        return Response.json({ error: error.message }, { status: 500 });
      }
    } else if (_type === 'projectCategory') {
      const { error } = await supabase
        .from('project_category')
        .upsert(
          {
            name: payload.name,
            description: payload.description || null,
            sanity_id: _id,
          },
          { onConflict: 'sanity_id' }
        );

      if (error) {
        console.error('[Sanity Sync Webhook] Error upserting category:', error);
        return Response.json({ error: error.message }, { status: 500 });
      }
    } else if (_type === 'project') {
      // Resolve category UUID
      let categoryId: string | null = null;
      const categoryRef = payload.projectCategory?._ref;
      if (categoryRef) {
        const { data } = await supabase
          .from('project_category')
          .select('id')
          .eq('sanity_id', categoryRef)
          .maybeSingle();
        if (data) categoryId = data.id;
      }

      // Resolve stage UUID
      let stageId: string | null = null;
      const stageRef = payload.ecosystemSection?.stage?._ref;
      if (stageRef) {
        const { data } = await supabase
          .from('ecosystem_stage')
          .select('id')
          .eq('sanity_id', stageRef)
          .maybeSingle();
        if (data) stageId = data.id;
      }

      const { data: upsertedProject, error } = await supabase
        .from('project')
        .upsert(
          {
            name: payload.name,
            slug: payload.slug?.current || payload.slug || '',
            sanity_id: _id,
            category_id: categoryId,
            stage_id: stageId,
            is_active: true,
          },
          { onConflict: 'sanity_id' }
        )
        .select('id')
        .single();

      if (error) {
        console.error('[Sanity Sync Webhook] Error upserting project:', error);
        return Response.json({ error: error.message }, { status: 500 });
      }

      // Upsert each donation item into project_item table
      const projectDbId = upsertedProject?.id;
      const donationItems = payload.donationSection?.donationItems ?? [];

      if (projectDbId && donationItems.length > 0) {
        for (const item of donationItems as Array<{
          _key: string;
          itemTitle?: string;
          itemSubtext?: string;
          price?: number;
          frequency?: string | string[];
          slug?: { current?: string };
        }>) {
          const compositeKey = `${_id}:${item._key}`;
          const { error: itemErr } = await supabase
            .from('project_item')
            .upsert(
              {
                project_id: projectDbId,
                sanity_id: compositeKey,
                slug: item.slug?.current || null,
                title: item.itemTitle || 'Untitled',
                subtext: item.itemSubtext || null,
                price: item.price ?? null,
                frequency: Array.isArray(item.frequency)
                  ? item.frequency
                  : item.frequency ? [item.frequency] : null,
                is_active: true,
              },
              { onConflict: 'sanity_id' }
            );

          if (itemErr) {
            console.error(`[Sanity Sync Webhook] Error upserting project_item "${item.itemTitle}":`, itemErr);
          }
        }
        console.log(`[Sanity Sync Webhook] Upserted ${donationItems.length} items for project ${_id}.`);
      }
    }

    return Response.json({ success: true, action: 'upsert' });
  } catch (err: any) {
    console.error('[Sanity Sync Webhook] Unexpected error:', err);
    return Response.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}