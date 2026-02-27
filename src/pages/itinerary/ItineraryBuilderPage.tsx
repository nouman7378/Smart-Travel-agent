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
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen relative overflow-hidden">
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
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-40 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, -50, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-40 left-1/4 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 30, 0], x: [0, 40, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"
          />
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          {/* Premium Header */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-10 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              AI Itinerary Builder
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow-md">
              Create personalized travel plans with AI assistance. Plan your perfect trip with day-by-day activities, budget tracking, and smart recommendations.
            </p>
          </motion.div>

          {!itinerary ? (
            /* Premium Itinerary Form */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 p-8 sm:p-10 lg:p-12 relative overflow-hidden"
            >
              {/* Gradient Border Top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Destination Input */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Destination *
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({ ...formData, destination: e.target.value })
                      }
                      placeholder="e.g., Paris, France or Hunza, Pakistan"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-400 hover:bg-white hover:border-gray-200"
                    />
                  </motion.div>

                  {/* Travelers Input */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Number of Travelers *
                      </span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.travelers}
                      onChange={(e) =>
                        setFormData({ ...formData, travelers: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-800 hover:bg-white hover:border-gray-200"
                    />
                  </motion.div>

                  {/* Start Date */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Start Date *
                      </span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-gray-800 hover:bg-white hover:border-gray-200"
                    />
                  </motion.div>

                  {/* End Date */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        End Date *
                      </span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-800 hover:bg-white hover:border-gray-200"
                    />
                  </motion.div>

                  {/* Budget */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="md:col-span-2 relative"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Budget (USD) *
                      </span>
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
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800 placeholder-gray-400 hover:bg-white hover:border-gray-200"
                    />
                  </motion.div>

                  {/* Preferences */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="md:col-span-2 relative"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Preferences & Interests
                      </span>
                    </label>
                    <textarea
                      value={formData.preferences}
                      onChange={(e) =>
                        setFormData({ ...formData, preferences: e.target.value })
                      }
                      placeholder="e.g., Museums, food tours, outdoor activities, nightlife..."
                      rows={4}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-gray-800 placeholder-gray-400 hover:bg-white hover:border-gray-200 resize-none"
                    />
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    disabled={isGenerating}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isGenerating ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                        />
                        <span>Generating Your Perfect Trip...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Generate Itinerary</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          ) : (
            /* Premium Itinerary Display - SS02 Inspired */
            <div className="space-y-8">
              {/* Trip Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                
                {/* Hero Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.h2 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl sm:text-4xl font-bold mb-2"
                    >
                      {itinerary.destination}
                    </motion.h2>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/90 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(itinerary.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(itinerary.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </motion.p>
                  </div>
                  
                  {/* Floating Budget Badge */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-lg"
                  >
                    <p className="text-xs text-gray-500 font-medium">Total Budget</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${itinerary.totalCost.toLocaleString()}
                    </p>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/itinerary/${itinerary.id}`)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/budget/planner')}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Adjust Budget
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setItinerary(null)}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    New Itinerary
                  </motion.button>
                </div>
              </motion.div>

              {/* Day Plans - Timeline Style */}
              <div className="space-y-6">
                {itinerary.days.map((dayPlan, index) => (
                  <motion.div
                    key={dayPlan.day}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/80 overflow-hidden"
                  >
                    {/* Day Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <span className="text-2xl font-bold">{dayPlan.day}</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              Day {dayPlan.day}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(dayPlan.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Day Total</p>
                          <p className="text-xl font-bold text-purple-600">${dayPlan.totalCost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Activities Timeline */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {dayPlan.activities.map((activity, actIndex) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * actIndex }}
                            className="flex gap-4 p-4 bg-gradient-to-r from-gray-50/50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                          >
                            {/* Time Column */}
                            <div className="flex flex-col items-center min-w-[70px]">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <p className="mt-2 text-sm font-bold text-gray-800">{activity.time}</p>
                              <p className="text-xs text-gray-400">{activity.duration}</p>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-800 text-lg mb-1">
                                {activity.title}
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">
                                {activity.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {activity.location}
                                </span>
                              </div>
                            </div>
                            
                            {/* Cost */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                ${activity.cost.toLocaleString()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ItineraryBuilderPage;

