// Run: node scripts/migrate-leads.mjs
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const migration = `
-- BIGWEB Digital: Leads table for AI conversational assistant captures
CREATE TABLE IF NOT EXISTS public.leads (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text        NOT NULL,
  email           text        NOT NULL,
  phone           text,
  answers         jsonb       DEFAULT '{}',
  recommendations jsonb       DEFAULT '[]',
  source      text        DEFAULT 'BIGWEB AI',
  status      text        DEFAULT 'new',
  notes       text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_email_idx   ON public.leads(email);
CREATE INDEX IF NOT EXISTS leads_status_idx  ON public.leads(status);
CREATE INDEX IF NOT EXISTS leads_created_idx ON public.leads(created_at DESC);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='leads' AND policyname='Admin can do all on leads'
  ) THEN
    CREATE POLICY "Admin can do all on leads"
      ON public.leads FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END$$;

CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at_trigger ON public.leads;
CREATE TRIGGER leads_updated_at_trigger
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION update_leads_updated_at();
`;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

console.log('Applying leads table migration via Supabase REST API...');

// Use the pg REST endpoint — works with service role key
const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
  },
  body: JSON.stringify({ sql: migration }),
});

if (!response.ok) {
  // Supabase doesn't have a raw SQL RPC by default; use the Management API approach
  console.log('ℹ️  Supabase REST RPC not available.');
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Copy and run the following in your Supabase SQL Editor:');
  console.log('  https://supabase.com/dashboard/project/_/sql');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log(migration);
} else {
  console.log('✅ Leads table migration applied successfully!');
}
