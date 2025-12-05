'use client'

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
                 focus:px-6 focus:py-3 focus:bg-accent focus:text-white focus:rounded-lg 
                 focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                 transition-all duration-200"
    >
      Skip to main content
    </a>
  )
}
