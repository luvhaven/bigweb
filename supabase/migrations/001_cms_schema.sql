-- BigWeb Digital - COMPREHENSIVE CMS Database Schema
-- This schema covers ALL current website content + future features
-- Run this in Supabase SQL Editor

-- ============================================
-- CLEANUP: Drop ALL pre-existing CMS tables
-- ============================================
DROP TABLE IF EXISTS public.activity_log CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.scheduled_content CASCADE;
DROP TABLE IF EXISTS public.ab_test_variants CASCADE;
DROP TABLE IF EXISTS public.footer_sections CASCADE;
DROP TABLE IF EXISTS public.navigation_menus CASCADE;
DROP TABLE IF EXISTS public.email_templates CASCADE;
DROP TABLE IF EXISTS public.code_snippets CASCADE;
DROP TABLE IF EXISTS public.redirects CASCADE;
DROP TABLE IF EXISTS public.job_postings CASCADE;
DROP TABLE IF EXISTS public.banner_notifications CASCADE;
DROP TABLE IF EXISTS public.popups CASCADE;
DROP TABLE IF EXISTS public.form_configurations CASCADE;
DROP TABLE IF EXISTS public.case_studies CASCADE;
DROP TABLE IF EXISTS public.awards CASCADE;
DROP TABLE IF EXISTS public.press_mentions CASCADE;
DROP TABLE IF EXISTS public.client_logos CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.certifications CASCADE;
DROP TABLE IF EXISTS public.office_locations CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.pricing_tiers CASCADE;
DROP TABLE IF EXISTS public.media_library CASCADE;
DROP TABLE IF EXISTS public.cta_sections CASCADE;
DROP TABLE IF EXISTS public.statistics CASCADE;
DROP TABLE IF EXISTS public.features CASCADE;
DROP TABLE IF EXISTS public.service_pages CASCADE;
DROP TABLE IF EXISTS public.hero_sections CASCADE;
DROP TABLE IF EXISTS public.page_content CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.legal_pages CASCADE;

-- ============================================
-- PART 1: CORE SITE CONFIGURATION
-- ============================================

-- 1. SITE SETTINGS (Expanded)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    description TEXT,
    data_type VARCHAR(20) DEFAULT 'string', -- string, number, boolean, json, color, url
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id),
    CONSTRAINT unique_category_key UNIQUE (category, setting_key)
);

-- Comprehensive default settings
INSERT INTO public.site_settings (category, setting_key, setting_value, description, data_type) VALUES
-- General
('general', 'site_name', '"BigWeb Digital"', 'Website name', 'string'),
('general', 'site_tagline', '"Premium Web Solutions"', 'Site tagline', 'string'),
('general', 'site_description', '"Elite web development, mobile apps, and AI consulting for ambitious brands"', 'Meta description', 'string'),
('general', 'company_legal_name', '"BigWeb Digital Ltd."', 'Legal company name', 'string'),
('general', 'founded_year', '2017', 'Company founding year', 'number'),
('general', 'company_email', '"hello@bigwebdigital.com"', 'Primary contact email', 'string'),
('general', 'support_email', '"support@bigwebdigital.com"', 'Support email', 'string'),
('general', 'company_phone', '"+234 703 057 6537"', 'Primary phone number', 'string'),
('general', 'company_address', '"Global Presence: North America, Europe, Asia & Africa"', 'Company address', 'string'),
('general', 'logo_url', '"/logo.svg"', 'Logo file path', 'url'),
('general', 'logo_light_url', '"/logo-light.svg"', 'Light mode logo', 'url'),
('general', 'logo_dark_url', '"/logo-dark.svg"', 'Dark mode logo', 'url'),
('general', 'favicon_url', '"/favicon.ico"', 'Favicon path', 'url'),
('general', 'apple_touch_icon', '"/apple-touch-icon.png"', 'Apple touch icon', 'url'),

