/**
 * SearchResultsList Component
 * 
 * This component is part of the Expedia.fr Search Results Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Displays search results in a responsive grid
 * - Supports Hotels, Flights, and Cars
 */

import React from 'react';
import HotelResultCard, { HotelResult } from './HotelResultCard';
import FlightResultCard, { FlightResult } from './FlightResultCard';
import CarResultCard, { CarResult } from './CarResultCard';

interface SearchResultsListProps {
  searchType: 'hotels' | 'flights' | 'cars';
  hotels?: HotelResult[];
  flights?: FlightResult[];
  cars?: CarResult[];
  className?: string;
  onItemClick?: (id: number) => void;
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  searchType,
  hotels = [],
  flights = [],
  cars = [],
  className = '',
  onItemClick,
}) => {
  return (
    <div className={`space-y-4 md:space-y-6 ${className}`}>
      {searchType === 'hotels' &&
        hotels.map((hotel) => (
          <HotelResultCard
            key={hotel.id}
            hotel={hotel}
            onClick={() => onItemClick?.(hotel.id)}
          />
        ))}

      {searchType === 'flights' &&
        flights.map((flight) => (
          <FlightResultCard
            key={flight.id}
            flight={flight}
            onClick={() => onItemClick?.(flight.id)}
          />
        ))}

      {searchType === 'cars' &&
        cars.map((car) => (
          <CarResultCard key={car.id} car={car} onClick={() => onItemClick?.(car.id)} />
        ))}

      {/* Empty State */}
      {((searchType === 'hotels' && hotels.length === 0) ||
        (searchType === 'flights' && flights.length === 0) ||
        (searchType === 'cars' && cars.length === 0)) && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters to see more results.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsList;

