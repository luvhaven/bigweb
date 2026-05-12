-- =====================================================
-- BIGWEB DIGITAL: FAQS, TESTIMONIALS, TEAM
-- =====================================================

-- 1. CMS FAQS
CREATE TABLE IF NOT EXISTS cms_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general', -- 'general', 'diagnostic', 'retainer', etc.
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cms_faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read FAQs" ON cms_faqs FOR SELECT USING (true);


-- 2. CMS TESTIMONIALS
CREATE TABLE IF NOT EXISTS cms_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  client_company TEXT,
  client_avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cms_testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Testimonials" ON cms_testimonials FOR SELECT USING (true);


-- 3. CMS TEAM MEMBERS
CREATE TABLE IF NOT EXISTS cms_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  social_links JSONB DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE cms_team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Team" ON cms_team_members FOR SELECT USING (true);


-- 4. SEED FAQS
INSERT INTO cms_faqs (question, answer, category, sort_order) VALUES
('What makes you different from a normal agency?', 'We are engineers, not artists. Most agencies focus on making things look pretty. We focus on making things sell. We use data, psychology, and rapid experimentation to guarantee revenue growth.', 'general', 1),
('How exactly does the "Diagnostic" work?', 'For $399, we perform a forensic audit of your funnel. We analyze user heatmaps, site speed, copy effectiveness, and UX friction. You get a prioritized "Fix List" and a video walkthrough explaining exactly what to change.', 'diagnostic', 2),
('Do you work with startups?', 'Yes, but only if you have a product-market fit. We scale what is already working. If you have zero traffic and zero sales, we are likely not the best fit yet.', 'general', 3),
('What is the "Fix Sprint"?', 'It is a rapid, 1-week execution cycle where we implement the most critical fixes identified in the diagnostic. We fix the 20% of issues causing 80% of the revenue loss.', 'services', 4)
ON CONFLICT DO NOTHING;


-- 5. SEED TESTIMONIALS
INSERT INTO cms_testimonials (client_name, client_role, client_company, content, rating, is_featured) VALUES
('Marcus Chen', 'CEO', 'TechFlow SaaS', 'We were stuck at $15k MRR for months. The Conversion Lab team found a friction point in our onboarding that we completely missed. We hit $25k MRR two months later.', 5, true),
('Sarah Jenkins', 'Founder', 'EcoStyle', 'I thought my site needed a redesign. They told me it just needed better copy. They were right. Conversion rate doubled without changing a single pixel of the layout.', 5, true),
('David Miller', 'CMO', 'FinTech Global', 'Brutally honest. That is the best way to describe them. They tore our landing page apart, but the new version they built is printing money. Highly recommend.', 5, true)
ON CONFLICT DO NOTHING;


-- 6. SEED TEAM (If empty)
INSERT INTO cms_team_members (name, role, bio, avatar_url, sort_order) VALUES
('Alex Rivera', 'Principal Engineer', 'Former Google engineer turned CRO obsessionist. Believes every pixel should have an ROI.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', 1),
('Elena Vosk', 'Lead Psychologist', 'Specializes in behavioral economics and user persuasion. She knows why your users click before they do.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', 2),
('James Thorne', 'Full Stack Architect', 'Builds lightning-fast Next.js infrastructures that Google loves and competitors envy.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', 3)
ON CONFLICT DO NOTHING;
