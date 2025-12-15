-- ================================================================
-- COMMUNICATION & CRM SCHEMA
-- ================================================================

-- ================================================================
-- CONTACT SUBMISSIONS
-- ================================================================
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'contact_form',
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    assigned_to UUID REFERENCES admin_users(id),
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_email ON contact_submissions(email);
CREATE INDEX idx_contact_created ON contact_submissions(created_at DESC);

-- ================================================================
-- CHAT SESSIONS
-- ================================================================
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id TEXT NOT NULL,
    visitor_name TEXT,
    visitor_email TEXT,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'active', 'closed', 'archived')),
    assigned_to UUID REFERENCES admin_users(id),
    unread_count INTEGER DEFAULT 0,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_status ON chat_sessions(status);
CREATE INDEX idx_chat_assigned ON chat_sessions(assigned_to);
CREATE INDEX idx_chat_last_message ON chat_sessions(last_message_at DESC);

-- ================================================================
-- CHAT MESSAGES
-- ================================================================
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('visitor', 'agent', 'system')),
    sender_id UUID REFERENCES admin_users(id),
    is_read BOOLEAN DEFAULT false,
    attachments JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_session ON chat_messages(session_id);
CREATE INDEX idx_messages_created ON chat_messages(created_at);

-- ================================================================
-- EMAIL CAMPAIGNS
-- ================================================================
CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    template TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'paused')),
    scheduled_for TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    total_recipients INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    delivered_count INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    bounced_count INTEGER DEFAULT 0,
    unsubscribed_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_campaigns_created ON email_campaigns(created_at DESC);

-- ================================================================
-- NEWSLETTER SUBSCRIBERS
-- ================================================================
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    source TEXT DEFAULT 'website',
    tags TEXT[] DEFAULT '{}',
    preferences JSONB DEFAULT '{}'::jsonb,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_subscribers_status ON newsletter_subscribers(status);

-- ================================================================
-- CLIENTS/CUSTOMERS
-- ================================================================
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company_name TEXT,
    company_website TEXT,
    industry TEXT,
    company_size TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    zipcode TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('lead', 'active', 'inactive', 'churned')),
    lifetime_value DECIMAL(10, 2) DEFAULT 0,
    assigned_to UUID REFERENCES admin_users(id),
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    custom_fields JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_assigned ON clients(assigned_to);

-- ================================================================
-- PROJECTS (for client work tracking)
-- ================================================================
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id),
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'review', 'completed', 'on_hold', 'cancelled')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    budget DECIMAL(10, 2),
    spent DECIMAL(10, 2) DEFAULT 0,
    start_date DATE,
    due_date DATE,
    completion_date DATE,
    progress DECIMAL(5, 2) DEFAULT 0,
    assigned_to UUID[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    metadata JSONB,
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_due ON projects(due_date);

-- ================================================================
-- RLS POLICIES
-- ================================================================

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Contact Submissions
CREATE POLICY "Admins can view contacts" ON contact_submissions
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can manage contacts" ON contact_submissions
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users WHERE role IN ('super_admin', 'admin', 'editor')));

-- Chat
CREATE POLICY "Admins can view chats" ON chat_sessions
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can manage chats" ON chat_sessions
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can view messages" ON chat_messages
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

-- Email Campaigns
CREATE POLICY "Admins can view campaigns" ON email_campaigns
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can manage campaigns" ON email_campaigns
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users WHERE role IN ('super_admin', 'admin')));

-- Newsletter
CREATE POLICY "Admins can view subscribers" ON newsletter_subscribers
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

-- Clients
CREATE POLICY "Admins can view clients" ON clients
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can manage clients" ON clients
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- Projects
CREATE POLICY "Admins can view projects" ON projects
    FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Admins can manage projects" ON projects
    FOR ALL USING (auth.uid() IN (SELECT id FROM admin_users));

-- ================================================================
-- TRIGGERS
-- ================================================================

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON email_campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
