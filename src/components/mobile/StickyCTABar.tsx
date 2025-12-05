'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function StickyCTABar() {
    const { scrollY } = useScroll()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsVisible(latest > 300)
        })
    }, [scrollY])

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: isVisible ? 0 : 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-[70px] left-4 right-4 z-40 md:hidden"
        >
            <div className="bg-background/80 backdrop-blur-xl border border-accent/20 rounded-2xl p-3 shadow-2xl flex gap-3">
                <Link href="/contact" className="flex-1">
                    <Button className="w-full bg-accent hover:bg-accent-dark text-white rounded-xl shadow-glow">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
                <Link href="tel:+1234567890">
                    <Button variant="outline" size="icon" className="rounded-xl border-accent/20 bg-accent/5 text-accent">
                        <Phone className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
        </motion.div>
    )
}
