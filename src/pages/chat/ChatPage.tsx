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
import { useAuth } from '../../contexts/AuthContext';
import { Banknote, Calendar, Lightbulb, MapPin, Plane, Users } from 'lucide-react';


const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const defaultWelcomeMessage: Message = {
    id: '1',
    content: "Hey! 👋 I'm your SmartTravel buddy.\n\nChat like you would with a friend — say hi, ask random travel stuff, or get serious about planning. When we've got listings in the catalog, I'll pull real hotels, cars, and packages; if not, we'll still figure something out together.\n\nTry: where you want to go, budget in PKR, or just \"I need a beach vibe this month\" ✈️",
    isBot: true,
    timestamp: new Date(),
    messageType: 'text',
    quickReplies: [
      'Plan a trip',
      'Budget travel',
      'Top destinations',
      'Find packages',
    ],
  };

  const [messages, setMessages] = useState<Message[]>([defaultWelcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState<string[]>([]);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load chat history & conversation context when component mounts or active user changes
  useEffect(() => {
    const userChatKey = user ? `travelhub_chat_messages_${user.username || user.email || 'guest'}` : 'travelhub_chat_messages_guest';
    const savedMessages = localStorage.getItem(userChatKey);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Map string timestamps back to Date objects
        const messagesWithDates = parsed.map((m: any) => ({
          ...m,
          timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error loading saved chat history:', error);
      }
    } else {
      setMessages([defaultWelcomeMessage]);
    }

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
  }, [user]);

  // Auto-persist messages on user/history changes
  useEffect(() => {
    if (messages.length > 1 || (messages.length === 1 && messages[0].id !== '1')) {
      const userChatKey = user ? `travelhub_chat_messages_${user.username || user.email || 'guest'}` : 'travelhub_chat_messages_guest';
      localStorage.setItem(userChatKey, JSON.stringify(messages));
    }
  }, [messages, user]);

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
    const userChatKey = user ? `travelhub_chat_messages_${user.username || user.email || 'guest'}` : 'travelhub_chat_messages_guest';
    localStorage.removeItem(userChatKey);
    setMessages([defaultWelcomeMessage]);
    setCurrentQuickReplies([]);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    // Auto-trigger the chat with the suggested prompt
    handleSendMessage(prompt, 'text');
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="bg-gray-50 flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] overflow-hidden">
        {/* Sleek Sub-Header with Back and Clear controls */}
        <div className="bg-white border-b border-gray-200 px-4 py-3.5 sm:px-6 flex items-center justify-between shadow-sm relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-all duration-150 font-bold active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-gray-950 uppercase tracking-widest">AI Travel Assistant</span>
          </div>
          <button
            onClick={handleResetConversation}
            className="flex items-center space-x-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-lg text-xs font-black text-rose-600 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Clear Chat History"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Messages Section - Scrollable container */}
        <div className="flex-1 overflow-y-auto pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

        {/* Chat Input Section - Stationary at bottom of container */}
        <div className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 shadow-lg shadow-gray-200/50">
          <div className="max-w-6xl mx-auto">
            <ChatInput
              onSendMessage={handleSendMessage}
              onSendLocation={handleLocationShare}
              disabled={isTyping}
              placeholder="Message AI Assistant..."
            />
            <p className="text-[10px] text-gray-400 text-center mt-2 font-medium">
              TravelHub AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;
