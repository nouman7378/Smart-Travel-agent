/**
 * BookingDemoPage Component
 * 
 * Real booking demo interface allowing users to select hotels/flights/bus
 * from mock data, show price breakdown, and confirmation preview.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface BookingItem {
  id: string;
  type: 'hotel' | 'flight' | 'bus';
  name: string;
  details: string;
  price: number;
  quantity: number;
  date?: string;
  location?: string;
}

const BookingDemoPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<BookingItem[]>([]);
  const [bookingStep, setBookingStep] = useState<'select' | 'review' | 'confirm'>('select');
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  // Mock data for selection
  const mockHotels = [
    { id: 'h1', name: 'Serena Hotel Hunza', location: 'Karimabad, Hunza', price: 45, rating: 4.5, amenities: ['WiFi', 'Restaurant', 'Mountain View'] },
    { id: 'h2', name: 'Shangrila Resort', location: 'Skardu', price: 50, rating: 4.6, amenities: ['WiFi', 'Lake View', 'Restaurant'] },
    { id: 'h3', name: 'Pearl Continental Lahore', location: 'Lahore', price: 80, rating: 4.7, amenities: ['WiFi', 'Pool', 'Spa'] },
  ];

  const mockFlights = [
    { id: 'f1', name: 'Pakistan International Airlines', route: 'Islamabad → Skardu', price: 150, duration: '1h 15m', date: '2024-06-15' },
    { id: 'f2', name: 'Air Blue', route: 'Lahore → Karachi', price: 120, duration: '1h 30m', date: '2024-06-15' },
    { id: 'f3', name: 'Serene Air', route: 'Islamabad → Gilgit', price: 140, duration: '1h 20m', date: '2024-06-15' },
  ];

  const mockBusRoutes = [
    { id: 'b1', name: 'Luxury Coach', route: 'Islamabad → Hunza', price: 25, duration: '12 hours', date: '2024-06-15' },
    { id: 'b2', name: 'Daewoo Express', route: 'Lahore → Karachi', price: 20, duration: '14 hours', date: '2024-06-15' },
    { id: 'b3', name: 'Faisal Movers', route: 'Islamabad → Skardu', price: 30, duration: '16 hours', date: '2024-06-15' },
  ];

  const addToBooking = (item: any, type: 'hotel' | 'flight' | 'bus') => {
    const bookingItem: BookingItem = {
      id: item.id,
      type,
      name: item.name,
      details: type === 'hotel' ? item.location : item.route,
      price: item.price,
      quantity: 1,
      date: item.date,
      location: type === 'hotel' ? item.location : undefined,
    };
    setSelectedItems([...selectedItems, bookingItem]);
  };

  const removeFromBooking = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const serviceFee = 10;
  const total = subtotal + tax + serviceFee;

  const handleProceedToReview = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to book');
      return;
    }
    setBookingStep('review');
  };

  const handleConfirmBooking = () => {
    if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) {
      alert('Please fill in all required guest information');
      return;
    }
    setBookingStep('confirm');
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen relative overflow-hidden py-8">
        {/* Background Image with Gradient Overlay - Same as other pages */}
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
        </div>
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          {/* Floating Particles */}
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

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg">
              Booking Demo
            </h1>
            <p className="text-lg text-white/80 drop-shadow-md">
              Select your travel items and complete a demo booking
            </p>
          </div>

          {/* Booking Steps Indicator */}
          <div className="mb-8 flex items-center justify-center gap-4">
            {['Select Items', 'Review', 'Confirmation'].map((step, index) => {
              const stepNum = index + 1;
              const currentStepNum = bookingStep === 'select' ? 1 : bookingStep === 'review' ? 2 : 3;
              const isActive = stepNum === currentStepNum;
              const isCompleted = stepNum < currentStepNum;

              return (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white scale-110'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {isCompleted ? '✓' : stepNum}
                    </div>
                    <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                      {step}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={`h-1 w-16 transition-all ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="wait">
                {bookingStep === 'select' && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Hotels Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🏨</span>
                        Hotels
                      </h2>
                      <div className="space-y-4">
                        {mockHotels.map((hotel) => (
                          <motion.div
                            key={hotel.id}
                            whileHover={{ scale: 1.02 }}
                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                  {hotel.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">📍 {hotel.location}</p>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-yellow-500">★</span>
                                  <span className="text-sm font-semibold">{hotel.rating}</span>
                                  <span className="text-xs text-gray-500">({hotel.amenities.length} amenities)</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {hotel.amenities.map((amenity, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded"
                                    >
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-2xl font-bold text-blue-600 mb-2">
                                  ${hotel.price}
                                  <span className="text-sm font-normal text-gray-600">/night</span>
                                </p>
                                <button
                                  onClick={() => addToBooking(hotel, 'hotel')}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                                >
                                  Add to Booking
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Flights Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">✈️</span>
                        Flights
                      </h2>
                      <div className="space-y-4">
                        {mockFlights.map((flight) => (
                          <motion.div
                            key={flight.id}
                            whileHover={{ scale: 1.02 }}
                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                  {flight.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">🛫 {flight.route}</p>
                                <p className="text-xs text-gray-500">
                                  ⏱️ {flight.duration} • 📅 {flight.date}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-2xl font-bold text-blue-600 mb-2">
                                  ${flight.price}
                                </p>
                                <button
                                  onClick={() => addToBooking(flight, 'flight')}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                                >
                                  Add to Booking
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Bus Routes Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🚌</span>
                        Bus Routes
                      </h2>
                      <div className="space-y-4">
                        {mockBusRoutes.map((bus) => (
                          <motion.div
                            key={bus.id}
                            whileHover={{ scale: 1.02 }}
                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                  {bus.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">🛣️ {bus.route}</p>
                                <p className="text-xs text-gray-500">
                                  ⏱️ {bus.duration} • 📅 {bus.date}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-2xl font-bold text-blue-600 mb-2">
                                  ${bus.price}
                                </p>
                                <button
                                  onClick={() => addToBooking(bus, 'bus')}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                                >
                                  Add to Booking
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {bookingStep === 'review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Selected Items */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Review Your Booking
                      </h2>
                      <div className="space-y-4">
                        {selectedItems.map((item) => (
                          <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl">
                                  {item.type === 'hotel' ? '🏨' : item.type === 'flight' ? '✈️' : '🚌'}
                                </span>
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                              </div>
                              <p className="text-sm text-gray-600">{item.details}</p>
                              {item.date && (
                                <p className="text-xs text-gray-500 mt-1">📅 {item.date}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                >
                                  +
                                </button>
                              </div>
                              <p className="text-lg font-bold text-gray-800 w-24 text-right">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <button
                                onClick={() => removeFromBooking(item.id)}
                                className="text-red-600 hover:text-red-700 p-2"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Guest Information */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Guest Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={guestInfo.name}
                            onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={guestInfo.email}
                            onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={guestInfo.phone}
                            onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+92 300 1234567"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Special Requests
                          </label>
                          <textarea
                            value={guestInfo.specialRequests}
                            onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Any special requests or notes..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setBookingStep('select')}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Back to Selection
                      </button>
                      <button
                        onClick={handleConfirmBooking}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </motion.div>
                )}

                {bookingStep === 'confirm' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl shadow-lg p-8 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">✓</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      Booking Confirmed!
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Your booking has been successfully processed. A confirmation email will be sent to {guestInfo.email}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                      <h3 className="font-semibold text-gray-800 mb-3">Booking Summary</h3>
                      {selectedItems.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2 text-sm">
                          <span className="text-gray-600">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setBookingStep('select');
                          setSelectedItems([]);
                          setGuestInfo({ name: '', email: '', phone: '', specialRequests: '' });
                        }}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                      >
                        New Booking
                      </button>
                      <button
                        onClick={() => navigate('/')}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Go to Home
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Booking Summary Sidebar */}
            {bookingStep !== 'confirm' && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Booking Summary
                  </h2>
                  {selectedItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No items selected yet. Add items from the list to see your booking summary.
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        {selectedItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (5%)</span>
                          <span className="font-semibold">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fee</span>
                          <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-blue-600">${total.toFixed(2)}</span>
                        </div>
                      </div>
                      {bookingStep === 'select' && (
                        <button
                          onClick={handleProceedToReview}
                          className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                          Proceed to Review
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BookingDemoPage;

