/**
 * FlightSearchBar Component
 * 
 * Expedia.fr-style flight search form with tabs and inputs
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type TripType = 'round-trip' | 'one-way' | 'multi-city';

interface FlightSearchBarProps {
  onSearch?: (searchData: any) => void;
}

const FlightSearchBar: React.FC<FlightSearchBarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'passengers' ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ ...formData, tripType });
    } else {
      navigate('/search/flights', { state: { ...formData, tripType } });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'round-trip' as TripType, label: 'Round trip' },
          { id: 'one-way' as TripType, label: 'One way' },
          { id: 'multi-city' as TripType, label: 'Multi-city' },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setTripType(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${
              tripType === tab.id
                ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* From */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">✈️</span>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleInputChange}
                placeholder="City or airport"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* To */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">🎯</span>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                placeholder="City or airport"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                required
              />
            </div>
          </div>

          {/* Dates and Passengers Row */}
          <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Depart Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
              <input
                type="date"
                name="departDate"
                value={formData.departDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            {/* Return Date - Only show for round-trip */}
            {tripType === 'round-trip' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Passengers and Class */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'passenger' : 'passengers'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Search for flights
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightSearchBar;

