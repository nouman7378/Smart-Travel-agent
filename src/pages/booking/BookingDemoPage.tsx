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
import CheckoutDialog from '../../components/CheckoutDialog';
import { Building, Bus, Car, Calendar, Check, Plane, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react';
import { API_PREFIX } from '../../config/env.config';
import { APP_CONFIG } from '../../constants/config';


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
  const { isAuthenticated, user } = useAuth();
  const { items: bookingItems, refreshCart, removeItemFromBooking } = useBooking();
  const [selectedItems, setSelectedItems] = useState<BookingItem[]>([]);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [guestInfo, setGuestInfo] = useState(() => {
    try {
      const saved = sessionStorage.getItem('bookingDemoGuestInfo');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (user) {
          parsed.name = user.full_name || user.username || '';
          parsed.email = user.email || '';
        }
        return parsed;
      }
    } catch (e) {
      console.error('Session storage error:', e);
    }
    return {
      name: user?.full_name || user?.username || '',
      email: user?.email || '',
      phone: '',
      specialRequests: '',
    };
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmedBookings, setConfirmedBookings] = useState<any[]>([]);

  const fetchConfirmedBookings = async () => {
    if (!isAuthenticated) return;
    try {
      const getUserIdHeader = () => {
        try {
          const raw = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
          if (!raw) return {};
          const parsed = JSON.parse(raw) as { id?: number };
          if (typeof parsed.id === 'number') return { 'X-User-Id': String(parsed.id) };
          return {};
        } catch { return {}; }
      };

      const res = await fetch(`${API_PREFIX}/bookings/user/`, {
        method: 'GET',
        credentials: 'include',
        headers: getUserIdHeader(),
      });
      const data = await res.json();
      if (data.success && data.bookings) {
        setConfirmedBookings(data.bookings);
      }
    } catch (e) {
      console.error('Failed to fetch confirmed bookings:', e);
    }
  };

  // Sync guest info if user loads or is changed, always prioritizing the logged-in user
  useEffect(() => {
    if (user) {
      setGuestInfo((prev: typeof guestInfo) => ({
        ...prev,
        name: user.full_name || user.username || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    try {
      sessionStorage.setItem('bookingDemoGuestInfo', JSON.stringify(guestInfo));
    } catch (e) {}
  }, [guestInfo]);

  useEffect(() => {
    if (isAuthenticated) {
      void refreshCart();
      void fetchConfirmedBookings();
    }
  }, [isAuthenticated, refreshCart]);

  useEffect(() => {
    const mappedItems: BookingItem[] = bookingItems.map((item) => ({
      id: String(item.id),
      type:
        item.item_type === 'hotel_room'
          ? 'hotel'
          : item.item_type === 'flight'
          ? 'flight'
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

  const removeFromBooking = async (id: string) => {
    setRemovingItemId(id);
    try {
      if (isAuthenticated) {
        await removeItemFromBooking(Number(id));
      }
      setSelectedItems((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to remove booking item:', error);
      alert('Could not remove the booking item. Please try again.');
    } finally {
      setRemovingItemId((current) => (current === id ? null : current));
    }
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

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'hotel': return <Building className="w-5 h-5" />;
      case 'flight': return <Plane className="w-5 h-5" />;
      case 'car': return <Car className="w-5 h-5" />;
      default: return <Bus className="w-5 h-5" />;
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to book');
      return;
    }
    setShowCheckout(true);
  };

  const handlePaymentSuccess = (_bookingId: number) => {
    void fetchConfirmedBookings();
    if (isAuthenticated) {
      void refreshCart();
    }
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Booking
            </h1>
            <p className="text-lg text-gray-600">
              Review your selected items, fill guest info, and pay securely
            </p>
          </div>

          {/* Booking Steps Indicator */}
          <div className="mb-8 flex items-center justify-center gap-4">
            {['Select & Review', 'Payment', 'Confirmation'].map((step, index) => {
              const stepNum = index + 1;
              const currentStepNum = showCheckout ? 2 : 1;
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
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    {/* Selected Items Review */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-blue-600" />
                        Your Booking Items
                      </h2>
                      {selectedItems.length === 0 ? (
                        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                          <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="font-medium mb-1">No items in your booking yet</p>
                          <p className="text-sm">Add hotels, cars, or packages from their respective pages.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedItems.map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-200 transition-colors">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-blue-600">{getItemIcon(item.type)}</span>
                                  <span className="text-xs font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{item.type}</span>
                                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                </div>
                                <p className="text-sm text-gray-600 ml-7">{item.details}</p>
                                {item.date && (
                                  <p className="text-xs text-gray-500 mt-1 ml-7 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</p>
                                )}
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center">-</button>
                                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center">+</button>
                                </div>
                                <p className="text-lg font-bold text-gray-800 w-28 text-right">
                                  PKR {(item.price * item.quantity).toLocaleString()}
                                </p>
                                <button
                                  onClick={() => removeFromBooking(item.id)}
                                  disabled={removingItemId === item.id}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Trash2 className={`w-5 h-5 ${removingItemId === item.id ? 'animate-pulse' : ''}`} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Confirmed Bookings History */}
                    {confirmedBookings.length > 0 && (
                      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <ShieldCheck className="w-6 h-6 text-green-600" />
                          Your Booked Items & Packages
                        </h2>
                        <div className="space-y-4">
                          {confirmedBookings.map((b) => (
                            <div key={b.id} className="border border-green-100 rounded-xl p-4 bg-green-50/30">
                              <div className="flex justify-between items-start mb-3 border-b border-green-100/50 pb-2">
                                <div>
                                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full mr-2">CONFIRMED</span>
                                  <span className="text-sm font-mono text-gray-500">BK-{String(b.id).padStart(6, '0')}</span>
                                </div>
                                <span className="text-xs text-gray-400">{new Date(b.created_at).toLocaleDateString()}</span>
                              </div>
                              <div className="space-y-2">
                                {b.items.map((item: any) => (
                                  <div key={item.id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                      <span className="text-blue-500">
                                        {getItemIcon(
                                          item.item_type === 'hotel_room'
                                            ? 'hotel'
                                            : item.item_type === 'car'
                                            ? 'car'
                                            : 'package'
                                        )}
                                      </span>
                                      <span className="font-semibold text-gray-800">{item.title}</span>
                                      <span className="text-gray-500">×{item.quantity}</span>
                                    </div>
                                    <span className="font-medium text-gray-700">PKR {item.line_total.toLocaleString()}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t border-green-100/50 mt-3 pt-2 flex justify-between items-center font-bold text-sm">
                                <span className="text-gray-600">Total Paid</span>
                                <span className="text-green-600">PKR {b.total_amount.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
              </AnimatePresence>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
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
                          <div key={item.id} className="flex items-start gap-2 text-sm p-2 rounded-lg bg-gray-50">
                            <span className="text-blue-600 mt-0.5 flex-shrink-0">{getItemIcon(item.type)}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 truncate">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.type} · Qty: {item.quantity}</p>
                            </div>
                            <span className="font-semibold text-gray-800 whitespace-nowrap">
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
                      <button
                        onClick={handleProceedToCheckout}
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-blue-200"
                      >
                        Proceed to Payment
                      </button>
                    </>
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Checkout Dialog with Guest Info + Stripe Payment */}
      <CheckoutDialog
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        onSuccess={handlePaymentSuccess}
        items={selectedItems}
        total={total}
        tax={tax}
        serviceFee={serviceFee}
        subtotal={subtotal}
        initialGuestInfo={guestInfo}
        isUserLoggedIn={!!user}
      />
    </PageLayout>
  );
};

export default BookingDemoPage;
