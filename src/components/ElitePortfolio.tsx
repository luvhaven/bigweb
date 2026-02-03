'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowUpRight, Filter, Loader2, GitBranch, Binary } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import HoverCard3D from '@/components/ui/HoverCard3D'
import { useTouchDevice } from '@/hooks/useTouchDevice'
import { projectsAPI } from '@/lib/api/projects'
import { PhysicsReveal } from '@/components/ui/PhysicsReveal'

gsap.registerPlugin(ScrollTrigger)

// Fallback mock data for when database is not set up
// Fallback mock data for when database is not set up
const MOCK_PROJECTS = [
  {
    id: 'velocity-engine',
    slug: 'velocity-engine',
    title: 'Velocity Engine: Fintech Infrastructure',
    category: 'Fintech',
    description: 'Re-engineered the core transaction flow for sub-second settlement. Reduced friction nodes by 64%.',
    results: '64% Higher Completion',
    image_url: '/images/projects/vortex-pay.png',
    image: '/images/projects/vortex-pay.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'saas-conversion-core',
    slug: 'saas-conversion-core',
    title: 'SaaS Conversion Core',
    category: 'SaaS',
    description: 'A psychological pricing architecture designed to anchor high-value plans and reduce decision fatigue.',
    results: '+127% Enterprise Upgrades',
    image_url: '/images/projects/nexus-flow.png',
    image: '/images/projects/nexus-flow.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'checkout-recovery-sys',
    slug: 'checkout-recovery-sys',
    title: 'Checkout Recovery System',
    category: 'E-commerce',
    description: 'Automated retention loops and trust-injection UI that captures 40% of abandoned high-ticket carts.',
    results: '$4.2M Revenue Recovered',
    image_url: '/images/projects/aura-wear.png',
    image: '/images/projects/aura-wear.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'logistics-command',
    slug: 'logistics-command',
    title: 'Logistics Command Interface',
    category: 'Logistics',
    description: 'Real-time telemetry dashboard for global supply chains. Reduced support ticket volume by 3x.',
    results: '3x Efficiency Gain',
    image_url: '/images/projects/antro-logistics.png',
    image: '/images/projects/antro-logistics.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'trust-signal-platform',
    slug: 'trust-signal-platform',
    title: 'Institutional Trust Platform',
    category: 'Finance',
    description: 'High-authority digital presence for asset management. Positioned to capture institutional liquidity.',
    results: '3.5x Lead Quality',
    image_url: '/images/projects/vanguard-capital.png',
    image: '/images/projects/vanguard-capital.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'data-viz-suite',
    slug: 'data-viz-suite',
    title: 'Predictive Data Suite',
    category: 'AI / Data',
    description: 'Turning raw data lakes into executive-level actionable intelligence dashboards.',
    results: '400% Pipeline Growth',
    image_url: '/images/projects/aether-insights.png',
    image: '/images/projects/aether-insights.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'luxury-scale-arch',
    slug: 'luxury-scale-arch',
    title: 'Luxury Scale Architecture',
    category: 'Luxury Retail',
    description: 'Immersive, visually-dominant commerce experience that scaled a boutique brand to 8-figures.',
    results: 'Scaled to $10M ARR',
    image_url: '/images/projects/elevate-commerce.png',
    image: '/images/projects/elevate-commerce.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'infra-sales-accelerator',
    slug: 'infra-sales-accelerator',
    title: 'Infra Sales Accelerator',
    category: 'Cloud / Infra',
    description: 'Simplified complex cloud topology into digestible value propositions for non-technical buyers.',
    results: '-60% Sales Cycle Time',
    image_url: '/images/projects/sky-pulse.png',
    image: '/images/projects/sky-pulse.png',
    created_at: new Date().toISOString()
  }
]

const PROJECTS_PER_PAGE = 9

// Project Card Component
interface ProjectCardProps {
  project: any
  index: number
  isTouch: boolean
}

