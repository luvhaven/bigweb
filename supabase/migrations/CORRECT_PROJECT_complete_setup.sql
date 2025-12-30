-- CORRECT_PROJECT_complete_setup.sql
-- Run this in your BIGWEB project's Supabase SQL editor
-- This combines migrations 005 and 006 with all fixes applied

-- ============================================
-- PART 1: EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- PART 2: HERO SECTIONS TABLE
-- ============================================
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

-- Seed Hero Section (Homepage)
DELETE FROM public.hero_sections WHERE page_slug = 'home';
INSERT INTO public.hero_sections (
    page_slug, title, subtitle, description, 
    cta_primary_text, cta_primary_url, background_image, 
    stats, highlight, animation_type
) VALUES (
    'home',
    'Turn Visitors Into Customers',
    'AI-Powered Growth That Works',
    'Stop losing sales to poor UX. We build conversion-optimized websites that turn your traffic into revenue—averaging 4x conversion increases for our clients.',
    'Get Your Free Growth Audit',
    '/contact',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    '[{"value": "4x", "label": "Your Conversions"}]'::jsonb,
    '',
    'fade'
);

-- ============================================
-- PART 3: PORTFOLIO PROJECTS TABLE
-- ============================================
-- Drop existing table if it has incompatible schema
DROP TABLE IF EXISTS public.portfolio_projects CASCADE;

