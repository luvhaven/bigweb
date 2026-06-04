-- ============================================================
-- BIGWEB Affiliate Partner Programme — Supabase Migration
-- ============================================================

-- Affiliates Table
CREATE TABLE IF NOT EXISTS public.affiliates (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name       TEXT        NOT NULL,
    last_name        TEXT        NOT NULL,
    email            TEXT        NOT NULL UNIQUE,
    company_name     TEXT,
    website          TEXT,
    payout_email     TEXT,
    referral_code    TEXT        NOT NULL UNIQUE,
    referral_source  TEXT,
    commission_rate  FLOAT       NOT NULL DEFAULT 0.10,
    status           TEXT        NOT NULL DEFAULT 'pending'
                                 CHECK (status IN ('pending','approved','suspended','rejected')),
    total_earned     FLOAT       NOT NULL DEFAULT 0,
    total_paid       FLOAT       NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Referrals Table
CREATE TABLE IF NOT EXISTS public.referrals (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    affiliate_id     UUID        NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
    client_name      TEXT        NOT NULL,
    client_email     TEXT        NOT NULL,
    client_company   TEXT,
    contract_value   FLOAT,
    commission_amount FLOAT,
    status           TEXT        NOT NULL DEFAULT 'pending'
                                 CHECK (status IN ('pending','qualified','converted','paid','rejected','clawback')),
    notes            TEXT,
    converted_at     TIMESTAMPTZ,
    paid_at          TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_affiliates_status        ON public.affiliates(status);
CREATE INDEX IF NOT EXISTS idx_affiliates_referral_code ON public.affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_affiliate_id   ON public.referrals(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status         ON public.referrals(status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_affiliates_updated_at
    BEFORE UPDATE ON public.affiliates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_referrals_updated_at
    BEFORE UPDATE ON public.referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals  ENABLE ROW LEVEL SECURITY;

-- Admin-only read/write (public users can only insert their own application via API routes)
-- Note: actual enforcement is via the server-side API routes using the service role key.
-- These policies are a belt-and-braces lock at the DB level.
CREATE POLICY "Admin full access to affiliates"
    ON public.affiliates FOR ALL
    USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access to referrals"
    ON public.referrals FOR ALL
    USING (auth.role() = 'service_role');
