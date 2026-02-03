-- =====================================================
-- CMS HERO SECTIONS & SITE SETTINGS
-- Enables admin editing of hero sections and global settings
-- =====================================================

-- Hero Sections Table
CREATE TABLE IF NOT EXISTS cms_hero_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_primary_text TEXT DEFAULT 'Get Started',
  cta_primary_url TEXT DEFAULT '/contact',
  cta_secondary_text TEXT,
  cta_secondary_url TEXT,
  background_image TEXT,
  background_video TEXT,
  stats JSONB DEFAULT '[]',
  badges JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS cms_site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cms_hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_hero_sections' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_hero_sections FOR SELECT USING (is_active = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_site_settings' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_site_settings FOR SELECT USING (true);
    END IF;
END $$;

-- Triggers for updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_cms_hero_sections_updated_at') THEN
        CREATE TRIGGER update_cms_hero_sections_updated_at 
        BEFORE UPDATE ON cms_hero_sections 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_cms_site_settings_updated_at') THEN
        CREATE TRIGGER update_cms_site_settings_updated_at 
        BEFORE UPDATE ON cms_site_settings 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Seed default hero for homepage
INSERT INTO cms_hero_sections (page_slug, title, subtitle, description, stats, badges)
SELECT 
  '/',
  'Elite Digital Experiences',
  'We Build Revenue Engines, Not Websites',
  'Award-winning web development and design agency specializing in high-performance digital solutions.',
  '[
    {"label": "Client Satisfaction", "value": "99", "suffix": "%"},
    {"label": "Projects Delivered", "value": "500", "suffix": "+"},
    {"label": "Years Experience", "value": "10", "suffix": "+"}
  ]'::jsonb,
  '[]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM cms_hero_sections WHERE page_slug = '/');

-- Seed default site settings
INSERT INTO cms_site_settings (key, value, category, description)
SELECT 
  'site_name',
  '"BIGWEB Digital"'::jsonb,
  'general',
  'Website name'
WHERE NOT EXISTS (SELECT 1 FROM cms_site_settings WHERE key = 'site_name');

INSERT INTO cms_site_settings (key, value, category, description)
SELECT 
  'site_tagline',
  '"Elite Digital Experiences"'::jsonb,
  'general',
  'Website tagline'
WHERE NOT EXISTS (SELECT 1 FROM cms_site_settings WHERE key = 'site_tagline');

INSERT INTO cms_site_settings (key, value, category, description)
SELECT 
  'contact_email',
  '"hello@bigwebdigital.com"'::jsonb,
  'contact',
  'Primary contact email'
WHERE NOT EXISTS (SELECT 1 FROM cms_site_settings WHERE key = 'contact_email');

INSERT INTO cms_site_settings (key, value, category, description)
SELECT 
  'contact_phone',
  '"+1 (555) 123-4567"'::jsonb,
  'contact',
  'Primary contact phone'
WHERE NOT EXISTS (SELECT 1 FROM cms_site_settings WHERE key = 'contact_phone');

INSERT INTO cms_site_settings (key, value, category, description)
SELECT 
  'social_links',
  '{
    "twitter": "https://twitter.com/bigwebdigital",
    "linkedin": "https://linkedin.com/company/bigwebdigital",
    "github": "https://github.com/bigwebdigital"
  }'::jsonb,
  'social',
  'Social media links'
WHERE NOT EXISTS (SELECT 1 FROM cms_site_settings WHERE key = 'social_links');
