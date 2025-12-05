-- ============================================
-- ADMIN USERS TABLE
-- ============================================
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admin users table for role-based access control
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert the admin user (doriazowan@gmail.com)
-- Note: This assumes the user already exists in auth.users
-- You may need to get the actual UUID from Supabase Auth
INSERT INTO admin_users (id, email, name, role)
SELECT 
  id,
  'doriazowan@gmail.com',
  'Doria Zowan',
  'admin'
FROM auth.users
WHERE email = 'doriazowan@gmail.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin', name = 'Doria Zowan';

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT,
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Ensure is_active column exists (for existing tables)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'services' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE services ADD COLUMN is_active BOOLEAN DEFAULT true;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);

-- ============================================
-- PORTFOLIO PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_portfolio_projects_updated_at ON portfolio_projects;
CREATE TRIGGER update_portfolio_projects_updated_at
    BEFORE UPDATE ON portfolio_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(featured);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  client_company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  client_image TEXT,
  result_metric TEXT,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'archived')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contact_submissions(created_at DESC);

-- ============================================
-- CHAT SESSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  name TEXT,
  email TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),
  unread_count INTEGER DEFAULT 0,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_visitor ON chat_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_last_message ON chat_sessions(last_message_at DESC);

-- ============================================
-- CHAT MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('visitor', 'agent', 'system')),
  sender_id TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);

-- ============================================
-- PAGE VIEWS TABLE (Analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  country TEXT,
  city TEXT,
  device TEXT,
  browser TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  author_id UUID REFERENCES admin_users(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_author ON blog_posts(author_id);

-- ============================================
-- BLOG TAGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- ============================================
-- MEDIA LIBRARY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES admin_users(id),
  folder TEXT DEFAULT 'uncategorized',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_filename ON media_library(filename);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media_library(folder);
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON media_library(uploaded_by);

-- ============================================
-- SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings
INSERT INTO site_settings (key, value, description) VALUES
  ('site_name', '"BIGWEB Digital"', 'Website name'),
  ('site_description', '"Award-winning digital agency"', 'Website description'),
  ('contact_email', '"hello@bigwebdigital.com"', 'Contact email'),
  ('contact_phone', '"+1 (555) 123-4567"', 'Contact phone'),
  ('social_twitter', '"@bigwebdigital"', 'Twitter handle'),
  ('social_linkedin', '"bigweb-digital"', 'LinkedIn profile'),
  ('analytics_enabled', 'true', 'Enable analytics tracking'),
  ('maintenance_mode', 'false', 'Enable maintenance mode')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Admin users can do everything
DROP POLICY IF EXISTS "Admin full access" ON admin_users;
CREATE POLICY "Admin full access" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Public read access for services, portfolio, testimonials
DROP POLICY IF EXISTS "Public read services" ON services;
CREATE POLICY "Public read services" ON services FOR SELECT USING (services.is_active = true);

DROP POLICY IF EXISTS "Admin manage services" ON services;
CREATE POLICY "Admin manage services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

DROP POLICY IF EXISTS "Public read portfolio" ON portfolio_projects;
CREATE POLICY "Public read portfolio" ON portfolio_projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage portfolio" ON portfolio_projects;
CREATE POLICY "Admin manage portfolio" ON portfolio_projects FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (testimonials.status = 'active');

DROP POLICY IF EXISTS "Admin manage testimonials" ON testimonials;
CREATE POLICY "Admin manage testimonials" ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Contact submissions - insert for public, full access for admin
DROP POLICY IF EXISTS "Public insert contacts" ON contact_submissions;
CREATE POLICY "Public insert contacts" ON contact_submissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin read contacts" ON contact_submissions;
CREATE POLICY "Admin read contacts" ON contact_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

DROP POLICY IF EXISTS "Admin update contacts" ON contact_submissions;
CREATE POLICY "Admin update contacts" ON contact_submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Chat - public can insert sessions/messages, admin can read/manage
DROP POLICY IF EXISTS "Public chat sessions" ON chat_sessions;
CREATE POLICY "Public chat sessions" ON chat_sessions FOR ALL USING (true);

DROP POLICY IF EXISTS "Public chat messages" ON chat_messages;
CREATE POLICY "Public chat messages" ON chat_messages FOR ALL USING (true);

-- Page views - public can insert, admin can read
DROP POLICY IF EXISTS "Public insert page views" ON page_views;
CREATE POLICY "Public insert page views" ON page_views FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin read page views" ON page_views;
CREATE POLICY "Admin read page views" ON page_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Blog posts - public read published, admin manage all
DROP POLICY IF EXISTS "Public read blog" ON blog_posts;
CREATE POLICY "Public read blog" ON blog_posts FOR SELECT USING (blog_posts.published = true);

DROP POLICY IF EXISTS "Admin manage blog" ON blog_posts;
CREATE POLICY "Admin manage blog" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Blog tags - public read, admin manage
DROP POLICY IF EXISTS "Public read tags" ON blog_tags;
CREATE POLICY "Public read tags" ON blog_tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage tags" ON blog_tags;
CREATE POLICY "Admin manage tags" ON blog_tags FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

DROP POLICY IF EXISTS "Public read post tags" ON blog_post_tags;
CREATE POLICY "Public read post tags" ON blog_post_tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage post tags" ON blog_post_tags;
CREATE POLICY "Admin manage post tags" ON blog_post_tags FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Media library - admin only
DROP POLICY IF EXISTS "Admin manage media" ON media_library;
CREATE POLICY "Admin manage media" ON media_library FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Site settings - public read, admin manage
DROP POLICY IF EXISTS "Public read settings" ON site_settings;
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage settings" ON site_settings;
CREATE POLICY "Admin manage settings" ON site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'admin')
);
