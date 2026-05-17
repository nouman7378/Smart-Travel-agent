/**
 * FlightSearchPage Component
 * 
 * Search and display flights from API integration.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import DatePicker from '../../components/common/DatePicker';

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
}

const FlightSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    class: 'economy',
  });
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock flight data
      setFlights([
        {
          id: '1',
          airline: 'Air France',
          flightNumber: 'AF123',
          departure: {
            airport: 'CDG',
            city: 'Paris',
            time: '08:00',
            date: searchParams.departureDate || '2024-06-01',
          },
          arrival: {
            airport: 'JFK',
            city: 'New York',
            time: '11:30',
            date: searchParams.departureDate || '2024-06-01',
          },
          duration: '8h 30m',
          price: 650,
          stops: 0,
          aircraft: 'Boeing 777',
        },
        {
          id: '2',
          airline: 'Delta Airlines',
          flightNumber: 'DL456',
          departure: {
            airport: 'CDG',
            city: 'Paris',
            time: '14:30',
            date: searchParams.departureDate || '2024-06-01',
          },
          arrival: {
            airport: 'JFK',
            city: 'New York',
            time: '18:00',
            date: searchParams.departureDate || '2024-06-01',
          },
          duration: '8h 30m',
          price: 720,
          stops: 0,
          aircraft: 'Airbus A350',
        },
        {
          id: '3',
          airline: 'Lufthansa',
          flightNumber: 'LH789',
          departure: {
            airport: 'CDG',
            city: 'Paris',
            time: '10:15',
            date: searchParams.departureDate || '2024-06-01',
          },
          arrival: {
            airport: 'JFK',
            city: 'New York',
            time: '15:45',
            date: searchParams.departureDate || '2024-06-01',
          },
          duration: '9h 30m',
          price: 580,
          stops: 1,
          aircraft: 'Boeing 787',
        },
      ]);
    } catch (error) {
      console.error('Error searching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
              Flight Search
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Find the best flights for your trip. Compare prices, airlines, and routes.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 mb-8 border border-gray-100">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <input
                    type="text"
                    required
                    value={searchParams.from}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, from: e.target.value })
                    }
                    placeholder="City or Airport"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    required
                    value={searchParams.to}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, to: e.target.value })
                    }
                    placeholder="City or Airport"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date
                  </label>
                  <DatePicker
                    value={searchParams.departureDate}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        departureDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date (Optional)
                  </label>
                  <DatePicker
                    value={searchParams.returnDate}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        returnDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passengers
                  </label>
                  <select
                    value={searchParams.passengers}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        passengers: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class
                  </label>
                  <select
                    value={searchParams.class}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        class: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Searching...
                  </span>
                ) : (
                  'Search Flights'
                )}
              </motion.button>
            </form>
          </div>

          {/* Flight Results */}
          {flights.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Available Flights ({flights.length})
              </h2>
              {flights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-800">
                            {flight.departure.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            {flight.departure.airport}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight.departure.city}
                          </p>
                        </div>

                        <div className="flex-1 px-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 h-0.5 bg-gray-300"></div>
                            <span className="text-xs text-gray-500">
                              {flight.duration}
                            </span>
                            <div className="flex-1 h-0.5 bg-gray-300"></div>
                          </div>
                          <p className="text-xs text-center text-gray-500">
                            {flight.stops === 0
                              ? 'Direct'
                              : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                          </p>
                        </div>

                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-800">
                            {flight.arrival.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            {flight.arrival.airport}
                          </p>
                          <p className="text-xs text-gray-500">
                            {flight.arrival.city}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{flight.airline}</span>
                        <span>•</span>
                        <span>{flight.flightNumber}</span>
                        <span>•</span>
                        <span>{flight.aircraft}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <p className="text-3xl font-bold text-blue-600">
                        ${flight.price}
                      </p>
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Select
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && flights.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600">
                Enter your search criteria and click "Search Flights" to find
                available flights.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default FlightSearchPage;

