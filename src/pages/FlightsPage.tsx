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
  const [prefilledSearch, setPrefilledSearch] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<'Singapore' | 'Dubai' | 'Baku' | 'Seoul' | 'NewYork'>('Singapore');

  const tabsList = [
    { key: 'Singapore', label: 'Singapore' },
    { key: 'Dubai', label: 'Dubai' },
    { key: 'Baku', label: 'Baku' },
    { key: 'Seoul', label: 'Seoul' },
    { key: 'NewYork', label: 'New York' },
  ];

  const packageDeals = {
    Singapore: [
      {
        id: 'sin-1',
        title: 'The Fullerton Bay Hotel + Flight',
        hotelStars: 5,
        rating: '9.6/10 Exceptional (764)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'SIN',
        toCity: 'Singapore',
        price: 'PKR 522,000',
        originalPrice: 'PKR 735,000',
        datesDisplay: 'Mon, May 25 - Sun, May 31 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-05-25',
        returnDate: '2026-05-31',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
      },
      {
        id: 'sin-2',
        title: 'Aurum Royal + Flight',
        hotelStars: 3,
        rating: '9.8/10 Exceptional (6)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'SIN',
        toCity: 'Singapore',
        price: 'PKR 301,000',
        originalPrice: 'PKR 385,000',
        datesDisplay: 'Mon, May 25 - Sun, May 31 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-05-25',
        returnDate: '2026-05-31',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      },
      {
        id: 'sin-3',
        title: 'Grand Park City Hall + Flight',
        hotelStars: 5,
        rating: '9.0/10 Wonderful (1,229)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'SIN',
        toCity: 'Singapore',
        price: 'PKR 335,000',
        originalPrice: 'PKR 422,000',
        datesDisplay: 'Mon, May 25 - Sun, May 31 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-05-25',
        returnDate: '2026-05-31',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
      },
      {
        id: 'sin-4',
        title: 'COMO Metropolitan Singapore + Flight',
        hotelStars: 5,
        rating: '9.2/10 Wonderful (102)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'SIN',
        toCity: 'Singapore',
        price: 'PKR 428,000',
        originalPrice: 'PKR 540,000',
        datesDisplay: 'Mon, May 25 - Sun, May 31 (6 nights)',
        tag: '1 night free',
        departDate: '2026-05-25',
        returnDate: '2026-05-31',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
      }
    ],
    Dubai: [
      {
        id: 'dxb-1',
        title: 'Burj Al Arab Jumeirah + Flight',
        hotelStars: 5,
        rating: '9.9/10 Exceptional (1,450)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'DXB',
        toCity: 'Dubai',
        price: 'PKR 850,000',
        originalPrice: 'PKR 1,100,000',
        datesDisplay: 'Tue, Jun 02 - Mon, Jun 08 (6 nights)',
        tag: '3 nights free',
        departDate: '2026-06-02',
        returnDate: '2026-06-08',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
      },
      {
        id: 'dxb-2',
        title: 'Atlantis The Palm + Flight',
        hotelStars: 5,
        rating: '9.7/10 Exceptional (2,301)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'DXB',
        toCity: 'Dubai',
        price: 'PKR 650,000',
        originalPrice: 'PKR 780,000',
        datesDisplay: 'Tue, Jun 02 - Mon, Jun 08 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-06-02',
        returnDate: '2026-06-08',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
      },
      {
        id: 'dxb-3',
        title: 'Jumeirah Beach Hotel + Flight',
        hotelStars: 5,
        rating: '9.4/10 Wonderful (980)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'DXB',
        toCity: 'Dubai',
        price: 'PKR 490,000',
        originalPrice: 'PKR 590,000',
        datesDisplay: 'Tue, Jun 02 - Mon, Jun 08 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-06-02',
        returnDate: '2026-06-08',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80',
      },
      {
        id: 'dxb-4',
        title: 'Rove Downtown Dubai + Flight',
        hotelStars: 3,
        rating: '9.1/10 Wonderful (512)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'DXB',
        toCity: 'Dubai',
        price: 'PKR 210,000',
        originalPrice: 'PKR 250,000',
        datesDisplay: 'Tue, Jun 02 - Mon, Jun 08 (6 nights)',
        tag: '1 night free',
        departDate: '2026-06-02',
        returnDate: '2026-06-08',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
      }
    ],
    Baku: [
      {
        id: 'gyd-1',
        title: 'Flame Towers Fairmont + Flight',
        hotelStars: 5,
        rating: '9.5/10 Exceptional (670)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'GYD',
        toCity: 'Baku',
        price: 'PKR 295,000',
        originalPrice: 'PKR 380,000',
        datesDisplay: 'Wed, Jun 10 - Tue, Jun 16 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-06-10',
        returnDate: '2026-06-16',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80',
      },
      {
        id: 'gyd-2',
        title: 'Four Seasons Baku + Flight',
        hotelStars: 5,
        rating: '9.8/10 Exceptional (340)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'GYD',
        toCity: 'Baku',
        price: 'PKR 410,000',
        originalPrice: 'PKR 490,000',
        datesDisplay: 'Wed, Jun 10 - Tue, Jun 16 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-06-10',
        returnDate: '2026-06-16',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
      },
      {
        id: 'gyd-3',
        title: 'Hilton Baku + Flight',
        hotelStars: 5,
        rating: '9.2/10 Wonderful (810)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'GYD',
        toCity: 'Baku',
        price: 'PKR 270,000',
        originalPrice: 'PKR 320,000',
        datesDisplay: 'Wed, Jun 10 - Tue, Jun 16 (6 nights)',
        tag: '1 night free',
        departDate: '2026-06-10',
        returnDate: '2026-06-16',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80',
      },
      {
        id: 'gyd-4',
        title: 'Baku Boulevard Hotel + Flight',
        hotelStars: 4,
        rating: '8.9/10 Great (410)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'GYD',
        toCity: 'Baku',
        price: 'PKR 190,000',
        originalPrice: 'PKR 230,000',
        datesDisplay: 'Wed, Jun 10 - Tue, Jun 16 (6 nights)',
        tag: '1 night free',
        departDate: '2026-06-10',
        returnDate: '2026-06-16',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
      }
    ],
    Seoul: [
      {
        id: 'icn-1',
        title: 'The Shilla Seoul + Flight',
        hotelStars: 5,
        rating: '9.6/10 Exceptional (902)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'ICN',
        toCity: 'Seoul',
        price: 'PKR 490,000',
        originalPrice: 'PKR 610,000',
        datesDisplay: 'Mon, Jun 22 - Sun, Jun 28 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-06-22',
        returnDate: '2026-06-28',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
      },
      {
        id: 'icn-2',
        title: 'Lotte Hotel Seoul + Flight',
        hotelStars: 5,
        rating: '9.4/10 Wonderful (1,230)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'ICN',
        toCity: 'Seoul',
        price: 'PKR 420,000',
        originalPrice: 'PKR 520,000',
        datesDisplay: 'Mon, Jun 22 - Sun, Jun 28 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-06-22',
        returnDate: '2026-06-28',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
      },
      {
        id: 'icn-3',
        title: 'Four Seasons Seoul + Flight',
        hotelStars: 5,
        rating: '9.7/10 Exceptional (450)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'ICN',
        toCity: 'Seoul',
        price: 'PKR 590,000',
        originalPrice: 'PKR 710,000',
        datesDisplay: 'Mon, Jun 22 - Sun, Jun 28 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-06-22',
        returnDate: '2026-06-28',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
      },
      {
        id: 'icn-4',
        title: 'Nine Tree Premier Hotel + Flight',
        hotelStars: 4,
        rating: '9.1/10 Wonderful (620)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'ICN',
        toCity: 'Seoul',
        price: 'PKR 260,000',
        originalPrice: 'PKR 310,000',
        datesDisplay: 'Mon, Jun 22 - Sun, Jun 28 (6 nights)',
        tag: '1 night free',
        departDate: '2026-06-22',
        returnDate: '2026-06-28',
        image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600&q=80',
      }
    ],
    NewYork: [
      {
        id: 'jfk-1',
        title: 'The Plaza Hotel + Flight',
        hotelStars: 5,
        rating: '9.7/10 Exceptional (2,450)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'JFK',
        toCity: 'New York',
        price: 'PKR 980,000',
        originalPrice: 'PKR 1,250,000',
        datesDisplay: 'Thu, Jul 02 - Wed, Jul 08 (6 nights)',
        tag: '3 nights free',
        departDate: '2026-07-02',
        returnDate: '2026-07-08',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
      },
      {
        id: 'jfk-2',
        title: 'Lotte New York Palace + Flight',
        hotelStars: 5,
        rating: '9.5/10 Exceptional (1,670)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'JFK',
        toCity: 'New York',
        price: 'PKR 760,000',
        originalPrice: 'PKR 940,000',
        datesDisplay: 'Thu, Jul 02 - Wed, Jul 08 (6 nights)',
        tag: '2 nights free',
        departDate: '2026-07-02',
        returnDate: '2026-07-08',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
      },
      {
        id: 'jfk-3',
        title: 'Arlo NoMad New York + Flight',
        hotelStars: 4,
        rating: '8.8/10 Great (820)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'JFK',
        toCity: 'New York',
        price: 'PKR 410,000',
        originalPrice: 'PKR 490,000',
        datesDisplay: 'Thu, Jul 02 - Wed, Jul 08 (6 nights)',
        tag: '1 night free',
        departDate: '2026-07-02',
        returnDate: '2026-07-08',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
      },
      {
        id: 'jfk-4',
        title: 'Pod 39 Hotel + Flight',
        hotelStars: 3,
        rating: '8.5/10 Very Good (1,430)',
        fromCode: 'LHE',
        fromCity: 'Lahore',
        toCode: 'JFK',
        toCity: 'New York',
        price: 'PKR 290,000',
        originalPrice: 'PKR 350,000',
        datesDisplay: 'Thu, Jul 02 - Wed, Jul 08 (6 nights)',
        tag: '1 night free',
        departDate: '2026-07-02',
        returnDate: '2026-07-08',
        image: 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=600&q=80',
      }
    ]
  };

  const featuredDeals = [
    {
      id: 'deal-1',
      fromCity: 'Lahore',
      fromCode: 'LHE',
      toCity: 'Karachi',
      toCode: 'KHI',
      price: 'PKR 59,500',
      datesDisplay: 'Mon, Jun 15 - Tue, Jun 16',
      departDate: '2026-06-15',
      returnDate: '2026-06-16',
    },
    {
      id: 'deal-2',
      fromCity: 'Lahore',
      fromCode: 'LHE',
      toCity: 'Skardu',
      toCode: 'KDU',
      price: 'PKR 70,300',
      datesDisplay: 'Sat, Jun 13 - Sun, Jun 21',
      departDate: '2026-06-13',
      returnDate: '2026-06-21',
    },
    {
      id: 'deal-3',
      fromCity: 'Lahore',
      fromCode: 'LHE',
      toCity: 'Islamabad',
      toCode: 'ISB',
      price: 'PKR 318,000',
      datesDisplay: 'Thu, Jul 16 - Sat, Jul 25',
      departDate: '2026-07-16',
      returnDate: '2026-07-25',
    },
    {
      id: 'deal-4',
      fromCity: 'Lahore',
      fromCode: 'LHE',
      toCity: 'Peshawar',
      toCode: 'PEW',
      price: 'PKR 51,500',
      datesDisplay: 'Mon, Jun 22 - Wed, Jun 24',
      departDate: '2026-06-22',
      returnDate: '2026-06-24',
    },
    {
      id: 'deal-5',
      fromCity: 'Karachi',
      fromCode: 'KHI',
      toCity: 'Lahore',
      toCode: 'LHE',
      price: 'PKR 58,400',
      datesDisplay: 'Fri, Jun 19 - Sun, Jun 21',
      departDate: '2026-06-19',
      returnDate: '2026-06-21',
    },
    {
      id: 'deal-6',
      fromCity: 'Islamabad',
      fromCode: 'ISB',
      toCity: 'Karachi',
      toCode: 'KHI',
      price: 'PKR 83,300',
      datesDisplay: 'Tue, Jul 07 - Thu, Jul 09',
      departDate: '2026-07-07',
      returnDate: '2026-07-09',
    },
  ];

  const handleDealClick = (deal: any) => {
    const searchData = {
      fromDisplay: `${deal.fromCity} (${deal.fromCode})`,
      fromIataCode: deal.fromCode,
      toDisplay: `${deal.toCity} (${deal.toCode})`,
      toIataCode: deal.toCode,
      departDate: deal.departDate,
      returnDate: deal.returnDate,
      passengers: 1,
    };

    setPrefilledSearch({
      from: { display: searchData.fromDisplay, iataCode: searchData.fromIataCode },
      to: { display: searchData.toDisplay, iataCode: searchData.toIataCode },
      departDate: searchData.departDate,
      returnDate: searchData.returnDate,
    });

    handleSearch(searchData);
  };

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
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        setError(response.message || 'No flights found for the selected criteria.');
        setFlights([]);
        setFilteredFlights([]);
        setShowResults(true);
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
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
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-blue-900/70 to-blue-800/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-white"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-40 right-40 w-16 h-16 bg-blue-300/30 rounded-full blur-lg"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto relative z-20 translate-y-16 md:translate-y-24 -mb-16 md:-mb-24"
          >
            {/* Flight Search Bar */}
            <FlightSearchBar onSearch={handleSearch} prefilledSearch={prefilledSearch} />
          </motion.div>
        </div>
      </div>

      {/* Featured Domestic Flight Deals Section */}
      {!showResults && (
        <section className="pt-28 md:pt-40 pb-20 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                Featured Flight Deals
              </h2>
              <p className="text-gray-500 mb-8">
                Grab the best offers on popular domestic routes. Click "Book Now" to search instantly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDeals.map((deal, index) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -4, boxShadow: '0 12px 20px -8px rgba(0, 0, 0, 0.08)' }}
                    onClick={() => handleDealClick(deal)}
                    className="bg-white rounded-xl border border-blue-100/70 shadow-sm overflow-hidden cursor-pointer hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Card Main Block */}
                    <div className="p-5 flex flex-col space-y-5">
                      <div className="flex items-center justify-between">
                        {/* Airline logo and source */}
                        <div className="flex items-center space-x-3.5">
                          <div className="w-10 h-10 bg-[#004b23] rounded-lg flex flex-col items-center justify-center p-1 text-[8px] font-black text-[#e9c46a] shrink-0 overflow-hidden shadow-inner">
                            <span className="tracking-widest">PIA</span>
                            <div className="w-2.5 h-2.5 rounded-full border border-[#e9c46a] relative mt-0.5">
                              <div className="absolute right-0 top-0 w-1.5 h-1.5 rounded-full bg-[#004b23]" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-lg font-extrabold text-gray-950 tracking-tight">{deal.fromCode}</h4>
                            <p className="text-xs text-gray-500 font-medium">{deal.fromCity}</p>
                          </div>
                        </div>

                        {/* Flight connection line */}
                        <div className="flex-1 px-4 relative flex items-center justify-center">
                          <div className="w-full h-px bg-gray-200" />
                          <span className="absolute w-2 h-2 rounded-full bg-blue-500" />
                        </div>

                        {/* Destination */}
                        <div className="text-right">
                          <h4 className="text-lg font-extrabold text-gray-950 tracking-tight">{deal.toCode}</h4>
                          <p className="text-xs text-gray-500 font-medium">{deal.toCity}</p>
                        </div>
                      </div>

                      {/* Price block */}
                      <div>
                        <span className="text-xs text-gray-500 font-semibold">From </span>
                        <span className="text-2xl font-black text-gray-950 tracking-tight">{deal.price}</span>
                      </div>
                    </div>

                    {/* Card Footer Block */}
                    <div className="px-5 py-3.5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <span className="text-xs font-semibold">{deal.datesDisplay}</span>
                      </div>
                      <button
                        type="button"
                        className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 font-extrabold rounded-lg text-xs transition-colors shrink-0 shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
      {/* Featured Flight Deals Section */}
      {!showResults && (
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
                Easy packages, unforgettable places
              </h2>
              <p className="text-gray-500 mb-6">
                Bundle a flight + hotel to save even more on your trip. Click any deal to search instantly.
              </p>

              {/* Horizontal Tabs */}
              <div className="flex border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none gap-6 sm:gap-8">
                {tabsList.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`pb-4 px-1 text-sm font-semibold transition-all relative ${
                      activeTab === tab.key
                        ? 'text-blue-600 font-bold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Package Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {packageDeals[activeTab].map((deal) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -6, boxShadow: '0 12px 25px -8px rgba(0, 0, 0, 0.08)' }}
                    onClick={() => handleDealClick(deal)}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-500 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image and Tag */}
                    <div className="relative h-44 overflow-hidden bg-gray-200">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover"
                      />
                      {deal.tag && (
                        <div className="absolute bottom-3 left-3 bg-[#ffc300] text-gray-950 px-2 py-1 rounded text-xs font-black shadow-sm flex items-center space-x-1">
                          <span className="text-[10px]">🎫</span>
                          <span>{deal.tag}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold text-gray-950 leading-snug tracking-tight hover:text-blue-600 transition-colors mb-2">
                          {deal.title}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3">{deal.toCity}</p>
                        
                        {/* Hotel stars and rating */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center text-yellow-500">
                            {[...Array(deal.hotelStars)].map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-600 font-bold">
                            {deal.rating}
                          </span>
                        </div>

                        {/* Route info */}
                        <div className="flex items-center space-x-2 text-[11px] text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 mb-4">
                          <span>✈️</span>
                          <span className="font-semibold">{deal.fromCity} ({deal.fromCode}) - {deal.toCity} ({deal.toCode})</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline space-x-1.5 mb-2">
                          <span className="text-lg font-black text-gray-950">{deal.price}</span>
                          <span className="text-[10px] text-gray-400 line-through">{deal.originalPrice}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mb-1">per traveler</p>
                        <p className="text-[10px] text-gray-500 font-semibold">{deal.datesDisplay}</p>
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
        <section className="pt-28 md:pt-40 pb-16 bg-gray-50">
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
        <section className="pt-28 md:pt-40 pb-16 bg-gray-50">
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
        <section id="results-section" className="pt-28 md:pt-40 pb-16 bg-gray-50">
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
