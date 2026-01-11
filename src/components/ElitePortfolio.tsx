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
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

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
            <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-accent/20">
                  {project.category}
                </span>
                {project.offer && (
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                    {project.offer}
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6 group-hover:text-white transition-colors duration-300 line-clamp-2">
                {project.description}
              </p>

              {project.results && (
                <div className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/20 backdrop-blur-sm">
                  <div className="text-xs text-accent uppercase font-bold tracking-widest mb-1">Impact Result</div>
                  <div className="text-2xl font-black text-white">{project.results}</div>
                </div>
              )}

              <div className="flex items-center gap-2 text-white font-medium group/btn">
                <span className="relative overflow-hidden">
                  View Project
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                </span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-accent" />
              </div>
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
          } else if (searchStr.includes('aura') || searchStr.includes('ecommerce') || searchStr.includes('wear')) {
            img = '/images/projects/aura-wear.png';
          }

          if (img) {
            return {
              ...p,
              image_url: img,
              image: img,
              hero_image_url: img,
              thumbnail_url: img
            };
          }
          return p;
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
