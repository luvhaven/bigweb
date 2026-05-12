-- 015_newyear_campaign.sql
-- New Year 2026 Campaign Infrastructure

-- Campaign Packages Table
CREATE TABLE IF NOT EXISTS public.campaign_packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    description TEXT,
    original_price DECIMAL(10,2) NOT NULL,
    promo_price DECIMAL(10,2) NOT NULL,
    discount_percent INTEGER,
    currency VARCHAR(3) DEFAULT 'USD',
    features JSONB DEFAULT '[]'::jsonb,
    bonuses JSONB DEFAULT '[]'::jsonb,
    target_audience VARCHAR(200),
    icon VARCHAR(50),
    theme_color VARCHAR(50) DEFAULT 'emerald',
    spots_available INTEGER DEFAULT 50,
    spots_taken INTEGER DEFAULT 0,
    campaign_start TIMESTAMP WITH TIME ZONE,
    campaign_end TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign Leads Table
CREATE TABLE IF NOT EXISTS public.campaign_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    package_id UUID REFERENCES public.campaign_packages(id),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    company_name VARCHAR(200),
    website_url VARCHAR(500),
    country VARCHAR(100),
    budget_range VARCHAR(100),
    message TEXT,
    source VARCHAR(100), -- facebook, linkedin, direct, etc.
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, converted, lost
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign Analytics Table
CREATE TABLE IF NOT EXISTS public.campaign_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    package_slug VARCHAR(100),
    event_type VARCHAR(50), -- page_view, cta_click, form_start, form_complete
    visitor_id VARCHAR(200),
    session_id VARCHAR(200),
    referrer VARCHAR(500),
    user_agent TEXT,
    country VARCHAR(100),
    device_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.campaign_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_analytics ENABLE ROW LEVEL SECURITY;

-- Public read for packages
CREATE POLICY "Public read packages" ON public.campaign_packages FOR SELECT USING (active = true);

-- Admin full access
CREATE POLICY "Admin packages" ON public.campaign_packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin leads" ON public.campaign_leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin analytics" ON public.campaign_analytics FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous inserts for leads and analytics
CREATE POLICY "Public insert leads" ON public.campaign_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert analytics" ON public.campaign_analytics FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_campaign_leads_package ON public.campaign_leads(package_id);
CREATE INDEX IF NOT EXISTS idx_campaign_leads_status ON public.campaign_leads(status);
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_package ON public.campaign_analytics(package_slug);
CREATE INDEX IF NOT EXISTS idx_campaign_analytics_event ON public.campaign_analytics(event_type);

