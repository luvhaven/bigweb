-- Migration: Neural Case Studies
-- Date: 2026-01-01
-- Description: Adds technical_details JSONB, deconstructed_view BOOLEAN, and other missing CMS columns to portfolio_projects table.

DO $$
BEGIN
    -- 1. Technical & Neural Features
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'technical_details') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN technical_details JSONB DEFAULT '{}'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'deconstructed_view') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN deconstructed_view BOOLEAN DEFAULT false;
    END IF;

    -- 2. CMS Content Fields (Matching PortfolioForm)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'client_name') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN client_name VARCHAR(255);
        -- Optional: specific logic to copy 'client' to 'client_name' if needed, but keeping it simple
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'challenge') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN challenge TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'solution') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN solution TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'results') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN results TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'live_url') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN live_url VARCHAR(500);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'github_url') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN github_url VARCHAR(500);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'completion_date') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN completion_date DATE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'status') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN status VARCHAR(50) DEFAULT 'draft';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'hero_image_url') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN hero_image_url VARCHAR(500);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'image_url') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN image_url VARCHAR(500);
        -- Attempt to sync from 'image'
        UPDATE public.portfolio_projects SET image_url = image WHERE image_url IS NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'gallery_images') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN gallery_images JSONB DEFAULT '[]'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'is_published') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN is_published BOOLEAN DEFAULT true;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'is_featured') THEN
        ALTER TABLE public.portfolio_projects ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;

    -- Sync 'client' to 'client_name' if empty
    UPDATE public.portfolio_projects SET client_name = client WHERE client_name IS NULL AND client IS NOT NULL;
    
END $$;

COMMENT ON COLUMN public.portfolio_projects.technical_details IS 'Stores deep technical data: diagram URLs, API stats, code snippets.';
COMMENT ON COLUMN public.portfolio_projects.deconstructed_view IS 'Toggle to enable the technical overlay/annotation mode on the frontend.';

