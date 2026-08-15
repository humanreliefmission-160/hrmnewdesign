import { createServerClient } from '@/app/[locale]/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postcode,
      country,
      projectSlug,
      donationItemSlug,
      donationItemTitle,
      intention,
      amount,
      giftAid,
      donationType,
      payMethod,
      reference,
      paymentId,
      subscriptionId,
      newsletterOptIn,
      items,
    } = body;

    if (!email || !firstName || !lastName) {
      return Response.json({ error: 'Email, first name, and last name are required.' }, { status: 400 });
    }

    const supabase = createServerClient();
    const cleanEmail = email.toLowerCase().trim();

    // 1. Find or create donor
    let donorId: string;
    const { data: existingDonor, error: donorFetchErr } = await supabase
      .from('donor')
      .select('id')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (donorFetchErr) {
      console.error('Error fetching donor:', donorFetchErr);
      return Response.json({ error: 'Database error fetching donor.' }, { status: 500 });
    }

    if (existingDonor) {
      donorId = existingDonor.id;
      // Update donor info if it has changed
      const { error: donorUpdateErr } = await supabase
        .from('donor')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: phone || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', donorId);

      if (donorUpdateErr) {
        console.error('Error updating donor:', donorUpdateErr);
      }
    } else {
      const { data: newDonor, error: donorInsertErr } = await supabase
        .from('donor')
        .insert({
          email: cleanEmail,
          first_name: firstName,
          last_name: lastName,
          phone: phone || null,
        })
        .select('id')
        .single();

      if (donorInsertErr) {
        console.error('Error inserting donor:', donorInsertErr);
        return Response.json({ error: 'Database error creating donor.' }, { status: 500 });
      }
      donorId = newDonor.id;
    }

    // 2. Find or create donor address (primary)
    const streetAddress = address || 'Not provided';
    const addressCity = city || 'Not provided';
    const addressCountry = country || 'GB';

    const { data: existingAddress, error: addressFetchErr } = await supabase
      .from('donor_address')
      .select('id')
      .eq('donor_id', donorId)
      .eq('is_primary', true)
      .maybeSingle();

    if (addressFetchErr) {
      console.error('Error fetching address:', addressFetchErr);
    }

    if (existingAddress) {
      const { error: addressUpdateErr } = await supabase
        .from('donor_address')
        .update({
          line_1: streetAddress,
          city: addressCity,
          postcode: postcode || null,
          country: addressCountry,
        })
        .eq('id', existingAddress.id);

      if (addressUpdateErr) {
        console.error('Error updating address:', addressUpdateErr);
      }
    } else {
      const { error: addressInsertErr } = await supabase
        .from('donor_address')
        .insert({
          donor_id: donorId,
          line_1: streetAddress,
          city: addressCity,
          postcode: postcode || null,
          country: addressCountry,
          is_primary: true,
        });

      if (addressInsertErr) {
        console.error('Error inserting address:', addressInsertErr);
      }
    }

    // 3. Process each donation item (allows multiple projects in a basket)
    const donationItems = (items && items.length > 0)
      ? items
      : [{
          projectSlug,
          donationItemSlug: donationItemSlug || null,
          donationItemTitle,
          intention,
          amount,
        }];

    for (let i = 0; i < donationItems.length; i++) {
      const item = donationItems[i];

      // Resolve project_id from projectSlug
      let itemProjectId: string | null = null;
      if (item.projectSlug) {
        const { data: projectData, error: projectErr } = await supabase
          .from('project')
          .select('id')
          .eq('slug', item.projectSlug)
          .maybeSingle();

        if (projectErr) {
          console.error('Error finding project by slug:', projectErr);
        } else if (projectData) {
          itemProjectId = projectData.id;
        }
      }

      // Resolve project_item_id by slug or title within the resolved project
      let itemProjectItemId: string | null = null;
      if (itemProjectId) {
        // 1. Try slug matching
        if (item.donationItemSlug) {
          const { data: piData } = await supabase
            .from('project_item')
            .select('id')
            .eq('project_id', itemProjectId)
            .eq('slug', item.donationItemSlug)
            .maybeSingle();
          if (piData) itemProjectItemId = piData.id;
        }
        // 2. Try title matching
        if (!itemProjectItemId && item.donationItemTitle) {
          const { data: piData } = await supabase
            .from('project_item')
            .select('id')
            .eq('project_id', itemProjectId)
            .eq('title', item.donationItemTitle)
            .maybeSingle();
          if (piData) itemProjectItemId = piData.id;
        }
        // 3. Fallback to first project item
        if (!itemProjectItemId) {
          const { data: piData } = await supabase
            .from('project_item')
            .select('id')
            .eq('project_id', itemProjectId)
            .limit(1)
            .maybeSingle();
          if (piData) itemProjectItemId = piData.id;
        }
      }

      if (!itemProjectItemId) {
        console.error(`Could not resolve project_item_id for item:`, item);
        return Response.json(
          { error: `Database error resolving project item for project: ${item.projectSlug || 'unknown'}` },
          { status: 400 }
        );
      }

      // Generate a unique reference for each donation record to satisfy unique constraint
      const itemReference = donationItems.length > 1
        ? `${reference}-${i + 1}`
        : reference;

      // Check if donation with this reference already exists to avoid duplication
      const { data: existingDonation } = await supabase
        .from('donation')
        .select('id')
        .eq('reference', itemReference)
        .maybeSingle();

      let donationId: string;

      if (existingDonation) {
        donationId = existingDonation.id;
      } else {
        // Normalise donation_type to values accepted by the DB constraint
        const rawType = donationType || 'one_off';
        const normalizedType =
          rawType === 'monthly' || rawType === 'weekly' || rawType === 'friday' || rawType === 'daily'
            ? 'monthly'
            : 'one_off';

        const { data: newDonation, error: donationInsertErr } = await supabase
          .from('donation')
          .insert({
            donor_id: donorId,
            project_item_id: itemProjectItemId,
            amount_intended_gbp: item.amount,
            donation_type: normalizedType,
            gift_aid: !!giftAid,
            intention: item.intention || null,
            reference: itemReference,
            status: 'completed',
          })
          .select('id')
          .single();

        if (donationInsertErr) {
          console.error('Error inserting donation — code:', donationInsertErr.code);
          console.error('Error inserting donation — message:', donationInsertErr.message);
          return Response.json(
            { error: 'Database error creating donation record.', detail: donationInsertErr.message },
            { status: 500 }
          );
        }
        donationId = newDonation.id;
      }

      // Insert Payment
      const rawFreq = donationType || 'one_off';
      const normalizedFreq =
        rawFreq === 'monthly' || rawFreq === 'weekly' || rawFreq === 'friday' || rawFreq === 'daily'
          ? 'monthly'
          : 'one_off';

      let normalizedPayMethod = 'card';
      const pm = (payMethod || '').toLowerCase();
      if (pm === 'paypal') {
        normalizedPayMethod = 'paypal';
      } else if (pm === 'bacs' || pm === 'banktransfer' || pm === 'bank_transfer') {
        normalizedPayMethod = 'direct_debit';
      } else if (pm === 'google_pay' || pm === 'googlepay') {
        normalizedPayMethod = 'google_pay';
      } else if (pm === 'apple_pay' || pm === 'applepay') {
        normalizedPayMethod = 'apple_pay';
      }

      const { error: paymentInsertErr } = await supabase
        .from('payment')
        .insert({
          donation_id: donationId,
          amount_local: item.amount,
          currency: 'GBP',
          exchange_rate: 1.0,
          frequency: normalizedFreq,
          payment_method: normalizedPayMethod,
          status: 'completed',
          paid_at: new Date().toISOString(),
          payment_id: paymentId || null,
          subscription_id: subscriptionId || null,
        } as any);

      if (paymentInsertErr) {
        console.error('Error inserting payment:', paymentInsertErr);
      }
    }

    // 6. Marketing Subscription if newsletterOptIn is true
    if (newsletterOptIn) {
      const { data: existingSub, error: subFetchErr } = await supabase
        .from('marketing_subscription')
        .select('id')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (!subFetchErr) {
        if (existingSub) {
          await supabase
            .from('marketing_subscription')
            .update({
              first_name: firstName,
              last_name: lastName,
              donor_id: donorId,
              status: 'active',
              consent_source: 'checkout',
              subscribed_at: new Date().toISOString(),
            })
            .eq('id', existingSub.id);
        } else {
          await supabase
            .from('marketing_subscription')
            .insert({
              email: cleanEmail,
              first_name: firstName,
              last_name: lastName,
              donor_id: donorId,
              status: 'active',
              consent_source: 'checkout',
              subscribed_at: new Date().toISOString(),
            });
        }
      }
    }

    return Response.json({ success: true, reference });
  } catch (err: any) {
    console.error('Unexpected error in donations route:', err);
    return Response.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
