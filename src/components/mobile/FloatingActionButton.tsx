'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageCircle, Phone, Mail, X } from 'lucide-react'
import Link from 'next/link'

export default function FloatingActionButton() {
    const [isOpen, setIsOpen] = useState(false)

    const actions = [
        { icon: MessageCircle, label: 'Chat', href: '/contact', color: 'bg-blue-500' },
        { icon: Phone, label: 'Call', href: 'tel:+1234567890', color: 'bg-green-500' },
        { icon: Mail, label: 'Email', href: 'mailto:hello@bigweb.com', color: 'bg-purple-500' },
    ]

    return (
        <div className="fixed bottom-24 right-6 z-40 md:hidden">
            <AnimatePresence>
                {isOpen && (
                    <div className="absolute bottom-16 right-0 flex flex-col items-end gap-4 mb-2">
                        {actions.map((action, index) => (
                            <motion.div
                                key={action.label}
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <span className="bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm shadow-lg">
                                    {action.label}
                                </span>
                                <Link href={action.href}>
                                    <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center text-white shadow-lg hover:brightness-110 transition-all`}>
                                        <action.icon className="w-5 h-5" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-accent/30 transition-colors ${isOpen ? 'bg-destructive' : 'bg-accent'
                    }`}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
            >
                <Plus className="w-8 h-8" />
            </motion.button>
        </div>
    )
}
