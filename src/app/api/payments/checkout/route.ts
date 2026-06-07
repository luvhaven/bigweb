import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
    try {
        const { leadId, referralId, type = 'diagnostic', email, name } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // 1. Determine Pricing Model
        let amount = 50000; // Default $500.00 for Diagnostic
        let title = 'Revenue Diagnostic Strategy Session';
        let description = 'One-on-one deep dive into your business growth metrics.';

        if (type === 'deposit') {
            amount = 500000; // $5,000.00 Deposit
            title = 'Project Initiation Deposit (50%)';
            description = 'Secures your spot in our engineering sprint and initiates onboarding.';
        }

        // 2. Create Stripe Checkout Session
        const origin = req.headers.get('origin');
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title,
                            description: description,
                            images: ['https://prngeuaxahrnuqniueld.supabase.co/storage/v1/object/public/media/logo_dark.png'],
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/payment/cancel`,
            customer_email: email,
            metadata: {
                leadId,
                referralId,
                type,
            },
        });

        // 3. Create Pending Payment Record (Optional/Fire-and-forget for now)
        const supabase = getSupabaseAdmin();
        await supabase.from('payments').insert([{
            lead_id: leadId,
            referral_id: referralId,
            stripe_session_id: session.id,
            amount: amount / 100,
            status: 'pending',
            gateway: 'stripe',
            metadata: { type }
        }]);

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
