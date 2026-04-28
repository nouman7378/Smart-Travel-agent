/**
 * BookingDemoPage Component
 * 
 * Booking interface with review and confirmation flow.
 * No hardcoded demo inventory is rendered on this page.
 * Part of the AI Travel Chatbot application.
 */

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useBooking } from '../../contexts/BookingContext';
import { Building, Bus, Calendar, Check, Plane, Trash2 } from 'lucide-react';


interface BookingItem {
  id: string;
  type: 'hotel' | 'flight' | 'bus' | 'car' | 'package';
  name: string;
  details: string;
  price: number;
  quantity: number;
  date?: string;
  location?: string;
}

const BookingDemoPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items: bookingItems, refreshCart } = useBooking();
  const [selectedItems, setSelectedItems] = useState<BookingItem[]>([]);
  const [bookingStep, setBookingStep] = useState<'select' | 'review' | 'confirm'>('select');
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      void refreshCart();
    }
  }, [isAuthenticated, refreshCart]);

  useEffect(() => {
    const mappedItems: BookingItem[] = bookingItems.map((item) => ({
      id: String(item.id),
      type:
        item.item_type === 'hotel_room'
          ? 'hotel'
          : item.item_type === 'car'
          ? 'car'
          : 'package',
      name: item.title,
      details: item.subtitle || '',
      price: item.unit_price,
      quantity: item.quantity,
      date: typeof item.metadata?.checkIn === 'string' ? item.metadata.checkIn : undefined,
      location: item.subtitle || undefined,
    }));
    setSelectedItems(mappedItems);
  }, [bookingItems]);

  const removeFromBooking = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Booking Demo
            </h1>
            <p className="text-lg text-gray-600">
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
                      {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
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
                        <span className="text-2xl"><Building className="inline w-5 h-5" /></span>
                        Hotels
                      </h2>
                      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600">
                        Hotel items can be added from the hotel pages and will appear in your booking summary.
                      </div>
                    </div>

                    {/* Flights Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl"><Plane className="inline w-5 h-5" /></span>
                        Flights
                      </h2>
                      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600">
                        Flight items can be added from the flights pages and will appear in your booking summary.
                      </div>
                    </div>

                    {/* Bus Routes Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl"><Bus className="inline w-5 h-5" /></span>
                        Bus Routes
                      </h2>
                      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600">
                        Package and transport items can be added from their pages and will appear in your booking summary.
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
                                  {item.type === 'hotel' ? <Building className="w-5 h-5" /> : item.type === 'flight' ? <Plane className="w-5 h-5" /> : <Bus className="w-5 h-5" />}
                                </span>
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                              </div>
                              <p className="text-sm text-gray-600">{item.details}</p>
                              {item.date && (
                                <p className="text-xs text-gray-500 mt-1"><Calendar className="inline w-5 h-5" /> {item.date}</p>
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
                                PKR {(item.price * item.quantity).toLocaleString()}
                              </p>
                              <button
                                onClick={() => removeFromBooking(item.id)}
                                className="text-red-600 hover:text-red-700 p-2"
                              >
                                <Trash2 className="inline w-5 h-5" />
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
                      <span className="text-4xl"><Check className="inline w-5 h-5" /></span>
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
                          <span className="font-semibold">PKR {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total</span>
                        <span>PKR {total.toLocaleString()}</span>
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
                    isAuthenticated ? (
                      <p className="text-gray-500 text-sm">
                        No items selected yet. Add items from hotel, car, and package pages to see your booking summary.
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Please <Link to="/login" className="text-blue-600 font-medium">sign in</Link> to manage booking items.
                      </p>
                    )
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        {selectedItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-semibold">
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-semibold">PKR {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (5%)</span>
                          <span className="font-semibold">PKR {tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fee</span>
                          <span className="font-semibold">PKR {serviceFee.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-blue-600">PKR {total.toLocaleString()}</span>
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

