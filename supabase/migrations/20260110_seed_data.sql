-- =====================================================
-- SEED DATA FOR CLEAN SLATE BACKEND (CONVERSION LAB)
-- =====================================================

-- 1. SEED SERVICES/OFFERS
INSERT INTO cms_services (title, slug, tagline, description, price_from, price_to, pricing_model, features, icon_name, color, sort_order, is_active) VALUES
(
  'Conversion Diagnostic',
  'diagnostic',
  'Know Exactly What''s Broken',
  'Get a forensic audit of your website with a prioritized fix list. We analyze your funnel, identify revenue blockers, and show you exactly what to fix first.',
  399,
  NULL,
  'fixed',
  '["Video walkthrough of your site", "Prioritized fix list", "Messaging & copy audit", "Competitor benchmarking", "48-hour turnaround"]'::jsonb,
  'Target',
  'blue',
  1,
  true
),
(
  'Fix Sprint',
  'fix-sprint',
  'Fix The Critical 20% in 7 Days',
  'We implement the high-impact fixes that drive 80% of results. Perfect for sites that need surgical precision, not a complete rebuild.',
  1000,
  NULL,
  'from',
  '["1-3 pages optimized", "Copy rewrites for clarity", "CTA improvements", "Mobile responsiveness fixes", "7-day execution"]'::jsonb,
  'Zap',
  'orange',
  2,
  true
),
(
  'Revenue System',
  'revenue-system',
  'Complete Website Rebuild',
  'A conversion-engineered website built from the ground up. Modern architecture, lightning-fast performance, and every pixel optimized for revenue.',
  3000,
  NULL,
  'from',
  '["Modern architecture", "Conversion-first design", "Sub-2-second load times", "Custom CMS", "8-week build process"]'::jsonb,
  'Layers',
  'orange',
  3,
  true
),
(
  'Optimization Retainer',
  'retainer',
  'Your In-House CRO Team',
  'Continuous optimization, A/B testing, and refinement. We act as your dedicated conversion team, constantly improving your revenue.',
  500,
  2000,
  'monthly',
  '["Monthly A/B tests", "Conversion rate optimization", "Performance monitoring", "Priority support", "Ongoing improvements"]'::jsonb,
  'RefreshCw',
  'green',
  4,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  price_from = EXCLUDED.price_from,
  price_to = EXCLUDED.price_to,
  pricing_model = EXCLUDED.pricing_model,
  features = EXCLUDED.features,
  icon_name = EXCLUDED.icon_name,
  color = EXCLUDED.color,
  sort_order = EXCLUDED.sort_order;

-- 2. SEED CASE STUDIES
INSERT INTO cms_case_studies (title, slug, client_name, industry, challenge, solution, results, image_url, is_published, sort_order) VALUES
(
  'SaaS Trial Conversion Breakthrough',
  'saas-trial-conversion',
  'TechFlow SaaS',
  'B2B SaaS',
  'High traffic to pricing page but only 2% trial signups. Complex messaging and unclear value proposition were causing drop-offs.',
  'Simplified pricing page, clarified value prop, reduced form fields, added social proof above fold.',
  '{"conversion_increase": "127%", "trial_signups": "+450/month", "revenue_impact": "$180k ARR"}'::jsonb,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
  true,
  1
),
(
  'E-commerce Cart Abandonment Fix',
  'ecommerce-cart-fix',
  'StyleHub Fashion',
  'E-commerce',
  '70% cart abandonment rate. Customers adding items but not completing checkout. Mobile experience was poor.',
  'Redesigned checkout flow, added trust badges, one-page checkout, optimized for mobile.',
  '{"conversion_increase": "85%", "cart_abandonment": "70% → 38%", "revenue_increase": "$2.1M annually"}'::jsonb,
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90',
  true,
  2
),
(
  'Lead Gen Funnel Optimization',
  'lead-gen-optimization',
  'GrowthMetrics',
  'Marketing Agency',
  'Spending $15k/month on ads but only getting 30 qualified leads. Cost per lead was too high.',
  'Rebuilt landing pages, multi-step form, video testimonials, optimized ad-to-page message match.',
  '{"leads_increase": "300%", "cost_per_lead": "$500 → $125", "monthly_leads": "30 → 120"}'::jsonb,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90',
  true,
  3
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  client_name = EXCLUDED.client_name,
  industry = EXCLUDED.industry,
  challenge = EXCLUDED.challenge,
  solution = EXCLUDED.solution,
  results = EXCLUDED.results,
  image_url = EXCLUDED.image_url,
  is_published = EXCLUDED.is_published,
  sort_order = EXCLUDED.sort_order;

-- 3. UPDATE SITE SETTINGS
INSERT INTO cms_site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'BIGWEB Digital', 'text', 'Site name'),
('site_tagline', 'The Conversion Lab', 'text', 'Site tagline'),
('contact_email', 'hello@bigwebdigital.com', 'text', 'Contact email'),
('contact_phone', '+234 (703) 057-6537', 'text', 'Contact phone'),
('primary_color', '#ea580c', 'text', 'Primary brand color')
ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  updated_at = NOW();
