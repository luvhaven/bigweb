import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { getBlogPosts } from '@/actions/blog'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import CinematicHero from '@/components/CinematicHero'
import StickyCTABar from '@/components/mobile/StickyCTABar'

export const revalidate = 3600

export default async function BlogIndexPage() {
  const posts = await getBlogPosts()

  const featuredPost = posts.find(p => p.is_published) // Or a specific featured flag if added
  const recentPosts = posts.filter(p => p.id !== featuredPost?.id)

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-accent/20">
      <AdvancedNavigation />

      <CinematicHero
        title={
          <>
            <span className="hero-line block">Engineering Minds.</span>
            <span className="hero-line block text-zinc-600">
              Digital <em className="text-accent italic">Almanac.</em>
            </span>
          </>
        }
        subtitle="Deep-dive essays, technical teardowns, and strategic playbooks from the engineers building the internet's highest-converting systems."
        ctaText="Read Latest"
        showSecondaryCta={false}
      />

      <section className="py-24 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-24">
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500 mb-8">Latest Insight</h2>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block relative rounded-[2rem] border border-white/[0.04] bg-white/[0.02] overflow-hidden hover:border-white/[0.1] transition-colors duration-700"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-square lg:aspect-auto bg-zinc-900 border-b lg:border-b-0 lg:border-r border-white/[0.04] relative overflow-hidden">
                    {featuredPost.cover_image && (
                      <img
                        src={featuredPost.cover_image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                    )}
                  </div>
                  <div className="p-10 md:p-16 flex flex-col justify-center relative">
                    {/* Subdued Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: 'radial-gradient(400px circle at right center, rgba(255,107,53,0.05), transparent 70%)' }}
                    />

                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8 relative z-10">
                      <span>{featuredPost.category}</span>
                      {featuredPost.read_time && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-zinc-700" />
                          <span>{featuredPost.read_time} min read</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display leading-[1.1] mb-6 relative z-10">
                      {featuredPost.title}
                    </h3>
                    {featuredPost.content && (
                      <p className="text-lg text-zinc-400 leading-relaxed mb-10 line-clamp-3 relative z-10">
                        {/* Super basic strip HTML for excerpt if needed, or use a proper excerpt field */}
                        {featuredPost.excerpt || featuredPost.content.replace(/<[^>]+>/g, '')}
                      </p>
                    )}
                    <div className="inline-flex items-center gap-3 text-accent font-semibold tracking-wide relative z-10">
                      Read Article
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid */}
          {recentPosts.length > 0 && (
            <div>
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500 mb-8">The Archive</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group relative flex flex-col p-8 rounded-[2rem] border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-700 h-[420px]"
                  >
                    <div className="flex justify-between items-start mb-auto">
                      <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                        <span>{post.category}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-500">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-2xl font-display text-white mb-4 leading-snug group-hover:text-accent transition-colors duration-500">
                        {post.title}
                      </h3>
                      <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed">
                        {post.excerpt || post.content?.replace(/<[^>]+>/g, '')}
                      </p>
                    </div>

                    {post.read_time && (
                      <div className="mt-8 pt-6 border-t border-white/[0.05] text-[10px] font-mono tracking-widest uppercase text-zinc-600">
                        {post.read_time} min read
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <StickyCTABar />
    </main>
  )
}
