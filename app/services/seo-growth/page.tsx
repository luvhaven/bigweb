'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  BarChart3,
  Globe,
  ArrowRight,
  Shield,
  Target,
  Key,
  Award,
  CheckCircle2,
  Rocket,
  LineChart,
  Network,
  Maximize2,
  Zap,
  Repeat
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

// Product Branding
const PRODUCT_NAME = "The Dominance System™"
const PRODUCT_TAGLINE = "Recursive Growth That Compounds Daily"

// Outcome-focused benefits
const outcomes = [
  {
    title: "Compounding Traffic",
    description: "We build systems where every new piece of content strengthens everything before it. 10% monthly growth becomes exponential annually.",
    icon: TrendingUp,
    metric: "10-20%",
    metricLabel: "MoM Growth"
  },
  {
    title: "Keyword Monopolization",
    description: "Why rank for one term when you can own the entire topic cluster? We blanket your niche until competitors have nowhere to go.",
    icon: Maximize2,
    metric: "100+",
    metricLabel: "Keywords/Topic"
  },
  {
    title: "Self-Reinforcing Authority",
    description: "Our recursive internal linking operationalizes your authority, turning your site into an unshakeable fortress.",
    icon: Repeat,
    metric: "90+",
    metricLabel: "Domain Rating"
  }
]

// Social proof
const socialProof = [
  { value: "3.2M+", label: "Monthly Visitors" },
  { value: "480%", label: "YoY Growth" },
  { value: "12K+", label: "Keywords Ranked" },
  { value: "56", label: "Dominated Niches" }
]

// Transformation phases
const transformation = [
  {
    phase: "Month 1-2",
    title: "Project Launch",
    outcome: "We map the entire semantic landscape of your industry and identify every keyword worth capturing.",
    deliverables: ["Semantic map", "Content clusters", "Gap analysis"]
  },
  {
    phase: "Month 3-6",
    title: "Cluster Deployment",
    outcome: "We systematically deploy content clusters that interlock to create massive topical authority.",
    deliverables: ["Pillar content", "Support articles", "Internal link mesh"]
  },
  {
    phase: "Month 7+",
    title: "Exponential Scale",
    outcome: "The flywheel effect kicks in. Rankings improve faster, traffic compounds, and you become the default industry leader.",
    deliverables: ["Update cycles", "Expansion clusters", "Competitor displacement"]
  }
]

