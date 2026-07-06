import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { createServerClient } from '@/app/[locale]/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get(SIGNATURE_HEADER_NAME) || '';
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    // Verify signature if secret is configured
    if (secret && !isValidSignature(rawBody, signature, secret)) {
      console.warn('[Sanity Sync Webhook] Unauthorized request signature check failed.');
      return Response.json({ message: 'Invalid signature' }, { status: 401 });
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

      // Determine project_item
      let projectItem = payload.name;
      if (payload.donationSection?.donationItems && payload.donationSection.donationItems.length > 0) {
        projectItem = payload.donationSection.donationItems[0].itemTitle || payload.name;
      }

      const { error } = await supabase
        .from('project')
        .upsert(
          {
            name: payload.name,
            slug: payload.slug?.current || payload.slug || '',
            project_item: projectItem,
            sanity_id: _id,
            category_id: categoryId,
            stage_id: stageId,
            is_active: true,
          },
          { onConflict: 'sanity_id' }
        );

      if (error) {
        console.error('[Sanity Sync Webhook] Error upserting project:', error);
        return Response.json({ error: error.message }, { status: 500 });
      }
    }

    return Response.json({ success: true, action: 'upsert' });
  } catch (err: any) {
    console.error('[Sanity Sync Webhook] Unexpected error:', err);
    return Response.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}