import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Resend with a dummy key if env var is missing during build time
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_pass_build');

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

    // -- Activation Email Injection --
    // Uses admin_get_affiliates RPC (SECURITY DEFINER) to bypass RLS, then filters to the target id
    if (status === 'approved') {
        try {
            const { data: allAffiliates, error: rpcErr } = await supabaseService.rpc('admin_get_affiliates', {
                p_secret: 'bigweb_admin_secret_2026',
                p_status: 'all'
            });

            if (rpcErr) {
                console.error('[Affiliates PATCH] RPC lookup failed:', rpcErr);
            } else {
                const affiliate = (allAffiliates as any[])?.find((a: any) => a.id === id);

                if (!affiliate) {
                    console.error('[Affiliates PATCH] Affiliate not found for id:', id);
                } else if (!process.env.RESEND_API_KEY) {
                    console.warn('[Affiliates PATCH] RESEND_API_KEY not set — skipping email.');
                } else {
                    const emailResult = await resend.emails.send({
                        from: 'BIGWEB Partners <partners@bigwebdigital.com>',
                        to: [affiliate.email],
                        subject: 'Welcome to Elite Partners — Your Referral Code is Live',
                        html: `
                        <div style="font-family:'Helvetica Neue',sans-serif; max-width:600px; margin:0 auto; background:#0a0a0b; color:#fff; border-radius:12px; overflow:hidden;">
                          <div style="background:linear-gradient(135deg,#FF6B35,#e85d25); padding:40px 40px 32px;">
                            <h1 style="margin:0; font-size:28px; font-weight:800; color:#fff; letter-spacing:-0.5px;">You're Approved.</h1>
                            <p style="margin:8px 0 0; font-size:16px; color:rgba(255,255,255,0.8);">Welcome to the BIGWEB Elite Partner Network.</p>
                          </div>
                          <div style="padding:40px;">
                            <p style="font-size:16px; color:rgba(255,255,255,0.7); line-height:1.6;">Hi ${affiliate.first_name},</p>
                            <p style="font-size:16px; color:rgba(255,255,255,0.7); line-height:1.6;">Your application has been personally reviewed and approved. You now have full access to our partner attribution pipeline.</p>
                            
                            <p style="font-size:13px; text-transform:uppercase; letter-spacing:2px; color:rgba(255,255,255,0.3); margin-bottom:8px;">Your Referral Code</p>
                            <div style="background:#111; border:1px solid rgba(255,107,53,0.3); padding:20px 24px; border-radius:8px; font-family:monospace; font-size:26px; font-weight:700; color:#FF6B35; letter-spacing:4px; text-align:center;">
                              ${affiliate.referral_code}
                            </div>

                            <div style="margin-top:32px; background:rgba(255,255,255,0.04); border-radius:8px; padding:24px;">
                              <p style="margin:0 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:2px; color:rgba(255,255,255,0.3);">Your Referral Link</p>
                              <p style="margin:0; font-family:monospace; font-size:14px; color:#6ee7b7; word-break:break-all;">https://bigwebdigital.com?ref=${affiliate.referral_code}</p>
                            </div>

                            <div style="margin-top:32px;">
                              <p style="font-size:15px; color:rgba(255,255,255,0.6); line-height:1.7;">Share your link with qualified prospects. When they land on our site, we automatically lock attribution to your ID at the database level. You earn <strong style="color:#fff;">10% commission</strong> on any contract they sign.</p>
                            </div>

                            <hr style="border:none; border-top:1px solid rgba(255,255,255,0.07); margin:32px 0;"/>
                            <p style="font-size:13px; color:rgba(255,255,255,0.3); margin:0;">BIGWEB Digital · Elite Partner Network<br/>Questions? Reply to this email.</p>
                          </div>
                        </div>`
                    });

                    if (emailResult.error) {
                        console.error('[Affiliates PATCH] Resend delivery error:', emailResult.error);
                    } else {
                        console.log('[Affiliates PATCH] Activation email sent to:', affiliate.email);
                    }
                }
            }
        } catch (emailErr) {
            console.error('[Affiliates PATCH] Unexpected error during email send:', emailErr);
        }
    }

    return NextResponse.json({ success: true });
}
