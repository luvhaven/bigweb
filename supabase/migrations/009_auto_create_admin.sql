-- ================================================================
-- AUTO-CREATE ADMIN USER ON SIGNUP
-- ================================================================

-- 1. Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_users (id, email, name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Admin'),
    'admin', -- Default role
    true
  )
  ON CONFLICT (email) DO NOTHING; -- Prevent errors if manually inserted
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();
