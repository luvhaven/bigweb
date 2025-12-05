'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Type, Contrast, Minimize2, Accessibility, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AccessibilityPanelProps {
    isEmbedded?: boolean
    onClose?: () => void
}

export default function AccessibilityPanel({ isEmbedded = false, onClose }: AccessibilityPanelProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [fontSize, setFontSize] = useState(100)
    const [highContrast, setHighContrast] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [dyslexiaFont, setDyslexiaFont] = useState(false)

    useEffect(() => {
        // Apply font size
        document.documentElement.style.fontSize = `${fontSize}%`
    }, [fontSize])

    useEffect(() => {
        // Apply high contrast
        if (highContrast) {
            document.documentElement.classList.add('high-contrast')
        } else {
            document.documentElement.classList.remove('high-contrast')
        }
    }, [highContrast])

    useEffect(() => {
        // Apply reduced motion
        if (reducedMotion) {
            document.documentElement.style.setProperty('--motion-reduce', '1')
        } else {
            document.documentElement.style.setProperty('--motion-reduce', '0')
        }
    }, [reducedMotion])

    useEffect(() => {
        // Apply dyslexia font
        if (dyslexiaFont) {
            document.documentElement.classList.add('dyslexia-font')
        } else {
            document.documentElement.classList.remove('dyslexia-font')
        }
    }, [dyslexiaFont])

    useEffect(() => {
        if (isEmbedded) {
            setIsOpen(true)
        }
    }, [isEmbedded])

    const handleClose = () => {
        if (isEmbedded && onClose) {
            onClose()
        } else {
            setIsOpen(false)
        }
    }

    // For embedded mode, return only the panel
    if (isEmbedded) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="w-80 bg-background border border-border rounded-2xl shadow-2xl p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Accessibility className="w-5 h-5" />
                        Accessibility
                    </h3>
                    <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Font Size */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                            <Type className="w-4 h-4" />
                            Font Size: {fontSize}%
                        </label>
                        <input
                            type="range"
                            min="80"
                            max="150"
                            step="10"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Smaller</span>
                            <span>Larger</span>
                        </div>
                    </div>

                    {/* High Contrast */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm font-medium">
                            <Contrast className="w-4 h-4" />
                            High Contrast
                        </label>
                        <button
                            onClick={() => setHighContrast(!highContrast)}
                            className={`w-12 h-6 rounded-full transition-colors ${highContrast ? 'bg-accent' : 'bg-secondary'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                        </button>
                    </div>

                    {/* Reduced Motion */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm font-medium">
                            <Settings className="w-4 h-4" />
                            Reduce Motion
                        </label>
                        <button
                            onClick={() => setReducedMotion(!reducedMotion)}
                            className={`w-12 h-6 rounded-full transition-colors ${reducedMotion ? 'bg-accent' : 'bg-secondary'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${reducedMotion ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                        </button>
                    </div>

                    {/* Dyslexia Font */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm font-medium">
                            <Type className="w-4 h-4" />
                            Dyslexia Font
                        </label>
                        <button
                            onClick={() => setDyslexiaFont(!dyslexiaFont)}
                            className={`w-12 h-6 rounded-full transition-colors ${dyslexiaFont ? 'bg-accent' : 'bg-secondary'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${dyslexiaFont ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                        </button>
                    </div>

                    {/* Reset Button */}
                    <Button
                        onClick={() => {
                            setFontSize(100)
                            setHighContrast(false)
                            setReducedMotion(false)
                            setDyslexiaFont(false)
                        }}
                        variant="outline"
                        className="w-full"
                    >
                        Reset to Defaults
                    </Button>
                </div>
            </motion.div>
        )
    }

    // Standard floating widget
    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-xl bg-accent text-white shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] flex items-center justify-center overflow-hidden group border border-white/10"
                aria-label="Accessibility Options"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Accessibility className="w-6 h-6 relative z-10 drop-shadow-md" />
            </motion.button>

            {/* Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-40 right-6 z-40 w-80 bg-background/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.5)] p-6 overflow-hidden"
                    >
                        {/* Glass reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    <Accessibility className="w-5 h-5 text-accent" />
                                    Accessibility
                                </h3>
                                <button
                                    onClick={handleClose}
                                    className="w-8 h-8 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors"
                                >
                                    <Minimize2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Font Size */}
                                <div className="bg-secondary/20 rounded-2xl p-4 border border-white/5">
                                    <label className="flex items-center gap-2 text-sm font-medium mb-3">
                                        <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400">
                                            <Type className="w-4 h-4" />
                                        </div>
                                        Font Size: {fontSize}%
                                    </label>
                                    <div className="px-2">
                                        <input
                                            type="range"
                                            min="80"
                                            max="150"
                                            step="10"
                                            value={fontSize}
                                            onChange={(e) => setFontSize(Number(e.target.value))}
                                            className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-lg"
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-medium uppercase tracking-wider">
                                        <span>Smaller</span>
                                        <span>Larger</span>
                                    </div>
                                </div>

                                {/* Toggles Grid */}
                                <div className="grid gap-3">
                                    {/* High Contrast */}
                                    <div className="flex items-center justify-between bg-secondary/20 rounded-2xl p-4 border border-white/5">
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <div className="p-1.5 bg-purple-500/20 rounded-lg text-purple-400">
                                                <Contrast className="w-4 h-4" />
                                            </div>
                                            High Contrast
                                        </label>
                                        <button
                                            onClick={() => setHighContrast(!highContrast)}
                                            className={`w-11 h-6 rounded-full transition-colors duration-300 ${highContrast ? 'bg-accent' : 'bg-secondary'}`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${highContrast ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                        </button>
                                    </div>

                                    {/* Reduced Motion */}
                                    <div className="flex items-center justify-between bg-secondary/20 rounded-2xl p-4 border border-white/5">
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <div className="p-1.5 bg-green-500/20 rounded-lg text-green-400">
                                                <Settings className="w-4 h-4" />
                                            </div>
                                            Reduce Motion
                                        </label>
                                        <button
                                            onClick={() => setReducedMotion(!reducedMotion)}
                                            className={`w-11 h-6 rounded-full transition-colors duration-300 ${reducedMotion ? 'bg-accent' : 'bg-secondary'}`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${reducedMotion ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                        </button>
                                    </div>

                                    {/* Dyslexia Font */}
                                    <div className="flex items-center justify-between bg-secondary/20 rounded-2xl p-4 border border-white/5">
                                        <label className="flex items-center gap-2 text-sm font-medium">
                                            <div className="p-1.5 bg-orange-500/20 rounded-lg text-orange-400">
                                                <Type className="w-4 h-4" />
                                            </div>
                                            Dyslexia Font
                                        </label>
                                        <button
                                            onClick={() => setDyslexiaFont(!dyslexiaFont)}
                                            className={`w-11 h-6 rounded-full transition-colors duration-300 ${dyslexiaFont ? 'bg-accent' : 'bg-secondary'}`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${dyslexiaFont ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Reset Button */}
                                <Button
                                    onClick={() => {
                                        setFontSize(100)
                                        setHighContrast(false)
                                        setReducedMotion(false)
                                        setDyslexiaFont(false)
                                    }}
                                    variant="ghost"
                                    className="w-full text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                >
                                    Reset to Defaults
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
