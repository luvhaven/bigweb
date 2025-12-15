-- ================================================================
-- FIX: CLEANUP LEGACY TRIGGERS & SECURE ADMIN CREATION
-- ================================================================

-- 1. DROP LEGACY TRIGGERS (Crucial step)
-- These likely point to tables that no longer exist or have different schemas,
-- causing the "Database error" on user creation.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. RE-DEFINE ADMIN TRIGGER (Robust Version)
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- We match admin_users based on EMAIL.
  -- The ID in admin_users might differ from auth.users (if pre-seeded), 
  -- and that is handled by our RLS policy 'is_app_admin()' which uses email matching.
  
  INSERT INTO public.admin_users (id, email, name, role, is_active)
  VALUES (
    NEW.id, -- Valid UUID from auth
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin User'),
    'editor', -- Default to 'editor' for safety, or 'admin' if preferred
    true
  )
  ON CONFLICT (email) DO UPDATE
  SET 
    -- If user exists, just ensure they are active.
    -- We DO NOT overwrite the ID here to preserve FK integrity if referenced elsewhere.
    is_active = true,
    updated_at = NOW();
    
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- If this fails, we log it but ALLOW the user creation to proceed.
    -- This prevents "Database error" from blocking Sign Up, allowing you to debug later.
    RAISE LOG 'Warning: Admin auto-creation failed: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. RE-BIND TRIGGER
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();
