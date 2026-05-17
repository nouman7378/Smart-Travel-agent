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
      <div className="bg-white flex flex-col min-h-[calc(100vh-200px)]">
        {/* Messages Section */}
        <div className="flex-1 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

            {/* Suggested Prompts */}
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
        </div>

        {/* Chat Input Section - Relative to page flow, above footer */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-md py-6 border-t border-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <ChatInput
              onSendMessage={handleSendMessage}
              onSendLocation={handleLocationShare}
              disabled={isTyping}
              placeholder="Message AI Assistant..."
            />
            <p className="text-[10px] text-gray-400 text-center mt-3">
              TravelHub AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
