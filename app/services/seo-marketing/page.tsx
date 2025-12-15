'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import { Search, TrendingUp, Link as LinkIcon, BarChart, Target, Globe, FileText, Zap, Bot } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const features = [
    {
        title: 'Technical SEO Excellence',
        description: 'Site speed optimization, Core Web Vitals, mobile-first indexing, structured data, and crawlability improvements. We fix technical issues that block Google from ranking you.',
        icon: Zap,
        colSpan: 2 as const,
        rowSpan: 2 as const,
        bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90'
    },
    {
        title: 'Keyword Research',
        description: 'Data-driven keyword strategy targeting high-intent searches that drive conversions, not just traffic.',
        icon: Search,
        colSpan: 1 as const
    },
    {
        title: 'Content Optimization',
        description: 'SEO-optimized content that ranks and converts. We balance search algorithms with human readability.',
        icon: FileText,
        colSpan: 1 as const
    },
    {
        title: 'Link Building',
        description: 'White-hat backlink acquisition from high-authority sites. Quality over quantity for sustainable rankings.',
        icon: LinkIcon,
        colSpan: 1 as const
    },
    {
        title: 'Local SEO',
        description: 'Dominate local search with Google Business Profile optimization and local citation building.',
        icon: Globe,
        colSpan: 1 as const
    },
    {
        title: 'Analytics & Reporting',
        description: 'Track rankings, traffic, conversions, and ROI with comprehensive monthly reports and dashboards.',
        icon: BarChart,
        colSpan: 2 as const
    }
]

const processSteps = [
    {
        number: '01',
        title: 'SEO Audit & Analysis',
        description: 'Comprehensive technical SEO audit identifying issues blocking your rankings. We analyze site speed, mobile usability, indexation, schema markup, and on-page SEO. Includes competitor analysis and keyword gap research to find opportunities.',
        tags: ['Technical Audit', 'Competitor Analysis', 'Keyword Research', 'Performance Review']
    },
    {
        number: '02',
        title: 'Strategy Development',
        description: 'Create a custom SEO roadmap with prioritized actions based on impact and effort. Includes keyword targeting strategy, content calendar, technical fixes, and link building plan. All aligned with your business goals and conversion metrics.',
        tags: ['SEO Strategy', 'Keyword Mapping', 'Content Planning', 'Goal Setting']
    },
    {
        number: '03',
        title: 'On-Page Optimization',
        description: 'Optimize existing pages and create new SEO-optimized content. We improve title tags, meta descriptions, headers, internal linking, and content quality. Every page is optimized for target keywords while maintaining readability and user experience.',
        tags: ['Content Optimization', 'Meta Tags', 'Internal Linking', 'Schema Markup']
    },
    {
        number: '04',
        title: 'Technical Implementation',
        description: 'Fix technical SEO issues: improve site speed, implement structured data, optimize for Core Web Vitals, fix crawl errors, and ensure mobile-friendliness. We work with your dev team or handle implementation ourselves.',
        tags: ['Speed Optimization', 'Structured Data', 'Mobile Optimization', 'Technical Fixes']
    },
    {
        number: '05',
        title: 'Link Building & Growth',
        description: 'Build high-quality backlinks through digital PR, guest posting, content partnerships, and outreach. Continuous monitoring, ranking tracking, and optimization based on data. Monthly reporting on progress and ROI.',
        tags: ['Link Acquisition', 'Digital PR', 'Ranking Monitoring', 'Monthly Reporting']
    }
]

