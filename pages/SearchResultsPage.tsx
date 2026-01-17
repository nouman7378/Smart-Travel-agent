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

import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchFilters, { FilterState } from '../components/SearchFilters';
import SortBar from '../components/SortBar';
import SearchResultsList from '../components/SearchResultsList';
import Pagination from '../components/Pagination';
import { HotelResult } from '../components/HotelResultCard';
import { FlightResult } from '../components/FlightResultCard';
import { CarResult } from '../components/CarResultCard';

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
  const [currentSearchType] = useState<'hotels' | 'flights' | 'cars'>(
    searchType
  );
  const [currentSort, setCurrentSort] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    stars: [],
    rating: 0,
    amenities: [],
    airline: [],
    carType: [],
  });

  // Sample data - Replace with actual API data
  const sampleHotels: HotelResult[] = initialResults?.hotels || [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      rating: 4.8,
      reviewCount: 1245,
      stars: 5,
      price: 189,
      originalPrice: 249,
      currency: 'USD',
      amenities: ['Free WiFi', 'Swimming Pool', 'Parking', 'Breakfast Included'],
      availability: true,
      distance: '0.5 km',
    },
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
      currency: 'USD',
      amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Gym'],
      availability: true,
      distance: '1.2 km',
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
      currency: 'USD',
      amenities: ['Free WiFi', 'Gym', 'Air Conditioning', 'Pet Friendly'],
      availability: true,
      distance: '0.8 km',
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
      currency: 'USD',
      amenities: ['Free WiFi', 'Spa', 'Breakfast Included', 'Parking'],
      availability: true,
      distance: '0.3 km',
    },
    {
      id: 5,
      name: 'Royal Heritage Inn',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      rating: 4.6,
      reviewCount: 987,
      stars: 4,
      price: 199,
      originalPrice: 259,
      currency: 'USD',
      amenities: ['Free WiFi', 'Parking', 'Breakfast Included'],
      availability: false,
      distance: '1.5 km',
    },
  ];

  const sampleFlights: FlightResult[] = initialResults?.flights || [
    {
      id: 1,
      airline: 'Air France',
      departure: {
        airport: 'Charles de Gaulle Airport',
        code: 'CDG',
        time: '08:30',
        date: 'Mon, Dec 15',
      },
      arrival: {
        airport: 'John F. Kennedy International',
        code: 'JFK',
        time: '11:45',
        date: 'Mon, Dec 15',
      },
      duration: '8h 15m',
      stops: 0,
      price: 650,
      originalPrice: 850,
      currency: 'USD',
      aircraft: 'Boeing 777',
      baggage: '1 carry-on included',
    },
    {
      id: 2,
      airline: 'Lufthansa',
      departure: {
        airport: 'Frankfurt Airport',
        code: 'FRA',
        time: '14:20',
        date: 'Mon, Dec 15',
      },
      arrival: {
        airport: 'Heathrow Airport',
        code: 'LHR',
        time: '15:50',
        date: 'Mon, Dec 15',
      },
      duration: '1h 30m',
      stops: 0,
      price: 320,
      currency: 'USD',
      aircraft: 'Airbus A320',
      baggage: '1 carry-on included',
    },
  ];

  const sampleCars: CarResult[] = initialResults?.cars || [
    {
      id: 1,
      model: 'Toyota Camry',
      type: 'Mid-size',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
      company: 'Hertz',
      price: 45,
      originalPrice: 60,
      currency: 'USD',
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
      price: 89,
      originalPrice: 120,
      currency: 'USD',
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
      results = sampleHotels.filter((hotel) => {
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
      {/* Header */}
      <Header />

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

            {/* Search Results */}
            <SearchResultsList
              searchType={currentSearchType}
              hotels={currentSearchType === 'hotels' ? (paginatedResults as HotelResult[]) : []}
              flights={
                currentSearchType === 'flights' ? (paginatedResults as FlightResult[]) : []
              }
              cars={currentSearchType === 'cars' ? (paginatedResults as CarResult[]) : []}
              onItemClick={handleItemClick}
              className="mb-6"
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSortedResults.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              showLoadMore={false}
            />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SearchResultsPage;

