-- Ensure hero section exists
INSERT INTO public.hero_sections (page_slug, title, subtitle, description, cta_primary_text, cta_primary_url, background_image)
VALUES (
    'home',
    'Turn Visitors Into Customers',
    'Premium Web Development',
    'We build high-converting, award-winning websites that drive real business results.',
    'Start Your Project',
    '/contact',
    '/assets/hero-conversion.png'
) ON CONFLICT (page_slug) DO NOTHING;

-- Get the ID
DO $$
DECLARE
    hero_id UUID;
BEGIN
    SELECT id INTO hero_id FROM public.hero_sections WHERE page_slug = 'home';

    -- Insert slides
    INSERT INTO public.hero_slides (hero_section_id, title, subtitle, description, image_url, cta_text, cta_link, stat_value, stat_label, sort_order, active)
    VALUES
    (
        hero_id,
        'Turn Visitors Into Customers',
        'Conversion-Focused Design',
        'Stop losing leads. Our designs are psychologically optimized to convert traffic into paying customers.',
        '/assets/hero-conversion.png',
        'Boost Conversions',
        '/services/web-design',
        '3.2x',
        'Avg ROI Increase',
        1,
        true
    ),
    (
        hero_id,
        'Dominate Search Rankings',
        'SEO-First Architecture',
        'Climb the ranks with our AI-driven SEO strategies that put your brand in front of the right audience.',
        '/assets/hero-seo.png',
        'Get Ranked',
        '/services/seo',
        '#1',
        'Page Rankings',
        2,
        true
    ),
    (
        hero_id,
        'Automate Your Growth',
        'AI & Automation',
        'Streamline operations and scale your business with custom AI solutions and workflow automation.',
        '/assets/hero-ai.png',
        'Automate Now',
        '/services/ai-automation',
        '40%',
        'Time Saved',
        3,
        true
    );
END $$;
