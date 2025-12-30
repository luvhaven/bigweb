-- ROLLBACK_wrong_project.sql
-- Run this in the WRONG project's SQL editor to undo migrations 005 and 006

-- ============================================
-- ROLLBACK 006: Dynamic Widgets
-- ============================================

-- Drop policies
DROP POLICY IF EXISTS "Public read clients" ON public.clients;
DROP POLICY IF EXISTS "Admin manage clients" ON public.clients;
DROP POLICY IF EXISTS "Public read videos" ON public.video_showroom;
DROP POLICY IF EXISTS "Admin manage videos" ON public.video_showroom;

-- Drop tables
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.video_showroom CASCADE;

-- Note: We don't delete testimonials data as it might have existed before

-- ============================================
-- ROLLBACK 005: Premium Content Seed
-- ============================================

-- Delete seeded data
DELETE FROM public.hero_sections WHERE page_slug = 'home';
DELETE FROM public.portfolio_projects WHERE slug IN (
    'techcorp-platform',
    'finpay-wallet', 
    'healthtrack-app',
    'luxury-fashion',
    'ai-content-studio',
    'crypto-exchange',
    'ecosmart-home',
    'urban-eats',
    'neon-realty'
);

-- Only drop tables if they were empty/created by these migrations
-- If these tables had existing data, comment out these DROP statements
DROP TABLE IF EXISTS public.portfolio_projects CASCADE;
DROP TABLE IF EXISTS public.hero_sections CASCADE;

-- ============================================
-- VERIFICATION
-- ============================================
-- After running this, verify with:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
