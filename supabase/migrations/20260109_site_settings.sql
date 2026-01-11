-- Create site settings table for logo, favicon, and other global settings
CREATE TABLE IF NOT EXISTS cms_site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text', -- 'text', 'image', 'json', 'boolean'
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE cms_site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read settings
CREATE POLICY "Enable read for everyone" ON cms_site_settings FOR SELECT USING (true);

-- Only authenticated users can update
CREATE POLICY "Enable update for authenticated" ON cms_site_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- Insert default settings
INSERT INTO cms_site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_logo_url', '/images/logo.png', 'image', 'Main site logo URL'),
('site_favicon_url', '/favicon.ico', 'image', 'Site favicon URL'),
('site_name', 'BIGWEB Digital', 'text', 'Site name'),
('site_tagline', 'The Conversion Lab', 'text', 'Site tagline'),
('contact_email', 'hello@bigwebdigital.com', 'text', 'Contact email'),
('contact_phone', '+1 (234) 567-890', 'text', 'Contact phone')
ON CONFLICT (setting_key) DO NOTHING;

-- Create function to get setting value
CREATE OR REPLACE FUNCTION get_setting(key TEXT)
RETURNS TEXT AS $$
  SELECT setting_value FROM cms_site_settings WHERE setting_key = key LIMIT 1;
$$ LANGUAGE SQL STABLE;
