/**
 * PackageSearchFilters Component
 * 
 * This component is part of the Expedia.fr Packages Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Destination search
 * - Check-in / Check-out dates
 * - Guests selection
 * - Price range filter
 * - Star rating filter
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import DatePicker from './common/DatePicker';


export interface PackageFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  priceRange: [number, number];
  starRating: number[];
  packageType: string[];
}

interface PackageSearchFiltersProps {
  filters: PackageFilters;
  onFiltersChange: (filters: PackageFilters) => void;
  /** Package types present in loaded catalog (dynamic checkboxes) */
  availablePackageTypes?: string[];
  priceMax?: number;
  className?: string;
}

const DEFAULT_PACKAGE_TYPES = [
  'Beach', 'City Break', 'Adventure', 'Romantic', 'Family', 'Luxury', 'Cultural', 'Wellness',
];

const PackageSearchFilters: React.FC<PackageSearchFiltersProps> = ({
  filters,
  onFiltersChange,
  availablePackageTypes,
  priceMax = 500000,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['search', 'price']);

  const packageTypes =
    availablePackageTypes && availablePackageTypes.length > 0
      ? availablePackageTypes
      : DEFAULT_PACKAGE_TYPES;

  const updateFilters = (newFilters: Partial<PackageFilters>) => {
    const updated = { ...filters, ...newFilters };
    onFiltersChange(updated);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleStarRatingToggle = (rating: number) => {
    const newRatings = filters.starRating.includes(rating)
      ? filters.starRating.filter((r) => r !== rating)
      : [...filters.starRating, rating];
    updateFilters({ starRating: newRatings });
  };

  const handlePackageTypeToggle = (type: string) => {
    const newTypes = filters.packageType.includes(type)
      ? filters.packageType.filter((t) => t !== type)
      : [...filters.packageType, type];
    updateFilters({ packageType: newTypes });
  };

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
      {/* Search Section */}
      <FilterSection title="Search" sectionKey="search">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <input
              type="text"
              value={filters.destination}
              onChange={(e) => updateFilters({ destination: e.target.value })}
              placeholder="City, hotel, or landmark"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <DatePicker
                compact
                value={filters.checkIn}
                onChange={(e) => updateFilters({ checkIn: e.target.value })}
              />
            </div>
            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <DatePicker
                compact
                value={filters.checkOut}
                onChange={(e) => updateFilters({ checkOut: e.target.value })}
                minDate={filters.checkIn || undefined}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
              <select
                value={filters.adults}
                onChange={(e) => updateFilters({ adults: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
              <select
                value={filters.children}
                onChange={(e) => updateFilters({ children: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Search Packages
          </button>
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>PKR {filters.priceRange[0].toLocaleString()}</span>
            <span>PKR {filters.priceRange[1].toLocaleString()}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={0}
              max={priceMax}
              step={5000}
              value={Math.min(filters.priceRange[0], priceMax)}
              onChange={(e) =>
                updateFilters({
                  priceRange: [
                    Math.min(Number(e.target.value), filters.priceRange[1]),
                    filters.priceRange[1],
                  ],
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input
              type="range"
              min={0}
              max={priceMax}
              step={5000}
              value={Math.min(filters.priceRange[1], priceMax)}
              onChange={(e) =>
                updateFilters({
                  priceRange: [
                    filters.priceRange[0],
                    Math.max(Number(e.target.value), filters.priceRange[0]),
                  ],
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
            />
          </div>
        </div>
      </FilterSection>

      {/* Star Rating */}
      <FilterSection title="Hotel Star Rating" sectionKey="starRating">
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.starRating.includes(rating)}
                onChange={() => handleStarRatingToggle(rating)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                {[...Array(rating)].map((_, i) => (
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

      {/* Package Type */}
      <FilterSection title="Package Type" sectionKey="packageType">
        <div className="space-y-2">
          {packageTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.packageType.includes(type)}
                onChange={() => handlePackageTypeToggle(type)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                {type}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      <div className="pt-4">
        <button
          onClick={() => {
            const resetFilters: PackageFilters = {
              destination: '',
              checkIn: '',
              checkOut: '',
              adults: 2,
              children: 0,
              priceRange: [0, priceMax],
              starRating: [],
              packageType: [],
            };
            onFiltersChange(resetFilters);
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
          <span className="font-semibold text-gray-900">Search & Filters</span>
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
        <h2 className="text-xl font-bold text-gray-900 mb-6 hidden lg:block">Search & Filters</h2>
        {filterContent}
      </div>
    </aside>
  );
};

export default PackageSearchFilters;

