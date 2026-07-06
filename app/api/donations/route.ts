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
      donationItemTitle,
      intention,
      amount,
      giftAid,
      donationType,
      payMethod,
      reference,
      newsletterOptIn,
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

    // 3. Resolve project_id from projectSlug
    let projectId: string | null = null;
    if (projectSlug) {
      const { data: projectData, error: projectErr } = await supabase
        .from('project')
        .select('id')
        .eq('slug', projectSlug)
        .maybeSingle();

      if (projectErr) {
        console.error('Error finding project by slug:', projectErr);
      } else if (projectData) {
        projectId = projectData.id;
      }
    }

    // 4. Insert Donation
    // Check if donation with this reference already exists to avoid duplication
    const { data: existingDonation } = await supabase
      .from('donation')
      .select('id')
      .eq('reference', reference)
      .maybeSingle();

    let donationId: string;

    if (existingDonation) {
      donationId = existingDonation.id;
    } else {
      const { data: newDonation, error: donationInsertErr } = await supabase
        .from('donation')
        .insert({
          donor_id: donorId,
          project_id: projectId,
          amount_intended_gbp: amount,
          donation_type: donationType || 'oneoff',
          gift_aid: !!giftAid,
          intention: intention || null,
          reference: reference,
          status: 'completed',
        })
        .select('id')
        .single();

      if (donationInsertErr) {
        console.error('Error inserting donation:', donationInsertErr);
        return Response.json({ error: 'Database error creating donation record.' }, { status: 500 });
      }
      donationId = newDonation.id;
    }

    // 5. Insert Payment
    const { error: paymentInsertErr } = await supabase
      .from('payment')
      .insert({
        donation_id: donationId,
        amount_local: amount,
        amount_gbp: amount,
        currency: 'GBP',
        exchange_rate: 1.0,
        frequency: donationType || 'oneoff',
        payment_method: payMethod || 'Card',
        status: 'completed',
        paid_at: new Date().toISOString(),
      });

    if (paymentInsertErr) {
      console.error('Error inserting payment:', paymentInsertErr);
      // Don't fail the request if payment record insert fails, since donation went through
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
