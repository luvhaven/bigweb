-- Seed Services
INSERT INTO services (id, title, slug, short_description, description, icon, status, is_featured, order_index, features, pricing)
VALUES
  (
    gen_random_uuid(),
    'Custom Web Development',
    'web-development',
    'High-performance, scalable web applications built with modern technologies.',
    'We build robust, scalable, and high-performance web applications tailored to your business needs. Using the latest technologies like Next.js, React, and Node.js, we ensure your digital presence is future-proof.',
    'Code',
    'published',
    true,
    1,
    '["Next.js & React", "Server-side Rendering", "API Integration", "Performance Optimization"]'::jsonb,
    '{"starting_price": "$5,000"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'Mobile App Development',
    'mobile-development',
    'Native and cross-platform mobile apps for iOS and Android.',
    'Reach your customers on their favorite devices with our mobile app development services. We create seamless, intuitive, and engaging mobile experiences using React Native and native technologies.',
    'Smartphone',
    'published',
    true,
    2,
    '["iOS & Android", "React Native", "Offline Mode", "Push Notifications"]'::jsonb,
    '{"starting_price": "$8,000"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'UI/UX Design',
    'ui-ux-design',
    'User-centric design that drives engagement and conversion.',
    'Great software starts with great design. Our expert designers create intuitive, beautiful, and accessible user interfaces that delight your users and drive business results.',
    'Palette',
    'published',
    true,
    3,
    '["User Research", "Wireframing", "Prototyping", "Design Systems"]'::jsonb,
    '{"starting_price": "$3,000"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'Enterprise Solutions',
    'enterprise-solutions',
    'Scalable, secure, and reliable software for large organizations.',
    'We understand the complex needs of enterprise businesses. Our solutions are built for security, scalability, and reliability, ensuring your critical business operations run smoothly.',
    'Building2',
    'published',
    false,
    4,
    '["Cloud Architecture", "Microservices", "Security Audits", "Legacy Modernization"]'::jsonb,
    '{"starting_price": "$15,000"}'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed Portfolio
INSERT INTO portfolio_items (id, title, slug, excerpt, description, client_name, industry, project_type, featured_image, status, is_featured, order_index, technologies, results)
VALUES
  (
    gen_random_uuid(),
    'Fintech Analytics Dashboard',
    'fintech-dashboard',
    'Real-time financial data visualization for a leading fintech firm.',
    'We developed a comprehensive analytics dashboard for a major fintech company. The platform processes millions of transactions in real-time, providing actionable insights to traders and analysts.',
    'FinCorp Global',
    'Finance',
    'Web Application',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    'published',
    true,
    1,
    ARRAY['React', 'D3.js', 'Node.js', 'WebSockets'],
    'Reduced data latency by 90% and improved analyst productivity by 40%.'
  ),
  (
    gen_random_uuid(),
    'Luxury E-commerce Platform',
    'luxury-ecommerce',
    'A premium shopping experience for a high-end fashion brand.',
    'We redesigned and re-platformed the e-commerce store for a luxury fashion brand. The new site features immersive video, 3D product views, and a seamless checkout process.',
    'Velour & Co.',
    'Retail',
    'E-commerce',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    'published',
    true,
    2,
    ARRAY['Next.js', 'Shopify Plus', 'WebGL', 'Stripe'],
    'Increased conversion rate by 150% and mobile sales by 200%.'
  ),
  (
    gen_random_uuid(),
    'Telehealth Mobile App',
    'telehealth-app',
    'Connecting patients with doctors through secure video consultations.',
    'We built a HIPAA-compliant mobile app that allows patients to book appointments, chat with doctors, and conduct video consultations securely from their phones.',
    'MediConnect',
    'Healthcare',
    'Mobile App',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    'published',
    true,
    3,
    ARRAY['React Native', 'WebRTC', 'Node.js', 'PostgreSQL'],
    'Facilitated over 50,000 remote consultations in the first year.'
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed Testimonials
INSERT INTO testimonials (id, client_name, client_role, client_company, content, rating, status, is_featured, order_index, client_image)
VALUES
  (
    gen_random_uuid(),
    'Sarah Johnson',
    'CEO',
    'TechStart Inc.',
    'BigWeb transformed our digital presence. Their team is incredibly talented and professional. The new website has significantly increased our lead generation.',
    5,
    'active',
    true,
    1,
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
  ),
  (
    gen_random_uuid(),
    'Michael Chen',
    'CTO',
    'FinCorp Global',
    'The technical expertise of the BigWeb team is unmatched. They delivered a complex financial dashboard ahead of schedule and it performs flawlessly.',
    5,
    'active',
    true,
    2,
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
  ),
  (
    gen_random_uuid(),
    'Emily Davis',
    'Marketing Director',
    'Velour & Co.',
    'Working with BigWeb was a pleasure. They understood our brand vision perfectly and translated it into a stunning e-commerce experience.',
    5,
    'active',
    true,
    3,
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
  );

-- Seed Team Members
INSERT INTO team_members (id, name, role, bio, image, status, order_index, social_links)
VALUES
  (
    gen_random_uuid(),
    'Alex Morgan',
    'Founder & CEO',
    'Visionary leader with 15+ years of experience in tech and design.',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop',
    'active',
    1,
    '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'Jessica Lee',
    'Lead Designer',
    'Award-winning designer passionate about creating beautiful user experiences.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
    'active',
    2,
    '{"dribbble": "https://dribbble.com", "instagram": "https://instagram.com"}'::jsonb
  ),
  (
    gen_random_uuid(),
    'David Kim',
    'Senior Developer',
    'Full-stack wizard who loves solving complex engineering problems.',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop',
    'active',
    3,
    '{"github": "https://github.com"}'::jsonb
  );

-- Seed Blog Posts
INSERT INTO blog_posts (id, title, slug, excerpt, content, status, published_at, featured_image, tags)
VALUES
  (
    gen_random_uuid(),
    'The Future of Web Development in 2025',
    'future-web-development-2025',
    'Explore the emerging trends that will shape the web development landscape in the coming years.',
    '# The Future of Web Development

The web is constantly evolving. As we look towards 2025, several key trends are emerging that will redefine how we build and interact with the web.

## 1. AI-Driven Development
Artificial Intelligence is becoming an integral part of the development workflow...

## 2. WebAssembly
WebAssembly is unlocking new performance capabilities...',
    'published',
    NOW(),
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop',
    ARRAY['Technology', 'Trends', 'Web Development']
  ),
  (
    gen_random_uuid(),
    'Why UI/UX Matters More Than Ever',
    'why-ui-ux-matters',
    'In a crowded digital market, user experience is the key differentiator.',
    '# The Importance of UI/UX

User Interface (UI) and User Experience (UX) are no longer just buzzwords. They are critical components of any successful digital product.

## First Impressions Count
Users form an opinion about your website in milliseconds...',
    'published',
    NOW(),
    'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2070&auto=format&fit=crop',
    ARRAY['Design', 'UX', 'Business']
  );
