'use client'

import { motion } from 'framer-motion'

export function CardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="space-y-4">
        <motion.div
          className="h-48 bg-gradient-to-r from-secondary via-secondary/50 to-secondary rounded-lg"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
        <div className="space-y-3">
          <motion.div
            className="h-6 bg-gradient-to-r from-secondary via-secondary/50 to-secondary rounded w-3/4"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.1,
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          />
          <motion.div
            className="h-4 bg-gradient-to-r from-secondary via-secondary/50 to-secondary rounded w-full"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.2,
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          />
          <motion.div
            className="h-4 bg-gradient-to-r from-secondary via-secondary/50 to-secondary rounded w-5/6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.3,
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function TextSkeleton({ lines = 3, width = 'full' }: { lines?: number, width?: 'full' | '3/4' | '1/2' }) {
  const widthClasses = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className={`h-4 bg-gradient-to-r from-secondary via-secondary/50 to-secondary rounded ${widthClasses[width]}`}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.1,
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      ))}
    </div>
  )
}

export function AvatarSkeleton() {
  return (
    <motion.div
      className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary via-secondary/50 to-secondary"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 100%',
      }}
    />
  )
}

export function ButtonSkeleton() {
  return (
    <motion.div
      className="h-12 bg-gradient-to-r from-secondary via-secondary/50 to-secondary rounded-lg w-32"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 100%',
      }}
    />
  )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}
