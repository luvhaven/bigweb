'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show on homepage
  if (pathname === '/') return null

  const pathSegments = pathname.split('/').filter(Boolean)
  
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...pathSegments.map((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/')
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      return { name, path }
    })
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="container mx-auto px-6 py-4"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-foreground font-medium flex items-center gap-1"
              >
                {index === 0 && <Home className="w-4 h-4" />}
                {crumb.name}
              </motion.span>
            ) : (
              <Link href={crumb.path}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-muted-foreground hover:text-accent transition-colors cursor-pointer flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  {crumb.name}
                </motion.span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  )
}