-- Social Media
('social', 'facebook_url', '"https://facebook.com/bigwebdigital"', 'Facebook page URL', 'url'),
('social', 'twitter_url', '"https://twitter.com/bigwebdigital"', 'Twitter URL', 'url'),
('social', 'instagram_url', '"https://instagram.com/bigwebdigital"', 'Instagram URL', 'url'),
('social', 'linkedin_url', '"https://linkedin.com/company/bigweb-digital"', 'LinkedIn URL', 'url'),
('social', 'youtube_url', '""', 'YouTube channel', 'url'),
('social', 'github_url', '""', 'GitHub profile', 'url'),

-- SEO
('seo', 'default_og_image', '"/og-image.jpg"', 'Default Open Graph image', 'url'),
('seo', 'twitter_card_type', '"summary_large_image"', 'Twitter card type', 'string'),
('seo', 'google_analytics_id', '""', 'Google Analytics tracking ID', 'string'),
('seo', 'google_tag_manager_id', '""', 'GTM ID', 'string'),
('seo', 'google_site_verification', '""', 'Google site verification code', 'string'),
('seo', 'bing_verification', '""', 'Bing verification', 'string'),
('seo', 'robots_txt_custom', '""', 'Custom robots.txt content', 'string'),
('seo', 'sitemap_enabled', 'true', 'Auto-generate sitemap', 'boolean'),

-- Features
('features', 'chatbot_enabled', 'true', 'AI Chatbot enabled', 'boolean'),
('features', 'newsletter_enabled', 'true', 'Newsletter subscription enabled', 'boolean'),
('features', 'contact_form_enabled', 'true', 'Contact form enabled', 'boolean'),
('features', 'live_chat_enabled', 'false', 'Live chat widget', 'boolean'),
('features', 'cookie_consent_enabled', 'true', 'Cookie consent banner', 'boolean'),
('features', 'maintenance_mode', 'false', 'Maintenance mode', 'boolean'),
('features', 'coming_soon_mode', 'false', 'Coming soon mode', 'boolean'),

-- Appearance
('appearance', 'primary_color', '"#10b981"', 'Primary brand color (emerald)', 'color'),
('appearance', 'secondary_color', '"#06b6d4"', 'Secondary color (cyan)', 'color'),
('appearance', 'accent_color', '"#8b5cf6"', 'Accent color (purple)', 'color'),
('appearance', 'font_heading', '"Inter"', 'Heading font', 'string'),
('appearance', 'font_body', '"Inter"', 'Body font', 'string'),
('appearance', 'dark_mode_default', 'true', 'Default to dark mode', 'boolean'),
('appearance', 'header_透明', 'false', 'Transparent header', 'boolean'),

-- Integrations
('integrations', 'stripe_publishable_key', '""', 'Stripe public key', 'string'),
('integrations', 'mailchimp_api_key', '""', 'Mailchimp API', 'string'),
('integrations', 'sendgrid_api_key', '""', 'SendGrid API', 'string'),
('integrations', 'slack_webhook_url', '""', 'Slack notifications', 'url'),
('integrations', 'zapier_webhook', '""', 'Zapier webhook', 'url'),

-- Performance
('performance', 'image_optimization', 'true', 'Auto-optimize images', 'boolean'),
('performance', 'lazy_load_images', 'true', 'Lazy load images', 'boolean'),
('performance', 'enable_caching', 'true', 'Enable caching', 'boolean'),
('performance', 'cache_ttl', '3600', 'Cache TTL (seconds)', 'number')
ON CONFLICT (setting_key) DO NOTHING;

-- ============================================
-- PART 2: CONTENT MANAGEMENT
-- ============================================

-- 2. PAGE CONTENT (Dynamic Pages)
CREATE TABLE IF NOT EXISTS public.page_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    meta_title VARCHAR(200),
    meta_description TEXT,
    meta_keywords TEXT,
    og_image VARCHAR(500),
    og_type VARCHAR(50) DEFAULT 'website',
    canonical_url VARCHAR(500),
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    custom_css TEXT,
    custom_js TEXT,
    schema_markup JSONB,
    published BOOLEAN DEFAULT true,
    scheduled_publish TIMESTAMP WITH TIME ZONE,
    parent_page_id UUID REFERENCES public.page_content(id),
    sort_order INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS idx_page_content_slug ON public.page_content(slug);
