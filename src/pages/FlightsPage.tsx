/**
 * FlightsPage Component
 * 
 * Expedia.fr-style flights page with search, filters, and results
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlightSearchBar from '../components/flights/FlightSearchBar';
import FlightFilters from '../components/flights/FlightFilters';
import FlightResults from '../components/flights/FlightResults';
import { searchFlights, extractAirportCode, formatDate, Flight } from '../services/flightService';
import { Banknote, Calendar, Frown, Star } from 'lucide-react';

import downloadBg from '../assets/download.png';


const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<any>(null);

  const popularDestinations = [
    { name: 'Paris', code: 'CDG', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80' },
    { name: 'Londres', code: 'LHR', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80' },
    { name: 'New York', code: 'JFK', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&q=80' },
    { name: 'Tokyo', code: 'NRT', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80' },
    { name: 'Dubai', code: 'DXB', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80' },
    { name: 'Barcelone', code: 'BCN', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=300&q=80' },
  ];

  const handleSearch = async (searchData: any) => {
    setIsLoading(true);
    setError(null);
    setSearchParams(searchData);
    
    try {
      // Use IATA codes directly from the selected cities
      const fromCode = searchData.fromIataCode;
      const toCode = searchData.toIataCode;
      const formattedDate = formatDate(searchData.departDate);
      
      if (!fromCode || !toCode || !formattedDate) {
        setError('Please select valid departure and destination airports from the dropdown.');
        setIsLoading(false);
        return;
      }

      const response = await searchFlights({
        departure_airport_code: fromCode,
        destination_airport_code: toCode,
        travel_date: formattedDate,
        number_of_passengers: searchData.passengers || 1,
      });

      if (response.success && response.flights) {
        setFlights(response.flights);
        setFilteredFlights(response.flights);
        setShowResults(true);
      } else {
        setError(response.message || 'No flights found for the selected criteria.');
        setFlights([]);
        setFilteredFlights([]);
        setShowResults(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching for flights.');
      setFlights([]);
      setFilteredFlights([]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...flights];
    
    // Price filter (price is a string, convert to number)
    filtered = filtered.filter(f => {
      const priceNum = parseFloat(f.price);
      return priceNum >= filters.priceRange[0] && priceNum <= filters.priceRange[1];
    });
    
    // Stops filter
    if (filters.stops.length > 0) {
      filtered = filtered.filter(f => {
        if (filters.stops.includes('Nonstop')) {
          return f.stops === 0;
        }
        if (filters.stops.includes('1 stop')) {
          return f.stops === 1;
        }
        if (filters.stops.includes('2+ stops')) {
          return f.stops >= 2;
        }
        return true;
      });
    }
    
    // Airline filter
    if (filters.airlines.length > 0) {
      filtered = filtered.filter(f => filters.airlines.includes(f.airline_name));
    }
    
    setFilteredFlights(filtered);
  };

  const handleSortChange = (sortBy: string) => {
    const sorted = [...filteredFlights].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'duration':
          return parseInt(a.duration.replace('h', '').replace('m', '')) - parseInt(b.duration.replace('h', '').replace('m', ''));
        case 'departure':
          return a.departure_time.localeCompare(b.departure_time);
        default:
          return 0;
      }
    });
    setFilteredFlights(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search Bar */}
      <div className="relative text-white pt-12 pb-12 md:pt-16 md:pb-16">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden rounded-b-3xl sm:rounded-none">
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-110 animate-zoom-in-out"
            style={{
              backgroundImage: `url(${downloadBg})`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-40 right-40 w-16 h-16 bg-blue-300/30 rounded-full blur-lg animate-pulse"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto relative z-20 translate-y-16 md:translate-y-24 -mb-16 md:-mb-24"
          >
            {/* Flight Search Bar */}
            <FlightSearchBar onSearch={handleSearch} />
          </motion.div>
        </div>
      </div>

      {/* Popular Destinations */}
      {!showResults && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Popular Destinations
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.code}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-semibold text-sm">{dest.name}</h3>
                        <p className="text-white/80 text-xs">{dest.code}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-lg text-gray-600">Searching for the best flights...</p>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4"><Frown className="inline w-5 h-5" /></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops!</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  if (searchParams) {
                    handleSearch(searchParams);
                  }
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {showResults && !isLoading && !error && (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <FlightFilters onFilterChange={handleFilterChange} />
                </div>
              </div>

              {/* Main Results */}
              <div className="lg:col-span-3">
                <FlightResults flights={filteredFlights} onSortChange={handleSortChange} />
              </div>
            </div>
          </div>
        </section>
      )}

    
    </div>
  );
};

export default FlightsPage;
