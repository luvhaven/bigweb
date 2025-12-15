// Untyped Supabase client for admin dashboard operations
// This bypasses strict TypeScript checking for tables not defined in the schema
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create an untyped client that accepts any table name and any data
export const adminSupabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
}) as any

// Re-export for convenience
export default adminSupabase
