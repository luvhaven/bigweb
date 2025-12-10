'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
    {
        text: "Review 1: Enhanced conversion rates by 200% in just 3 months.",
        author: "Sarah J., CEO",
        rating: 5
    },
    {
        text: "Review 2: The best agency experience we've ever had. Truly professional.",
        author: "Mike T., CTO",
        rating: 5
    },
    {
        text: "Review 3: Incredible attention to detail and premium design quality.",
        author: "Jessica R., Marketing Director",
        rating: 5
    },
    {
        text: "Review 4: Their code quality is unmatched. Seamless integration.",
        author: "David L., Lead Dev",
        rating: 5
    },
    {
        text: "Review 5: Transformed our brand identity completely.",
        author: "Emily W., Founder",
        rating: 5
    },
    {
        text: "Review 6: ROI was positive within weeks of launch.",
        author: "James K., VP Sales",
        rating: 5
    }
]

export default function TestimonialTicker() {
    return (
        <div className="w-full py-6 bg-background/50 border-y border-border/50 overflow-hidden relative backdrop-blur-sm">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex">
                <motion.div
                    className="flex gap-12 whitespace-nowrap pl-4"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex text-orange-500">
                                {[...Array(t.rating)].map((_, starsIndex) => (
                                    <Star key={starsIndex} className="w-3 h-3 fill-current" />
                                ))}
                            </div>
                            <span className="font-medium text-foreground">&quot;{t.text}&quot;</span>
                            <span className="opacity-60">— {t.author}</span>
                            <div className="w-1 h-1 rounded-full bg-border" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
