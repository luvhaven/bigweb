'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Plan {
    name: string
    price: string
    description: string
    features: { name: string; included: boolean }[]
    recommended?: boolean
}

const plans: Plan[] = [
    {
        name: "Starter",
        price: "$2,500",
        description: "Perfect for small businesses",
        features: [
            { name: "Custom Design", included: true },
            { name: "Mobile Responsive", included: true },
            { name: "SEO Basics", included: true },
            { name: "CMS Integration", included: false },
            { name: "E-commerce", included: false },
            { name: "Priority Support", included: false },
        ]
    },
    {
        name: "Growth",
        price: "$5,000",
        description: "For scaling companies",
        recommended: true,
        features: [
            { name: "Custom Design", included: true },
            { name: "Mobile Responsive", included: true },
            { name: "Advanced SEO", included: true },
            { name: "CMS Integration", included: true },
            { name: "E-commerce", included: false },
            { name: "Priority Support", included: true },
        ]
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Full-scale digital transformation",
        features: [
            { name: "Custom Design", included: true },
            { name: "Mobile Responsive", included: true },
            { name: "Advanced SEO", included: true },
            { name: "CMS Integration", included: true },
            { name: "E-commerce", included: true },
            { name: "24/7 Support", included: true },
        ]
    }
]

export default function ComparisonTable() {
    return (
        <div className="overflow-x-auto pb-8">
            <div className="min-w-[800px] grid grid-cols-4 gap-4">
                {/* Features Column */}
                <div className="col-span-1 pt-32 space-y-4 px-4">
                    {plans[0].features.map((feature, i) => (
                        <div key={i} className="h-12 flex items-center font-medium text-muted-foreground border-b border-border/50">
                            {feature.name}
                        </div>
                    ))}
                </div>

                {/* Plans Columns */}
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`col-span-1 rounded-2xl p-6 relative ${plan.recommended
                                ? 'bg-accent/5 border-2 border-accent shadow-glow'
                                : 'bg-card border border-border'
                            }`}
                    >
                        {plan.recommended && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="text-3xl font-bold mb-2">{plan.price}</div>
                            <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                            <Button
                                className={`w-full ${plan.recommended ? 'bg-accent hover:bg-accent-dark' : 'bg-muted hover:bg-muted/80'
                                    }`}
                            >
                                Choose {plan.name}
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="h-12 flex items-center justify-center border-b border-border/50">
                                    {feature.included ? (
                                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-green-500" />
                                        </div>
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                                            <X className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
