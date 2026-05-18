import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Check, Loader2, ShieldCheck, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { API_PREFIX } from '../config/env.config';
import { APP_CONFIG } from '../constants/config';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bookingId: number) => void;
  items: { id: string; name: string; price: number; quantity: number; type: string }[];
  total: number;
  tax: number;
  serviceFee: number;
  subtotal: number;
  initialGuestInfo: GuestInfo;
  isUserLoggedIn: boolean;
}

function getUserIdHeader(): Record<string, string> {
  try {
    const raw = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.USER_DATA);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { id?: number };
    if (typeof parsed.id === 'number') return { 'X-User-Id': String(parsed.id) };
    return {};
  } catch { return {}; }
}

const CARD_STYLE = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1f2937',
      fontFamily: '"Inter", system-ui, sans-serif',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#ef4444' },
  },
};

const PaymentForm: React.FC<Omit<CheckoutDialogProps, 'isOpen'>> = ({
  onClose, onSuccess, items, total, tax, serviceFee, subtotal, initialGuestInfo, isUserLoggedIn,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<'form' | 'processing' | 'success' | 'error'>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [guestInfo, setGuestInfo] = useState<GuestInfo>(initialGuestInfo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Validate guest info
    if (!guestInfo.name.trim() || !guestInfo.email.trim() || !guestInfo.phone.trim()) {
      setErrorMsg('Please fill in all required guest information fields.');
      setStatus('error');
      return;
    }

    setStatus('processing');
    setErrorMsg('');

    try {
      const intentRes = await fetch(`${API_PREFIX}/payments/create-intent/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...getUserIdHeader() },
        body: JSON.stringify({ amount: total, currency: 'pkr' }),
      });
      const intentData = await intentRes.json();
      if (!intentData.success) throw new Error(intentData.message || 'Failed to create payment');

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error, paymentIntent } = await stripe.confirmCardPayment(intentData.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: guestInfo.name, email: guestInfo.email },
        },
      });

      if (error) throw new Error(error.message || 'Payment failed');
      if (paymentIntent?.status !== 'succeeded') throw new Error('Payment not completed');

      const confirmRes = await fetch(`${API_PREFIX}/bookings/confirm/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...getUserIdHeader() },
        body: JSON.stringify({
          guest_info: {
            name: guestInfo.name,
            email: guestInfo.email,
            phone: guestInfo.phone,
            special_requests: guestInfo.specialRequests,
          },
          items: items.map(i => ({ id: i.id, quantity: i.quantity })),
          total_amount: total,
          payment_intent_id: paymentIntent.id,
        }),
      });
      const confirmData = await confirmRes.json();
      if (!confirmData.success) throw new Error(confirmData.message || 'Booking confirmation failed');

      setBookingId(confirmData.booking_id);
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-6 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-1">Your booking has been confirmed.</p>
        {bookingId && <p className="text-sm text-gray-500 mb-4">Booking ID: <span className="font-mono font-semibold">BK-{String(bookingId).padStart(6, '0')}</span></p>}
        <p className="text-sm text-gray-500 mb-5">Confirmation email sent to <strong>{guestInfo.email}</strong></p>
        <div className="bg-gray-50 rounded-xl p-4 mb-5 text-left">
          <h3 className="font-semibold text-gray-800 mb-2 text-sm">Order Summary</h3>
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{item.name} ×{item.quantity}</span>
              <span className="font-medium">PKR {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 flex justify-between font-bold">
            <span>Total Paid</span>
            <span className="text-green-600">PKR {total.toLocaleString()}</span>
          </div>
        </div>
        <button onClick={() => { onSuccess(bookingId!); onClose(); }} className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-1">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-5">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Order Summary</h3>
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-600 truncate mr-2">{item.name} ×{item.quantity}</span>
            <span className="font-medium text-gray-900 whitespace-nowrap">PKR {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-2 pt-2 space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>PKR {subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Tax (5%)</span><span>PKR {tax.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Service Fee</span><span>PKR {serviceFee.toLocaleString()}</span></div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base">
            <span>Total</span><span className="text-blue-600">PKR {total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Guest Information */}
      <div className="mb-5">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Guest Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1"><User className="w-3.5 h-3.5" /> Full Name *</label>
            <input type="text" value={guestInfo.name} readOnly={isUserLoggedIn}
              onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
              className={`w-full px-3 py-2.5 border border-blue-400 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isUserLoggedIn ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
              placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email *</label>
              <input type="email" value={guestInfo.email} readOnly={isUserLoggedIn}
                onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                className={`w-full px-3 py-2.5 border border-blue-400 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isUserLoggedIn ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
                placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone *</label>
              <input type="tel" value={guestInfo.phone}
                onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                className="w-full px-3 py-2.5 border border-blue-400 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+92 300 1234567" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> Special Requests</label>
            <textarea value={guestInfo.specialRequests}
              onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
              rows={2}
              className="w-full px-3 py-2.5 border border-blue-400 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Any special requests..." />
          </div>
        </div>
      </div>

      {/* Card Input */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <CreditCard className="w-4 h-4" /> Card Details
        </label>
        <div className="border-2 border-blue-400 rounded-xl p-4 focus-within:border-blue-500 transition-colors bg-white">
          <CardElement options={CARD_STYLE} />
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5" /> Secured by Stripe. We never store your card details.
        </div>
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || status === 'processing'}
        className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
          status === 'processing' ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200'
        }`}
      >
        {status === 'processing' ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...</>
        ) : (
          <>Pay PKR {total.toLocaleString()}</>
        )}
      </button>
    </form>
  );
};

const CheckoutDialog: React.FC<CheckoutDialogProps> = (props) => {
  const { isOpen, onClose } = props;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" /> Secure Checkout
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-5">
                <Elements stripe={stripePromise}>
                  <PaymentForm {...props} />
                </Elements>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutDialog;
