/**
 * ItineraryDetailPage Component
 * 
 * Detailed itinerary for each day with hotel & transport options.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import { fetchItinerary, Itinerary, DayPlan } from '../../services/itineraryService';
import { MapPin } from 'lucide-react';


const ItineraryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    const loadItinerary = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await fetchItinerary(id);
        setItinerary(data);
        if (data.days && data.days.length > 0) {
          setSelectedDay(data.days[0].day);
        }
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItinerary();
  }, [id]);

  if (loading) {
    return (
      <PageLayout skipHeaderFooter={true}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading itinerary details...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!itinerary) {
    return (
      <PageLayout skipHeaderFooter={true}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Itinerary not found</p>
            <button
              onClick={() => navigate('/itinerary/builder')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create New Itinerary
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const currentDay: DayPlan | undefined =
    itinerary.days.find(
      (day) => day.day === (selectedDay ?? itinerary.days[0]?.day)
    ) || itinerary.days[0];

  const effectiveSelectedDay = currentDay.day;

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/itinerary/builder')}
              className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Itinerary
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {itinerary.destination} - Day {effectiveSelectedDay}
            </h1>
            <p className="text-lg text-gray-600">
              {new Date(currentDay.date).toLocaleDateString()}
            </p>
          </div>

          {/* Day Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {itinerary.days.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  selectedDay === day.day
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          {/* Activities Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Activities
            </h2>
            <div className="space-y-4">
              {currentDay.activities.map((activity) => (
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
                      <MapPin className="inline w-5 h-5" /> {activity.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      PKR {activity.cost.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional hotel and transport recommendations can be integrated here
              by combining the itinerary with live hotel/flight search results. */}
        </div>
      </div>
    </PageLayout>
  );
};

export default ItineraryDetailPage;

