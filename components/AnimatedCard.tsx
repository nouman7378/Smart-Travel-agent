/**
 * AnimatedCard Component
 * 
 * This component is part of the Expedia.fr replication for our FYP.
 * Wraps cards with Framer Motion animations for 3D hover effects.
 */

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={{
        scale: 1.03,
        y: -8,
        rotateY: 2,
        rotateX: 2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;

