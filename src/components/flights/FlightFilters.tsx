/**
 * FlightFilters Component
 * 
 * Sidebar filters for flight search results (Expedia.fr style)
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlightFiltersProps {
  onFilterChange?: (filters: any) => void;
}

const FlightFilters: React.FC<FlightFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    stops: [] as string[],
    airlines: [] as string[],
    departureTime: '',
    arrivalTime: '',
    duration: '',
    refundable: false,
    flexible: false,
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const toggleStop = (stop: string) => {
    const newStops = filters.stops.includes(stop)
      ? filters.stops.filter((s) => s !== stop)
      : [...filters.stops, stop];
    handleFilterChange('stops', newStops);
  };

  const toggleAirline = (airline: string) => {
    const newAirlines = filters.airlines.includes(airline)
      ? filters.airlines.filter((a) => a !== airline)
      : [...filters.airlines, airline];
    handleFilterChange('airlines', newAirlines);
  };

  const airlines = ['Air France', 'Lufthansa', 'British Airways', 'KLM', 'Emirates', 'Turkish Airlines'];
  const stops = ['Nonstop', '1 stop', '2+ stops'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Price: PKR {filters.priceRange[0] * 300} - PKR {filters.priceRange[1] * 300}
        </label>
        <input
          type="range"
          min="0"
          max="2000"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>PKR 0</span>
          <span>PKR 600,000+</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Stops</h4>
        <div className="space-y-2">
          {stops.map((stop) => (
            <label key={stop} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.stops.includes(stop)}
                onChange={() => toggleStop(stop)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{stop}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Airlines</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {airlines.map((airline) => (
            <label key={airline} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Departure time</h4>
        <select
          value={filters.departureTime}
          onChange={(e) => handleFilterChange('departureTime', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">All times</option>
          <option value="morning">Morning (6am - 12pm)</option>
          <option value="afternoon">Afternoon (12pm - 6pm)</option>
          <option value="evening">Evening (6pm - 12am)</option>
          <option value="night">Night (12am - 6am)</option>
        </select>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Flight duration</h4>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange('duration', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">All durations</option>
          <option value="short">Short (&lt; 3h)</option>
          <option value="medium">Medium (3h - 6h)</option>
          <option value="long">Long (&gt; 6h)</option>
        </select>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Options</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.refundable}
              onChange={(e) => handleFilterChange('refundable', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Refundable</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.flexible}
              onChange={(e) => handleFilterChange('flexible', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Flexible dates</span>
          </label>
        </div>
      </div>

      {/* Clear Filters Button */}
      <motion.button
        onClick={() => {
          const resetFilters = {
            priceRange: [0, 2000],
            stops: [],
            airlines: [],
            departureTime: '',
            arrivalTime: '',
            duration: '',
            refundable: false,
            flexible: false,
          };
          setFilters(resetFilters);
          if (onFilterChange) {
            onFilterChange(resetFilters);
          }
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Reset filters
      </motion.button>
    </div>
  );
};

export default FlightFilters;

