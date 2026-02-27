/**
 * QuickReplies Component
 * 
 * Displays quick reply buttons with icons and color coding for fast user interactions.
 * Part of the AI Travel Chatbot application.
 */

import React from 'react';
import { motion } from 'framer-motion';

interface QuickRepliesProps {
  replies: string[];
  onReplyClick: (reply: string) => void;
  disabled?: boolean;
}

// Icon mapping for different reply types
const getReplyIcon = (reply: string): string => {
  const lowerReply = reply.toLowerCase();
  if (lowerReply.includes('plan') || lowerReply.includes('trip')) return '🗺️';
  if (lowerReply.includes('budget')) return '💰';
  if (lowerReply.includes('weekend')) return '🌅';
  if (lowerReply.includes('destination')) return '📍';
  if (lowerReply.includes('family')) return '👨‍👩‍👧‍👦';
  if (lowerReply.includes('luxury')) return '✨';
  if (lowerReply.includes('hotel') || lowerReply.includes('stay')) return '🏨';
  if (lowerReply.includes('flight')) return '✈️';
  if (lowerReply.includes('package')) return '📦';
  if (lowerReply.includes('help')) return '❓';
  return '💬';
};

// Color coding based on reply type
const getReplyColors = (reply: string): { bg: string; border: string; text: string; hoverBg: string } => {
  const lowerReply = reply.toLowerCase();
  if (lowerReply.includes('budget')) {
    return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', hoverBg: 'hover:bg-green-100' };
  }
  if (lowerReply.includes('luxury')) {
    return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', hoverBg: 'hover:bg-amber-100' };
  }
  if (lowerReply.includes('family')) {
    return { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', hoverBg: 'hover:bg-pink-100' };
  }
  if (lowerReply.includes('plan') || lowerReply.includes('trip')) {
    return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', hoverBg: 'hover:bg-blue-100' };
  }
  if (lowerReply.includes('weekend')) {
    return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', hoverBg: 'hover:bg-orange-100' };
  }
  if (lowerReply.includes('destination')) {
    return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', hoverBg: 'hover:bg-purple-100' };
  }
  return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', hoverBg: 'hover:bg-gray-100' };
};

const QuickReplies: React.FC<QuickRepliesProps> = ({
  replies,
  onReplyClick,
  disabled = false,
}) => {
  if (!replies || replies.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.05 }}
      className="flex flex-wrap gap-2 mb-4 px-2"
    >
      {replies.map((reply, index) => {
        const colors = getReplyColors(reply);
        const icon = getReplyIcon(reply);
        return (
          <motion.button
            key={index}
            onClick={() => !disabled && onReplyClick(reply)}
            disabled={disabled}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2.5 ${colors.bg} border ${colors.border} ${colors.text} ${colors.hoverBg} rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            <span>{icon}</span>
            <span>{reply}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default QuickReplies;

