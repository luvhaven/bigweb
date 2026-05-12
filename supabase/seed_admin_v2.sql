-- SEED SCRIPT: ADMIN 2.0 CONTENT
-- Populates the new cms_* schema with production-quality content

-- ==========================================
-- 1. GLOBAL SETTINGS
-- ==========================================
INSERT INTO public.cms_settings (
    site_name, site_description, logo_url, favicon_url, contact_email, contact_phone, social_links
) VALUES (
    'BigWeb',
    'Premium Web Development & AI Automation Agency',
    '/assets/logo.svg',
    '/favicon.ico',
    'hello@bigweb.agency',
    '+1 (555) 123-4567',
    '{"linkedin": "https://linkedin.com/company/bigweb", "twitter": "https://x.com/bigwebagency", "instagram": "https://instagram.com/bigwebagency"}'::jsonb
);

-- ==========================================
-- 2. NAVIGATION
-- ==========================================

-- Top-level: Services (Mega Menu Parent)
INSERT INTO public.cms_navigation (id, label, url, type, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Services', NULL, 'mega_menu', 1);

-- Service Categories (Children of Services)
INSERT INTO public.cms_navigation (id, label, url, parent_id, sort_order) VALUES
('22222222-2222-2222-2222-222222222201', 'Development', NULL, '11111111-1111-1111-1111-111111111111', 1),
('22222222-2222-2222-2222-222222222202', 'Marketing', NULL, '11111111-1111-1111-1111-111111111111', 2),
('22222222-2222-2222-2222-222222222203', 'AI & Automation', NULL, '11111111-1111-1111-1111-111111111111', 3),
('22222222-2222-2222-2222-222222222204', 'Design', NULL, '11111111-1111-1111-1111-111111111111', 4);

-- Service Links (Children of Categories)
-- Development
INSERT INTO public.cms_navigation (label, url, parent_id, sort_order) VALUES
('Web Development', '/services/web-development', '22222222-2222-2222-2222-222222222201', 1),
('Mobile Apps', '/services/mobile-apps', '22222222-2222-2222-2222-222222222201', 2),
('E-Commerce', '/services/ecommerce', '22222222-2222-2222-2222-222222222201', 3),
('Custom CMS', '/services/custom-cms', '22222222-2222-2222-2222-222222222201', 4);

-- Marketing
INSERT INTO public.cms_navigation (label, url, parent_id, sort_order) VALUES
('SEO Optimization', '/services/seo', '22222222-2222-2222-2222-222222222202', 1),
('Analytics', '/services/analytics', '22222222-2222-2222-2222-222222222202', 2),
('Conversion Optimization', '/services/conversion-optimization', '22222222-2222-2222-2222-222222222202', 3);

-- AI & Automation
INSERT INTO public.cms_navigation (label, url, parent_id, sort_order) VALUES
('AI Automation', '/services/ai-automation', '22222222-2222-2222-2222-222222222203', 1),
('AI Chatbots', '/services/ai-chatbots', '22222222-2222-2222-2222-222222222203', 2),
('Process Automation', '/services/process-automation', '22222222-2222-2222-2222-222222222203', 3);

-- Design
INSERT INTO public.cms_navigation (label, url, parent_id, sort_order) VALUES
('UI/UX Design', '/services/ui-ux-design', '22222222-2222-2222-2222-222222222204', 1),
('Brand Identity', '/services/brand-identity', '22222222-2222-2222-2222-222222222204', 2);

-- Top-level: Work
INSERT INTO public.cms_navigation (label, url, type, sort_order) VALUES
('Work', '/portfolio', 'link', 2);

-- Top-level: Company (Dropdown)
INSERT INTO public.cms_navigation (id, label, url, type, sort_order) VALUES
('33333333-3333-3333-3333-333333333333', 'Company', NULL, 'dropdown', 3);

INSERT INTO public.cms_navigation (label, url, parent_id, sort_order) VALUES
('About', '/about', '33333333-3333-3333-3333-333333333333', 1),
('Team', '/team', '33333333-3333-3333-3333-333333333333', 2),
('Contact', '/contact', '33333333-3333-3333-3333-333333333333', 3),
('Blog', '/blog', '33333333-3333-3333-3333-333333333333', 4);

-- ==========================================
-- 2b. FOOTER
-- ==========================================

-- Sections
INSERT INTO public.cms_footer_sections (id, title, sort_order) VALUES
('44444444-4444-4444-4444-444444444441', 'Company', 1),
('44444444-4444-4444-4444-444444444442', 'Services', 2),
('44444444-4444-4444-4444-444444444443', 'Resources', 3);

-- Links
-- Company
INSERT INTO public.cms_footer_links (section_id, label, url, sort_order) VALUES
('44444444-4444-4444-4444-444444444441', 'About Us', '/about', 1),
('44444444-4444-4444-4444-444444444441', 'Careers', '/careers', 2),
('44444444-4444-4444-4444-444444444441', 'Contact', '/contact', 3);

-- Services
INSERT INTO public.cms_footer_links (section_id, label, url, sort_order) VALUES
('44444444-4444-4444-4444-444444444442', 'Web Development', '/services/web-development', 1),
('44444444-4444-4444-4444-444444444442', 'Mobile Apps', '/services/mobile-apps', 2),
('44444444-4444-4444-4444-444444444442', 'AI Solutions', '/services/ai-automation', 3);

-- Resources
INSERT INTO public.cms_footer_links (section_id, label, url, sort_order) VALUES
('44444444-4444-4444-4444-444444444443', 'Blog', '/blog', 1),
('44444444-4444-4444-4444-444444444443', 'Case Studies', '/portfolio', 2),
('44444444-4444-4444-4444-444444444443', 'Privacy Policy', '/privacy', 3);

-- ==========================================
-- 3. HEROES
-- ==========================================

INSERT INTO public.cms_heroes (slug, title, subtitle, description, highlight_text, cta_primary_text, cta_primary_link, media_url, stats) VALUES
('home', 'We Build Revenue-Generating', 'The AI-Powered Web Studio', 'Transform your digital presence with cutting-edge web solutions that convert visitors into customers.', 'Digital Experiences', 'Start Your Project', '/contact', '/assets/hero-conversion.png', '[{"label": "Client Satisfaction", "value": "100%"}, {"label": "Projects Delivered", "value": "250+"}]'::jsonb),
('services/web-development', 'Web Development', 'Custom Solutions, Infinite Possibilities', 'From stunning marketing sites to complex web applications, we architect digital experiences that perform.', 'Excellence', 'Get Started', '/contact', '/assets/web-dev-hero.png', '[]'::jsonb),
('services/seo', 'SEO Optimization', 'Dominate Search Rankings', 'Data-driven strategies that put your business in front of the right audience at the right time.', '', 'Free Audit', '/audit', '/assets/seo-hero.png', '[]'::jsonb),
('services/mobile-apps', 'Mobile App Development', 'Apps That Users Love', 'Native and cross-platform mobile applications built for performance and engagement.', '', 'Discuss Your App', '/contact', '/assets/mobile-hero.png', '[]'::jsonb),
('services/ai-automation', 'AI Automation', 'Intelligent Business Solutions', 'Harness the power of artificial intelligence to automate, optimize, and scale your operations.', '', 'Explore AI', '/ai-boost', '/assets/ai-hero.png', '[]'::jsonb),
('about', 'Our Story', 'Since 2017', 'We are a team of passionate engineers, designers, and strategists dedicated to building exceptional digital products.', '', 'Meet The Team', '/team', '/assets/about-hero.png', '[]'::jsonb),
('contact', 'Let''s Build Together', 'Start a Conversation', 'Ready to transform your digital presence? Get in touch and let''s discuss your next big project.', '', '', '', '/assets/contact-hero.png', '[]'::jsonb),
('portfolio', 'Our Work', 'Case Studies & Projects', 'Explore a selection of our most impactful projects and the results we have achieved for our clients.', '', 'View All Projects', '/portfolio', '/assets/portfolio-hero.png', '[]'::jsonb);

-- ==========================================
-- 4. SERVICES
-- ==========================================

INSERT INTO public.cms_services (title, slug, short_description, icon, features, process_steps, is_active, sort_order) VALUES
('Web Development', 'web-development', 'Custom websites and web applications built with modern technologies.', 'Code', '["Next.js & React", "Headless CMS Integration", "E-Commerce Solutions", "Performance Optimization", "SEO-Ready Architecture"]'::jsonb, '[{"title": "Discovery", "description": "We understand your goals and requirements."}, {"title": "Design", "description": "UI/UX prototypes and design systems."}, {"title": "Development", "description": "Agile sprints with weekly updates."}, {"title": "Launch", "description": "Deployment, training, and ongoing support."}]'::jsonb, true, 1),
('SEO Optimization', 'seo', 'Data-driven search engine optimization that drives organic traffic.', 'Search', '["Technical SEO Audits", "Keyword Research & Strategy", "On-Page Optimization", "Link Building", "Monthly Reporting"]'::jsonb, '[]'::jsonb, true, 2),
('Mobile App Development', 'mobile-apps', 'Native and cross-platform mobile applications.', 'Smartphone', '["iOS & Android Development", "React Native & Flutter", "App Store Optimization", "Push Notifications", "Offline Support"]'::jsonb, '[]'::jsonb, true, 3),
('AI Automation', 'ai-automation', 'Custom AI solutions to automate and optimize your business processes.', 'Brain', '["Custom AI Chatbots", "Process Automation", "Predictive Analytics", "Natural Language Processing", "Computer Vision"]'::jsonb, '[]'::jsonb, true, 4),
('UI/UX Design', 'ui-ux-design', 'User-centered design that converts visitors into customers.', 'Palette', '["User Research", "Wireframing & Prototyping", "Design Systems", "Usability Testing", "Accessibility Compliance"]'::jsonb, '[]'::jsonb, true, 5),
('E-Commerce', 'ecommerce', 'High-converting online stores built for scale.', 'ShoppingCart', '["Shopify & WooCommerce", "Custom Checkout Flows", "Payment Integration", "Inventory Management", "Analytics Dashboard"]'::jsonb, '[]'::jsonb, true, 6),
('Analytics', 'analytics', 'Deep insights into user behavior and business performance.', 'BarChart', '["Google Analytics 4 Setup", "Custom Dashboards", "Conversion Tracking", "A/B Testing", "ROI Attribution"]'::jsonb, '[]'::jsonb, true, 7),
('Conversion Optimization', 'conversion-optimization', 'Turn more visitors into paying customers.', 'TrendingUp', '["Landing Page Optimization", "A/B Testing", "Heatmap Analysis", "User Journey Mapping", "Funnel Optimization"]'::jsonb, '[]'::jsonb, true, 8);

-- ==========================================
-- 5. PROJECTS
-- ==========================================

INSERT INTO public.cms_projects (title, slug, client_name, summary, challenge, solution, results, cover_image_url, tech_stack, is_featured) VALUES
('Nexus FinTech Platform', 'nexus-fintech', 'Nexus Financial', 'A comprehensive fintech platform with real-time trading and portfolio management.', 'The client needed a secure, scalable platform capable of handling millions of transactions while providing a seamless user experience.', 'We built a microservices architecture with Next.js, Node.js, and PostgreSQL, featuring real-time WebSocket updates and enterprise-grade security.', '400% increase in user engagement. Sub-100ms response times. $2M+ daily transactions processed.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', '["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"]'::jsonb, true),
('Elevate E-Commerce', 'elevate-ecommerce', 'Elevate Fashion', 'A luxury fashion e-commerce experience with AR try-on features.', 'Create a premium shopping experience that reduced cart abandonment and increased conversions.', 'Implemented a headless Shopify architecture with a custom Next.js frontend, AR integration, and personalized recommendations.', '65% reduction in cart abandonment. 3x increase in average order value.', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800', '["Next.js", "Shopify Hydrogen", "Three.js", "Tailwind CSS"]'::jsonb, true),
('MediCare Portal', 'medicare-portal', 'MediCare Health', 'A HIPAA-compliant patient portal with telemedicine capabilities.', 'Build a secure healthcare platform with video consultations, appointment scheduling, and patient records.', 'Developed a full-stack solution with end-to-end encryption, WebRTC video, and integration with major EHR systems.', '50,000+ patients onboarded. 98% patient satisfaction rating.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800', '["React", "Node.js", "WebRTC", "AWS", "MongoDB"]'::jsonb, true);

-- ==========================================
-- 6. TESTIMONIALS
-- ==========================================

INSERT INTO public.cms_testimonials (author_name, author_role, author_company, quote, rating, is_featured) VALUES
('Sarah Chen', 'CTO', 'Nexus Financial', 'BigWeb transformed our digital infrastructure. Their team delivered a robust fintech platform that exceeded all our expectations.', 5, true),
('Marcus Rivera', 'Founder', 'Elevate Fashion', 'The AR try-on feature they built increased our conversions by 300%. Absolute game-changers.', 5, true),
('Dr. Emily Foster', 'Director of IT', 'MediCare Health', 'Security was our top priority, and BigWeb delivered a HIPAA-compliant solution that our patients love.', 5, true),
('James Mitchell', 'CEO', 'TechStart Inc', 'Working with BigWeb was seamless. They understood our vision and brought it to life perfectly.', 5, false),
('Amanda Lee', 'Marketing Director', 'GrowthCo', 'Our organic traffic increased by 450% after their SEO work. Best investment we have made.', 5, false);

-- ==========================================
-- 7. TEAM
-- ==========================================

INSERT INTO public.cms_team (name, role, bio, image_url, social_links, sort_order) VALUES
('Alex Johnson', 'Founder & CEO', 'Visionary leader with 15+ years in tech. Passionate about building products that make a difference.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '{"linkedin": "https://linkedin.com/in/alexjohnson"}'::jsonb, 1),
('Sarah Kim', 'Lead Engineer', 'Full-stack wizard. Loves clean code and complex challenges.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', '{"linkedin": "https://linkedin.com/in/sarahkim"}'::jsonb, 2),
('Michael Chen', 'Design Director', 'Award-winning designer focused on creating delightful user experiences.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', '{"linkedin": "https://linkedin.com/in/michaelchen"}'::jsonb, 3),
('Emily Rodriguez', 'Head of Marketing', 'Growth strategist with a track record of scaling startups.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', '{"linkedin": "https://linkedin.com/in/emilyrodriguez"}'::jsonb, 4);

-- End of Seed
