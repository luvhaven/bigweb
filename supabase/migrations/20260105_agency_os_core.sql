-- AGENCY OS CORE MIGRATION
-- 1. Create missing tables (cms_clients, cms_video_showroom).
-- 2. Seed data for Clients, Videos, and Hero Slides.
-- 3. Establish RLS policies.

-- ==========================================
-- 1. CMS CLIENTS (Trust/Social Proof)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.cms_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    active BOOLEAN DEFAULT true, -- Legacy name was 'active', standardizing
    is_active BOOLEAN DEFAULT true, -- Dual support or standardized
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.cms_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Clients" ON public.cms_clients
    FOR SELECT USING (true);

CREATE POLICY "Admin Full Access Clients" ON public.cms_clients
    FOR ALL USING (
        (SELECT role FROM public.admin_users WHERE id = auth.uid()) IN ('admin', 'super_admin')
    );


-- ==========================================
-- 2. CMS VIDEO SHOWROOM (Showcase)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.cms_video_showroom (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    duration TEXT,
    category TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.cms_video_showroom ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Videos" ON public.cms_video_showroom
    FOR SELECT USING (true);

CREATE POLICY "Admin Full Access Videos" ON public.cms_video_showroom
    FOR ALL USING (
        (SELECT role FROM public.admin_users WHERE id = auth.uid()) IN ('admin', 'super_admin')
    );


-- ==========================================
-- 3. SEED DATA (Heroes & slides)
-- ==========================================

-- Ensure Home Hero Exists
INSERT INTO public.cms_heroes (slug, title, subtitle, description, highlight_text, cta_primary_text, cta_primary_link, media_url, stats)
VALUES (
    'home',
    'We Build Digital Empires',
    'Premium Web Development',
    'Transform your digital presence with award-winning design and engineering.',
    'Digital Empires',
    'Get Started',
    '/contact',
    '/assets/hero-conversion.png',
    '[{"label": "Satisfaction", "value": "100%"}]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Slides (Delete old to ensure clean slate if needed, or just insert)
DELETE FROM public.cms_hero_slides WHERE hero_id = (SELECT id FROM public.cms_heroes WHERE slug = 'home');

INSERT INTO public.cms_hero_slides (hero_id, title, subtitle, description, cta_text, cta_link, media_url, sort_order, is_active)
SELECT 
    id as hero_id,
    'Turn Visitors Into Customers',
    'AI-Powered Growth',
    'Stop losing sales to poor UX. We build conversion-optimized websites that turn your traffic into revenue—averaging 4x conversion increases.',
    'Get Your Free Growth Audit',
    '/contact',
    '/assets/hero-conversion.png',
    1,
    true
FROM public.cms_heroes WHERE slug = 'home';

INSERT INTO public.cms_hero_slides (hero_id, title, subtitle, description, cta_text, cta_link, media_url, sort_order, is_active)
SELECT 
    id as hero_id,
    'Dominate Your Market',
    'SEO & Performance',
    'Rank higher, load faster, and outperform competitors. Our technical SEO strategies put your brand at the top.',
    'Start Dominating',
    '/services/seo-growth',
    '/assets/hero-seo.png',
    2,
    true
FROM public.cms_heroes WHERE slug = 'home';

INSERT INTO public.cms_hero_slides (hero_id, title, subtitle, description, cta_text, cta_link, media_url, sort_order, is_active)
SELECT 
    id as hero_id,
    'Future-Proof Technology',
    'Next-Gen Development',
    'Built on the latest stack (Next.js 15, React 19). Scalable, secure, and ready for whatever the future brings.',
    'Build The Future',
    '/services/web-development',
    '/assets/hero-ai.png',
    3,
    true
FROM public.cms_heroes WHERE slug = 'home';


-- ==========================================
-- 4. SEED DATA (Clients)
-- ==========================================
DELETE FROM public.cms_clients;

INSERT INTO public.cms_clients (name, logo_url, active, is_active, sort_order)
VALUES 
('TechCorp', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', true, true, 1),
('Innovate', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', true, true, 2),
('FutureScale', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', true, true, 3),
('GlobalSystems', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', true, true, 4);


-- ==========================================
-- 5. SEED DATA (Videos)
-- ==========================================
DELETE FROM public.cms_video_showroom;

INSERT INTO public.cms_video_showroom (title, description, thumbnail_url, duration, category, featured, sort_order, is_active)
VALUES 
('Brand Transformation', 'How we helped a startup scale to $10M ARR', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', '3:45', 'Case Study', true, 1, true),
('Design Process', 'Behind the scenes of our creative workflow', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', '2:30', 'Process', false, 2, true),
('Tech Stack Demo', 'Exploring our cutting-edge development tools', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', '4:20', 'Technical', false, 3, true);
