-- ================================================================
-- ANALYTICS & TRACKING SCHEMA
-- ================================================================

-- ================================================================
-- PAGE VIEWS
-- ================================================================
CREATE TABLE page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id TEXT NOT NULL,
    session_id TEXT,
    page_path TEXT NOT NULL,
    page_title TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    ip_address INET,
    duration_seconds INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pageviews_page ON page_views(page_path);
CREATE INDEX idx_pageviews_visitor ON page_views(visitor_id);
CREATE INDEX idx_pageviews_session ON page_views(session_id);
CREATE INDEX idx_pageviews_created ON page_views(created_at DESC);
CREATE INDEX idx_pageviews_utm ON page_views(utm_source, utm_medium, utm_campaign);

-- ================================================================
-- EVENTS (Custom Event Tracking)
-- ================================================================
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id TEXT NOT NULL,
    session_id TEXT,
    event_name TEXT NOT NULL,
    event_category TEXT,
    event_label TEXT,
    event_value DECIMAL(10, 2),
    page_path TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_name ON events(event_name);
CREATE INDEX idx_events_visitor ON events(visitor_id);
CREATE INDEX idx_events_created ON events(created_at DESC);

-- ================================================================
-- CONVERSIONS
-- ================================================================
CREATE TABLE conversions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id TEXT NOT NULL,
    session_id TEXT,
    conversion_type TEXT NOT NULL CHECK (conversion_type IN ('contact_form', 'chat_started', 'email_signup', 'download', 'purchase', 'custom')),
    conversion_value DECIMAL(10, 2),
    page_path TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversions_type ON conversions(conversion_type);
CREATE INDEX idx_conversions_visitor ON conversions(visitor_id);
CREATE INDEX idx_conversions_created ON conversions(created_at DESC);

-- ================================================================
-- VISITORS (Session Data)
-- ================================================================
CREATE TABLE visitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id TEXT UNIQUE NOT NULL,
    first_seen_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ DEFAULT NOW(),
    total_visits INTEGER DEFAULT 1,
    total_page_views INTEGER DEFAULT 0,
    total_events INTEGER DEFAULT 0,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    is_converted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_visitors_id ON visitors(visitor_id);
CREATE INDEX idx_visitors_converted ON visitors(is_converted);

-- ================================================================
-- UTM CAMPAIGNS (Campaign Performance)
-- ================================================================
CREATE TABLE utm_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT NOT NULL,
    utm_content TEXT,
    utm_term TEXT,
    visits_count INTEGER DEFAULT 0,
    page_views_count INTEGER DEFAULT 0,
    conversions_count INTEGER DEFAULT 0,
    conversion_value DECIMAL(10, 2) DEFAULT 0,
    first_seen_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_utm_unique_campaign ON utm_campaigns(
    utm_source,
    utm_medium, 
    utm_campaign,
    COALESCE(utm_content, ''),
    COALESCE(utm_term, '')
);

CREATE INDEX idx_utm_campaign ON utm_campaigns(utm_campaign);
CREATE INDEX idx_utm_combo ON utm_campaigns(utm_source, utm_medium, utm_campaign);

-- ================================================================
-- SEO AUDITS
-- ================================================================
CREATE TABLE seo_audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_url TEXT NOT NULL,
    page_title TEXT,
    meta_description TEXT,
    h1_tags TEXT[],
    canonical_url TEXT,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    issues JSONB DEFAULT '[]'::jsonb,
    recommendations JSONB DEFAULT '[]'::jsonb,
    load_time_ms INTEGER,
    mobile_friendly BOOLEAN,
    indexed BOOLEAN,
    backlinks_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_seo_url ON seo_audits(page_url);
CREATE INDEX idx_seo_score ON seo_audits(score);
CREATE INDEX idx_seo_created ON seo_audits(created_at DESC);

-- ================================================================
-- A/B TESTS
-- ================================================================
CREATE TABLE ab_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'paused', 'completed')),
    variants JSONB NOT NULL,
    target_page TEXT,
    success_metric TEXT NOT NULL,
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    winner_variant TEXT,
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ab_test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES ab_tests(id) ON DELETE CASCADE,
    variant_id TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    session_id TEXT,
    converted BOOLEAN DEFAULT false,
    conversion_value DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ab_results_test ON ab_test_results(test_id);
CREATE INDEX idx_ab_results_variant ON ab_test_results(variant_id);

-- ================================================================
-- RLS POLICIES
-- ================================================================

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE utm_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_results ENABLE ROW LEVEL SECURITY;

-- Analytics (Admins only)
CREATE POLICY "Admins can view page views" ON page_views
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can view events" ON events
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can view conversions" ON conversions
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can view visitors" ON visitors
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can view campaigns" ON utm_campaigns
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can view SEO" ON seo_audits
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can manage AB tests" ON ab_tests
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- ================================================================
-- FUNCTIONS FOR ANALYTICS
-- ================================================================

-- Function to get dashboard stats
CREATE OR REPLACE FUNCTION get_dashboard_stats(
    time_period TEXT DEFAULT '7d'
)
RETURNS JSON AS $$
DECLARE
    result JSON;
    start_date TIMESTAMPTZ;
BEGIN
    -- Calculate start date
    start_date := CASE
        WHEN time_period = '24h' THEN NOW() - INTERVAL '24 hours'
        WHEN time_period = '7d' THEN NOW() - INTERVAL '7 days'
        WHEN time_period = '30d' THEN NOW() - INTERVAL '30 days'
        WHEN time_period = '90d' THEN NOW() - INTERVAL '90 days'
        ELSE NOW() - INTERVAL '7 days'
    END;

    SELECT json_build_object(
        'total_visits', (SELECT COUNT(DISTINCT visitor_id) FROM page_views WHERE created_at >= start_date),
        'total_page_views', (SELECT COUNT(*) FROM page_views WHERE created_at >= start_date),
        'total_conversions', (SELECT COUNT(*) FROM conversions WHERE created_at >= start_date),
        'conversion_rate', ROUND((SELECT COUNT(*)::DECIMAL FROM conversions WHERE created_at >= start_date) / 
                          NULLIF((SELECT COUNT(DISTINCT visitor_id) FROM page_views WHERE created_at >= start_date), 0) * 100, 2),
        'new_contacts', (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= start_date),
        'active_projects', (SELECT COUNT(*) FROM projects WHERE status = 'in_progress'),
        'total_clients', (SELECT COUNT(*) FROM clients WHERE status = 'active')
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Materialized view for faster analytics queries
CREATE MATERIALIZED VIEW daily_analytics AS
SELECT
    DATE(created_at) as date,
    COUNT(DISTINCT visitor_id) as unique_visitors,
    COUNT(*) as page_views,
    COUNT(DISTINCT session_id) as sessions
FROM page_views
GROUP BY DATE(created_at)
ORDER BY date DESC;

CREATE INDEX idx_daily_analytics_date ON daily_analytics(date DESC);

-- Refresh function
CREATE OR REPLACE FUNCTION refresh_daily_analytics()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_analytics;
END;
$$ LANGUAGE plpgsql;