CREATE INDEX IF NOT EXISTS idx_page_content_published ON public.page_content(published, scheduled_publish);

-- 3. HERO SECTIONS (All hero content)
CREATE TABLE IF NOT EXISTS public.hero_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    highlight VARCHAR(200),
    subtitle TEXT,
    description TEXT,
    background_image VARCHAR(500),
    background_video VARCHAR(500),
    background_color VARCHAR(50),
    overlay_opacity DECIMAL(3,2) DEFAULT 0.5,
    cta_primary_text VARCHAR(100),
    cta_primary_url VARCHAR(200),
    cta_secondary_text VARCHAR(100),
    cta_secondary_url VARCHAR(200),
    theme_color VARCHAR(50) DEFAULT 'emerald',
    pattern VARCHAR(50) DEFAULT 'Grid',
    badge_text VARCHAR(100),
    badge_icon VARCHAR(50),
    trust_indicators JSONB DEFAULT '[]'::jsonb,
    stats JSONB DEFAULT '[]'::jsonb,
    animation_type VARCHAR(50) DEFAULT 'fade',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hero_sections_page_slug ON public.hero_sections(page_slug);

-- 4. SERVICE PAGES (Complete service management)
CREATE TABLE IF NOT EXISTS public.service_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    highlight VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    theme_color VARCHAR(50) DEFAULT 'blue',
    pattern VARCHAR(50) DEFAULT 'Grid',
    badge_text VARCHAR(100),
    icon VARCHAR(50),
    featured BOOLEAN DEFAULT false,
    features JSONB DEFAULT '[]'::jsonb,
    process_steps JSONB DEFAULT '[]'::jsonb,
    faqs JSONB DEFAULT '[]'::jsonb,
    case_studies JSONB DEFAULT '[]'::jsonb,
    pricing JSONB,
    related_services JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    deliverables JSONB DEFAULT '[]'::jsonb,
    timeline_weeks INTEGER,
    starting_price DECIMAL(10,2),
    published BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_pages_slug ON public.service_pages(slug);
CREATE INDEX IF NOT EXISTS idx_service_pages_featured ON public.service_pages(featured, published);

