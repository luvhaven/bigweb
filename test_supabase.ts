import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testInsert() {
  console.log('Testing affiliate insertion (without select)...');
  const { data, error } = await supabase.from('affiliates').insert({
    first_name: 'Test',
    last_name: 'User',
    email: `test_noselect_${Date.now()}@example.com`,
    referral_code: `BW-TEST-NOS-${Date.now()}`,
    commission_rate: 0.10,
    status: 'pending',
  }); // NO .select() here

  console.log('Data:', !!data);
  console.error('Error:', error);
}

testInsert();
