'use client'

import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { ExternalLink, Award, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const featuredProjects = [
  {
    id: 1,
    title: 'Neural Commerce',
    category: 'E-Commerce AI',
    description: 'AI-powered shopping platform with 300% conversion increase',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&q=90',
    color: '#F55527',
    metrics: { conversion: '+300%', revenue: '$2.4M', users: '1M+' },
    tags: ['AI', 'E-Commerce', 'Machine Learning']
  },
  {
    id: 2,
    title: 'FinTech Nexus',
    category: 'Financial Platform',
    description: 'Real-time trading platform processing 10M transactions daily',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=90',
    color: '#9333EA',
    metrics: { transactions: '10M/day', uptime: '99.99%', latency: '<50ms' },
    tags: ['FinTech', 'Real-time', 'Security']
  },
  {
    id: 3,
    title: 'HealthTech Portal',
    category: 'Healthcare SaaS',
    description: 'HIPAA-compliant telemedicine platform serving 500K patients',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=90',
    color: '#06B6D4',
    metrics: { patients: '500K+', appointments: '2M+', satisfaction: '4.9/5' },
    tags: ['Healthcare', 'HIPAA', 'Telemedicine']
  },
  {
    id: 4,
    title: 'Smart Logistics',
    category: 'Supply Chain',
    description: 'IoT-powered logistics platform optimizing global delivery',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=90',
    color: '#10B981',
    metrics: { efficiency: '+85%', savings: '$12M', tracking: '99.9%' },
    tags: ['IoT', 'Logistics', 'Optimization']
  }
]

export default function PortfolioInteractive() {
  const [activeProject, setActiveProject] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-cycle through projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentProject = featuredProjects[activeProject]

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${currentProject.color}20, transparent 50%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 mb-6">
            <Award className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Crafting Digital <span className="text-accent">Masterpieces</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Award-winning projects that push the boundaries of web innovation
          </p>
        </motion.div>

        {/* Interactive Project Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Project Image */}
          <motion.div 
            className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
            style={{ scale, rotate }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img 
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-500 flex items-center justify-center"
                  whileHover={{ scale: 1 }}
                >
                  <Button 
                    size="lg"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    View Case Study
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Metrics */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-4">
              {Object.entries(currentProject.metrics).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-1 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10"
                >
                  <div className="text-2xl font-bold text-accent">{value}</div>
                  <div className="text-xs text-white/70 uppercase">{key}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Project Details */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-accent text-sm font-medium uppercase tracking-wider mb-4">
                  {currentProject.category}
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-6">
                  {currentProject.title}
                </h3>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {currentProject.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <Link href={`/project/${currentProject.id}`}>
                  <Button size="lg" className="group">
                    Explore Project
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="flex justify-center gap-4">
          {featuredProjects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => setActiveProject(index)}
              className={`group relative ${
                index === activeProject ? 'w-16' : 'w-12'
              } h-12 rounded-full transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  index === activeProject 
                    ? 'bg-accent' 
                    : 'bg-muted hover:bg-accent/50'
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {index + 1}
              </div>
              
              {/* Progress indicator */}
              {index === activeProject && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
