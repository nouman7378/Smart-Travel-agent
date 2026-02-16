/**
 * BookingPanel Component
 * 
 * This component is part of the Expedia.fr Hotel Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Check-in / Check-out
 * - Guests
 * - Room type selection
 * - Price summary and "Book Now" button
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface RoomType {
  id: number;
  name: string;
  description: string;
  maxGuests: number;
  price: number;
  originalPrice?: number;
  amenities: string[];
  image?: string;
}

interface BookingPanelProps {
  basePrice: number;
  roomTypes: RoomType[];
  onBookNow: (bookingData: BookingData) => void;
  className?: string;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomTypeId: number;
  totalPrice: number;
}

const BookingPanel: React.FC<BookingPanelProps> = ({
  basePrice: _basePrice,
  roomTypes,
  onBookNow,
  className = '',
}) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(
    roomTypes.length > 0 ? roomTypes[0] : null
  );

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedRoomType || !checkIn || !checkOut) return 0;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return selectedRoomType.price * nights;
  };

  const totalPrice = calculateTotalPrice();
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleBookNow = () => {
    if (!selectedRoomType || !checkIn || !checkOut) {
      alert('Please fill in all required fields');
      return;
    }

    const bookingData = {
      checkIn,
      checkOut,
      adults,
      children,
      roomTypeId: selectedRoomType.id,
      totalPrice,
    };

    if (onBookNow) {
      onBookNow(bookingData);
    } else {
      navigate('/booking/confirmation/hotel');
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 sticky top-4 ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Book your stay</h2>

      {/* Check-in / Check-out */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Adults</label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Adult' : 'Adults'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Children</label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Child' : 'Children'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Room Type Selection */}
      {roomTypes.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Room Type</label>
          <div className="space-y-3">
            {roomTypes.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoomType(room)}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                  selectedRoomType?.id === room.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{room.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    {room.originalPrice && (
                      <div className="text-sm text-gray-400 line-through mb-1">
                        PKR {room.originalPrice.toLocaleString()}
                      </div>
                    )}
                    <div className="text-lg font-bold text-blue-600">PKR {room.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">per night</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Summary */}
      {selectedRoomType && checkIn && checkOut && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                PKR {selectedRoomType.price.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}
              </span>
              <span className="text-gray-900 font-medium">
                PKR {(selectedRoomType.price * nights).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxes and fees</span>
              <span className="text-gray-900 font-medium">
                PKR {(totalPrice * 0.15).toLocaleString()}
              </span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  PKR {(totalPrice * 1.15).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        disabled={!selectedRoomType || !checkIn || !checkOut}
        className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
      >
        Book Now
      </button>

      {/* Additional Info */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Free cancellation before {checkIn ? new Date(checkIn).toLocaleDateString() : 'check-in'}
      </p>
    </div>
  );
};

export default BookingPanel;

