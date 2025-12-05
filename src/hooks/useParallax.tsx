import { useEffect, useState, RefObject } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxOptions {
  speed?: number;
  offset?: number;
  direction?: 'vertical' | 'horizontal' | 'both';
  reverse?: boolean;
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const {
    speed = 0.5,
    offset = 0,
    direction = 'vertical',
    reverse = false,
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = reverse ? -1 : 1;
  const range = [-100 * speed, 100 * speed];

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' || direction === 'both'
      ? [range[0] * multiplier + offset, range[1] * multiplier + offset]
      : [0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'horizontal' || direction === 'both'
      ? [range[0] * multiplier + offset, range[1] * multiplier + offset]
      : [0, 0]
  );

  return { y, x, scrollYProgress };
};

export const useScrollRotate = (ref: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  return { rotate, scrollYProgress };
};

export const useScrollScale = (ref: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  return { scale, scrollYProgress };
};

export const useMouseParallax = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

export const useRevealAnimation = (ref: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return { opacity, y, scrollYProgress };
};
