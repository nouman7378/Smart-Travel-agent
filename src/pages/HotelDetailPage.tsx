/**
 * HotelDetailPage Component
 * 
 * This component is part of the Expedia.fr Hotel Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * This is the main hotel detail page that combines all components:
 * - Header
 * - Hotel Gallery
 * - Hotel Info
 * - Booking Panel
 * - Reviews Section
 * - Nearby Hotels
 * - Footer
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HotelGallery from '../components/HotelGallery';
import HotelInfo, { HotelAmenity } from '../components/HotelInfo';
import BookingPanel, { RoomType, BookingData } from '../components/BookingPanel';
import ReviewsSection, { Review } from '../components/ReviewsSection';
import NearbyHotels, { NearbyHotel } from '../components/NearbyHotels';
import RoomSelectionModal from '../components/RoomSelectionModal';
import { getMediaUrl } from '../config/env.config';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://smart-travel.fly.dev/api';

interface HotelDetailPageProps {
  hotelId?: number;
}

interface HotelData {
  id: number;
  name: string;
  location: string;
  address: string;
  stars: number;
  rating: number;
  review_count: number;
  distance_from_center: number;
  image_url: string;
}

interface FeaturedRoom {
  id: number;
  room_type: string;
  description: string;
  price_per_night: number;
  original_price?: number | null;
  available_rooms: number;
  max_guests: number;
  room_image_url: string;
  amenities: string[];
  discount_percentage: number;
}

const HotelDetailPage: React.FC<HotelDetailPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotelId = parseInt(id || '1', 10);
  
  const [hotel, setHotel] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [featuredRooms, setFeaturedRooms] = useState<FeaturedRoom[]>([]);
  const [featuredRoomsLoading, setFeaturedRoomsLoading] = useState(true);
  
  // Fetch hotel data from API
  useEffect(() => {
    fetchHotelData();
  }, [hotelId]);
  
  const fetchHotelData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}/`);
      const data = await response.json();
      
      if (data.success) {
        setHotel(data.hotel);
        // Fetch rooms after hotel data is loaded
        fetchRooms(data.hotel.id);
        fetchFeaturedRooms(data.hotel.id);
      } else {
        setError(data.message || 'Hotel not found');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async (hotelId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}/rooms/`);
      const data = await response.json();
      
      if (data.success) {
        // Transform API data to RoomType format
        const transformedRooms: RoomType[] = data.rooms.map((room: any) => ({
          id: room.id,
          name: room.room_type,
          description: room.description,
          maxGuests: room.max_guests,
          price: room.price_per_night,
          originalPrice: room.original_price,
          amenities: room.amenities,
          image: room.room_image_url || '',
        }));
        setRooms(transformedRooms);
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
      // Use fallback static rooms if API fails
      setRooms([
        {
          id: 1,
          name: 'Deluxe Room',
          description: 'Spacious room with city view, king bed, and modern amenities',
          maxGuests: 2,
          price: 25000,
          originalPrice: 30000,
          amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
        },
        {
          id: 2,
          name: 'Executive Suite',
          description: 'Luxury suite with separate living area and premium amenities',
          maxGuests: 4,
          price: 35000,
          originalPrice: 42000,
          amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony'],
        },
        {
          id: 3,
          name: 'Presidential Suite',
          description: 'Ultimate luxury with panoramic views and butler service',
          maxGuests: 6,
          price: 65000,
          amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi'],
        },
      ]);
    }
  };

  const fetchFeaturedRooms = async (hotelId: number) => {
    setFeaturedRoomsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}/rooms/?featured=true`);
      const data = await response.json();

      if (data.success) {
        setFeaturedRooms(data.rooms || []);
      } else {
        setFeaturedRooms([]);
      }
    } catch (err) {
      console.error('Error fetching featured rooms:', err);
      setFeaturedRooms([]);
    } finally {
      setFeaturedRoomsLoading(false);
    }
  };
  
  // Sample hotel data - Replace with actual API data
  const hotelImages = hotel?.image_url ? [getMediaUrl(hotel.image_url)] : [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
  ];

  const amenities: HotelAmenity[] = [
    {
      name: 'Free WiFi',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      ),
    },
    {
      name: 'Swimming Pool',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Parking',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      name: 'Air Conditioning',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
    },
    {
      name: 'Breakfast Included',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      name: 'Gym',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      name: 'Spa',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      name: 'Pet Friendly',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
  ];

  const roomTypes: RoomType[] = [
    {
      id: 1,
      name: 'Deluxe Room',
      description: 'Spacious room with city view, king bed, and modern amenities',
      maxGuests: 2,
      price: 25000,
      originalPrice: 30000,
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
    },
    {
      id: 2,
      name: 'Executive Suite',
      description: 'Luxury suite with separate living area and premium amenities',
      maxGuests: 4,
      price: 35000,
      originalPrice: 42000,
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony'],
    },
    {
      id: 3,
      name: 'Presidential Suite',
      description: 'Ultimate luxury with panoramic views and butler service',
      maxGuests: 6,
      price: 65000,
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Jacuzzi'],
    },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      userName: 'Sarah Johnson',
      userLocation: 'New York, USA',
      rating: 5,
      date: '2 weeks ago',
      title: 'Perfect stay!',
      comment:
        'Absolutely loved our stay here! The room was spacious and clean, the staff was incredibly friendly and helpful, and the location was perfect. The breakfast was delicious too. Would definitely come back!',
      verified: true,
      helpful: 12,
    },
    {
      id: 2,
      userName: 'Michael Chen',
      userLocation: 'London, UK',
      rating: 4,
      date: '1 month ago',
      title: 'Great hotel with minor issues',
      comment:
        'Overall a great experience. The hotel is beautiful and well-maintained. The only downside was that the WiFi was a bit slow in our room. Everything else was perfect.',
      verified: true,
      helpful: 8,
    },
    {
      id: 3,
      userName: 'Emma Williams',
      userLocation: 'Sydney, Australia',
      rating: 5,
      date: '3 weeks ago',
      comment:
        'This hotel exceeded all our expectations! The service was impeccable, the rooms were luxurious, and the amenities were top-notch. Highly recommend!',
      verified: true,
      helpful: 15,
    },
    {
      id: 4,
      userName: 'David Martinez',
      userLocation: 'Madrid, Spain',
      rating: 4,
      date: '2 months ago',
      title: 'Very good value',
      comment:
        'Great value for money. The hotel is in a prime location, the rooms are comfortable, and the staff is professional. Would stay here again.',
      verified: false,
      helpful: 5,
    },
    {
      id: 5,
      userName: 'Lisa Anderson',
      userLocation: 'Toronto, Canada',
      rating: 5,
      date: '1 week ago',
      title: 'Exceptional experience',
      comment:
        'From check-in to check-out, everything was perfect. The hotel staff went above and beyond to make our stay memorable. The spa was amazing too!',
      verified: true,
      helpful: 20,
    },
  ];

  const nearbyHotels: NearbyHotel[] = [
    {
      id: 2,
      name: 'Oceanview Resort',
      location: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      rating: 4.9,
      reviewCount: 892,
      stars: 5,
      price: 22000,
      originalPrice: 28000,
      distance: '0.8 km away',
    },
    {
      id: 3,
      name: 'Metropolitan Suites',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      rating: 4.7,
      reviewCount: 2103,
      stars: 4,
      price: 32000,
      originalPrice: 38000,
      distance: '1.2 km away',
    },
    {
      id: 4,
      name: 'Sakura Garden Hotel',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      rating: 4.9,
      reviewCount: 1567,
      stars: 5,
      price: 25000,
      originalPrice: 30000,
      distance: '1.5 km away',
    },
  ];

  const handleBookNow = (bookingData: BookingData) => {
    console.log('Booking data:', bookingData);
    // Handle booking logic here
    alert(`Booking confirmed! Total: PKR ${bookingData.totalPrice.toLocaleString()}`);
  };

  const handleViewDeal = () => {
    setShowRoomModal(true);
  };

  const handleBookRoom = (roomId: number) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      // Keep the user on this page; button animation confirms add-to-booking.
      console.log(`Added room ${room.name} to booking`);
    }
  };

  const handleHotelClick = (nearbyHotelId: number) => {
    navigate(`/hotel/${nearbyHotelId}`);
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The hotel you are looking for does not exist.'}</p>
            <button
              onClick={() => navigate('/hotels')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Hotels
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Hotel Gallery */}
        <HotelGallery images={hotelImages} hotelName={hotel.name} className="mb-8" />

        {/* Hotel Info and Booking Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Hotel Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <HotelInfo
              name={hotel.name}
              location={hotel.location}
              rating={hotel.rating}
              reviewCount={hotel.review_count}
              stars={hotel.stars}
              amenities={amenities}
              description={`Experience luxury and comfort at ${hotel.name}, located in ${hotel.location}. Our elegant hotel offers world-class amenities and exceptional service to make your stay unforgettable.

Our spacious rooms and suites are designed with your comfort in mind, featuring modern furnishings, premium bedding, and stunning city views. Each room is equipped with high-speed WiFi, flat-screen TVs, and luxurious bathrooms.

Indulge in our award-winning restaurant serving international cuisine, relax by our rooftop pool, or unwind at our full-service spa. Our fitness center is open 24/7 for your convenience.

With our prime location at ${hotel.address}, you're just ${hotel.distance_from_center} km from the city center. Our concierge team is available 24/7 to help you make the most of your visit.

Book your stay today and discover why ${hotel.name} is the preferred choice for travelers seeking the perfect blend of luxury, comfort, and exceptional service.`}
            />
          </div>

          {/* Booking Panel - Sticky on large screens */}
          <div className="lg:col-span-1">
            <BookingPanel
              basePrice={rooms.length > 0 ? rooms[0].price : 25000}
              roomTypes={rooms}
              onBookNow={handleBookNow}
            />
          </div>
        </div>

        <section className="mb-12 rounded-3xl bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Rooms</h2>
              <p className="mt-2 text-gray-600">Live featured rooms from {hotel?.name || 'this hotel'}.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowRoomModal(true)}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View All Rooms
            </button>
          </div>

          {featuredRoomsLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map((index) => (
                <div key={index} className="h-[360px] animate-pulse rounded-2xl bg-white" />
              ))}
            </div>
          ) : featuredRooms.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center text-gray-600">
              No featured rooms are available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredRooms.map((room) => (
                <div
                  key={room.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={room.room_image_url ? getMediaUrl(room.room_image_url) : hotelImages[0]}
                      alt={room.room_type}
                      className="h-full w-full object-cover"
                    />
                    {room.discount_percentage > 0 && (
                      <div className="absolute left-3 top-3 rounded-lg bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                        Save {room.discount_percentage}%
                      </div>
                    )}
                    <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm">
                      {room.max_guests} Guests
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900">{room.room_type}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{room.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        {room.original_price ? (
                          <div className="text-xs text-gray-400 line-through">
                            PKR {room.original_price.toLocaleString()}
                          </div>
                        ) : null}
                        <div className="text-xl font-bold text-gray-900">
                          PKR {room.price_per_night.toLocaleString()}
                          <span className="ml-1 text-xs font-normal text-gray-500">/night</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowRoomModal(true)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={reviews.length}
          className="border-t border-gray-200"
        />

        {/* Nearby Hotels */}
        <NearbyHotels
          hotels={nearbyHotels}
          title="Similar Hotels You Might Like"
          onHotelClick={handleHotelClick}
          className="border-t border-gray-200 mt-12"
        />
      </div>

      {/* Room Selection Modal */}
      {hotel && (
        <RoomSelectionModal
          isOpen={showRoomModal}
          onClose={() => setShowRoomModal(false)}
          hotel={{
            id: hotel.id,
            name: hotel.name,
            location: hotel.location,
          }}
          onBookRoom={handleBookRoom}
        />
      )}
    </div>
  );
};

export default HotelDetailPage;

