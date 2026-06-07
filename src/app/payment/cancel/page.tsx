'use client';

import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import NoiseField from '@/components/ui/NoiseField';

export default function PaymentCancelPage() {
    return (
        <main className="min-h-screen bg-[#010101] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <NoiseField opacity={0.2} color="255,255,255" particleCount={100} speed={0.0001} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full text-center relative z-10"
            >
                <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10">
                    <XCircle className="text-white/40" size={40} />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                    Payment <br />
                    <span className="text-white/30">Halted.</span>
                </h1>

                <p className="text-lg text-white/40 mb-12 font-light leading-relaxed">
                    The transaction was not completed. No engineering resources have been allocated at this time.
                    If this was a mistake, you can return to the diagnostic portal below.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-white text-black rounded-full font-semibold flex items-center justify-center gap-3 hover:scale-105 transition-transform"
                    >
                        <RefreshCw size={20} /> Retry Checkout
                    </Link>
                    <Link
                        href="/"
                        className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Homepage
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}
