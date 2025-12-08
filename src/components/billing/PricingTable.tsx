'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const plans = [
    {
        name: 'Starter',
        price: '$2,999',
        description: 'Perfect for small businesses looking to establish a premium presence.',
        features: [
            'Custom Design System',
            '5 Core Pages',
            'Mobile Responsive',
            'Basic SEO Setup',
            'Contact Form Integration',
            'CMS Integration'
        ]
    },
    {
        name: 'Growth',
        price: '$5,999',
        popular: true,
        description: 'For ambitious brands ready to scale with conversion-focused design.',
        features: [
            'Everything in Starter',
            'Advanced Animations (GSAP)',
            'Conversion Optimization',
            'Blog / Resource Center',
            'Email Marketing Setup',
            'Analytics Dashboard',
            'Performance Optimization'
        ]
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Full-scale digital transformation for market leaders.',
        features: [
            'Everything in Growth',
            'Custom Web Application',
            '3D Elements & WebGL',
            'Advanced Integrations',
            'Priority Support',
            'A/B Testing Setup',
            'Dedicated Project Manager'
        ]
    }
]

export default function PricingTable() {
    const handleCheckout = async (plan: string) => {
        // Integrate Stripe checkout here
        console.log(`Checkout initiated for ${plan}`)
        // await stripe.redirectToCheckout(...)
    }

    return (
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {plans.map((plan, index) => (
                <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-8 rounded-2xl border ${plan.popular
                            ? 'bg-secondary/10 border-orange-500/50 shadow-2xl shadow-orange-500/10'
                            : 'bg-background/50 border-white/10'
                        } backdrop-blur-sm flex flex-col`}
                >
                    {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
                            Most Popular
                        </div>
                    )}

                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-4xl font-bold mb-4">{plan.price}</div>
                        <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>

                    <div className="flex-grow mb-8 space-y-4">
                        {plan.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3">
                                <div className="p-1 rounded-full bg-green-500/10 text-green-500 mt-0.5">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Button
                        className={`w-full h-12 text-lg font-bold ${plan.popular
                                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-glow'
                                : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                        onClick={() => handleCheckout(plan.name)}
                    >
                        {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                </motion.div>
            ))}
        </div>
    )
}
