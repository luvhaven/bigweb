-- =====================================================
-- BIGWEB DIGITAL: ELITE CMS DATABASE ARCHITECTURE (FIXED)
-- Complete database schema for award-winning website
-- Robustly handles existing tables from Admin 2.0 migration
-- =====================================================

-- =====================================================
-- 1. NAVIGATION SYSTEM
-- =====================================================
CREATE TABLE IF NOT EXISTS cms_navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT,
  parent_id UUID REFERENCES cms_navigation(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0,
  icon TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fix: Handle 'url' to 'href' migration if table already existed
DO $$
BEGIN
    -- If 'url' exists but 'href' does not, rename it
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_navigation' AND column_name = 'url') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_navigation' AND column_name = 'href') THEN
        ALTER TABLE cms_navigation RENAME COLUMN url TO href;
    END IF;

    -- If 'url' exists AND 'href' exists (rare), drop 'url' to clean up? Or just leave it. 
    -- Let's just ensure 'href' exists.
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_navigation' AND column_name = 'href') THEN
        ALTER TABLE cms_navigation ADD COLUMN href TEXT;
    END IF;

    -- Ensure 'description' column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_navigation' AND column_name = 'description') THEN
        ALTER TABLE cms_navigation ADD COLUMN description TEXT;
    END IF;
    
    -- Ensure 'updated_at' column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_navigation' AND column_name = 'updated_at') THEN
        ALTER TABLE cms_navigation ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;

-- =====================================================
-- 2. FOOTER ARCHITECTURE
-- =====================================================
CREATE TABLE IF NOT EXISTS cms_footer_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

DO $$
BEGIN
    -- Ensure 'description' column exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_footer_sections' AND column_name = 'description') THEN
        ALTER TABLE cms_footer_sections ADD COLUMN description TEXT;
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS cms_footer_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES cms_footer_sections(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fix: Handle 'url' to 'href' migration for footer links
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_footer_links' AND column_name = 'url') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_footer_links' AND column_name = 'href') THEN
        ALTER TABLE cms_footer_links RENAME COLUMN url TO href;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_footer_links' AND column_name = 'href') THEN
        ALTER TABLE cms_footer_links ADD COLUMN href TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_footer_links' AND column_name = 'icon') THEN
        ALTER TABLE cms_footer_links ADD COLUMN icon TEXT;
    END IF;
END $$;

-- =====================================================
-- 3. SERVICES (Enhanced)
-- =====================================================
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
  features JSONB DEFAULT '[]',
  benefits JSONB DEFAULT '[]',
  process_steps JSONB DEFAULT '[]',
  deliverables JSONB DEFAULT '[]',
  tech_stack JSONB DEFAULT '[]',
  pricing_model TEXT,
  price_from INTEGER,
  price_to INTEGER,
  case_studies JSONB DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

DO $$
BEGIN
    -- Add missing columns
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_services' AND column_name = 'tagline') THEN
        ALTER TABLE cms_services ADD COLUMN tagline TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_services' AND column_name = 'hero_video_url') THEN
        ALTER TABLE cms_services ADD COLUMN hero_video_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_services' AND column_name = 'icon_color') THEN
        ALTER TABLE cms_services ADD COLUMN icon_color TEXT DEFAULT '#10b981';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_services' AND column_name = 'deliverables') THEN
        ALTER TABLE cms_services ADD COLUMN deliverables JSONB DEFAULT '[]';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_services' AND column_name = 'meta_title') THEN
        ALTER TABLE cms_services ADD COLUMN meta_title TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_services' AND column_name = 'meta_description') THEN
        ALTER TABLE cms_services ADD COLUMN meta_description TEXT;
    END IF;
END $$;

-- =====================================================
-- 4. TEAM MEMBERS
-- =====================================================
CREATE TABLE IF NOT EXISTS cms_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  bio TEXT,
  quote TEXT,
  avatar_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  github_url TEXT,
  website_url TEXT,
  expertise JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  is_leadership BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: cms_team might exist from previous migration, but we want cms_team_members?
-- The previous migration created 'cms_team' (not members).
-- Let's check if 'cms_team' exists and 'cms_team_members' does not.
-- If 'cms_team' exists, we can leave it or migrate data?
-- For now, let's just create 'cms_team_members' as a new table to avoid conflict or confusion.
-- The app will use 'cms_team_members'.