-- 5. FEATURES/BENEFITS (Reusable feature items)
CREATE TABLE IF NOT EXISTS public.features (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(50),
    page_slug VARCHAR(100),
    image_url VARCHAR(500),
    link_url VARCHAR(200),
    link_text VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. STATISTICS/METRICS (Dynamic stats displays)
CREATE TABLE IF NOT EXISTS public.statistics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(50) NOT NULL,
    suffix VARCHAR(20), -- +, %, etc
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(50),
    display_location VARCHAR(100), -- homepage-hero, about-page, etc
    animation_type VARCHAR(50) DEFAULT 'countup',
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CALL-TO-ACTION SECTIONS
CREATE TABLE IF NOT EXISTS public.cta_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    button_text VARCHAR(100),
    button_url VARCHAR(200),
    button_style VARCHAR(50) DEFAULT 'primary',
    background_type VARCHAR(50), -- solid, gradient, image
    background_value TEXT,
    display_locations JSONB DEFAULT '[]'::jsonb,
    active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PART 3: MEDIA & ASSETS
-- ============================================

-- 8. MEDIA LIBRARY (Comprehensive file management)
CREATE TABLE IF NOT EXISTS public.media_library (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_file_name VARCHAR(255),
    file_url VARCHAR(500) NOT NULL UNIQUE,
    thumbnail_url VARCHAR(500),
    file_type VARCHAR(50) NOT NULL, -- image, video, document, audio
    mime_type VARCHAR(100),
    file_size INTEGER, -- in bytes
    width INTEGER,
    height INTEGER,
    duration INTEGER, -- for videos/audio in seconds
    alt_text TEXT,
    caption TEXT,
    description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    folder VARCHAR(100) DEFAULT 'uploads',
    is_public BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_library_folder ON public.media_library(folder);
CREATE INDEX IF NOT EXISTS idx_media_library_type ON public.media_library(file_type);

-- ============================================
-- PART 4: E-COMMERCE & PRICING
-- ============================================

-- 9. PRICING TIERS (Dynamic pricing tables)
CREATE TABLE IF NOT EXISTS public.pricing_tiers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_slug VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(200),
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    billing_period VARCHAR(50), -- monthly, yearly, one-time
    currency VARCHAR(3) DEFAULT 'USD',
    description TEXT,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    limitations JSONB DEFAULT '[]'::jsonb,
    highlighted BOOLEAN DEFAULT false,
    most_popular BOOLEAN DEFAULT false,
    cta_text VARCHAR(100) DEFAULT 'Get Started',
    cta_url VARCHAR(200),
    badge_text VARCHAR(50),
    badge_color VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    stripe_price_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pricing_tiers_page ON public.pricing_tiers(page_slug);

-- ============================================
-- PART 5: TEAM & COMPANY
-- ============================================

-- 10. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    bio TEXT,
    photo_url VARCHAR(500),
    email VARCHAR(100),
    phone VARCHAR(50),
    linkedin_url VARCHAR(200),
    twitter_url VARCHAR(200),
    github_url VARCHAR(200),
    skills JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    joined_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. OFFICE LOCATIONS
CREATE TABLE IF NOT EXISTS public.office_locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address_line1 VARCHAR(200),
    address_line2 VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(50),
    email VARCHAR(100),
    is_headquarters BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. CERTIFICATIONS & BADGES
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    issuer VARCHAR(100),
    badge_image_url VARCHAR(500),
    verification_url VARCHAR(200),
    issued_date DATE,
    expiry_date DATE,
    description TEXT,
    display_on_pages JSONB DEFAULT '["about", "homepage"]'::jsonb,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. TESTIMONIALS (Complete testimonials management)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_role VARCHAR(100),
    client_company VARCHAR(100),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    video_url VARCHAR(500),
    company_logo VARCHAR(500),
    avatar_url VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    service_category VARCHAR(50),
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(featured, published);
CREATE INDEX IF NOT EXISTS idx_testimonials_category ON public.testimonials(service_category);

-- 14. CLIENT LOGOS
CREATE TABLE IF NOT EXISTS public.client_logos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(500) NOT NULL,
    logo_dark_url VARCHAR(500),
    website_url VARCHAR(200),
    industry VARCHAR(50),
    featured BOOLEAN DEFAULT false,
    testimonial_id UUID REFERENCES public.testimonials(id),
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PART 6: CONTENT & MARKETING
-- ============================================

-- 14. PRESS MENTIONS
CREATE TABLE IF NOT EXISTS public.press_mentions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    publication_name VARCHAR(100) NOT NULL,
    article_title VARCHAR(200),
    article_url VARCHAR(500),
    logo_url VARCHAR(500),
    published_date DATE,
    excerpt TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. AWARDS
CREATE TABLE IF NOT EXISTS public.awards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    award_name VARCHAR(100) NOT NULL,
    awarding_body VARCHAR(100),
    year INTEGER,
    category VARCHAR(100),
    description TEXT,
    badge_image_url VARCHAR(500),
    proof_url VARCHAR(500),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. CASE STUDIES
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    client_name VARCHAR(100),
    client_logo_url VARCHAR(500),
    industry VARCHAR(50),
    hero_image_url VARCHAR(500),
    challenge TEXT,
    solution TEXT,
    results TEXT,
    metrics JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    timeline_weeks INTEGER,
    testimonial_quote TEXT,
    testimonial_author VARCHAR(100),
    testimonial_role VARCHAR(100),
    gallery_images JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    published_date DATE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies(slug);

-- ============================================
-- PART 7: FORMS & USER INTERACTION
-- ============================================

-- 17. FORM CONFIGURATIONS
CREATE TABLE IF NOT EXISTS public.form_configurations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    form_name VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(200),
    description TEXT,
    fields JSONB NOT NULL, -- field definitions
    submit_button_text VARCHAR(50) DEFAULT 'Submit',
    success_message TEXT,
    error_message TEXT,
    redirect_url VARCHAR(200),
    email_notifications JSONB, -- who to notify
    webhook_url VARCHAR(500),
    active BOOLEAN DEFAULT true,
    spam_protection BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. POPUPS & MODALS
CREATE TABLE IF NOT EXISTS public.popups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(200),
    content TEXT,
    cta_text VARCHAR(100),
    cta_url VARCHAR(200),
    trigger_type VARCHAR(50), -- exit-intent, scroll, timer, manual
    trigger_value INTEGER, -- % scroll, seconds, etc
    display_pages JSONB DEFAULT '[]'::jsonb,
    frequency VARCHAR(50) DEFAULT 'once', -- once, daily, always
    priority INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19. BANNER NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.banner_notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- info, warning, success, error, promotion
    link_text VARCHAR(100),
    link_url VARCHAR(200),
    background_color VARCHAR(50),
    text_color VARCHAR(50),
    dismissible BOOLEAN DEFAULT true,
    display_pages JSONB DEFAULT '[]'::jsonb,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    priority INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PART 8: CAREERS & RECRUITMENT
-- ============================================

-- 20. JOB POSTINGS
CREATE TABLE IF NOT EXISTS public.job_postings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(50),
    location VARCHAR(100),
    employment_type VARCHAR(50), -- full-time, part-time, contract, remote
    salary_range VARCHAR(100),
    description TEXT,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    application_url VARCHAR(500),
    application_email VARCHAR(100),
    posted_date DATE DEFAULT CURRENT_DATE,
    closing_date DATE,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_postings_slug ON public.job_postings(slug);

-- ============================================
-- PART 9: SEO & TECHNICAL
-- ============================================

-- 21. REDIRECTS
CREATE TABLE IF NOT EXISTS public.redirects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    from_path VARCHAR(500) NOT NULL UNIQUE,
    to_path VARCHAR(500) NOT NULL,
    redirect_type INTEGER DEFAULT 301, -- 301 permanent, 302 temporary
    active BOOLEAN DEFAULT true,
    hit_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 22. CUSTOM CODE SNIPPETS
CREATE TABLE IF NOT EXISTS public.code_snippets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code TEXT NOT NULL,
    snippet_type VARCHAR(50), -- header, footer, body
    placement VARCHAR(50), -- before-head-close, after-body-open, etc
    display_pages JSONB DEFAULT '[]'::jsonb,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 23. EMAIL TEMPLATES
CREATE TABLE IF NOT EXISTS public.email_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    template_name VARCHAR(100) NOT NULL UNIQUE,
    subject VARCHAR(200),
    html_content TEXT,
    text_content TEXT,
    variables JSONB DEFAULT '[]'::jsonb,
    category VARCHAR(50),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 24. NAVIGATION MENUS
CREATE TABLE IF NOT EXISTS public.navigation_menus (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    menu_location VARCHAR(50) NOT NULL, -- header, footer, mobile, sidebar
    label VARCHAR(100) NOT NULL,
    url VARCHAR(200) NOT NULL,
    parent_id UUID REFERENCES public.navigation_menus(id),
    sort_order INTEGER DEFAULT 0,
    icon VARCHAR(50),
    description TEXT,
    open_new_tab BOOLEAN DEFAULT false,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_navigation_menus_location ON public.navigation_menus(menu_location, sort_order);

-- 25. FOOTER SECTIONS
CREATE TABLE IF NOT EXISTS public.footer_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_title VARCHAR(100),
    section_type VARCHAR(50), -- links, text, newsletter, social
    content JSONB NOT NULL,
    column_position INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PART 10: ADVANCED FEATURES
-- ============================================

-- 26. A/B TEST VARIANTS
CREATE TABLE IF NOT EXISTS public.ab_test_variants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    test_name VARCHAR(100) NOT NULL,
    variant_name VARCHAR(50) NOT NULL,
    page_slug VARCHAR(100),
    element_selector VARCHAR(200),
    modified_content JSONB,
    traffic_percentage INTEGER DEFAULT 50,
    impressions INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 27. SCHEDULED CONTENT
CREATE TABLE IF NOT EXISTS public.scheduled_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_type VARCHAR(50), -- blog_post, page, banner, etc
    content_id UUID,
    action VARCHAR(50), -- publish, unpublish, update
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    executed BOOLEAN DEFAULT false,
    executed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 28. USER ROLES & PERMISSIONS (Admin users)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    role VARCHAR(50) DEFAULT 'editor', -- admin, editor, viewer
    permissions JSONB DEFAULT '[]'::jsonb,
    last_login TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 29. ACTIVITY LOG
CREATE TABLE IF NOT EXISTS public.activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_user ON public.activity_log(user_id, created_at DESC);

-- 30. LEGAL PAGES CONTENT
CREATE TABLE IF NOT EXISTS public.legal_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_type VARCHAR(50) NOT NULL UNIQUE, -- privacy, terms, cookies
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    last_updated DATE DEFAULT CURRENT_DATE,
    version VARCHAR(20),
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cta_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.office_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.press_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.popups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_test_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_pages ENABLE ROW LEVEL SECURITY;

-- Public read policies for all content tables
CREATE POLICY "Public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.page_content FOR SELECT USING (published = true);
CREATE POLICY "Public read" ON public.hero_sections FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.service_pages FOR SELECT USING (published = true);
CREATE POLICY "Public read" ON public.features FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.statistics FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.cta_sections FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.media_library FOR SELECT USING (is_public = true);
CREATE POLICY "Public read" ON public.pricing_tiers FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.team_members FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.office_locations FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.certifications FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public read" ON public.client_logos FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.press_mentions FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.awards FOR SELECT USING (true);
CREATE POLICY "Public read" ON public.case_studies FOR SELECT USING (published = true);
CREATE POLICY "Public read" ON public.form_configurations FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.popups FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.banner_notifications FOR SELECT USING (active = true AND (start_date IS NULL OR start_date <= NOW()) AND (end_date IS NULL OR end_date >= NOW()));
CREATE POLICY "Public read" ON public.job_postings FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.redirects FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.navigation_menus FOR SELECT USING (enabled = true);
CREATE POLICY "Public read" ON public.footer_sections FOR SELECT USING (active = true);
CREATE POLICY "Public read" ON public.legal_pages FOR SELECT USING (published = true);

-- Admin write policies (authenticated users)
CREATE POLICY "Admin full access" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.page_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.hero_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.service_pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.statistics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.cta_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.media_library FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.pricing_tiers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.office_locations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.client_logos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.press_mentions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.awards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.case_studies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.form_configurations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.popups FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.banner_notifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.job_postings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.redirects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.code_snippets FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.email_templates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.navigation_menus FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.footer_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.ab_test_variants FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.scheduled_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.admin_users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.activity_log FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON public.legal_pages FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_site_settings_timestamp BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_content_timestamp BEFORE UPDATE ON public.page_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_sections_timestamp BEFORE UPDATE ON public.hero_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_pages_timestamp BEFORE UPDATE ON public.service_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_library_timestamp BEFORE UPDATE ON public.media_library FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_timestamp BEFORE UPDATE ON public.pricing_tiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_legal_pages_timestamp BEFORE UPDATE ON public.legal_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Activity logging function
CREATE OR REPLACE FUNCTION log_admin_activity()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.activity_log (user_id, action, table_name, record_id, changes)
    VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMPREHENSIVE INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_features_category ON public.features(category, active);
CREATE INDEX IF NOT EXISTS idx_statistics_location ON public.statistics(display_location, active);
CREATE INDEX IF NOT EXISTS idx_team_featured ON public.team_members(featured, active);
CREATE INDEX IF NOT EXISTS idx_client_logos_featured ON public.client_logos(featured, active);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON public.case_studies(featured, published);
CREATE INDEX IF NOT EXISTS idx_job_postings_active ON public.job_postings(active, posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_banner_dates ON public.banner_notifications(active, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_scheduled_content_time ON public.scheduled_content(executed, scheduled_time);
