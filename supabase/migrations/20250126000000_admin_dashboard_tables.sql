-- Create site_settings table for global website configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_site_settings_category ON site_settings(category);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- Insert default settings
INSERT INTO site_settings (key, value, category, description) VALUES
  ('site_name', '"BigWeb Agency"', 'general', 'Website name'),
  ('site_tagline', '"Digital Excellence, Delivered"', 'general', 'Site tagline'),
  ('site_description', '"We create stunning websites and digital experiences"', 'general', 'Site description'),
  ('contact_email', '"hello@bigweb.com"', 'general', 'Contact email'),
  ('contact_phone', '"+1 (555) 123-4567"', 'general', 'Contact phone'),
  ('primary_color', '"#3B82F6"', 'branding', 'Primary brand color'),
  ('secondary_color', '"#10B981"', 'branding', 'Secondary brand color'),
  ('google_analytics_id', '""', 'integrations', 'Google Analytics 4 ID'),
  ('facebook_pixel_id', '""', 'integrations', 'Facebook Pixel ID')
ON CONFLICT (key) DO NOTHING;

-- Create components table for managing frontend components
CREATE TABLE IF NOT EXISTS components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'hero', 'cta', 'testimonial', 'service', 'portfolio', 'stats', etc.
  name TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}', -- Component configuration
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'draft'
  order_index INTEGER DEFAULT 0,
  page_ids UUID[] DEFAULT '{}', -- Array of page IDs where this component is used
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_components_type ON components(type);
CREATE INDEX idx_components_status ON components(status);
CREATE INDEX idx_components_order ON components(order_index);

-- Create navigation_items table
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  url TEXT,
  parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
  position TEXT DEFAULT 'header', -- 'header', 'footer', 'mobile', 'sidebar'
  order_index INTEGER DEFAULT 0,
  icon TEXT,
  badge TEXT,
  target TEXT DEFAULT '_self',
  is_mega_menu BOOLEAN DEFAULT false,
  mega_menu_data JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_navigation_position ON navigation_items(position);
CREATE INDEX idx_navigation_parent ON navigation_items(parent_id);
CREATE INDEX idx_navigation_order ON navigation_items(order_index);

-- Create forms table
CREATE TABLE IF NOT EXISTS forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  fields JSONB NOT NULL DEFAULT '[]', -- Form field definitions
  settings JSONB DEFAULT '{}', -- Notifications, validations, etc.
  status TEXT DEFAULT 'active',
  submissions_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  metadata JSONB DEFAULT '{}', -- IP, user agent, etc.
  status TEXT DEFAULT 'new', -- 'new', 'read', 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_form_submissions_form ON form_submissions(form_id);
CREATE INDEX idx_form_submissions_status ON form_submissions(status);
CREATE INDEX idx_form_submissions_created ON form_submissions(created_at DESC);

-- Create analytics_events table for tracking
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'page_view', 'click', 'form_submit', etc.
  page_path TEXT,
  user_id UUID,
  session_id TEXT,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for analytics
CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_page ON analytics_events(page_path);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_session ON analytics_events(session_id);

-- Create seo_audits table
CREATE TABLE IF NOT EXISTS seo_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  score INTEGER,
  issues JSONB DEFAULT '[]',
  suggestions JSONB DEFAULT '[]',
  meta_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX idx_seo_audits_page ON seo_audits(page_id);
CREATE INDEX idx_seo_audits_created ON seo_audits(created_at DESC);

-- Add RLS policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audits ENABLE ROW LEVEL SECURITY;

-- Policies for site_settings (admin only for write, public for read)
CREATE POLICY "Anyone can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Only admins can modify site settings" ON site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Policies for components (admin/editor can manage)
CREATE POLICY "Anyone can view active components" ON components FOR SELECT USING (status = 'active' OR EXISTS (
  SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
));
CREATE POLICY "Admins and editors can manage components" ON components FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Policies for navigation (public read, admin write)
CREATE POLICY "Anyone can view navigation" ON navigation_items FOR SELECT USING (status = 'active');
CREATE POLICY "Only admins can manage navigation" ON navigation_items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Policies for forms
CREATE POLICY "Anyone can view active forms" ON forms FOR SELECT USING (status = 'active');
CREATE POLICY "Admins and editors can manage forms" ON forms FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Policies for form submissions
CREATE POLICY "Anyone can submit forms" ON form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view submissions" ON form_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Policies for analytics
CREATE POLICY "Anyone can log analytics" ON analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view analytics" ON analytics_events FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Policies for SEO audits
CREATE POLICY "Anyone can view SEO audits" ON seo_audits FOR SELECT USING (true);
CREATE POLICY "Only admins can manage SEO audits" ON seo_audits FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist, then create new ones
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_components_updated_at ON components;
CREATE TRIGGER update_components_updated_at BEFORE UPDATE ON components
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_navigation_items_updated_at ON navigation_items;
CREATE TRIGGER update_navigation_items_updated_at BEFORE UPDATE ON navigation_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_forms_updated_at ON forms;
CREATE TRIGGER update_forms_updated_at BEFORE UPDATE ON forms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
