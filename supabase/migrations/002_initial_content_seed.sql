-- =====================================================
-- BIGWEB Digital - Initial Content Seed
-- Migrates hardcoded frontend content to database
-- =====================================================

-- =====================================================
-- 1. CAPABILITIES (The 5 Core Services)
-- =====================================================

INSERT INTO capabilities (slug, number, title, description, icon, color, route, features, order_index, status)
VALUES
  (
    'web-engineering',
    '01',
    'Conversion-First Website Engineering',
    'We design and build websites engineered to guide decisions, remove friction, and convert traffic into action.',
    'Terminal',
    'blue',
    '/services/web-engineering',
    '[
      {"icon": "Palette", "text": "UI/UX design"},
      {"icon": "Binary", "text": "Frontend & backend"},
      {"icon": "Zap", "text": "Speed optimization"},
      {"icon": "Smartphone", "text": "Mobile architecture"},
      {"icon": "Layout", "text": "Conversion layouts"}
    ]'::jsonb,
    1,
    'published'
  ),
  (
    'funnel-architecture',
    '02',
    'Funnel & Journey Architecture',
    'We architect user journeys that move prospects from curiosity to commitment with clarity and intent.',
    'GitBranch',
    'purple',
    '/services/funnel-architecture',
    '[
      {"icon": "FileText", "text": "Landing pages"},
      {"icon": "MousePointer2", "text": "Lead funnels"},
      {"icon": "CheckCircle2", "text": "Booking flows"},
      {"icon": "TrendingUp", "text": "Sales funnels"},
      {"icon": "Layers", "text": "Drop-off reduction"}
    ]'::jsonb,
    2,
    'published'
  ),
  (
    'revenue-systems',
    '03',
    'Revenue System Engineering',
    'We connect websites to real sales infrastructure that captures, qualifies, and converts demand.',
    'Cpu',
    'orange',
    '/services/revenue-systems',
    '[
      {"icon": "Settings", "text": "CRM setup"},
      {"icon": "Workflow", "text": "Automation"},
      {"icon": "Mail", "text": "Email sequences"},
      {"icon": "Target", "text": "Lead scoring"},
      {"icon": "Activity", "text": "Analytics & dashboards"}
    ]'::jsonb,
    3,
    'published'
  ),
  (
    'conversion-science',
    '04',
    'Conversion Science (The Lab™)',
    'We run continuous experiments to improve performance using data, testing, and behavioral insight.',
    'Microscope',
    'green',
    '/services/conversion-science',
    '[
      {"icon": "TestTube2", "text": "A/B testing"},
      {"icon": "Eye", "text": "UX experiments"},
      {"icon": "Search", "text": "Conversion analysis"},
      {"icon": "RefreshCw", "text": "Continuous optimization"}
    ]'::jsonb,
    4,
    'published'
  ),
  (
    'trust-optimization',
    '05',
    'Performance & Trust Optimization',
    'We optimize the invisible factors that determine whether users trust and act.',
    'ShieldCheck',
    'red',
    '/services/trust-optimization',
    '[
      {"icon": "Gauge", "text": "Speed & Vitals"},
      {"icon": "Globe", "text": "SEO foundations"},
      {"icon": "CheckCircle2", "text": "Accessibility"},
      {"icon": "Lock", "text": "Trust signals"}
    ]'::jsonb,
    5,
    'published'
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  features = EXCLUDED.features,
  updated_at = NOW();

-- =====================================================
-- 2. ENGAGEMENTS (The 4 Offers)
-- =====================================================

