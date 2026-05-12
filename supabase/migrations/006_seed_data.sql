-- ================================================================
-- SEED DATA - Initial Content for BigWeb
-- ================================================================

-- 1. Get the admin user ID (assuming the one we created exists)
DO $$
DECLARE
    admin_id UUID;
BEGIN
    SELECT id INTO admin_id FROM admin_users WHERE email = 'bigwebdaniel@outlook.com';

    -- If no admin exists, create one (safety check)
    IF admin_id IS NULL THEN
        INSERT INTO admin_users (email, role, name, is_active)
        VALUES ('bigwebdaniel@outlook.com', 'super_admin', 'Admin', true)
        RETURNING id INTO admin_id;
    END IF;

    -- 2. Seed Services
    INSERT INTO services (title, slug, tagline, description, features, results, image_url, category, status, created_by)
    VALUES
    (
        'Enterprise Web Development', 
        'web-development',
        'Websites That Rank #1 & Convert Like Crazy',
        'Get found on Google''s first page and convert that traffic into customers. Built with Next.js 15 for blazing speed, perfect SEO, and conversion optimization baked into every line of code.',
        ARRAY['Next.js 15 & React 19', 'Sub-1s Load Times', 'Technical SEO Built-In', 'Conversion Optimization'],
        '3x faster sites, top 3 Google rankings',
        'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=90',
        'Development',
        'active',
        admin_id
    ),
    (
        'UI/UX Design', 
        'ui-ux-design',
        'Interfaces That Turn Browsers Into Buyers',
        'Double your conversion rate with UX that sells. We design interfaces backed by behavioral psychology that guide users toward purchase.',
        ARRAY['Conversion-Focused Design', 'A/B Tested Layouts', 'Psychology-Driven UX', 'Mobile-First Optimization'],
        'Average 200% conversion increase',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=90',
        'Design',
        'active',
        admin_id
    ),
    (
        'E-Commerce Solutions', 
        'ecommerce',
        'Online Stores That Maximize Every Sale',
        'Turn browsers into buyers and buyers into repeat customers. Every element optimized to reduce cart abandonment.',
        ARRAY['Smart Product Recommendations', 'One-Click Checkout', 'Cart Recovery Systems', 'Revenue Optimization'],
        '180% average revenue increase',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90',
        'Development',
        'active',
        admin_id
    ),
    (
        'SEO Domination', 
        'seo',
        'SEO That Gets You Found First',
        'Stop paying for ads. Dominate organic search and get qualified leads on autopilot.',
        ARRAY['Technical SEO', 'Content Strategy', 'Link Building', 'Local SEO Domination'],
        'Top 3 rankings in 90 days guaranteed',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90',
        'Marketing',
        'active',
        admin_id
    ),
    (
        'AI Consulting', 
        'ai-consulting',
        'Intelligent Automation & Insights',
        'Leverage the power of Artificial Intelligence to automate workflows, gain deep insights, and stay ahead of the curve.',
        ARRAY['Custom AI Solutions', 'Workflow Automation', 'Predictive Analytics', 'ChatGPT Integration'],
        'Increase efficiency by 10x with custom AI implementations',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=90',
        'Consulting',
        'active',
        admin_id
    );

    -- 3. Seed Clients
    INSERT INTO clients (company_name, contact_name, email, logo_url, status, user_id)
    VALUES
    ('TechCorp', 'Sarah Johnson', 'sarah@techcorp.com', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 'active', admin_id),
    ('Innovate Inc', 'Mike Thomas', 'mike@innovate.com', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 'active', admin_id),
    ('FutureScale', 'Jessica Reed', 'jessica@futurescale.com', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 'active', admin_id),
    ('GlobalSystems', 'David Lee', 'david@globalsystems.com', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 'active', admin_id);

    -- 4. Seed Projects (Portfolio)
    INSERT INTO projects (name, description, client_id, status, start_date, progress, tags, created_by, image_url)
    VALUES
    (
        'TechCorp Enterprise Platform', 
        'Cloud-based collaboration platform for enterprise teams',
        (SELECT id FROM clients WHERE company_name = 'TechCorp' LIMIT 1),
        'completed',
        NOW() - INTERVAL '3 months',
        100,
        ARRAY['SaaS', 'Cloud', 'Enterprise'],
        admin_id,
        '/artifacts/techcorp_platform_dashboard_1764589013521.png'
    ),
    (
        'FinPay Digital Wallet', 
        'Secure mobile payment solution with cryptocurrency integration',
        (SELECT id FROM clients WHERE company_name = 'Innovate Inc' LIMIT 1),
        'completed',
        NOW() - INTERVAL '1 month',
        100,
        ARRAY['Fintech', 'Mobile', 'Crypto'],
        admin_id,
        '/artifacts/finpay_wallet_app_1764589030619.png'
    ),
    (
        'HealthTrack Pro', 
        'AI-powered health monitoring platform',
        (SELECT id FROM clients WHERE company_name = 'FutureScale' LIMIT 1),
        'completed',
        NOW() - INTERVAL '2 months',
        100,
        ARRAY['Healthcare', 'AI', 'Mobile'],
        admin_id,
        '/artifacts/healthtrack_dashboard_1764589047595.png'
    ),
    (
        'Luxury Fashion Store', 
        'Premium e-commerce experience with AR try-on',
        (SELECT id FROM clients WHERE company_name = 'GlobalSystems' LIMIT 1),
        'completed',
        NOW() - INTERVAL '4 months',
        100,
        ARRAY['E-Commerce', 'AR', 'Fashion'],
        admin_id,
        '/artifacts/luxury_fashion_ecommerce_1764589064929.png'
    ),
    (
        'AI Content Studio', 
        'Next-generation content creation platform',
        (SELECT id FROM clients WHERE company_name = 'TechCorp' LIMIT 1),
        'completed',
        NOW() - INTERVAL '1 month',
        100,
        ARRAY['AI', 'SaaS', 'Content'],
        admin_id,
        '/artifacts/ai_content_studio_1764589081328.png'
    );

    -- 5. Seed Testimonials
    INSERT INTO testimonials (client_id, author_name, author_role, content, rating, is_featured, status, created_by)
    VALUES
    (
        (SELECT id FROM clients WHERE company_name = 'TechCorp' LIMIT 1),
        'Sarah Johnson',
        'CEO',
        'Enhanced conversion rates by 200% in just 3 months. The best agency experience we''ve ever had.',
        5,
        true,
        'published',
        admin_id
    ),
    (
        (SELECT id FROM clients WHERE company_name = 'Innovate Inc' LIMIT 1),
        'Mike Thomas',
        'CTO',
        'Their code quality is unmatched. Seamless integration and incredible attention to detail.',
        5,
        true,
        'published',
        admin_id
    );

    -- 6. Seed Blog Categories
    INSERT INTO blog_categories (name, slug, color, description)
    VALUES
    ('Technology', 'technology', 'blue', 'Latest tech trends and insights'),
    ('Design', 'design', 'pink', 'UI/UX design principles and tutorials'),
    ('Business', 'business', 'emerald', 'Business growth strategies');

    -- 7. Seed Blog Posts
    INSERT INTO blog_posts (title, slug, excerpt, content, status, published_at, category_id, author_id, featured_image)
    VALUES
    (
        'The Future of Web Development with AI',
        'future-web-dev-ai',
        'How Artificial Intelligence is revolutionizing the way we build web applications.',
        '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Artificial Intelligence is changing everything..."}]}]}',
        'published',
        NOW(),
        (SELECT id FROM blog_categories WHERE slug = 'technology' LIMIT 1),
        admin_id,
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=90'
    ),
    (
        'Mastering UI/UX for Conversion',
        'mastering-ui-ux',
        'Design principles that turn visitors into loyal customers.',
        '{"type": "doc", "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Good design is good business..."}]}]}',
        'published',
        NOW(),
        (SELECT id FROM blog_categories WHERE slug = 'design' LIMIT 1),
        admin_id,
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=90'
    );

END $$;
