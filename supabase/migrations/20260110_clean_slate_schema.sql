-- =====================================================
-- BIGWEB DIGITAL: CLEAN SLATE BACKEND REBUILD
-- Phase 3: Drop old tables and create streamlined schema
-- =====================================================

-- STEP 1: DROP ALL OLD CMS TABLES
-- This will remove all existing data except auth.users

DROP TABLE IF EXISTS cms_services CASCADE;
DROP TABLE IF EXISTS cms_projects CASCADE;
DROP TABLE IF EXISTS cms_blog_posts CASCADE;
DROP TABLE IF EXISTS cms_blog_categories CASCADE;
DROP TABLE IF EXISTS cms_faqs CASCADE;
DROP TABLE IF EXISTS cms_testimonials CASCADE;
DROP TABLE IF EXISTS cms_team_members CASCADE;
-- Keep cms_leads (we want to preserve form submissions)
-- Keep cms_site_settings (we want to preserve settings)

-- STEP 2: CREATE STREAMLINED SCHEMA

-- 1. SITE SETTINGS (Already exists, but let's ensure it's correct)
CREATE TABLE IF NOT EXISTS cms_site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text',
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICES/OFFERS
CREATE TABLE cms_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  price_from DECIMAL,
  price_to DECIMAL,
  pricing_model TEXT DEFAULT 'fixed', -- 'fixed', 'from', 'monthly', 'range'
  features JSONB DEFAULT '[]',
  icon_name TEXT, -- 'Zap', 'Layers', 'RefreshCw', 'Target'
  color TEXT DEFAULT 'orange', -- 'blue', 'orange', 'green'
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CASE STUDIES (Replaces Projects)
CREATE TABLE cms_case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT,
  industry TEXT,
  challenge TEXT,
  solution TEXT,
  results JSONB, -- {"conversion_increase": "127%", "revenue_increase": "$50k"}
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TESTIMONIALS (Simplified)
CREATE TABLE cms_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  client_company TEXT,
  client_image TEXT,
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  result_metric TEXT, -- "127% conversion increase"
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FAQS (Simplified)
CREATE TABLE cms_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT, -- 'diagnostic', 'fix-sprint', 'revenue-system', 'retainer', 'general'
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- STEP 3: ENABLE RLS ON ALL TABLES

ALTER TABLE cms_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_faqs ENABLE ROW LEVEL SECURITY;

-- STEP 4: CREATE RLS POLICIES

-- Site Settings: Public read, authenticated write
DROP POLICY IF EXISTS "Enable read for everyone" ON cms_site_settings;
CREATE POLICY "Enable read for everyone" ON cms_site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable update for authenticated" ON cms_site_settings;
CREATE POLICY "Enable update for authenticated" ON cms_site_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- Services: Public read, authenticated write
DROP POLICY IF EXISTS "Enable read for everyone" ON cms_services;
CREATE POLICY "Enable read for everyone" ON cms_services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable all for authenticated" ON cms_services;
CREATE POLICY "Enable all for authenticated" ON cms_services FOR ALL USING (auth.role() = 'authenticated');

-- Case Studies: Public read published, authenticated all
DROP POLICY IF EXISTS "Enable read published for everyone" ON cms_case_studies;
CREATE POLICY "Enable read published for everyone" ON cms_case_studies FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable all for authenticated" ON cms_case_studies;
CREATE POLICY "Enable all for authenticated" ON cms_case_studies FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials: Public read, authenticated write
DROP POLICY IF EXISTS "Enable read for everyone" ON cms_testimonials;
CREATE POLICY "Enable read for everyone" ON cms_testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable all for authenticated" ON cms_testimonials;
CREATE POLICY "Enable all for authenticated" ON cms_testimonials FOR ALL USING (auth.role() = 'authenticated');

-- FAQs: Public read active, authenticated all
DROP POLICY IF EXISTS "Enable read active for everyone" ON cms_faqs;
CREATE POLICY "Enable read active for everyone" ON cms_faqs FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable all for authenticated" ON cms_faqs;
CREATE POLICY "Enable all for authenticated" ON cms_faqs FOR ALL USING (auth.role() = 'authenticated');

-- STEP 5: CREATE INDEXES FOR PERFORMANCE

CREATE INDEX IF NOT EXISTS idx_services_active ON cms_services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_services_slug ON cms_services(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON cms_case_studies(is_published, sort_order);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON cms_case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON cms_testimonials(is_featured, sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON cms_faqs(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON cms_faqs(is_active, sort_order);
