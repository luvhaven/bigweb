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
    id: 'techcorp-platform',
    name: 'TechCorp Enterprise Platform',
    title: 'TechCorp Enterprise Platform',
    category: 'SaaS',
    description: 'Cloud-based collaboration platform for enterprise teams',
    image_url: '/artifacts/techcorp_platform_dashboard_1764589013521.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'finpay-wallet',
    name: 'FinPay Digital Wallet',
    title: 'FinPay Digital Wallet',
    category: 'Fintech',
    description: 'Secure mobile payment solution with cryptocurrency integration',
    image_url: '/artifacts/finpay_wallet_app_1764589030619.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'healthtrack-app',
    name: 'HealthTrack Pro',
    title: 'HealthTrack Pro',
    category: 'Healthcare',
    description: 'AI-powered health monitoring platform',
    image_url: '/artifacts/healthtrack_dashboard_1764589047595.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'luxury-fashion',
    name: 'Luxury Fashion Store',
    title: 'Luxury Fashion Store',
    category: 'E-Commerce',
    description: 'Premium e-commerce experience with AR try-on',
    image_url: '/artifacts/luxury_fashion_ecommerce_1764589064929.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'ai-content-studio',
    name: 'AI Content Studio',
    title: 'AI Content Studio',
    category: 'AI',
    description: 'Next-generation content creation platform',
    image_url: '/artifacts/ai_content_studio_1764589081328.png',
    created_at: new Date().toISOString()
  },
  {
    id: 'crypto-exchange',
    name: 'CryptoVault Exchange',
    title: 'CryptoVault Exchange',
    category: 'Fintech',
    description: 'Institutional-grade cryptocurrency trading platform',
    image_url: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80',
    created_at: new Date().toISOString()
  },
  {
    id: 'ecosmart-home',
    name: 'EcoSmart Home',
    title: 'EcoSmart Home',
    category: 'IoT',
    description: 'Smart home automation app for energy efficiency',
    image_url: 'https://images.unsplash.com/photo-1585503416928-3268c01275e6?w=800&q=80',
    created_at: new Date().toISOString()
  },
  {
    id: 'urban-eats',
    name: 'Urban Eats',
    title: 'Urban Eats',
    category: 'Mobile App',
    description: 'Hyper-local food delivery experience',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    created_at: new Date().toISOString()
  },
  {
    id: 'neon-realty',
    name: 'Neon Realty',
    title: 'Neon Realty',
    category: 'Real Estate',
    description: 'Immersive 3D real estate browsing platform',
    image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
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
        <Link href={`/portfolio/${project.id}`}>
          {/* Image Container */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.name || project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
            <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium mb-3 backdrop-blur-md border border-accent/20">
                {project.category}
              </span>
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                {project.description}
              </p>

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
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleProjects, setVisibleProjects] = useState<any[]>([])
  const [allProjects, setAllProjects] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const isTouch = useTouchDevice()

  // Load projects from database
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    // Temporarily force use of mock data to ensure images show
    setAllProjects(MOCK_PROJECTS)
    setVisibleProjects(MOCK_PROJECTS.slice(0, PROJECTS_PER_PAGE))
    setCategories(['All', 'SaaS', 'Fintech', 'Healthcare', 'E-Commerce', 'AI'])

    /* Database loading commented out for debugging
    try {
      const data = await projectsAPI.getAll()
      // Use mock data if database is empty or unavailable
      if (!data || data.length === 0) {
        setAllProjects(MOCK_PROJECTS)
        setVisibleProjects(MOCK_PROJECTS.slice(0, PROJECTS_PER_PAGE))
        setCategories(['All', 'SaaS', 'Fintech', 'Healthcare', 'E-Commerce', 'AI'])
      } else {
        setAllProjects(data)
        setVisibleProjects(data.slice(0, PROJECTS_PER_PAGE))
        
        // Extract unique categories from projects
        const uniqueCategories = ['All', ...new Set(data
          .map((p: any) => p.category)
          .filter(Boolean))]
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.warn('Database not available, using mock data:', error)
      // Use mock data as fallback
      setAllProjects(MOCK_PROJECTS)
      setVisibleProjects(MOCK_PROJECTS.slice(0, PROJECTS_PER_PAGE))
      setCategories(['All', 'SaaS', 'Fintech', 'Healthcare', 'E-Commerce', 'AI'])
    }
    */
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

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isTouch={isTouch}
              />
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
