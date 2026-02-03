'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

interface PricingOption {
    id: string
    label: string
    price: number
    description: string
}

interface PricingCategory {
    id: string
    title: string
    options: PricingOption[]
}

const categories: PricingCategory[] = [
    {
        id: 'type',
        title: 'Project Type',
        options: [
            { id: 'landing', label: 'Landing Page', price: 2500, description: 'High-converting single page' },
            { id: 'website', label: 'Corporate Website', price: 5000, description: '5-10 pages with CMS' },
            { id: 'ecommerce', label: 'E-Commerce', price: 8000, description: 'Online store with payments' },
            { id: 'webapp', label: 'Web Application', price: 15000, description: 'Complex custom functionality' },
        ]
    },
    {
        id: 'design',
        title: 'Design Level',
        options: [
            { id: 'standard', label: 'Standard', price: 0, description: 'Clean, professional template-based' },
            { id: 'custom', label: 'Custom', price: 2000, description: 'Unique branding & layout' },
            { id: 'premium', label: 'Premium', price: 5000, description: 'Award-winning animations & 3D' },
        ]
    },
    {
        id: 'features',
        title: 'Add-ons',
        options: [
            { id: 'seo', label: 'Advanced SEO', price: 1500, description: 'Rank higher on Google' },
            { id: 'cms', label: 'Custom CMS', price: 2500, description: 'Easy content management' },
            { id: 'analytics', label: 'Analytics Setup', price: 500, description: 'Track user behavior' },
            { id: 'copy', label: 'Copywriting', price: 1000, description: 'Persuasive text content' },
        ]
    }
]

export default function PricingCalculator() {
    const [selections, setSelections] = useState<Record<string, string | string[]>>({
        type: 'website',
        design: 'custom',
        features: []
    })
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let newTotal = 0

        // Type price
        const typeOption = categories[0].options.find(o => o.id === selections.type)
        if (typeOption) newTotal += typeOption.price

        // Design price
        const designOption = categories[1].options.find(o => o.id === selections.design)
        if (designOption) newTotal += designOption.price

        // Features price
        const selectedFeatures = selections.features as string[]
        selectedFeatures.forEach(featId => {
            const feature = categories[2].options.find(o => o.id === featId)
            if (feature) newTotal += feature.price
        })

        setTotal(newTotal)
    }, [selections])

    const toggleFeature = (id: string) => {
        const current = selections.features as string[]
        if (current.includes(id)) {
            setSelections({ ...selections, features: current.filter(c => c !== id) })
        } else {
            setSelections({ ...selections, features: [...current, id] })
        }
    }

    return (
        <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Options */}
                <div className="lg:col-span-2 space-y-10">
                    {categories.map((category) => (
                        <div key={category.id}>
                            <h3 className="text-sm font-black mb-6 flex items-center gap-2 uppercase tracking-tighter-extreme text-zinc-400">
                                {category.title}
                                <div className="group relative">
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        Select the {category.title.toLowerCase()} that fits your needs.
                                    </div>
                                </div>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {category.options.map((option) => {
                                    const isSelected = category.id === 'features'
                                        ? (selections.features as string[]).includes(option.id)
                                        : selections[category.id] === option.id

                                    return (
                                        <motion.div
                                            key={option.id}
                                            onClick={() => {
                                                if (category.id === 'features') {
                                                    toggleFeature(option.id)
                                                } else {
                                                    setSelections({ ...selections, [category.id]: option.id })
                                                }
                                            }}
                                            className={`relative p-5 rounded-none border-2 cursor-pointer transition-all duration-300 ${isSelected
                                                ? 'border-orange-600 bg-orange-600/5'
                                                : 'border-white/5 hover:border-white/10 hover:bg-white/5'
                                                }`}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-black text-xs uppercase tracking-tighter-extreme">{option.label}</span>
                                                {isSelected && <Check className="w-4 h-4 text-orange-600" />}
                                            </div>
                                            <p className="text-[11px] text-zinc-500 mb-3 leading-tight font-medium">{option.description}</p>
                                            <div className="text-[10px] font-mono font-black text-zinc-400">
                                                {option.price === 0 ? 'LOG_INCLUDED' : `+${option.price.toLocaleString()}_USD`}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-[#0A0A0A] rounded-none p-8 border border-white/5 backdrop-blur-3xl shadow-2xl">
                        <h3 className="text-xs font-mono font-black mb-8 uppercase tracking-[0.4em] text-zinc-600 border-b border-white/5 pb-4">Estimate_Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Base Project</span>
                                <span className="font-medium">
                                    ${categories[0].options.find(o => o.id === selections.type)?.price.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Design</span>
                                <span className="font-medium">
                                    {categories[1].options.find(o => o.id === selections.design)?.price === 0
                                        ? 'Included'
                                        : `$${categories[1].options.find(o => o.id === selections.design)?.price.toLocaleString()}`}
                                </span>
                            </div>
                            {(selections.features as string[]).length > 0 && (
                                <div className="pt-4 border-t border-border">
                                    <span className="text-sm text-muted-foreground block mb-2">Add-ons:</span>
                                    {(selections.features as string[]).map(fid => {
                                        const feature = categories[2].options.find(o => o.id === fid)
                                        return (
                                            <div key={fid} className="flex justify-between text-sm mb-1">
                                                <span>{feature?.label}</span>
                                                <span>+${feature?.price.toLocaleString()}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="pt-8 mb-10">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Gross_Total</span>
                                <span className="text-5xl font-black text-white tracking-tighter-extreme">
                                    <AnimatedCounter value={total} prefix="$" />
                                </span>
                            </div>
                            <p className="text-[9px] font-mono text-zinc-700 mt-4 text-right uppercase">
                                *Clinical_Precision_Verification_Required
                            </p>
                        </div>

                        <Button className="w-full h-20 bg-white text-black hover:bg-orange-600 hover:text-white rounded-none text-xs font-black uppercase tracking-[0.4em] transition-all">
                            INITIALIZE DEPLOYMENT
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
