/**
 * FlightResults Component
 * 
 * Displays flight search results with sorting options
 */

import React, { useState } from 'react';
import FlightCard from './FlightCard';
import type { Flight } from '../../services/flightService';

interface FlightResultsProps {
  flights: Flight[];
  onSortChange?: (sortBy: string) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights, onSortChange }) => {
  const [sortBy, setSortBy] = useState('price');

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    if (onSortChange) {
      onSortChange(newSort);
    }
  };

  return (
    <div>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {flights.length} {flights.length === 1 ? 'flight found' : 'flights found'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">Price per person, taxes included</p>
        </div>

        {/* Sort Options */}
        <div className="mt-4 sm:mt-0">
          <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="price">Price (ascending)</option>
            <option value="duration">Duration</option>
            <option value="departure">Departure time</option>
          </select>
        </div>
      </div>

      {/* Flight Cards */}
      <div>
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <FlightCard key={`${flight.flight_number}-${index}`} flight={flight} index={index} />
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
            <p className="text-gray-600">No flights available for selected date. Try modifying your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResults;

