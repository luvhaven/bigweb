-- =====================================================
-- BIGWEB DIGITAL: CONVERSION LAB UPDATE
-- 1. Create Leads table for Diagnostic/Contact forms
-- 2. Seed 'cms_services' with the new 4 offers
-- =====================================================

-- 1. LEADS / SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS cms_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'diagnostic', 'contact', 'fix_sprint', etc.
  name TEXT,
  email TEXT NOT NULL,
  website_url TEXT,
  pain_point TEXT, -- For diagnostic intake
  revenue_goal TEXT, -- For diagnostic intake
  message TEXT,
  status TEXT DEFAULT 'new', -- new, contacted, qualified, closed
  metadata JSONB DEFAULT '{}', -- Flexible for extra wizard steps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for Leads
ALTER TABLE cms_leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can submit a form)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_leads' AND policyname = 'Enable insert for everyone') THEN
        CREATE POLICY "Enable insert for everyone" ON cms_leads FOR INSERT WITH CHECK (true);
    END IF;
    
    -- Only admins can read leads
    -- Assuming admin role management logic exists, but standard authenticated read policy often used for admins
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_leads' AND policyname = 'Enable read for authenticated users') THEN
        CREATE POLICY "Enable read for authenticated users" ON cms_leads FOR SELECT USING (auth.role() = 'authenticated');
    END IF;
END $$;


-- 2. SEED CMS_SERVICES WITH NEW OFFERS
-- First, mark old services as inactive (or delete them if you prefer a clean slate).
-- Let's just update them if they match, or insert new ones. 
-- Given the rebrand is "total", let's clear active ones (soft delete) and insert new.

UPDATE cms_services SET is_active = false;

-- Offer 1: Conversion Diagnostic
INSERT INTO cms_services (
    title, slug, tagline, description, price_from, pricing_model, features, sort_order, is_active, icon_color, meta_title
) VALUES (
    'Conversion Diagnostic',
    'diagnostic',
    'The Entry Point',
    'A forensic audit of your funnel. We identify why you aren''t converting and exactly how to fix it.',
    399,
    'fixed',
    '["Full Home & Landing Page Audit", "Messaging Clarity Score", "UX Friction Analysis", "Prioritized Fix List", "Video Walkthrough"]',
    1,
    true,
    '#3b82f6', -- Blue
    'Conversion Diagnostic - Identify Revenue Blockers'
);

-- Offer 2: Fix Sprint
INSERT INTO cms_services (
    title, slug, tagline, description, price_from, pricing_model, features, sort_order, is_active, icon_color, meta_title
) VALUES (
    'Conversion Fix Sprint',
    'fix-sprint',
    'Rapid Execution',
    'We fix the critical 20% of your site that drives 80% of the results in just one week.',
    1000,
    'starting_at',
    '["1-3 Key Pages Optimized", "Headline & Copy Rewrites", "CTA Design & Placement", "Mobile Responsive Fixes", "Speed Optimization"]',
    2,
    true,
    '#e11d48', -- Accenty Red
    'Conversion Fix Sprint - Rapid Revenue Growth'
);

-- Offer 3: Revenue Website System
INSERT INTO cms_services (
    title, slug, tagline, description, price_from, pricing_model, features, sort_order, is_active, icon_color, meta_title
) VALUES (
    'Revenue Website System',
    'revenue-system',
    'The Full Rebuild',
    'A complete website rebuild engineered for psychology and performance. We don''t just redesign; we rebuild your sales engine.',
    3000,
    'starting_at',
    '["Full Site Architecture", "Conversion-Focused Copy", "Next.js + Supabase Stack", "Custom CMS", "Advanced Analytics"]',
    3,
    true,
    '#a855f7', -- Purple
    'Revenue Website System - Psychology-Backed Web Design'
);

-- Offer 4: Optimization Retainer
INSERT INTO cms_services (
    title, slug, tagline, description, price_from, price_to, pricing_model, features, sort_order, is_active, icon_color, meta_title
) VALUES (
    'Optimization Retainer',
    'retainer',
    'Continuous Growth',
    'Your in-house CRO team. We rigorously test, monitor, and refine your funnel every month.',
    500,
    2000,
    'monthly',
    '["A/B Testing", "Heatmap Analysis", "Performance Monitoring", "Iterative Updates", "Monthly ROI Reports"]',
    4,
    true,
    '#22c55e', -- Green
    'Optimization Retainer - Continuous CRO Services'
);
