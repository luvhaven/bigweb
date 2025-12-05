'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface HeroPremiumProps {
    title: string
    highlight: string
    description: string
    ctaText?: string
    ctaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    themeColor?: string
    backgroundImage?: any // Allow StaticImageData or string
    badgeText?: string
}

export default function HeroPremium({
    title,
    highlight,
    description,
    ctaText = "Get Instant Estimate",
    ctaLink = "/estimator",
    secondaryCtaText = "Schedule Consultation",
    secondaryCtaLink = "/contact",
    themeColor = "green",
    backgroundImage,
    badgeText = "Premium Service"
}: HeroPremiumProps) {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background Image */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-30"
                        priority
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
                </div>
            )}

            {/* Abstract Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1, opacity }}
                    className={`absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-${themeColor}-500/10 blur-[120px]`}
                />
                <motion.div
                    style={{ y: y2, opacity }}
                    className={`absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-${themeColor}-500/10 blur-[100px]`}
                />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Pill Label */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${themeColor}-500/5 border border-${themeColor}-500/10 mb-8 backdrop-blur-sm`}
                        >
                            <span className={`w-2 h-2 rounded-full bg-${themeColor}-500 animate-pulse`} />
                            <span className={`text-sm font-medium text-${themeColor}-500 tracking-wide uppercase`}>
                                {badgeText}
                            </span>
                        </motion.div>

                        {/* Main Title */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 leading-[0.9]">
                            {title}
                            <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-400`}>
                                {highlight}
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                            {description}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            <Link href={ctaLink}>
                                <Button
                                    size="lg"
                                    className={`h-14 px-8 text-lg rounded-full bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white shadow-lg shadow-${themeColor}-500/25 hover:shadow-${themeColor}-500/40 transition-all duration-300`}
                                >
                                    {ctaText}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href={secondaryCtaLink}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-14 px-8 text-lg rounded-full border-2 hover:bg-accent/50 transition-all duration-300"
                                >
                                    {secondaryCtaText}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
                <div className={`w-[1px] h-12 bg-gradient-to-b from-${themeColor}-500/0 via-${themeColor}-500 to-${themeColor}-500/0`} />
            </motion.div>
        </section>
    )
}
