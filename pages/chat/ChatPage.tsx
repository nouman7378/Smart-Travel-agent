/**
 * ChatPage Component
 * 
 * Main chat interface with message bubbles, text input, send button,
 * multimedia support, typing indicators, and quick reply buttons.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageBubble, { Message } from '../../components/chat/MessageBubble';
import ChatInput from '../../components/chat/ChatInput';
import QuickReplies from '../../components/chat/QuickReplies';
import TypingIndicator from '../../components/chat/TypingIndicator';
import PageLayout from '../../components/PageLayout';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI travel assistant. How can I help you plan your trip today?',
      isBot: true,
      timestamp: new Date(),
      messageType: 'text',
      quickReplies: [
        'Top destinations',
        'Flight search',
        'Budget trips',
        'Create itinerary',
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (
    content: string,
    type: 'text' | 'image' | 'location'
  ) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
      messageType: type,
      ...(type === 'image' && { imageUrl: content }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentQuickReplies([]);
    setIsTyping(true);

    try {
      // Simulate typing delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock response for frontend-only functionality
      const mockResponses: { [key: string]: string } = {
        'top destinations': 'Here are some popular destinations: Paris, Tokyo, New York, London, and Dubai. Which one interests you?',
        'flight search': 'I can help you search for flights! Please use the flights page to search for available flights.',
        'budget trips': 'Great! I can help you find budget-friendly options. Check out our deals page for special offers.',
        'create itinerary': 'I can help you create an itinerary! Visit the itinerary builder page to get started.',
      };

      const lowerContent = content.toLowerCase();
      let responseContent = 'I\'m here to help you plan your trip! How can I assist you today?';
      let quickReplies = ['Top destinations', 'Flight search', 'Budget trips', 'Create itinerary'];

      // Check for keywords in user message
      for (const [key, value] of Object.entries(mockResponses)) {
        if (lowerContent.includes(key)) {
          responseContent = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isBot: true,
        timestamp: new Date(),
        messageType: 'text',
        quickReplies: quickReplies,
      };

      setMessages((prev) => [...prev, botMessage]);
      setCurrentQuickReplies(botMessage.quickReplies || []);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback mock response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you want help with: ${content}. How can I assist you further?`,
        isBot: true,
        timestamp: new Date(),
        messageType: 'text',
        quickReplies: ['Top destinations', 'Flight search', 'Budget trips', 'Create itinerary'],
      };
      setMessages((prev) => [...prev, fallbackResponse]);
      setCurrentQuickReplies(fallbackResponse.quickReplies || []);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply, 'text');
  };

  const handleLocationShare = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding would be done on backend
          const locationMessage: Message = {
            id: Date.now().toString(),
            content: 'My location',
            isBot: false,
            timestamp: new Date(),
            messageType: 'location',
            location: {
              lat: latitude,
              lng: longitude,
              address: `${latitude}, ${longitude}`,
            },
          };
          setMessages((prev) => [...prev, locationMessage]);
          // Send location to backend
          handleSendMessage(`Location: ${latitude}, ${longitude}`, 'location');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-t-xl shadow-lg border-b-2 border-blue-100 p-5 sm:p-6 mb-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                  AI Travel Assistant
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online • Ready to help
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/chat/history')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Chat History"
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => navigate('/chat/quick-actions')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Quick Actions"
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="bg-white rounded-b-xl shadow-lg min-h-[500px] max-h-[600px] sm:max-h-[700px] overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            <TypingIndicator isTyping={isTyping} />

            {currentQuickReplies.length > 0 && (
              <QuickReplies
                replies={currentQuickReplies}
                onReplyClick={handleQuickReply}
                disabled={isTyping}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onSendLocation={handleLocationShare}
            disabled={isTyping}
            placeholder="Ask about destinations, flights, hotels, or create an itinerary..."
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;

