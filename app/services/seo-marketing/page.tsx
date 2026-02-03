'use client'

import { motion } from 'framer-motion'
import {
    Megaphone,
    Globe,
    Radio,
    Eye,
    ArrowRight,
    Target,
    Users,
    Award,
    CheckCircle2,
    Rocket,
    Zap,
    Layout,
    Share2
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

// Product Branding
const PRODUCT_NAME = "The Visibility Engine™"
const PRODUCT_TAGLINE = "Be Everywhere Your Customers Look"

// Outcome-focused benefits
const outcomes = [
    {
        title: "Brand Omnipresence",
        description: "We don't just target search terms. We target the entire customer journey, ensuring your brand appears at every touchpoint.",
        icon: Eye,
        metric: "100%",
        metricLabel: "Search Coverage"
    },
    {
        title: "Authority PR",
        description: "We secure placements in tier-1 industry publications that position you as the thought leader, not just another vendor.",
        icon: Megaphone,
        metric: "Tier 1",
        metricLabel: "Media Placements"
    },
    {
        title: "Multi-Channel Synergy",
        description: "Your SEO content doesn't just sit there. We repurpose and amplify it across social, email, and video channels.",
        icon: Share2,
        metric: "4X",
        metricLabel: "Content Reach"
    }
]

// Social proof
const socialProof = [
    { value: "65M+", label: "Impressions Generated" },
    { value: "450+", label: "PR Features" },
    { value: "3X", label: "Brand Search Vol" },
    { value: "89%", label: "Market Share Won" }
]

// Transformation phases
const transformation = [
    {
        phase: "Month 1",
        title: "Visibility Mapping",
        outcome: "We identify exactly where your customers spend time and what questions they ask before buying.",
        deliverables: ["Touchpoint map", "Content calendar", "PR strategy"]
    },
    {
        phase: "Month 2-4",
        title: "Content Amplification",
        outcome: "We deploy high-impact content and amplify it through digital PR, social channels, and strategic syndication.",
        deliverables: ["Press releases", "Guest posts", "Social assets"]
    },
    {
        phase: "Month 5+",
        title: "Brand Ubiquity",
        outcome: "Your brand becomes unavoidable. Customers see you in search, social media, and industry news.",
        deliverables: ["Trend jacking", "Thought leadership", "Brand protection"]
    }
]

export default function SEOMarketingPage() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}>
            <ServiceSchema
                name={`${PRODUCT_NAME} - Elite SEO Marketing by BIGWEB`}
                description={`${PRODUCT_TAGLINE}. Omnipresent brand authority across all channels. 100% search coverage, Tier 1 PR placements, multi-channel synergy.`}
                serviceType="Digital Marketing"
                ratingValue={5.0}
                reviewCount={38}
            />

            <AdvancedNavigation />

            {/* Hero Section */}
            <section
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                    minHeight: '100vh',
                    paddingTop: '10rem',
                    paddingBottom: '6rem',
                    backgroundColor: '#0A0A0A'
                }}
            >
                {/* Background Effects */}
                <div className="absolute inset-0" style={{ opacity: 0.03 }}>
                    <div className="absolute inset-0 bg-[url('/grid.svg')]" />
                </div>
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(217,70,239,0.12), transparent 60%)'
                    }}
                />

                {/* Floating orbs */}
                <div
                    className="absolute rounded-full blur-3xl"
                    style={{
                        top: '15%',
                        left: '10%',
                        width: '30rem',
                        height: '30rem',
                        backgroundColor: 'rgba(217,70,239,0.08)',
                        animation: 'float 20s ease-in-out infinite'
                    }}
                />
                <div
                    className="absolute rounded-full blur-3xl"
                    style={{
                        bottom: '10%',
                        right: '10%',
                        width: '25rem',
                        height: '25rem',
                        backgroundColor: 'rgba(192,38,211,0.06)',
                        animation: 'float 25s ease-in-out infinite reverse'
                    }}
                />

                {/* Content */}
                <div className="relative container mx-auto px-6 text-center" style={{ zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Product Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md mb-10"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(217,70,239,0.2)',
                                boxShadow: '0 8px 32px rgba(217,70,239,0.1)'
                            }}
                        >
                            <Award className="w-5 h-5" style={{ color: '#D946EF' }} />
                            <span style={{
                                color: '#D946EF',
                                fontSize: '0.8125rem',
                                fontWeight: '700',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase'
                            }}>
                                Introducing {PRODUCT_NAME}
                            </span>
                        </motion.div>

                        {/* Product Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="font-black tracking-tight mb-6"
                            style={{
                                fontSize: 'clamp(2.75rem, 8vw, 6.5rem)',
                                lineHeight: '0.95',
                                color: '#FFFFFF',
                                letterSpacing: '-0.02em'
                            }}
                        >
                            The Visibility<br />
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #E879F9 0%, #D946EF 50%, #C026D3 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                Engine™
                            </span>
                        </motion.h1>

                        {/* Product Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mx-auto mb-10"
                            style={{
                                fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                                color: '#D946EF',
                                maxWidth: '48rem',
                                fontWeight: '600',
                                fontStyle: 'italic'
                            }}
                        >
                            "{PRODUCT_TAGLINE}"
                        </motion.p>

                        {/* Value Proposition */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mx-auto leading-relaxed mb-16"
                            style={{
                                fontSize: 'clamp(1.125rem, 2.2vw, 1.5rem)',
                                color: '#D4D4D8',
                                maxWidth: '52rem',
                                fontWeight: '400',
                                lineHeight: '1.6'
                            }}
                        >
                            We engineer <strong style={{ color: '#FFFFFF', fontWeight: '600' }}>total brand ubiquity</strong> that makes you the obvious choice.
                            Every search. Every platform. Every customer touchpoint.
                            <br />
                            <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Be impossible to ignore.</span>
                        </motion.p>

                        {/* Social Proof */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="flex flex-wrap justify-center gap-12 mb-16"
                        >
                            {socialProof.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div
                                        className="font-black mb-2"
                                        style={{
                                            fontSize: '2.5rem',
                                            background: 'linear-gradient(135deg, #E879F9, #D946EF)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '0.8125rem',
                                            color: '#A1A1AA',
                                            fontWeight: '600',
                                            letterSpacing: '0.05em',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12"
                        >
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 px-12 rounded-2xl font-bold transition-all hover:scale-[1.02] relative overflow-hidden"
                                style={{
                                    height: '4.5rem',
                                    fontSize: '1.125rem',
                                    backgroundColor: '#D946EF',
                                    color: '#FFFFFF',
                                    boxShadow: '0 20px 60px -15px rgba(217,70,239,0.5), 0 0 0 1px rgba(217,70,239,0.1)',
                                    letterSpacing: '0.01em'
                                }}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(232,121,249,0.3), transparent)'
                                    }}
                                />
                                <span className="relative z-10 flex items-center gap-3">
                                    <Rocket className="w-5 h-5" />
                                    Get Seen Everywhere
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href="#strategy"
                                className="inline-flex items-center gap-3 px-10 rounded-2xl font-bold transition-all hover:bg-white/5 hover:border-fuchsia-500/30"
                                style={{
                                    height: '4.5rem',
                                    fontSize: '1.0625rem',
                                    border: '1.5px solid rgba(255,255,255,0.1)',
                                    color: '#FFFFFF',
                                    letterSpacing: '0.01em'
                                }}
                            >
                                <Eye className="w-5 h-5" />
                                View Strategy
                            </Link>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.8 }}
                            className="flex flex-wrap justify-center gap-8 items-center"
                            style={{ opacity: 0.5 }}
                        >
                            <div className="flex items-center gap-2" style={{ fontSize: '0.8125rem', color: '#A1A1AA', fontWeight: '500' }}>
                                <CheckCircle2 className="w-4 h-4" style={{ color: '#D946EF' }} />
                                Tier 1 PR Networks
                            </div>
                            <div className="flex items-center gap-2" style={{ fontSize: '0.8125rem', color: '#A1A1AA', fontWeight: '500' }}>
                                <CheckCircle2 className="w-4 h-4" style={{ color: '#D946EF' }} />
                                Multi-Channel
                            </div>
                            <div className="flex items-center gap-2" style={{ fontSize: '0.8125rem', color: '#A1A1AA', fontWeight: '500' }}>
                                <CheckCircle2 className="w-4 h-4" style={{ color: '#D946EF' }} />
                                Reputation Management
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    style={{ zIndex: 10 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
                        style={{ borderColor: 'rgba(217,70,239,0.3)' }}
                    >
                        <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: '#D946EF' }}
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Outcomes Grid */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 text-center mb-24">
                    <h2
                        className="font-black mb-6 uppercase tracking-tight"
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                            color: '#FFFFFF'
                        }}
                    >
                        Be <span style={{ color: '#D946EF' }}>Everywhere</span>
                    </h2>
                    <p
                        className="mx-auto"
                        style={{
                            fontSize: '1.25rem',
                            color: '#A1A1AA',
                            maxWidth: '42rem'
                        }}
                    >
                        Don't just launch a website. Launch a <strong style={{ color: '#FFFFFF' }}>digital takeover</strong>.
                    </p>
                </div>

                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {outcomes.map((outcome, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-[2.5rem] transition-all group overflow-hidden relative"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    border: '2px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{
                                        background: 'linear-gradient(to bottom right, rgba(217,70,239,0.1), transparent)'
                                    }}
                                />
                                <div className="relative" style={{ zIndex: 10 }}>
                                    <div
                                        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500"
                                        style={{
                                            backgroundColor: 'rgba(217,70,239,0.1)',
                                            border: '2px solid rgba(217,70,239,0.2)'
                                        }}
                                    >
                                        <outcome.icon className="w-10 h-10" style={{ color: '#D946EF' }} />
                                    </div>
                                    <h3
                                        className="font-black mb-4 uppercase tracking-tight"
                                        style={{
                                            fontSize: '1.75rem',
                                            color: '#FFFFFF'
                                        }}
                                    >
                                        {outcome.title}
                                    </h3>
                                    <p
                                        className="mb-8 leading-relaxed"
                                        style={{
                                            fontSize: '1.125rem',
                                            color: '#D4D4D8'
                                        }}
                                    >
                                        {outcome.description}
                                    </p>

                                    <div className="pt-8 flex flex-col gap-2" style={{ borderTop: '2px solid rgba(255,255,255,0.05)' }}>
                                        <div
                                            className="font-black tracking-tight"
                                            style={{
                                                fontSize: '3rem',
                                                color: '#D946EF'
                                            }}
                                        >
                                            {outcome.metric}
                                        </div>
                                        <div
                                            className="font-bold uppercase"
                                            style={{
                                                fontSize: '0.875rem',
                                                color: 'rgba(255,255,255,0.5)',
                                                letterSpacing: '0.1em'
                                            }}
                                        >
                                            {outcome.metricLabel}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transformation Timeline */}
            <section id="strategy" className="py-40 relative" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2
                            className="font-black uppercase leading-none mb-6"
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                color: '#FFFFFF'
                            }}
                        >
                            The <span style={{ color: '#D946EF' }}>Ubiquity</span> Strategy
                        </h2>
                        <p
                            className="leading-relaxed mx-auto"
                            style={{
                                fontSize: '1.25rem',
                                color: '#A1A1AA',
                                maxWidth: '42rem'
                            }}
                        >
                            From mapping to amplification to total dominance—here's how we make you unavoidable.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-12">
                        {transformation.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative"
                            >
                                {i < transformation.length - 1 && (
                                    <div
                                        className="absolute left-8 top-24 w-1 h-full"
                                        style={{
                                            background: 'linear-gradient(to bottom, rgba(217,70,239,0.5), rgba(217,70,239,0.1))'
                                        }}
                                    />
                                )}

                                <div
                                    className="flex gap-8 p-10 rounded-[3rem] transition-all hover:scale-[1.02]"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.03)',
                                        border: '2px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <div className="flex-shrink-0">
                                        <div
                                            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black"
                                            style={{
                                                backgroundColor: '#D946EF',
                                                color: '#FFFFFF',
                                                fontSize: '1.5rem'
                                            }}
                                        >
                                            {i + 1}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div
                                            className="font-bold uppercase mb-2"
                                            style={{
                                                color: '#D946EF',
                                                letterSpacing: '0.1em',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {step.phase}
                                        </div>
                                        <h3
                                            className="font-black mb-4 uppercase tracking-tight"
                                            style={{
                                                fontSize: '2rem',
                                                color: '#FFFFFF'
                                            }}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className="mb-6 leading-relaxed"
                                            style={{
                                                fontSize: '1.25rem',
                                                color: '#D4D4D8'
                                            }}
                                        >
                                            {step.outcome}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {step.deliverables.map((item, j) => (
                                                <div
                                                    key={j}
                                                    className="flex items-center gap-2 px-4 py-2 rounded-xl"
                                                    style={{
                                                        backgroundColor: 'rgba(217,70,239,0.1)',
                                                        border: '1px solid rgba(217,70,239,0.2)'
                                                    }}
                                                >
                                                    <CheckCircle2 className="w-4 h-4" style={{ color: '#D946EF' }} />
                                                    <span style={{ fontSize: '0.875rem', color: '#D4D4D8', fontWeight: '600' }}>
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 blur-[150px]" style={{ backgroundColor: 'rgba(217,70,239,0.2)' }} />
                <div className="container mx-auto px-6 relative" style={{ zIndex: 10 }}>
                    <div
                        className="max-w-5xl mx-auto rounded-[3.5rem] p-12 md:p-24 text-center overflow-hidden relative shadow-2xl"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '2px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <div className="absolute inset-0 bg-[url('/grid.svg')]" style={{ opacity: 0.05 }} />
                        <div className="relative" style={{ zIndex: 10 }}>
                            <h2
                                className="font-black mb-8 uppercase"
                                style={{
                                    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                                    lineHeight: '1',
                                    color: '#FFFFFF'
                                }}
                            >
                                Ready to Be <span style={{ color: '#D946EF' }}>Everyone's Choice?</span>
                            </h2>
                            <p
                                className="mx-auto mb-16 leading-relaxed"
                                style={{
                                    fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                                    color: '#D4D4D8',
                                    maxWidth: '42rem',
                                    fontWeight: '500'
                                }}
                            >
                                Join 38+ brands that are now household names.
                                <strong style={{ color: '#FFFFFF' }}> Your visibility engine awaits.</strong>
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                                <Link
                                    href="/contact"
                                    className="px-12 rounded-2xl font-black shadow-2xl transition-all hover:scale-105 group"
                                    style={{
                                        height: '5rem',
                                        fontSize: '1.5rem',
                                        backgroundColor: '#D946EF',
                                        color: '#FFFFFF',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        boxShadow: '0 20px 60px -15px rgba(217,70,239,0.5)'
                                    }}
                                >
                                    <Eye className="w-7 h-7" />
                                    Get Seen Now
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                            <div className="flex flex-wrap justify-center gap-8 items-center" style={{ opacity: 0.7 }}>
                                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#A1A1AA' }}>
                                    <CheckCircle2 className="w-5 h-5" style={{ color: '#D946EF' }} />
                                    Omnipresence
                                </div>
                                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#A1A1AA' }}>
                                    <CheckCircle2 className="w-5 h-5" style={{ color: '#D946EF' }} />
                                    Tier 1 Authority
                                </div>
                                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#A1A1AA' }}>
                                    <CheckCircle2 className="w-5 h-5" style={{ color: '#D946EF' }} />
                                    Massive Reach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedServices currentPath="/services/seo-marketing" />

            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: 'Services', url: '/services' },
                    { name: 'SEO Marketing', url: '/services/seo-marketing' }
                ]}
            />

            <Footer />
        </main>
    )
}
