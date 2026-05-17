/**
 * QuickActionsPanel Component
 * 
 * Panel with common travel queries like "Top destinations", "Flight search", "Budget trips".
 * Part of the AI Travel Chatbot application.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

const QuickActionsPanel: React.FC = () => {
  const navigate = useNavigate();

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Top Destinations',
      description: 'Discover popular travel destinations',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      action: () => navigate('/chat?action=top-destinations'),
      color: 'bg-blue-500',
    },
    {
      id: '2',
      title: 'Flight Search',
      description: 'Search and compare flights',
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      action: () => navigate('/chat/flights'),
      color: 'bg-green-500',
    },
    {
      id: '3',
      title: 'Budget Trips',
      description: 'Find affordable travel options',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      action: () => navigate('/chat?action=budget-trips'),
      color: 'bg-yellow-500',
    },
    {
      id: '4',
      title: 'Create Itinerary',
      description: 'AI-powered travel planning',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      action: () => navigate('/itinerary/builder'),
      color: 'bg-purple-500',
    },
    {
      id: '5',
      title: 'Hotel Recommendations',
      description: 'Find the perfect place to stay',
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      action: () => navigate('/chat?action=hotels'),
      color: 'bg-red-500',
    },
    {
      id: '6',
      title: 'Travel Packages',
      description: 'All-inclusive travel deals',
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      action: () => navigate('/packages/suggestions'),
      color: 'bg-indigo-500',
    },
  ];

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h1>
            <p className="text-lg text-gray-600">
              Choose an action to get started with your travel planning
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-200 hover:border-blue-500"
              >
                <div
                  className={`${action.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}
                >
                  {action.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Start Chat Button */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/chat')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Chat Conversation
            </motion.button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default QuickActionsPanel;

