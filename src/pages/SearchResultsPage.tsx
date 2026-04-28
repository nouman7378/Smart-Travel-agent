/**
 * SearchResultsPage Component
 * 
 * This component is part of the Expedia.fr Search Results Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * This is the main search results page that combines all components:
 * - Header (Navigation Bar)
 * - Search Filters Sidebar
 * - Sort Bar
 * - Search Results List
 * - Pagination / Load More Button
 * - Footer
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters, { FilterState } from '../components/SearchFilters';
import SortBar from '../components/SortBar';
import SearchResultsList from '../components/SearchResultsList';
import Pagination from '../components/Pagination';
import { HotelResult } from '../components/HotelResultCard';
import { FlightResult } from '../components/FlightResultCard';
import { CarResult } from '../components/CarResultCard';
import RoomSelectionModal from '../components/RoomSelectionModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface SearchResultsPageProps {
  searchType?: 'hotels' | 'flights' | 'cars';
  initialResults?: {
    hotels?: HotelResult[];
    flights?: FlightResult[];
    cars?: CarResult[];
  };
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  searchType = 'hotels',
  initialResults,
}) => {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get('location') || '';
  
  const [currentSearchType] = useState<'hotels' | 'flights' | 'cars'>(
    searchType
  );
  const [currentSort, setCurrentSort] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500000],
    stars: [],
    rating: 0,
    amenities: [],
    airline: [],
    carType: [],
  });
  
  // API hotels state
  const [apiHotels, setApiHotels] = useState<HotelResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Room modal state
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<{id: number, name: string, location: string} | null>(null);

  // Fetch hotels from API
  useEffect(() => {
    if (currentSearchType === 'hotels') {
      fetchHotels();
    }
  }, [currentSearchType, locationParam]);

  const handleViewDeal = (hotel: HotelResult) => {
    setSelectedHotel({
      id: hotel.id,
      name: hotel.name,
      location: hotel.location,
    });
    setShowRoomModal(true);
  };

  const handleBookRoom = (roomId: number) => {
    if (selectedHotel) {
      // Keep the user on this page; button animation provides booking feedback.
      console.log(`Added room ${roomId} at ${selectedHotel.name} to booking`);
    }
  };

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (locationParam) {
        params.append('location', locationParam);
      }
      
      const response = await fetch(`${API_BASE_URL}/hotels/?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        // Transform API data to HotelResult format
        const transformedHotels: HotelResult[] = data.hotels.map((hotel: any) => {
          // Use hotel image if available, otherwise generate a unique placeholder based on hotel ID
          const placeholderImages = [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
          ];
          const fallbackImage = hotel.image_url || placeholderImages[hotel.id % placeholderImages.length];
          
          return {
            id: hotel.id,
            name: hotel.name,
            location: hotel.location,
            image: fallbackImage,
            rating: hotel.rating,
            reviewCount: hotel.review_count,
            stars: hotel.stars,
            price: Math.round(hotel.rating * 50 + hotel.stars * 30), // Generate price based on rating/stars
            originalPrice: Math.round(hotel.rating * 50 + hotel.stars * 30 * 1.2),
            currency: 'PKR',
            amenities: ['Free WiFi', 'Air Conditioning', '24/7 Service'],
            availability: true,
            distance: `${hotel.distance_from_center} km`,
          };
        });
        setApiHotels(transformedHotels);
      } else {
        setError(data.message || 'Failed to fetch hotels');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Use only API hotels - no hardcoded fallback
  const sampleHotels: HotelResult[] = initialResults?.hotels || apiHotels;
  
  // For flights and cars, rely only on initialResults when provided.
  // This avoids showing hardcoded demo data and keeps the page consistent
  // with real API-backed flows (e.g., dedicated Flights and Cars pages).
  const sampleFlights: FlightResult[] = initialResults?.flights || [];
  
  const sampleCars: CarResult[] = initialResults?.cars || [
    {
      id: 1,
      model: 'Toyota Camry',
      type: 'Mid-size',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
      company: 'Hertz',
      price: 12000,
      originalPrice: 15000,
      currency: 'PKR',
      pricePer: 'day',
      pickup: {
        location: 'Paris CDG Airport',
        date: 'Mon, Dec 15',
        time: '10:00',
      },
      dropoff: {
        location: 'Paris CDG Airport',
        date: 'Fri, Dec 19',
        time: '10:00',
      },
      features: ['GPS', 'Bluetooth', 'USB Charger'],
      transmission: 'Automatic',
      seats: 5,
      rating: 4.5,
      reviewCount: 234,
    },
    {
      id: 2,
      model: 'BMW 3 Series',
      type: 'Luxury',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      company: 'Avis',
      price: 25000,
      originalPrice: 30000,
      currency: 'PKR',
      pricePer: 'day',
      pickup: {
        location: 'New York JFK Airport',
        date: 'Mon, Dec 15',
        time: '12:00',
      },
      dropoff: {
        location: 'New York JFK Airport',
        date: 'Thu, Dec 18',
        time: '12:00',
      },
      features: ['GPS', 'Leather Seats', 'Sunroof'],
      transmission: 'Automatic',
      seats: 5,
      rating: 4.8,
      reviewCount: 456,
    },
  ];

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let results: (HotelResult | FlightResult | CarResult)[] = [];

    if (currentSearchType === 'hotels') {
      results = apiHotels.filter((hotel) => {
        // Price filter
        if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
          return false;
        }
        // Star filter
        if (filters.stars.length > 0 && !filters.stars.includes(hotel.stars)) {
          return false;
        }
        // Rating filter
        if (filters.rating > 0 && hotel.rating < filters.rating) {
          return false;
        }
        // Amenities filter
        if (
          filters.amenities.length > 0 &&
          !filters.amenities.every((amenity) => hotel.amenities.includes(amenity))
        ) {
          return false;
        }
        return true;
      });
    } else if (currentSearchType === 'flights') {
      results = sampleFlights.filter((flight) => {
        if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) {
          return false;
        }
        if (filters.airline && filters.airline.length > 0) {
          return filters.airline.includes(flight.airline);
        }
        return true;
      });
    } else if (currentSearchType === 'cars') {
      results = sampleCars.filter((car) => {
        if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) {
          return false;
        }
        if (filters.carType && filters.carType.length > 0) {
          return filters.carType.includes(car.type);
        }
        return true;
      });
    }

    // Sort results
    results.sort((a, b) => {
      if (currentSort === 'price-low') {
        return a.price - b.price;
      } else if (currentSort === 'price-high') {
        return b.price - a.price;
      } else if (currentSort === 'rating' && 'rating' in a && 'rating' in b) {
        return (b as any).rating - (a as any).rating;
      }
      // Default: popularity (keep original order)
      return 0;
    });

    return results;
  }, [currentSearchType, filters, currentSort, sampleHotels, sampleFlights, sampleCars]);

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAndSortedResults.length / itemsPerPage);
  const paginatedResults = filteredAndSortedResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemClick = (id: number) => {
    console.log(`Clicked item ${id}`);
    // Navigate to detail page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <SearchFilters
              searchType={currentSearchType}
              onFilterChange={setFilters}
            />
          </aside>

          {/* Results Section */}
          <main className="flex-1 min-w-0">
            {/* Sort Bar */}
            <SortBar
              totalResults={filteredAndSortedResults.length}
              currentSort={currentSort}
              onSortChange={setCurrentSort}
              className="mb-6"
            />

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredAndSortedResults.length === 0 && currentSearchType === 'hotels' && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            )}

            {/* Search Results */}
            {!loading && (
              <SearchResultsList
                searchType={currentSearchType}
                hotels={currentSearchType === 'hotels' ? (paginatedResults as HotelResult[]) : []}
                flights={
                  currentSearchType === 'flights' ? (paginatedResults as FlightResult[]) : []
                }
                cars={currentSearchType === 'cars' ? (paginatedResults as CarResult[]) : []}
                onItemClick={handleItemClick}
                onViewDeal={handleViewDeal}
                className="mb-6"
              />
            )}

            {/* Pagination */}
            {!loading && filteredAndSortedResults.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedResults.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                showLoadMore={false}
              />
            )}
          </main>
        </div>
      </div>
    
      {/* Room Selection Modal */}
      {selectedHotel && (
        <RoomSelectionModal
          isOpen={showRoomModal}
          onClose={() => setShowRoomModal(false)}
          hotel={selectedHotel}
          onBookRoom={handleBookRoom}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;

