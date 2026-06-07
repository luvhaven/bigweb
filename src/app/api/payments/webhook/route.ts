import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function POST(req: Request) {
    const bodyText = await req.text();
    const headersList = await headers();
    const signature = headersList.get('x-paystack-signature');

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY || '';

    // Verify signature
    const hash = crypto.createHmac('sha512', paystackSecret).update(bodyText).digest('hex');
    if (hash !== signature) {
        console.error('Webhook Error: Invalid Paystack signature');
        return NextResponse.json({ error: 'Invalid Paystack signature' }, { status: 400 });
    }

    const event = JSON.parse(bodyText);
    const supabase = getSupabaseAdmin();

    // Paystack returns 'charge.success' on successful payment
    if (event.event === 'charge.success') {
        const { reference, amount, metadata, id } = event.data;
        const { leadId, referralId } = metadata || {};

        // 1. Update Payment Record
        await supabase
            .from('payments')
            .update({
                status: 'completed',
                stripe_payment_intent_id: id.toString(), // Store Paystack trans ID here to avoid DB migration
                updated_at: new Date().toISOString()
            })
            .eq('stripe_session_id', reference); // Using same column as reference

        // 2. Handle Referral Commission
        if (referralId) {
            const actualAmount = amount ? amount / 100 : 0;
            const commissionMatch = 0.10; // 10%
            const commissionAmount = actualAmount * commissionMatch;

            await supabase
                .from('referrals')
                .update({
                    status: 'converted',
                    contract_value: actualAmount,
                    commission_amount: commissionAmount,
                    converted_at: new Date().toISOString()
                })
                .eq('id', referralId);

            // Update affiliate total_earned
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
    } else {
        console.log(`Unhandled event type ${event.event}`);
    }

    return NextResponse.json({ received: true });
}
