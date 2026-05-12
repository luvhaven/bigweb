-- ================================================================
-- FIX CONTENT RLS - Secure Access for Admin Dashboard
-- ================================================================

-- This migration updates RLS policies for all content tables to use
-- the secure `is_app_admin()` function, resolving "Failed to save" errors.

-- 1. PORTFOLIO
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published projects" ON portfolio_projects;
DROP POLICY IF EXISTS "Admins can manage projects" ON portfolio_projects;
DROP POLICY IF EXISTS "portfolio_select_policy" ON portfolio_projects;
DROP POLICY IF EXISTS "portfolio_modify_policy" ON portfolio_projects;

-- Allow public to see published projects OR admins to see everything
CREATE POLICY "portfolio_select_policy" ON portfolio_projects
    FOR SELECT
    USING (is_published = true OR is_app_admin());

-- Allow admins to manage (Insert/Update/Delete)
CREATE POLICY "portfolio_modify_policy" ON portfolio_projects
    FOR ALL
    USING (is_app_admin())
    WITH CHECK (is_app_admin());


-- 2. SERVICES
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active services" ON services;
DROP POLICY IF EXISTS "Admins can manage services" ON services;
DROP POLICY IF EXISTS "services_select_policy" ON services;
DROP POLICY IF EXISTS "services_modify_policy" ON services;

CREATE POLICY "services_select_policy" ON services
    FOR SELECT
    USING (is_active = true OR is_app_admin());

CREATE POLICY "services_modify_policy" ON services
    FOR ALL
    USING (is_app_admin())
    WITH CHECK (is_app_admin());


-- 3. TESTIMONIALS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON testimonials;
DROP POLICY IF EXISTS "testimonials_select_policy" ON testimonials;
DROP POLICY IF EXISTS "testimonials_modify_policy" ON testimonials;

CREATE POLICY "testimonials_select_policy" ON testimonials
    FOR SELECT
    USING (status = 'active' OR is_app_admin());

CREATE POLICY "testimonials_modify_policy" ON testimonials
    FOR ALL
    USING (is_app_admin())
    WITH CHECK (is_app_admin());


-- 4. BLOG POSTS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_select_policy" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_modify_policy" ON blog_posts;

CREATE POLICY "blog_posts_select_policy" ON blog_posts
    FOR SELECT
    USING ((status = 'published' AND published_at <= NOW()) OR is_app_admin());

CREATE POLICY "blog_posts_modify_policy" ON blog_posts
    FOR ALL
    USING (is_app_admin())
    WITH CHECK (is_app_admin());


-- 5. PAGES
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published pages" ON pages;
DROP POLICY IF EXISTS "Admins can manage pages" ON pages;
DROP POLICY IF EXISTS "pages_select_policy" ON pages;
DROP POLICY IF EXISTS "pages_modify_policy" ON pages;

CREATE POLICY "pages_select_policy" ON pages
    FOR SELECT
    USING (status = 'published' OR is_app_admin());

CREATE POLICY "pages_modify_policy" ON pages
    FOR ALL
    USING (is_app_admin())
    WITH CHECK (is_app_admin());


-- 6. BLOG CATEGORIES & TAGS (Usually public read, admin write)
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view categories" ON blog_categories;
DROP POLICY IF EXISTS "categories_select_policy" ON blog_categories;
DROP POLICY IF EXISTS "categories_modify_policy" ON blog_categories;

CREATE POLICY "categories_select_policy" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "categories_modify_policy" ON blog_categories FOR ALL USING (is_app_admin()) WITH CHECK (is_app_admin());

ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view tags" ON blog_tags;
DROP POLICY IF EXISTS "tags_select_policy" ON blog_tags;
DROP POLICY IF EXISTS "tags_modify_policy" ON blog_tags;

CREATE POLICY "tags_select_policy" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "tags_modify_policy" ON blog_tags FOR ALL USING (is_app_admin()) WITH CHECK (is_app_admin());