INSERT INTO engagements (slug, name, tagline, phase, description, price, price_subtext, features, icon, route, highlighted, badge_text, color_scheme, order_index, status)
VALUES
  (
    'revenue-roadmap',
    'Revenue Roadmap',
    'Phase 01: Clinical Diagnostic',
    'Diagnostic',
    'Stop guessing. We identify exactly where you are losing revenue and give you a detailed clinical battle plan to fix it.',
    '$500',
    'One-Time / 7-Day Delivery',
    '["Conversion Leak Identification", "UX/UI Friction Mapping", "Messaging Clarity Audit", "Technical Performance Scan", "Prioritized Fix Roadmap"]'::jsonb,
    'Search',
    '/offers/revenue-roadmap',
    false,
    null,
    'zinc',
    1,
    'published'
  ),
  (
    'fix-sprint',
    'Fix Sprint',
    'Phase 02: Rapid Execution',
    'Execution',
    'A focused implementation sprint where our engineers fix the highest-impact conversion issues identified in your roadmap.',
    '$1,500',
    'Per Sprint / High Impact',
    '["Priority UX/UI Fixes", "CTA & Flow Optimization", "Mobile Conversion Cleanup", "Speed & Core Web Vitals", "Trust Signal Deployment"]'::jsonb,
    'Zap',
    '/offers/fix-sprint',
    false,
    null,
    'orange',
    2,
    'published'
  ),
  (
    'growth-retainer',
    'Growth Retainer',
    'Phase 03: Continuous Lab',
    'Scale',
    'Ongoing A/B testing, psychology-based tweaks, and continuous engineering to steadily increase your profit velocity.',
    '$2,500',
    '/month (Starting)',
    '["Monthly A/B Test Deployment", "Live Conversion Monitoring", "Continuous UI Refinement", "Psychological Vulnerability Testing", "Global Infrastructure Support"]'::jsonb,
    'FlaskConical',
    '/offers/retainer',
    true,
    'Highest Long-Term ROI',
    'orange',
    3,
    'published'
  ),
  (
    'revenue-system',
    'Revenue System',
    'Tailored Market Dominance',
    'Dominance',
    'A complete high-fidelity infrastructure rebuild. Engineered for speed, trust, and massive transaction volume.',
    '$25,000+',
    'Full System Build',
    '["Custom Next.js Architecture", "Elite Industrial Branding", "Headless Commerce Stack", "Global Performance Edge", "Multi-Channel Funnel Sync"]'::jsonb,
    'Rocket',
    '/offers/revenue-system',
    false,
    null,
    'zinc',
    4,
    'published'
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  updated_at = NOW();

-- =====================================================
-- 3. PROCESS PHASES (How It Works)
-- =====================================================

INSERT INTO process_phases (step_number, phase_id, title, subtitle, description, details, deliverable, timeline, price, cta_text, cta_link, icon, color, bg_color, border_color, order_index, status)
VALUES
  (
    '01',
    'PHASE_01',
    'Revenue Roadmap',
    'Diagnostic',
    'We don''t guess. We deploy a clinical deep-scan of your funnel to find exactly where money is leaking.',
    '["Full Conversion Leak Analysis", "UX/UI Friction Mapping", "Competitor Architecture Scan", "Prioritized Battle Plan"]'::jsonb,
    'PDF Roadmap + Implementation Guide',
    '7 Days',
    '$500 One-Time',
    'Initialize Diagnostic',
    '/offers/revenue-roadmap',
    'Search',
    'text-orange-600',
    'bg-orange-600/10',
    'border-orange-600/20',
    1,
    'published'
  ),
  (
    '02',
    'PHASE_02',
    'Fix Sprint',
    'Execution',
    'Rapid deployment of high-impact fixes. We patch the leaks identified in the Roadmap to stabilize revenue.',
    '["High-Priority UX/UI Fixes", "Checkout Flow Optimization", "Mobile Responsiveness Repair", "Trust Signal Deployment"]'::jsonb,
    'Optimized Core Pages',
    '5-10 Days',
    '$1,500 / Sprint',
    'Deploy Fix Team',
    '/offers/fix-sprint',
    'Zap',
    'text-emerald-500',
    'bg-emerald-500/10',
    'border-emerald-500/20',
    2,
    'published'
  ),
  (
    '03',
    'PHASE_03',
    'Growth Retainer',
    'Scale',
    'The Conversion Lab™. Continuous testing, data analysis, and engineering to compound your growth month over month.',
    '["Monthly A/B Testing", "Heatmap & Session Analysis", "New Feature Implementation", "Algorithmic Performance Tuning"]'::jsonb,
    'Monthly Growth Reports + ROI Tracking',
    'Ongoing',
    '$2,500 / Month',
    'Enter The Lab',
    '/offers/retainer',
    'FlaskConical',
    'text-blue-500',
    'bg-blue-500/10',
    'border-blue-500/20',
    3,
    'published'
  ),
  (
    '04',
    'PHASE_04',
    'Revenue System',
    'Dominance',
    'For players ready to own the market. A complete ground-up rebuild of your digital infrastructure.',
    '["Custom Next.js Architecture", "Headless Commerce Integration", "Global CDN Edge Delivery", "Enterprise Security Hardening"]'::jsonb,
    'Enterprise-Grade Digital Platform',
    '6-8 Weeks',
    'From $25,000',
    'Build The System',
    '/offers/revenue-system',
    'Rocket',
    'text-purple-500',
    'bg-purple-500/10',
    'border-purple-500/20',
    4,
    'published'
  );

-- =====================================================
-- 4. PAGE METADATA (SEO)
-- =====================================================

INSERT INTO page_metadata (route, title, description, keywords, og_title, og_description, robots)
VALUES
  (
    '/',
    'BIGWEB Digital - Elite Web Engineering for Global Growth Teams',
    'Clinical web engineering for high-performance revenue engines. We eliminate guesswork and deploy conversion-driven digital infrastructure.',
    ARRAY['web engineering', 'conversion optimization', 'digital agency', 'revenue engineering'],
    'BIGWEB Digital - Elite Web Engineering',
    'We build high-performance revenue engines for global growth teams.',
    'index,follow'
  ),
  (
    '/services',
    'Capabilities - BIGWEB Digital',
    'Explore our 5 core capabilities: Website Engineering, Funnel Architecture, Revenue Systems, Conversion Science, and Trust Optimization.',
    ARRAY['web services', 'digital capabilities', 'conversion engineering'],
    'Our Capabilities - BIGWEB Digital',
    'Elite engineering capabilities for revenue-driven digital platforms.',
    'index,follow'
  ),
  (
    '/how-it-works',
    'How We Work - BIGWEB Digital',
    'Our clinical methodology: Diagnose, Execute, Scale, Dominate. A proven process for extracting maximum yield from your traffic.',
    ARRAY['process', 'methodology', 'how it works'],
    'Our Process - BIGWEB Digital',
    'Clinical methodology for revenue extraction and growth.',
    'index,follow'
  ),
  (
    '/case-studies',
    'Evidence - Case Studies - BIGWEB Digital',
    'Real results from real clients. Explore our portfolio of high-impact digital transformations.',
    ARRAY['case studies', 'portfolio', 'results', 'evidence'],
    'Evidence - BIGWEB Digital',
    'Proven results from our engineering work.',
    'index,follow'
  ),
  (
    '/contact',
    'Contact - BIGWEB Digital',
    'Get in touch with our engineering team to discuss your project.',
    ARRAY['contact', 'get in touch', 'consultation'],
    'Contact Us - BIGWEB Digital',
    'Speak with our engineering team about your digital infrastructure.',
    'index,follow'
  )
ON CONFLICT (route) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  keywords = EXCLUDED.keywords,
  updated_at = NOW();

-- =====================================================
-- 5. FEATURE FLAGS
-- =====================================================

INSERT INTO feature_flags (flag_key, flag_name, description, enabled, config)
VALUES
  ('live_chat', 'Live Chat Widget', 'Enable/disable live chat support widget', false, '{"provider": "intercom"}'::jsonb),
  ('dark_mode', 'Dark Mode Toggle', 'Allow users to switch between light and dark themes', false, '{}'::jsonb),
  ('blog_section', 'Blog Section', 'Show/hide blog in navigation', true, '{}'::jsonb),
  ('ai_estimator', 'AI Project Estimator', 'Enable AI-powered project estimation tool', true, '{}'::jsonb),
  ('visitor_counter', 'Live Visitor Counter', 'Show live visitor count widget', true, '{}'::jsonb)
ON CONFLICT (flag_key) DO UPDATE SET
  flag_name = EXCLUDED.flag_name,
  description = EXCLUDED.description,
  updated_at = NOW();
