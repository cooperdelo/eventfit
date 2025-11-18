'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@eventfit/ui';

/**
 * PageTransition component
 * Provides smooth page transitions using Framer Motion
 * Reference: Quality standards - Page transitions (200-300ms fade)
 */
export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
};
