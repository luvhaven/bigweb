-- ==============================================================================
-- ABSOLUTE MIRROR SEED SCRIPT
-- Purpose: Populate DB with EXACT values from the current Frontend (Jan 2026)
-- Target Tables: site_settings, navigation_menus, footer_sections
-- ==============================================================================

-- 1. SITE SETTINGS (Global Config)
-- ================================
INSERT INTO public.site_settings (category, setting_key, setting_value, description, data_type) VALUES
('general', 'company_phone', '"+234 703 057 6537"', 'Primary phone number', 'string'),
('general', 'company_email', '"hello@bigwebdigital.com"', 'Primary contact email', 'string'),
('general', 'company_address', '"Global Presence: NA, EU, Asia, Africa"', 'Company address text', 'string'),
('social', 'facebook_url', '"https://facebook.com/bigwebdigital"', 'Facebook URL', 'url'),
('social', 'twitter_url', '"https://twitter.com/bigwebdigital"', 'Twitter URL', 'url'),
('social', 'instagram_url', '"https://instagram.com/bigwebdigital"', 'Instagram URL', 'url'),
('social', 'linkedin_url', '"https://linkedin.com/company/bigweb-digital"', 'LinkedIn URL', 'url')
ON CONFLICT (setting_key) 
DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- 2. NAVIGATION MENUS (Header Hierarchy)
-- ======================================
-- Clean slate for header to avoid duplicates during re-runs
DELETE FROM public.navigation_menus WHERE menu_location = 'header';

DO $$
DECLARE
    nav_services UUID;
    cat_engineering UUID;
    cat_design UUID;
    cat_ai UUID;
    cat_growth UUID;
BEGIN
    -- TOP LEVEL ITEMS
    INSERT INTO public.navigation_menus (menu_location, label, url, sort_order, icon)
    VALUES ('header', 'Services', '#', 1, 'Grid') RETURNING id INTO nav_services;

    INSERT INTO public.navigation_menus (menu_location, label, url, sort_order) VALUES
    ('header', 'About', '/about', 2),
    ('header', 'Portfolio', '/portfolio', 3),
    ('header', 'Blog', '/blog', 4),
    ('header', 'Careers', '/careers', 5),
    ('header', 'Estimator', '/estimator', 6);

    -- SERVICES MEGA MENU CATEGORIES
    INSERT INTO public.navigation_menus (menu_location, label, url, parent_id, sort_order, icon)
    VALUES ('header', 'Engineering', '#', nav_services, 1, 'Code') RETURNING id INTO cat_engineering;

    INSERT INTO public.navigation_menus (menu_location, label, url, parent_id, sort_order, icon)
    VALUES ('header', 'Design & Maintenance', '#', nav_services, 2, 'Palette') RETURNING id INTO cat_design;

    INSERT INTO public.navigation_menus (menu_location, label, url, parent_id, sort_order, icon)
    VALUES ('header', 'Artificial Intelligence', '#', nav_services, 3, 'Brain') RETURNING id INTO cat_ai;

    INSERT INTO public.navigation_menus (menu_location, label, url, parent_id, sort_order, icon)
    VALUES ('header', 'Growth & Analytics', '#', nav_services, 4, 'TrendingUp') RETURNING id INTO cat_growth;

    -- SERVICE ITEMS: ENGINEERING
    INSERT INTO public.navigation_menus (menu_location, label, url, description, parent_id, sort_order, icon) VALUES
    ('header', 'Web Development', '/services/web-development', 'Custom apps & SaaS platforms.', cat_engineering, 1, 'Code'),
    ('header', 'Mobile Apps', '/services/mobile-apps', 'iOS & Android native apps.', cat_engineering, 2, 'Smartphone'),
    ('header', 'E-Commerce', '/services/ecommerce', 'High-converting online stores.', cat_engineering, 3, 'ShoppingCart'),
    ('header', 'Staff Augmentation', '/services/staff-augmentation', 'Scale your dev team instantly.', cat_engineering, 4, 'Users');

    -- SERVICE ITEMS: DESIGN & MAIN
    INSERT INTO public.navigation_menus (menu_location, label, url, description, parent_id, sort_order, icon) VALUES
    ('header', 'UI/UX Design', '/services/ui-ux-design', 'World-class interfaces.', cat_design, 1, 'Palette'),
    ('header', 'Maintenance', '/services/maintenance', '24/7 Security & Uptime.', cat_design, 2, 'Shield');

    -- SERVICE ITEMS: AI
    INSERT INTO public.navigation_menus (menu_location, label, url, description, parent_id, sort_order, icon) VALUES
    ('header', 'AI Sales Agents', '/ai-boost', '24/7 automated sales bots.', cat_ai, 1, 'Bot'),
    ('header', 'AI Consulting', '/services/ai-consulting', 'Strategic AI implementation.', cat_ai, 2, 'Brain'),
    ('header', 'GAIO Optimization', '/services/gaio', 'Rank #1 on ChatGPT search.', cat_ai, 3, 'Search');

    -- SERVICE ITEMS: GROWTH
    INSERT INTO public.navigation_menus (menu_location, label, url, description, parent_id, sort_order, icon) VALUES
    ('header', 'SEO & Growth', '/services/seo-growth', 'Dominate search rankings.', cat_growth, 1, 'TrendingUp'),
    ('header', 'Analytics', '/services/analytics', 'Data-driven insights.', cat_growth, 2, 'BarChart'),
    ('header', 'CRO & Sales', '/services/conversion-optimization', 'Turn visitors into buyers.', cat_growth, 3, 'TrendingUp');

END $$;

-- 3. FOOTER SECTIONS
-- ==================
DELETE FROM public.footer_sections;

INSERT INTO public.footer_sections (section_title, section_type, column_position, sort_order, content) VALUES
('Brand & Newsletter', 'newsletter', 1, 1, '{"text": "Stay updated"}'),
('Services', 'links', 2, 1, '[
    {"label": "Web Development", "url": "/services/web-development"},
    {"label": "Mobile Apps", "url": "/services/mobile-apps"},
    {"label": "UI/UX Design", "url": "/services/ui-ux-design"},
    {"label": "SEO & Growth", "url": "/services/seo-growth"},
    {"label": "E-Commerce", "url": "/services/ecommerce"}
]'),
('More', 'links', 2, 2, '[
    {"label": "AI Consulting", "url": "/services/ai-consulting"},
    {"label": "GAIO (AI Optimization)", "url": "/services/gaio"},
    {"label": "Staff Augmentation", "url": "/services/staff-augmentation"},
    {"label": "Website Maintenance", "url": "/services/maintenance"}
]'),
('Company', 'links', 3, 1, '[
    {"label": "About Us", "url": "/about"},
    {"label": "Portfolio", "url": "/portfolio"},
    {"label": "Careers", "url": "/careers"},
    {"label": "Blog", "url": "/blog"},
    {"label": "Contact", "url": "/contact"}
]'),
('Connect', 'links', 4, 1, '[
    {"label": "hello@bigwebdigital.com", "url": "mailto:hello@bigwebdigital.com", "icon": "Mail"},
    {"label": "+234 (703) 057-6537", "url": "tel:+2347030576537", "icon": "Phone"},
    {"label": "Global Presence", "url": "#", "icon": "MapPin", "sublabel": "NA, EU, Asia, Africa"}
]');
