/**
 * MessageBubble Component
 *
 * Displays individual chat messages with support for text, images, and locations.
 * Supports a streaming (typewriter) effect for AI-generated responses.
 * Part of the AI Travel Chatbot application.
 */

import React, { useEffect, useRef, useState } from 'react';
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
  /** When true the bubble streams content character-by-character */
  isStreaming?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  /** Called once streaming finishes so the parent can show quick-replies etc. */
  onStreamDone?: () => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Format message content with support for markdown-like formatting.
 * Handles bold (**text**), bullet lines (• or -), section headers, and plain lines.
 */
const formatMessageContent = (content: string, isBot: boolean): React.ReactNode => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIndex) => {
    // Parse bold spans (**text**)
    const parts: React.ReactNode[] = [];
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    let lastIndex = 0;

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={`bold-${lineIndex}-${match.index}`} className={isBot ? 'text-blue-700 font-semibold' : 'text-white font-semibold'}>
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    const trimmed = line.trim();

    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      // Bullet line – strip the leading symbol so the coloured dot renders it
      const bulletText = trimmed.replace(/^[•\-]\s*/, '');
      // Re-parse bold inside the bullet text
      const bulletParts: React.ReactNode[] = [];
      const bRegex = /\*\*(.*?)\*\*/g;
      let bi = 0;
      let bm;
      while ((bm = bRegex.exec(bulletText)) !== null) {
        if (bm.index > bi) bulletParts.push(bulletText.substring(bi, bm.index));
        bulletParts.push(
          <strong key={`bbold-${lineIndex}-${bm.index}`} className={isBot ? 'text-blue-700 font-semibold' : 'text-white font-semibold'}>
            {bm[1]}
          </strong>
        );
        bi = bm.index + bm[0].length;
      }
      if (bi < bulletText.length) bulletParts.push(bulletText.substring(bi));

      elements.push(
        <div key={lineIndex} className="flex items-start gap-2 my-1">
          <span className={isBot ? 'text-blue-600' : 'text-blue-200'}>•</span>
          <span>{bulletParts.length > 0 ? bulletParts : bulletText}</span>
        </div>
      );
    } else if (trimmed === '---') {
      // Horizontal rule
      elements.push(<hr key={lineIndex} className="my-2 border-blue-200/60" />);
    } else if (trimmed === '') {
      elements.push(<br key={lineIndex} />);
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
      // Section header (entire line is bold)
      elements.push(
        <div key={lineIndex} className={`font-semibold mt-3 mb-1 ${isBot ? 'text-blue-700' : 'text-white'}`}>
          {trimmed.replace(/^\*\*|\*\*$/g, '')}
        </div>
      );
    } else {
      elements.push(
        <div key={lineIndex} className="my-1">
          {parts.length > 0 ? parts : line}
        </div>
      );
    }
  });

  return <>{elements}</>;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Characters revealed per tick during streaming */
const CHARS_PER_TICK = 18;
/** Interval between streaming ticks (ms) */
const TICK_MS = 30;

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onStreamDone }) => {
  const isBot = message.isBot;

  // --- Streaming state ---
  const [displayedContent, setDisplayedContent] = useState(
    message.isStreaming ? '' : message.content
  );
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const charIndexRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!message.isStreaming) {
      setDisplayedContent(message.content);
      return;
    }

    // Reset when a new streaming message mounts
    charIndexRef.current = 0;
    doneRef.current = false;
    setDisplayedContent('');

    streamRef.current = setInterval(() => {
      charIndexRef.current = Math.min(
        charIndexRef.current + CHARS_PER_TICK,
        message.content.length
      );
      setDisplayedContent(message.content.slice(0, charIndexRef.current));

      if (charIndexRef.current >= message.content.length && !doneRef.current) {
        doneRef.current = true;
        if (streamRef.current) clearInterval(streamRef.current);
        onStreamDone?.();
      }
    }, TICK_MS);

    return () => {
      if (streamRef.current) clearInterval(streamRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.id, message.isStreaming]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[75%] md:max-w-[60%] rounded-lg px-4 py-3 ${
          isBot
            ? 'bg-blue-50 text-gray-800 rounded-tl-sm'
            : 'bg-blue-600 text-white rounded-tr-sm'
        }`}
      >
        {/* Message Content */}
        {message.messageType === 'text' && (
          <div className="text-sm md:text-base whitespace-pre-wrap break-words">
            {formatMessageContent(displayedContent, isBot)}
            {/* Blinking cursor while streaming */}
            {message.isStreaming && displayedContent.length < message.content.length && (
              <span className="inline-block w-[2px] h-[1em] bg-blue-500 ml-0.5 align-middle animate-pulse" />
            )}
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <p className="text-sm md:text-base font-medium">{message.location.address}</p>
            </div>
            <a
              href={`https://www.google.com/maps?q=${message.location.lat},${message.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs underline ${isBot ? 'text-blue-600' : 'text-blue-200'}`}
            >
              View on Maps
            </a>
          </div>
        )}

        {/* Timestamp */}
        <p className={`text-xs mt-2 ${isBot ? 'text-gray-500' : 'text-blue-200'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
