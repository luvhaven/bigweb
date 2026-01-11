'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Filter, Loader2 } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import HoverCard3D from '@/components/ui/HoverCard3D'
import { useTouchDevice } from '@/hooks/useTouchDevice'
import { projectsAPI } from '@/lib/api/projects'

gsap.registerPlugin(ScrollTrigger)

// Fallback mock data for when database is not set up
const MOCK_PROJECTS = [
  {
    id: 'nexus-flow-saas',
    slug: 'saas-trial-conversion',
    title: 'Nexus Flow: The 127% SaaS Funnel Re-Engineering',
    offer: 'Revenue Website System',
    category: 'SaaS',
    description: 'A complete architectural rebuild of a multi-tenant analytics platform. Eliminated cognitive friction in the pricing matrix and streamlined path-to-upgrade.',
    results: '+127% Conversion Lift',
    image_url: '/images/projects/nexus-flow.png',
    image: '/images/projects/nexus-flow.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'aura-wear-ecommerce',
    slug: 'ecommerce-cart-fix',
    title: 'Aura Wear Global: Surgical Checkout Recovery',
    offer: 'Fix Sprint',
    category: 'E-commerce',
    description: 'Transforming a high-abandonment mobile checkout into a high-trust conversion engine. Reduced friction points by 60% through surgical UI optimization.',
    results: '40% Revenue Recovery',
    image_url: '/images/projects/aura-wear.png',
    image: '/images/projects/aura-wear.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'vanguard-capital-leads',
    slug: 'lead-gen-optimization',
    title: 'Vanguard Capital: 3.5x Authority Lead-Gen System',
    offer: 'Conversion Diagnostic',
    category: 'Finance',
    description: 'Building institutional trust through strategic typography and intent-based lead captures. Identified and fixed critical messaging-to-market gaps.',
    results: '350% Quality Lead Growth',
    image_url: '/images/projects/vanguard-capital.png',
    image: '/images/projects/vanguard-capital.png',
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
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouch) return
    const rect = cardRef.current.getBoundingClientRect()
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
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
        className="relative h-[500px] rounded-2xl overflow-hidden glass border-0 cursor-pointer shadow-luxury transition-all duration-500 group-hover:shadow-[0_0_50px_-10px_rgba(var(--accent),0.4)]"
      >
        <Link href={`/case-studies/${project.slug || project.id}`}>
          {/* Image Container */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Image Overlay Gradient - Subtle by default to show image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-100 group-hover:from-black/90 group-hover:via-black/20 transition-all duration-500" />

            {project.image_url || project.image || project.hero_image_url ? (
              <img
                src={project.image_url || project.image || project.hero_image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200'}
                alt={project.name || project.title || 'Case Study'}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200';
                }}
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
                alt="Case Study Placeholder"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
            <div className="relative z-30 flex flex-col">
              {/* Mandatory Info (Always Visible) */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-accent/20">
                  {project.category}
                </span>
              </div>

              <h3 className="text-3xl font-black text-white mb-2 group-hover:text-accent transition-colors duration-300 tracking-tighter uppercase leading-[0.9]">
                {project.title}
              </h3>

              {/* Revealable Info (Hidden by Default) */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 mb-6 group-hover:text-white transition-colors duration-300 line-clamp-2 text-sm leading-relaxed mt-2">
                  {project.description}
                </p>

                {project.results && (
                  <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="text-[10px] text-accent uppercase font-black tracking-[0.3em] mb-1">Impact Result</div>
                    <div className="text-xl font-black text-white">{project.results}</div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-[0.2em] group/btn">
                  <span className="relative overflow-hidden">
                    Open Case Study
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-accent" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hover Border Glow - REMOVED as per user request for "coming out" feel */}
          {/* <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl border-2 border-accent/50 shadow-glow" />
          </div> */}
        </Link>
      </motion.div>
    </motion.div>
  )
}

// Main Component
interface ElitePortfolioProps {
  title?: string
}

const ElitePortfolio = ({ title = "Selected Works" }: ElitePortfolioProps) => {
  // Initialize with MOCK_DATA to prevent "Empty" flash or failure
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleProjects, setVisibleProjects] = useState<any[]>(MOCK_PROJECTS.slice(0, PROJECTS_PER_PAGE))
  const [allProjects, setAllProjects] = useState<any[]>(MOCK_PROJECTS)
  const [categories, setCategories] = useState<string[]>(['All', 'SaaS', 'E-commerce', 'Finance', 'Fintech', 'AI'])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const isTouch = useTouchDevice()

  // Load projects from database (Enhancement, not dependency)
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await projectsAPI.getAll()

      if (data && data.length > 0) {
        // Map dynamic data to hyperrealistic local assets if slugs or titles match
        const mappedData = data.map((p: any) => {
          const searchStr = `${p.slug || ''} ${p.title || ''} ${p.name || ''} ${p.category || ''} ${p.client || ''}`.toLowerCase();
          let img = '';

          if (searchStr.includes('vanguard') || searchStr.includes('capital') || searchStr.includes('lead-gen') || searchStr.includes('finance')) {
            img = '/images/projects/vanguard-capital.png';
          } else if (searchStr.includes('nexus') || searchStr.includes('saas') || searchStr.includes('flow')) {
            img = '/images/projects/nexus-flow.png';
          } else if (searchStr.includes('aura') || searchStr.includes('ecommerce') || searchStr.includes('wear') || searchStr.includes('orbit')) {
            img = '/images/projects/aura-wear.png';
          }

          // New Hyperrealistic Name Mapping for Alpha/Beta/Gamma etc.
          const title = (p.title || p.name || '').toLowerCase();
          let newTitle = p.title || p.name;
          let newSlug = p.slug || p.id;

          if (title.includes('alpha') || title.includes('vortex') || title.includes('nexus') || title.includes('saas')) {
            newTitle = title.includes('vortex') ? "Vortex Pay: The Fintech Funnel Re-Engineering" : "Nexus Flow: The 127% SaaS Funnel Re-Engineering";
            newSlug = 'saas-trial-conversion';
          } else if (title.includes('beta') || title.includes('orbit') || title.includes('aura') || title.includes('ecommerce')) {
            newTitle = title.includes('orbit') ? "Orbit Market: Surgical Checkout Recovery" : "Aura Wear Global: Surgical Checkout Recovery";
            newSlug = 'ecommerce-cart-fix';
          } else if (title.includes('gamma') || title.includes('aether') || title.includes('insights')) {
            newTitle = "Aether Insights: AI Revenue Engine";
            // If we don't have a specific slug for Aether, we can fallback or add one later
          } else if (title.includes('delta') || title.includes('sky') || title.includes('vanguard') || title.includes('lead-gen') || title.includes('finance')) {
            newTitle = title.includes('sky') ? "Sky Pulse: Cloud Infrastructure Scale" : "Vanguard Capital: 3.5x Authority Lead-Gen System";
            newSlug = 'lead-gen-optimization';
          } else if (title.includes('epsilon') || title.includes('nexus logistics')) {
            newTitle = "Nexus Logistics: Fulfillment Conversion Fix";
          } else if (title.includes('zeta') || title.includes('prism')) {
            newTitle = "Prism Identity: Authority Branding Loop";
          }

          if (img || newSlug !== (p.slug || p.id)) {
            return {
              ...p,
              title: newTitle,
              slug: newSlug,
              image_url: img || p.image_url,
              image: img || p.image,
              hero_image_url: img || p.hero_image_url,
              thumbnail_url: img || p.thumbnail_url
            };
          }
          return { ...p, title: newTitle };
        });

        setAllProjects(mappedData)
        setVisibleProjects(mappedData.slice(0, PROJECTS_PER_PAGE))

        // Extract unique categories from projects
        const uniqueCategories = ['All', ...new Set(mappedData
          .map((p: any) => {
            if (p.tags && Array.isArray(p.tags) && p.tags.length > 0) return p.tags
            return p.category
          })
          .flat()
          .filter(Boolean))] as string[]

        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.warn('Database fetch failed, keeping mock data:', error)
    } finally {
      setIsLoading(false)
    }
  }
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
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-xl"
            >
              A showcase of our most ambitious projects, pushing the boundaries of design and technology.
            </motion.p>
          </div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`magnetic-wrap group relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${activeCategory === category
                  ? 'bg-accent text-white shadow-glow'
                  : 'bg-accent/5 text-muted-foreground hover:bg-accent/10 hover:text-foreground'
                  }`}
              >
                <span className="relative z-10">{category}</span>
                {activeCategory !== category && (
                  <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                )}
                <div className="magnetic-area absolute inset-[-50%]" />
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
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-accent/20 hover:border-accent hover:bg-accent/5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Projects'
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
export default ElitePortfolio
