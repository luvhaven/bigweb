import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testInsert() {
  console.log('Testing affiliate insertion...');
  const { data, error } = await supabase.from('affiliates').insert({
    first_name: 'Test',
    last_name: 'User',
    email: `test_${Date.now()}@example.com`,
    referral_code: `BW-TEST-${Date.now()}`,
    commission_rate: 0.10,
    status: 'pending',
  }).select();

  console.log('Data (No Dates):', !!data);
  console.error('Error (No Dates):', JSON.stringify(error, null, 2));

  if (error) {
    console.log('Attempting with explicit dates...');
    const { data: data2, error: error2 } = await supabase.from('affiliates').insert({
      first_name: 'Test2',
      last_name: 'User',
      email: `test2_${Date.now()}@example.com`,
      referral_code: `BW-TEST2-${Date.now()}`,
      commission_rate: 0.10,
      status: 'pending',
      updated_at: new Date().toISOString(),
    }).select();
    console.log('Data (With updated_at):', !!data2);
    console.error('Error (With updated_at):', JSON.stringify(error2, null, 2));
  }
}

testInsert();
