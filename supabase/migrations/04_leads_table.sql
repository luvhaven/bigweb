-- Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anon role (if using client-side) or service role (from API)
CREATE POLICY "Enable insert for anonymous users" ON public.leads
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow read access only to authenticated users (admin)
CREATE POLICY "Enable read access for authenticated users" ON public.leads
    FOR SELECT
    USING (auth.role() = 'authenticated');
