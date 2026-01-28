/**
 * SuggestedPrompts Component
 * 
 * Quick action chips for starting conversations with the AI assistant.
 * Helps users discover what the chatbot can do.
 */

import React from 'react';
import { motion } from 'framer-motion';

interface SuggestedPrompt {
  text: string;
  icon?: React.ReactNode;
  category?: 'planning' | 'budget' | 'destination' | 'quick';
}

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
  disabled?: boolean;
  showWhenEmpty?: boolean; // Show when chat is empty
  isChatEmpty?: boolean;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  onPromptClick,
  disabled = false,
  showWhenEmpty = true,
  isChatEmpty = true,
}) => {
  // Only show when chat is empty (onboarding state)
  if (!showWhenEmpty || !isChatEmpty) {
    return null;
  }

  const prompts: SuggestedPrompt[] = [
    {
      text: 'Plan a trip',
      category: 'planning',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      text: 'Budget travel under $1000',
      category: 'budget',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      text: 'Weekend getaway',
      category: 'quick',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      text: 'Best destinations this month',
      category: 'destination',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      text: 'Family trip ideas',
      category: 'planning',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      text: 'Luxury vacation',
      category: 'budget',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <p className="text-sm font-medium text-gray-600 mb-3 text-center">
        Try asking about:
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {prompts.map((prompt, index) => (
          <motion.button
            key={index}
            onClick={() => !disabled && onPromptClick(prompt.text)}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5
              bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl
              text-xs sm:text-sm font-medium text-gray-700
              hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-sm hover:shadow-md
              flex-shrink-0
            `}
          >
            {prompt.icon && (
              <span className="text-blue-600 flex-shrink-0">{prompt.icon}</span>
            )}
            <span className="whitespace-nowrap">{prompt.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SuggestedPrompts;
