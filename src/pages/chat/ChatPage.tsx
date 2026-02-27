/**
 * ChatPage Component
 * 
 * AI Travel Assistant with intelligent conversation flow, context retention,
 * and personalized travel recommendations.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MessageBubble, { Message } from '../../components/chat/MessageBubble';
import ChatInput from '../../components/chat/ChatInput';
import QuickReplies from '../../components/chat/QuickReplies';
import TypingIndicator from '../../components/chat/TypingIndicator';
import SuggestedPrompts from '../../components/chat/SuggestedPrompts';
import PageLayout from '../../components/PageLayout';
import { chatService, ConversationContext } from '../../services/chatService';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hi! I'm your TravelHub AI Assistant.\n\nI'm here to help you plan the perfect trip! Tell me:\n• Your budget range\n• Travel dates or duration\n• Preferred destination (or type: beach, city, mountain, etc.)\n• Number of travelers\n\nAnd I'll provide personalized recommendations just for you! ✈️",
      isBot: true,
      timestamp: new Date(),
      messageType: 'text',
      quickReplies: [
        'Plan a trip',
        'Budget travel',
        'Top destinations',
        'Find packages',
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState<string[]>([]);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load conversation context on mount
  useEffect(() => {
    const savedContext = localStorage.getItem('travelhub_chat_context');
    if (savedContext) {
      try {
        const context = JSON.parse(savedContext);
        setConversationContext(context);
        chatService.getContext(); // Restore context in service
      } catch (error) {
        console.error('Error loading chat context:', error);
      }
    }
  }, []);

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
      // Simulate realistic typing delay
      const typingDelay = Math.min(800 + Math.random() * 400, 1500);
      await new Promise((resolve) => setTimeout(resolve, typingDelay));

      // Process message with AI service
      const response = await chatService.processMessage(content);

      // Update conversation context
      setConversationContext(response.context);

      // Save context to localStorage
      localStorage.setItem('travelhub_chat_context', JSON.stringify(response.context));

      // Build bot response message
      let responseContent = response.message;

      // Add recommendations if available
      if (response.recommendations && response.recommendations.items.length > 0) {
        responseContent += '\n\n';
        responseContent += '**💡 Recommendations:**\n';
        response.recommendations.items.forEach((item, idx) => {
          if (response.recommendations?.type === 'package') {
            responseContent += `${idx + 1}. ${item.name} - $${item.price} (${item.duration} days)\n`;
          }
        });
      }

      // Add context summary if we have partial info
      if (response.needsFollowUp && Object.keys(response.context).length > 0) {
        const contextSummary: string[] = [];
        if (response.context.budget) {
          contextSummary.push(`💰 Budget: $${response.context.budget.min || 0}${response.context.budget.max ? ` - $${response.context.budget.max}` : '+'}`);
        }
        if (response.context.destination) {
          contextSummary.push(`📍 Destination: ${response.context.destination.name || response.context.destination.type || 'Not specified'}`);
        }
        if (response.context.travelers) {
          contextSummary.push(`👥 Travelers: ${response.context.travelers.total || response.context.travelers.adults || 'Not specified'}`);
        }
        if (response.context.dates?.duration) {
          contextSummary.push(`📅 Duration: ${response.context.dates.duration} days`);
        }

        if (contextSummary.length > 0) {
          responseContent += '\n\n**What I know so far:**\n';
          responseContent += contextSummary.join('\n');
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isBot: true,
        timestamp: new Date(),
        messageType: 'text',
        quickReplies: response.quickReplies,
      };

      setMessages((prev) => [...prev, botMessage]);
      setCurrentQuickReplies(response.quickReplies || []);
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing that right now. Could you rephrase your question? I'm here to help you with:\n\n• Trip planning\n• Destination recommendations\n• Budget travel options\n• Package suggestions\n• Booking guidance",
        isBot: true,
        timestamp: new Date(),
        messageType: 'text',
        quickReplies: ['Plan a trip', 'Budget travel', 'Top destinations', 'Help'],
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
          handleSendMessage(`I'm located at ${latitude}, ${longitude}. Can you suggest nearby destinations?`, 'location');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    }
  };

  const handleResetConversation = () => {
    // Reset without confirmation for smoother UX
    chatService.resetContext();
    setConversationContext({});
    localStorage.removeItem('travelhub_chat_context');
    setMessages([
      {
        id: '1',
        content: "👋 Hi! I'm your TravelHub AI Assistant.\n\nI'm here to help you plan the perfect trip! Tell me:\n• Your budget range\n• Travel dates or duration\n• Preferred destination (or type: beach, city, mountain, etc.)\n• Number of travelers\n\nAnd I'll provide personalized recommendations just for you! ✈️",
        isBot: true,
        timestamp: new Date(),
        messageType: 'text',
        quickReplies: [
          'Plan a trip',
          'Budget travel',
          'Top destinations',
          'Find packages',
        ],
      },
    ]);
    setCurrentQuickReplies([]);
    // Scroll to top smoothly
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    // Auto-trigger the chat with the suggested prompt
    handleSendMessage(prompt, 'text');
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="h-screen relative overflow-hidden flex items-center justify-center">
        {/* Background Image with Gradient Overlay - Same as Hero */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-110 animate-zoom-in-out"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80)',
            }}
          ></div>
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-pink-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
          {/* Animated Mesh Gradient */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-400/50 via-transparent to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400/30 via-transparent to-transparent"></div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Circles */}
          <motion.div 
            animate={{ 
              y: [0, -30, 0], 
              x: [0, 20, 0],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0], 
              x: [0, -30, 0],
              scale: [1, 1.2, 1] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-40 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, -50, 0], 
              scale: [1, 1.15, 1] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-40 left-1/4 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0], 
              x: [0, 40, 0] 
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"
          />
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto h-[calc(100vh-2rem)] flex flex-col py-4 px-4 sm:px-6 relative z-10 overflow-hidden">
          {/* Header - Premium 3D Glassmorphism Design */}
          <motion.div 
            initial={{ y: -30, opacity: 0, rotateX: 10 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex-shrink-0 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/70 p-5 sm:p-6 relative overflow-hidden"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            {/* Animated Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-orange-400 to-blue-500 animate-gradient-x"></div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
            
            {/* Floating Orbs */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/30 rounded-full blur-2xl"
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-400/30 rounded-full blur-2xl"
            />
            
            <div className="flex items-center gap-4 sm:gap-5 relative z-10">
              {/* 3D Animated Avatar */}
              <motion.div 
                whileHover={{ scale: 1.1, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
                
                {/* Main Avatar */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
                  <motion.svg
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg"
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
                  </motion.svg>
                </div>
                
                {/* Pulsing Online Indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                  <span className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-60"></span>
                </div>
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.h1 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight truncate"
                >
                  AI Travel Assistant
                </motion.h1>
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-500 flex items-center gap-2 mt-1.5"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="truncate font-medium">Online • Ready to help plan your perfect trip ✨</span>
                </motion.p>
              </div>
              
              <div className="flex gap-2 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetConversation}
                  className="p-3 text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100"
                  title="Start New Conversation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/chat/history')}
                  className="p-3 text-gray-500 hover:text-purple-600 bg-gray-50 hover:bg-purple-50 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100"
                  title="View Chat History"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/packages')}
                  className="p-3 text-gray-500 hover:text-pink-600 bg-gray-50 hover:bg-pink-50 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100"
                  title="Browse Packages"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Messages Container - Premium Glass Design */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex-1 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/80 mt-4 overflow-hidden flex flex-col relative"
          >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none"></div>
            
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8 space-y-5 relative">
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

              {/* Suggested Prompts - Show when chat is empty (only onboarding message) */}
              {messages.length === 1 && !isTyping && (
                <SuggestedPrompts
                  onPromptClick={handleSuggestedPrompt}
                  disabled={isTyping}
                  showWhenEmpty={true}
                  isChatEmpty={messages.length === 1}
                />
              )}

              <div ref={messagesEndRef} />
            </div>
          </motion.div>

          {/* Chat Input - Fixed at bottom with proper spacing */}
          <div className="flex-shrink-0 mt-4">
            <ChatInput
              onSendMessage={handleSendMessage}
              onSendLocation={handleLocationShare}
              disabled={isTyping}
              placeholder="Ask about destinations, budget trips, packages, or travel planning..."
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
