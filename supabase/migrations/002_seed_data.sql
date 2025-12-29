-- BigWeb Digital - Data Seeding (All Current Website Copy)
-- Run AFTER 001_cms_schema.sql
-- This populates all tables with existing website content

-- ============================================
-- HERO SECTIONS (All Current Pages)
-- ============================================
INSERT INTO public.hero_sections (page_slug, title, highlight, description, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, theme_color, badge_text, pattern) VALUES
('home', 'Build Websites That', 'Generate Revenue', 'Premium web development for brands that refuse to settle. Next.js, AI integration, 100/100 speed score guaranteed.', 'Get Free Estimate', '/estimator', 'View Portfolio', '/portfolio', 'emerald', 'Premium Agency', 'Grid'),
('ai-boost', 'Struggling with Missed Leads', '& Overwhelmed Support?', 'Get a Custom AI Chatbot that works 24/7 to boost conversions and save you 20+ hours every single week.', 'Secure My Spot & Pay Deposit', 'https://raenest.com/pay', NULL, NULL, 'emerald', 'Limited-Time Offer', 'Neural'),
('revenue-website', 'We Build Websites That', 'Actually Get Customers.', 'Most agencies charge $10k+ for "brochure" sites. Get a complete, high-performance Revenue System (Next.js + AI + SEO) ready in 10 days.', 'See Pricing & Packages', '#pricing', NULL, NULL, 'emerald', 'Agency-Grade Web Development', 'Flow'),
('ai-consulting', 'AI Automation That', 'Saves 20+ Hours Weekly', 'Let AI handle the repetitive work. Free your team from manual tasks with intelligent automation. Results: 10x efficiency gains, $50K+ annual savings.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'cyan', 'AI Consulting', 'Stripes'),
('web-development', 'Websites That Drive', 'Real Results', 'Lightning-fast, scalable applications built with cutting-edge technology stacks like Next.js and React. Custom web development that converts visitors into customers—fast, secure, and built to scale with your business.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'blue', 'Web Development', 'Circuit'),
('mobile-apps', 'Apps Your Users', 'Open Daily', 'Native iOS & Android experiences that users can''t stop engaging with. Build habit-forming mobile experiences with stunning design, addictive UX, and smooth performance. Results: 4.8+ app store ratings.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'purple', 'Mobile App Development', 'Mobile'),
('ui-ux-design', 'Designs That Users', 'Fall in Love With', 'Pixel-perfect interfaces that convert visitors into loyal customers through data-driven design psychology. We create beautiful, intuitive experiences that delight users and drive business results.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'green', 'UI/UX Design', 'Creative'),
('seo-marketing', 'Get', 'Found on Google', 'Dominate search rankings with data-driven SEO strategies. Increase organic traffic 10x in 6 months. We don''t just optimize—we make you the authority in your industry.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'yellow', 'SEO & Marketing', 'Data'),
('ecommerce', 'E-Commerce That', 'Maximize Every Sale', 'High-converting online stores built on Shopify, WooCommerce, or custom platforms. Seamless checkout, inventory management, and payment processing that scale with your business.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'orange', 'E-Commerce', 'Hexagon'),
('analytics', 'Data That Drives', 'Actionable Insights', 'Turn raw data into strategic advantage. Custom analytics dashboards, predictive modeling, and business intelligence that reveal exactly what''s working and what needs to change.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'indigo', 'Analytics & Performance', 'Insights'),
('gaio', 'Rank #1 on ChatGPT', 'Generative AI', 'Optimize your brand for AI search engines like ChatGPT, Gemini, and Claude. GAIO (Generative AI Optimization) ensures your business is the top recommendation when users ask AI for solutions.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'purple', 'GAIO (AI Optimization)', 'Waves'),
('conversion-optimization', 'Turn Visitors Into', 'Paying Customers', 'Scientific approach to boosting conversions. A/B testing, heat maps, user session recordings, and psychological triggers that increase revenue without more traffic.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'orange', 'Conversion Optimization', 'Hexagon'),
('staff-augmentation', 'Scale Your Team', 'Without The Friction', 'Need developers yesterday? We provide pre-vetted senior engineers who integrate seamlessly into your workflow. No recruitment hassle, no HR overhead—just elite talent when you need it.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'indigo', 'Staff Augmentation', 'Insights'),
('maintenance', 'Websites That Stay', 'AI Optimization', '24/7 monitoring, security patches, performance optimization, and instant fixes. We keep your site fast, secure, and available while you focus on growing your business.', 'Get Free Estimate', '/estimator', 'How We Work', '#process', 'green', 'Website Maintenance', 'Creative')
ON CONFLICT (page_slug) DO UPDATE SET
title = EXCLUDED.title,
highlight = EXCLUDED.highlight,
description = EXCLUDED.description,
cta_primary_text = EXCLUDED.cta_primary_text,
cta_primary_url = EXCLUDED.cta_primary_url,
theme_color = EXCLUDED.theme_color,
pattern = EXCLUDED.pattern;

-- ============================================
-- SERVICE PAGES (Complete Service Descriptions)
-- ============================================
INSERT INTO public.service_pages (slug, title, highlight, description, long_description, theme_color, pattern, badge_text, starting_price, timeline_weeks, published) VALUES
('web-development', 'Websites That Drive', 'Real Results', 
'Lightning-fast, scalable applications built with cutting-edge technology stacks like Next.js and React.',
'We build custom web applications that aren''t just pretty—they''re conversion machines. Every line of code is optimized for speed, SEO, and user experience. Our sites load in under 0.5 seconds, rank #1 on Google, and convert at industry-leading rates. We use Next.js 14, React, TypeScript, and modern frameworks to ensure your site is future-proof and lightning-fast.',
'blue', 'Circuit', 'Web Development', 5000.00, 6, true),

('mobile-apps', 'Apps Your Users', 'Open Daily',
'Native iOS & Android experiences that users can''t stop engaging with.',
'We specialize in building native mobile apps that feel buttery-smooth and intuitive. Whether you need iOS, Android, or cross-platform (React Native, Flutter), we create apps that users love and can''t stop using. From banking apps to social platforms to e-commerce—we''ve done it all. Average app store rating: 4.8/5 stars.',
'purple', 'Mobile', 'Mobile App Development', 8000.00, 10, true),

('ui-ux-design', 'Designs That Users', 'Fall in Love With',
'Pixel-perfect interfaces that convert visitors into loyal customers through data-driven design psychology.',
'Design isn''t just about looking good—it''s about psychology, conversion rates, and user delight. We use Figma, Adobe XD, and data from user research to create interfaces that feel intuitive and drive results. Every color, every spacing decision is backed by UX research and A/B testing. Typical result: 40-60% increase in conversion rates.',
'green', 'Creative', 'UI/UX Design', 3500.00, 4, true),

('ai-consulting', 'AI Automation That', 'Saves 20+ Hours Weekly',
'Let AI handle the repetitive work. Free your team from manual tasks with intelligent automation.',
'We implement enterprise AI solutions that actually work. From chatbots to document processing to predictive analytics—we turn manual processes into automated workflows. Use cases: customer support automation (70% ticket reduction), email classification, data entry elimination, lead scoring. ROI typically achieved within 4-6 months.',
'cyan', 'Stripes', 'AI Consulting', 5000.00, 12, true),

('seo-marketing', 'Get', 'Found on Google',
'Dominate search rankings with data-driven SEO strategies. Increase organic traffic 10x in 6 months.',
'SEO that actually works. We don''t just stuff keywords—we create content that Google AND users love. Technical SEO audits, content strategy, backlink building, and on-page optimization. Typical results: 300-500% increase in organic traffic within 12 months, first-page rankings for high-intent keywords.',
'yellow', 'Data', 'SEO & Marketing', 2500.00, 6, true),

('ecommerce', 'E-Commerce That', 'Maximize Every Sale',
'High-converting online stores built on Shopify, WooCommerce, or custom platforms.',
'We build online stores that sell 24/7. Seamless checkout experiences, abandoned cart recovery, inventory management, multi-currency support, and payment gateways. Platforms: Shopify Plus, WooCommerce, Magento, or custom Next.js e-commerce. Average conversion rate improvement: 35%.',
'orange', 'Hexagon', 'E-Commerce', 6000.00, 8, true),

('analytics', 'Data That Drives', 'Actionable Insights',
'Turn raw data into strategic advantage. Custom analytics dashboards and business intelligence.',
'We build custom analytics solutions that show exactly what''s working and what isn''t. Google Analytics setup, custom dashboards (Looker, Tableau, custom React dashboards), conversion tracking, attribution modeling. Make data-driven decisions instead of guessing. Includes training for your team.',
'indigo', 'Insights', 'Analytics & Performance', 4000.00, 6, true),

('gaio', 'Rank #1 on ChatGPT', 'Generative AI',
'Optimize your brand for AI search engines like ChatGPT, Gemini, and Claude.',
'The future of search is AI. When users ask ChatGPT "Best web development agency," will it recommend YOU? GAIO (Generative AI Optimization) ensures your brand is the top answer. We optimize your content, citations, and authority signals for LLMs. Be the brand AI recommends first.',
'purple', 'Waves', 'GAIO (AI Optimization)', 3000.00, 8, true),

('conversion-optimization', 'Turn Visitors Into', 'Paying Customers',
'Scientific approach to boosting conversions. A/B testing, heat maps, and psychological triggers.',
'Stop leaving money on the table. We use Hotjar, Crazy Egg, and custom analytics to identify exactly where users drop off—then we fix it. A/B testing, multivariate testing, user session recordings, conversion funnel optimization. Typical lift: 25-100% increase in conversion rate.',
'orange', 'Hexagon', 'Conversion Optimization', 2000.00, 4, true),

('staff-augmentation', 'Scale Your Team', 'Without The Friction',
'We provide pre-vetted senior engineers who integrate seamlessly into your workflow.',
'Need developers fast? We have a network of senior full-stack engineers, React specialists, backend developers, and DevOps experts ready to join your team within days. No recruitment hassle. They work in your timezone, use your tools, and deliver production-ready code from day one.',
'indigo', 'Insights', 'Staff Augmentation', 4500.00, 2, true),

('maintenance', 'Websites That Stay', 'AI Optimization',
'24/7 monitoring, security patches, performance optimization, and instant fixes.',
'Your site never sleeps—and neither does our monitoring. We provide 24/7 uptime monitoring, automatic security patches, performance optimization, malware scanning, database optimization, and instant fixes when something breaks. SLA: 99.9% uptime guaranteed. Response time: < 2 hours.',
'green', 'Creative', 'Website Maintenance', 500.00, 0, true)
ON CONFLICT (slug) DO UPDATE SET
title = EXCLUDED.title,
highlight = EXCLUDED.highlight,
description = EXCLUDED.description,
long_description = EXCLUDED.long_description;

-- ============================================
-- STATISTICS (Homepage & About)
-- ============================================
INSERT INTO public.statistics (label, value, suffix, description, icon, category, display_location, sort_order) VALUES
('Projects Delivered', '500', '+', 'Successful projects completed', 'FolderKanban', 'achievement', 'homepage-hero', 1),
('Client Satisfaction', '98', '%', 'Happy clients who come back', 'Star', 'achievement', 'homepage-hero', 2),
('Years Experience', '7', '+', 'In web development and design', 'Clock', 'achievement', 'homepage-hero', 3),
('Team Members', '25', '+', 'Expert developers and designers', 'Users', 'team', 'about-page', 4),
('Countries Served', '12', '+', 'Global client base', 'Globe', 'reach', 'about-page', 5),
('Average Load Time', '0.3', 's', 'Lightning-fast websites', 'Zap', 'performance', 'homepage-features', 6),
('Conversion Rate Increase', '47', '%', 'Average for our clients', 'TrendingUp', 'results', 'homepage-features', 7);

-- ============================================
-- LEGAL PAGES (Privacy, Terms, Cookies)
-- ============================================
INSERT INTO public.legal_pages (page_type, title, content, last_updated, version) VALUES
('privacy', 'Privacy Policy', 
'At BIGWEB Digital, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

## Information We Collect
We collect information you provide directly to us when using our services, including your name, email address, phone number, company details, and project requirements. We also automatically collect certain information about your device and how you interact with our website.

## How We Use Your Information
We use collected information to provide and maintain our services, communicate with you about projects, respond to inquiries, send marketing communications (with consent), analyze usage patterns, and protect against fraudulent activity.

## Data Security
We implement industry-standard security measures including encryption, secure servers, regular security audits, and access controls. However, no method of Internet transmission is 100% secure.

## Your Rights
You have the right to access, correct, delete your information, opt-out of marketing, and object to certain processing. Contact us at hello@bigwebdigital.com to exercise these rights.

## Contact
For privacy questions: hello@bigwebdigital.com or +234 703 057 6537.',
CURRENT_DATE, '1.0'),

('terms', 'Terms of Service',
'These Terms of Service govern your use of BIGWEB Digital''s website and services.

## Acceptance of Terms
By accessing our services, you agree to be bound by these terms. If you disagree, please discontinue use.

## Services Description
BIGWEB Digital provides web development, mobile apps, UI/UX design, SEO, and related services as outlined in individual project agreements.

## Client Responsibilities
Clients agree to provide accurate information, timely feedback, necessary materials, and make payments as agreed.

## Payment Terms
Projects require an initial deposit before work begins, milestone payments during development, and final payment upon completion. Late payments may incur 1.5% monthly interest.

## Intellectual Property
Upon full payment, clients receive ownership of custom work created specifically for them. BIGWEB Digital retains rights to pre-existing tools, frameworks, methodologies, and portfolio usage rights.

## Limitation of Liability
To the maximum extent permitted by law, our total liability for any claims shall not exceed the amount paid for specific services.

## Contact
For terms questions: hello@bigwebdigital.com',
CURRENT_DATE, '1.0'),

('cookies', 'Cookie Policy',
'This Cookie Policy explains how BIGWEB Digital uses cookies and similar technologies.

## What Are Cookies
Cookies are small text files stored on your device when you visit websites. They help us enhance your experience and analyze site usage.

## How We Use Cookies
We use cookies to remember your preferences, analyze site traffic, personalize content, and enable certain website features.

## Types of Cookies We Use
- **Essential Cookies**: Required for basic website functionality
- **Analytics Cookies**: Help us understand how visitors use our site (Google Analytics)
- **Preference Cookies**: Remember your settings and preferences
- **Marketing Cookies**: Track your browsing to show relevant ads

## Control Your Cookies
You can control cookie preferences through your browser settings. Note that disabling certain cookies may affect website functionality.

## Third-Party Cookies
We use services like Google Analytics which may place their own cookies. See their privacy policies for details.

## Contact
Cookie questions: hello@bigwebdigital.com',
CURRENT_DATE, '1.0')
ON CONFLICT (page_type) DO UPDATE SET
content = EXCLUDED.content,
last_updated = EXCLUDED.last_updated;

-- ============================================
-- NAVIGATION MENUS (Header & Footer)
-- ============================================
INSERT INTO public.navigation_menus (menu_location, label, url, parent_id, sort_order, icon, description) VALUES
-- Header Navigation
('header', 'Services', '/services', NULL, 1, NULL, 'Our services dropdown'),
('header', 'About', '/about', NULL, 2, NULL, 'About us'),
('header', 'Portfolio', '/portfolio', NULL, 3, NULL, 'Our work'),
('header', 'Blog', '/blog', NULL, 4, NULL, 'Latest articles'),
('header', 'Careers', '/careers', NULL, 5, NULL, 'Join our team'),
('header', 'Estimator', '/estimator', NULL, 6, NULL, 'Get estimate'),

-- Footer - Services Column
('footer', 'Web Development', '/services/web-development', NULL, 1, NULL, NULL),
('footer', 'Mobile Apps', '/services/mobile-apps', NULL, 2, NULL, NULL),
('footer', 'UI/UX Design', '/services/ui-ux-design', NULL, 3, NULL, NULL),
('footer', 'SEO & Growth', '/services/seo-growth', NULL, 4, NULL, NULL),
('footer', 'E-Commerce', '/services/ecommerce', NULL, 5, NULL, NULL),
('footer', 'AI Consulting', '/services/ai-consulting', NULL, 6, NULL, NULL),
('footer', 'GAIO', '/services/gaio', NULL, 7, NULL, NULL),
('footer', 'Staff Augmentation', '/services/staff-augmentation', NULL, 8, NULL, NULL),
('footer', 'Website Maintenance', '/services/maintenance', NULL, 9, NULL, NULL),

-- Footer - Company Column
('footer', 'About Us', '/about', NULL, 10, NULL, NULL),
('footer', 'Portfolio', '/portfolio', NULL, 11, NULL, NULL),
('footer', 'Careers', '/careers', NULL, 12, NULL, NULL),
('footer', 'Blog', '/blog', NULL, 13, NULL, NULL),
('footer', 'Contact', '/contact', NULL, 14, NULL, NULL)
ON CONFLICT DO NOTHING;

-- ============================================
-- CTA SECTIONS
-- ============================================
INSERT INTO public.cta_sections (title, description, button_text, button_url, background_type, background_value, display_locations, priority) VALUES
('Ready to Build Something Amazing?', 'Get a free consultation and project estimate. No obligation, no sales pressure—just honest advice from experts who care about your success.', 'Get Free Estimate', '/estimator', 'gradient', 'from-emerald-600 to-cyan-600', '["homepage", "services", "about"]', 1),
('Need Developers Fast?', 'Scale your team with pre-vetted senior engineers. Start within 48 hours.', 'View Staff Augmentation', '/services/staff-augmentation', 'gradient', 'from-indigo-600 to-purple-600', '["services"]', 2),
('Have a Project in Mind?', 'Let''s discuss how we can help. Free 30-minute consultation with our lead architect.', 'Book Consultation', '/contact', 'solid', '#10b981', '["blog", "case-studies"]', 3);

-- ============================================
-- PRICING TIERS (AI Boost & Revenue Website)
-- ============================================
INSERT INTO public.pricing_tiers (page_slug, name, tagline, price, original_price, billing_period, features, highlighted, most_popular, cta_text, cta_url, sort_order) VALUES
('ai-boost', 'AI Chatbot Pro', 'Custom trained on your data', 2497.00, 3500.00, 'one-time', 
'[
  "Custom AI trained on your business data",
  "Unlimited conversations (no per-message fees)",
  "24/7 automated customer support",
  "Lead capture & qualification",
  "Integrates with your CRM",
  "Multi-language support",
  "Analytics dashboard",
  "Priority support & training"
]'::jsonb, true, true, 'Secure My Spot', 'https://raenest.com/pay', 1),

('revenue-website', 'Revenue Website™', 'Complete business growth system', 4997.00, 10000.00, 'one-time',
'[
  "Custom Next.js website (100/100 speed score)",
  "AI chatbot integration included",
  "Premium SEO setup",
  "Google Analytics & tracking",
  "Mobile-responsive design",
  "Content management system",
  "30 days of free revisions",
  "6 months free hosting",
  "Launch within 10 days guaranteed"
]'::jsonb, true, true, 'Get Started', '#contact', 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- TEAM MEMBERS
-- ============================================
INSERT INTO public.team_members (name, role, department, bio, email, linkedin_url, skills, featured, sort_order) VALUES
('Founder & CEO', 'Chief Executive Officer', 'Leadership', 'Visionary leader with 10+ years building digital products that scale. Former tech lead at Fortune 500 companies.', 'ceo@bigwebdigital.com', 'https://linkedin.com/in/bigweb-ceo', '["Strategic Planning", "Business Development", "Product Vision"]', true, 1),
('CTO', 'Chief Technology Officer', 'Engineering', 'Full-stack architect specializing in Next.js, React, and scalable cloud infrastructure. Built systems serving millions of users.', 'cto@bigwebdigital.com', 'https://linkedin.com/in/bigweb-cto', '["Next.js", "React", "Node.js", "AWS", "System Architecture"]', true, 2),
('Lead Designer', 'Head of Design', 'Design', 'Award-winning UI/UX designer with a background in psychology and user research. Figma expert and design systems architect.', 'design@bigwebdigital.com', 'https://linkedin.com/in/bigweb-design', '["Figma", "UI/UX", "Design Systems", "User Research", "Prototyping"]', true, 3)
ON CONFLICT DO NOTHING;

-- ============================================
-- CLIENT LOGOS (Trust Indicators)
-- ============================================
INSERT INTO public.client_logos (client_name, logo_url, website_url, industry, featured, sort_order) VALUES
('Acme Corporation', '/clients/acme.svg', 'https://acme.com', 'Technology', true, 1),
('Global Enterprises', '/clients/global.svg', 'https://global.com', 'Finance', true, 2),
('Innovate Inc', '/clients/innovate.svg', 'https://innovate.com', 'SaaS', true, 3),
('TechStart', '/clients/techstart.svg', 'https://techstart.com', 'Startup', false, 4)
ON CONFLICT DO NOTHING;
