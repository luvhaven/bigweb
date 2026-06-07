import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        );
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const { leadId, referralId, type } = session.metadata || {};

            // 1. Update Payment Record
            await supabase
                .from('payments')
                .update({
                    status: 'completed',
                    stripe_payment_intent_id: session.payment_intent as string,
                    updated_at: new Date().toISOString()
                })
                .eq('stripe_session_id', session.id);

            // 2. Handle Referral Commission
            if (referralId) {
                const amount = session.amount_total ? session.amount_total / 100 : 0;
                const commissionMatch = 0.10; // 10%
                const commissionAmount = amount * commissionMatch;

                await supabase
                    .from('referrals')
                    .update({
                        status: 'converted',
                        contract_value: amount,
                        commission_amount: commissionAmount,
                        converted_at: new Date().toISOString()
                    })
                    .eq('id', referralId);

                // Update affiliate total_earned
                // We fetch the affiliate_id from the referral first
                const { data: refData } = await supabase.from('referrals').select('affiliate_id').eq('id', referralId).single();
                if (refData?.affiliate_id) {
                    await supabase.rpc('increment_affiliate_earnings', {
                        aff_id: refData.affiliate_id,
                        amount: commissionAmount
                    });
                }
            }

            // 3. Mark Lead as Converted
            if (leadId) {
                await supabase.from('leads').update({ status: 'converted' }).eq('id', leadId);
            }

            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
