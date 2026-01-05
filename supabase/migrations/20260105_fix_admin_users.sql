-- RESTORE ADMIN_USERS TABLE
-- Missing from the Admin 2.0 rebuild, causing auth hooks and middleware to fail.

CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'editor', 'client', 'viewer')) DEFAULT 'viewer',
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON public.admin_users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.admin_users As nu
            WHERE nu.id = auth.uid() AND (nu.role = 'admin' OR nu.role = 'super_admin')
        )
    );

CREATE POLICY "Admins can update all profiles" ON public.admin_users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.admin_users As nu
            WHERE nu.id = auth.uid() AND (nu.role = 'admin' OR nu.role = 'super_admin')
        )
    );

-- Trigger to auto-create admin_user on auth.users insert (Optional but helpful for new signups)
-- For existing users, we might need to backfill.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.admin_users (id, email, role, full_name)
    VALUES (new.id, new.email, 'viewer', new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger only if not exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
