/**
 * ChatInput Component - Modern Design
 * 
 * Input component for sending messages with support for text, images, and locations.
 * Part of the AI Travel Chatbot application.
 * 
 * Features:
 * - Modern glass morphism design
 * - Smooth animations and transitions
 * - Clean iconography
 * - Responsive layout
 * - Enhanced user experience
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceAssistant from './VoiceAssistant';

interface ChatInputProps {
  onSendMessage: (content: string, type: 'text' | 'image' | 'location') => void;
  onSendLocation?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendLocation,
  placeholder = 'Ask about travel destinations, hotels, or activities...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), 'text');
      setMessage('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendMessage(reader.result as string, 'image');
      };
      reader.readAsDataURL(file);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation && onSendLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: _latitude, longitude: _longitude } = position.coords;
          onSendLocation();
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else if (onSendLocation) {
      onSendLocation();
    }
  };

  // Action buttons data
  const actionButtons = [
    {
      name: 'image',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => fileInputRef.current?.click()
    },
    {
      name: 'location',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: handleLocationClick
    }
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-4 bg-transparent"
    >
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-none flex items-center gap-2 bg-white p-2 rounded-lg border-2 border-blue-200 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50/50 transition-all duration-200"
      >
        {/* Action Buttons */}
        <div className="flex gap-0.5">
          {actionButtons.map((button) => (
            <motion.div
              key={button.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="button"
                onClick={button.onClick}
                disabled={disabled}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 disabled:opacity-40"
                title={`${button.name.charAt(0).toUpperCase() + button.name.slice(1)}`}
              >
                {button.icon}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-3 py-2 bg-transparent focus:outline-none resize-none placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
            style={{ 
              minHeight: '44px', 
              maxHeight: '120px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          />
        </div>

        {/* Send Button */}
        <motion.button
          type="submit"
          disabled={!message.trim() || disabled}
          whileHover={{ scale: message.trim() ? 1.05 : 1 }}
          whileTap={{ scale: message.trim() ? 0.95 : 1 }}
          className={`
            p-3 rounded-xl transition-all duration-300 flex items-center justify-center
            ${message.trim() && !disabled
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }
          `}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </motion.button>
      </form>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        disabled={disabled}
      />
    </motion.div>
  );
};

export default ChatInput;