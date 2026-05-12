-- AGENCY OS: NAVIGATION & PACKAGES SEED
-- 1. Seed cms_navigation with the full menu tree (Capabilities/Services, Company, etc.)
-- 2. Create cms_growth_packages table for managing /newyear, /ai-boost, etc.

-- ==========================================
-- 1. SEED NAVIGATION
-- ==========================================
DELETE FROM public.cms_navigation;

-- 1.1 Top Level Items
INSERT INTO public.cms_navigation (id, label, url, type, sort_order)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Services', NULL, 'mega_menu', 1), -- Capabilities/Services
    ('22222222-2222-2222-2222-222222222222', 'Work', '/portfolio', 'link', 2),
    ('33333333-3333-3333-3333-333333333333', 'Company', NULL, 'dropdown', 3);

-- 1.2 "Services" Columns (Capabilities Mega Menu Groups)
INSERT INTO public.cms_navigation (id, parent_id, label, type, sort_order)
VALUES
    ('11000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Core Services', 'group', 1),
    ('11000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Growth & Marketing', 'group', 2),
    ('11000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Specialized', 'group', 3),
    ('11000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'Enterprise', 'group', 4);

-- 1.3 Service Links
-- Core Services
INSERT INTO public.cms_navigation (parent_id, label, url, type, sort_order)
VALUES
    ('11000000-0000-0000-0000-000000000001', 'Web Development', '/services/web-development', 'link', 1),
    ('11000000-0000-0000-0000-000000000001', 'UI/UX Design', '/services/ui-ux-design', 'link', 2),
    ('11000000-0000-0000-0000-000000000001', 'Mobile Apps', '/services/mobile-apps', 'link', 3);

-- Growth
INSERT INTO public.cms_navigation (parent_id, label, url, type, sort_order)
VALUES
    ('11000000-0000-0000-0000-000000000002', 'SEO & ROI', '/services/seo-growth', 'link', 1),
    ('11000000-0000-0000-0000-000000000002', 'AI Automation', '/services/ai-automation', 'link', 2),
    ('11000000-0000-0000-0000-000000000002', 'Content Strategy', '/services/content', 'link', 3);

-- Specialized
INSERT INTO public.cms_navigation (parent_id, label, url, type, sort_order)
VALUES
    ('11000000-0000-0000-0000-000000000003', 'E-Commerce', '/services/ecommerce', 'link', 1),
    ('11000000-0000-0000-0000-000000000003', 'SaaS Development', '/services/saas', 'link', 2);

-- Enterprise
INSERT INTO public.cms_navigation (parent_id, label, url, type, sort_order)
VALUES
    ('11000000-0000-0000-0000-000000000004', 'Digital Transformation', '/services/digital-transformation', 'link', 1),
    ('11000000-0000-0000-0000-000000000004', 'Cloud Architecture', '/services/cloud', 'link', 2);


-- 1.4 Company Links
INSERT INTO public.cms_navigation (parent_id, label, url, type, sort_order)
VALUES
    ('33333333-3333-3333-3333-333333333333', 'About Us', '/about', 'link', 1),
    ('33333333-3333-3333-3333-333333333333', 'Process', '/process', 'link', 2),
    ('33333333-3333-3333-3333-333333333333', 'Careers', '/careers', 'link', 3),
    ('33333333-3333-3333-3333-333333333333', 'Contact', '/contact', 'link', 4);


-- ==========================================
-- 2. GROWTH PACKAGES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.cms_growth_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price_display TEXT, -- e.g. "$4,999/mo" or "Starting at $10k"
    features JSONB DEFAULT '[]'::jsonb, -- Array of strings
    cta_text TEXT DEFAULT 'Get Started',
    cta_link TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.cms_growth_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Packages" ON public.cms_growth_packages FOR SELECT USING (true);
CREATE POLICY "Admin Full Access Packages" ON public.cms_growth_packages
    FOR ALL USING ((SELECT role FROM public.admin_users WHERE id = auth.uid()) IN ('admin', 'super_admin'));

-- Seed Packages
INSERT INTO public.cms_growth_packages (title, slug, description, price_display, features, cta_link, is_featured, sort_order)
VALUES
    ('Revenue Website', 'revenue-website', 'Convert more traffic with a high-performance site.', 'Starting at $5k', '["High Speed", "SEO Optimized", "Conversion Focused"]'::jsonb, '/revenue-website', true, 1),
    ('AI Boost', 'ai-boost', 'Automate workflows and customer support.', '$2,500 setup', '["24/7 Chatbot", "Lead Scoring", "Auto-Replies"]'::jsonb, '/ai-boost', true, 2),
    ('2026 Strategy', 'newyear', 'Full year digital roadmap and execution.', 'Custom', '["Audit", "Strategy Map", "Quarterly Reviews"]'::jsonb, '/newyear', false, 3);
