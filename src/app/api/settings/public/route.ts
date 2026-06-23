import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function GET() {
    // Fetch configured public settings safely using the admin client
    const { data, error } = await supabaseAdmin
        .from('site_settings')
        .select('key, value')
        .in('key', ['payment_link_consultation']);

    if (error) {
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    const settings = data?.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>) || {};

    return NextResponse.json(settings);
}
