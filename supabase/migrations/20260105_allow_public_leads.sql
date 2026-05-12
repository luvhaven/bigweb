-- Allow public anonymous users to insert into cms_leads (for Contact/Audit forms)
CREATE POLICY "Public Insert Leads" ON public.cms_leads
    FOR INSERT 
    WITH CHECK (true);

-- Ensure anon role has permissions (usually default, but good to ensure)
GRANT INSERT ON public.cms_leads TO anon;
GRANT INSERT ON public.cms_leads TO authenticated;