-- Seed the 3 packages
INSERT INTO public.campaign_packages (slug, name, tagline, description, original_price, promo_price, discount_percent, features, bonuses, target_audience, icon, theme_color, spots_available, campaign_start, campaign_end) VALUES
(
    'digital-launch-pro',
    'Digital Launch Pro',
    'Start 2026 with a website that actually converts',
    'Everything you need to launch your business online with confidence. Perfect for startups and entrepreneurs ready to make their mark.',
    12000,
    4997,
    58,
    '[
        {"title": "Premium 5-Page Website", "description": "Custom design with conversion optimization", "value": "$5,000"},
        {"title": "Technical SEO Foundation", "description": "3 months of SEO setup and optimization", "value": "$3,000"},
        {"title": "Google Analytics + Training", "description": "Full setup with 2-hour training session", "value": "$500"},
        {"title": "Mobile-First Responsive Design", "description": "Perfect on every device", "value": "$1,500"},
        {"title": "3 Months Premium Support", "description": "Priority email and chat support", "value": "$1,500"},
        {"title": "Performance Optimization", "description": "Sub-3 second load times guaranteed", "value": "$500"}
    ]'::jsonb,
    '[
        {"title": "FREE Logo Design", "value": "$500", "description": "Professional brand identity"},
        {"title": "FREE Social Media Kit", "value": "$300", "description": "Profile images and banners"},
        {"title": "FREE Copywriting", "value": "$700", "description": "Professional website copy"}
    ]'::jsonb,
    'Startups, Entrepreneurs, Small Businesses',
    'Rocket',
    'emerald',
    50,
    '2026-01-01 00:00:00+00',
    '2026-01-07 23:59:59+00'
),
(
    'revenue-rocket',
    'Revenue Rocket',
    'Turn your traffic into a revenue machine',
    'For growing businesses ready to scale. Complete digital transformation that turns visitors into customers.',
    24000,
    8997,
    62,
    '[
        {"title": "Custom E-commerce Platform", "description": "Shopify, WooCommerce, or custom build", "value": "$8,000"},
        {"title": "Conversion Rate Optimization", "description": "6 months of CRO with A/B testing", "value": "$6,000"},
        {"title": "SEO Marketing Campaign", "description": "6 months of content and link building", "value": "$4,500"},
        {"title": "Sales Funnel Design", "description": "Complete funnel with automation", "value": "$3,000"},
        {"title": "Email Marketing Automation", "description": "Sequences, segments, and campaigns", "value": "$2,000"},
        {"title": "Advanced Analytics Dashboard", "description": "Custom reporting dashboard", "value": "$1,500"},
        {"title": "Dedicated Success Manager", "description": "Weekly calls and strategy sessions", "value": "$3,000"}
    ]'::jsonb,
    '[
        {"title": "FREE Competitor Analysis", "value": "$1,500", "description": "Deep-dive into your market"},
        {"title": "FREE Ad Creative Pack", "value": "$1,000", "description": "10 ad designs for each platform"},
        {"title": "FREE Retargeting Setup", "value": "$800", "description": "Facebook & Google pixel setup"}
    ]'::jsonb,
    'E-commerce, Growing Businesses, Agencies',
    'TrendingUp',
    'blue',
    30,
    '2026-01-01 00:00:00+00',
    '2026-01-07 23:59:59+00'
),
(
    'empire-builder',
    'Empire Builder',
    'Dominate your market in 2026',
    'The complete digital transformation for established businesses ready to lead their industry. Everything you need to build a digital empire.',
    75000,
    24997,
    67,
    '[
        {"title": "Premium Website + Mobile App", "description": "Full-stack development with native apps", "value": "$25,000"},
        {"title": "AI Chatbot Integration", "description": "Custom trained on your business", "value": "$8,000"},
        {"title": "Complete Digital Marketing", "description": "12 months of multi-channel campaigns", "value": "$18,000"},
        {"title": "Technical SEO + Content Strategy", "description": "12 months of aggressive growth", "value": "$12,000"},
        {"title": "Conversion Optimization", "description": "Continuous testing and improvement", "value": "$8,000"},
        {"title": "UI/UX Design Overhaul", "description": "Premium redesign of your digital presence", "value": "$6,000"},
        {"title": "Monthly Strategy Sessions", "description": "C-level strategy consultations", "value": "$6,000"},
        {"title": "Priority Support 24/7", "description": "Dedicated team at your service", "value": "$4,000"},
        {"title": "Quarterly Business Reviews", "description": "Performance analysis and roadmapping", "value": "$3,000"}
    ]'::jsonb,
    '[
        {"title": "FREE Brand Strategy", "value": "$5,000", "description": "Complete brand positioning"},
        {"title": "FREE Video Production", "value": "$3,000", "description": "2 professional promo videos"},
        {"title": "FREE CRM Integration", "value": "$2,500", "description": "Seamless system integration"},
        {"title": "FREE Team Training", "value": "$2,000", "description": "Full team onboarding program"}
    ]'::jsonb,
    'Enterprises, Established Businesses, Scale-ups',
    'Crown',
    'violet',
    15,
    '2026-01-01 00:00:00+00',
    '2026-01-07 23:59:59+00'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    original_price = EXCLUDED.original_price,
    promo_price = EXCLUDED.promo_price,
    discount_percent = EXCLUDED.discount_percent,
    features = EXCLUDED.features,
    bonuses = EXCLUDED.bonuses,
    target_audience = EXCLUDED.target_audience,
    theme_color = EXCLUDED.theme_color,
    spots_available = EXCLUDED.spots_available,
    updated_at = NOW();
