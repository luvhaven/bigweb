import { createBrowserClient } from '@supabase/ssr'

/**
 * @deprecated Use createClient from @/lib/supabase/client or @/lib/supabase/server instead.
 * This file is being phased out to ensure consistent auth and SSR support.
 */
export const getSupabaseClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error('Supabase environment variables are missing.');
    }

    return createBrowserClient(url, key);
};
