/**
 * CityAutocomplete Component
 * 
 * An autocomplete input for selecting cities/airports with IATA codes.
 * Fetches matching cities from the backend API as the user types.
 * Displays city name, IATA code, airport name, and country.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_PREFIX } from '../../config/env.config';

export interface City {
  id: number;
  name: string;
  iata_code: string;
  airport_name: string;
  country: string;
  country_code: string;
  display_name: string;
  full_display: string;
}

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string, city: City | null) => void;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  required?: boolean;
  name?: string;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  value,
  onChange,
  placeholder = 'City or airport',
  label,
  icon,
  required = false,
  name,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Fetch cities from API
  const fetchCities = useCallback(async (query: string) => {
    if (query.length < 2) {
      setCities([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_PREFIX}/cities/search/?query=${encodeURIComponent(query)}&limit=10`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      
      const data = await response.json();
      if (data.success) {
        setCities(data.results);
        setIsOpen(data.results.length > 0);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Don't search if user just selected a city
    if (selectedCity && inputValue === selectedCity.display_name) {
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchCities(inputValue);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue, fetchCities, selectedCity]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // If user clears input or changes it significantly, clear selection
    if (selectedCity && newValue !== selectedCity.display_name) {
      setSelectedCity(null);
      onChange(newValue, null);
    } else {
      onChange(newValue, selectedCity);
    }
    
    setHighlightedIndex(-1);
  };

  // Handle city selection
  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    setInputValue(city.display_name);
    onChange(city.display_name, city);
    setIsOpen(false);
    setCities([]);
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || cities.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < cities.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < cities.length) {
          handleSelectCity(cities[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle input focus
  const handleFocus = () => {
    if (cities.length > 0 && inputValue.length >= 2) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg z-10">
            {icon}
          </span>
        )}
        
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-10 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200`}
          autoComplete="off"
        />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {/* Clear button */}
        {!isLoading && inputValue && (
          <button
            type="button"
            onClick={() => {
              setInputValue('');
              setSelectedCity(null);
              onChange('', null);
              setCities([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && cities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto"
          >
            {cities.map((city, index) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleSelectCity(city)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full px-4 py-3 text-left transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                  index === highlightedIndex
                    ? 'bg-blue-50 border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 truncate">
                        {city.name}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                        {city.iata_code}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 truncate mt-0.5">
                      {city.airport_name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {city.country}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results message */}
      <AnimatePresence>
        {isOpen && !isLoading && inputValue.length >= 2 && cities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center"
          >
            <p className="text-gray-500">No cities or airports found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CityAutocomplete;