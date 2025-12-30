'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CountdownTimerProps {
    targetDate: Date
    className?: string
    size?: 'sm' | 'md' | 'lg'
}

export default function CountdownTimer({ targetDate, className = '', size = 'lg' }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const target = targetDate.getTime()
            const difference = target - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        calculateTimeLeft()
        const interval = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(interval)
    }, [targetDate])

    if (!mounted) return null

    const sizeClasses = {
        sm: 'text-xl md:text-2xl',
        md: 'text-3xl md:text-4xl',
        lg: 'text-4xl md:text-6xl'
    }

    const labelSizes = {
        sm: 'text-[10px]',
        md: 'text-xs',
        lg: 'text-sm'
    }

    const TimeBlock = ({ value, label }: { value: number, label: string }) => (
        <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <div className="relative">
                <div className={`${sizeClasses[size]} font-bold tabular-nums bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent`}>
                    {String(value).padStart(2, '0')}
                </div>
                <motion.div
                    key={value}
                    initial={{ scale: 1.2, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 ${sizeClasses[size]} font-bold text-white/30`}
                >
                    {String(value).padStart(2, '0')}
                </motion.div>
            </div>
            <span className={`${labelSizes[size]} uppercase tracking-wider text-white/50 mt-1`}>
                {label}
            </span>
        </motion.div>
    )

    return (
        <div className={`flex items-center justify-center gap-3 md:gap-6 ${className}`}>
            <TimeBlock value={timeLeft.days} label="Days" />
            <span className={`${sizeClasses[size]} text-white/30 font-light`}>:</span>
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <span className={`${sizeClasses[size]} text-white/30 font-light`}>:</span>
            <TimeBlock value={timeLeft.minutes} label="Mins" />
            <span className={`${sizeClasses[size]} text-white/30 font-light`}>:</span>
            <TimeBlock value={timeLeft.seconds} label="Secs" />
        </div>
    )
}
