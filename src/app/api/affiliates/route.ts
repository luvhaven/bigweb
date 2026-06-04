import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Generate a short, memorable, uppercase referral code
function generateReferralCode(firstName: string, lastName: string): string {
    const base = `${firstName.slice(0, 2)}${lastName.slice(0, 2)}`.toUpperCase();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BW-${base}-${rand}`;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, companyName, website, payoutEmail, referralSource, agreeToTerms } = body;

        if (!firstName || !lastName || !email || !agreeToTerms) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }

        const supabase = createServerClient();

        // Check for duplicate
        const { data: existing } = await supabase
            .from('affiliates')
            .select('id')
            .eq('email', email.toLowerCase().trim())
            .single();

        if (existing) {
            return NextResponse.json({ error: 'An affiliate account with this email already exists.' }, { status: 409 });
        }

        const referralCode = generateReferralCode(firstName, lastName);

        const { data, error } = await supabase.from('affiliates').insert({
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
        }).select('referral_code').single();

        if (error) {
            console.error('[Affiliates API] Supabase error:', error);
            return NextResponse.json({ error: 'Failed to create affiliate account.' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            referralCode: data.referral_code,
            message: 'Application received. Our team will review and approve your account within 48 hours.',
        });
    } catch (err) {
        console.error('[Affiliates API] Unhandled error:', err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    // Admin-only route to list affiliates (protected by middleware)
    const supabase = createServerClient();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = supabase
        .from('affiliates')
        .select('*, referrals(id, status, contract_value, commission_amount)')
        .order('created_at', { ascending: false });

    if (status && status !== 'all') {
        query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
    // Admin: approve/reject/suspend an affiliate
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
        return NextResponse.json({ error: 'Missing id or status.' }, { status: 400 });
    }

    const validStatuses = ['pending', 'approved', 'suspended', 'rejected'];
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase.from('affiliates').update({ status }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
}
