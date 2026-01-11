-- Ensure permissions for anon role on cms_leads
GRANT INSERT ON TABLE cms_leads TO anon;
GRANT INSERT ON TABLE cms_leads TO authenticated;
GRANT SELECT ON TABLE cms_leads TO anon; -- Sometimes needed if returning data

-- Recreate policy to be sure
DROP POLICY IF EXISTS "Enable insert for everyone" ON cms_leads;
CREATE POLICY "Enable insert for everyone" ON cms_leads FOR INSERT TO anon, authenticated WITH CHECK (true);
