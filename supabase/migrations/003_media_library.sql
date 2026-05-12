-- 16. MEDIA LIBRARY (Manage uploaded assets)
CREATE TABLE IF NOT EXISTS public.media_library (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL, -- Path in storage bucket
    public_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    dimensions VARCHAR(50),
    alt_text VARCHAR(200),
    folder VARCHAR(100) DEFAULT 'root',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.media_library
    FOR SELECT USING (true);

CREATE POLICY "Enable all access for service role" ON public.media_library
    FOR ALL USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_media_library_folder ON public.media_library(folder);
CREATE INDEX IF NOT EXISTS idx_media_library_created ON public.media_library(created_at DESC);
