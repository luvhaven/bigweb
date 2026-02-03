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

CREATE TABLE IF NOT EXISTS cms_site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE cms_hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_site_settings ENABLE ROW LEVEL SECURITY;

INSERT INTO cms_hero_sections (page_slug, title, subtitle, description, stats, badges)
SELECT 
  '/',
  'Elite Digital Experiences',
  'We Build Revenue Engines, Not Websites',
  'Award-winning web development and design agency specializing in high-performance digital solutions.',
  '[{"label": "Client Satisfaction", "value": "99", "suffix": "%"},{"label": "Projects Delivered", "value": "500", "suffix": "+"},{"label": "Years Experience", "value": "10", "suffix": "+"}]'::jsonb,
  '[]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM cms_hero_sections WHERE page_slug = '/');
