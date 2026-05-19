/**
 * CarSearchFilters Component
 * 
 * This component is part of the Expedia.fr Car Rental Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Pick-up / Drop-off location
 * - Dates and time
 * - Filters: car type, price, company
 */

import React, { useState } from 'react';
import DatePicker from './common/DatePicker';

export interface CarFilters {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  carType: string[];
  priceRange: [number, number];
  companies: string[];
}

interface CarSearchFiltersProps {
  onFiltersChange: (filters: CarFilters) => void;
  className?: string;
}

const CarSearchFilters: React.FC<CarSearchFiltersProps> = ({
  onFiltersChange,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['search', 'price']);
  const [filters, setFilters] = useState<CarFilters>({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '10:00',
    dropoffDate: '',
    dropoffTime: '10:00',
    carType: [],
    priceRange: [0, 100000],
    companies: [],
  });

  const carTypes = ['Economy', 'Compact', 'Mid-size', 'Full-size', 'SUV', 'Luxury', 'Convertible'];
  const companies = ['Hertz', 'Avis', 'Enterprise', 'Budget', 'Alamo', 'National', 'Thrifty'];

  const updateFilters = (newFilters: Partial<CarFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const handleCarTypeToggle = (type: string) => {
    const newTypes = filters.carType.includes(type)
      ? filters.carType.filter((t) => t !== type)
      : [...filters.carType, type];
    updateFilters({ carType: newTypes });
  };

  const handleCompanyToggle = (company: string) => {
    const newCompanies = filters.companies.includes(company)
      ? filters.companies.filter((c) => c !== company)
      : [...filters.companies, company];
    updateFilters({ companies: newCompanies });
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pick-up Location
            </label>
            <input
              type="text"
              value={filters.pickupLocation}
              onChange={(e) => updateFilters({ pickupLocation: e.target.value })}
              placeholder="City or airport"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Drop-off Location
            </label>
            <input
              type="text"
              value={filters.dropoffLocation}
              onChange={(e) => updateFilters({ dropoffLocation: e.target.value })}
              placeholder="City or airport"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Date</label>
              <DatePicker
                value={filters.pickupDate}
                onChange={(e) => updateFilters({ pickupDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Time</label>
              <input
                type="time"
                value={filters.pickupTime}
                onChange={(e) => updateFilters({ pickupTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date</label>
              <DatePicker
                value={filters.dropoffDate}
                onChange={(e) => updateFilters({ dropoffDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Time</label>
              <input
                type="time"
                value={filters.dropoffTime}
                onChange={(e) => updateFilters({ dropoffTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </div>
          </div>
          <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            Search Cars
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
              min="0"
              max="100000"
              step="1000"
              value={filters.priceRange[0]}
              onChange={(e) =>
                updateFilters({ priceRange: [Number(e.target.value), filters.priceRange[1]] })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                updateFilters({ priceRange: [filters.priceRange[0], Number(e.target.value)] })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
            />
          </div>
        </div>
      </FilterSection>

      {/* Car Type */}
      <FilterSection title="Car Type" sectionKey="carType">
        <div className="space-y-2">
          {carTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.carType.includes(type)}
                onChange={() => handleCarTypeToggle(type)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                {type}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rental Company */}
      <FilterSection title="Rental Company" sectionKey="companies">
        <div className="space-y-2">
          {companies.map((company) => (
            <label key={company} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.companies.includes(company)}
                onChange={() => handleCompanyToggle(company)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600">
                {company}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Clear Filters */}
      <div className="pt-4">
        <button
          onClick={() => {
            const resetFilters: CarFilters = {
              pickupLocation: '',
              dropoffLocation: '',
              pickupDate: '',
              pickupTime: '10:00',
              dropoffDate: '',
              dropoffTime: '10:00',
              carType: [],
              priceRange: [0, 100000],
              companies: [],
            };
            setFilters(resetFilters);
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

export default CarSearchFilters;

