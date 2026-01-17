/**
 * QuickReplies Component
 * 
 * Displays quick reply buttons for fast user interactions.
 * Part of the AI Travel Chatbot application.
 */

import React from 'react';
import { motion } from 'framer-motion';

interface QuickRepliesProps {
  replies: string[];
  onReplyClick: (reply: string) => void;
  disabled?: boolean;
}

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
      className="flex flex-wrap gap-2 mb-4 px-2"
    >
      {replies.map((reply, index) => (
        <motion.button
          key={index}
          onClick={() => !disabled && onReplyClick(reply)}
          disabled={disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {reply}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickReplies;

