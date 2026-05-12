-- Add video fields to testimonials table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'video_url') THEN
        ALTER TABLE testimonials ADD COLUMN video_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'thumbnail_url') THEN
        ALTER TABLE testimonials ADD COLUMN thumbnail_url TEXT;
    END IF;
END $$;
