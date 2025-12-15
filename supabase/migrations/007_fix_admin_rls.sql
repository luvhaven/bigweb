-- ================================================================
-- FIX ADMIN RLS - Infinite Recursion & ID Mismatch
-- ================================================================

-- 1. Create a secure function to check admin status without triggering RLS recursively
-- We use email matching because auth.users.id and admin_users.id might not be synced
CREATE OR REPLACE FUNCTION public.is_app_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM admin_users
    WHERE email = auth.jwt() ->> 'email'
    AND role IN ('super_admin', 'admin')
    AND is_active = true
  );
$$;

-- 2. Drop existing problematic specific policies
DROP POLICY IF EXISTS "Admins can view all users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage users" ON admin_users;

-- 3. Create new consolidated, non-recursive policies

-- Allow users to read their OWN profile (by email) OR Admins to read ALL
CREATE POLICY "admin_users_select_policy" ON admin_users
    FOR SELECT
    USING (
        (email = auth.jwt() ->> 'email') 
        OR 
        (is_app_admin())
    );

-- Allow Admins to insert/update/delete
CREATE POLICY "admin_users_cud_policy" ON admin_users
    FOR ALL
    USING (is_app_admin())
    WITH CHECK (is_app_admin());

-- 4. Ensure Media Library also uses the secure function (optimization)
DROP POLICY IF EXISTS "Admins can manage media" ON media_library;
CREATE POLICY "Admins can manage media" ON media_library
    FOR ALL
    USING (is_app_admin());

-- 5. Ensure Site Settings uses the secure function
DROP POLICY IF EXISTS "Admins and editors can update settings" ON site_settings;
CREATE POLICY "Admins and editors can update settings" ON site_settings
    FOR UPDATE
    USING (is_app_admin());
