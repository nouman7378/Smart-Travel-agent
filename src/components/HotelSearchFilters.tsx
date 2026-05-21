/**
 * HotelSearchFilters — dynamic sidebar filters for the Hotels page
 */

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import DatePicker from './common/DatePicker';

/** Same height as compact DatePicker (h-11) */
const FILTER_FIELD_CLASS =
  'w-full h-11 min-h-[44px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white text-sm';

export interface HotelFilters {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceRange: [number, number];
  starRating: number[];
  minRating: number;
}

interface HotelSearchFiltersProps {
  filters: HotelFilters;
  onFiltersChange: (filters: HotelFilters) => void;
  priceMax?: number;
  className?: string;
}

const HotelSearchFilters: React.FC<HotelSearchFiltersProps> = ({
  filters,
  onFiltersChange,
  priceMax = 100000,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['search', 'price', 'stars']);

  const updateFilters = (partial: Partial<HotelFilters>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleStarToggle = (rating: number) => {
    const next = filters.starRating.includes(rating)
      ? filters.starRating.filter((r) => r !== rating)
      : [...filters.starRating, rating];
    updateFilters({ starRating: next });
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
          type="button"
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
      <FilterSection title="Search" sectionKey="search">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
            <input
              type="text"
              value={filters.destination}
              onChange={(e) => updateFilters({ destination: e.target.value })}
              placeholder="City, hotel, or area"
              className={FILTER_FIELD_CLASS}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
            <select
              value={filters.guests}
              onChange={(e) => updateFilters({ guests: Number(e.target.value) })}
              className={FILTER_FIELD_CLASS}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Price Range (PKR)" sectionKey="price">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>PKR {filters.priceRange[0].toLocaleString()}</span>
            <span>PKR {filters.priceRange[1].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={priceMax}
            step={1000}
            value={Math.min(filters.priceRange[0], priceMax)}
            onChange={(e) =>
              updateFilters({
                priceRange: [Math.min(Number(e.target.value), filters.priceRange[1]), filters.priceRange[1]],
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <input
            type="range"
            min={0}
            max={priceMax}
            step={1000}
            value={Math.min(filters.priceRange[1], priceMax)}
            onChange={(e) =>
              updateFilters({
                priceRange: [filters.priceRange[0], Math.max(Number(e.target.value), filters.priceRange[0])],
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </FilterSection>

      <FilterSection title="Star Rating" sectionKey="stars">
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.starRating.includes(rating)}
                onChange={() => handleStarToggle(rating)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 flex items-center gap-0.5">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="inline w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-gray-500 ml-1">and up</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Guest Rating" sectionKey="rating">
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((r) => (
            <label key={r} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === r}
                onChange={() => updateFilters({ minRating: r })}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                {r === 0 ? 'Any rating' : `${r}+ stars`}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="pt-4">
        <button
          type="button"
          onClick={() =>
            onFiltersChange({
              destination: '',
              checkIn: '',
              checkOut: '',
              guests: 2,
              priceRange: [0, priceMax],
              starRating: [],
              minRating: 0,
            })
          }
          className="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <aside className={className}>
      <div className="lg:hidden mb-4">
        <button
          type="button"
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
      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block bg-white rounded-lg shadow-md p-4 md:p-6`}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 hidden lg:block">Search & Filters</h2>
        {filterContent}
      </div>
    </aside>
  );
};

export default HotelSearchFilters;
