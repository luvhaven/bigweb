-- ============================================
-- CLEANUP SCRIPT - Run this FIRST before 001_complete_schema.sql
-- ============================================
-- This will drop all existing tables and start fresh
-- WARNING: This will delete all data!
-- ============================================

-- Drop all tables (CASCADE removes dependencies and policies automatically)
DROP TABLE IF EXISTS blog_post_tags CASCADE;
DROP TABLE IF EXISTS blog_tags CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS media_library CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS page_views CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS portfolio_projects CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Drop the trigger function
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Cleanup complete! Now run 001_complete_schema.sql';
END $$;
