'use client'

import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

interface MobileDrawerProps {
    isOpen: boolean
    onClose: () => void
    menuItems: { name: string; path: string }[]
}

export default function MobileDrawer({ isOpen, onClose, menuItems }: MobileDrawerProps) {
    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={{ left: 0.05, right: 1 }}
                        onDragEnd={handleDragEnd}
                        className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-background border-l border-border z-[70] md:hidden shadow-2xl"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <span className="text-xl font-bold gradient-text">Menu</span>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                                {menuItems.map((item, index) => (
                                    <Link key={item.path} href={item.path} onClick={onClose}>
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/5 active:bg-accent/10 transition-colors group"
                                        >
                                            <span className="text-lg font-medium group-hover:text-accent transition-colors">
                                                {item.name}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                                        </motion.div>
                                    </Link>
                                ))}

                                <div className="mt-8 p-4 bg-accent/5 rounded-2xl border border-accent/10">
                                    <h4 className="text-sm font-semibold text-accent mb-2">Need a project?</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Let's discuss how we can help you grow your business.
                                    </p>
                                    <Link href="/contact" onClick={onClose}>
                                        <button className="w-full py-3 bg-accent text-white rounded-xl font-medium shadow-lg shadow-accent/20 active:scale-95 transition-all">
                                            Get Started
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-border bg-muted/20">
                                <p className="text-xs text-center text-muted-foreground">
                                    Swipe right to close
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
