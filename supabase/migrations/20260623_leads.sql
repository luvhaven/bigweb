-- Migration: Create leads table for BIGWEB AI conversational assistant
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

CREATE TABLE IF NOT EXISTS public.leads (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text        NOT NULL,
  email           text        NOT NULL,
  phone           text,
  answers         jsonb       DEFAULT '{}',
  recommendations jsonb       DEFAULT '[]',
  source          text        DEFAULT 'BIGWEB AI',
  status          text        DEFAULT 'new',
  notes           text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS leads_email_idx   ON public.leads(email);
CREATE INDEX IF NOT EXISTS leads_status_idx  ON public.leads(status);
CREATE INDEX IF NOT EXISTS leads_created_idx ON public.leads(created_at DESC);

-- Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'leads' AND policyname = 'Admin can do all on leads'
  ) THEN
    CREATE POLICY "Admin can do all on leads"
      ON public.leads FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END$$;

-- Auto-update updated_at timestamp
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
