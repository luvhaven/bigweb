'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ReferralTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const ref = searchParams.get('ref');
        if (ref) {
            // Set a strict cookie lasting 30 days
            const d = new Date();
            d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
            document.cookie = `bigweb_ref=${ref};expires=${d.toUTCString()};path=/;SameSite=Strict`;

            // Also store in localStorage as a backup
            try {
                localStorage.setItem('bigweb_ref', ref);
            } catch (e) { }
        }
    }, [searchParams]);

    return null;
}

export default function ReferralProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
                <ReferralTracker />
            </Suspense>
            {children}
        </>
    );
}
