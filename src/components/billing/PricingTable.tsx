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
        name: 'Conversion Diagnostic',
        price: 'From $2,500',
        description: 'Complete forensic audit and roadmap to fix your leaking revenue.',
        is_popular: false,
        sort_order: 1,
        features: [
            'Forensic Data Audit',
            'Behavioral Analysis',
            'UX Research Report',
            'Prioritized Fix List',
            'ROI Projections',
            'Strategy Session'
        ]
    },
    {
        id: '2',
        name: 'Fix Sprint',
        price: '$5,000+',
        description: 'Rapid, high-impact implementation of critical conversion fixes.',
        is_popular: true,
        sort_order: 2,
        features: [
            'Foundational Fixes',
            'Speed Optimization',
            'Messaging Overhaul',
            'Mobile Optimization',
            'CTA Refinement',
            '1-Week Implementation',
            'Performance Tracking'
        ]
    },
    {
        id: '3',
        name: 'Revenue System',
        price: 'From $15,000',
        description: 'Full website rebuild engineered for maximum conversion performance.',
        is_popular: false,
        sort_order: 3,
        features: [
            'End-to-End Rebuild',
            'Elite UX/UI Design',
            'Custom CMS Integration',
            'Advanced Animations',
            'Intent-Based Copy',
            'A/B Testing Framework',
            '3-Months Post-Launch Support'
        ]
    }
]

