-- BACKFILL SCRIPT
-- Run this to ensure existing Supabase Auth users have a corresponding Admin Profile.

INSERT INTO public.admin_users (id, email, role, full_name)
SELECT 
    id, 
    email, 
    'admin', -- Defaulting existing users to Admin so you can log in
    COALESCE(raw_user_meta_data->>'full_name', 'Admin User')
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.admin_users)
ON CONFLICT (id) DO NOTHING;

-- Verification
SELECT * FROM public.admin_users;
