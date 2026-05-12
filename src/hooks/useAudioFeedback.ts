'use client';

import { useCallback, useRef, useEffect } from 'react';

type SoundType = 'tick' | 'thud' | 'pop';

export function useAudioFeedback() {
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize lazily on first user interaction to comply with browser autoplay policies
    const initAudio = () => {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
    
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const play = useCallback((type: SoundType, event?: React.MouseEvent | MouseEvent) => {
    if (!audioCtx.current) return;
    
    // Check if user prefers reduced motion (often correlates with reduced sensory input)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }

    const osc = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();
    
    // Create Stereo Panner
    const panner = audioCtx.current.createStereoPanner();
    
    // Calculate pan based on mouse position (-1 left to 1 right)
    if (event) {
      const panValue = (event.clientX / window.innerWidth) * 2 - 1;
      panner.pan.value = Math.max(-1, Math.min(1, panValue));
    } else {
      panner.pan.value = 0;
    }

    osc.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(audioCtx.current.destination);

    const now = audioCtx.current.currentTime;

    if (type === 'tick') {
      // High pitched, very short tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);
      
      gainNode.gain.setValueAtTime(0.1, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
      
      osc.start(now);
      osc.stop(now + 0.02);
    } 
    else if (type === 'thud') {
      // Low pitched, heavy thud
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      osc.start(now);
      osc.stop(now + 0.1);
    }
    else if (type === 'pop') {
      // Pleasant mid-range pop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
      
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
      osc.start(now);
      osc.stop(now + 0.05);
    }
  }, []);

  return play;
}
