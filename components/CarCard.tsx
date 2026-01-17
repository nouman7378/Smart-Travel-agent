/**
 * CarCard Component
 * 
 * This component is part of the Expedia.fr Car Rental Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Car image, model, price, features
 * - Hover effect and responsive grid
 */

import React from 'react';

export interface Car {
  id: number;
  model: string;
  type: string;
  image: string;
  company: string;
  companyLogo?: string;
  price: number;
  originalPrice?: number;
  pricePer: 'day' | 'week' | 'month';
  rating?: number;
  reviewCount?: number;
  features: string[];
  transmission: 'Automatic' | 'Manual';
  seats: number;
  luggage: number;
  fuelType?: string;
  mileage?: string;
}

interface CarCardProps {
  car: Car;
  className?: string;
  onClick?: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, className = '', onClick }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {car.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Save {Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)}%
          </div>
        )}
        {car.rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
            <svg className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-xs font-semibold text-gray-900">{car.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Company */}
        <div className="flex items-center mb-2">
          {car.companyLogo ? (
            <img
              src={car.companyLogo}
              alt={car.company}
              className="h-5 w-5 object-contain mr-2"
            />
          ) : (
            <div className="h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              <span className="text-blue-600 font-semibold text-xs">{car.company.charAt(0)}</span>
            </div>
          )}
          <span className="text-sm text-gray-600">{car.company}</span>
        </div>

        {/* Model and Type */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
          {car.model}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{car.type}</p>

        {/* Rating */}
        {car.rating && car.reviewCount && (
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(car.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {car.rating} ({car.reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-xs text-gray-600">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            {car.transmission}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {car.seats} Seats
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            {car.luggage} Bags
          </div>
          {car.fuelType && (
            <div className="flex items-center text-xs text-gray-600">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {car.fuelType}
            </div>
          )}
        </div>

        {/* Additional Features */}
        {car.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {car.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                +{car.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price and Book Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            {car.originalPrice && (
              <div className="text-gray-400 line-through text-sm mb-1">
                ${car.originalPrice}
              </div>
            )}
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-600">${car.price}</span>
              <span className="text-gray-600 text-sm ml-1">/{car.pricePer}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Includes taxes and fees</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm whitespace-nowrap">
            View Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;

