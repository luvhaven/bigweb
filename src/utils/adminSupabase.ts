// Untyped Supabase client for admin dashboard operations
// NOW USING: @supabase/auth-helpers-nextjs to ensure cookies/auth session are shared!
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Create a client that automatically picks up the Next.js Auth session from cookies
export const adminSupabase = createClientComponentClient() as any

// Re-export for convenience
export default adminSupabase
