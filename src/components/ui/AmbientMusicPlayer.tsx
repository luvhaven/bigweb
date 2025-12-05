'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Volume2, VolumeX, Pause, Play, Sparkles, X } from 'lucide-react'

export default function AmbientMusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.3) // Start at 30% volume for better UX
    const [isMuted, setIsMuted] = useState(false)
    const [showControls, setShowControls] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    // Enhanced visualizer with more bars
    const [bars, setBars] = useState<number[]>(Array(20).fill(0))

    // Auto-play on first user interaction
    useEffect(() => {
        const startAudio = async () => {
            if (!hasInteracted && audioRef.current && isLoaded) {
                try {
                    audioRef.current.volume = volume
                    await audioRef.current.play()
                    setIsPlaying(true)
                    setHasInteracted(true)
                } catch (err) {
                    console.log('Autoplay prevented, waiting for user interaction')
                }
            }
        }

        // Try to autoplay after a short delay
        const timer = setTimeout(startAudio, 1000)
        return () => clearTimeout(timer)
    }, [isLoaded, hasInteracted, volume])

    // Handle first click anywhere on the page to start music
    useEffect(() => {
        const handleFirstInteraction = async () => {
            if (!hasInteracted && audioRef.current && isLoaded) {
                try {
                    audioRef.current.volume = volume
                    await audioRef.current.play()
                    setIsPlaying(true)
                    setHasInteracted(true)
                } catch (err) {
                    console.error('Failed to start audio:', err)
                }
            }
        }

        document.addEventListener('click', handleFirstInteraction, { once: true })
        return () => document.removeEventListener('click', handleFirstInteraction)
    }, [hasInteracted, isLoaded, volume])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume

            const handleCanPlay = () => {
                setIsLoaded(true)
                if (audioRef.current) audioRef.current.volume = volume
            }
            const handleError = (e: Event) => {
                console.error('Audio loading error:', e)
                setIsLoaded(false)
            }

            audioRef.current.addEventListener('canplay', handleCanPlay)
            audioRef.current.addEventListener('error', handleError)

            return () => {
                audioRef.current?.removeEventListener('canplay', handleCanPlay)
                audioRef.current?.removeEventListener('error', handleError)
            }
        }
    }, [volume])

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setBars(Array(20).fill(0).map(() => 20 + Math.random() * 80))
            }, 100)
            return () => clearInterval(interval)
        } else {
            setBars(Array(20).fill(20))
        }
    }, [isPlaying])

    const togglePlay = async () => {
        if (audioRef.current) {
            try {
                if (isPlaying) {
                    audioRef.current.pause()
                    setIsPlaying(false)
                } else {
                    audioRef.current.volume = volume
                    await audioRef.current.play()
                    setIsPlaying(true)
                    setHasInteracted(true)
                }
            } catch (err) {
                console.error('Audio play failed:', err)
            }
        }
    }

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
            if (newVolume > 0 && isMuted) {
                setIsMuted(false)
                audioRef.current.muted = false
            }
        }
    }

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                loop
                src="/ambient.mp3"
                crossOrigin="anonymous"
                playsInline
                preload="auto"
                onCanPlay={() => setIsLoaded(true)}
                onError={(e) => {
                    console.error('Audio playback error', e)
                    const target = e.target as HTMLAudioElement
                    console.error('Audio error code:', target.error?.code)
                    console.error('Audio error message:', target.error?.message)
                    setIsLoaded(false)
                }}
            />

            {/* Floating Music Button - Shows Play/Pause State */}
            <div className="fixed bottom-24 left-6 z-50">
                <AnimatePresence>
                    {!showControls && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowControls(true)}
                            className={`relative w-12 h-12 rounded-xl ${isPlaying
                                    ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500'
                                    : 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800'
                                } text-white shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)] flex items-center justify-center overflow-hidden group transition-all duration-300`}
                            aria-label={isPlaying ? "Music Playing - Click to control" : "Music Paused - Click to control"}
                        >
                            {/* Animated gradient background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.3 }}
                            />

                            {/* Pulsing ring effect when playing */}
                            {isPlaying && (
                                <motion.div
                                    className="absolute inset-0 rounded-xl border-2 border-white/30"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            )}

                            {/* Show pause icon when playing, play icon when paused */}
                            {isPlaying ? (
                                <Pause className="w-5 h-5 relative z-10 drop-shadow-lg" />
                            ) : (
                                <Play className="w-5 h-5 ml-0.5 relative z-10 drop-shadow-lg" />
                            )}

                            {/* Playing indicator dot */}
                            {isPlaying && (
                                <motion.div
                                    className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_2px_rgba(74,222,128,0.6)]"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            )}
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Enhanced Control Panel */}
                <AnimatePresence>
                    {showControls && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.9 }}
                            className="absolute bottom-0 left-0 w-80 bg-background/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.5)] p-6 overflow-hidden"
                        >
                            {/* Glass reflection */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                            <div className="relative z-10 space-y-5">
                                {/* Header with status and close button */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                                            <Sparkles className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Ambient Flow</span>
                                            <p className="text-xs text-muted-foreground">{isPlaying ? 'Now Playing' : 'Paused'}</p>
                                        </div>
                                    </div>

                                    {/* Close Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setShowControls(false)}
                                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                                        aria-label="Close controls"
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                </div>

                                {/* Now Playing Card */}
                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-4 border border-purple-500/20 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <p className="text-xs text-purple-300/80 mb-1 flex items-center gap-1">
                                        <Music2 className="w-3 h-3" />
                                        {isPlaying ? 'Now Playing' : 'Ready to Play'}
                                    </p>
                                    <p className="text-sm font-semibold mb-0.5 text-foreground">Lo-Fi Study</p>
                                    <p className="text-xs text-muted-foreground">Ambient · Pixabay</p>
                                </div>

                                {/* Waveform visualizer */}
                                <div className="flex items-end justify-center gap-0.5 h-16 bg-secondary/30 rounded-2xl p-3 overflow-hidden">
                                    {bars.map((height, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex-1 bg-gradient-to-t from-purple-600 via-pink-500 to-orange-400 rounded-full opacity-80"
                                            animate={{
                                                height: isPlaying ? `${height}%` : '10%'
                                            }}
                                            transition={{
                                                duration: 0.2,
                                                ease: "easeOut"
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Controls Row */}
                                <div className="flex items-center justify-between gap-4">
                                    {/* Play/Pause Control */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={togglePlay}
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] relative overflow-hidden group"
                                        disabled={!isLoaded}
                                        aria-label={isPlaying ? "Pause music" : "Play music"}
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-white/20"
                                            whileHover={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                        {isPlaying ? <Pause className="w-5 h-5 relative z-10" /> : <Play className="w-5 h-5 ml-0.5 relative z-10" />}
                                    </motion.button>

                                    {/* Volume Control */}
                                    <div className="flex-1 bg-secondary/30 rounded-xl p-2 flex items-center gap-2">
                                        <button
                                            onClick={toggleMute}
                                            className="text-muted-foreground hover:text-purple-400 transition-colors p-1"
                                            aria-label={isMuted ? "Unmute" : "Mute"}
                                        >
                                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                        </button>
                                        <div className="flex-1 relative h-1 bg-secondary rounded-full overflow-hidden">
                                            <motion.div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={isMuted ? 0 : volume}
                                                onChange={handleVolumeChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                aria-label="Volume control"
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground w-8 text-right">
                                            {Math.round((isMuted ? 0 : volume) * 100)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
