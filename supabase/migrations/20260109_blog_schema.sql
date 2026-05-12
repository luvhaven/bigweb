-- =====================================================
-- BIGWEB DIGITAL: BLOG SCHEMA
-- =====================================================

-- 1. CMS BLOG CATEGORIES
CREATE TABLE IF NOT EXISTS cms_blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cms_blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Categories" ON cms_blog_categories FOR SELECT USING (true);


-- 2. CMS BLOG POSTS
CREATE TABLE IF NOT EXISTS cms_blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT, -- Markdown or HTML
  cover_image_url TEXT,
  author_name TEXT,
  author_avatar_url TEXT,
  reading_time_minutes INTEGER,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  category_id UUID REFERENCES cms_blog_categories(id),
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cms_blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Published Posts" ON cms_blog_posts 
    FOR SELECT USING (is_published = true AND published_at <= NOW());


-- 3. SEED CATEGORIES
INSERT INTO cms_blog_categories (name, slug, sort_order) VALUES
('Conversion Optimization', 'cro', 1),
('Design Psychology', 'design-psychology', 2),
('Engineering', 'engineering', 3),
('Case Studies', 'case-studies', 4)
ON CONFLICT (slug) DO NOTHING;


-- 4. SEED POSTS (Dummy Data)
DO $$
DECLARE
    cat_cro UUID;
    cat_design UUID;
BEGIN
    SELECT id INTO cat_cro FROM cms_blog_categories WHERE slug = 'cro';
    SELECT id INTO cat_design FROM cms_blog_categories WHERE slug = 'design-psychology';

    INSERT INTO cms_blog_posts (
        title, slug, excerpt, content, cover_image_url, author_name, reading_time_minutes, is_published, published_at, category_id, is_featured
    ) VALUES (
        'Why Your "Pretty" Website is Losing Money',
        'pretty-website-losing-money',
        'Aesthetics without strategy is just art. Learn why functional design out-converts pretty design every time.',
        '# The Trap of Aesthetics\n\nMost business owners prioritize how their website *looks* over how it *works*. They want sleek animations, complex layouts, and "wow" factors.\n\nBut here is the truth: **Confusion kills conversion.**\n\n## The cognitive load problem\n\nWhen a user visits your site, they have a limited amount of cognitive energy. If they have to spend that energy figuring out how to navigate your "innovative" menu, they have less energy to make a buying decision.\n\n### What to do instead\n\n1. **Clarity over cleverness.**\n2. **Standard navigation patterns.**\n3. **High contrast for readability.**\n\nStop trying to win design awards. Start trying to win customers.',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
        'Alex Rivera',
        5,
        true,
        NOW(),
        cat_design,
        true
    ) ON CONFLICT (slug) DO NOTHING;

    INSERT INTO cms_blog_posts (
        title, slug, excerpt, content, cover_image_url, author_name, reading_time_minutes, is_published, published_at, category_id, is_featured
    ) VALUES (
        'The 3-Step Funnel Fix for SaaS Companies',
        'saas-funnel-fix',
        'SaaS landing pages often fail because they focus on features, not outcomes. Here is the fix.',
        '# Stop Selling Features\n\nYour users do not care about your tech stack. They care about their problems.\n\n## The Protocol\n\n1. **Identify the Pain**: Start with the problem you solve.\n2. **Agitate the Pain**: Remind them why it hurts.\n3. **Present the Solution**: Show how you make it go away.\n\nThis simple framework has increased conversion rates by up to 300% for our clients.',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
        'Sarah Jenkins',
        7,
        true,
        NOW(),
        cat_cro,
        false
    ) ON CONFLICT (slug) DO NOTHING;
END $$;
