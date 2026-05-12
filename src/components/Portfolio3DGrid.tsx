'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Award } from 'lucide-react'

const projects = [
  {
    title: 'Quantum Labs',
    category: 'Research Platform',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=90',
    award: 'Awwwards SOTD',
  },
  {
    title: 'Velocity Fitness',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=90',
    award: 'FWA Mobile',
  },
  {
    title: 'Orbit Travel',
    category: 'Tourism',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=90',
    award: 'CSS Design Awards',
  },
  {
    title: 'Syntax Studio',
    category: 'Developer Tools',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=90',
    award: 'Awwwards Nominee',
  },
  {
    title: 'EcoVerse',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=90',
    award: 'The FWA',
  },
  {
    title: 'Nexus Gaming',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=90',
    award: 'Site of the Month',
  },
]

interface CardProps {
  project: typeof projects[0]
  index: number
}

function Card3D({ project, index }: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg'])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </motion.div>

      {/* Award Badge */}
      <motion.div
        className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1"
        style={{ transform: 'translateZ(50px)' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Award className="w-3 h-3" />
        {project.award}
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end" style={{ transform: 'translateZ(30px)' }}>
        <motion.div
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-accent text-sm font-medium mb-2">{project.category}</div>
          <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
          
          <motion.button
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -20,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm font-medium">View Project</span>
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered 
            ? '0 20px 60px -15px rgba(245, 85, 39, 0.5)' 
            : '0 0 0 rgba(245, 85, 39, 0)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function Portfolio3DGrid() {
  return (
    <section className="py-32 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Award-Winning <span className="text-accent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognized by the industry's most prestigious design awards
          </p>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project, index) => (
            <Card3D key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
