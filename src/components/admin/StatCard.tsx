/**
 * StatCard Component
 * 
 * Reusable card component for displaying statistics in the admin dashboard
 */

import React from 'react';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {change && (
        <p
          className={`text-sm mt-2 ${
            change.isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
          {change.label && ` ${change.label}`}
        </p>
      )}
    </motion.div>
  );
};

export default StatCard;
