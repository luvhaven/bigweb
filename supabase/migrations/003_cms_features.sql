-- =====================================================
-- BigWeb CMS - Enhanced Schema for Full CMS Features
-- =====================================================

-- Blog Categories
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB,
  featured_image TEXT,
  author_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMPTZ,
  category_id UUID REFERENCES blog_categories(id),
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  read_time INTEGER,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero Slides
CREATE TABLE hero_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  cta_primary_text TEXT,
  cta_primary_link TEXT,
  cta_secondary_text TEXT,
  cta_secondary_link TEXT,
  order_index INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  background_color TEXT,
  text_color TEXT,
  animation_style TEXT DEFAULT 'fade',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enhanced Projects (Portfolio)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS case_study JSONB;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS technologies TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS metrics JSONB;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured_video TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT;

-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_at TIMESTAMPTZ,
  replied_by UUID REFERENCES profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Sessions
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  visitor_id TEXT NOT NULL,
  visitor_name TEXT,
  visitor_email TEXT,
  visitor_info JSONB,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'waiting', 'closed')),
  assigned_to UUID REFERENCES profiles(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- Chat Messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('visitor', 'agent')),
  sender_id TEXT,
  message TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Sections (for Page Builder)
CREATE TABLE page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  content JSONB NOT NULL,
  order_index INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  custom_css TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navigation Items
CREATE TABLE navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_id UUID REFERENCES navigation(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES navigation_items(id),
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  order_index INTEGER NOT NULL,
  is_external BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX idx_hero_slides_order ON hero_slides(order_index);
CREATE INDEX idx_hero_slides_active ON hero_slides(is_active);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX idx_chat_sessions_assigned ON chat_sessions(assigned_to);
CREATE INDEX idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX idx_page_sections_page ON page_sections(page_id);
CREATE INDEX idx_navigation_items_menu ON navigation_items(menu_id);

-- RLS Policies
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- Blog policies
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins and editors can manage blog posts" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Hero policies
CREATE POLICY "Active hero slides are viewable by everyone" ON hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage hero slides" ON hero_slides FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Contact policies
CREATE POLICY "Admins can view contact submissions" ON contact_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);
CREATE POLICY "Anyone can create contact submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Chat policies
CREATE POLICY "Agents can view assigned chats" ON chat_sessions FOR SELECT USING (
  assigned_to = auth.uid() OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Chat messages viewable by session participants" ON chat_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM chat_sessions 
    WHERE id = session_id 
    AND (assigned_to = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  )
);

-- Triggers
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON hero_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_sections_updated_at BEFORE UPDATE ON page_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_items_updated_at BEFORE UPDATE ON navigation_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
