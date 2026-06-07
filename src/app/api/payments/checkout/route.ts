import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
    try {
        const { leadId, referralId, type = 'diagnostic', email, name } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // 1. Determine Pricing Model
        let amount = 50000; // $500.00
        let title = 'Revenue Diagnostic Strategy Session';

        if (type === 'deposit') {
            amount = 500000; // $5,000.00 Deposit
            title = 'Project Initiation Deposit (50%)';
        }

        // 2. Initialize Paystack Transaction
        // Note: Amount in Paystack is expected in the lowest denomination (cents)
        const origin = req.headers.get('origin');
        const paystackSecret = process.env.PAYSTACK_SECRET_KEY || '';

        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${paystackSecret}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                amount: amount,
                currency: 'USD', // Assumes USD pricing for global B2B
                callback_url: `${origin}/payment/success`,
                metadata: {
                    leadId,
                    referralId,
                    type,
                    custom_fields: [
                        {
                            display_name: 'Payment Description',
                            variable_name: 'description',
                            value: title
                        }
                    ]
                }
            }),
        });

        const paystackData = await response.json();

        if (!paystackData.status) {
            throw new Error(paystackData.message || 'Failed to initialize transaction');
        }

        // 3. Create Pending Payment Record
        const supabase = getSupabaseAdmin();
        await supabase.from('payments').insert([{
            lead_id: leadId,
            referral_id: referralId,
            stripe_session_id: paystackData.data.reference, // Using the same column name to avoid DB schema changes
            amount: amount / 100,
            status: 'pending',
            gateway: 'paystack',
            metadata: { type }
        }]);

        // Paystack returns an authorization_url
        return NextResponse.json({ url: paystackData.data.authorization_url });
    } catch (err: any) {
        console.error('Checkout Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
