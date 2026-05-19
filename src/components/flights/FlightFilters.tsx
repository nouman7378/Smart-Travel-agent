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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-6">
      <h3 className="text-sm font-black text-gray-950 uppercase tracking-wider pb-3 border-b border-gray-100 flex items-center justify-between">
        <span>⚙️ FILTERS</span>
      </h3>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold text-gray-950 uppercase tracking-wide mb-3">
          Price: PKR {(filters.priceRange[0] * 300).toLocaleString()} - PKR {(filters.priceRange[1] * 300).toLocaleString()}
        </label>
        <input
          type="range"
          min="0"
          max="2000"
          value={filters.priceRange[1]}
          onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] text-gray-700 font-bold uppercase tracking-wider mt-1.5">
          <span>PKR 0</span>
          <span>PKR 600,000+</span>
        </div>
      </div>

      {/* Stops */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-[11px] font-bold text-gray-950 uppercase tracking-wider mb-3">Stops</h4>
        <div className="space-y-2">
          {stops.map((stop) => (
            <label key={stop} className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.stops.includes(stop)}
                onChange={() => toggleStop(stop)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-2.5 text-xs font-bold text-gray-800">{stop}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-[11px] font-bold text-gray-950 uppercase tracking-wider mb-3">Airlines</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {airlines.map((airline) => (
            <label key={airline} className="flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={() => toggleAirline(airline)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-2.5 text-xs font-bold text-gray-800">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-[11px] font-bold text-gray-955 uppercase tracking-wider mb-3">Departure time</h4>
        <select
          value={filters.departureTime}
          onChange={(e) => handleFilterChange('departureTime', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold text-gray-800 bg-white"
        >
          <option value="">All times</option>
          <option value="morning">Morning (6am - 12pm)</option>
          <option value="afternoon">Afternoon (12pm - 6pm)</option>
          <option value="evening">Evening (6pm - 12am)</option>
          <option value="night">Night (12am - 6am)</option>
        </select>
      </div>

      {/* Flight Duration */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-[11px] font-bold text-gray-955 uppercase tracking-wider mb-3">Flight duration</h4>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange('duration', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold text-gray-800 bg-white"
        >
          <option value="">All durations</option>
          <option value="short">Short (&lt; 3h)</option>
          <option value="medium">Medium (3h - 6h)</option>
          <option value="long">Long (&gt; 6h)</option>
        </select>
      </div>

      {/* Options */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-[11px] font-bold text-gray-955 uppercase tracking-wider mb-3">Options</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.refundable}
              onChange={(e) => handleFilterChange('refundable', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <span className="ml-2.5 text-xs font-bold text-gray-800">Refundable</span>
          </label>
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.flexible}
              onChange={(e) => handleFilterChange('flexible', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <span className="ml-2.5 text-xs font-bold text-gray-800">Flexible dates</span>
          </label>
        </div>
      </div>

      {/* Clear Filters Button - 8px radius */}
      <motion.button
        type="button"
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
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full mt-4 px-4 py-2.5 text-xs font-extrabold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors uppercase tracking-wider"
      >
        Reset filters
      </motion.button>
    </div>
  );
};

export default FlightFilters;
