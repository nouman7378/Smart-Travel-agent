import React, { useState } from 'react';
import FlightCard from './FlightCard';
import type { Flight } from '../../services/flightService';
import { Plane } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-950 tracking-tight uppercase">
            {flights.length} {flights.length === 1 ? 'flight found' : 'flights found'}
          </h2>
          <p className="text-xs text-gray-700 font-semibold mt-0.5">Price per person, taxes and fees included</p>
        </div>

        {/* Sort Options */}
        <div className="flex items-center">
          <label className="text-[10px] font-black text-gray-800 mr-2.5 uppercase tracking-wider">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold text-gray-800 bg-white"
          >
            <option value="price">Price (ascending)</option>
            <option value="duration">Duration</option>
            <option value="departure">Departure time</option>
          </select>
        </div>
      </div>

      {/* Flight Cards List */}
      <div className="space-y-4">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <FlightCard key={`${flight.flight_number}-${index}`} flight={flight} index={index} />
          ))
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 border border-blue-200">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-gray-955 mb-1.5">No flights found</h3>
            <p className="text-xs text-gray-700 font-semibold">We couldn't find any flights for the selected date. Try modifying your search filters or dates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightResults;
