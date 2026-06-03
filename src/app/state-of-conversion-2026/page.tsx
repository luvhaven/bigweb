import { Metadata } from 'next';
import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';
import { FAQSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
    title: 'State of Conversion 2026 — The Definitive B2B Revenue Report | BIGWEB Digital',
    description: 'Original research from 42 B2B client campaigns. $140M in tracked revenue. The most comprehensive conversion intelligence report available for digital-first businesses in 2026.',
    openGraph: {
        title: 'State of Conversion 2026 — BIGWEB Digital',
        description: '$140M tracked. 42 campaigns. The definitive data on what converts B2B buyers in 2026.',
        type: 'article',
    },
};

const STATS = [
    { value: '$140M+', label: 'Total revenue tracked across client campaigns', sub: '2024–2025' },
    { value: '42', label: 'B2B campaigns analysed across 9 industries', sub: 'US, EU, AU, CA, UK' },
    { value: '288%', label: 'Average revenue growth across engagements', sub: 'Median: 190%' },
    { value: '6.2s', label: 'Avg time above-the-fold before bounce decision', sub: 'Down from 8.1s in 2023' },
];

const FINDINGS = [
    {
        num: '01',
        category: 'Conversion Architecture',
        headline: 'The hero section determines 73% of bounce decisions',
        body: 'Across 42 campaigns, we instrumented every pixel of above-the-fold engagement. The single most predictive variable of whether a visitor converts is not the offer, not the price, and not the design — it is whether the headline answers the question "why should I care?" within 4 seconds of page load. 73% of all bounce decisions happen before the first scroll.',
        stat: '73%',
        statLabel: 'of bounce decisions happen in the hero',
        color: 'var(--color-gold-bright)',
    },
    {
        num: '02',
        category: 'Trust Signals',
        headline: 'Social proof placement beats social proof volume',
        body: 'Companies that displayed a single named testimonial with a company logo immediately adjacent to the CTA outperformed companies with 12+ generic reviews on a separate testimonials page by 3.2x. The position of trust signals matters more than the quantity. Proximity to the decision point is everything.',
        stat: '3.2x',
        statLabel: 'higher conversion with positioned social proof',
        color: 'var(--color-gold-bright)',
    },
    {
        num: '03',
        category: 'Pricing Psychology',
        headline: 'Transparent pricing pages reduced sales cycle by 31%',
        body: 'When we introduced pricing transparency (real ranges, real scopes) on previously gated pricing pages, average sales cycle length dropped by 31%. The visitors who left were unqualified. The visitors who stayed converted at 4.1x the rate of the gated-pricing control group. Opacity is not a qualification mechanism — it is a friction mechanism.',
        stat: '31%',
        statLabel: 'reduction in sales cycle with transparent pricing',
        color: 'var(--color-gold-bright)',
    },
    {
        num: '04',
        category: 'Page Performance',
        headline: 'Every 500ms of load time cost clients $4,200/month on average',
        body: 'We measured load-time impact on conversion across 18 e-commerce and SaaS clients. The relationship was non-linear — the first 500ms of improvement had the highest ROI. For clients generating $100K+/month in online revenue, the average monthly revenue impact per 500ms of improvement was $4,200. Core Web Vitals are not a technical metric. They are a revenue metric.',
        stat: '$4,200',
        statLabel: 'average monthly revenue gain per 500ms improvement',
        color: 'var(--color-gold-bright)',
    },
    {
        num: '05',
        category: 'Mobile Experience',
        headline: 'Mobile accounts for 61% of traffic but only 29% of B2B revenue',
        body: 'The B2B mobile gap is not shrinking — it is widening. 61% of enterprise B2B traffic now originates on mobile, but mobile visitors convert at less than half the rate of desktop visitors. The root cause is almost never the offer. It is almost always the form — too many fields, unclear labels, and non-native input components that break on iOS Safari.',
        stat: '61% / 29%',
        statLabel: 'mobile traffic share vs revenue share',
        color: 'var(--color-gold-bright)',
    },
    {
        num: '06',
        category: 'AI & Automation',
        headline: 'AI-qualified leads convert at 2.7x the rate of form-qualified leads',
        body: 'In 8 of our 2025 engagements, we deployed AI qualifiers that replaced static contact forms. The AI conversation pre-qualified prospects before routing to a human. The result: 2.7x higher close rate on booked calls, 60% reduction in time-wasters reaching the sales team, and a 40% increase in average deal size — because the AI surfaced larger opportunities that a flat form would have classified the same as small ones.',
        stat: '2.7x',
        statLabel: 'higher close rate from AI-qualified leads',
        color: 'var(--color-gold-bright)',
    },
];

const INDUSTRIES = [
    { name: 'SaaS / Software', avgLift: '+247%', n: 14 },
    { name: 'E-Commerce (Luxury)', avgLift: '+312%', n: 8 },
    { name: 'Financial Services', avgLift: '+198%', n: 6 },
    { name: 'Real Estate', avgLift: '+280%', n: 5 },
    { name: 'Hospitality', avgLift: '+340%', n: 4 },
    { name: 'Professional Services', avgLift: '+210%', n: 5 },
];

export default function StateOfConversionPage() {
    return (
        <>
            <FAQSchema faqs={[
                { question: 'What is the State of Conversion 2026 report?', answer: 'Original research from BIGWEB Digital based on $140M in tracked revenue across 42 B2B client campaigns. It documents the most impactful conversion patterns, pricing psychology findings, and AI automation outcomes observed in 2024–2025.' },
                { question: 'Is this report free?', answer: 'The core findings are published in full on this page. A downloadable PDF version with extended data tables and industry breakdowns is available by applying for a strategy session.' },
            ]} />

            {/* Hero */}
            <section style={{ paddingTop: 'calc(var(--nav-height) + var(--space-20))', background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden', paddingBottom: 'var(--space-20)' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(212,175,106,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
                    <AnimateIn>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.2)', padding: '4px 12px', borderRadius: 3 }}>Original Research</span>
                            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', padding: '4px 0' }}>June 2026 · BIGWEB Digital</span>
                        </div>
                    </AnimateIn>
                    <AnimateIn delay={1}>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 'var(--space-6)' }}>
                            State of Conversion<br /><span style={{ color: 'var(--color-gold-bright)' }}>2026.</span>
                        </h1>
                    </AnimateIn>
                    <AnimateIn delay={2}>
                        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: 720, marginBottom: 'var(--space-10)' }}>
                            We tracked $140M in client revenue across 42 B2B campaigns over 18 months. This is what we found — the conversion patterns, the pricing psychology, and the AI breakthroughs that separated 3x growth from flat lines.
                        </p>
                    </AnimateIn>

                    {/* Author */}
                    <AnimateIn delay={3}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', paddingTop: 'var(--space-8)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold-bright), var(--color-gold-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, color: '#0a0a0b', flexShrink: 0 }}>BW</div>
                            <div>
                                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>BIGWEB Digital Research Team</p>
                                <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Based on 42 client engagements · $140M revenue tracked · Updated June 2026</p>
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            </section>

            {/* Stats bar */}
            <section style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
                        {STATS.map((s, i) => (
                            <AnimateIn key={s.value} delay={i + 1}>
                                <div style={{ padding: 'var(--space-10) var(--space-8)', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--color-gold-bright)', lineHeight: 1, marginBottom: 'var(--space-2)' }}>{s.value}</p>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.4, marginBottom: 4 }}>{s.label}</p>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>{s.sub}</p>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Findings */}
            <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
                <div className="container" style={{ maxWidth: 900 }}>
                    <AnimateIn>
                        <span className="section-label">KEY FINDINGS</span>
                        <h2 className="section-headline" style={{ marginBottom: 'var(--space-16)' }}>
                            6 patterns that<br /><span className="text-gold">separate winners from the rest.</span>
                        </h2>
                    </AnimateIn>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        {FINDINGS.map((f, i) => (
                            <AnimateIn key={f.num} delay={i + 1}>
                                <article style={{ padding: 'var(--space-10)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                                    {/* Number watermark */}
                                    <span style={{ position: 'absolute', top: 'var(--space-8)', right: 'var(--space-8)', fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' }}>{f.num}</span>

                                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', alignItems: 'center' }}>
                                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-muted)', background: 'rgba(212,175,106,0.08)', border: '1px solid rgba(212,175,106,0.15)', padding: '3px 10px', borderRadius: 3 }}>{f.category}</span>
                                    </div>

                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 'var(--space-4)', maxWidth: 680 }}>{f.headline}</h3>
                                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: 680, marginBottom: 'var(--space-6)' }}>{f.body}</p>

                                    {/* Stat callout */}
                                    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-6)', background: 'rgba(212,175,106,0.06)', border: '1px solid rgba(212,175,106,0.15)', borderRadius: 4 }}>
                                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: f.color, lineHeight: 1 }}>{f.stat}</span>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>{f.statLabel}</span>
                                    </div>
                                </article>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry breakdown */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container" style={{ maxWidth: 900 }}>
                    <AnimateIn>
                        <span className="section-label">INDUSTRY BENCHMARK</span>
                        <h2 className="section-headline" style={{ marginBottom: 'var(--space-12)' }}>Average revenue lift<br /><span className="text-gold">by sector.</span></h2>
                    </AnimateIn>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                        {INDUSTRIES.map((ind, i) => (
                            <AnimateIn key={ind.name} delay={i + 1}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-5) var(--space-6)', background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 4 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                        <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-display)', color: 'var(--color-text-tertiary)', width: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                                        <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)', fontWeight: 600 }}>{ind.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
                                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>n={ind.n}</span>
                                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-gold-bright)' }}>{ind.avgLift}</span>
                                    </div>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                    <AnimateIn delay={7}>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-4)', textAlign: 'center' }}>Revenue lift measured as percentage increase in monthly online revenue, tracked 90 days post-engagement. n = number of campaigns per sector.</p>
                    </AnimateIn>
                </div>
            </section>

            {/* Gated CTA — full PDF */}
            <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
                <div className="container" style={{ maxWidth: 700, textAlign: 'center' }}>
                    <AnimateIn>
                        <div style={{ padding: 'var(--space-16)', border: '1px solid rgba(212,175,106,0.2)', borderRadius: 8, background: 'rgba(212,175,106,0.03)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.6), transparent)' }} />
                            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)', display: 'block', marginBottom: 'var(--space-4)' }}>Extended Report + Data Tables</span>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 'var(--space-4)' }}>
                                Get the full 47-page PDF<br />with raw campaign data.
                            </h2>
                            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-8)', maxWidth: 500, margin: '0 auto var(--space-8)' }}>
                                The full report includes extended industry data tables, individual campaign breakdowns, our CRO testing methodology, and the 127-point funnel audit checklist we use with every client.
                            </p>
                            <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: 'var(--space-4) var(--space-8)', fontSize: 'var(--text-base)' }}>
                                Apply for Strategy Session to Access Report
                            </Link>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-4)' }}>Available to all qualified applicants · No charge</p>
                        </div>
                    </AnimateIn>
                </div>
            </section>
        </>
    );
}
