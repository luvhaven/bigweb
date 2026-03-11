# CMS Setup Instructions

The CMS code has been fully implemented, but due to network environment restrictions, the database tables could not be created automatically.

Your website is **fully functional** right now using fallback data. To enable the live editing features, you just need to create the database tables.

## 🚀 How to Enable the CMS (2 Minutes)

1. **Open Supabase Dashboard**
   Go to: https://supabase.com/dashboard/project/krstrtqdnvxzvmiphhwm/sql/new

2. **Run the Migration SQL**
   Copy and paste the code below into the SQL editor and click **Run**.

```sql
-- 1. Create Hero Sections Table
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

-- 2. Create Site Settings Table
CREATE TABLE IF NOT EXISTS cms_site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Security
ALTER TABLE cms_hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_site_settings ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Access Policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_hero_sections' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_hero_sections FOR SELECT USING (is_active = true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cms_site_settings' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON cms_site_settings FOR SELECT USING (true);
    END IF;
END $$;

-- 5. Insert Default Data
INSERT INTO cms_hero_sections (page_slug, title, subtitle, description, stats, badges)
VALUES (
  '/',
  'Elite Digital Experiences',
  'We Build Revenue Engines, Not Websites',
  'Award-winning web development and design agency specializing in high-performance digital solutions.',
  '[{"label": "Client Satisfaction", "value": "99", "suffix": "%"},{"label": "Projects Delivered", "value": "500", "suffix": "+"},{"label": "Years Experience", "value": "10", "suffix": "+"}]'::jsonb,
  '[]'::jsonb
) ON CONFLICT (page_slug) DO NOTHING;
```

## ✅ Verification

Once you've run the SQL:
1. Go to `http://localhost:3000/admin/cms/hero`
2. You should see the "Elite Digital Experiences" hero section
3. Edit it and save
4. Check the homepage to see your changes live!

## 🛠 Features Ready to Use
- **Hero Management:** Edit titles, subtitles, CTAs, and stats for any page
- **Admin Dashboard:** Access all CMS modules at `/admin/cms`
- **Frontend Integration:** Homepage automatically checks for CMS data and falls back to default content if missing
