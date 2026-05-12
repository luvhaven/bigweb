-- Fix infinite recursion in RLS policies by using a SECURITY DEFINER function

-- 1. Create a secure function to check user role
-- This function runs with the privileges of the creator (superuser), bypassing RLS on the profiles table
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _role text;
BEGIN
  -- Check if user is logged in
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;
  
  SELECT role INTO _role FROM profiles WHERE id = auth.uid();
  RETURN _role;
END;
$$;

-- 2. Update Testimonials Policies
DROP POLICY IF EXISTS "Admins and editors can manage testimonials" ON testimonials;
CREATE POLICY "Admins and editors can manage testimonials" ON testimonials FOR ALL USING (
  get_current_user_role() IN ('admin', 'editor')
);

-- 3. Update Services Policies
DROP POLICY IF EXISTS "Admins can manage services" ON services;
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (
  get_current_user_role() = 'admin'
);

-- 4. Update Portfolio Policies
DROP POLICY IF EXISTS "Admins and editors can manage portfolio" ON portfolio_items;
CREATE POLICY "Admins and editors can manage portfolio" ON portfolio_items FOR ALL USING (
  get_current_user_role() IN ('admin', 'editor')
);

-- 5. Update Team Policies
DROP POLICY IF EXISTS "Admins can manage team" ON team_members;
CREATE POLICY "Admins can manage team" ON team_members FOR ALL USING (
  get_current_user_role() = 'admin'
);

-- 6. Update Blog Policies
DROP POLICY IF EXISTS "Admins and editors can manage blog" ON blog_posts;
CREATE POLICY "Admins and editors can manage blog" ON blog_posts FOR ALL USING (
  get_current_user_role() IN ('admin', 'editor')
);
