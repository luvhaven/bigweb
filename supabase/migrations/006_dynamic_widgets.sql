-- 006_dynamic_widgets.sql
-- Create tables for dynamic homepage widgets and seed them.

-- 1. CLIENTS (for ClientMarquee Slider)
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(500) NOT NULL,
    active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Clients
DELETE FROM public.clients;
INSERT INTO public.clients (name, logo_url, sort_order) VALUES
('TechCorp', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 1),
('Innovate', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 2),
('FutureScale', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 3),
('GlobalSystems', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 4),
('AlphaGroup', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 5),
('OmegaLabs', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80', 6);

-- 2. VIDEO SHOWROOM (for VideoShowcase)
CREATE TABLE IF NOT EXISTS public.video_showroom (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    thumbnail_url VARCHAR(500) NOT NULL,
    video_url VARCHAR(500), -- Can be YouTube/Vimeo ID or URL
    duration VARCHAR(20),
    category VARCHAR(50) DEFAULT 'Showcase',
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Videos
DELETE FROM public.video_showroom;
INSERT INTO public.video_showroom (title, description, thumbnail_url, duration, category, featured, sort_order) VALUES
('Brand Transformation', 'How we helped a startup scale to $10M ARR', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80', '3:45', 'Case Study', true, 1),
('Design Process', 'Behind the scenes of our creative workflow', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', '2:30', 'Process', false, 2),
('Client Testimonial', 'CEO shares their experience working with us', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80', '1:45', 'Testimonial', false, 3),
('Tech Stack Demo', 'Exploring our cutting-edge development tools', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', '4:20', 'Technical', false, 4);

-- 3. TESTIMONIALS SEED (Create table if missing, verify structure)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  client_company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  client_image TEXT,
  result_metric TEXT,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure data exists (Upsert logic or fresh seed)
-- We will delete all for clean state
TRUNCATE TABLE public.testimonials;

INSERT INTO public.testimonials (client_name, client_role, client_company, content, rating, client_image, result_metric, is_featured, status, order_index) VALUES
('Sarah Jenkins', 'Marketing Director', 'TechFlow Solutions', 'BIGWEB transformed our digital presence completely. Their attention to detail and innovative approach resulted in a 412% increase in conversions.', 5, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80', '+412% Conversions', true, 'active', 1),
('Kwame Osei', 'Tech Founder', 'Innovate Africa', 'The scalability of the architecture they built allowed us to expand to three new countries in under six months. World-class engineering.', 5, 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&q=80', '3 New Markets', true, 'active', 2),
('Lars Nielsen', 'Product Lead', 'Nordic Design Co.', 'Minimalist, efficient, and incredibly powerful. They understood our Scandinavian design ethos perfectly while delivering robust functionality.', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80', '200% Efficiency', true, 'active', 3),
('Isabella Rossi', 'Creative Director', 'Milano Fashion', 'A digital masterpiece. The animations and interactions feel so organic. Our luxury clientele finally has an online experience that matches our brand.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80', 'Award Winning', true, 'active', 4),
('Amir Al-Fayed', 'CEO', 'Future Vision Holdings', 'We needed a partner who could execute at the speed of Dubai. BIGWEB delivered a complex enterprise solution weeks ahead of schedule.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', '2x Revenue', true, 'active', 5);

-- 4. Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_showroom ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read clients" ON public.clients;
CREATE POLICY "Public read clients" ON public.clients FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage clients" ON public.clients;
CREATE POLICY "Admin manage clients" ON public.clients FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public read videos" ON public.video_showroom;
CREATE POLICY "Public read videos" ON public.video_showroom FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage videos" ON public.video_showroom;
CREATE POLICY "Admin manage videos" ON public.video_showroom FOR ALL USING (auth.role() = 'authenticated');
