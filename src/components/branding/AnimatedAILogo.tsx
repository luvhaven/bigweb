import { motion, Variants } from 'framer-motion';
import React from 'react';

interface AnimatedAILogoProps {
    isProcessing?: boolean;
    size?: number;
    color?: string;
    className?: string;
}

export default function AnimatedAILogo({
    isProcessing = false,
    size = 24,
    color = 'var(--color-gold-bright)',
    className = '',
}: AnimatedAILogoProps) {
    // We construct a 2x2 grid of cubes (HTML divs instead of SVG to allow premium CSS depth)
    const containerVariants: Variants = {
        idle: {
            rotate: 0,
            transition: {
                duration: 12,
                ease: "linear",
                repeat: Infinity,
            },
        },
        processing: {
            rotate: [0, 90, 180, 270, 360],
            transition: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
    };

    const cubeVariants = (index: number): Variants => ({
        idle: {
            scale: [1, 0.9, 1],
            opacity: [0.9, 1, 0.9],
            borderRadius: ['2px', '5px', '2px'],
            boxShadow: [
                '0 4px 10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)',
                '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                '0 4px 10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)'
            ],
            transition: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index * 0.4,
            },
        },
        processing: {
            scale: [1, 1.4, 0.6, 1],
            opacity: [1, 0.7, 1, 1],
            borderRadius: ['2px', '8px', '2px', '2px'],
            x: [0, index === 0 || index === 2 ? 5 : -5, 0],
            y: [0, index === 0 || index === 1 ? 5 : -5, 0],
            boxShadow: [
                '0 4px 10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)',
                '0 12px 24px rgba(0,0,0,0.8), inset 0 1px 3px rgba(255,255,255,0.4)',
                '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
                '0 4px 10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)'
            ],
            transition: {
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index * 0.15,
            },
        },
    });

    const cubeSize = size * 0.38;
    const gap = size * 0.12;
    const totalInnerSize = (cubeSize * 2) + gap;
    const offset = (size - totalInnerSize) / 2;

    const positions = [
        { x: offset, y: offset },
        { x: offset + cubeSize + gap, y: offset },
        { x: offset, y: offset + cubeSize + gap },
        { x: offset + cubeSize + gap, y: offset + cubeSize + gap },
    ];

    return (
        <motion.div
            className={className}
            style={{
                position: 'relative',
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: isProcessing ? 'drop-shadow(0 0 12px rgba(212,175,106,0.3))' : 'drop-shadow(0 0 4px rgba(212,175,106,0.1))',
            }}
            variants={containerVariants}
            initial="idle"
            animate={isProcessing ? 'processing' : 'idle'}
        >
            {positions.map((pos, i) => (
                <motion.div
                    key={i}
                    variants={cubeVariants(i)}
                    style={{
                        position: 'absolute',
                        left: pos.x,
                        top: pos.y,
                        width: cubeSize,
                        height: cubeSize,
                        background: color,
                        originX: 0.5,
                        originY: 0.5,
                    }}
                />
            ))}
        </motion.div>
    );
}
