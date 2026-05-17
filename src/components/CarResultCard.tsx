/**
 * CarResultCard Component
 * 
 * This component is part of the Expedia.fr Search Results Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Car image, model, price, pickup & drop-off location
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddToBookingButton from './common/AddToBookingButton';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

export interface CarResult {
  id: number;
  model: string;
  type: string;
  image: string;
  company: string;
  companyLogo?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  pricePer: 'day' | 'week' | 'month';
  pickup: {
    location: string;
    date: string;
    time: string;
  };
  dropoff: {
    location: string;
    date: string;
    time: string;
  };
  features: string[];
  transmission: 'Automatic' | 'Manual';
  seats: number;
  rating?: number;
  reviewCount?: number;
}

interface CarResultCardProps {
  car: CarResult;
  className?: string;
  onClick?: () => void;
}

const CarResultCard: React.FC<CarResultCardProps> = ({ car, className = '', onClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { addItemToBooking } = useBooking();

  const handleAddToBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `${location.pathname}${location.search}` } });
      return false;
    }

    await addItemToBooking({
      item_type: 'car',
      reference_id: car.id,
      title: car.model,
      subtitle: `${car.company} - ${car.type}`,
      unit_price: car.price,
      quantity: 1,
      metadata: {
        company: car.company,
        type: car.type,
        pickup: car.pickup,
        dropoff: car.dropoff,
      },
    });

    return true;
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
          <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
          {car.originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Save {Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 flex flex-col">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {car.companyLogo ? (
                    <img
                      src={car.companyLogo}
                      alt={car.company}
                      className="h-6 w-6 mr-2 object-contain"
                    />
                  ) : (
                    <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-blue-600 font-semibold text-xs">
                        {car.company.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-gray-600">{car.company}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                  {car.model}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{car.type}</p>
                {car.rating && (
                  <div className="flex items-center">
                    <div className="flex items-center">
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
                    <span className="ml-2 text-sm text-gray-600">
                      {car.rating} ({car.reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Pickup and Drop-off */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-xs text-gray-500 mb-1">Pick-up</div>
                <div className="font-semibold text-gray-900 text-sm">{car.pickup.location}</div>
                <div className="text-sm text-gray-600">
                  {car.pickup.date} at {car.pickup.time}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Drop-off</div>
                <div className="font-semibold text-gray-900 text-sm">{car.dropoff.location}</div>
                <div className="text-sm text-gray-600">
                  {car.dropoff.date} at {car.dropoff.time}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
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
              <div className="flex items-center text-sm text-gray-600">
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
              {car.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Price and Book Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              {car.originalPrice && (
                <div className="text-gray-400 line-through text-sm mb-1">
                  PKR {car.originalPrice.toLocaleString()}
                </div>
              )}
              <div className="flex items-baseline">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">
                  PKR {car.price.toLocaleString()}
                </span>
                <span className="text-gray-600 text-sm ml-1">/{car.pricePer}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Includes taxes and fees</p>
            </div>
            <AddToBookingButton
              onAdd={handleAddToBooking}
              idleLabel="Add to Booking"
              addedLabel="Added to Booking"
              className="px-6 py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarResultCard;

