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

import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HotelGallery from '../components/HotelGallery';
import HotelInfo, { HotelAmenity } from '../components/HotelInfo';
import BookingPanel, { RoomType, BookingData } from '../components/BookingPanel';
import ReviewsSection, { Review } from '../components/ReviewsSection';
import NearbyHotels, { NearbyHotel } from '../components/NearbyHotels';

interface HotelDetailPageProps {
  hotelId?: number;
}

const HotelDetailPage: React.FC<HotelDetailPageProps> = ({ hotelId: _hotelId = 1 }) => {
  // Sample hotel data - Replace with actual API data
  const hotelImages = [
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
      price: 189,
      originalPrice: 249,
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
    },
    {
      id: 2,
      name: 'Executive Suite',
      description: 'Luxury suite with separate living area and premium amenities',
      maxGuests: 4,
      price: 299,
      originalPrice: 399,
      amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony'],
    },
    {
      id: 3,
      name: 'Presidential Suite',
      description: 'Ultimate luxury with panoramic views and butler service',
      maxGuests: 6,
      price: 599,
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
      price: 225,
      originalPrice: 299,
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
      price: 299,
      originalPrice: 399,
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
      price: 245,
      originalPrice: 320,
      distance: '1.5 km away',
    },
  ];

  const handleBookNow = (bookingData: BookingData) => {
    console.log('Booking data:', bookingData);
    // Handle booking logic here
    alert(`Booking confirmed! Total: $${bookingData.totalPrice.toFixed(2)}`);
  };

  const handleHotelClick = (hotelId: number) => {
    console.log('Navigate to hotel:', hotelId);
    // Navigate to hotel detail page
  };

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Hotel Gallery */}
        <HotelGallery images={hotelImages} hotelName="Grand Plaza Hotel" className="mb-8" />

        {/* Hotel Info and Booking Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Hotel Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <HotelInfo
              name="Grand Plaza Hotel"
              location="Paris, France"
              rating={4.8}
              reviewCount={1245}
              stars={5}
              amenities={amenities}
              description={`Experience luxury and comfort at Grand Plaza Hotel, located in the heart of Paris. Our elegant hotel offers world-class amenities and exceptional service to make your stay unforgettable.

Our spacious rooms and suites are designed with your comfort in mind, featuring modern furnishings, premium bedding, and stunning city views. Each room is equipped with high-speed WiFi, flat-screen TVs, and luxurious bathrooms.

Indulge in our award-winning restaurant serving international cuisine, relax by our rooftop pool, or unwind at our full-service spa. Our fitness center is open 24/7 for your convenience.

With our prime location, you're just steps away from Paris's most famous attractions, shopping districts, and dining options. Our concierge team is available 24/7 to help you make the most of your visit.

Book your stay today and discover why Grand Plaza Hotel is the preferred choice for travelers seeking the perfect blend of luxury, comfort, and exceptional service.`}
            />
          </div>

          {/* Booking Panel - Sticky on large screens */}
          <div className="lg:col-span-1">
            <BookingPanel
              basePrice={189}
              roomTypes={roomTypes}
              onBookNow={handleBookNow}
            />
          </div>
        </div>

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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HotelDetailPage;