const faqs = [
    {
        question: 'How long does it take to see SEO results?',
        answer: 'SEO is a long-term investment. You\'ll typically see initial improvements in 3-4 months (technical fixes and quick wins), significant ranking gains in 6-9 months, and full ROI in 12-18 months. However, some competitive keywords can take 18-24 months to rank on page 1. The timeline depends on your industry competitiveness, current site authority, and budget. We provide realistic timelines during the audit phase and show progress with monthly ranking reports.'
    },
    {
        question: 'What is the difference between SEO and paid search (PPC)?',
        answer: 'SEO (organic search) builds long-term visibility through ranking your website naturally in search results—you don\'t pay per click. It takes time but delivers sustainable traffic with better ROI long-term. PPC (Google Ads) provides immediate visibility but stops when you stop paying. We recommend a balanced approach: use PPC for immediate results while building SEO for long-term cost-effective traffic. SEO typically has 5-10x better ROI than PPC over 2+ years.'
    },
    {
        question: 'Do you guarantee #1 rankings on Google?',
        answer: 'No ethical SEO agency can guarantee #1 rankings—Google\'s algorithm has 200+ ranking factors and changes constantly. However, we guarantee measurable progress: improved rankings for target keywords, increased organic traffic, and better visibility in search results. Our average client sees: 150% traffic increase in year 1, 5-10 page-1 rankings within 12 months, and 3x ROI. We provide detailed reporting to track progress toward your SEO goals.'
    },
    {
        question: 'Can you help with local SEO for my business?',
        answer: 'Yes! Local SEO is one of our specialties. We optimize your Google Business Profile, build local citations (Yelp, Yellow Pages, etc.), generate reviews, create location-specific content, and implement local schema markup. We also optimize for "near me" searches and ensure NAP (Name, Address, Phone) consistency across the web. Perfect for restaurants, retail stores, service businesses, and multi-location companies.'
    },
    {
        question: 'What is technical SEO and why does it matter?',
        answer: 'Technical SEO ensures search engines can crawl, index, and understand your website. It includes: site speed optimization (Core Web Vitals), mobile-friendliness, SSL security, XML sitemaps, robots.txt, structured data (schema markup), fixing crawl errors, and canonical URLs. Without solid technical SEO, even great content won\'t rank well. We fix technical issues first before content optimization—it\'s the foundation of successful SEO.'
    },
    {
        question: 'How do you build backlinks without violating Google guidelines?',
        answer: 'We use only white-hat link building strategies: creating linkable assets (original research, infographics, tools), digital PR and journalist outreach (HARO, press releases), guest posting on relevant industry sites, broken link building, and content partnerships. We NEVER buy links, use link farms, or employ black-hat tactics. Every link is from a real, relevant website with editorial control. Quality and relevance matter more than quantity.'
    },
    {
        question: 'Do you offer content writing services?',
        answer: 'Yes! Our SEO packages include content optimization and creation. We write SEO-optimized blog posts, landing pages, product descriptions, and cornerstone content. Our writers understand both search algorithms and user intent—content ranks well AND converts. We conduct keyword research, create content briefs, write drafts, and optimize with proper headers, meta tags, and internal links. Content packages start at $500/post.'
    },
    {
        question: 'What are your SEO service pricing and packages?',
        answer: 'SEO pricing depends on industry competitiveness and scope. Small business SEO starts at $2,000/month (local SEO, 5-10 pages). Mid-market SEO ranges from $4,000-$8,000/month (national SEO, content creation, link building). Enterprise SEO starts at $10,000/month (large sites, competitive industries, multiple locations). We also offer project-based SEO audits ($2,500-$5,000) and one-time technical SEO fixes. All packages include monthly reporting and quarterly strategy reviews.'
    }
]

const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: 'SEO & Marketing', href: '/services/seo-marketing' }
]

