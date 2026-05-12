-- Create comprehensive tables for complete frontend-backend integration

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  client_company TEXT,
  client_image TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  result_metric TEXT, -- e.g., "+412% Conversions"
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  icon_type TEXT DEFAULT 'lucide', -- 'lucide', 'image', 'svg'
  features JSONB DEFAULT '[]', -- Array of feature strings
  pricing JSONB DEFAULT '{}', -- {starting_price: "5000", currency: "USD", billing: "project"}
  process_steps JSONB DEFAULT '[]', -- Array of process objects
  technologies TEXT[], -- Array of tech stack items
  case_studies UUID[], -- Array of project/portfolio IDs
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  order_index INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PORTFOLIO ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  excerpt TEXT,
  client_name TEXT,
  client_logo TEXT,
  industry TEXT,
  project_type TEXT,
  technologies TEXT[],
  featured_image TEXT,
  gallery_images TEXT[],
  video_url TEXT,
  live_url TEXT,
  github_url TEXT,
  duration TEXT, -- e.g., "3 months"
  team_size INTEGER,
  -- Metrics/Results
  metrics JSONB DEFAULT '{}', -- {roi: "+412%", traffic: "5M users", etc}
  challenge TEXT,
  solution TEXT,
  results TEXT,
  -- Testimonial (can also link to testimonials table)
  testimonial JSONB,
  -- Status
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  order_index INTEGER DEFAULT 0,
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  -- Timestamps
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TEAM MEMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image TEXT,
  email TEXT,
  phone TEXT,
  social_links JSONB DEFAULT '{}', -- {twitter: "url", linkedin: "url", github: "url"}
  skills TEXT[],
  expertise TEXT[],
  years_experience INTEGER,
  is_leadership BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- BLOG POSTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES profiles(id),
  category TEXT,
  tags TEXT[],
  read_time INTEGER, -- in minutes
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  -- Timestamps
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(order_index);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(is_featured);

CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_items(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio_items(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_published ON portfolio_items(published_at);

CREATE INDEX IF NOT EXISTS idx_team_status ON team_members(status);
CREATE INDEX IF NOT EXISTS idx_team_order ON team_members(order_index);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Testimonials policies
DROP POLICY IF EXISTS "Anyone can view active testimonials" ON testimonials;
CREATE POLICY "Anyone can view active testimonials" ON testimonials FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Admins and editors can manage testimonials" ON testimonials;
CREATE POLICY "Admins and editors can manage testimonials" ON testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Services policies
DROP POLICY IF EXISTS "Anyone can view published services" ON services;
CREATE POLICY "Anyone can view published services" ON services FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admins can manage services" ON services;
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Portfolio policies
DROP POLICY IF EXISTS "Anyone can view published portfolio items" ON portfolio_items;
CREATE POLICY "Anyone can view published portfolio items" ON portfolio_items FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admins and editors can manage portfolio" ON portfolio_items;
CREATE POLICY "Admins and editors can manage portfolio" ON portfolio_items FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Team policies
DROP POLICY IF EXISTS "Anyone can view active team members" ON team_members;
CREATE POLICY "Anyone can view active team members" ON team_members FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Admins can manage team" ON team_members;
CREATE POLICY "Admins can manage team" ON team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Blog policies
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admins and editors can manage blog" ON blog_posts;
CREATE POLICY "Admins and editors can manage blog" ON blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_portfolio_items_updated_at ON portfolio_items;
CREATE TRIGGER update_portfolio_items_updated_at BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA - TESTIMONIALS
-- =====================================================
INSERT INTO testimonials (client_name, client_role, client_company, client_image, content, rating, result_metric, is_featured, order_index) VALUES
('Sarah Chen', 'CEO', 'TechVision Inc', 'https://i.pravatar.cc/150?img=1', 'BIGWEB transformed our digital presence completely. Their attention to detail and innovative approach resulted in a 412% increase in conversions. The team''s expertise in both design and development is unmatched.', 5, '+412% Conversions', true, 1),
('Michael Rodriguez', 'VP of Marketing', 'Growth Labs', 'https://i.pravatar.cc/150?img=3', 'Working with BIGWEB was a game-changer. They didn''t just build a website; they created a growth engine. Our ROI doubled within the first quarter, and the user experience is phenomenal.', 5, '2x ROI in 3 Months', true, 2),
('Emily Watson', 'Founder', 'Quantum Dynamics', 'https://i.pravatar.cc/150?img=5', 'The level of sophistication and technical excellence BIGWEB delivers is simply outstanding. They understood our vision and brought it to life with precision and creativity that exceeded our expectations.', 5, '+250% Engagement', true, 3),
('David Kim', 'CTO', 'Innovation Hub', 'https://i.pravatar.cc/150?img=7', 'BIGWEB''s technical prowess is impressive. They built a complex platform that handles millions of users seamlessly. The code quality and architecture are enterprise-grade. Highly recommended.', 5, '5M+ Users Scaled', true, 4)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED DATA - SERVICES
-- =====================================================
INSERT INTO services (title, slug, description, short_description, icon, features, is_featured, status, order_index) VALUES
('Web Development', 'web-development', 'Build powerful, scalable web applications with cutting-edge technologies', 'Custom web solutions that drive results', 'Code', 
 '["Next.js & React Development", "Progressive Web Apps", "E-commerce Platforms", "Enterprise Web Solutions", "API Development & Integration", "Performance Optimization"]'::jsonb, 
 true, 'published', 1),
 
('Mobile App Development', 'mobile-apps', 'Native and cross-platform mobile applications that users love', 'iOS & Android apps built for success', 'Smartphone',
 '["Native iOS & Android", "React Native Development", "Flutter Applications", "App Store Optimization", "Push Notifications & Analytics", "Backend Integration"]'::jsonb,
 true, 'published', 2),
 
('AI & Machine Learning', 'ai-consulting', 'Harness the power of AI to transform your business operations', 'Intelligent solutions powered by AI', 'Brain',
 '["Custom AI Solutions", "Natural Language Processing", "Computer Vision", "Predictive Analytics", "Chatbots & Virtual Assistants", "AI Integration & Consulting"]'::jsonb,
 true, 'published', 3),
 
('SEO & Digital Marketing', 'seo', 'Get found online and convert visitors into customers', 'Drive traffic and dominate search rankings', 'TrendingUp',
 '["Search Engine Optimization", "Content Marketing", "Social Media Marketing", "PPC Campaigns", "Analytics & Reporting", "Conversion Optimization"]'::jsonb,
 true, 'published', 4),
 
('E-commerce Solutions', 'ecommerce', 'Build and scale your online store with confidence', 'Complete e-commerce platforms', 'ShoppingCart',
 '["Shopify & WooCommerce", "Custom E-commerce Platforms", "Payment Gateway Integration", "Inventory Management", "Multi-vendor Marketplaces", "Analytics & Insights"]'::jsonb,
 true, 'published', 5),
 
('UI/UX Design', 'ui-ux-design', 'Create stunning interfaces that users love to interact with', 'Beautiful designs that convert', 'Palette',
 '["User Research & Testing", "Wireframing & Prototyping", "Visual Design", "Design Systems", "Mobile & Web Design", "Accessibility (WCAG)"]'::jsonb,
 true, 'published', 6)
ON CONFLICT (slug) DO NOTHING;
