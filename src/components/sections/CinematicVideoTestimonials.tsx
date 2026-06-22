'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const mockVideos = [
  {
    id: 1,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    name: 'Sarah Chen',
    role: 'VP Marketing @ DataPulse',
    duration: 15,
  },
  {
    id: 2,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    name: 'Marcus Rodriguez',
    role: 'CEO @ LuxeWear',
    duration: 15,
  },
  {
    id: 3,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    name: 'Lena Sokolov',
    role: 'CMO @ Vanguard',
    duration: 15,
  }
];

export default function CinematicVideoTestimonials({ testimonials = [] }: { testimonials?: any[] }) {
  const dynamicVideos = testimonials
    .filter(t => t.avatar && !!t.avatar.match(/\.(mp4|webm|ogg)$/i))
    .map(t => ({
      id: t.id,
      url: t.avatar,
      name: t.name,
      role: t.role ? `${t.role} @ ${t.company}` : t.company,
      duration: 15
    }));

  // Fallback to mock videos if there's no actual video uploaded by the admin
  const activeVideos = dynamicVideos.length > 0 ? dynamicVideos : mockVideos;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play the active video, or handle play state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        // Must catch the promise to avoid auto-play rejection crashes visually
        videoRef.current.play().catch(e => console.warn("Autoplay prevented", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentIndex, isPlaying]);

  const handleVideoEnded = () => {
    // Wait a brief MS then scroll next
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeVideos.length);
    }, 400);
  };

  const currentVideo = activeVideos[currentIndex];

  const variants = {
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
  };

  return (
    <div className="cinematic-wrapper" style={{ margin: 'var(--space-16) 0' }}>

      {/* Title overlay or header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 800,
          color: 'var(--color-text-primary)'
        }}>See The Evidence</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>Unfiltered client outcomes from the field.</p>
      </div>

      {/* The TV / Cinematic Frame */}
      <div className="cinematic-frame">
        <div className="frame-glass">

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentVideo.id}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth, cinematic easing
              className="video-container"
            >
              <video
                ref={videoRef}
                src={currentVideo.url}
                className="cinematic-video"
                muted={isMuted}
                playsInline
                onEnded={handleVideoEnded}
              />

              {/* Overlay Content */}
              <div className="video-overlay">
                <div className="video-overlay-top">
                  <div className="video-pill">
                    <span className="live-dot" /> Testimonial
                  </div>
                </div>

                <div className="video-overlay-bottom">
                  <div>
                    <h4 className="video-client-name">{currentVideo.name}</h4>
                    <span className="video-client-role">{currentVideo.role}</span>
                  </div>

                  {/* Controls */}
                  <div className="video-controls">
                    <button onClick={() => setIsMuted(!isMuted)} className="control-btn" aria-label="Toggle sound">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button onClick={() => setIsPlaying(!isPlaying)} className="control-btn" aria-label="Toggle play">
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .cinematic-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cinematic-frame {
          width: 100%;
          max-width: 900px;
          aspect-ratio: 16 / 9;
          padding: 8px; /* The bezel */
          background: linear-gradient(145deg, #1f1f23, #0a0a0c);
          border-radius: 24px;
          box-shadow: 
            0 30px 60px -10px rgba(0,0,0,0.8),
            inset 0 1px 1px rgba(255,255,255,0.1),
            inset 0 -1px 2px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
        }

        .frame-glass {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: #000;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255,255,255,0.03);
        }

        .video-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
        }

        .cinematic-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: var(--space-6);
          background: linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.8) 100%);
          pointer-events: none; /* Let clicks pass to controls */
        }

        .video-overlay-top {
          display: flex;
          justify-content: flex-end;
        }

        .video-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          padding: 6px 12px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #fff;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          background-color: #ef4444; /* classic recording red */
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        .video-overlay-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          pointer-events: auto; /* Re-enable for controls */
        }

        .video-client-name {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: #fff;
          margin-bottom: 2px;
        }

        .video-client-role {
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.7);
        }

        .video-controls {
          display: flex;
          gap: 12px;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .control-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .cinematic-frame { aspect-ratio: 9/16; max-width: 400px; }
          .video-client-name { font-size: var(--text-xl); }
        }
      `}} />
    </div>
  );
}
