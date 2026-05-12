'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion'
import { X } from 'lucide-react'

interface BottomSheetProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
}

export default function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
    const controls = useAnimation()
    // const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            controls.start('visible')
        } else {
            document.body.style.overflow = 'unset'
            controls.start('hidden')
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen, controls])

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose()
        } else {
            controls.start('visible')
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
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
                        aria-hidden="true"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        exit="hidden"
                        variants={{
                            hidden: { y: '100%' },
                            visible: { y: 0 }
                        }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.05}
                        onDragEnd={handleDragEnd}
                        className="fixed bottom-0 left-0 right-0 z-[101] bg-card border-t border-border rounded-t-3xl shadow-2xl md:hidden max-h-[90vh] flex flex-col"
                    >
                        {/* Handle */}
                        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                            <div className="w-12 h-1.5 bg-muted rounded-full" />
                        </div>

                        {/* Header */}
                        {title && (
                            <div className="px-6 py-2 flex items-center justify-between border-b border-border/50">
                                <h3 className="font-semibold text-lg">{title}</h3>
                                <button onClick={onClose} className="p-2 hover:bg-muted/50 rounded-full">
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 pb-12">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
