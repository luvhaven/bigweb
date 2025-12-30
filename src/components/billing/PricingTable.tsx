'use client'

import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { pricingAPI, PricingTier } from '@/lib/api/pricing'

export default function PricingTable() {
    const [tiers, setTiers] = useState<PricingTier[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadPricing()
    }, [])

    const loadPricing = async () => {
        try {
            const data = await pricingAPI.getAll()
            if (data && data.length > 0) {
                setTiers(data)
            } else {
                // Fallback to defaults if DB is empty to avoid broken UI
                setTiers(defaultPlans)
            }
        } catch (error) {
            console.error('Failed to load pricing:', error)
            setTiers(defaultPlans)
        } finally {
            setLoading(false)
        }
    }

    const handleCheckout = async (plan: string) => {
        console.log(`Checkout initiated for ${plan}`)
        // await stripe.redirectToCheckout(...)
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {tiers.map((plan, index) => (
                <motion.div
                    key={plan.id || plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-8 rounded-2xl border ${plan.is_popular
                        ? 'bg-secondary/10 border-orange-500/50 shadow-2xl shadow-orange-500/10'
                        : 'bg-background/50 border-white/10'
                        } backdrop-blur-sm flex flex-col`}
                >
                    {plan.is_popular && (
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
                        {Array.isArray(plan.features) && plan.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3">
                                <div className="p-1 rounded-full bg-green-500/10 text-green-500 mt-0.5">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Button
                        className={`w-full h-12 text-lg font-bold ${plan.is_popular
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

const defaultPlans: PricingTier[] = [
    {
        id: '1',
        name: 'Starter',
        price: '$2,999',
        description: 'Perfect for small businesses looking to establish a premium presence.',
        is_popular: false,
        sort_order: 1,
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
        id: '2',
        name: 'Growth',
        price: '$5,999',
        description: 'For ambitious brands ready to scale with conversion-focused design.',
        is_popular: true,
        sort_order: 2,
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
        id: '3',
        name: 'Enterprise',
        price: 'Custom',
        description: 'Full-scale digital transformation for market leaders.',
        is_popular: false,
        sort_order: 3,
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

