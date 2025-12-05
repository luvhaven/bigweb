'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface UrgencyTimerProps {
    deadline: Date
    label?: string
}

export default function UrgencyTimer({ deadline, label = "Offer ends in:" }: UrgencyTimerProps) {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = deadline.getTime() - now

            if (distance < 0) {
                clearInterval(interval)
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
            } else {
                setTimeLeft({
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                })
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [deadline])

    return (
        <div className="inline-flex items-center gap-4 bg-accent/10 border border-accent/20 px-6 py-3 rounded-full">
            <div className="flex items-center gap-2 text-accent font-medium">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="text-sm uppercase tracking-wide">{label}</span>
            </div>
            <div className="flex gap-2 font-mono font-bold text-lg">
                <TimeUnit value={timeLeft.hours} label="H" />
                <span>:</span>
                <TimeUnit value={timeLeft.minutes} label="M" />
                <span>:</span>
                <TimeUnit value={timeLeft.seconds} label="S" />
            </div>
        </div>
    )
}

function TimeUnit({ value, label }: { value: number, label: string }) {
    return (
        <div className="flex flex-col items-center leading-none">
            <motion.span
                key={value}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="block"
            >
                {value.toString().padStart(2, '0')}
            </motion.span>
        </div>
    )
}
