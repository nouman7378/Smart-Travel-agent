/**
 * AdvancedFilters Component
 * 
 * Advanced filtering options for search results including budget range,
 * destination type, weather/season filters.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import { Building2, CloudSun, Landmark, Mountain, Snowflake, Sun, Thermometer, TreePine, Umbrella } from 'lucide-react';


interface FilterOptions {
  budgetRange: [number, number];
  destinationType: string[];
  season: string[];
  weather: string[];
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  onFiltersChange,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    budgetRange: initialFilters?.budgetRange || [0, 5000],
    destinationType: initialFilters?.destinationType || [],
    season: initialFilters?.season || [],
    weather: initialFilters?.weather || [],
  });

  const destinationTypes = [
    { id: 'mountains', label: 'Mountains', icon: <Mountain className="w-5 h-5" /> },
    { id: 'beaches', label: 'Beaches', icon: <Umbrella className="w-5 h-5" /> },
    { id: 'historical', label: 'Historical', icon: <Landmark className="w-5 h-5" /> },
    { id: 'desert', label: 'Desert', icon: <Sun className="w-5 h-5" /> },
    { id: 'cities', label: 'Cities', icon: <Building2 className="w-5 h-5" /> },
    { id: 'nature', label: 'Nature', icon: <TreePine className="w-5 h-5" /> },
  ];

  const seasons = [
    { id: 'spring', label: 'Spring', months: 'Mar-May' },
    { id: 'summer', label: 'Summer', months: 'Jun-Aug' },
    { id: 'fall', label: 'Fall', months: 'Sep-Nov' },
    { id: 'winter', label: 'Winter', months: 'Dec-Feb' },
  ];

  const weatherTypes = [
    { id: 'sunny', label: 'Sunny', icon: <Sun className="w-5 h-5" /> },
    { id: 'mild', label: 'Mild', icon: <CloudSun className="w-5 h-5" /> },
    { id: 'cool', label: 'Cool', icon: <Snowflake className="w-5 h-5" /> },
    { id: 'warm', label: 'Warm', icon: <Thermometer className="w-5 h-5" /> },
  ];

  const handleBudgetChange = (min: number, max: number) => {
    const newFilters: FilterOptions = { ...filters, budgetRange: [min, max] as [number, number] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    const currentValues = filters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    const newFilters = { ...filters, [category]: newValues };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      budgetRange: [0, 5000],
      destinationType: [],
      season: [],
      weather: [],
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800 dark:text-dark-text">
          Advanced Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
          Budget Range: ${filters.budgetRange[0]} - ${filters.budgetRange[1]}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.budgetRange[0]}
            onChange={(e) =>
              handleBudgetChange(Number(e.target.value), filters.budgetRange[1])
            }
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.budgetRange[1]}
            onChange={(e) =>
              handleBudgetChange(filters.budgetRange[0], Number(e.target.value))
            }
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$5000+</span>
          </div>
        </div>
      </div>

      {/* Destination Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
          Destination Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {destinationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleFilter('destinationType', type.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                filters.destinationType.includes(type.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
              }`}
            >
              <span className="text-xl mb-1 block">{type.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Season */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
          Best Season
        </label>
        <div className="space-y-2">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => toggleFilter('season', season.id)}
              className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                filters.season.includes(season.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 dark:text-dark-text">
                  {season.label}
                </span>
                <span className="text-xs text-gray-500">{season.months}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Weather */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-3">
          Weather Preference
        </label>
        <div className="grid grid-cols-2 gap-2">
          {weatherTypes.map((weather) => (
            <button
              key={weather.id}
              onClick={() => toggleFilter('weather', weather.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                filters.weather.includes(weather.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
              }`}
            >
              <span className="text-xl mb-1 block">{weather.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
                {weather.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;

