const { createClient } = require('./node_modules/@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function testMultipleDonationsSameRef() {
  console.log('--- Testing Multiple Donations with Same Reference ---');

  const ref = `TEST-REF-${Date.now()}`;

  // Insert first donation
  const { data: d1, error: err1 } = await supabase
    .from('donation')
    .insert({
      donor_id: '58c573d4-ff48-4504-9bba-37c308928d07', // existing donor
      project_id: 'abe86d20-220c-46cf-aaf1-5c892361a3fa',
      amount_intended_gbp: 10,
      donation_type: 'one_off',
      gift_aid: false,
      intention: 'General',
      reference: ref,
      status: 'completed',
    })
    .select();

  if (err1) {
    console.error('Donation 1 failed:', err1);
    return;
  }
  console.log('Donation 1 succeeded:', d1[0].id);

  // Insert second donation with same ref but different project/amount
  const { data: d2, error: err2 } = await supabase
    .from('donation')
    .insert({
      donor_id: '58c573d4-ff48-4504-9bba-37c308928d07',
      project_id: 'abe86d20-220c-46cf-aaf1-5c892361a3fa',
      amount_intended_gbp: 20,
      donation_type: 'one_off',
      gift_aid: false,
      intention: 'Zakat',
      reference: ref,
      status: 'completed',
    })
    .select();

  if (err2) {
    console.log('❌ Donation 2 failed with same reference (unique constraint exists):', err2.message);
  } else {
    console.log('✅ Donation 2 SUCCEEDED with same reference! No unique constraint.');
    // Cleanup
    await supabase.from('donation').delete().eq('id', d1[0].id);
    await supabase.from('donation').delete().eq('id', d2[0].id);
  }
}

testMultipleDonationsSameRef();
