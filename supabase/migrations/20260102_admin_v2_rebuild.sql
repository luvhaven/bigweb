-- MASTER MIGRATION: ADMIN 2.0 REBUILD
-- Description: Wipes legacy content schema and establishes a unified CMS structure.
-- Date: 2026-01-02

-- ==========================================
-- 1. DESTRUCTION (The Great Wipe)
-- ==========================================

-- New CMS Tables (Drop if re-running)
DROP TABLE IF EXISTS public.cms_settings CASCADE;
DROP TABLE IF EXISTS public.cms_navigation CASCADE;
DROP TABLE IF EXISTS public.cms_footer_sections CASCADE;
DROP TABLE IF EXISTS public.cms_footer_links CASCADE;
DROP TABLE IF EXISTS public.cms_heroes CASCADE;
DROP TABLE IF EXISTS public.cms_hero_slides CASCADE;
DROP TABLE IF EXISTS public.cms_services CASCADE;
DROP TABLE IF EXISTS public.cms_projects CASCADE;
DROP TABLE IF EXISTS public.cms_testimonials CASCADE;
DROP TABLE IF EXISTS public.cms_team CASCADE;
DROP TABLE IF EXISTS public.cms_leads CASCADE;

-- Legacy Tables (The Great Wipe)
DROP TABLE IF EXISTS public.hero_slides CASCADE;
DROP TABLE IF EXISTS public.hero_sections CASCADE;
DROP TABLE IF EXISTS public.navigation_items CASCADE;
DROP TABLE IF EXISTS public.navigation CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.footer_sections CASCADE;
DROP TABLE IF EXISTS public.footer_items CASCADE;
DROP TABLE IF EXISTS public.portfolio_projects CASCADE;
DROP TABLE IF EXISTS public.case_studies CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.service_features CASCADE;
DROP TABLE IF EXISTS public.pricing_tiers CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.video_showroom CASCADE;
DROP TABLE IF EXISTS public.contacts CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;

-- ==========================================
-- 2. FOUNDATION (Settings & Enums)
-- ==========================================

CREATE TABLE public.cms_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT NOT NULL DEFAULT 'BigWeb',
    site_description TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    social_links JSONB DEFAULT '{}'::jsonb, -- { "linkedin": "...", "twitter": "..." }
    features_flags JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. CORE CONTENT (Navigation & Pages)
-- ==========================================

CREATE TABLE public.cms_navigation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    url TEXT,
    parent_id UUID REFERENCES public.cms_navigation(id) ON DELETE CASCADE,
    type TEXT DEFAULT 'link', -- 'link', 'dropdown', 'mega_menu'
    icon TEXT, -- Lucide icon name
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cms_footer_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cms_footer_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.cms_footer_sections(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cms_heroes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL, -- e.g. 'home', 'services/ai'
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    highlight_text TEXT, -- Text to animate/highlight
    cta_primary_text TEXT,
    cta_primary_link TEXT,
    cta_secondary_text TEXT,
    cta_secondary_link TEXT,
    media_url TEXT, -- Background image or video
    media_type TEXT DEFAULT 'image', -- 'image', 'video'
    stats JSONB DEFAULT '[]'::jsonb, -- [{ label, value }, ...]
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Slides for Heroes that support carousels
CREATE TABLE public.cms_hero_slides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_id UUID REFERENCES public.cms_heroes(id) ON DELETE CASCADE,
    title TEXT,
    subtitle TEXT,
    description TEXT,
    media_url TEXT,
    media_type TEXT DEFAULT 'image',
    cta_text TEXT,
    cta_link TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. BUSINESS DOMAIN (Services & Projects)
-- ==========================================

CREATE TABLE public.cms_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT,
    full_description TEXT, -- Markdown
    icon TEXT,
    hero_image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb, -- List of feature strings or objects
    process_steps JSONB DEFAULT '[]'::jsonb, -- [{ title, description, icon }]
    benefits JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cms_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    client_name TEXT,
    summary TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT, -- Markdown or JSON metrics
    cover_image_url TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    live_url TEXT,
    repo_url TEXT,
    published_at TIMESTAMPTZ,
    is_featured BOOLEAN DEFAULT false,
    service_id UUID REFERENCES public.cms_services(id) ON DELETE SET NULL, -- Link to service
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. MARKETING (Testimonials, Team, Leads)
-- ==========================================

CREATE TABLE public.cms_testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    author_role TEXT,
    author_company TEXT,
    author_avatar_url TEXT,
    quote TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cms_team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cms_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    name TEXT,
    type TEXT DEFAULT 'contact', -- 'contact', 'newsletter', 'audit'
    message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb, -- Extra data like Audit URL, budget, etc.
    status TEXT DEFAULT 'new', -- 'new', 'contacted', 'archived'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 6. SECURITY (RLS & Policies)
-- ==========================================

-- Enable RLS
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_footer_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_leads ENABLE ROW LEVEL SECURITY;

-- Helper Policy: Public Read Access
CREATE POLICY "Public Read Settings" ON public.cms_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Navigation" ON public.cms_navigation FOR SELECT USING (true);
CREATE POLICY "Public Read Footer Sections" ON public.cms_footer_sections FOR SELECT USING (true);
CREATE POLICY "Public Read Footer Links" ON public.cms_footer_links FOR SELECT USING (true);
CREATE POLICY "Public Read Heroes" ON public.cms_heroes FOR SELECT USING (true);
CREATE POLICY "Public Read Hero Slides" ON public.cms_hero_slides FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.cms_services FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.cms_projects FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.cms_testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Team" ON public.cms_team FOR SELECT USING (true);

-- Helper Policy: Authenticated Admins Full Access
-- Assuming 'authenticated' role + check against public.admin_users (optional but recommended)
-- For simplicity in this script, we allow any AUTHENTICATED user (Supabase Auth) to write.
-- In production, add specific whitelist checks.
CREATE POLICY "Admin Full Access Settings" ON public.cms_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Navigation" ON public.cms_navigation FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Footer Sections" ON public.cms_footer_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Footer Links" ON public.cms_footer_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Heroes" ON public.cms_heroes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Hero Slides" ON public.cms_hero_slides FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Services" ON public.cms_services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects" ON public.cms_projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Testimonials" ON public.cms_testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Team" ON public.cms_team FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Leads" ON public.cms_leads FOR ALL USING (auth.role() = 'authenticated');

-- Triggers for Updated At
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cms_settings_modtime BEFORE UPDATE ON public.cms_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_cms_heroes_modtime BEFORE UPDATE ON public.cms_heroes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_cms_services_modtime BEFORE UPDATE ON public.cms_services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_cms_projects_modtime BEFORE UPDATE ON public.cms_projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_cms_leads_modtime BEFORE UPDATE ON public.cms_leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- End of Migration
