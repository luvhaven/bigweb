import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
    // We throw during actual usage, but during build/init we might just skip
    // console.warn('STRIPE_SECRET_KEY is missing');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2023-10-16' as any,
    appInfo: {
        name: 'BIGWEB Digital Revenue Engine',
        version: '0.1.0',
    },
});
