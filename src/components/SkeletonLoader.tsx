/**
 * SkeletonLoader Component
 * 
 * Premium skeleton loading screens with shimmer effect
 */

import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type?: 'card' | 'text' | 'circle' | 'search' | 'hotel' | 'flight';
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'card',
  count = 1,
  className = '' 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg ${className}`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl skeleton-shimmer"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 skeleton-shimmer"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 skeleton-shimmer"></div>
              </div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className={`space-y-3 ${className}`}>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full skeleton-shimmer"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6 skeleton-shimmer"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6 skeleton-shimmer"></div>
          </div>
        );
      
      case 'circle':
        return (
          <div className={`w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full skeleton-shimmer ${className}`}></div>
        );
      
      case 'search':
        return (
          <div className={`bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 ${className}`}>
            <div className="flex gap-4 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-1 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl skeleton-shimmer"></div>
              ))}
            </div>
            <div className="h-14 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-xl skeleton-shimmer"></div>
          </div>
        );
      
      case 'hotel':
        return (
          <div className={`bg-white/80 backdrop-blur rounded-2xl overflow-hidden shadow-lg ${className}`}>
            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 skeleton-shimmer"></div>
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 skeleton-shimmer"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 skeleton-shimmer"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-24 skeleton-shimmer"></div>
                <div className="h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg w-28 skeleton-shimmer"></div>
              </div>
            </div>
          </div>
        );
      
      case 'flight':
        return (
          <div className={`bg-white/80 backdrop-blur rounded-2xl p-5 shadow-lg ${className}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl skeleton-shimmer"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 skeleton-shimmer"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 skeleton-shimmer"></div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 skeleton-shimmer"></div>
                <div className="h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-24 skeleton-shimmer"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </>
  );
};

export default SkeletonLoader;
