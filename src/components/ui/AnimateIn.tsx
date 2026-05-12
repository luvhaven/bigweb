'use client';

import { motion, Transition } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span';
}

export default function AnimateIn({ children, delay = 0, className = '', as = 'div' }: AnimateInProps) {
  const transitionProps: Transition = {
    type: 'spring', 
    stiffness: 70, 
    damping: 20, 
    mass: 1,
    delay: delay * 0.1
  };

  const commonProps = {
    className,
    initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-10%' as any },
    transition: transitionProps
  };

  switch (as) {
    case 'section':
      return <motion.section {...commonProps}>{children}</motion.section>;
    case 'article':
      return <motion.article {...commonProps}>{children}</motion.article>;
    case 'span':
      return <motion.span {...commonProps}>{children}</motion.span>;
    case 'div':
    default:
      return <motion.div {...commonProps}>{children}</motion.div>;
  }
}
