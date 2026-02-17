import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroProps {
  className?: string;
}

type SearchTab = 'flights' | 'hotels' | 'cars' | 'packages';

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTabFromRoute = (pathname: string): SearchTab => {
    if (pathname === '/hotels' || pathname.startsWith('/hotels')) return 'hotels';
    if (pathname === '/cars' || pathname.startsWith('/cars')) return 'cars';
    if (pathname === '/packages' || pathname.startsWith('/packages')) return 'packages';
    return 'flights';
  };

  const [activeTab, setActiveTab] = useState<SearchTab>(() => getActiveTabFromRoute(location.pathname));
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    checkIn: '',
    checkOut: '',
    passengers: 1,
    rooms: 1,
  });

  // Update active tab when route changes
  useEffect(() => {
    setActiveTab(getActiveTabFromRoute(location.pathname));
  }, [location.pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'passengers' || name === 'rooms' ? parseInt(value) || 1 : value,
    }));
  };

  const handleTabClick = (tabId: SearchTab) => {
    setActiveTab(tabId);
    // Navigate to the corresponding route
    const routes: Record<SearchTab, string> = {
      flights: '/flights',
      hotels: '/hotels',
      cars: '/cars',
      packages: '/packages',
    };
    navigate(routes[tabId]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', { activeTab, formData });

    // Navigate based on active tab.
    // For flights, send the user to the dedicated /flights page which
    // uses the real backend API integration instead of the legacy
    // /search/flights demo with hardcoded data.
    if (activeTab === 'flights') {
      navigate('/flights', {
        state: {
          from: formData.from,
          to: formData.to,
          departDate: formData.checkIn,
          returnDate: formData.checkOut,
          passengers: formData.passengers,
        },
      });
    } else {
      const routes: Record<Exclude<SearchTab, 'flights'>, string> = {
        hotels: '/search/hotels',
        cars: '/search/cars',
        packages: '/packages',
      };
      navigate(routes[activeTab as Exclude<SearchTab, 'flights'>]);
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110 animate-zoom-in-out"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80)',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/60 to-indigo-800/90"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute top-40 right-40 w-16 h-16 bg-blue-300/30 rounded-full blur-lg animate-pulse"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white/90">AI-Powered Travel Planning</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Explore The
              <span className="block mt-1 sm:mt-2">World</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-4">
              Smart travel planning with AI-powered itineraries, real-time deals, and seamless bookings
            </p>
          </div>

          {/* Search Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Search Tabs */}
            <div className="flex border-b border-gray-200">
              {([
                { id: 'flights', icon: '✈️', label: 'Flights' },
                { id: 'hotels', icon: '🏨', label: 'Hotels' },
                { id: 'cars', icon: '🚗', label: 'Cars' },
                { id: 'packages', icon: '🎒', label: 'Packages' }
              ] as const).map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-6 py-4 text-sm md:text-base font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <motion.span 
                    className="flex items-center justify-center space-x-3"
                    animate={activeTab === tab.id ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </motion.span>
                </motion.button>
              ))}
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
              {activeTab === 'flights' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">From</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm sm:text-base">📍</span>
                      <input
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleInputChange}
                        placeholder="City or airport"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">To</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm sm:text-base">🎯</span>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="City or airport"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-2 lg:col-span-1">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Departure</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm text-gray-900 shadow-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Return</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm text-gray-900 shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hotels' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Destination</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm sm:text-base">🏨</span>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="City, hotel, or landmark"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 shadow-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Check-in</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm text-gray-900 shadow-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Check-out</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm text-gray-900 shadow-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Rooms & Guests</label>
                    <select
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 shadow-lg"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Room' : 'Rooms'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'cars' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Pick-up</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm sm:text-base">🚗</span>
                      <input
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleInputChange}
                        placeholder="City or airport"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 shadow-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Drop-off</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm sm:text-base">📍</span>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="City or airport"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 shadow-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">From</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm text-gray-900 shadow-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">To</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm text-gray-900 shadow-lg"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'packages' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Destination</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm sm:text-base">🌍</span>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="Where do you want to go?"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 shadow-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Travel Dates</label>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm text-gray-900 shadow-lg"
                      />
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm text-gray-900 shadow-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Travelers</label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-white border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 shadow-lg"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Traveler' : 'Travelers'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Action Buttons - Professional Layout */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                {/* Search Button - Centered */}
                <div className="flex-1 flex justify-center">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 group"
                  >
                    <span className="text-base">Search</span>
                    <motion.span 
                      className="text-lg"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      🚀
                    </motion.span>
                  </motion.button>
                </div>

                {/* AI Assistant Button - Right Corner */}
                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-green-400/30 text-sm sm:text-base"
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      🤖
                    </motion.span>
                    <span>Ask AI Assistant</span>
                  </motion.button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { number: '50K+', label: 'Happy Travelers' },
              { number: '100+', label: 'Destinations' },
              { number: '24/7', label: 'AI Support' },
              { number: '5★', label: 'Rated Service' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styles are handled via Tailwind classes and global CSS */}
    </section>
  );
};

export default Hero;