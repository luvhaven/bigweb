'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowRight, X, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { useMousePosition } from '@/lib/hooks';
import { supabase } from '@/lib/supabase';

export default function CinematicShowreel({ videoUrl: initialVideoUrl }: { videoUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [progress, setProgress] = useState(0);
  const mousePosition = useMousePosition();
  
  // Track mouse relative to the video container for the magnetic cursor
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current && isHovering) {
      const rect = containerRef.current.getBoundingClientRect();
      setLocalMouse({
        x: mousePosition.x - rect.left,
        y: mousePosition.y - rect.top,
      });
    }
  }, [mousePosition, isHovering]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  // Mathematically expand the video from a small pill to full screen
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['40px', '0px']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 1]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const closeTheaterMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (overlayVideoRef.current) {
      overlayVideoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (overlayVideoRef.current) {
      const p = (overlayVideoRef.current.currentTime / overlayVideoRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const updateVideoUrl = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newUrl = window.prompt("Enter new video URL for the Manifesto Showreel:");
    if (!newUrl) return;

    setVideoUrl(newUrl);

    try {
      await supabase
        .from('site_settings')
        .update({ value: newUrl })
        .eq('key', 'manifesto_video_url');
    } catch (err) {
      console.error("Failed to update video in DB", err);
    }
  };

  return (
    <>
      {/* Theater Mode Blackout Overlay & Full Screen Video */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <video
              ref={overlayVideoRef}
              src={videoUrl}
              loop
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'contain',
                position: 'absolute',
                inset: 0
              }}
            />

            {/* Progress Bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.1)', zIndex: 101 }}>
              <motion.div 
                style={{ height: '100%', background: 'var(--color-gold-bright)', width: `${progress}%` }} 
                transition={{ type: 'tween' }}
              />
            </div>

            {/* Close Button */}
            <button 
              onClick={closeTheaterMode}
              style={{
                position: 'absolute',
                top: 'var(--space-8)',
                right: 'var(--space-8)',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                zIndex: 101
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 106, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
            >
              <X size={20} />
            </button>

            {/* Conversion CTA overlayed on video */}
            <div style={{ position: 'absolute', bottom: 'var(--space-12)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 101 }}>
              <Link href="/contact" onClick={(e) => e.stopPropagation()} className="btn btn-primary group">
                Apply for Partnership <ArrowRight size={18} style={{ display: 'inline', marginLeft: '8px' }} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        ref={containerRef}
        className="section" 
        style={{ 
          position: 'relative', 
          height: '200vh', // Extra height to allow scrolling expansion
          background: 'var(--color-bg-primary)',
          zIndex: 1
        }}
      >
        <div 
          style={{ 
            position: 'sticky', 
            top: 0, 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <motion.div
            style={{
              width: '100%',
              maxWidth: '1200px',
              height: '70vh',
              scale,
              borderRadius,
              opacity,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'none', // Hide default cursor when hovering video
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              loop
              playsInline
              muted
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.05)' // Slight crop to prevent edge bleeding
              }}
            />

            {/* Admin Edit Button */}
            {!isPlaying && (
              <button
                onClick={updateVideoUrl}
                style={{
                  position: 'absolute',
                  top: 'var(--space-4)',
                  right: 'var(--space-4)',
                  zIndex: 30,
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(212, 175, 106, 0.3)',
                  color: 'var(--color-gold-muted)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  pointerEvents: 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-gold-bright)';
                  e.currentTarget.style.borderColor = 'var(--color-gold-bright)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-gold-muted)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 106, 0.3)';
                }}
              >
                <Edit3 size={12} /> Edit Media
              </button>
            )}

            {/* Custom Magnetic Cursor */}
            <AnimatePresence>
              {isHovering && !isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    position: 'absolute',
                    left: localMouse.x,
                    top: localMouse.y,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 10,
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 175, 106, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-bright)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontSize: '11px',
                    fontWeight: 800,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(212, 175, 106, 0.2)'
                  }}
                >
                  <Play size={28} style={{ marginBottom: '8px', fill: 'var(--color-gold-bright)', filter: 'drop-shadow(0 0 8px rgba(212,175,106,0.8))' }} />
                  Play
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </section>
    </>
  );
}
