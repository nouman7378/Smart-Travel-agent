/**
 * ChatHistoryPage Component
 * 
 * Displays previous chat sessions for the logged-in user.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

const ChatHistoryPage: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock chat history data for frontend-only functionality
    const fetchChatHistory = async () => {
      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const mockSessions: ChatSession[] = [
          {
            id: '1',
            title: 'Paris Trip Planning',
            lastMessage: 'Looking for hotels in Paris',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            messageCount: 12,
          },
          {
            id: '2',
            title: 'Flight Search',
            lastMessage: 'Best flights to Tokyo',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            messageCount: 8,
          },
          {
            id: '3',
            title: 'Budget Travel',
            lastMessage: 'Affordable destinations in Europe',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            messageCount: 15,
          },
        ];
        setSessions(mockSessions);
      } catch (error) {
        console.error('Error loading chat history:', error);
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <PageLayout skipHeaderFooter={true}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading chat history...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Chat History
            </h1>
            <p className="text-gray-600">
              View and continue your previous conversations
            </p>
          </div>

          {/* New Chat Button */}
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Chat
          </Link>

          {/* Chat Sessions List */}
          {sessions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No chat history
              </h3>
              <p className="text-gray-600 mb-6">
                Start a new conversation to see your chat history here.
              </p>
              <Link
                to="/chat"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start New Chat
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <Link to={`/chat?session=${session.id}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {session.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {session.lastMessage}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{formatTimestamp(session.timestamp)}</span>
                          <span>•</span>
                          <span>{session.messageCount} messages</span>
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatHistoryPage;

