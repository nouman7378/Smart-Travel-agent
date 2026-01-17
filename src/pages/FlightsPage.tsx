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
import { dummyFlights, Flight } from '../data/flightData';

const FlightsPage: React.FC = () => {
  const [flights] = useState<Flight[]>(dummyFlights);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(dummyFlights);
  const [showResults, setShowResults] = useState(false);

  const popularDestinations = [
    { name: 'Paris', code: 'CDG', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=80' },
    { name: 'Londres', code: 'LHR', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80' },
    { name: 'New York', code: 'JFK', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&q=80' },
    { name: 'Tokyo', code: 'NRT', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=80' },
    { name: 'Dubai', code: 'DXB', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&q=80' },
    { name: 'Barcelone', code: 'BCN', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=300&q=80' },
  ];

  const handleSearch = (searchData: any) => {
    // In a real app, this would make an API call
    console.log('Search data:', searchData);
    setShowResults(true);
    // Filter flights based on search criteria
    let filtered = [...flights];
    
    if (searchData.from) {
      filtered = filtered.filter(f => 
        f.departure.airport.toLowerCase().includes(searchData.from.toLowerCase()) ||
        f.departure.code.toLowerCase().includes(searchData.from.toLowerCase())
      );
    }
    
    if (searchData.to) {
      filtered = filtered.filter(f => 
        f.arrival.airport.toLowerCase().includes(searchData.to.toLowerCase()) ||
        f.arrival.code.toLowerCase().includes(searchData.to.toLowerCase())
      );
    }
    
    setFilteredFlights(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...flights];
    
    // Price filter
    filtered = filtered.filter(f => 
      f.price >= filters.priceRange[0] && f.price <= filters.priceRange[1]
    );
    
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
      filtered = filtered.filter(f => filters.airlines.includes(f.airline));
    }
    
    // Refundable filter
    if (filters.refundable) {
      filtered = filtered.filter(f => f.refundable);
    }
    
    // Flexible filter
    if (filters.flexible) {
      filtered = filtered.filter(f => f.flexible);
    }
    
    setFilteredFlights(filtered);
  };

  const handleSortChange = (sortBy: string) => {
    const sorted = [...filteredFlights].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseInt(a.duration.replace('h', '').replace('m', '')) - parseInt(b.duration.replace('h', '').replace('m', ''));
        case 'departure':
          return a.departure.time.localeCompare(b.departure.time);
        default:
          return 0;
      }
    });
    setFilteredFlights(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search Bar */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Search for flights</h1>
              <p className="text-xl text-blue-100">
                Compare prices from hundreds of airlines
              </p>
            </div>
            
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
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
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

      {/* Results Section */}
      {showResults && (
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

      {/* Features Section (shown when no results) */}
      {!showResults && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Why choose TravelHub for your flights?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '💰',
                    title: 'Best prices',
                    description: 'Compare prices from multiple airlines to get the best deals',
                  },
                  {
                    icon: '📅',
                    title: 'Flexible dates',
                    description: 'Check prices on different dates to find the cheapest options',
                  },
                  {
                    icon: '⭐',
                    title: 'Trusted airlines',
                    description: 'Book with confidence from our network of partner airlines',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default FlightsPage;
