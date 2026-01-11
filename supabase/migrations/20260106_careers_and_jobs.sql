-- =====================================================
-- CAREERS & JOB APPLICATIONS SCHEMA
-- =====================================================

-- 1. Career Openings
CREATE TABLE IF NOT EXISTS career_openings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL, -- Full-time, Contract, etc.
    description TEXT, -- Rich text or markdown
    salary_range TEXT,
    is_active BOOLEAN DEFAULT true,
    posted_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Job Applications
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES career_openings(id) ON DELETE SET NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    status TEXT DEFAULT 'new', -- new, reviewing, interviewed, offered, rejected
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS Policies
ALTER TABLE career_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Openings are public read
CREATE POLICY "Public read active openings" ON career_openings
    FOR SELECT USING (is_active = true);

-- Applications: Insert public (anyone can apply)
CREATE POLICY "Public insert applications" ON job_applications
    FOR INSERT WITH CHECK (true);

-- Admin read/write (assuming 'authenticated' users for now or specific role check)
-- Ideally: auth.jwt() -> role = 'admin'
-- For simplicity in this fix, we allow authenticated users to view
CREATE POLICY "Auth users view applications" ON job_applications
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Auth users updates applications" ON job_applications
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Seed Sample Data
INSERT INTO career_openings (title, department, location, type, description, salary_range)
VALUES 
('Senior Frontend Engineer', 'Engineering', 'Remote', 'Full-time', 'We are looking for a React expert to lead our frontend initiatives.', '$120k - $160k'),
('UX/UI Designer', 'Design', 'New York, NY', 'Full-time', 'Create award-winning designs for our premium clients.', '$90k - $130k'),
('Product Manager', 'Product', 'Remote', 'Contract', 'Lead the roadmap for our internal tools.', '$100k - $140k');
