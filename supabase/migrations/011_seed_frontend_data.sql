-- ================================================================
-- COMPREHENSIVE SEED DATA - Frontend Content for User doriazowan@gmail.com
-- ================================================================

-- 1. FIX CONSTRAINTS (Site Settings)
ALTER TABLE site_settings DROP CONSTRAINT IF EXISTS site_settings_category_check;
UPDATE site_settings SET category = 'general' WHERE category NOT IN ('general', 'branding', 'integrations', 'contact', 'social', 'seo');
ALTER TABLE site_settings ADD CONSTRAINT site_settings_category_check CHECK (category IN ('general', 'branding', 'integrations', 'contact', 'social', 'seo'));

-- 2. EXPAND SCHEMA & ENSURE STRUCTURE
-- Services
ALTER TABLE services ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';
ALTER TABLE services ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE services ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES admin_users(id);
ALTER TABLE services ADD COLUMN IF NOT EXISTS pricing_model TEXT DEFAULT 'custom';
ALTER TABLE services ADD COLUMN IF NOT EXISTS starting_price INTEGER;

-- Ensure Services Unique Constraint
DELETE FROM services a USING services b WHERE a.id < b.id AND a.slug = b.slug;
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_slug_unique ON services(slug);

-- Clients
-- Ensure table exists
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns if missing
ALTER TABLE clients ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS contact_name TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES admin_users(id);

-- RELAX CONSTRAINTS (Safety net)
ALTER TABLE clients ALTER COLUMN company_name DROP NOT NULL;
ALTER TABLE clients ALTER COLUMN name DROP NOT NULL;
ALTER TABLE clients ALTER COLUMN email DROP NOT NULL;

-- Ensure Clients Unique Constraint
DELETE FROM clients a USING clients b WHERE a.id < b.id AND COALESCE(a.company_name, a.name) = COALESCE(b.company_name, b.name);
DROP INDEX IF EXISTS idx_clients_composite_unique;
CREATE UNIQUE INDEX IF NOT EXISTS idx_clients_composite_unique ON clients(company_name);


-- Portfolio
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS client_name TEXT;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS challenge TEXT;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS solution TEXT;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS results TEXT;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS completion_date DATE;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES admin_users(id);
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Ensure Portfolio Unique Constraint
DELETE FROM portfolio_projects a USING portfolio_projects b WHERE a.id < b.id AND a.slug = b.slug;
CREATE UNIQUE INDEX IF NOT EXISTS idx_portfolio_slug_unique ON portfolio_projects(slug);

-- Testimonials & Blog (IMAGE COLUMN FIXES)
-- We need to change these columns to TEXT to support URLs instead of strict UUIDs

-- Testimonials
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES admin_users(id);


-- Ensure Blog Unique Constraint
DELETE FROM blog_posts a USING blog_posts b WHERE a.id < b.id AND a.slug = b.slug;
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug_unique ON blog_posts(slug);
-- Ensure Categories Unique Constraint
DELETE FROM blog_categories a USING blog_categories b WHERE a.id < b.id AND a.slug = b.slug;
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_categories_slug_unique ON blog_categories(slug);

