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

/**
 * Format message content with support for markdown-like formatting
 */
const formatMessageContent = (content: string, isBot: boolean): React.ReactNode => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  lines.forEach((line, lineIndex) => {
    // Handle bold text (**text**)
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    let lastIndex = 0;
    
    while ((match = boldRegex.exec(line)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      // Add bold text
      parts.push(
        <strong key={`bold-${match.index}`} className={isBot ? 'text-blue-700 font-semibold' : 'text-white font-semibold'}>
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }
    
    // Handle bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      elements.push(
        <div key={lineIndex} className="flex items-start gap-2 my-1">
          <span className={isBot ? 'text-blue-600' : 'text-blue-200'}>•</span>
          <span>{parts.length > 0 ? parts : line}</span>
        </div>
      );
    } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
      // Section header
      elements.push(
        <div key={lineIndex} className={`font-semibold mt-3 mb-1 ${isBot ? 'text-blue-700' : 'text-white'}`}>
          {line.replace(/\*\*/g, '')}
        </div>
      );
    } else if (line.trim() === '') {
      // Empty line
      elements.push(<br key={lineIndex} />);
    } else {
      // Regular line
      elements.push(
        <div key={lineIndex} className="my-1">
          {parts.length > 0 ? parts : line}
        </div>
      );
    }
  });
  
  return <>{elements}</>;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.isBot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-4 shadow-lg ${
          isBot
            ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 rounded-tl-sm border border-blue-100/50'
            : 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-tr-sm shadow-blue-500/25'
        }`}
      >
        {/* Message Content */}
        {message.messageType === 'text' && (
          <div className="text-sm md:text-base whitespace-pre-wrap break-words">
            {formatMessageContent(message.content, isBot)}
          </div>
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

        {/* Timestamp with read receipt */}
        <div className={`flex items-center gap-1 mt-2 ${isBot ? 'text-gray-400' : 'text-blue-200/80'}`}>
          <span className="text-xs">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {!isBot && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;

