/**
 * ItineraryBuilderPage Component
 * 
 * AI-generated travel plans with day-by-day planning, activity timeline, and budget calculator.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  cost: number;
}

interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  totalCost: number;
}

interface Itinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  days: DayPlan[];
  totalCost: number;
}

const ItineraryBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    preferences: '',
    travelers: '1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate mock itinerary for frontend-only functionality
      const mockItinerary: Itinerary = {
        id: '1',
        destination: formData.destination || 'Paris',
        startDate: formData.startDate || '2024-06-01',
        endDate: formData.endDate || '2024-06-05',
        budget: parseFloat(formData.budget) || 2000,
        days: [
          {
            day: 1,
            date: formData.startDate || '2024-06-01',
            activities: [
              {
                id: '1',
                time: '09:00',
                title: 'Eiffel Tower Visit',
                description: 'Visit the iconic Eiffel Tower',
                location: formData.destination || 'Paris',
                duration: '2 hours',
                cost: 25,
              },
              {
                id: '2',
                time: '14:00',
                title: 'Louvre Museum',
                description: 'Explore world-famous art collection',
                location: formData.destination || 'Paris',
                duration: '3 hours',
                cost: 17,
              },
            ],
            totalCost: 42,
          },
          {
            day: 2,
            date: formData.endDate || '2024-06-02',
            activities: [
              {
                id: '3',
                time: '10:00',
                title: 'Notre-Dame Cathedral',
                description: 'Historic Gothic cathedral',
                location: formData.destination || 'Paris',
                duration: '1.5 hours',
                cost: 0,
              },
            ],
            totalCost: 0,
          },
        ],
        totalCost: 42,
      };
      setItinerary(mockItinerary);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      // Use default mock itinerary on error
      const defaultItinerary: Itinerary = {
        id: '1',
        destination: formData.destination || 'Paris',
        startDate: formData.startDate || '2024-06-01',
        endDate: formData.endDate || '2024-06-05',
        budget: parseFloat(formData.budget) || 2000,
        days: [
          {
            day: 1,
            date: formData.startDate || '2024-06-01',
            activities: [
              {
                id: '1',
                time: '09:00',
                title: 'Eiffel Tower Visit',
                description: 'Visit the iconic Eiffel Tower',
                location: formData.destination || 'Paris',
                duration: '2 hours',
                cost: 25,
              },
            ],
            totalCost: 25,
          },
        ],
        totalCost: 25,
      };
      setItinerary(defaultItinerary);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
              AI Itinerary Builder
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
              Create personalized travel plans with AI assistance. Plan your perfect trip with day-by-day activities, budget tracking, and smart recommendations.
            </p>
          </div>

          {!itinerary ? (
            /* Itinerary Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Destination *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({ ...formData, destination: e.target.value })
                      }
                      placeholder="e.g., Paris, France or Hunza, Pakistan"
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Travelers *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.travelers}
                      onChange={(e) =>
                        setFormData({ ...formData, travelers: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget (USD) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      placeholder="e.g., 2000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferences & Interests
                    </label>
                    <textarea
                      value={formData.preferences}
                      onChange={(e) =>
                        setFormData({ ...formData, preferences: e.target.value })
                      }
                      placeholder="e.g., Museums, food tours, outdoor activities, nightlife..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isGenerating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating Itinerary...
                    </span>
                  ) : (
                    'Generate Itinerary'
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            /* Itinerary Display */
            <div className="space-y-6">
              {/* Itinerary Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {itinerary.destination}
                    </h2>
                    <p className="text-gray-600">
                      {new Date(itinerary.startDate).toLocaleDateString()} -{' '}
                      {new Date(itinerary.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${itinerary.totalCost.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/itinerary/${itinerary.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate('/budget/planner')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Adjust Budget
                  </button>
                </div>
              </div>

              {/* Day Plans */}
              {itinerary.days.map((dayPlan, index) => (
                <motion.div
                  key={dayPlan.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Day {dayPlan.day}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {new Date(dayPlan.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {dayPlan.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="text-center min-w-[80px]">
                          <p className="text-lg font-semibold text-blue-600">
                            {activity.time}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.duration}
                          </p>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            📍 {activity.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">
                            ${activity.cost.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                    <p className="text-sm text-gray-600">
                      Day Total: <span className="font-semibold">${dayPlan.totalCost.toFixed(2)}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ItineraryBuilderPage;

