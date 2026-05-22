import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';
import { API_PREFIX, getMediaUrl } from '../config/env.config';

interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  originalPrice?: number;
  discount?: number;
}

interface Room {
  id: number;
  roomType: string;
  description: string;
  image: string;
  pricePerNight: number;
  originalPrice?: number;
  discount?: number;
  maxGuests: number;
  amenities: string[];
}

interface FeaturedHotelsProps {
  className?: string;
}

const FeaturedHotels: React.FC<FeaturedHotelsProps> = ({ className = '' }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [featuredRoomsByHotel, setFeaturedRoomsByHotel] = useState<Record<number, Room[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedHotels = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_PREFIX}/hotels/?featured=true`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch featured hotels');
        }

        const placeholderImages = [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
          'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
        ];

        const mappedHotels: Hotel[] = (data.hotels || [])
          .filter((hotel: any) => hotel.is_featured)
          .map((hotel: any) => {
          const rating = Number(hotel.rating) || 0;
          const stars = Number(hotel.stars) || 3;
          const price = Math.max(18000, Math.round(rating * 800 + stars * 2500));
          const originalPrice = Math.round(price * 1.15);

          return {
            id: hotel.id,
            name: hotel.name,
            location: hotel.location,
            image: getMediaUrl(hotel.image_url) || placeholderImages[hotel.id % placeholderImages.length],
            rating,
            reviewCount: Number(hotel.review_count) || 0,
            price,
            currency: 'PKR',
            originalPrice,
            discount: Math.max(1, Math.round(((originalPrice - price) / originalPrice) * 100)),
          };
          });

        setHotels(mappedHotels);

        const roomResults = await Promise.all(
          mappedHotels.map(async (hotel) => {
            try {
              const roomResponse = await fetch(`${API_PREFIX}/hotels/${hotel.id}/rooms/?featured=true`);
              const roomData = await roomResponse.json();

              if (!roomData.success) {
                return [hotel.id, [] as Room[]] as const;
              }

              const mappedRooms: Room[] = (roomData.rooms || []).map((room: any) => {
                const pricePerNight = Number(room.price_per_night) || 0;
                const originalPrice = room.original_price ? Number(room.original_price) : undefined;

                return {
                  id: room.id,
                  roomType: room.room_type,
                  description: room.description,
                  image: getMediaUrl(room.room_image_url) || placeholderImages[room.id % placeholderImages.length],
                  pricePerNight,
                  originalPrice,
                  discount: room.discount_percentage ? Number(room.discount_percentage) : undefined,
                  maxGuests: Number(room.max_guests) || 2,
                  amenities: Array.isArray(room.amenities) ? room.amenities : [],
                };
              });

              return [hotel.id, mappedRooms] as const;
            } catch {
              return [hotel.id, [] as Room[]] as const;
            }
          })
        );

        setFeaturedRoomsByHotel(Object.fromEntries(roomResults));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load featured hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedHotels();
  }, []);

  return (
    <section className={`py-12 md:py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Hotels</h2>
            <p className="mt-1 text-gray-600">Featured hotels with their featured rooms displayed underneath</p>
          </div>
        </div>
        {loading && (
          <div className="space-y-8">
            {[0, 1].map((index) => (
              <div key={index} className="rounded-2xl bg-white p-6 animate-pulse">
                <div className="h-10 w-64 rounded-lg bg-gray-100 mb-4" />
                <div className="h-56 rounded-xl bg-gray-100 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[0, 1, 2].map((roomIndex) => (
                    <div key={roomIndex} className="h-40 rounded-xl bg-gray-100" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && hotels.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-gray-600">
            No featured hotels are available right now.
          </div>
        )}

        {!loading && !error && hotels.length > 0 && (
          <div className="space-y-10">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
                <HotelCard hotel={hotel} />
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4 gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Featured Rooms</h3>
                      <p className="text-sm text-gray-600">Featured rooms available at {hotel.name}</p>
                    </div>
                  </div>

                  <HotelRooms hotelName={hotel.name} rooms={featuredRoomsByHotel[hotel.id] || []} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Hotel Card Component
const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-xl border border-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden hover:shadow-[0_8px_30px_rgba(59,130,246,0.06)] hover:bg-white/90 hover:border-blue-200/50 transition-all duration-300 group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <SafeImage
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {hotel.discount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium"
          >
            Save {hotel.discount}%
          </motion.div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
          <svg className="h-3 w-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
          <span className="text-xs font-medium text-gray-900">{hotel.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
          {hotel.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 flex items-center">
          <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {hotel.location}
        </p>

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${i < Math.floor(hotel.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-600">({hotel.reviewCount} reviews)</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {hotel.originalPrice && (
              <span className="text-gray-400 line-through text-xs mr-2">
                PKR {hotel.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-semibold text-gray-900">
              PKR {hotel.price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-xs ml-1">/night</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white font-normal rounded-lg transition-colors text-xs"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const HotelRooms: React.FC<{ hotelName: string; rooms: Room[] }> = ({ hotelName, rooms }) => {
  if (rooms.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-gray-600">
        No featured rooms are available for {hotelName} right now.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <motion.div
          key={room.id}
          whileHover={{ y: -3 }}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div className="relative h-40 overflow-hidden bg-gray-100">
            <SafeImage
              src={room.image}
              alt={room.roomType}
              className="h-full w-full object-cover"
            />
            {room.discount && (
              <div className="absolute top-3 left-3 rounded-lg bg-gray-900 px-3 py-1 text-xs font-medium text-white">
                Save {room.discount}%
              </div>
            )}
          </div>

          <div className="p-4">
            <h4 className="text-base font-semibold text-gray-900">{room.roomType}</h4>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{room.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {room.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                  {amenity}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
              <div>
                {room.originalPrice && (
                  <div className="text-xs text-gray-400 line-through">PKR {room.originalPrice.toLocaleString()}</div>
                )}
                <div className="text-lg font-bold text-gray-900">PKR {room.pricePerNight.toLocaleString()}</div>
                <div className="text-xs text-gray-500">up to {room.maxGuests} guests</div>
              </div>
              <button
                type="button"
                className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-800"
              >
                View Room
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedHotels;