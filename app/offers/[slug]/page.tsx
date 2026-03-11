import { getEngagementBySlug } from '@/actions/cms'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import CinematicHero from '@/components/CinematicHero'
import FAQSection from '@/components/FAQSection'
import FinalCTA from '@/components/FinalCTA'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const offer = await getEngagementBySlug(slug)

    if (!offer) {
        notFound()
    }

    const features = typeof offer.features === 'string' ? JSON.parse(offer.features) : (offer.features || [])

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-accent/20">
            <AdvancedNavigation />

            <CinematicHero
                title={
                    <>
                        <span className="hero-line block">{offer.name}</span>
                        <span className="hero-line block text-zinc-600">
                            <em className="text-accent italic">{offer.tagline || 'Strategic Package'}</em>
                        </span>
                    </>
                }
                subtitle={offer.description}
                ctaText="Start This Engagement"
                ctaLink={`/contact?plan=${offer.slug}`}
                showSecondaryCta={false}
            />

            <section className="py-24 border-t border-white/[0.04]">
                <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-4 block">
                                The Investment
                            </span>
                            <h2 className="text-5xl font-display tracking-tight text-white mb-2">
                                {offer.price}
                            </h2>
                            <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider mb-8">
                                {offer.price_subtext}
                            </p>

                            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
                                Built for aggressive ROI. We deploy elite architecture to solve your toughest digital challenges and drive hard revenue growth.
                            </p>

                            <Link
                                href={`/contact?plan=${offer.slug}`}
                                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
                            >
                                Secure Your Slot
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 lg:p-12">
                            <h3 className="text-lg font-bold text-white mb-6 tracking-tight">What's Included</h3>
                            <ul className="space-y-4">
                                {features.map((feature: any, idx: number) => {
                                    const text = typeof feature === 'string' ? feature : feature.title
                                    return (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                            <span className="text-zinc-300 leading-relaxed text-sm md:text-base">{text}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection category="pricing" />

            <div className="border-t border-white/[0.04]">
                <FinalCTA />
            </div>

            <Footer />
        </main>
    )
}
