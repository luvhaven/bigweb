'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { MouseReveal, RevealPatterns } from '@/components/ui/MouseReveal'

interface HeroPremiumProps {
    title: string
    highlight: string
    description: string
    badgeText?: string
    themeColor: 'blue' | 'purple' | 'green' | 'orange' | 'cyan' | 'emerald' | 'indigo' | 'violet'
    backgroundImage?: StaticImageData | string
    pattern?: keyof typeof RevealPatterns
}

export default function HeroPremium({
    title,
    highlight,
    description,
    badgeText = "Premium Service",
    themeColor = 'blue',
    backgroundImage,
    pattern = 'Grid'
}: HeroPremiumProps) {
    const SelectedPattern = RevealPatterns[pattern] || RevealPatterns.Grid

    return (
        { description }
                                </p >

        {/* CTAs */ }
        < div className = "flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center" >
                                    <Link href={ctaLink} className="w-full sm:w-auto">
                                        <Button
                                            size="lg"
                                            className={`w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white shadow-lg shadow-${themeColor}-500/25 transition-all duration-300 transform hover:scale-105`}
                                        >
                                            {ctaText}
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link href={secondaryCtaLink} className="w-full sm:w-auto">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-2 bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300"
                                        >
                                            {secondaryCtaText}
                                        </Button>
                                    </Link>
                                </div >

        {/* Additional Content (Stats, etc.) */ }
    {
        children && (
            <div className="mt-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                {children}
            </div>
        )
    }
                            </motion.div >
                        </div >
                    </div >

        {/* Scroll Indicator */ }
        < motion.div
    style = {{ opacity }
}
className = "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
    >
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground/70 font-medium">Scroll</span>
                        <div className={`w-[1px] h-8 md:h-12 bg-gradient-to-b from-${themeColor}-500/0 via-${themeColor}-500/50 to-${themeColor}-500/0`} />
                    </motion.div >
                </div >
            </MouseReveal >
        </section >
    )
}
