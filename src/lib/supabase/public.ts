import { createClient } from '@supabase/supabase-js'

// This is a plain un-authenticated Supabase client used strictly for public data fetching.
// It DOES NOT use cookies() and WILL NOT opt Next.js routes into dynamic rendering.
// Use this for any GET requests that display CMS data on the public homepage or static pages.
export const publicClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
