-- Enable Realtime for cms_leads and cms_projects
begin;
  -- Check if publication exists, if not create it (standard supabase 'supabase_realtime' usually exists)
  -- But we can just alter the table to set replica identity if needed, or add to publication.
  
  -- Force Replica Identity (needed for some realtime events, though INSERT usually works without it)
  ALTER TABLE public.cms_leads REPLICA IDENTITY FULL;
  ALTER TABLE public.cms_projects REPLICA IDENTITY FULL;

  -- Add to publication (command varies by setup, but this is the standard Supabase way)
  alter publication supabase_realtime add table public.cms_leads;
  alter publication supabase_realtime add table public.cms_projects;
commit;
