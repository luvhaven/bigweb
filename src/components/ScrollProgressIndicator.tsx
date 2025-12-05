'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setScrollProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-orange-500 to-accent origin-left z-[9999] transition-transform duration-100"
      style={{ transform: `scaleX(${scrollProgress / 100})` }}
    />
  )
}
