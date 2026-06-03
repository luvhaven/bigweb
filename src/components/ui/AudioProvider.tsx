'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';

interface AudioContextType {
    playClick: () => void;
    playConfirm: () => void;
    playSwell: () => void;
}

const AudioContext = createContext<AudioContextType>({
    playClick: () => { },
    playConfirm: () => { },
    playSwell: () => { },
});

export const useAudio = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: ReactNode }) {
    const audioCtxRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        // Initialize Web Audio API on first user interaction to bypass Chrome autoplay policy
        const initAudio = () => {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
            }
        };

        window.addEventListener('mousedown', initAudio, { once: true });
        window.addEventListener('keydown', initAudio, { once: true });

        return () => {
            window.removeEventListener('mousedown', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
    }, []);

    // Soft, high-end click for hover interactions
    const playClick = () => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

        filter.type = 'highpass';
        filter.frequency.value = 1000;

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    };

    // Glass harmonic chime for primary CTAs / successful operations
    const playConfirm = () => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        // Harmonics for a glass/gold bell sound
        const freqs = [880, 1318.51, 1760]; // A5, E6, A6

        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.04 / (i + 1), ctx.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

            osc.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 1.2);
        });
    };

    // Deep, cinematic sub swell for opening modals (Command Menu, qualifier)
    const playSwell = () => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        // Cinematic pitch drop
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.6);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);
    };

    return (
        <AudioContext.Provider value={{ playClick, playConfirm, playSwell }}>
            {children}
        </AudioContext.Provider>
    );
}
