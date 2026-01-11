'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { supabase } from '@/utils/supabase'

interface FAQ {
    id: string
    question: string
    answer: string
    category: string
}

interface FAQSectionProps {
    category?: string
    title?: string
    showAll?: boolean
}

export default function FAQSection({ category = 'general', title = 'Everything You Need To Know', showAll = false }: FAQSectionProps) {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [activeIndex, setActiveIndex] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchFAQs() {
            let query = supabase
                .from('cms_faqs')
                .select('*')
                .order('sort_order', { ascending: true })

            if (!showAll) {
                // If specific category requested, we fetch 'general' AND that category usually, 
                // but let's stick to strict category if provided, unless it's default.
                // Actually, let's just fetch everything for now and filter or sort, 
                // but for efficiency let's filter by category if strict.
                // However, usually "general" FAQs are good to show everywhere.
                // Let's rely on the props.
                if (category !== 'all-mixed') {
                    query = query.in('category', ['general', category])
                }
            }

            const { data } = await query

            if (data) {
                setFaqs(data as FAQ[])
            }
            setIsLoading(false)
        }
        fetchFAQs()
    }, [category, showAll])

    const toggleAccordion = (id: string) => {
        setActiveIndex(activeIndex === id ? null : id)
    }

    if (!isLoading && faqs.length === 0) return null

    return (
        <section className="py-24 bg-card relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center justify-center p-2 rounded-lg bg-accent/10 text-accent mb-4">
                        <HelpCircle className="w-6 h-6" />
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{title}</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We believe in radical transparency. Here are honest answers to the questions most agencies dodge.
                    </p>
                </div>

                <div className="space-y-4">
                    {isLoading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-20 bg-secondary/30 rounded-2xl animate-pulse" />
                        ))
                    ) : (
                        faqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`border rounded-2xl transition-all duration-300 ${activeIndex === faq.id ? 'bg-secondary/20 border-accent/30' : 'bg-background hover:bg-secondary/10 border-white/5'}`}
                            >
                                <button
                                    onClick={() => toggleAccordion(faq.id)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={`text-lg font-bold pr-8 transition-colors ${activeIndex === faq.id ? 'text-accent' : 'text-foreground'}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`p-2 rounded-full border transition-all ${activeIndex === faq.id ? 'bg-accent border-accent text-white rotate-180' : 'bg-transparent border-white/10 text-muted-foreground'}`}>
                                        {activeIndex === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-dashed border-white/5">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
