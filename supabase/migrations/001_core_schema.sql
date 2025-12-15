-- ================================================================
-- CORE SCHEMA - Admin, Settings, Media, Audit
-- ================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================================
-- ADMIN USERS
-- ================================================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer')),
    name TEXT NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- SITE SETTINGS
-- ================================================================
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    category TEXT NOT NULL DEFAULT 'general' CHECK (category IN ('general', 'seo', 'analytics', 'integrations', 'email', 'social')),
    description TEXT,
    updated_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- MEDIA LIBRARY
-- ================================================================
CREATE TABLE media_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'document', 'audio')),
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    folder TEXT DEFAULT 'root',
    uploaded_by UUID REFERENCES admin_users(id),
    is_public BOOLEAN DEFAULT true,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_type ON media_library(file_type);
CREATE INDEX idx_media_folder ON media_library(folder);

-- ================================================================
-- AUDIT LOGS
-- ================================================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admin_users(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- ================================================================
-- ACTIVITY FEED
-- ================================================================
CREATE TABLE activity_feed (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admin_users(id),
    action TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    link TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_user ON activity_feed(user_id);
CREATE INDEX idx_activity_created ON activity_feed(created_at DESC);

-- ================================================================
-- ENABLE ROW LEVEL SECURITY
-- ================================================================
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- RLS POLICIES
-- ================================================================

-- Admin Users (only authenticated admins can view/manage)
CREATE POLICY "Admins can view all users" ON admin_users
    FOR SELECT
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE is_active = true));

CREATE POLICY "Super admins can manage users" ON admin_users
    FOR ALL
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE role = 'super_admin'));

-- Site Settings
CREATE POLICY "Admins can view settings" ON site_settings
    FOR SELECT
    USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins and editors can update settings" ON site_settings
    FOR UPDATE
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE role IN ('super_admin', 'admin', 'editor')));

-- Media Library
CREATE POLICY "Everyone can view public media" ON media_library
    FOR SELECT
    USING (is_public = true OR auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can manage media" ON media_library
    FOR ALL
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE role IN ('super_admin', 'admin', 'editor')));

-- Audit Logs (read-only for admins)
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT
    USING (auth.uid() IN (SELECT id FROM admin_users WHERE role IN ('super_admin', 'admin')));

-- Activity Feed
CREATE POLICY "Admins can view activity" ON activity_feed
    FOR SELECT
    USING (auth.uid() IN (SELECT id FROM admin_users));

-- ================================================================
-- FUNCTIONS
-- ================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_library_updated_at BEFORE UPDATE ON media_library
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default super admin (update with your email)
INSERT INTO admin_users (email, role, name, is_active)
VALUES ('bigwebdaniel@outlook.com', 'super_admin', 'Admin', true)
ON CONFLICT (email) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value, category, description) VALUES
('site_name', '"BIGWEB"', 'general', 'Website name'),
('site_description', '"Premium web development and digital solutions"', 'general', 'Site description'),
('contact_email', '"hello@bigweb.com"', 'general', 'Contact email'),
('contact_phone', '"+1 (555) 123-4567"', 'general', 'Contact phone'),
('google_analytics_id', '""', 'analytics', 'Google Analytics tracking ID'),
('facebook_pixel_id', '""', 'analytics', 'Facebook Pixel ID'),
('meta_title_suffix', '" | BIGWEB"', 'seo', 'Default meta title suffix'),
('meta_description_default', '"Premium web development and digital solutions"', 'seo', 'Default meta description')
ON CONFLICT (key) DO NOTHING;
