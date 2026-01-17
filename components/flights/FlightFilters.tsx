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
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filtres</h3>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Prix: €{filters.priceRange[0]} - €{filters.priceRange[1]}
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
          <span>€0</span>
          <span>€2000+</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Escales</h4>
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
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Compagnies aériennes</h4>
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
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Heure de départ</h4>
        <select
          value={filters.departureTime}
          onChange={(e) => handleFilterChange('departureTime', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Toutes les heures</option>
          <option value="morning">Matin (6h - 12h)</option>
          <option value="afternoon">Après-midi (12h - 18h)</option>
          <option value="evening">Soir (18h - 24h)</option>
          <option value="night">Nuit (0h - 6h)</option>
        </select>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Durée du vol</h4>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange('duration', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">Toutes les durées</option>
          <option value="short">Court (&lt; 3h)</option>
          <option value="medium">Moyen (3h - 6h)</option>
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
            <span className="ml-2 text-sm text-gray-700">Remboursable</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.flexible}
              onChange={(e) => handleFilterChange('flexible', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Dates flexibles</span>
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
        Réinitialiser les filtres
      </motion.button>
    </div>
  );
};

export default FlightFilters;