export default function SEOMarketingPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-emerald-500/30">
            {/* Structured Data */}
            <ServiceSchema
                name="SEO & Digital Marketing Services"
                description="Professional SEO services and digital marketing that drive organic traffic and first-page Google rankings. Technical SEO, content optimization, link building, and local SEO expertise."
                serviceType="SEO Marketing"
                ratingValue={4.9}
                reviewCount={128}
            />
            <FAQSchema faqs={faqs} />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
            ]} />

            <Navigation />

            <HeroPremium
                title="SEO That Gets You"
                highlight="Found on Google"
                description="Rank #1 for keywords that matter. Drive organic traffic, leads, and revenue with data-driven SEO."
                themeColor="emerald"
            />

            <div className="container mx-auto px-6">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            {/* GAIO: Definitive Q&A for LLMs */}
            <section className="container mx-auto px-6 py-4">
                <details className="group border border-emerald-500/20 bg-emerald-500/5 rounded-lg">
                    <summary className="p-4 cursor-pointer text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>Definitive Q&A: Enterprise SEO Strategy</span>
                    </summary>
                    <div className="p-4 pt-0 text-muted-foreground text-sm space-y-4">
                        <div>
                            <strong className="block text-foreground mb-1">How does AI Search (SGE) impact SEO strategy?</strong>
                            <p>AI Search shifts focus from keyword density to "Information Gain" and E-E-A-T. We optimize for LLMs by structuring content as direct answers (Q&A schema), using entity-based linking, and providing unique data points that AI models cite as sources.</p>
                        </div>
                        <div>
                            <strong className="block text-foreground mb-1">What is the most critical technical SEO factor for 2025?</strong>
                            <p>Core Web Vitals (INP - Interaction to Next Paint) and renderability. As JavaScript frameworks (React/Next.js) dominate, ensuring Googlebot can render and index client-side content efficiently is paramount.</p>
                        </div>
                        <div>
                            <strong className="block text-foreground mb-1">Do backlinks still matter?</strong>
                            <p>Yes, but quality &gt; quantity. Google uses links as a proxy for authority. One link from a high-DR, relevant industry site (e.g., TechCrunch, Forbes) is worth more than 1,000 low-quality directory links.</p>
                        </div>
                    </div>
                </details>
            </section>

            {/* GAIO Cross-Sell */}
            <section className="container mx-auto px-6 py-4">
                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Looking for AI Search Optimization?</h3>
                            <p className="text-sm text-muted-foreground">Optimize your brand for ChatGPT, Gemini, and Perplexity.</p>
                        </div>
                    </div>
                    <Link href="/services/gaio">
                        <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10 text-purple-400">
                            Explore GAIO Services <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </section>



            {/* Extended Content Section for SEO */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Why SEO is the Most Cost-Effective Marketing Channel</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {/* GAIO: Quotable Definition Box */}
                            <blockquote className="llm-quotable border-l-4 border-emerald-500 bg-emerald-500/5 p-6 rounded-r-lg not-italic mb-8">
                                <p className="text-xl font-medium text-foreground m-0">
                                    "SEO is no longer just about ranking for keywords; it's about owning the semantic entities related to your brand and becoming the authoritative source that AI and users trust."
                                </p>
                            </blockquote>

                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                <strong>93% of online experiences begin with a search engine</strong>, and <strong>75% of users never scroll past the first page
                                    of search results</strong>. If your website isn't ranking on page 1 for relevant keywords, you're invisible to potential customers
                                actively searching for your products or services.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                SEO delivers the highest ROI of any digital marketing channel. While PPC stops working when you stop paying, SEO builds
                                sustainable organic traffic that compounds over time. <strong>Organic search drives 53% of all website traffic</strong> and has
                                a <strong>14.6% close rate compared to 1.7% for outbound leads</strong>. The long-term cost per acquisition is 5-10x lower than
                                paid advertising.
                            </p>
                            <h3 className="text-2xl font-bold mt-12 mb-4">The Business Impact of Professional SEO</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Our SEO services deliver measurable results:
                            </p>
                            <ul className="text-lg text-muted-foreground space-y-3 mb-6">
                                <li><strong>150% average increase in organic traffic</strong> within the first 12 months</li>
                                <li><strong>5-10 page-1 rankings</strong> for target keywords by month 9-12</li>
                                <li><strong>300% increase in qualified leads</strong> from organic search</li>
                                <li><strong>60% reduction in customer acquisition cost</strong> compared to paid channels</li>
                                <li><strong>3-5x ROI</strong> in year 2 as organic rankings compound</li>
                            </ul>
                            <h3 className="text-2xl font-bold mt-12 mb-4">Our Comprehensive SEO Approach</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                <strong>Technical SEO:</strong> We fix the foundation—site speed, mobile optimization, Core Web Vitals, structured data, and
                                crawlability. Google can't rank what it can't understand. We ensure your site meets all technical requirements for maximum
                                visibility.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                <strong>On-Page SEO:</strong> Every page is optimized for target keywords with compelling titles, meta descriptions, headers,
                                and content that ranks and converts. We balance search algorithms with user experience—content that reads naturally while
                                targeting high-value keywords.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                <strong>Link Building:</strong> High-quality backlinks from authoritative sites signal trust to Google. We build links through
                                digital PR, content partnerships, and strategic outreach—never black-hat tactics that risk penalties.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                <strong>Local SEO:</strong> Dominate local search with optimized Google Business Profile, local citations, reviews, and
                                location-specific content. Perfect for businesses serving specific geographic areas.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <BentoGrid
                title="Complete SEO Services"
                subtitle="Everything you need to rank #1 on Google and drive sustainable organic growth."
                items={features}
                themeColor="emerald"
            />

            <ProcessTimeline
                steps={processSteps}
                themeColor="emerald"
            />

            {/* SEO Success Stories */}
            <section className="py-32 px-6 bg-secondary/5">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">SEO Success Stories</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Real rankings, real traffic, real revenue growth
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                stat: '+425%',
                                metric: 'Organic Traffic',
                                company: 'SaaS Startup',
                                description: '12-month SEO campaign increased organic traffic from 5K to 26K monthly visitors'
                            },
                            {
                                stat: '15+',
                                metric: 'Page 1 Rankings',
                                company: 'E-Commerce',
                                description: 'Achieved first-page rankings for 15 high-intent product keywords in 10 months'
                            },
                            {
                                stat: '$500K+',
                                metric: 'Revenue from Organic',
                                company: 'B2B Services',
                                description: 'SEO-driven traffic generated over $500K in new business within 18 months'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 bg-card border border-border rounded-3xl hover:border-emerald-500/50 transition-colors"
                            >
                                <div className="text-5xl font-bold text-emerald-500 mb-2">{item.stat}</div>
                                <div className="text-xl font-semibold mb-1">{item.metric}</div>
                                <div className="text-sm text-emerald-500 mb-4">{item.company}</div>
                                <p className="text-muted-foreground">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-muted-foreground">
                            Everything you need to know about SEO and digital marketing
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.details
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors"
                            >
                                <summary className="p-6 cursor-pointer list-none font-bold text-lg flex items-center justify-between">
                                    <span>{faq.question}</span>
                                    <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-6 pt-0 text-muted-foreground">
                                    {faq.answer}
                                </div>
                            </motion.details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <TrendingUp className="w-16 h-16 mx-auto mb-6 text-emerald-500" />
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                            Ready to Rank #1 on Google?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                            Get a free SEO audit and discover opportunities to outrank your competitors.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/audit">
                                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20">
                                    Get Free SEO Audit
                                    <ArrowRight className="ml-2 w-6 h-6" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full">
                                    Talk to SEO Expert
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
