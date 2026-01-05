-- FIX ADMIN_USERS SCHEMA
-- The table existed but was missing columns (legacy version).

-- 1. Add missing columns safely
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'viewer';
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Backfill Data (Upsert)
INSERT INTO public.admin_users (id, email, role, full_name)
SELECT 
    id, 
    email, 
    'admin', 
    COALESCE(raw_user_meta_data->>'full_name', 'Admin User')
FROM auth.users
ON CONFLICT (id) DO UPDATE 
SET 
    email = EXCLUDED.email,
    role = EXCLUDED.role;

-- 3. Verify
SELECT * FROM public.admin_users;