-- =====================================================
-- 5. TESTIMONIALS
-- =====================================================
CREATE TABLE IF NOT EXISTS cms_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL, -- Renamed from author_name in some schemas?
  client_role TEXT,
  client_company TEXT,
  client_company_logo TEXT,
  avatar_url TEXT,
  quote TEXT NOT NULL,
  video_url TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  service_type TEXT,
  project_url TEXT,
  result_metrics JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_video BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fix compatibility with previous 'author_name'
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'author_name') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'client_name') THEN
        ALTER TABLE cms_testimonials RENAME COLUMN author_name TO client_name;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'author_role') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'client_role') THEN
        ALTER TABLE cms_testimonials RENAME COLUMN author_role TO client_role;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'author_company') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'client_company') THEN
        ALTER TABLE cms_testimonials RENAME COLUMN author_company TO client_company;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'author_avatar_url') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'avatar_url') THEN
        ALTER TABLE cms_testimonials RENAME COLUMN author_avatar_url TO avatar_url;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'client_company_logo') THEN
        ALTER TABLE cms_testimonials ADD COLUMN client_company_logo TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_testimonials' AND column_name = 'video_url') THEN
        ALTER TABLE cms_testimonials ADD COLUMN video_url TEXT;
    END IF;
END $$;

-- =====================================================
-- 6. BLOG SYSTEM (New)
-- =====================================================
CREATE TABLE IF NOT EXISTS cms_blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#10b981',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image_url TEXT,
  author_id UUID, -- Loose reference since we have multiple team tables potentially
  author_name TEXT,
  category_id UUID REFERENCES cms_blog_categories(id),
  tags JSONB DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  read_time_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. ANALYTICS EVENTS (New)
-- =====================================================
CREATE TABLE IF NOT EXISTS cms_analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_category TEXT,
  event_data JSONB DEFAULT '{}',
  user_id TEXT,
  session_id TEXT,
  page_url TEXT,
  page_title TEXT,
  referrer TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON cms_analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON cms_analytics_events(created_at DESC);

-- =====================================================
-- 8. FAQS (New)
-- =====================================================
CREATE TABLE IF NOT EXISTS cms_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  service_id UUID REFERENCES cms_services(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 9. PROJECTS (Update)
-- =====================================================
-- Ensure is_featured exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_projects' AND column_name = 'is_featured') THEN
        ALTER TABLE cms_projects ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'cms_projects' AND column_name = 'category') THEN
        ALTER TABLE cms_projects ADD COLUMN category TEXT;
    END IF;
END $$;

-- =====================================================
-- 10. ENABLE ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE cms_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_footer_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_faqs ENABLE ROW LEVEL SECURITY;