export default function SEOGrowthPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0A0A0A', color: '#FFFFFF' }}>
      <ServiceSchema
        name={`${PRODUCT_NAME} - Elite SEO Growth by BIGWEB`}
        description={`${PRODUCT_TAGLINE}. Self-reinforcing SEO strategies that compound daily. 10-20% MoM growth, keyword monopolization, domain authority building.`}
        serviceType="SEO Services"
        ratingValue={5.0}
        reviewCount={56}
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
            background: 'radial-gradient(circle at 50% 0%, rgba(20,184,166,0.12), transparent 60%)'
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
            backgroundColor: 'rgba(20,184,166,0.08)',
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
            backgroundColor: 'rgba(13,148,136,0.06)',
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
                border: '1px solid rgba(20,184,166,0.2)',
                boxShadow: '0 8px 32px rgba(20,184,166,0.1)'
              }}
            >
              <Award className="w-5 h-5" style={{ color: '#14B8A6' }} />
              <span style={{
                color: '#14B8A6',
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
              The Dominance<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 50%, #0F766E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                System™
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
                color: '#14B8A6',
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
              We engineer <strong style={{ color: '#FFFFFF', fontWeight: '600' }}>recursive growth systems</strong> that monopolize your entire market.
              10-20% MoM growth. Total keyword saturation. Unstoppable momentum.
              <br />
              <span style={{ color: '#FFFFFF', fontWeight: '600' }}>Don't just grow. Compound.</span>
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
                      background: 'linear-gradient(135deg, #14B8A6, #0D9488)',
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
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  boxShadow: '0 20px 60px -15px rgba(13,148,136,0.5), 0 0 0 1px rgba(13,148,136,0.1)',
                  letterSpacing: '0.01em'
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20,184,166,0.3), transparent)'
                  }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5" />
                  Start Compounding
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="#protocol"
                className="inline-flex items-center gap-3 px-10 rounded-2xl font-bold transition-all hover:bg-white/5 hover:border-teal-500/30"
                style={{
                  height: '4.5rem',
                  fontSize: '1.0625rem',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  letterSpacing: '0.01em'
                }}
              >
                <Network className="w-5 h-5" />
                The Protocol
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
                <CheckCircle2 className="w-4 h-4" style={{ color: '#14B8A6' }} />
                Long-Term Asset
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '0.8125rem', color: '#A1A1AA', fontWeight: '500' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#14B8A6' }} />
                Cluster Strategy
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '0.8125rem', color: '#A1A1AA', fontWeight: '500' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#14B8A6' }} />
                Total Domination
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
            style={{ borderColor: 'rgba(20,184,166,0.3)' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#14B8A6' }}
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
            The <span style={{ color: '#14B8A6' }}>System</span> Phases
          </h2>
          <p
            className="mx-auto"
            style={{
              fontSize: '1.25rem',
              color: '#A1A1AA',
              maxWidth: '42rem'
            }}
          >
            Most agencies chase keywords. We build <strong style={{ color: '#FFFFFF' }}>assets that print traffic</strong>.
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
                    background: 'linear-gradient(to bottom right, rgba(20,184,166,0.1), transparent)'
                  }}
                />
                <div className="relative" style={{ zIndex: 10 }}>
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500"
                    style={{
                      backgroundColor: 'rgba(20,184,166,0.1)',
                      border: '2px solid rgba(20,184,166,0.2)'
                    }}
                  >
                    <outcome.icon className="w-10 h-10" style={{ color: '#14B8A6' }} />
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
                        color: '#14B8A6'
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
      <section id="protocol" className="py-40 relative" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2
              className="font-black uppercase leading-none mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#FFFFFF'
              }}
            >
              The <span style={{ color: '#14B8A6' }}>Protocol</span> Phases
            </h2>
            <p
              className="leading-relaxed mx-auto"
              style={{
                fontSize: '1.25rem',
                color: '#A1A1AA',
                maxWidth: '42rem'
              }}
            >
              From launch to exponential scale—here's how we execute.
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
                      background: 'linear-gradient(to bottom, rgba(20,184,166,0.5), rgba(20,184,166,0.1))'
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
                        backgroundColor: '#14B8A6',
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
                        color: '#14B8A6',
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
                            backgroundColor: 'rgba(20,184,166,0.1)',
                            border: '1px solid rgba(20,184,166,0.2)'
                          }}
                        >
                          <CheckCircle2 className="w-4 h-4" style={{ color: '#14B8A6' }} />
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
        <div className="absolute inset-0 blur-[150px]" style={{ backgroundColor: 'rgba(20,184,166,0.2)' }} />
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
                Ready for <span style={{ color: '#14B8A6' }}>Exponential Growth?</span>
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
                Join 56+ market leaders who executed The Protocol.
                <strong style={{ color: '#FFFFFF' }}> Your compounding machine awaits.</strong>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                <Link
                  href="/contact"
                  className="px-12 rounded-2xl font-black shadow-2xl transition-all hover:scale-105 group"
                  style={{
                    height: '5rem',
                    fontSize: '1.5rem',
                    backgroundColor: '#0D9488',
                    color: '#FFFFFF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 20px 60px -15px rgba(13,148,136,0.5)'
                  }}
                >
                  <TrendingUp className="w-7 h-7" />
                  Start My Growth
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-8 items-center" style={{ opacity: 0.7 }}>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#A1A1AA' }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#14B8A6' }} />
                  Compounding ROI
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#A1A1AA' }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#14B8A6' }} />
                  Total Transparency
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.875rem', color: '#A1A1AA' }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: '#14B8A6' }} />
                  Market Monopolization
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices currentPath="/services/seo-growth" />

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'SEO Growth', url: '/services/seo-growth' }
        ]}
      />

      <Footer />
    </main>
  )
}
