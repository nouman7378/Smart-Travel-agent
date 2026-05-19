/**
 * RoomSelectionModal Component
 * 
 * Modal for displaying available rooms for a hotel with booking options.
 * Used in both search results and hotel detail pages.
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AddToBookingButton from './common/AddToBookingButton';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import DatePicker from './common/DatePicker';

interface Room {
  id: number;
  room_type: string;
  description: string;
  price_per_night: number;
  original_price?: number;
  available_rooms: number;
  max_guests: number;
  room_image_url: string;
  amenities: string[];
  discount_percentage: number;
}

interface RoomSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: {
    id: number;
    name: string;
    location: string;
  };
  onBookRoom: (roomId: number) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://smart-travel.fly.dev/api';

const getMediaUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  let resolvedUrl = url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    resolvedUrl = url;
  } else {
    const rootHost = API_BASE_URL.replace(/\/api\/?$/, '').replace(/\/$/, '');
    const relativePath = url.startsWith('/') ? url : `/${url}`;
    resolvedUrl = `${rootHost}${relativePath}`;
  }
  if (resolvedUrl.startsWith('http://res.cloudinary.com')) {
    resolvedUrl = resolvedUrl.replace('http://', 'https://');
  }
  return resolvedUrl;
};

const RoomSelectionModal: React.FC<RoomSelectionModalProps> = ({
  isOpen,
  onClose,
  hotel,
  onBookRoom,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { addItemToBooking } = useBooking();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Fetch rooms when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchRooms();
      // Set default dates
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      setCheckIn(today.toISOString().split('T')[0]);
      setCheckOut(tomorrow.toISOString().split('T')[0]);
    }
  }, [isOpen, hotel.id]);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${hotel.id}/rooms/`);
      const data = await response.json();
      
      if (data.success) {
        setRooms(data.rooms);
      } else {
        setError(data.message || 'Failed to load rooms');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = async (room: Room) => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return false;
    }
    
    // Calculate nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
      alert('Check-out date must be after check-in date');
      return false;
    }

    if (!isAuthenticated) {
      onClose();
      navigate('/login', { state: { from: `${location.pathname}${location.search}` } });
      return false;
    }

    await addItemToBooking({
      item_type: 'hotel_room',
      reference_id: room.id,
      title: `${hotel.name} - ${room.room_type}`,
      subtitle: `${hotel.location}`,
      unit_price: room.price_per_night,
      quantity: nights,
      metadata: {
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomType: room.room_type,
        checkIn,
        checkOut,
        guests,
        nights,
      },
    });

    onBookRoom(room.id);
    return true;
  };

  const calculateTotalPrice = (pricePerNight: number) => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    return pricePerNight * nights;
  };

  const nights = checkIn && checkOut 
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <div>
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <p className="text-blue-100">{hotel.location}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Booking Form */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <DatePicker
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <DatePicker
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="text-sm text-gray-600">
                    {nights > 0 && (
                      <span>{nights} {nights === 1 ? 'night' : 'nights'}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms List */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <div className="text-red-500 mb-2">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">{error}</p>
                  <button
                    onClick={fetchRooms}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : rooms.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms available</h3>
                  <p className="text-gray-600">Please try different dates or check back later.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Room Image */}
                        <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {room.room_image_url ? (
                            <img
                              src={getMediaUrl(room.room_image_url)}
                              alt={room.room_type}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Room Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{room.room_type}</h3>
                              <p className="text-gray-600 text-sm mt-1">{room.description}</p>
                              
                              {/* Amenities */}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {room.amenities.slice(0, 4).map((amenity, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                                {room.amenities.length > 4 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                                    +{room.amenities.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Pricing and Booking */}
                            <div className="flex flex-col items-end">
                              <div className="text-right mb-3">
                                {room.original_price && room.discount_percentage > 0 && (
                                  <div className="text-gray-400 line-through text-sm">
                                    PKR {room.original_price.toLocaleString()}
                                  </div>
                                )}
                                <div className="text-2xl font-bold text-blue-600">
                                  PKR {room.price_per_night.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">per night</div>
                                
                                {nights > 0 && (
                                  <div className="mt-2 text-right">
                                    <div className="text-sm text-gray-600">
                                      Total: PKR {calculateTotalPrice(room.price_per_night).toLocaleString()}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      for {nights} {nights === 1 ? 'night' : 'nights'}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-sm text-gray-600">
                                  {room.available_rooms} room{room.available_rooms !== 1 ? 's' : ''} available
                                </div>
                                <AddToBookingButton
                                  onAdd={() => handleBookRoom(room)}
                                  disabled={!checkIn || !checkOut || nights <= 0}
                                  idleLabel="Add to Booking"
                                  addedLabel="Added to Booking"
                                  className="px-6 py-2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 text-center text-sm text-gray-500 rounded-b-lg">
              Prices include taxes and fees. Free cancellation available.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RoomSelectionModal;