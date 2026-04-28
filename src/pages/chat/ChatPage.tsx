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
import { Banknote, Calendar, Lightbulb, MapPin, Plane, Users } from 'lucide-react';


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
            responseContent += `${idx + 1}. ${item.name} - PKR ${item.price.toLocaleString()} (${item.duration} days)\n`;
          }
        });
      }

      // Add context summary if we have partial info
      if (response.needsFollowUp && Object.keys(response.context).length > 0) {
        const contextSummary: string[] = [];
        if (response.context.budget) {
          const min = response.context.budget.min || 0;
          const max = response.context.budget.max;
          contextSummary.push(`💰 Budget: PKR ${min.toLocaleString()}${max ? ` - ${max.toLocaleString()}` : '+'}`);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-t-xl shadow-lg border-b-2 border-blue-100 p-4 sm:p-5 lg:p-6 mb-2">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
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
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 tracking-tight truncate">
                  AI Travel Assistant
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></span>
                  <span className="truncate">Online • Ready to help</span>
                </p>
              </div>
              <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                <button
                  onClick={handleResetConversation}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1.5"
                  title="Start New Conversation"
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span className="hidden sm:inline">Reset</span>
                </button>
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
                  onClick={() => navigate('/packages')}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Browse Packages"
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="bg-white rounded-b-xl shadow-lg min-h-[400px] sm:min-h-[500px] max-h-[500px] sm:max-h-[600px] lg:max-h-[700px] overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
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

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onSendLocation={handleLocationShare}
            disabled={isTyping}
            placeholder="Ask about destinations, budget trips, packages, or travel planning..."
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
