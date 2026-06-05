import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Generate a short, memorable, uppercase referral code
function generateReferralCode(firstName: string, lastName: string): string {
    const base = `${firstName.slice(0, 2)}${lastName.slice(0, 2)}`.toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BW-${base}-${rand}`;
}

export async function POST(req: NextRequest) {
    try {
        const supabaseService = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const body = await req.json();
        const { firstName, lastName, email, companyName, website, payoutEmail, referralSource, agreeToTerms } = body;

        if (!firstName || !lastName || !email || !agreeToTerms) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }



        const referralCode = generateReferralCode(firstName, lastName);

        const { data, error } = await supabaseService.from('affiliates').insert({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: email.toLowerCase().trim(),
            company_name: companyName?.trim() || null,
            website: website?.trim() || null,
            payout_email: payoutEmail?.trim() || null,
            referral_code: referralCode,
            referral_source: referralSource || null,
            commission_rate: 0.10,
            status: 'pending',
        });

        if (error) {
            if (error.code === '23505') { // Postgres distinctive code for unique constraint violation
                return NextResponse.json({ error: 'An affiliate account with this email already exists.' }, { status: 409 });
            }
            console.error('[Affiliates API] Supabase error:', error);
            return NextResponse.json({ error: 'Failed to create affiliate account.' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            referralCode: referralCode,
            message: 'Application received. Our team will review and approve your account within 48 hours.',
        });
    } catch (err) {
        console.error('[Affiliates API] Unhandled error:', err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    // Admin-only route to list affiliates (protected by middleware)
    const supabaseService = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = supabaseService.rpc('admin_get_affiliates', {
        p_secret: 'bigweb_admin_secret_2026',
        p_status: status || 'all'
    });

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
    // Admin: approve/reject/suspend an affiliate
    const supabaseService = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
        return NextResponse.json({ error: 'Missing id or status.' }, { status: 400 });
    }

    const validStatuses = ['pending', 'approved', 'suspended', 'rejected'];
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }

    const { error } = await supabaseService.rpc('admin_update_affiliate', {
        p_secret: 'bigweb_admin_secret_2026',
        p_id: id,
        p_status: status
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
}
