import { useState, useEffect } from 'react';

interface ViewportSize {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export const useViewportSize = (): ViewportSize => {
    const [viewportSize, setViewportSize] = useState<ViewportSize>({
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        // Only execute on client
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            setViewportSize({
                width,
                height,
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
            });
        };

        // Initial call
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return viewportSize;
};
