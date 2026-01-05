-- FIX INFINITE RECURSION IN RLS POLICIES
-- The previous policy for "Admins can view all" queried the table itself directly,
-- causing an infinite loop. We must use a SECURITY DEFINER function to bypass RLS for the role check.

-- 1. Create a secure function to fetch the current user's role
-- SECURITY DEFINER means this runs with the privileges of the creator (superuser/owner), avoiding RLS loops.
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public -- Secure search path
AS $$
BEGIN
  RETURN (
    SELECT role FROM public.admin_users WHERE id = auth.uid()
  );
END;
$$;

-- 2. Drop the recursive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.admin_users;

-- 3. Re-create policies using the secure function
CREATE POLICY "Admins can view all profiles" ON public.admin_users
    FOR SELECT USING (
        get_my_role() IN ('admin', 'super_admin')
    );

CREATE POLICY "Admins can update all profiles" ON public.admin_users
    FOR UPDATE USING (
        get_my_role() IN ('admin', 'super_admin')
    );

-- Keep "Users can view own profile" as is, since (auth.uid() = id) is efficient and non-recursive.
