/**
 * BusRoutesPage Component
 * 
 * Display local bus/transport routes.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface BusRoute {
  id: string;
  routeNumber: string;
  name: string;
  from: string;
  to: string;
  duration: string;
  frequency: string;
  price: number;
  stops: string[];
  operatingHours: {
    start: string;
    end: string;
  };
}

const BusRoutesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [routes] = useState<BusRoute[]>([
    {
      id: '1',
      routeNumber: '101',
      name: 'City Center Express',
      from: 'Central Station',
      to: 'Airport Terminal',
      duration: '45 minutes',
      frequency: 'Every 15 minutes',
      price: 2.5,
      stops: [
        'Central Station',
        'Downtown Mall',
        'University Campus',
        'Shopping District',
        'Airport Terminal',
      ],
      operatingHours: {
        start: '05:00',
        end: '23:00',
      },
    },
    {
      id: '2',
      routeNumber: '202',
      name: 'Beach Route',
      from: 'City Center',
      to: 'Beach Resort',
      duration: '30 minutes',
      frequency: 'Every 20 minutes',
      price: 1.8,
      stops: [
        'City Center',
        'Harbor View',
        'Marina Bay',
        'Beach Resort',
      ],
      operatingHours: {
        start: '06:00',
        end: '22:00',
      },
    },
    {
      id: '3',
      routeNumber: '303',
      name: 'Historic District Line',
      from: 'Main Square',
      to: 'Old Town',
      duration: '25 minutes',
      frequency: 'Every 30 minutes',
      price: 1.5,
      stops: [
        'Main Square',
        'Cathedral',
        'Museum District',
        'Old Town',
      ],
      operatingHours: {
        start: '07:00',
        end: '21:00',
      },
    },
  ]);

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.routeNumber.includes(searchQuery)
  );

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Bus Routes & Public Transport
            </h1>
            <p className="text-lg text-gray-600">
              Find local bus routes and transportation options
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by route number, name, or destination..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Routes List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Routes List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredRoutes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <p className="text-gray-600">No routes found</p>
                </div>
              ) : (
                filteredRoutes.map((route, index) => (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedRoute(route)}
                    className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow border-2 ${
                      selectedRoute?.id === route.id
                        ? 'border-blue-500'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold">
                            {route.routeNumber}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {route.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{route.from}</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                          <span>{route.to}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          ${route.price}
                        </p>
                        <p className="text-xs text-gray-500">per ride</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-800">
                          {route.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Frequency</p>
                        <p className="font-semibold text-gray-800">
                          {route.frequency}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Operating Hours</p>
                        <p className="font-semibold text-gray-800">
                          {route.operatingHours.start} - {route.operatingHours.end}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Stops</p>
                        <p className="font-semibold text-gray-800">
                          {route.stops.length} stops
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Route Details Sidebar */}
            <div className="lg:col-span-1">
              {selectedRoute ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6 sticky top-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Route Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Route {selectedRoute.routeNumber}: {selectedRoute.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <span>{selectedRoute.from}</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                        <span>{selectedRoute.to}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-700 mb-3">
                        Stops ({selectedRoute.stops.length})
                      </h4>
                      <ol className="space-y-2">
                        {selectedRoute.stops.map((stop, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-xs">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{stop}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-gray-800">
                          ${selectedRoute.price}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold text-gray-800">
                          {selectedRoute.duration}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-semibold text-gray-800">
                          {selectedRoute.frequency}
                        </span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Get Directions
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <p className="text-gray-600">
                    Select a route to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BusRoutesPage;

