-- Fix cms_projects schema to include is_published boolean and category
ALTER TABLE public.cms_projects 
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;

ALTER TABLE public.cms_projects
ADD COLUMN IF NOT EXISTS category TEXT;

-- Optional: Backfill based on published_at if needed, but default true is fine for now.
UPDATE public.cms_projects SET is_published = (published_at IS NOT NULL) WHERE published_at IS NOT NULL;
