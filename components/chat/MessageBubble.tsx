/**
 * MessageBubble Component
 * 
 * Displays individual chat messages with support for text, images, and locations.
 * Part of the AI Travel Chatbot application.
 */

import React from 'react';
import { motion } from 'framer-motion';

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  messageType: 'text' | 'image' | 'location' | 'quick_reply';
  imageUrl?: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  quickReplies?: string[];
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.isBot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 ${
          isBot
            ? 'bg-blue-50 text-gray-800 rounded-tl-sm'
            : 'bg-blue-600 text-white rounded-tr-sm'
        }`}
      >
        {/* Message Content */}
        {message.messageType === 'text' && (
          <p className="text-sm md:text-base whitespace-pre-wrap break-words">
            {message.content}
          </p>
        )}

        {message.messageType === 'image' && message.imageUrl && (
          <div className="space-y-2">
            <img
              src={message.imageUrl}
              alt="Shared image"
              className="rounded-lg max-w-full h-auto max-h-64 object-cover"
            />
            {message.content && (
              <p className="text-sm md:text-base">{message.content}</p>
            )}
          </div>
        )}

        {message.messageType === 'location' && message.location && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm md:text-base font-medium">
                {message.location.address}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps?q=${message.location.lat},${message.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs underline ${
                isBot ? 'text-blue-600' : 'text-blue-200'
              }`}
            >
              View on Maps
            </a>
          </div>
        )}

        {/* Timestamp */}
        <p
          className={`text-xs mt-2 ${
            isBot ? 'text-gray-500' : 'text-blue-200'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;

