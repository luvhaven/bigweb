-- =====================================================
-- BIGWEB Digital - Content Management System
-- Migration: Core Content Tables
-- =====================================================

-- 1. PAGE SECTIONS TABLE
-- Purpose: Manage all frontend page sections with full CRUD control
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_route TEXT NOT NULL,
  section_key TEXT NOT NULL,
  section_type TEXT NOT NULL, -- 'hero', 'features', 'cta', 'content', etc.
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB,
  metadata JSONB,
  order_index INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published', -- 'draft', 'published', 'archived'
  version INTEGER DEFAULT 1,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_route, section_key)
);

COMMENT ON TABLE page_sections IS 'Manages all frontend page sections with version control and status workflow';

-- 2. CAPABILITIES TABLE
-- Purpose: The 5 core service offerings
CREATE TABLE IF NOT EXISTS capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  number TEXT NOT NULL, -- '01', '02', etc.
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Lucide icon name
  color TEXT, -- Color theme
  route TEXT, -- Full route path
  features JSONB, -- Array of feature objects with icon and text
  metadata JSONB,
  order_index INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE capabilities IS 'Core service capabilities displayed across the site';

-- 3. ENGAGEMENTS TABLE
-- Purpose: The 4 service engagement/offer types
CREATE TABLE IF NOT EXISTS engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  phase TEXT, -- 'Phase 01: Clinical Diagnostic', etc.
  description TEXT,
  price TEXT,
  price_subtext TEXT,
  features JSONB, -- Array of feature strings
  icon TEXT, -- Lucide icon name
  route TEXT,
  highlighted BOOLEAN DEFAULT false,
  badge_text TEXT,
  color_scheme TEXT,
  order_index INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE engagements IS 'Service engagement models (offers/packages)';

-- 4. PROCESS PHASES TABLE
-- Purpose: How It Works methodology steps
CREATE TABLE IF NOT EXISTS process_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number TEXT NOT NULL, -- '01', '02', etc.
  phase_id TEXT UNIQUE NOT NULL, -- 'PHASE_01', etc.
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  details JSONB, -- Array of detail strings
  deliverable TEXT,
  timeline TEXT,
  price TEXT,
  cta_text TEXT,
  cta_link TEXT,
  icon TEXT, -- Lucide icon name
  color TEXT,
  bg_color TEXT,
  border_color TEXT,
  order_index INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE process_phases IS 'Process methodology phases for How It Works page';

-- 5. GLOBAL CONTENT TABLE
-- Purpose: Reusable content blocks, CTAs, announcements
CREATE TABLE IF NOT EXISTS global_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL, -- 'cta', 'announcement', 'banner', 'block'
  title TEXT,
  body TEXT,
  cta_text TEXT,
  cta_link TEXT,
  metadata JSONB,
  status TEXT DEFAULT 'active',
  priority INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE global_content IS 'Reusable content blocks and global messaging';

-- 6. NAVIGATION ITEMS TABLE
-- Purpose: Dynamic navigation structure
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT,
  icon TEXT,
  description TEXT,
  position TEXT NOT NULL, -- 'header', 'footer', 'mobile', 'mega_menu'
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE navigation_items IS 'Hierarchical navigation structure across all menus';

-- 7. PAGE METADATA TABLE
-- Purpose: SEO and metadata for all routes
CREATE TABLE IF NOT EXISTS page_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  og_image TEXT,
  og_title TEXT,
  og_description TEXT,
  twitter_card TEXT DEFAULT 'summary_large_image',
  canonical_url TEXT,
  robots TEXT DEFAULT 'index,follow',
  schema_markup JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE page_metadata IS 'SEO and OpenGraph metadata for all pages';

-- 8. FEATURE FLAGS TABLE
-- Purpose: Toggle features dynamically
CREATE TABLE IF NOT EXISTS feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flag_key TEXT UNIQUE NOT NULL,
  flag_name TEXT NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT false,
  config JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE feature_flags IS 'Dynamic feature toggles for gradual rollout';

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_page_sections_route ON page_sections(page_route);
CREATE INDEX IF NOT EXISTS idx_page_sections_status ON page_sections(status);
CREATE INDEX IF NOT EXISTS idx_capabilities_slug ON capabilities(slug);
CREATE INDEX IF NOT EXISTS idx_engagements_slug ON engagements(slug);
CREATE INDEX IF NOT EXISTS idx_process_phases_order ON process_phases(order_index);
CREATE INDEX IF NOT EXISTS idx_navigation_position ON navigation_items(position);
CREATE INDEX IF NOT EXISTS idx_page_metadata_route ON page_metadata(route);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON page_sections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_capabilities_updated_at BEFORE UPDATE ON capabilities
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_engagements_updated_at BEFORE UPDATE ON engagements
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_process_phases_updated_at BEFORE UPDATE ON process_phases
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_global_content_updated_at BEFORE UPDATE ON global_content
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_navigation_items_updated_at BEFORE UPDATE ON navigation_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_metadata_updated_at BEFORE UPDATE ON page_metadata
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON feature_flags
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagements ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Public read access for published content
CREATE POLICY "Public can view published content" ON page_sections
FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published capabilities" ON capabilities
FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published engagements" ON engagements
FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published process phases" ON process_phases
FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view active global content" ON global_content
FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view active navigation" ON navigation_items
FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view page metadata" ON page_metadata
FOR SELECT USING (true);

CREATE POLICY "Public can view enabled feature flags" ON feature_flags
FOR SELECT USING (enabled = true);

-- Admin full access (authenticated users with admin role)
CREATE POLICY "Authenticated users full access to page_sections" ON page_sections
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access to capabilities" ON capabilities
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access to engagements" ON engagements
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access to process_phases" ON process_phases
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access to global_content" ON global_content
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access to navigation_items" ON navigation_items
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access to page_metadata" ON page_metadata
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users full access to feature_flags" ON feature_flags
FOR ALL TO authenticated USING (true) WITH CHECK (true);
