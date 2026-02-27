import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroProps {
  className?: string;
}

type SearchTab = 'stays' | 'flights' | 'cars' | 'packages' | 'things-to-do';

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current route
  const getActiveTabFromRoute = (pathname: string): SearchTab => {
    if (pathname === '/hotels' || pathname.startsWith('/hotels')) return 'stays';
    if (pathname === '/cars' || pathname.startsWith('/cars')) return 'cars';
    if (pathname === '/packages' || pathname.startsWith('/packages')) return 'packages';
    if (pathname === '/explore' || pathname.startsWith('/explore')) return 'things-to-do';
    return 'stays';
  };

  const [activeTab, setActiveTab] = useState<SearchTab>(() => getActiveTabFromRoute(location.pathname));
  const [carSubTab, setCarSubTab] = useState<'rental' | 'airport'>('rental');
  const [flightTripType, setFlightTripType] = useState<'return' | 'one-way' | 'multi-city'>('return');
  const [airportTripType, setAirportTripType] = useState<'airport-to-hotel' | 'hotel-to-airport' | 'return'>('airport-to-hotel');
  const [packageSelections, setPackageSelections] = useState<{
    stay: boolean;
    flight: boolean;
    car: boolean;
  }>({
    stay: false,
    flight: false,
    car: false,
  });
  const [packageCabinClass, setPackageCabinClass] = useState<'Economy' | 'Premium economy' | 'Business class' | 'First class'>('Economy');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    checkIn: '',
    checkOut: '',
    passengers: 1,
    rooms: 1,
  });
  const [addFlightBundle, setAddFlightBundle] = useState(false);
  const [addStayBundle, setAddStayBundle] = useState(false);
  const [multiCityFlights, setMultiCityFlights] = useState([
    { id: 1, from: 'Lahore (LHE-Allam Iqbal Intl.)', to: '', date: 'Fri 13 Mar' },
    { id: 2, from: '', to: '', date: 'Fri 13 Mar' },
  ]);
  const [destinationFilter, setDestinationFilter] = useState<'all' | 'national' | 'international'>('all');

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
      'stays': '/hotels',
      flights: '/flights',
      cars: '/cars',
      packages: '/packages',
      'things-to-do': '/explore',
    };
    navigate(routes[tabId]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', { activeTab, formData });

    // Navigate based on active tab
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
    } else if (activeTab === 'stays') {
      navigate('/hotels', {
        state: {
          destination: formData.to,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          rooms: formData.rooms,
          passengers: formData.passengers,
        },
      });
    } else {
      const routes: Record<string, string> = {
        cars: '/cars',
        packages: '/packages',
        'things-to-do': '/explore',
      };
      navigate(routes[activeTab] || '/');
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Animated Background - Modern Travel Theme */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110 animate-zoom-in-out"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80)',
          }}
        ></div>
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-pink-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-400/50 via-transparent to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400/30 via-transparent to-transparent"></div>
        </div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Premium Floating Gradient Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-40 left-1/4 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, 40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Heading - Enhanced Modern Design */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-white/20 shadow-lg shadow-white/5"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white/90">AI-Powered Travel Planning</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                Explore The
              </span>
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
                World
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-4 drop-shadow-md"
            >
              Smart travel planning with AI-powered itineraries, real-time deals, and seamless bookings
            </motion.p>
          </div>

          {/* Search Container - Premium Glassmorphism */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden relative"
          >
            {/* Gradient Border Top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            {/* Search Tabs - Mobile Responsive */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200 px-2 sm:px-4 pt-4 sm:pt-6">
              <div className="flex mx-auto min-w-max">
              {([
                { 
                  id: 'stays' as const, 
                  icon: (
                    <svg className="w-5 h-5 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      <path d="M3 7h18" />
                      <path d="M7 11v.01" />
                      <path d="M7 15v.01" />
                    </svg>
                  ), 
                  label: 'Stays' 
                },
                { 
                  id: 'flights' as const, 
                  icon: (
                    <svg className="w-5 h-5 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2.5 19h19M2.5 12h19M2.5 5h19" />
                      <path d="M12 2l3 3-3 3" />
                      <path d="M12 16l3 3-3 3" />
                    </svg>
                  ), 
                  label: 'Flights' 
                },
                { 
                  id: 'cars' as const, 
                  icon: (
                    <svg className="w-5 h-5 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 17a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5z" />
                      <circle cx="7" cy="17" r="1.5" />
                      <circle cx="17" cy="17" r="1.5" />
                      <path d="M5 11h14" />
                    </svg>
                  ), 
                  label: 'Cars' 
                },
                { 
                  id: 'packages' as const, 
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="7" width="18" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                      <path d="M12 12v.01" />
                      <path d="M3 11h18" />
                    </svg>
                  ), 
                  label: 'Packages' 
                },
                { 
                  id: 'things-to-do' as const, 
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  ), 
                  label: 'Things to do' 
                }
              ]).map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center px-4 sm:px-8 py-3 sm:py-4 mx-1 sm:mx-3 transition-all duration-300 min-w-[70px] sm:min-w-0 ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mb-1 sm:mb-2">{tab.icon}</span>
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="w-full h-0.5 bg-blue-600 mt-3 rounded-full"></div>
                  )}
                </motion.button>
              ))}
              </div>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
              {activeTab === 'flights' ? (
                /* Flights Search Form */
                <div className="space-y-4">
                  {/* Trip Type Tabs */}
                  <div className="flex gap-6 border-b border-gray-200">
                    {[
                      { id: 'return', label: 'Return' },
                      { id: 'one-way', label: 'One-way' },
                      { id: 'multi-city', label: 'Multi-city' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFlightTripType(type.id as 'return' | 'one-way' | 'multi-city')}
                        className={`pb-3 text-sm font-medium transition-colors ${
                          flightTripType === type.id
                            ? 'text-blue-600 border-b-2 border-blue-600' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>

                  {/* Multi-city Layout */}
                  {flightTripType === 'multi-city' && (
                    <div className="space-y-4">
                      {/* Travellers at top for multi-city */}
                      <div className="w-64">
                        <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Travellers, Cabin class</span>
                            <span className="text-gray-900 font-medium">1 traveller, Economy</span>
                          </div>
                        </div>
                      </div>

                      {/* Flight 1 */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Flight 1</h4>
                        <div className="flex flex-col lg:flex-row gap-3 items-center">
                          {/* Leaving from */}
                          <div className="flex-1 w-full relative">
                            <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Leaving from</span>
                                <input
                                  type="text"
                                  defaultValue="Lahore (LHE-Allam Iqbal Intl.)"
                                  className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Swap Button */}
                          <button
                            type="button"
                            className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm z-10"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                          </button>

                          {/* Going to */}
                          <div className="flex-1 w-full">
                            <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Going to</span>
                                <input
                                  type="text"
                                  placeholder="City or airport"
                                  className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Date */}
                          <div className="w-48">
                            <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Date</span>
                                <span className="text-gray-900 font-medium">Fri 13 Mar</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Flight 2 */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Flight 2</h4>
                        <div className="flex flex-col lg:flex-row gap-3 items-center">
                          {/* Leaving from */}
                          <div className="flex-1 w-full relative">
                            <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Leaving from</span>
                                <input
                                  type="text"
                                  placeholder="City or airport"
                                  className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Swap Button */}
                          <button
                            type="button"
                            className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm z-10"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                          </button>

                          {/* Going to */}
                          <div className="flex-1 w-full">
                            <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Going to</span>
                                <input
                                  type="text"
                                  placeholder="City or airport"
                                  className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Date */}
                          <div className="w-48">
                            <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Date</span>
                                <span className="text-gray-900 font-medium">Fri 13 Mar</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Add another flight and Search */}
                      <div className="flex items-center justify-between">
                        <button type="button" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-sm font-medium">Add another flight</span>
                        </button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                        >
                          Search
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* One-way Layout (SS 02) */}
                  {flightTripType === 'one-way' && (
                    <div className="space-y-4">
                      <div className="flex flex-col lg:flex-row gap-3 items-center">
                        {/* Leaving from */}
                        <div className="flex-1 w-full relative">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Leaving from</span>
                              <input
                                type="text"
                                defaultValue="Lahore (LHE-Allam Iqbal Intl.)"
                                className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Swap Button */}
                        <button
                          type="button"
                          className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm z-10"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </button>

                        {/* Going to */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Going to</span>
                              <input
                                type="text"
                                placeholder="City or airport"
                                className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Date - Single date for one-way */}
                        <div className="w-48">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Date</span>
                              <span className="text-gray-900 font-medium">Fri 13 Mar</span>
                            </div>
                          </div>
                        </div>

                        {/* Travellers, Cabin class */}
                        <div className="w-56">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Travellers, Cabin class</span>
                              <span className="text-gray-900 font-medium">1 traveller, Economy</span>
                            </div>
                          </div>
                        </div>

                        {/* Search Button */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                        >
                          Search
                        </motion.button>
                      </div>

                      {/* Add a stay to Bundle & Save Checkbox */}
                      <div className="mt-2 flex items-center">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={addStayBundle}
                            onChange={(e) => setAddStayBundle(e.target.checked)}
                            className="w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="ml-3 text-gray-700">Add a stay to Bundle & Save*</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Return Layout (SS 03) */}
                  {flightTripType === 'return' && (
                    <div className="space-y-4">
                      <div className="flex flex-col lg:flex-row gap-3 items-center">
                        {/* Leaving from */}
                        <div className="flex-1 w-full relative">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Leaving from</span>
                              <input
                                type="text"
                                defaultValue="Lahore (LHE-Allam Iqbal Intl.)"
                                className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Swap Button */}
                        <button
                          type="button"
                          className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm z-10"
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </button>

                        {/* Going to */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Going to</span>
                              <input
                                type="text"
                                placeholder="City or airport"
                                className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dates - Date range for return */}
                        <div className="w-56">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Dates</span>
                              <span className="text-gray-900 font-medium">Fri 13 Mar - Fri 20 Mar</span>
                            </div>
                          </div>
                        </div>

                        {/* Travellers, Cabin class */}
                        <div className="w-56">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Travellers, Cabin class</span>
                              <span className="text-gray-900 font-medium">1 traveller, Economy</span>
                            </div>
                          </div>
                        </div>

                        {/* Search Button */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                        >
                          Search
                        </motion.button>
                      </div>

                      {/* Add a stay to Bundle & Save Checkbox */}
                      <div className="mt-2 flex items-center">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={addStayBundle}
                            onChange={(e) => setAddStayBundle(e.target.checked)}
                            className="w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="ml-3 text-gray-700">Add a stay to Bundle & Save*</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ) : activeTab === 'cars' ? (
                /* Cars Search Form */
                <div className="space-y-4">
                  {/* Car Type Tabs */}
                  <div className="flex gap-6 border-b border-gray-200">
                    {[
                      { id: 'rental', label: 'Rental cars' },
                      { id: 'airport', label: 'Airport transport' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setCarSubTab(tab.id as 'rental' | 'airport')}
                        className={`pb-3 text-sm font-medium transition-colors ${
                          carSubTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {carSubTab === 'rental' ? (
                    /* Rental Cars Form */
                    <div className="space-y-4">
                      <div className="flex flex-col lg:flex-row gap-3 items-center">
                        {/* Pick-up */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Pick-up</span>
                              <input
                                type="text"
                                name="from"
                                value={formData.from}
                                onChange={handleInputChange}
                                placeholder="City or airport"
                                className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Same as pick-up / Drop-off */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Same as pick-up</span>
                              <input
                                type="text"
                                name="to"
                                value={formData.to}
                                onChange={handleInputChange}
                                placeholder="City or airport"
                                className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Dates</span>
                              <span className="text-gray-900 font-medium">
                                {formData.checkIn && formData.checkOut 
                                  ? `${new Date(formData.checkIn).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })} - ${new Date(formData.checkOut).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}`
                                  : 'Fri 13 Mar - Sat 14 Mar'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pick-up time */}
                        <div className="w-32">
                          <div className="flex items-center w-full px-3 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <div className="flex flex-col w-full">
                              <span className="text-xs text-gray-500">Pick-up time</span>
                              <select className="text-gray-900 font-medium bg-transparent focus:outline-none w-full cursor-pointer">
                                <option>10:30</option>
                                <option>11:00</option>
                                <option>11:30</option>
                                <option>12:00</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Drop-off time */}
                        <div className="w-32">
                          <div className="flex items-center w-full px-3 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <div className="flex flex-col w-full">
                              <span className="text-xs text-gray-500">Drop-off time</span>
                              <select className="text-gray-900 font-medium bg-transparent focus:outline-none w-full cursor-pointer">
                                <option>10:30</option>
                                <option>11:00</option>
                                <option>11:30</option>
                                <option>12:00</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Search Button */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                        >
                          Search
                        </motion.button>
                      </div>

                      {/* Driver age checkbox */}
                      <div className="flex items-center gap-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="ml-3 text-gray-700 text-sm">Driver under 30 or over 70 years old</span>
                        </label>
                        <span className="text-xs text-gray-500">Young or senior drivers may be required to pay an additional fee.</span>
                        <input
                          type="text"
                          placeholder="Age"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Discount codes dropdown */}
                      <div>
                        <button type="button" className="flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900 transition-colors">
                          <span>Discount codes</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Airport Transport Form (SS 02) */
                    <div className="space-y-4">
                      {/* Trip Type Buttons */}
                      <div className="flex gap-2">
                        {[
                          { id: 'airport-to-hotel', label: 'Airport to hotel' },
                          { id: 'hotel-to-airport', label: 'Hotel to airport' },
                          { id: 'return', label: 'Return' }
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setAirportTripType(type.id as 'airport-to-hotel' | 'hotel-to-airport' | 'return')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                              airportTripType === type.id
                                ? 'bg-gray-800 text-white border-gray-800'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>

                      {/* Field Layout based on trip type */}
                      {airportTripType === 'hotel-to-airport' ? (
                        /* Hotel to airport layout */
                        <>
                          <div className="flex flex-col lg:flex-row gap-3 items-center">
                            {/* Hotel */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Hotel</span>
                                  <input
                                    type="text"
                                    placeholder="Enter hotel"
                                    className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Airport */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Airport</span>
                                  <input
                                    type="text"
                                    placeholder="Enter airport"
                                    className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-3 items-center">
                            {/* Travellers */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Travellers</span>
                                  <span className="text-gray-900 font-medium">1 traveller</span>
                                </div>
                              </div>
                            </div>

                            {/* Flight departure date */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Flight departure date</span>
                                  <span className="text-gray-900 font-medium">Fri 13 Mar</span>
                                </div>
                              </div>
                            </div>

                            {/* Flight departure time */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <div className="flex flex-col w-full">
                                  <span className="text-xs text-gray-500">Flight departure time</span>
                                  <select className="text-gray-900 font-medium bg-transparent focus:outline-none w-full cursor-pointer">
                                    <option>10:30</option>
                                    <option>11:00</option>
                                    <option>11:30</option>
                                    <option>12:00</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : airportTripType === 'return' ? (
                        /* Return layout (SS 02) */
                        <>
                          <div className="flex flex-col lg:flex-row gap-3 items-center">
                            {/* Airport */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Airport</span>
                                  <input
                                    type="text"
                                    placeholder="Enter airport"
                                    className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Hotel */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Hotel</span>
                                  <input
                                    type="text"
                                    placeholder="Enter hotel"
                                    className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-3 items-center">
                            {/* Travellers */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Travellers</span>
                                  <span className="text-gray-900 font-medium">1 traveller</span>
                                </div>
                              </div>
                            </div>

                            {/* Flight dates */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Flight dates</span>
                                  <span className="text-gray-900 font-medium">Fri 13 Mar - Sat 14 Mar</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-3 items-center">
                            {/* Flight arrival time */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <div className="flex flex-col w-full">
                                  <span className="text-xs text-gray-500">Flight arrival time</span>
                                  <select className="text-gray-900 font-medium bg-transparent focus:outline-none w-full cursor-pointer">
                                    <option>10:30</option>
                                    <option>11:00</option>
                                    <option>11:30</option>
                                    <option>12:00</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Flight departure time */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <div className="flex flex-col w-full">
                                  <span className="text-xs text-gray-500">Flight departure time</span>
                                  <select className="text-gray-900 font-medium bg-transparent focus:outline-none w-full cursor-pointer">
                                    <option>10:30</option>
                                    <option>11:00</option>
                                    <option>11:30</option>
                                    <option>12:00</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Airport to hotel layout (default) */
                        <>
                          <div className="flex flex-col lg:flex-row gap-3 items-center">
                            {/* Airport */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Airport</span>
                                  <input
                                    type="text"
                                    placeholder="Enter airport"
                                    className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Hotel */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg focus-within:shadow-purple-500/20">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Hotel</span>
                                  <input
                                    type="text"
                                    placeholder="Enter hotel"
                                    className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-3 items-center">
                            {/* Travellers */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Travellers</span>
                                  <span className="text-gray-900 font-medium">1 traveller</span>
                                </div>
                              </div>
                            </div>

                            {/* Flight arrival date */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div className="flex flex-col">
                                  <span className="text-xs text-gray-500">Flight arrival date</span>
                                  <span className="text-gray-900 font-medium">Fri 13 Mar</span>
                                </div>
                              </div>
                            </div>

                            {/* Flight arrival time */}
                            <div className="flex-1 w-full">
                              <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                                <div className="flex flex-col w-full">
                                  <span className="text-xs text-gray-500">Flight arrival time</span>
                                  <select className="text-gray-900 font-medium bg-transparent focus:outline-none w-full cursor-pointer">
                                    <option>10:30</option>
                                    <option>11:00</option>
                                    <option>11:30</option>
                                    <option>12:00</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Search Button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                      >
                        Search
                      </motion.button>
                    </div>
                  )}
                </div>
              ) : activeTab === 'things-to-do' ? (
                /* Things to Do Search Form */
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                  {/* Going to */}
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="Going to"
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex items-center w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 font-medium">Dates</span>
                          <span className="text-gray-900">Fri 13 Mar - Sat 14 Mar</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="w-full lg:w-auto">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full lg:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200"
                    >
                      Search
                    </motion.button>
                  </div>
                </div>
              ) : activeTab === 'packages' ? (
                /* Packages Search Form */
                <div className="space-y-4">
                  {/* Package Selection Tabs */}
                  <div className="flex gap-2">
                    {[
                      { id: 'stay', label: 'Stay' },
                      { id: 'flight', label: 'Flight added' },
                      { id: 'car', label: 'Car' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPackageSelections(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof prev] }))}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                          packageSelections[item.id as keyof typeof packageSelections]
                            ? 'bg-gray-800 text-white border-gray-800'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {packageSelections[item.id as keyof typeof packageSelections] 
                          ? item.id === 'stay' ? 'Stay added' : item.label
                          : item.label.replace(' added', '')}
                      </button>
                    ))}
                    {/* Cabin Class Dropdown - Show when flight is selected */}
                    {packageSelections.flight && (
                      <div className="relative">
                        <select
                          value={packageCabinClass}
                          onChange={(e) => setPackageCabinClass(e.target.value as typeof packageCabinClass)}
                          className="px-4 py-2 pr-10 rounded-full text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                          {['Economy', 'Premium economy', 'Business class', 'First class'].map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Show message if less than 2 items selected */}
                  {Object.values(packageSelections).filter(Boolean).length < 2 ? (
                    <div className="text-center py-8">
                      <div className="mb-4">
                        <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Please select two or more items</h3>
                      <p className="text-gray-500">To start building your trip, choose two or more items</p>
                    </div>
                  ) : (
                    /* Search Form when 2+ items selected */
                    <>
                      <div className="flex flex-col lg:flex-row gap-3 items-center">
                        {/* Leaving from */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Leaving from</span>
                              <input
                                type="text"
                                placeholder="Lahore (LHE-Allam Iqbal Intl.)"
                                className="text-gray-900 font-medium bg-transparent focus:outline-none w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Dates</span>
                              <span className="text-gray-900 font-medium">Fri 13 Mar - Sun 15 Mar</span>
                            </div>
                          </div>
                        </div>

                        {/* Travellers */}
                        <div className="flex-1 w-full">
                          <div className="flex items-center w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-colors cursor-pointer">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500">Travellers</span>
                              <span className="text-gray-900 font-medium">2 travellers</span>
                            </div>
                          </div>
                        </div>

                        {/* Search Button */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                        >
                          Search
                        </motion.button>
                      </div>

                      {/* Driver age checkbox - Show when car is selected */}
                      {packageSelections.car && (
                        <div className="mt-4">
                          <div className="text-sm font-medium text-gray-900 mb-2">Driver age</div>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <span className="ml-3 text-gray-700 text-sm">Driver under 30 or over 70 years old</span>
                          </label>
                          <p className="text-xs text-gray-500 mt-1 ml-8">Young or senior drivers may be required to pay an additional fee.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                /* Default Search Form for Stays */
                <>
                  <div className="flex flex-col lg:flex-row gap-4 items-end">
                    {/* Where to */}
                    <div className="flex-1 w-full">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="to"
                          value={formData.to}
                          onChange={handleInputChange}
                          placeholder="Where to?"
                          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="flex-1 w-full">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex items-center w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl cursor-pointer hover:border-gray-400 transition-colors">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium">Dates</span>
                            <span className="text-gray-900">
                              {formData.checkIn && formData.checkOut 
                                ? `${new Date(formData.checkIn).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })} - ${new Date(formData.checkOut).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}`
                                : 'Add dates'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Travellers */}
                    <div className="flex-1 w-full">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <select
                          name="rooms"
                          value={formData.rooms}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-10 py-3 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {formData.passengers} travellers, {num} {num === 1 ? 'room' : 'rooms'}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="w-full lg:w-auto">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-200"
                      >
                        Search
                      </motion.button>
                    </div>
                  </div>

                  {/* Add a flight to Bundle & Save Checkbox */}
                  <div className="mt-4 flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addFlightBundle}
                        onChange={(e) => setAddFlightBundle(e.target.checked)}
                        className="w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="ml-3 text-gray-700">Add a flight to Bundle & Save*</span>
                    </label>
                  </div>
                </>
              )}
            </form>

            {/* Member Prices Banner - Show for all tabs */}
            {(activeTab === 'stays' || activeTab === 'packages' || activeTab === 'flights' || activeTab === 'cars' || activeTab === 'things-to-do') && (
              <div className="mt-8 bg-indigo-950 rounded-2xl px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-white font-medium">Save 10% or more on over 100,000 hotels with Member Prices</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">
                  Sign in
                </button>
              </div>
            )}
          </motion.div>

          {/* Tab Content - Promotional Banner and Deals - Show for all tabs */}
          <div className="mt-8 space-y-6">
              {/* Hero Banner - Annual Holiday Sale */}
              <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
                <img 
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80" 
                  alt="Beach resort" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-yellow-400 rounded-xl p-6 max-w-xs">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Annual Holiday Sale</h3>
                  <p className="text-sm text-gray-800 mb-4">Thinking about this year's big trip? Good timing—members save up to 40% on selected hotels and homes.</p>
                  <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">
                    Book now
                  </button>
                </div>
              </div>

              {/* Members Deals Section */}
              <div className="bg-yellow-400 rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Members save up to 40% on selected stays</h3>
                    <p className="text-sm text-gray-700 mt-1">Showing deals for: 20 Mar - 22 Mar</p>
                  </div>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-300">
                    See more deals
                  </button>
                </div>

                {/* Hotel Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name: 'Acronitis Beach Resort',
                      location: 'Lindos',
                      rating: 9.6,
                      reviews: 440,
                      ratingText: 'Exceptional',
                      price: '€1,770',
                      originalPrice: '€2,950',
                      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80',
                    },
                    {
                      name: 'Palazzo Versace Dubai',
                      location: 'Dubai',
                      rating: 9.2,
                      reviews: 851,
                      ratingText: 'Wonderful',
                      price: '€755',
                      originalPrice: '€1,258',
                      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
                    },
                    {
                      name: 'JA Ocean View Hotel, Jumeirah Beach Dubai',
                      location: 'Dubai',
                      rating: 9.0,
                      reviews: 1000,
                      ratingText: 'Wonderful',
                      price: '€868',
                      originalPrice: '€1,446',
                      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
                    },
                    {
                      name: 'Sloane Place',
                      location: 'London',
                      rating: 9.3,
                      reviews: 818,
                      ratingText: 'Wonderful',
                      price: '€544',
                      originalPrice: '€906',
                      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
                    },
                  ].map((hotel, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {/* Image Container */}
                      <div className="relative h-40">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        {/* VIP Access Badge */}
                        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          VIP Access
                        </div>
                        {/* Heart Icon */}
                        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        {/* Arrow Navigation */}
                        <button className="absolute right-2 bottom-2 w-8 h-8 bg-gray-900/70 rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Content */}
                      <div className="p-3">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{hotel.name}</h4>
                        <p className="text-xs text-gray-500">{hotel.location}</p>
                        
                        {/* Rating */}
                        <div className="flex items-center mt-2">
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-1.5 py-0.5 rounded">
                            {hotel.rating}
                          </span>
                          <span className="text-xs text-gray-700 ml-1.5 font-medium">{hotel.ratingText}</span>
                          <span className="text-xs text-gray-400 ml-1">({hotel.reviews} reviews)</span>
                        </div>
                        
                        {/* Member Price */}
                        <div className="mt-2">
                          <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded inline-flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Member Price available
                          </span>
                        </div>
                        
                        {/* Price */}
                        <div className="mt-2">
                          <span className="text-lg font-bold text-gray-900">{hotel.price}</span>
                          <span className="text-sm text-gray-400 line-through ml-2">{hotel.originalPrice}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">for 2 nights, 1 room</p>
                        <p className="text-xs text-gray-400">+€{Math.round(parseInt(hotel.price.replace(/[^0-9]/g, '')) / 10)} per night</p>
                        <p className="text-xs text-gray-400">includes taxes & fees</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pakistan Tourism Section - Show for all tabs */}
              {(activeTab === 'stays' || activeTab === 'packages' || activeTab === 'flights' || activeTab === 'cars' || activeTab === 'things-to-do') && (
                <>
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Left Content */}
                      <div className="p-8 lg:p-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                          Pakistan: 'Tourism's Next Big Thing'
                        </h2>
                        <p className="text-gray-500 mb-6">— Lonely Planet</p>
                        <p className="text-gray-600 mb-8">
                          Travel with us to experience the beauty, culture, and hospitality of Pakistan!
                        </p>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Where to next?</h3>
                        
                        {/* Destination Buttons */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {['Hunza', 'Skardu', 'Gilgit', 'Lahore', 'Bahawalpur', 'Karachi'].map((city) => (
                            <button
                              key={city}
                              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                            >
                              {city}
                            </button>
                          ))}
                        </div>

                        <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                          See All
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      {/* Right Image */}
                      <div className="relative h-64 lg:h-auto">
                        <img 
                          src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80" 
                          alt="Pakistan Tourism" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Popular Destinations Section */}
                  <div className="bg-white rounded-2xl p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Popular Destinations</h3>
                      <p className="text-gray-500">Discover amazing places with our best deals. National & International</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex justify-center gap-2 mb-6">
                      {[
                        { id: 'all', label: 'All Destinations' },
                        { id: 'national', label: 'National' },
                        { id: 'international', label: 'International' }
                      ].map((filter) => (
                        <button
                          key={filter.id}
                          onClick={() => setDestinationFilter(filter.id as 'all' | 'national' | 'international')}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            destinationFilter === filter.id
                              ? 'bg-gray-800 text-white shadow-lg' 
                              : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-400 hover:shadow-md'
                          }`}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>

                    {/* Destination Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: 'Hunza', country: 'Pakistan', description: 'Heaven on earth with stunning mountain views', price: '$120', rating: '4.9', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80', type: 'national' },
                        { name: 'Skardu', country: 'Pakistan', description: 'Gateway to the world highest peaks', price: '$150', rating: '4.8', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', type: 'national' },
                        { name: 'Swat', country: 'Pakistan', description: 'The Switzerland of Pakistan', price: '$90', rating: '4.7', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80', type: 'national' },
                        { name: 'Dubai', country: 'UAE', description: 'City of gold and luxury shopping', price: '$450', rating: '4.8', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', type: 'international' },
                        { name: 'Istanbul', country: 'Turkey', description: 'Where East meets West', price: '$380', rating: '4.7', image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400&q=80', type: 'international' },
                        { name: 'Paris', country: 'France', description: 'City of love and lights', price: '$520', rating: '4.9', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', type: 'international' },
                      ].filter(dest => destinationFilter === 'all' || dest.type === destinationFilter).map((destination, index) => (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-200 transition-all duration-300"
                        >
                          <div className="relative h-48">
                            <img 
                              src={destination.image} 
                              alt={destination.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className={`${destination.type === 'national' ? 'bg-green-500' : 'bg-blue-500'} text-white text-xs font-semibold px-2 py-1 rounded`}>
                                {destination.type === 'national' ? 'National' : 'International'}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className="bg-white text-gray-900 text-xs font-semibold px-2 py-1 rounded flex items-center">
                                <svg className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {destination.rating}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-gray-900 text-lg">{destination.name}</h4>
                            <p className="text-gray-500 text-sm flex items-center mb-2">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {destination.country}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xl font-bold text-gray-900">{destination.price}</span>
                                <span className="text-gray-500 text-sm">/per person</span>
                              </div>
                              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                                View Deal
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex justify-center gap-2 mt-6">
                      <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Discover your new favourite stay */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Discover your new favourite stay</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {[
                    { name: 'Apart hotel', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=80' },
                    { name: 'Sea view', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&q=80' },
                    { name: 'Spa', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&q=80' },
                    { name: 'Resort', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&q=80' },
                    { name: 'Pool', image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=300&q=80' },
                  ].map((item, index) => (
                    <div key={index} className="relative rounded-xl overflow-hidden h-32 cursor-pointer group">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <span className="absolute bottom-2 left-2 text-white text-sm font-semibold">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stays for every travel style */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Stays for every travel style</h3>
                <p className="text-sm text-gray-500 mb-4">Average prices based on current calendar month</p>
                
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Beach', 'Culture', 'Ski', 'Family', 'Wellness and Relaxation'].map((filter, index) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        index === 0 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Destination Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Nassau', location: 'New Providence Island, Bahamas', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&q=80' },
                    { name: 'Phuket', location: 'Phuket Province, Thailand', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&q=80' },
                    { name: 'Corfu', location: 'Ionian Islands Region, Greece', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80' },
                    { name: 'Willemstad', location: 'Curaçao', image: 'https://images.unsplash.com/photo-1544144433-d50aff500b91?w=400&q=80' },
                  ].map((destination, index) => (
                    <div key={index} className="rounded-xl overflow-hidden cursor-pointer group">
                      <div className="relative h-32">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="mt-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{destination.name}</h4>
                        <p className="text-xs text-gray-500">{destination.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explore these unique stays */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Explore these unique stays</h3>
                <p className="text-sm text-gray-500 mb-4">Showing deals for: 20 Mar - 22 Mar</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name: 'The Peninsula Paris',
                      location: 'Paris',
                      rating: 9.6,
                      reviews: 328,
                      ratingText: 'Exceptional',
                      price: '€4,064',
                      originalPrice: '',
                      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80',
                      hasMemberPrice: true,
                    },
                    {
                      name: 'Shangri-La Paris',
                      location: 'Paris',
                      rating: 9.4,
                      reviews: 851,
                      ratingText: 'Exceptional',
                      price: '€3,504',
                      originalPrice: '',
                      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',
                      hasMemberPrice: false,
                      vipAccess: true,
                    },
                    {
                      name: 'Le Meurice - Dorchester Collection',
                      location: 'Paris',
                      rating: 9.4,
                      reviews: 325,
                      ratingText: 'Exceptional',
                      price: '€3,644',
                      originalPrice: '',
                      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80',
                      hasMemberPrice: false,
                      vipAccess: true,
                    },
                    {
                      name: 'Mandarin Oriental, Paris',
                      location: 'Paris',
                      rating: 9.2,
                      reviews: 212,
                      ratingText: 'Wonderful',
                      price: '€3,670',
                      originalPrice: '',
                      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
                      hasMemberPrice: false,
                      vipAccess: true,
                    },
                  ].map((hotel, index) => (
                    <div key={index} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                      {/* Image Container */}
                      <div className="relative h-40">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        {hotel.vipAccess && (
                          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                            VIP Access
                          </div>
                        )}
                        {/* Navigation Arrows */}
                        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Content */}
                      <div className="p-3">
                        {/* Rating */}
                        <div className="flex items-center mb-2">
                          <span className="bg-green-100 text-green-800 text-xs font-bold px-1.5 py-0.5 rounded">
                            {hotel.rating}
                          </span>
                          <span className="text-xs text-gray-700 ml-1.5 font-medium">{hotel.ratingText}</span>
                          <span className="text-xs text-gray-400 ml-1">({hotel.reviews} reviews)</span>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{hotel.name}</h4>
                        <p className="text-xs text-gray-500">{hotel.location}</p>
                        
                        {/* Price */}
                        <div className="mt-3">
                          <span className="text-lg font-bold text-gray-900">{hotel.price}</span>
                          {hotel.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">{hotel.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">for 2 nights, 1 room</p>
                        <p className="text-xs text-gray-400">€{Math.round(parseInt(hotel.price.replace(/[^0-9]/g, '')) / 6)} per night</p>
                        <p className="text-xs text-gray-400">includes taxes & fees</p>
                        
                        {/* Member Price Button */}
                        {hotel.hasMemberPrice && (
                          <button className="mt-3 w-full bg-indigo-600 text-white text-xs font-semibold px-3 py-2 rounded-lg inline-flex items-center justify-center hover:bg-indigo-700 transition-colors">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Member Price available
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Sign in for Member Price Button */}
                <div className="mt-6">
                  <button className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                    Sign in for Member Price
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>

      {/* Styles are handled via Tailwind classes and global CSS */}
    </section>
  );
};

export default Hero;