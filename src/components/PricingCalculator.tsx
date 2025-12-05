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
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
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
                                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isSelected
                                                    ? 'border-accent bg-accent/5'
                                                    : 'border-border hover:border-accent/50 hover:bg-accent/5'
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-semibold">{option.label}</span>
                                                {isSelected && <Check className="w-5 h-5 text-accent" />}
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                                            <div className="text-sm font-medium text-accent">
                                                {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
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
                    <div className="sticky top-24 bg-muted/30 rounded-2xl p-6 border border-border">
                        <h3 className="text-2xl font-bold mb-6">Estimated Cost</h3>

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

                        <div className="pt-6 border-t border-border mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold">Total Estimate</span>
                                <span className="text-4xl font-bold text-accent">
                                    <AnimatedCounter value={total} prefix="$" />
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 text-right">
                                *Final quote may vary based on specific requirements
                            </p>
                        </div>

                        <Button className="w-full bg-accent hover:bg-accent-dark text-white py-6 text-lg shadow-glow">
                            Get Detailed Quote
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
