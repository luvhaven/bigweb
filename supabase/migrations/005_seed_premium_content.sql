-- 005_seed_premium_content.sql
-- Seed the database with the High-Quality "Static" content.
-- Includes Table Creation if missing.

-- 0. Ensure Extensions (Safe to run if exists)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Hero Section (Homepage)
-- Definition from 001_cms_schema.sql
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

DELETE FROM public.hero_sections WHERE page_slug = 'home';

INSERT INTO public.hero_sections (
    page_slug, 
    title, 
    subtitle, 
    description, 
    cta_primary_text, 
    cta_primary_url, 
    background_image, 
    stats,
    highlight,
    animation_type
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

-- 2. Portfolio Projects (Selected Works)
-- Definition from 001_complete_schema.sql with necessary columns
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

TRUNCATE TABLE public.portfolio_projects;

-- Note: Using 'image' column to match schema. Component updated to read 'image' or 'image_url'.
INSERT INTO public.portfolio_projects (
    title, 
    slug, 
    description, 
    category, 
    client, 
    image, 
    featured, 
    order_index,
    technologies
) VALUES 
(
    'TechCorp Enterprise Platform',
    'techcorp-platform',
    'Cloud-based collaboration platform for enterprise teams',
    'SaaS',
    'TechCorp',
    '/artifacts/techcorp_platform_dashboard_1764589013521.png',
    true,
    1,
    '{"React", "Next.js", "Node.js"}'
),
(
    'FinPay Digital Wallet',
    'finpay-wallet',
    'Secure mobile payment solution with cryptocurrency integration',
    'Fintech',
    'FinPay',
    '/artifacts/finpay_wallet_app_1764589030619.png',
    true,
    2,
    '{"React Native", "TypeScript"}'
),
(
    'HealthTrack Pro',
    'healthtrack-app',
    'AI-powered health monitoring platform',
    'Healthcare',
    'HealthTrack',
    '/artifacts/healthtrack_dashboard_1764589047595.png',
    true,
    3,
    '{"Python", "TensorFlow", "React"}'
),
(
    'Luxury Fashion Store',
    'luxury-fashion',
    'Premium e-commerce experience with AR try-on',
    'E-Commerce',
    'Luxe',
    '/artifacts/luxury_fashion_ecommerce_1764589064929.png',
    true,
    4,
    '{"Shopify", "WebGL"}'
),
(
    'AI Content Studio',
    'ai-content-studio',
    'Next-generation content creation platform',
    'AI',
    'StudioAI',
    '/artifacts/ai_content_studio_1764589081328.png',
    true,
    5,
    '{"OpenAI", "Next.js"}'
),
(
    'CryptoVault Exchange',
    'crypto-exchange',
    'Institutional-grade cryptocurrency trading platform',
    'Fintech',
    'CryptoVault',
    'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80',
    true,
    6,
    '{"Blockchain", "Rust"}'
),
(
    'EcoSmart Home',
    'ecosmart-home',
    'Smart home automation app for energy efficiency',
    'IoT',
    'EcoSmart',
    'https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=1200',
    true,
    7,
    '{"IoT", "React Native"}'
),
(
    'Urban Eats',
    'urban-eats',
    'Hyper-local food delivery experience',
    'Mobile App',
    'Urban',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    true,
    8,
    '{"Flutter", "Firebase"}'
),
(
    'Neon Realty',
    'neon-realty',
    'Immersive 3D real estate browsing platform',
    'Real Estate',
    'Neon',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    true,
    9,
    '{"Three.js", "Vue"}'
);
