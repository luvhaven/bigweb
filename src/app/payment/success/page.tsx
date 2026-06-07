'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import NoiseField from '@/components/ui/NoiseField';

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id') || searchParams.get('reference');
    const [confetti, setConfetti] = useState(false);

    useEffect(() => {
        setConfetti(true);
    }, []);

    return (
        <div className="max-w-2xl w-full text-center relative z-10">
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 relative">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2 }}
                    className="absolute inset-0 rounded-full border-2 border-[#FF6B35] opacity-20 animate-ping"
                />
                <CheckCircle2 className="text-[#FF6B35]" size={48} />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                Authorization <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-amber-300">
                    Granted.
                </span>
            </h1>

            <p className="text-xl text-white/40 mb-12 font-light leading-relaxed">
                Payment verified. Your Diagnostic Protocol is officially prioritized.
                We are now allocating elite engineering resources to your roadmap.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href="/admin"
                    className="px-8 py-4 bg-white text-black rounded-full font-semibold flex items-center justify-center gap-3 hover:scale-105 transition-transform"
                >
                    View Client Portal <ArrowRight size={20} />
                </Link>
                <button
                    className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                >
                    Download Receipt <Download size={20} />
                </button>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5">
                <p className="text-xs font-mono tracking-widest text-white/20 uppercase">
                    Transaction ID: {sessionId?.slice(-12) || 'AUTH_D_772'}
                </p>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <main className="min-h-screen bg-[#010101] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <NoiseField opacity={0.3} color="255,107,53" particleCount={150} speed={0.0002} />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>

            <Suspense fallback={<div className="text-white/20 font-mono tracking-widest uppercase animate-pulse">Verifying Transaction...</div>}>
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <SuccessContent />
                </motion.div>
            </Suspense>
        </main>
    );
}
