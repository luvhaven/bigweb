'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Maximize2, Minimize2, X, Command, Share2, Copy } from 'lucide-react'

// Enhanced sample code with more realistic structure
const sampleCode = `import { Premium } from '@bigweb/ui'
import { useFuture } from '@ai/hooks'

export default function DigitalExperience() {
  const { isReady } = useFuture()
  
  if (!isReady) return <Loading />

  return (
    <Premium.Layout 
      variant="ultra-modern"
      animations="fluid-physics"
    >
      <Hero 
        title="Next Gen Web"
        gradient="aurora-borealis"
      />
      
      <InteractiveGrid 
        cols={3}
        gap="2rem"
        glassMorph={true}
      >
        {/* Dynamic content injection */}
        <Feature.Smart />
        <Feature.Fast />
        <Feature.Secure />
      </InteractiveGrid>
    </Premium.Layout>
  )
}`

export default function WebDevTerminal() {
    const [displayText, setDisplayText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [activeTab, setActiveTab] = useState('page.tsx')

    useEffect(() => {
        let currentIndex = 0
        let timeoutId: NodeJS.Timeout

        const typeChar = () => {
            if (currentIndex < sampleCode.length) {
                setDisplayText(sampleCode.slice(0, currentIndex + 1))
                currentIndex++
                // More realistic typing rhythm
                const speed = Math.random() * 20 + 10
                timeoutId = setTimeout(typeChar, speed)
                setIsTyping(true)
            } else {
                setIsTyping(false)
                setTimeout(() => {
                    currentIndex = 0
                    setDisplayText('')
                    typeChar()
                }, 8000)
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeChar()
                observer.disconnect()
            }
        }, { threshold: 0.5 })

        const element = document.getElementById('terminal-trigger')
        if (element) observer.observe(element)

        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <div id="terminal-trigger" className="relative w-full max-w-2xl mx-auto">
            {/* Abstract Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-20 animate-pulse" />

            {/* Terminal Window */}
            <div className="relative bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm leading-6">
                {/* macOS Style Header */}
                <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 group">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] group-hover:bg-[#ff5f56]/80 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] group-hover:bg-[#ffbd2e]/80 transition-colors" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f] group-hover:bg-[#27c93f]/80 transition-colors" />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-[#0d1117] p-1 rounded-lg border border-white/5 text-xs">
                        {['page.tsx', 'styles.css', 'api.ts'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 rounded-md transition-all ${activeTab === tab
                                        ? 'bg-white/10 text-white shadow-sm'
                                        : 'text-white/40 hover:text-white/60'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3 text-white/20">
                        <Command size={14} />
                        <Share2 size={14} />
                    </div>
                </div>

                {/* Code Content */}
                <div className="p-6 overflow-hidden relative min-h-[400px]">
                    <div className="flex">
                        {/* Line Numbers */}
                        <div className="flex flex-col text-right pr-4 select-none text-white/20 text-xs leading-6 border-r border-white/5 mr-4 font-mono">
                            {Array.from({ length: 18 }).map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>

                        {/* Code Display */}
                        <div className="flex-1 font-mono text-[13px] relative z-10">
                            {displayText.split('\n').map((line, i) => (
                                <div key={i} className="min-h-[1.5rem] whitespace-pre-wrap">
                                    <HighlightCode line={line} />
                                </div>
                            ))}
                            {isTyping && (
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-2 h-4 bg-blue-500 ml-1 align-middle"
                                />
                            )}
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#161b22] border-t border-white/5 mt-auto flex items-center px-4 justify-between text-[10px] text-white/40 select-none">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span>TSX</span>
                            </div>
                            <span>UTF-8</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>Ln {displayText.split('\n').length}, Col {displayText.split('\n').pop()?.length || 0}</span>
                            <Copy size={10} className="hover:text-white cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Simple syntax highlighting component
const HighlightCode = ({ line }: { line: string }) => {
    // Very basic regex-based highlighting
    const parts = line.split(/(\s+|[{}()<>=.,;:'"`])/)

    return (
        <>
            {parts.map((part, i) => {
                let color = 'text-white/90' // Default

                if (/^(import|export|default|return|const|if|function)$/.test(part)) color = 'text-pink-400'
                else if (/^(from |true|false|null|undefined)$/.test(part)) color = 'text-blue-400'
                else if (/^[A-Z][a-zA-Z]*$/.test(part)) color = 'text-yellow-300' // Class/Component
                else if (/^'.*'$/.test(part) || /^".*"$/.test(part)) color = 'text-green-400' // Strings
                else if (/^<.*>$/.test(part) || /^<\/.*>$/.test(part)) color = 'text-blue-300' // JSX tags (imperfect)
                else if (/^[a-z]+(?=\()/.test(part)) color = 'text-purple-400' // Functions calls

                return <span key={i} className={color}>{part}</span>
            })}
        </>
    )
}
