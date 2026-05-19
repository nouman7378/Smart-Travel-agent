import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  icon: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
}

// Reusable micro-counter component with easeOutQuad easing
const AnimatedCounter: React.FC<{ value: string | number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState<string | number>(() => {
    // Start at 0 or empty format
    const strVal = String(value);
    const prefix = strVal.match(/^[^\d]+/)?.[0] || '';
    const suffix = strVal.match(/[^\d]+$/)?.[0] || '';
    return prefix && suffix ? `${prefix}0${suffix}` : '0';
  });

  useEffect(() => {
    const strValue = String(value);
    // Strip non-numeric characters to animate the raw digits
    const numericMatch = strValue.replace(/[^0-9]/g, '');
    
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }
    
    const target = parseInt(numericMatch, 10);
    const prefix = strValue.match(/^[^\d]+/)?.[0] || '';
    const suffix = strValue.match(/[^\d]+$/)?.[0] || '';
    
    const duration = 1200; // 1.2s smooth animation
    const startTime = performance.now();
    let animationFrameId: number;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutQuad
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * target);
      
      const formatted = currentVal.toLocaleString();
      setDisplayValue(`${prefix}${formatted}${suffix}`);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Set exact target at end
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  return <>{displayValue}</>;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-100',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-xl border border-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:bg-white/90 hover:border-blue-200/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
        <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center shadow-sm`}>
          <span className={`${iconColor} scale-90`}>{icon}</span>
        </div>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight mb-1">
        <AnimatedCounter value={value} />
      </p>
      {change && (
        <div className="flex items-center space-x-1.5 mt-2">
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold ${
              change.isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
          </span>
          {change.label && <span className="text-xs text-gray-400 truncate">{change.label}</span>}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