-- Navigation Items (CREATE IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS navigation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    position TEXT,
    order_index INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Ensure columns exist (if table existed but was different)
ALTER TABLE navigation_items ADD COLUMN IF NOT EXISTS position TEXT;
ALTER TABLE navigation_items ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Pages (CREATE IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'draft',
    template TEXT DEFAULT 'default',
    sections JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SEED DATA
DO $$
DECLARE
    admin_id UUID;
    techcorp_id UUID;
    innovate_id UUID;
    nordic_id UUID;
    milano_id UUID;
    futurevision_id UUID;
    techflow_id UUID;
    tech_cat_id UUID;
    design_cat_id UUID;
    business_cat_id UUID;
    home_page_id UUID;
    nav_main_id UUID;
BEGIN
    -- Get or Create Admin User
    INSERT INTO admin_users (email, role, name, is_active)
    VALUES ('doriazowan@gmail.com', 'super_admin', 'Admin User', true)
    ON CONFLICT (email) DO UPDATE 
    SET role = 'super_admin', is_active = true
    RETURNING id INTO admin_id;

    IF admin_id IS NULL THEN
        SELECT id INTO admin_id FROM admin_users WHERE email = 'doriazowan@gmail.com';
    END IF;

    -- Seed Site Settings
    INSERT INTO site_settings (key, value, category, description) VALUES
    ('site_name', '"BigWeb Agency"', 'general', 'Website name'),
    ('company_tagline', '"Crafting digital experiences that define the future."', 'general', 'Tagline'),
    ('contact_email', '"hello@bigwebdigital.com"', 'contact', 'Primary contact email'),
    ('contact_phone', '"+234 (703) 057-6537"', 'contact', 'Primary contact phone'),
    ('social_facebook', '"https://facebook.com"', 'social', 'Facebook URL'),
    ('social_twitter', '"https://twitter.com"', 'social', 'Twitter URL'),
    ('social_instagram', '"https://instagram.com"', 'social', 'Instagram URL'),
    ('social_linkedin', '"https://linkedin.com"', 'social', 'LinkedIn URL'),
    ('primary_color', '"#3B82F6"', 'branding', 'Brand primary color'),
    ('secondary_color', '"#10B981"', 'branding', 'Brand secondary color')
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, category = EXCLUDED.category;

    -- Seed Services
    INSERT INTO services (title, slug, tagline, description, category, status, created_by, pricing_model, starting_price, updated_at)
    VALUES
    (
        'Web Development', 
        'web-development',
        'Custom websites & web apps',
        'We build high-performance, scalable web applications using the latest technologies like Next.js, React, and Node.js.',
        'Development', 'active', admin_id, 'custom', 5000, NOW()
    ),
    (
        'Mobile Apps', 
        'mobile-apps',
        'iOS & Android applications',
        'Native and cross-platform mobile applications that provide seamless user experiences on all devices.',
        'Development', 'active', admin_id, 'custom', 8000, NOW()
    ),
    (
        'UI/UX Design', 
        'ui-ux-design',
        'Beautiful user experiences',
        'User-centric design that combines aesthetics with functionality to drive engagement and retention.',
        'Design', 'active', admin_id, 'fixed', 3500, NOW()
    ),
    (
        'E-Commerce', 
        'ecommerce',
        'Online stores that convert',
        'Robust e-commerce platforms optimized for sales, built on Shopify, WooCommerce, or custom solutions.',
        'Development', 'active', admin_id, 'custom', 6000, NOW()
    ),
    (
        'SEO & Growth', 
        'seo-growth',
        'Grow your online presence',
        'Data-driven SEO strategies to increase visibility and drive organic traffic to your website.',
        'Marketing', 'active', admin_id, 'hourly', 150, NOW()
    ),
    (
        'Analytics & Insights', 
        'analytics',
        'Data-driven decisions',
        'Advanced analytics setup and reporting to help you understand your users and optimize performance.',
        'Marketing', 'active', admin_id, 'fixed', 1200, NOW()
    ),
    (
        'AI Consulting', 
        'ai-consulting',
        'Intelligent Automation',
        'Leverage AI to automate workflows and gain predictive insights.',
        'Consulting', 'active', admin_id, 'hourly', 250, NOW()
    ),
    (
        'GAIO (AI Optimization)', 
        'gaio',
        'Future-proof your content',
        'Optimization strategies for Generative AI search engines.',
        'Marketing', 'active', admin_id, 'fixed', 2000, NOW()
    )
    ON CONFLICT (slug) DO NOTHING;

    -- Seed Clients
    INSERT INTO clients (name, company_name, contact_name, email, status, user_id)
    VALUES
    ('TechFlow Solutions', 'TechFlow Solutions', 'Sarah Jenkins', 'contact@techflow.com', 'active', admin_id),
    ('Innovate Africa', 'Innovate Africa', 'Kwame Osei', 'contact@innovate.africa', 'active', admin_id),
    ('Nordic Design Co.', 'Nordic Design Co.', 'Lars Nielsen', 'contact@nordic.design', 'active', admin_id),
    ('Milano Fashion', 'Milano Fashion', 'Isabella Rossi', 'contact@milano.fashion', 'active', admin_id),
    ('Future Vision Holdings', 'Future Vision Holdings', 'Amir Al-Fayed', 'contact@futurevision.com', 'active', admin_id)
    ON CONFLICT (company_name) DO NOTHING;

    SELECT id INTO techflow_id FROM clients WHERE company_name = 'TechFlow Solutions';
    SELECT id INTO innovate_id FROM clients WHERE company_name = 'Innovate Africa';
    SELECT id INTO nordic_id FROM clients WHERE company_name = 'Nordic Design Co.';
    SELECT id INTO milano_id FROM clients WHERE company_name = 'Milano Fashion';
    SELECT id INTO futurevision_id FROM clients WHERE company_name = 'Future Vision Holdings';

    -- Seed Portfolio Projects
    INSERT INTO portfolio_projects (title, slug, client_name, category, description, challenge, solution, results, technologies, is_published, is_featured, completion_date, views_count, created_by, image_url)
    VALUES
    (
        'FinTech Revolution: AI-Powered Banking',
        'fintech-revolution',
        'TechFlow Solutions',
        'Development',
        'Redesigned a legacy banking platform into an AI-driven mobile experience.',
        'Legacy systems were losing users to modern competitors.',
        'Hybrid migration strategy with React Native and Node.js.',
        '400% Increase in DAU, 30% Cost Reduction',
        ARRAY['React Native', 'Node.js', 'TensorFlow', 'AWS'],
        true, true, '2025-08-15', 1250, admin_id,
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80'
    ),
    (
        'Global E-Commerce Scale',
        'global-ecommerce',
        'Future Vision Holdings',
        'Development',
        'Headless commerce solution for a global retailer with 10M+ SKUs.',
        'Black Friday crashes were costing millions.',
        'Next.js on the edge with Redis caching.',
        '99.99% Uptime, 30% Conversion Uplift',
        ARRAY['Next.js', 'Shopify Plus', 'Redis', 'Vercel'],
        true, true, '2025-06-10', 980, admin_id,
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'
    ),
    (
        'Nordic Minimalist Portfolio',
        'nordic-portfolio',
        'Nordic Design Co.',
        'Design',
        'A stark, minimalist portfolio site that won Awwwards SOTD.',
        'Client needed to showcase high-fidelity imagery without slow loads.',
        'Advanced image optimization pipelines and WebGL effects.',
        'Awwwards SOTD, 50k monthly visitors',
        ARRAY['WebGL', 'Three.js', 'GSAP', 'React'],
        true, true, '2025-04-20', 3500, admin_id,
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80'
    ),
    (
        'Luxury Fashion AR Experience',
        'luxury-ar',
        'Milano Fashion',
        'Mobile',
        'Mobile app with AR try-on features for luxury accessories.',
        'Customers wanted to visualize products before purchasing.',
        'Custom AR engine integrated into iOS/Android native app.',
        '35% Return Rate Reduction',
        ARRAY['Swift', 'Kotlin', 'ARKit', 'Unity'],
        true, true, '2025-09-01', 2100, admin_id,
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80'
    ),
    (
        'Pan-African Payment Gateway',
        'africa-gateway',
        'Innovate Africa',
        'Development',
        'Unified payment gateway connecting 15 African currencies.',
        'Fragmented payment landscape across the continent.',
        'Unified API wrapper around local banking protocols.',
        'Processed $50M in first quarter',
        ARRAY['Go', 'PostgreSQL', 'Docker', 'Kubernetes'],
        true, false, '2025-02-15', 850, admin_id,
        'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80'
    )
    ON CONFLICT (slug) DO NOTHING;

    -- Seed Testimonials
    INSERT INTO testimonials (client_name, client_role, client_company, client_image, rating, content, result_metric, status, is_featured, order_index, created_by)
    VALUES
    (
        'Sarah Jenkins', 'Marketing Director', 'TechFlow Solutions',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
        5,
        'BIGWEB transformed our digital presence completely. Their attention to detail and innovative approach resulted in a 412% increase in conversions.',
        '+412% Conversions',
        'active', true, 1, admin_id
    ),
    (
        'Kwame Osei', 'Tech Founder', 'Innovate Africa',
        'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&q=80',
        5,
        'The scalability of the architecture they built allowed us to expand to three new countries in under six months. World-class engineering.',
        '3 New Markets',
        'active', true, 2, admin_id
    ),
    (
        'Lars Nielsen', 'Product Lead', 'Nordic Design Co.',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
        5,
        'Minimalist, efficient, and incredibly powerful. They understood our Scandinavian design ethos perfectly while delivering robust functionality.',
        '200% Efficiency',
        'active', true, 3, admin_id
    ),
    (
        'Isabella Rossi', 'Creative Director', 'Milano Fashion',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
        5,
        'A digital masterpiece. The animations and interactions feel so organic. Our luxury clientele finally has an online experience that matches our brand.',
        'Award Winning',
        'active', true, 4, admin_id
    ),
    (
        'Amir Al-Fayed', 'CEO', 'Future Vision Holdings',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
        5,
        'We needed a partner who could execute at the speed of Dubai. BIGWEB delivered a complex enterprise solution weeks ahead of schedule.',
        '2x Revenue',
        'active', true, 5, admin_id
    );

    -- Seed Blog
    INSERT INTO blog_categories (name, slug, description) VALUES
    ('Technology', 'technology', 'Tech trends and insights'),
    ('Design', 'design', 'Design principles'),
    ('Business', 'business', 'Growth strategies')
    ON CONFLICT (slug) DO NOTHING;

    SELECT id INTO tech_cat_id FROM blog_categories WHERE slug = 'technology';
    SELECT id INTO design_cat_id FROM blog_categories WHERE slug = 'design';
    SELECT id INTO business_cat_id FROM blog_categories WHERE slug = 'business';

    INSERT INTO blog_posts (title, slug, excerpt, content, status, category_id, author_id, published_at, is_featured, read_time, featured_image)
    VALUES
    (
        'The Future of AI in Web Development',
        'future-of-ai-web-development',
        'How artificial intelligence is reshaping the way we build and interact with the web.',
        '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "AI is not just a buzzword..."}]}]}',
        'published', tech_cat_id, admin_id, NOW(), true, 5,
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    ),
    (
        'Optimizing Next.js Performance',
        'optimizing-nextjs-performance',
        'Advanced strategies for achieving sub-second load times.',
        '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Performance matters..."}]}]}',
        'published', tech_cat_id, admin_id, NOW() - INTERVAL '2 days', false, 8,
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    ),
    (
        'Design Systems in 2025',
        'design-systems-2025',
        'Why your design system needs to evolve.',
        '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Consistency is key..."}]}]}',
        'published', design_cat_id, admin_id, NOW() - INTERVAL '1 week', false, 6,
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
    )
    ON CONFLICT (slug) DO NOTHING;

    -- Seed Navigation
    DELETE FROM navigation_items;

    INSERT INTO navigation_items (label, url, position, order_index, status) VALUES
    ('Services', '/services', 'header', 1, 'active'),
    ('Portfolio', '/portfolio', 'header', 2, 'active'),
    ('About', '/about', 'header', 3, 'active'),
    ('Estimator', '/estimator', 'header', 4, 'active'),
    
    ('Web Development', '/services/web-development', 'footer', 1, 'active'),
    ('Mobile Apps', '/services/mobile-apps', 'footer', 2, 'active'),
    ('UI/UX Design', '/services/ui-ux-design', 'footer', 3, 'active'),
    ('SEO & Growth', '/services/seo-growth', 'footer', 4, 'active'),
    
    ('Privacy Policy', '/privacy', 'footer', 10, 'active'),
    ('Terms of Service', '/terms', 'footer', 11, 'active');

    -- Seed Pages
    INSERT INTO pages (title, slug, status, template, sections) VALUES
    (
        'Home', 'home', 'published', 'home', 
        '[{"type": "hero", "data": {"title": "BigWeb Agency"}}, {"type": "services", "data": {}}, {"type": "portfolio", "data": {}}]'::jsonb
    ),
    (
        'About Us', 'about', 'published', 'default', 
        '[{"type": "hero", "data": {"title": "About Us"}}]'::jsonb
    ),
    (
        'Contact', 'contact', 'published', 'contact', 
        '[{"type": "form", "data": {"type": "contact"}}]'::jsonb
    )
    ON CONFLICT (slug) DO NOTHING;

END $$;
