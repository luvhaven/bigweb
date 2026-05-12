-- ================================================================
-- CONTENT MANAGEMENT SCHEMA
-- ================================================================

-- ================================================================
-- SERVICES
-- ================================================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    icon TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    pricing_model TEXT CHECK (pricing_model IN ('fixed', 'hourly', 'custom')),
    starting_price DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_order ON services(order_index);

-- ================================================================
-- PORTFOLIO PROJECTS
-- ================================================================
CREATE TABLE portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_logo UUID REFERENCES media_library(id),
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    challenge TEXT,
    solution TEXT,
    results TEXT,
    featured_image UUID REFERENCES media_library(id),
    gallery_images UUID[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    completion_date DATE,
    project_duration TEXT,
    team_size INTEGER,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX idx_portfolio_featured ON portfolio_projects(is_featured);
CREATE INDEX idx_portfolio_published ON portfolio_projects(is_published);

-- ================================================================
-- TESTIMONIALS
-- ================================================================
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_role TEXT NOT NULL,
    client_company TEXT NOT NULL,
    client_image UUID REFERENCES media_library(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    result_metric TEXT,
    project_id UUID REFERENCES portfolio_projects(id),
    is_featured BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'archived')),
    order_index INTEGER DEFAULT 0,
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);

-- ================================================================
-- BLOG CATEGORIES
-- ================================================================
CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- BLOG TAGS
-- ================================================================
CREATE TABLE blog_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- BLOG POSTS
-- ================================================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image UUID REFERENCES media_library(id),
    category_id UUID REFERENCES blog_categories(id),
    author_id UUID REFERENCES admin_users(id) NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
    published_at TIMESTAMPTZ,
    scheduled_for TIMESTAMPTZ,
    reading_time INTEGER,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    allow_comments BOOLEAN DEFAULT true,
    meta_title TEXT,
    meta_description TEXT,
    og_image UUID REFERENCES media_library(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_status ON blog_posts(status);
CREATE INDEX idx_blog_category ON blog_posts(category_id);
CREATE INDEX idx_blog_author ON blog_posts(author_id);
CREATE INDEX idx_blog_published ON blog_posts(published_at DESC);

-- ================================================================
-- BLOG POST TAGS (junction table)
-- ================================================================
CREATE TABLE blog_post_tags (
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    blog_tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_post_id, blog_tag_id)
);

-- ================================================================
-- PAGES (Dynamic Page Builder)
-- ================================================================
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    template TEXT DEFAULT 'default',
    sections JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    og_image UUID REFERENCES media_library(id),
    custom_css TEXT,
    custom_js TEXT,
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);

-- ================================================================
-- RLS POLICIES
-- ================================================================

-- Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active services" ON services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage services" ON services
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- Portfolio
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published projects" ON portfolio_projects
    FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage projects" ON portfolio_projects
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- Testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active testimonials" ON testimonials
    FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage testimonials" ON testimonials
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- Blog
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories" ON blog_categories
    FOR SELECT USING (true);

CREATE POLICY "Public can view tags" ON blog_tags
    FOR SELECT USING (true);

CREATE POLICY "Public can view published posts" ON blog_posts
    FOR SELECT USING (status = 'published' AND published_at <= NOW());

CREATE POLICY "Admins can manage blog" ON blog_posts
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Public can view post tags" ON blog_post_tags
    FOR SELECT USING (true);

-- Pages
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published pages" ON pages
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage pages" ON pages
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- ================================================================
-- TRIGGERS
-- ================================================================

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON portfolio_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- DEFAULT DATA
-- ================================================================

-- Default blog category
INSERT INTO blog_categories (name, slug, description) VALUES
('Web Development', 'web-development', 'Articles about web development'),
('Design', 'design', 'Articles about design trends'),
('Business', 'business', 'Business and strategy articles')
ON CONFLICT DO NOTHING;
