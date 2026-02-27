/**
 * LoadingSpinner Component
 * 
 * Premium gradient loading spinner with animation
 */

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} relative`}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        
        {/* Gradient spinner */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(59, 130, 246, 0.3) 100%)',
          }}
        ></div>
        
        {/* Inner glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-sm"
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
