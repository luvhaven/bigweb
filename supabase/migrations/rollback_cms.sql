-- SAFE ROLLBACK SCRIPT - Only removes CMS tables without affecting existing project
-- Run this in Supabase SQL Editor

-- Drop CMS-specific triggers first (won't affect existing project triggers)
DROP TRIGGER IF EXISTS update_site_settings_timestamp ON public.site_settings;
DROP TRIGGER IF EXISTS update_page_content_timestamp ON public.page_content;
DROP TRIGGER IF EXISTS update_hero_sections_timestamp ON public.hero_sections;
DROP TRIGGER IF EXISTS update_service_pages_timestamp ON public.service_pages;
DROP TRIGGER IF EXISTS update_media_library_timestamp ON public.media_library;
DROP TRIGGER IF EXISTS update_pricing_timestamp ON public.pricing_tiers;
DROP TRIGGER IF EXISTS update_legal_pages_timestamp ON public.legal_pages;

-- Drop CMS tables in reverse order (CASCADE will handle policies automatically)
DROP TABLE IF EXISTS public.activity_log CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.scheduled_content CASCADE;
DROP TABLE IF EXISTS public.ab_test_variants CASCADE;
DROP TABLE IF EXISTS public.footer_sections CASCADE;
DROP TABLE IF EXISTS public.navigation_menus CASCADE;
DROP TABLE IF EXISTS public.email_templates CASCADE;
DROP TABLE IF EXISTS public.code_snippets CASCADE;
DROP TABLE IF EXISTS public.redirects CASCADE;
DROP TABLE IF EXISTS public.job_postings CASCADE;
DROP TABLE IF EXISTS public.banner_notifications CASCADE;
DROP TABLE IF EXISTS public.popups CASCADE;
DROP TABLE IF EXISTS public.form_configurations CASCADE;
DROP TABLE IF EXISTS public.case_studies CASCADE;
DROP TABLE IF EXISTS public.awards CASCADE;
DROP TABLE IF EXISTS public.press_mentions CASCADE;
DROP TABLE IF EXISTS public.client_logos CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.certifications CASCADE;
DROP TABLE IF EXISTS public.office_locations CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.pricing_tiers CASCADE;
DROP TABLE IF EXISTS public.media_library CASCADE;
DROP TABLE IF EXISTS public.cta_sections CASCADE;
DROP TABLE IF EXISTS public.statistics CASCADE;
DROP TABLE IF EXISTS public.features CASCADE;
DROP TABLE IF EXISTS public.service_pages CASCADE;
DROP TABLE IF EXISTS public.hero_sections CASCADE;
DROP TABLE IF EXISTS public.page_content CASCADE;
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.legal_pages CASCADE;

-- Drop log_admin_activity function only (safe to remove as it's CMS-specific)
DROP FUNCTION IF EXISTS log_admin_activity();

-- NOTE: We intentionally DO NOT DROP update_updated_at_column() because
-- it's shared with your existing project tables (users, papas, journeys, etc.)
-- and would break them if removed.

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'All CMS tables and triggers have been dropped successfully!';
    RAISE NOTICE 'Note: Existing functions like update_updated_at_column() were preserved to avoid breaking your existing tables.';
END $$;