-- Public read access to all content tables
-- (Use DO blocks to avoid errors if policies already exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_navigation' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_navigation FOR SELECT USING (is_active = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_footer_sections' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_footer_sections FOR SELECT USING (is_active = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_footer_links' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_footer_links FOR SELECT USING (is_active = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_services' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_services FOR SELECT USING (is_active = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_team_members' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_team_members FOR SELECT USING (is_active = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_testimonials' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_testimonials FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_blog_categories' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_blog_categories FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_blog_posts' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_blog_posts FOR SELECT USING (is_published = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_faqs' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_faqs FOR SELECT USING (is_active = true);
    END IF;
END $$;

-- Analytics policies
ALTER TABLE cms_analytics_events ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_analytics_events' AND policyname = 'Enable insert for anonymous') THEN
        CREATE POLICY "Enable insert for anonymous" ON cms_analytics_events FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_analytics_events' AND policyname = 'Enable read for authenticated users') THEN
        CREATE POLICY "Enable read for authenticated users" ON cms_analytics_events FOR SELECT USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- =====================================================
-- 11. SEED INITIAL DATA (Idempotent)
-- =====================================================

-- Navigation
-- Clean up first if you want to force reset, OR just insert if not exists.
-- Let's just standard insert with ON CONFLICT ignore if we have unique constraints, but we don't on label/href.
-- So verify if empty or if specific items exist?
-- Simpler: insert only if table is empty, or just append distinct items?
-- Let's assume if it has data we don't touch it, or clean it?
-- Given "Complete Rebuild", cleaning might be desired, but dangerous for prod.
-- Let's just Insert specific items if they don't exist.

INSERT INTO cms_navigation (label, href, sort_order, is_active)
SELECT 'Home', '/', 0, true
WHERE NOT EXISTS (SELECT 1 FROM cms_navigation WHERE label = 'Home');

INSERT INTO cms_navigation (label, href, sort_order, is_active)
SELECT 'Services', '/services', 1, true
WHERE NOT EXISTS (SELECT 1 FROM cms_navigation WHERE label = 'Services');

INSERT INTO cms_navigation (label, href, sort_order, is_active)
SELECT 'Portfolio', '/portfolio', 2, true
WHERE NOT EXISTS (SELECT 1 FROM cms_navigation WHERE label = 'Portfolio');

INSERT INTO cms_navigation (label, href, sort_order, is_active)
SELECT 'About', '/about', 3, true
WHERE NOT EXISTS (SELECT 1 FROM cms_navigation WHERE label = 'About');

INSERT INTO cms_navigation (label, href, sort_order, is_active)
SELECT 'Blog', '/blog', 4, true
WHERE NOT EXISTS (SELECT 1 FROM cms_navigation WHERE label = 'Blog');

INSERT INTO cms_navigation (label, href, sort_order, is_active)
SELECT 'Contact', '/contact', 5, true
WHERE NOT EXISTS (SELECT 1 FROM cms_navigation WHERE label = 'Contact');


-- Footer Sections
INSERT INTO cms_footer_sections (title, sort_order)
SELECT 'Company', 0
WHERE NOT EXISTS (SELECT 1 FROM cms_footer_sections WHERE title = 'Company');

INSERT INTO cms_footer_sections (title, sort_order)
SELECT 'Services', 1
WHERE NOT EXISTS (SELECT 1 FROM cms_footer_sections WHERE title = 'Services');

INSERT INTO cms_footer_sections (title, sort_order)
SELECT 'Resources', 2
WHERE NOT EXISTS (SELECT 1 FROM cms_footer_sections WHERE title = 'Resources');

INSERT INTO cms_footer_sections (title, sort_order)
SELECT 'Legal', 3
WHERE NOT EXISTS (SELECT 1 FROM cms_footer_sections WHERE title = 'Legal');

-- Footer Links
DO $$
DECLARE
  company_id UUID;
  services_id UUID;
  resources_id UUID;
  legal_id UUID;
BEGIN
  SELECT id INTO company_id FROM cms_footer_sections WHERE title = 'Company' LIMIT 1;
  SELECT id INTO services_id FROM cms_footer_sections WHERE title = 'Services' LIMIT 1;
  SELECT id INTO resources_id FROM cms_footer_sections WHERE title = 'Resources' LIMIT 1;
  SELECT id INTO legal_id FROM cms_footer_sections WHERE title = 'Legal' LIMIT 1;

  -- Company links
  IF company_id IS NOT NULL THEN
      INSERT INTO cms_footer_links (section_id, label, href, sort_order)
      SELECT company_id, 'About Us', '/about', 0
      WHERE NOT EXISTS (SELECT 1 FROM cms_footer_links WHERE label = 'About Us' AND section_id = company_id);

      INSERT INTO cms_footer_links (section_id, label, href, sort_order)
      SELECT company_id, 'Careers', '/careers', 1
      WHERE NOT EXISTS (SELECT 1 FROM cms_footer_links WHERE label = 'Careers' AND section_id = company_id);
      
      INSERT INTO cms_footer_links (section_id, label, href, sort_order)
      SELECT company_id, 'Contact', '/contact', 2
      WHERE NOT EXISTS (SELECT 1 FROM cms_footer_links WHERE label = 'Contact' AND section_id = company_id);
      
      INSERT INTO cms_footer_links (section_id, label, href, sort_order)
      SELECT company_id, 'Team', '/team', 3
      WHERE NOT EXISTS (SELECT 1 FROM cms_footer_links WHERE label = 'Team' AND section_id = company_id);
  END IF;

  -- Services links
  IF services_id IS NOT NULL THEN
      INSERT INTO cms_footer_links (section_id, label, href, sort_order)
      SELECT services_id, 'Web Development', '/services/web-development', 0
      WHERE NOT EXISTS (SELECT 1 FROM cms_footer_links WHERE label = 'Web Development' AND section_id = services_id);
      
      INSERT INTO cms_footer_links (section_id, label, href, sort_order)
      SELECT services_id, 'UI/UX Design', '/services/ui-ux-design', 1
      WHERE NOT EXISTS (SELECT 1 FROM cms_footer_links WHERE label = 'UI/UX Design' AND section_id = services_id);
  END IF;

  -- Resources links
  IF resources_id IS NOT NULL THEN
     INSERT INTO cms_footer_links (section_id, label, href, sort_order)
     SELECT resources_id, 'Blog', '/blog', 0
     WHERE NOT EXISTS (SELECT 1 FROM cms_footer_links WHERE label = 'Blog' AND section_id = resources_id);
  END IF;

  -- Legal links
  IF legal_id IS NOT NULL THEN
     INSERT INTO cms_footer_links (section_id, label, href, sort_order)
     SELECT legal_id, 'Privacy Policy', '/privacy', 0
     WHERE NOT EXISTS (SELECT 1 FROM cms_footer_links WHERE label = 'Privacy Policy' AND section_id = legal_id);
  END IF;
END $$;

-- =====================================================
-- 12. TRIGGERS (Idempotent)
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_cms_services_updated_at') THEN
        CREATE TRIGGER update_cms_services_updated_at BEFORE UPDATE ON cms_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_cms_team_members_updated_at') THEN
        CREATE TRIGGER update_cms_team_members_updated_at BEFORE UPDATE ON cms_team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_cms_blog_posts_updated_at') THEN
        CREATE TRIGGER update_cms_blog_posts_updated_at BEFORE UPDATE ON cms_blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_cms_navigation_updated_at') THEN
        CREATE TRIGGER update_cms_navigation_updated_at BEFORE UPDATE ON cms_navigation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
