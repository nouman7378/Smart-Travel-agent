/**
 * SearchFilters Component
 * 
 * This component is part of the Expedia.fr Search Results Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Filter by price, stars, rating, amenities
 * - Collapsible sections for mobile
 * - Styled checkboxes, sliders, and dropdowns
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';


interface SearchFiltersProps {
  searchType: 'hotels' | 'flights' | 'cars';
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  stars: number[];
  rating: number;
  amenities: string[];
  airline?: string[];
  carType?: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchType,
  className = '',
  onFilterChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['price', 'rating']);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    stars: [],
    rating: 0,
    amenities: [],
    airline: [],
    carType: [],
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handlePriceChange = (min: number, max: number) => {
    const newFilters: FilterState = { ...filters, priceRange: [min, max] as [number, number] };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleStarToggle = (star: number) => {
    const newStars = filters.stars.includes(star)
      ? filters.stars.filter((s) => s !== star)
      : [...filters.stars, star];
    const newFilters = { ...filters, stars: newStars };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleRatingChange = (rating: number) => {
    const newFilters = { ...filters, rating };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const amenities = [
    'Free WiFi',
    'Swimming Pool',
    'Parking',
    'Air Conditioning',
    'Pet Friendly',
    'Breakfast Included',
    'Gym',
    'Spa',
  ];

  const airlines = ['Air France', 'Lufthansa', 'British Airways', 'Emirates', 'KLM', 'Ryanair'];
  const carTypes = ['Economy', 'Compact', 'Mid-size', 'Full-size', 'SUV', 'Luxury'];

  const FilterSection: React.FC<{
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }> = ({ title, sectionKey, children }) => {
    const isExpanded = expandedSections.includes(sectionKey);
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
          <svg
            className={`h-5 w-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && <div className="mt-4">{children}</div>}
      </div>
    );
  };

  const filterContent = (
    <div className="space-y-2">
      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
            />
          </div>
        </div>
      </FilterSection>

      {/* Star Rating - Hotels only */}
      {searchType === 'hotels' && (
        <FilterSection title="Star Rating" sectionKey="stars">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <label key={star} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.stars.includes(star)}
                  onChange={() => handleStarToggle(star)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                  {[...Array(star)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      <Star className="inline w-5 h-5" />
                    </span>
                  ))}
                  <span className="text-gray-400 ml-1">and up</span>
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Guest Rating */}
      <FilterSection title="Guest Rating" sectionKey="rating">
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                {rating}+ Excellent
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Amenities - Hotels only */}
      {searchType === 'hotels' && (
        <FilterSection title="Amenities" sectionKey="amenities">
          <div className="space-y-2">
            {amenities.map((amenity) => (
              <label key={amenity} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                  {amenity}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Airline - Flights only */}
      {searchType === 'flights' && (
        <FilterSection title="Airline" sectionKey="airline">
          <div className="space-y-2">
            {airlines.map((airline) => (
              <label key={airline} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.airline?.includes(airline) || false}
                  onChange={() => {
                    const newAirlines = filters.airline?.includes(airline)
                      ? filters.airline.filter((a) => a !== airline)
                      : [...(filters.airline || []), airline];
                    const newFilters = { ...filters, airline: newAirlines };
                    setFilters(newFilters);
                    onFilterChange?.(newFilters);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                  {airline}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Car Type - Cars only */}
      {searchType === 'cars' && (
        <FilterSection title="Car Type" sectionKey="carType">
          <div className="space-y-2">
            {carTypes.map((type) => (
              <label key={type} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.carType?.includes(type) || false}
                  onChange={() => {
                    const newCarTypes = filters.carType?.includes(type)
                      ? filters.carType.filter((t) => t !== type)
                      : [...(filters.carType || []), type];
                    const newFilters = { ...filters, carType: newCarTypes };
                    setFilters(newFilters);
                    onFilterChange?.(newFilters);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Clear Filters Button */}
      <div className="pt-4">
        <button
          onClick={() => {
            const resetFilters: FilterState = {
              priceRange: [0, 1000],
              stars: [],
              rating: 0,
              amenities: [],
              airline: [],
              carType: [],
            };
            setFilters(resetFilters);
            onFilterChange?.(resetFilters);
          }}
          className="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <aside className={className}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          <span className="font-semibold text-gray-900">Filters</span>
          <svg
            className={`h-5 w-5 text-gray-500 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters Content */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } lg:block bg-white rounded-lg shadow-md p-4 md:p-6`}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 hidden lg:block">Filters</h2>
        {filterContent}
      </div>
    </aside>
  );
};

export default SearchFilters;

