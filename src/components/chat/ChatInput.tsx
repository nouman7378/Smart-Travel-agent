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
      name: 'voice',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      component: (
        <VoiceAssistant
          onTranscript={(text) => setMessage(text)}
          disabled={disabled}
        />
      )
    },
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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-lg border-t border-gray-100/50 p-4"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          {/* Action Buttons */}
          <div className="flex gap-1">
            {actionButtons.map((button) => (
              <motion.div
                key={button.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {button.component ? (
                  button.component
                ) : (
                  <button
                    type="button"
                    onClick={button.onClick}
                    disabled={disabled}
                    className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed group"
                    title={`${button.name.charAt(0).toUpperCase() + button.name.slice(1)}`}
                  >
                    <div className="relative">
                      {button.icon}
                      <div className="absolute -inset-1 bg-blue-200/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-sm" />
                    </div>
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <motion.div
              animate={{
                boxShadow: isFocused 
                  ? '0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05)'
                  : '0 2px 10px rgba(0, 0, 0, 0.03)'
              }}
              className="relative bg-white rounded-2xl border border-gray-200/80 transition-all duration-200"
            >
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
                className="w-full px-5 py-4 bg-transparent focus:outline-none resize-none placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl"
                style={{ 
                  minHeight: '56px', 
                  maxHeight: '120px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              />
              
              {/* Character count or typing indicator */}
              <AnimatePresence>
                {message.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-2 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {message.length}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Send Button */}
          <motion.button
            type="submit"
            disabled={!message.trim() || disabled}
            whileHover={{ scale: message.trim() ? 1.05 : 1 }}
            whileTap={{ scale: message.trim() ? 0.95 : 1 }}
            className={`
              p-4 rounded-2xl transition-all duration-300 flex items-center justify-center
              ${message.trim() && !disabled
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <motion.div
              animate={{ 
                rotate: message.trim() ? 0 : 0,
                scale: message.trim() ? 1.1 : 1
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
            </motion.div>
          </motion.button>
        </div>

        {/* Quick Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-3 justify-center"
        >
          {['Best hotels in Paris', 'Flight deals', 'Travel tips', 'Weather'].map((suggestion) => (
            <motion.button
              key={suggestion}
              type="button"
              onClick={() => setMessage(suggestion)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
            >
              {suggestion}
            </motion.button>
          ))}
        </motion.div>
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