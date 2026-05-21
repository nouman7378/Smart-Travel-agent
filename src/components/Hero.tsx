import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Building, Car, Globe, Luggage, MapPin, Plane, Rocket, Star, Target } from 'lucide-react';
import DatePicker from './common/DatePicker';
import downloadBg from '../assets/download.png';


export interface HeroSearchFormData {
  from: string;
  to: string;
  checkIn: string;
  checkOut: string;
  passengers: number;
  rooms: number;
}

interface HeroProps {
  className?: string;
  hideTag?: boolean;
  smallTitle?: boolean;
  hideStats?: boolean;
  /** On /hotels: no overlap offset; search stays on same page */
  embedded?: boolean;
  /** When set, Search updates parent instead of navigating away (hotels tab) */
  onSearch?: (tab: SearchTab, data: HeroSearchFormData) => void;
}

type SearchTab = 'flights' | 'hotels' | 'cars' | 'packages';

const HERO_DATE_CLASS =
  'w-full min-w-0 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus-within:ring-2 focus-within:ring-blue-400 text-white placeholder-blue-200/60';

/** Match DatePicker compact height (h-11) for hotel text inputs & selects */
const HERO_FIELD_CLASS =
  'w-full h-11 min-h-[44px] px-3 sm:px-4 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm text-white placeholder-blue-200/60 transition-all duration-200';

const Hero: React.FC<HeroProps> = ({
  className = '',
  hideTag = false,
  smallTitle = false,
  hideStats = false,
  embedded = false,
  onSearch,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTabFromRoute = (pathname: string): SearchTab => {
    if (pathname === '/hotels' || pathname.startsWith('/hotels')) return 'hotels';
    if (pathname === '/cars' || pathname.startsWith('/cars')) return 'cars';
    if (pathname === '/packages' || pathname.startsWith('/packages')) return 'packages';
    if (pathname === '/flights' || pathname.startsWith('/flights')) return 'flights';
    return 'hotels'; // Default to hotels for the landing page
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

    if (activeTab === 'hotels' && onSearch) {
      onSearch(activeTab, { ...formData });
      const el = document.getElementById('hotel-results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

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
    } else if (activeTab === 'hotels') {
      navigate('/hotels');
    } else if (activeTab === 'cars') {
      navigate('/cars');
    } else {
      navigate('/packages');
    }
  };

  return (
    <section className={`relative ${className.includes('!min-h-fit') ? '' : 'min-h-screen flex items-center justify-center'} ${className}`}>
      {/* Background and floating elements wrapper with overflow hidden */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
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
        <div className="absolute left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-40 right-40 w-16 h-16 bg-blue-300/30 rounded-full blur-lg"></div>
      </div>

      <div className={`relative container mx-auto px-4 sm:px-4 lg:px-4 ${className.includes('!min-h-fit') ? 'py-0' : 'py-4'}`}>
        <div
          className={`max-w-6xl mx-auto relative z-20 ${
            embedded ? 'pb-2' : 'translate-y-16 md:translate-y-24 -mb-16 md:-mb-24'
          }`}
        >

          {/* Search Container */}
          <div className="bg-blue-950 rounded-2xl shadow-2xl overflow-visible border border-blue-800/40 p-1">
            {/* Search Tabs */}
            <div className="flex border-b border-blue-900/60 overflow-hidden rounded-t-xl bg-blue-950/40">
              {([
                { id: 'flights', icon: <Plane className="w-5 h-5" />, label: 'Flights' },
                { id: 'hotels', icon: <Building className="w-5 h-5" />, label: 'Hotels' },
                { id: 'cars', icon: <Car className="w-5 h-5" />, label: 'Cars' },
                { id: 'packages', icon: <Luggage className="w-5 h-5" />, label: 'Packages' }
              ] as const).map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 px-6 py-4 text-sm md:text-base font-semibold transition-all duration-300 ${activeTab === tab.id
                    ? 'text-white bg-blue-950/40 backdrop-blur-md border-b-2 border-blue-400 shadow-inner'
                    : 'text-blue-200 hover:text-white hover:bg-blue-900/30'
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">From</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm sm:text-base"><MapPin className="inline w-5 h-5" /></span>
                      <input
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleInputChange}
                        placeholder="City or airport"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base text-white placeholder-blue-200/60 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">To</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm sm:text-base"><Target className="inline w-5 h-5" /></span>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="City or airport"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base text-white placeholder-blue-200/60 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Departure</label>
                    <DatePicker
                      compact
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className={HERO_DATE_CLASS}
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Return</label>
                    <DatePicker
                      compact
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      minDate={formData.checkIn || undefined}
                      className={HERO_DATE_CLASS}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'hotels' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Destination</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none z-10">
                        <Building className="w-5 h-5" />
                      </span>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="City, hotel, or landmark"
                        className={`${HERO_FIELD_CLASS} pl-10 sm:pl-12`}
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Check-in</label>
                    <DatePicker
                      compact
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className={HERO_DATE_CLASS}
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Check-out</label>
                    <DatePicker
                      compact
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      minDate={formData.checkIn || undefined}
                      className={HERO_DATE_CLASS}
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Rooms & Guests</label>
                    <select
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleInputChange}
                      className={HERO_FIELD_CLASS}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num} className="bg-blue-950 text-white">
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
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Pick-up</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm sm:text-base"><Car className="inline w-5 h-5" /></span>
                      <input
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={handleInputChange}
                        placeholder="City or airport"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base text-white placeholder-blue-200/60 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Drop-off</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm sm:text-base"><MapPin className="inline w-5 h-5" /></span>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="City or airport"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base text-white placeholder-blue-200/60 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <label className="block text-xs sm:text-sm font-medium text-blue-100 mb-2 sm:mb-3">From</label>
                    <DatePicker
                      compact
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className={HERO_DATE_CLASS}
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-xs sm:text-sm font-medium text-blue-100 mb-2 sm:mb-3">To</label>
                    <DatePicker
                      compact
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      minDate={formData.checkIn || undefined}
                      className={HERO_DATE_CLASS}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'packages' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Destination</label>
                    <div className="relative">
                      <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm sm:text-base"><Globe className="inline w-5 h-5" /></span>
                      <input
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={handleInputChange}
                        placeholder="Where do you want to go?"
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base text-white placeholder-blue-200/60 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Travel Dates</label>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <DatePicker
                        compact
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className={HERO_DATE_CLASS}
                      />
                      <DatePicker
                        compact
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        minDate={formData.checkIn || undefined}
                        className={HERO_DATE_CLASS}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2 sm:mb-3">Travelers</label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-4 bg-blue-950/40 backdrop-blur-md border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base text-white transition-all duration-200"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num} className="bg-blue-950 text-white">
                          {num} {num === 1 ? 'Traveler' : 'Travelers'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Action Buttons - Professional Layout */}
              <div className="flex justify-end items-center mt-5 gap-4">
                {/* Search Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 sm:px-10 py-2.5 sm:py-3 bg-white hover:bg-blue-50 text-blue-900 font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                >
                  Search
                </motion.button>

                {/* AI Assistant Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base border border-violet-500/25"
                >
                  Ask AI Assistant
                </motion.button>
              </div>
            </form>
          </div>

          {/* Quick Stats */}
          {!hideStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { number: '50K+', label: 'Happy Travelers' },
                { number: '100+', label: 'Destinations' },
                { number: '24/7', label: 'AI Support' },
                { number: <span className="flex items-center justify-center gap-1">5 <Star className="w-5 h-5 fill-current" /></span>, label: 'Rated Service' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Styles are handled via Tailwind classes and global CSS */}
    </section>
  );
};

export default Hero;