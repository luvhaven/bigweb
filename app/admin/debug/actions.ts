'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

export async function checkUserStatus(email: string) {
    try {
        // 1. Get Auth User
        const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers()

        if (authError) throw authError

        const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase())

        if (!user) {
            return { error: 'User not found in Supabase Auth' }
        }

        // 2. Get DB Record
        const { data: profile, error: dbError } = await supabaseAdmin
            .from('admin_users')
            .select('*')
            .eq('id', user.id)
            .single()

        return {
            data: {
                auth: user,
                db: profile || null,
                dbError: dbError?.message
            }
        }

    } catch (error: any) {
        return { error: error.message }
    }
}
