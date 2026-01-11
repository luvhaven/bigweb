-- Add missing columns to cms_leads table
-- Run this migration to add plan and revenue fields

ALTER TABLE cms_leads 
ADD COLUMN IF NOT EXISTS plan TEXT,
ADD COLUMN IF NOT EXISTS revenue TEXT;

-- Update the updated_at trigger if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_cms_leads_updated_at ON cms_leads;
CREATE TRIGGER update_cms_leads_updated_at
    BEFORE UPDATE ON cms_leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
