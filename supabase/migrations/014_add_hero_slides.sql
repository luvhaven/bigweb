-- 014_add_hero_slides.sql

-- Create table for hero slides (initially for homepage)
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    hero_section_id UUID REFERENCES public.hero_sections(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(200),
    description TEXT,
    image_url VARCHAR(500),
    cta_text VARCHAR(100),
    cta_link VARCHAR(200),
    stat_value VARCHAR(50),
    stat_label VARCHAR(100),
    video_url VARCHAR(500),
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Policies
-- Allow public read access to active slides
CREATE POLICY "Public read active slides" ON public.hero_slides FOR SELECT USING (active = true);

-- Allow admins (authenticated users) full access to all slides
CREATE POLICY "Admin full access" ON public.hero_slides FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_hero_slides_section ON public.hero_slides(hero_section_id);
CREATE INDEX IF NOT EXISTS idx_hero_slides_order ON public.hero_slides(sort_order);
