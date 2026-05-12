-- ================================================================
-- FIX ADMIN RLS - Infinite Recursion Issue (Corrected)
-- ================================================================

-- Drop the problematic function
DROP FUNCTION IF EXISTS public.is_app_admin();

-- Create a secure function that bypasses RLS using SECURITY DEFINER
-- This function will NOT trigger RLS on admin_users because it's SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.is_app_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER  -- This runs with the permissions of the function owner, bypassing RLS
SET search_path = public
AS $$
DECLARE
  user_email TEXT;
  is_admin BOOLEAN;
BEGIN
  -- Get the current user's email from the JWT
  user_email := auth.jwt() ->> 'email';
  
  -- Query admin_users without triggering RLS (because SECURITY DEFINER bypasses it)
  SELECT EXISTS (
    SELECT 1
    FROM admin_users
    WHERE email = user_email
      AND role IN ('super_admin', 'admin')
      AND is_active = true
  ) INTO is_admin;
  
  RETURN COALESCE(is_admin, false);
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.is_app_admin() TO authenticated;

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admin full access" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage users" ON admin_users;
DROP POLICY IF EXISTS "admin_users_select_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_users_cud_policy" ON admin_users;

-- Create new non-recursive policies

-- Allow users to read their OWN profile by email OR if they are an admin
CREATE POLICY "admin_users_select" ON admin_users
    FOR SELECT
    USING (
        email = auth.jwt() ->> 'email'
        OR 
        is_app_admin()
    );

-- Allow admins to modify admin_users
CREATE POLICY "admin_users_modify" ON admin_users
    FOR ALL
    USING (is_app_admin())
    WITH CHECK (is_app_admin());

-- Update other policies to use the secure function

-- Media Library
DROP POLICY IF EXISTS "Admins can manage media" ON media_library;
CREATE POLICY "Admins can manage media" ON media_library
    FOR ALL
    USING (is_app_admin());

-- Site Settings  
DROP POLICY IF EXISTS "Admins can view settings" ON site_settings;
DROP POLICY IF EXISTS "Admins and editors can update settings" ON site_settings;

CREATE POLICY "site_settings_select" ON site_settings
    FOR SELECT
    USING (true);  -- Public read

CREATE POLICY "site_settings_modify" ON site_settings
    FOR ALL
    USING (is_app_admin())
    WITH CHECK (is_app_admin());
