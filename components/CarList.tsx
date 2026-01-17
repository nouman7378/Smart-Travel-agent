/**
 * CarList Component
 * 
 * This component is part of the Expedia.fr Car Rental Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Responsive grid layout
 * - Car cards display
 */

import React from 'react';
import CarCard, { Car } from './CarCard';

interface CarListProps {
  cars: Car[];
  className?: string;
  onCarClick?: (carId: number) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, className = '', onCarClick }) => {
  if (cars.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
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
        <h3 className="mt-2 text-sm font-medium text-gray-900">No cars found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} onClick={() => onCarClick?.(car.id)} />
      ))}
    </div>
  );
};

export default CarList;