// Enhanced Project Card with 3D Tilt and Glow
const ProjectCard = ({ project, index, isTouch }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isHovered = useInView(ref)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isTouch) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = ((y - centerY) / centerY) * -10 // Max 10 deg rotation
    const rotateYValue = ((x - centerX) / centerX) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      <motion.div
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-[600px] bg-black border border-zinc-900 overflow-hidden cursor-crosshair group transition-all duration-500 hover:border-orange-500/50"
      >
        <Link href={`/case-studies/${project.slug || project.id}`}>
          {/* Image Container with Physics Reveal */}
          <div className="absolute inset-0 overflow-hidden">
            <PhysicsReveal
              className="w-full h-full"
              revealSize={300}
              dampening={30}
              cover={
                <div className="relative w-full h-full">
                  {/* Image Overlay Gradient - Subtle by default to show image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-100 group-hover:from-black/90 group-hover:via-black/20 transition-all duration-500" />

                  {(() => {
                    const imageSource = project.image_url || project.image || project.hero_image_url ||
                      (typeof project.images === 'string' && project.images.startsWith('[') ? JSON.parse(project.images)[0] : project.images);

                    if (imageSource) {
                      return (
                        <img
                          src={imageSource}
                          alt={project.name || project.title || 'Case Study'}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          loading="eager"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200';
                          }}
                        />
                      )
                    }
                    return (
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
                        alt="Architecture Visualization"
                        className="w-full h-full object-cover grayscale opacity-30"
                      />
                    )
                  })()}
                </div>
              }
            >
              {/* REVEALED CONTENT (Thermal/Data View) */}
              <div className="relative w-full h-full bg-black">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:10px_10px] opacity-[0.2] z-20 pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 bg-green-500/10 mix-blend-color-dodge z-20 pointer-events-none" />

                {(() => {
                  const imageSource = project.image_url || project.image || project.hero_image_url ||
                    (typeof project.images === 'string' && project.images.startsWith('[') ? JSON.parse(project.images)[0] : project.images);

                  if (imageSource) {
                    return (
                      <img
                        src={imageSource}
                        alt="Thermal View"
                        className="w-full h-full object-cover contrast-[1.5] brightness-[1.2] grayscale invert filter sepia-[.5] hue-rotate-[90deg]"
                      />
                    )
                  }
                  return null;
                })()}

                {/* Data Overlays */}
                <div className="absolute top-4 left-4 z-30 font-mono text-[9px] text-green-500 font-bold tracking-widest bg-black/50 px-2 py-1 border border-green-500/30">
                  RAW_DATA_STREAM
                </div>
                <div className="absolute bottom-4 right-4 z-30 font-mono text-[9px] text-green-500 font-bold tracking-widest bg-black/50 px-2 py-1 border border-green-500/30 animate-pulse">
                  ENCRYPTED
                </div>
              </div>
            </PhysicsReveal>
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
            <div className="relative z-30 flex flex-col">
              {/* Mandatory Info (Always Visible) */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block px-3 py-1 border border-orange-500/30 bg-orange-600/10 text-orange-500 text-[9px] font-mono font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                  / Sector_{project.category}
                </span>
              </div>

              <h3 className="text-3xl font-black text-white mb-2 group-hover:text-orange-500 transition-colors duration-300 tracking-tighter uppercase leading-[0.9] italic">
                {project.title}
              </h3>

              {/* Revealable Info (Hidden by Default) */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 mb-6 group-hover:text-white transition-colors duration-300 line-clamp-2 text-sm leading-relaxed mt-2 font-mono">
                    // {project.description}
                </p>

                {project.results && (
                  <div className="mb-6 p-4 bg-zinc-950 border border-zinc-900 transition-colors group-hover:border-zinc-800">
                    <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] mb-1">Impact_Result</div>
                    <div className="text-2xl font-black text-white italic tracking-tighter">{project.results}</div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-[0.2em] group/btn">
                  <span className="relative overflow-hidden">
                    VIEW ARCHIVE / 0{index + 1}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-orange-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

// Main Component
interface ElitePortfolioProps {
  title?: string
  showViewAll?: boolean
  initialProjects?: any[]
  initialCategories?: string[]
}

const ElitePortfolio = ({
  title = "Results & Revenue Generated",
  showViewAll = false,
  initialProjects = [],
  initialCategories = ['All']
}: ElitePortfolioProps) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleProjects, setVisibleProjects] = useState<any[]>(initialProjects.slice(0, PROJECTS_PER_PAGE))
  const [allProjects, setAllProjects] = useState<any[]>(initialProjects)
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const isTouch = useTouchDevice()

  // Sync with props if they change
  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      // Direct comparison to avoid loop if parent re-renders with same data
      setAllProjects(prev => (JSON.stringify(prev) === JSON.stringify(initialProjects) ? prev : initialProjects))
      setVisibleProjects(prev => {
        const sliced = initialProjects.slice(0, PROJECTS_PER_PAGE)
        return JSON.stringify(prev) === JSON.stringify(sliced) ? prev : sliced
      })
    }
    if (initialCategories && initialCategories.length > 1) { // Only sync if we have more than just 'All'
      setCategories(prev => (JSON.stringify(prev) === JSON.stringify(initialCategories) ? prev : initialCategories))
    }
  }, [initialProjects, initialCategories])

  // Fetch from DB if no initial projects provided
  useEffect(() => {
    const fetchDBProjects = async () => {
      // Only fetch if we don't have projects and none were passed in
      if (initialProjects.length === 0 && allProjects.length === 0) {
        setIsLoading(true);
        try {
          // Priority: Database
          const dbProjects = await projectsAPI.getAll();

          if (dbProjects && dbProjects.length > 0) {
            setAllProjects(dbProjects);
            setVisibleProjects(dbProjects.slice(0, PROJECTS_PER_PAGE));

            // Dynamically generate categories from DB projects
            const dbCategories = ['All', ...new Set(dbProjects.map((p: any) => p.category || 'Case Study'))];
            setCategories(dbCategories as string[]);
          } else {
            // Fallback: Mock Data if DB is empty or fails
            console.log('[ElitePortfolio] No database entries found, falling back to mock systems.');
            setAllProjects(MOCK_PROJECTS);
            setVisibleProjects(MOCK_PROJECTS.slice(0, PROJECTS_PER_PAGE));
          }
        } catch (err) {
          console.error('[ElitePortfolio] Critical Fetch Failure:', err);
          // Safety Fallback
          setAllProjects(MOCK_PROJECTS);
          setVisibleProjects(MOCK_PROJECTS.slice(0, PROJECTS_PER_PAGE));
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDBProjects();
  }, [initialProjects]); // Run once or when initialProjects changes to empty
  // Filter logic based on category
  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory)

  // Update visible projects when category changes
  useEffect(() => {
    setVisibleProjects(filteredProjects.slice(0, PROJECTS_PER_PAGE))
    setPage(1)
  }, [activeCategory, allProjects])

  // Infinite Scroll Logic
  const loadMore = () => {
    if (isLoading || visibleProjects.length >= filteredProjects.length) return
    setIsLoading(true)

    // Simulate network delay
    setTimeout(() => {
      const nextPage = page + 1
      const newProjects = filteredProjects.slice(0, nextPage * PROJECTS_PER_PAGE)
      setVisibleProjects(newProjects)
      setPage(nextPage)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section id="evidence" className="py-24 bg-black relative overflow-hidden border-t border-zinc-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.03] pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12 border-l-4 border-orange-600 pl-12">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-10"
            >
              <GitBranch className="w-4 h-4" /> Execution_Logs_v8
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-[8rem] font-black mb-10 tracking-tighter uppercase italic leading-[0.75] text-white"
            >
              The <br /><span className="text-zinc-800">Archive.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-2xl md:text-4xl max-w-4xl font-medium leading-[1.1] tracking-tight"
            >
              Clinical execution logs. We deploy engines that have generated over <span className="text-white italic underline decoration-orange-600 underline-offset-8">$50M+</span> for our clients.
            </motion.p>
          </div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-1"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 text-[10px] font-mono font-black uppercase tracking-[0.4em] transition-all duration-500 ${activeCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-950 text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900 border border-zinc-900'
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-2 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <div key={project.id} className="break-inside-avoid mb-8">
                <ProjectCard
                  project={project}
                  index={index}
                  isTouch={isTouch}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More / Infinite Scroll Trigger */}
        {visibleProjects.length < filteredProjects.length && (
          <div className="mt-16 flex justify-center">
            <Button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-zinc-950 border border-zinc-900 text-white font-black text-sm uppercase tracking-[0.4em] px-12 h-20 rounded-none hover:bg-white hover:text-black transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                  PROCESSING...
                </>
              ) : (
                'INITIALIZE_DATA_PULL'
              )}
            </Button>
          </div>
        )}
        {showViewAll && (
          <div className="mt-20 flex justify-center">
            <Link href="/case-studies">
              <Button className="bg-orange-600 hover:bg-orange-500 text-white font-black text-sm px-12 h-24 rounded-none uppercase tracking-[0.5em] transition-all duration-300">
                OPEN_FULL_LABORATORY_ARCHIVE
                <ArrowUpRight className="ml-4 w-6 h-6" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section >
  )
}
export default ElitePortfolio
