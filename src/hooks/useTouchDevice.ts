import { useState, useEffect } from 'react';

export const useTouchDevice = (): boolean => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const checkTouch = () => {
            setIsTouch(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            );
        };

        checkTouch();

        // Listen for touch events to confirm (some desktops have touch points but aren't primarily touch)
        const onTouch = () => {
            setIsTouch(true);
            window.removeEventListener('touchstart', onTouch);
        };

        window.addEventListener('touchstart', onTouch);

        return () => window.removeEventListener('touchstart', onTouch);
    }, []);

    return isTouch;
};
