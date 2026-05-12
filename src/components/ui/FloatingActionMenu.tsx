'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Accessibility, ArrowUp, X, Plus } from 'lucide-react'
import ChatWidget from '@/components/ui/ChatWidget'
import AccessibilityPanel from '@/components/ui/AccessibilityPanel'

export default function FloatingActionMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [activePanel, setActivePanel] = useState<'chat' | 'accessibility' | null>(null)

    const actions = [
        {
            id: 'chat',
            icon: MessageCircle,
            label: 'Chat with us',
            color: 'bg-blue-500 hover:bg-blue-600',
            action: () => setActivePanel(activePanel === 'chat' ? null : 'chat')
        },
        {
            id: 'accessibility',
            icon: Accessibility,
            label: 'Accessibility',
            color: 'bg-purple-500 hover:bg-purple-600',
            action: () => setActivePanel(activePanel === 'accessibility' ? null : 'accessibility')
        },
        {
            id: 'scroll-top',
            icon: ArrowUp,
            label: 'Back to top',
            color: 'bg-green-500 hover:bg-green-600',
            action: () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setIsOpen(false)
            }
        }
    ]

    return (
        <>
            {/* Main FAB - Mobile Optimization: Larger touch targets */}
            <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2"
                        >
                            {actions.map((action, index) => (
                                <motion.button
                                    key={action.id}
                                    initial={{ opacity: 0, y: 20, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: { delay: index * 0.05 }
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 20,
                                        scale: 0,
                                        transition: { delay: (actions.length - index - 1) * 0.05 }
                                    }}
                                    onClick={action.action}
                                    className={`group relative w-12 h-12 rounded-full ${action.color} text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
                                    aria-label={action.label}
                                >
                                    <action.icon className="w-5 h-5" />

                                    {/* Tooltip */}
                                    <span className="absolute right-14 bg-background text-foreground px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-border shadow-lg">
                                        {action.label}
                                    </span>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        setIsOpen(!isOpen)
                        if (navigator.vibrate) navigator.vibrate(5);
                        if (isOpen) setActivePanel(null)
                    }}
                    className={`w-14 h-14 rounded-full shadow-glow flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-accent hover:bg-accent-dark'
                        } text-white`}
                    aria-label={isOpen ? 'Close menu' : 'Open quick actions'}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Plus className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Panels */}
            <AnimatePresence>
                {activePanel === 'chat' && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed bottom-24 right-6 z-40"
                    >
                        <ChatWidget isEmbedded onClose={() => setActivePanel(null)} />
                    </motion.div>
                )}

                {activePanel === 'accessibility' && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed bottom-24 right-6 z-40"
                    >
                        <AccessibilityPanel isEmbedded onClose={() => setActivePanel(null)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
