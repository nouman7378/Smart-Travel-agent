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
import { useLocation, useNavigate } from 'react-router-dom';
import AddToBookingButton from './common/AddToBookingButton';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

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
        transmission: car.transmission,
      },
    });

    return true;
  };

  return (
    <div
      className={`bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-xl border border-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:bg-white/90 hover:border-blue-200/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-50">
        <img
          src={car.image}
          alt={car.model}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {car.originalPrice && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Save {Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)}%
          </div>
        )}
        {car.rating && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm border border-gray-100/50">
            <svg className="h-3.5 w-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-xs font-black text-gray-800">{car.rating}</span>
            {car.reviewCount && <span className="text-[10px] text-gray-400 font-bold">({car.reviewCount})</span>}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Header: Company & Type */}
        <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold">{car.type}</span>
          <div className="flex items-center text-gray-500">
            {car.companyLogo ? (
              <img
                src={car.companyLogo}
                alt={car.company}
                className="h-4 w-4 object-contain mr-1 filter grayscale opacity-90"
              />
            ) : (
              <span className="w-4 h-4 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-[9px] mr-1 font-extrabold">{car.company.charAt(0)}</span>
            )}
            <span className="truncate max-w-[90px] font-semibold">{car.company}</span>
          </div>
        </div>

        {/* Model */}
        <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2.5 hover:text-blue-600 transition-colors leading-tight line-clamp-1">
          {car.model}
        </h3>

        {/* Structured Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
          <div className="flex items-center bg-gray-50/50 px-2 py-1 rounded border border-gray-100">
            <span className="mr-1.5 text-gray-400">⚙️</span>
            <span className="truncate font-semibold">{car.transmission}</span>
          </div>
          <div className="flex items-center bg-gray-50/50 px-2 py-1 rounded border border-gray-100">
            <span className="mr-1.5 text-gray-400">👤</span>
            <span className="truncate font-semibold">{car.seats} Seats</span>
          </div>
          <div className="flex items-center bg-gray-50/50 px-2 py-1 rounded border border-gray-100">
            <span className="mr-1.5 text-gray-400">🧳</span>
            <span className="truncate font-semibold">{car.luggage} Bags</span>
          </div>
          {car.fuelType && (
            <div className="flex items-center bg-gray-50/50 px-2 py-1 rounded border border-gray-100">
              <span className="mr-1.5 text-gray-400">⛽</span>
              <span className="truncate font-semibold">{car.fuelType}</span>
            </div>
          )}
        </div>

        {/* Additional Features (Outline tags) */}
        {car.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {car.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-blue-50/40 text-blue-600 text-[10px] font-bold rounded border border-blue-100/50"
              >
                {feature}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded border border-gray-200">
                +{car.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price and Book Button */}
        <div className="flex items-center justify-between gap-2 pt-3.5 border-t border-gray-100 mt-auto">
          <div className="min-w-0">
            {car.originalPrice && (
              <div className="text-gray-400 line-through text-[11px] mb-0.5">
                PKR {car.originalPrice.toLocaleString()}
              </div>
            )}
            <div className="flex items-baseline">
              <span className="text-base sm:text-lg font-black text-gray-900 leading-none">PKR {car.price.toLocaleString()}</span>
              <span className="text-gray-400 text-[10px] font-bold ml-0.5">/day</span>
            </div>
          </div>
          <AddToBookingButton
            onAdd={handleAddToBooking}
            idleLabel="Add to Booking"
            addedLabel="Added"
            className="px-3.5 py-2 text-xs font-bold shrink-0 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default CarCard;

