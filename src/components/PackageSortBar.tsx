/**
 * PackageSortBar Component
 * 
 * This component is part of the Expedia.fr Packages Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Sort by price, popularity, rating
 * - Show number of results
 */

import React from 'react';

interface PackageSortBarProps {
  totalResults: number;
  currentSort: string;
  onSortChange: (sort: string) => void;
  className?: string;
}

const PackageSortBar: React.FC<PackageSortBarProps> = ({
  totalResults,
  currentSort,
  onSortChange,
  className = '',
}) => {
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'nights', label: 'Duration' },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Results Count */}
        <div className="flex items-center">
          <span className="text-gray-700 font-medium">
            <span className="text-gray-900 font-semibold">{totalResults.toLocaleString()}</span>{' '}
            packages available
          </span>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-3">
          <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PackageSortBar;

