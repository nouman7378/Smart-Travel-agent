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

interface HotelOption {
  id: string;
  name: string;
  rating: number;
  price: number;
  location: string;
  amenities: string[];
  imageUrl: string;
}

interface TransportOption {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car';
  name: string;
  price: number;
  duration: string;
  departure: string;
  arrival: string;
}

interface DayDetail {
  day: number;
  date: string;
  hotelOptions: HotelOption[];
  transportOptions: TransportOption[];
  activities: Array<{
    id: string;
    time: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    cost: number;
  }>;
}

const ItineraryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dayDetail, setDayDetail] = useState<DayDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    // Fetch itinerary details
    const fetchDetails = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        setDayDetail({
          day: selectedDay,
          date: '2024-06-01',
          hotelOptions: [
            {
              id: '1',
              name: 'Grand Hotel Paris',
              rating: 4.5,
              price: 150,
              location: 'Champs-Élysées, Paris',
              amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
              imageUrl: 'https://via.placeholder.com/300x200',
            },
            {
              id: '2',
              name: 'Boutique Hotel Montmartre',
              rating: 4.2,
              price: 120,
              location: 'Montmartre, Paris',
              amenities: ['WiFi', 'Breakfast', 'Bar'],
              imageUrl: 'https://via.placeholder.com/300x200',
            },
          ],
          transportOptions: [
            {
              id: '1',
              type: 'train',
              name: 'TGV High-Speed Train',
              price: 45,
              duration: '2h 15m',
              departure: '08:00',
              arrival: '10:15',
            },
            {
              id: '2',
              type: 'flight',
              name: 'Air France',
              price: 120,
              duration: '1h 30m',
              departure: '09:00',
              arrival: '10:30',
            },
          ],
          activities: [
            {
              id: '1',
              time: '09:00',
              title: 'Eiffel Tower Visit',
              description: 'Visit the iconic Eiffel Tower',
              location: 'Champ de Mars, Paris',
              duration: '2 hours',
              cost: 25,
            },
            {
              id: '2',
              time: '14:00',
              title: 'Louvre Museum',
              description: 'Explore world-famous art collection',
              location: 'Rue de Rivoli, Paris',
              duration: '3 hours',
              cost: 17,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, selectedDay]);

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

  if (!dayDetail) {
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
              Day {dayDetail.day} Details
            </h1>
            <p className="text-lg text-gray-600">
              {new Date(dayDetail.date).toLocaleDateString()}
            </p>
          </div>

          {/* Day Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Day {day}
              </button>
            ))}
          </div>

          {/* Activities Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Activities
            </h2>
            <div className="space-y-4">
              {dayDetail.activities.map((activity) => (
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
          </div>

          {/* Hotel Options */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Hotel Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dayDetail.hotelOptions.map((hotel) => (
                <motion.div
                  key={hotel.id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold">
                          {hotel.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      📍 {hotel.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hotel.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-blue-600">
                        ${hotel.price}
                        <span className="text-sm font-normal text-gray-600">
                          /night
                        </span>
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Book
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Transport Options */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Transport Options
            </h2>
            <div className="space-y-4">
              {dayDetail.transportOptions.map((transport) => (
                <div
                  key={transport.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {transport.type === 'flight' && '✈️'}
                      {transport.type === 'train' && '🚄'}
                      {transport.type === 'bus' && '🚌'}
                      {transport.type === 'car' && '🚗'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {transport.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {transport.departure} - {transport.arrival} ({transport.duration})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xl font-bold text-gray-800">
                      ${transport.price}
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ItineraryDetailPage;

