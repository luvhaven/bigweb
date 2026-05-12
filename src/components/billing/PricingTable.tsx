'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import type { Engagement } from '@/lib/schemas'

interface PricingTableProps {
    initialTiers: Engagement[]
}

export default function PricingTable({ initialTiers }: PricingTableProps) {
    const tiers = initialTiers.length > 0 ? initialTiers : defaultPlans

    const handleCheckout = async (plan: string) => {
        console.log(`Checkout initiated for ${plan}`)
        // await stripe.redirectToCheckout(...)
    }

    return (
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 relative z-10">
            {tiers.map((plan, index) => (
                <motion.div
                    key={plan.id || plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative p-10 rounded-[2rem] border transition-all duration-500 group ${plan.is_popular
                        ? 'bg-white/[0.03] border-accent/30 shadow-[0_0_50px_rgba(212,168,83,0.05)]'
                        : 'bg-white/[0.01] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.02]'
                        } backdrop-blur-md flex flex-col`}
                >
                    {plan.is_popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-[#0a0a0a] px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                            Elite Selection
                        </div>
                    )}

                    <div className="mb-10">
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">{plan.name}</h3>
                        <div className="text-5xl font-serif text-white tracking-tighter mb-4">{plan.price}</div>
                        <p className="text-zinc-500 text-sm leading-relaxed font-medium">{plan.description}</p>
                    </div>

                    <div className="flex-grow mb-12 space-y-5">
                        {Array.isArray(plan.features) && plan.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-4">
                                <div className="p-0.5 rounded-full bg-accent/10 text-accent mt-0.5">
                                    <Check className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-sm text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <Button
                        className={`w-full h-14 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${plan.is_popular
                            ? 'bg-white text-[#0a0a0a] hover:bg-accent hover:text-white shadow-lg'
                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                            }`}
                        onClick={() => handleCheckout(plan.name)}
                    >
                        {plan.price === 'Custom' ? 'Contact Sales' : 'Start Your Project'}
                    </Button>
                </motion.div>
            ))}
        </div>
    )
}

const defaultPlans: Engagement[] = [
    {
        id: '1',
        name: 'Conversion Landing Pages',
        price: 'From $5,000',
        description: 'High-velocity, single-focus landing pages engineered strictly to convert traffic into qualified leads.',
        is_popular: false,
        is_active: true,
        sort_order: 1,
        features: [
            'Conversion-Focused UX/UI',
            'Sub-Second Performance Optimization',
            'Advanced Analytics Setup',
            'Behavioral Tracking Integration',
            'A/B Testing Framework',
            'Direct Technical Support'
        ]
    },
    {
        id: '2',
        name: 'The Monolith™ System',
        price: 'From $15,000',
        description: 'Our flagship build. End-to-end digital infrastructure, revenue positioning, and advanced funnel architecture.',
        is_popular: true,
        is_active: true,
        sort_order: 2,
        features: [
            'End-to-End Enterprise Rebuild',
            'Elite Brand & UI Design',
            'Custom Headless Architecture',
            'Cinematic WebGL & Motion',
            'Intent-Based Copywriting Framework',
            'Complex Funnel Engineering',
            '90-Day Post-Launch Growth Strategy'
        ]
    },
    {
        id: '3',
        name: 'Enterprise Growth',
        price: 'From $4,000/mo',
        description: 'Ongoing technical SEO, CRO, and performance engineering for teams demanding continuous, aggressive scaling.',
        is_popular: false,
        is_active: true,
        sort_order: 3,
        features: [
            'Dedicated Lead Engineer & Strategist',
            'Continuous A/B/n Testing',
            'Technical SEO Retainer',
            'Custom Dashboard Development',
            'Priority Development Queue',
            'Weekly Strategy Calls',
            'No Long-Term Contracts'
        ]
    }
]