-- Create fresh table with correct schema
CREATE TABLE public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Portfolio Projects
INSERT INTO public.portfolio_projects (
    title, slug, description, category, client, 
    image, featured, order_index, technologies
) VALUES  
('TechCorp Enterprise Platform', 'techcorp-platform', 'Cloud-based collaboration platform for enterprise teams', 'SaaS', 'TechCorp', '/artifacts/techcorp_platform_dashboard_1764589013521.png', true, 1, '{"React", "Next.js", "Node.js"}'),
('FinPay Digital Wallet', 'finpay-wallet', 'Secure mobile payment solution with cryptocurrency integration', 'Fintech', 'FinPay', '/artifacts/finpay_wallet_app_1764589030619.png', true, 2, '{"React Native", "TypeScript"}'),
('HealthTrack Pro', 'healthtrack-app', 'AI-powered health monitoring platform', 'Healthcare', 'HealthTrack', '/artifacts/healthtrack_dashboard_1764589047595.png', true, 3, '{"Python", "TensorFlow", "React"}'),
('Luxury Fashion Store', 'luxury-fashion', 'Premium e-commerce experience with AR try-on', 'E-Commerce', 'Luxe', '/artifacts/luxury_fashion_ecommerce_1764589064929.png', true, 4, '{"Shopify", "WebGL"}'),
('AI Content Studio', 'ai-content-studio', 'Next-generation content creation platform', 'AI', 'StudioAI', '/artifacts/ai_content_studio_1764589081328.png', true, 5, '{"OpenAI", "Next.js"}'),
('CryptoVault Exchange', 'crypto-exchange', 'Institutional-grade cryptocurrency trading platform', 'Fintech', 'CryptoVault', 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80', true, 6, '{"Blockchain", "Rust"}'),
('EcoSmart Home', 'ecosmart-home', 'Smart home automation app for energy efficiency', 'IoT', 'EcoSmart', 'https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=1200', true, 7, '{"IoT", "React Native"}'),
('Urban Eats', 'urban-eats', 'Hyper-local food delivery experience', 'Mobile App', 'Urban', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', true, 8, '{"Flutter", "Firebase"}'),
('Neon Realty', 'neon-realty', 'Immersive 3D real estate browsing platform', 'Real Estate', 'Neon', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', true, 9, '{"Three.js", "Vue"}');

-- ============================================
-- PART 4: CLIENTS TABLE
-- ============================================
-- Drop existing table if it has incompatible schema
DROP TABLE IF EXISTS public.clients CASCADE;

-- Create fresh table
CREATE TABLE public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(500) NOT NULL,
    active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Clients
INSERT INTO public.clients (name, logo_url, sort_order) VALUES
('TechCorp', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 1),
('Innovate', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 2),
('FutureScale', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 3),
('GlobalSystems', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 4),
('AlphaGroup', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 5),
('OmegaLabs', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 6);

-- ============================================
-- PART 5: VIDEO SHOWROOM TABLE
-- ============================================
-- Drop existing table if it has incompatible schema
DROP TABLE IF EXISTS public.video_showroom CASCADE;

-- Create fresh table
CREATE TABLE public.video_showroom (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500) NOT NULL,
    video_url VARCHAR(500),
    duration VARCHAR(20),
    category VARCHAR(50) DEFAULT 'Showcase',
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Videos
INSERT INTO public.video_showroom (title, description, thumbnail_url, duration, category, featured, sort_order) VALUES
('Brand Transformation', 'How we helped a startup scale to $10M ARR', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', '3:45', 'Case Study', true, 1),
('Design Process', 'Behind the scenes of our creative workflow', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', '2:30', 'Process', false, 2),
('Client Testimonial', 'CEO shares their experience working with us', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80', '1:45', 'Testimonial', false, 3),
('Tech Stack Demo', 'Exploring our cutting-edge development tools', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', '4:20', 'Technical', false, 4);

-- ============================================
-- PART 6: TESTIMONIALS TABLE & SEED
-- ============================================
-- Drop existing table if it has incompatible schema or constraints
DROP TABLE IF EXISTS public.testimonials CASCADE;

-- Create fresh table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  client_company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  client_image TEXT,
  result_metric TEXT,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Testimonials
INSERT INTO public.testimonials (client_name, client_role, client_company, content, rating, client_image, result_metric, is_featured, status, order_index) VALUES
('Sarah Jenkins', 'Marketing Director', 'TechFlow Solutions', 'BIGWEB transformed our digital presence completely. Their attention to detail and innovative approach resulted in a 412% increase in conversions.', 5, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80', '+412% Conversions', true, 'active', 1),
('Kwame Osei', 'Tech Founder', 'Innovate Africa', 'The scalability of the architecture they built allowed us to expand to three new countries in under six months. World-class engineering.', 5, 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&q=80', '3 New Markets', true, 'active', 2),
('Lars Nielsen', 'Product Lead', 'Nordic Design Co.', 'Minimalist, efficient, and incredibly powerful. They understood our Scandinavian design ethos perfectly while delivering robust functionality.', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80', '200% Efficiency', true, 'active', 3),
('Isabella Rossi', 'Creative Director', 'Milano Fashion', 'A digital masterpiece. The animations and interactions feel so organic. Our luxury clientele finally has an online experience that matches our brand.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80', 'Award Winning', true, 'active', 4),
('Amir Al-Fayed', 'CEO', 'Future Vision Holdings', 'We needed a partner who could execute at the speed of Dubai. BIGWEB delivered a complex enterprise solution weeks ahead of schedule.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', '2x Revenue', true, 'active', 5);

-- ============================================
-- PART 7: ROW LEVEL SECURITY
-- ============================================

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_showroom ENABLE ROW LEVEL SECURITY;

-- Clients Policies
DROP POLICY IF EXISTS "Public read clients" ON public.clients;
CREATE POLICY "Public read clients" ON public.clients FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage clients" ON public.clients;
CREATE POLICY "Admin manage clients" ON public.clients FOR ALL USING (auth.role() = 'authenticated');

-- Videos Policies
DROP POLICY IF EXISTS "Public read videos" ON public.video_showroom;
CREATE POLICY "Public read videos" ON public.video_showroom FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage videos" ON public.video_showroom;
CREATE POLICY "Admin manage videos" ON public.video_showroom FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- VERIFICATION
-- ============================================
-- After running, verify with:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
