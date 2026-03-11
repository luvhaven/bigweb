import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { getProjects } from '@/actions/portfolio'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import CinematicHero from '@/components/CinematicHero'
import StickyCTABar from '@/components/mobile/StickyCTABar'

export const revalidate = 3600

export default async function ResultsIndexPage() {
    const projects = await getProjects()

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-accent/20">
            <AdvancedNavigation />

            <CinematicHero
                title={
                    <>
                        <span className="hero-line block">Our Track Record</span>
                        <span className="hero-line block text-zinc-600">
                            in <em className="text-accent italic">Hard Numbers.</em>
                        </span>
                    </>
                }
                subtitle="We don't sell deliverables. We engineer digital systems designed explicitly for revenue capture and market dominance. Review our latest outcomes."
                ctaText="Start Your Project"
                showSecondaryCta={false}
            />

            <section className="py-24 relative overflow-hidden bg-white/[0.01]">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => {
                            // Safely parse JSON results
                            const parsedResults = typeof project.results === 'string'
                                ? JSON.parse(project.results)
                                : (project.results || [])

                            // Extract the primary metric
                            const primaryResult = parsedResults?.[0]

                            return (
                                <Link
                                    key={project.id}
                                    href={`/results/${project.slug}`}
                                    className="group relative flex flex-col p-8 md:p-12 rounded-[2rem] border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-700 h-full"
                                >
                                    {/* Subdued Glow Focus */}
                                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[60px] translate-x-10 group-hover:translate-x-0 transition-transform duration-1000" />
                                    </div>

                                    {/* Top Bar: Category & Client */}
                                    <div className="flex justify-between items-start mb-16 relative z-10">
                                        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]">
                                            <span className="text-accent">{project.client}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                            <span className="text-zinc-500">{project.category}</span>
                                        </div>
                                        <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-500">
                                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </div>
                                    </div>

                                    {/* Primary Result Focus */}
                                    <div className="mb-12 relative z-10">
                                        {primaryResult ? (
                                            <>
                                                <div className="text-6xl md:text-8xl font-display text-white mb-4 tracking-tight group-hover:scale-[1.02] origin-left transition-transform duration-700">
                                                    {primaryResult.value}
                                                </div>
                                                <div className="text-xs sm:text-sm font-mono uppercase tracking-[0.15em] text-zinc-400">
                                                    {primaryResult.label}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="h-24 md:h-32 flex items-end">
                                                <span className="text-2xl font-display text-zinc-600">Case Study</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="mt-auto relative z-10">
                                        <h3 className="text-2xl font-display text-white mb-3 leading-snug">
                                            {project.title}
                                        </h3>
                                        {project.description && (
                                            <p className="text-base text-zinc-500 line-clamp-2 leading-relaxed">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <Footer />
            <StickyCTABar />
        </main>
    )
}
