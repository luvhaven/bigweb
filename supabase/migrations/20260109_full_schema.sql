-- =====================================================
-- BIGWEB DIGITAL: FULL CONVERSION LAB SCHEMA
-- =====================================================

-- 1. CMS SERVICES (Offers)
CREATE TABLE IF NOT EXISTS cms_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  hero_image_url TEXT,
  hero_video_url TEXT,
  icon TEXT,
  icon_color TEXT DEFAULT '#10b981',
  features JSONB DEFAULT '[]', -- List of features
  benefits JSONB DEFAULT '[]',
  process_steps JSONB DEFAULT '[]',
  deliverables JSONB DEFAULT '[]',
  tech_stack JSONB DEFAULT '[]',
  pricing_model TEXT, -- 'fixed', 'hourly', 'monthly', 'starting_at'
  price_from INTEGER,
  price_to INTEGER,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cms_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Services" ON cms_services FOR SELECT USING (is_active = true);


-- 2. CMS PROJECTS (Case Studies)
CREATE TABLE IF NOT EXISTS cms_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  industry TEXT,
  description TEXT,
  challenge TEXT,
  solution TEXT,
  outcome TEXT,
  technologies JSONB DEFAULT '[]',
  stats JSONB DEFAULT '[]', -- [{label: "Revenue", value: "+300%"}, {label: "Speed", value: "0.5s"}]
  hero_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  website_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cms_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Projects" ON cms_projects FOR SELECT USING (true);


-- 3. CMS LEADS (Diagnostic / Contact)
CREATE TABLE IF NOT EXISTS cms_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'diagnostic', 'contact', 'fix_sprint'
  name TEXT,
  email TEXT NOT NULL,
  website_url TEXT,
  pain_point TEXT,
  revenue_goal TEXT,
  message TEXT,
  status TEXT DEFAULT 'new', -- new, contacted, qualified, closed
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cms_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert Leads" ON cms_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Read Leads" ON cms_leads FOR SELECT USING (auth.role() = 'authenticated');


-- 4. SEED SERVICES (Offers)
-- Clear existing to be safe and clean
DELETE FROM cms_services;

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
    '#3b82f6',
    'Conversion Diagnostic - Identify Revenue Blockers'
);

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
    '#e11d48',
    'Conversion Fix Sprint - Rapid Revenue Growth'
);

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
    '#a855f7',
    'Revenue Website System - Psychology-Backed Web Design'
);

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
    '#22c55e',
    'Optimization Retainer - Continuous CRO Services'
);

-- 5. SEED PROJECTS (Case Studies - Initial Dummies)
DELETE FROM cms_projects;
INSERT INTO cms_projects (
    title, slug, client_name, industry, description, challenge, solution, outcome, stats, is_featured
) VALUES (
    'E-Comm Revenue Scaling',
    'lux-fashion-scale',
    'LuxFashion',
    'E-Commerce',
    'Scaled a high-end fashion brand from $50k to $150k/mo through optimized checkout flows.',
    'High cart abandonment (75%) and slow mobile load times.',
    'Redesigned checkout, implemented One-Click payments, and optimized image delivery.',
    'Record breaking Q4 revenue.',
    '[{"label": "Revenue", "value": "+200%"}, {"label": "Conv. Rate", "value": "4.2%"}]',
    true
);

INSERT INTO cms_projects (
    title, slug, client_name, industry, description, challenge, solution, outcome, stats, is_featured
) VALUES (
    'SaaS Lead Gen Machine',
    'tech-flow-saas',
    'TechFlow',
    'B2B SaaS',
    'Redesigned landing pages to qualify leads automatically.',
    'Sales team was flooded with low-quality leads.',
    'Implemented interactive qualification quiz and transparent pricing.',
    'Lead quality improved by 80%.',
    '[{"label": "Qualified Leads", "value": "+45%"}, {"label": "CPA", "value": "-30%"}]',
    true
);
