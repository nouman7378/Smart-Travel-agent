/**
 * PaymentGatewayDemoPage Component
 * 
 * Payment gateway demo page with placeholder UI for payment simulation.
 * No real transactions - just UI simulation with TODO notes for future integration.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { AlertTriangle, CircleDollarSign, CreditCard, Landmark } from 'lucide-react';


const PaymentGatewayDemoPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // TODO: Integrate with real payment gateway (Stripe, PayPal, etc.)
    // Example integration points:
    // - Stripe: Use Stripe.js and Stripe Elements
    // - PayPal: Use PayPal SDK
    // - Bank Transfer: Integrate with banking APIs
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    alert('Payment simulation complete! In production, this would process a real payment.');
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-dark-text mb-2">
              Payment Gateway Demo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Secure payment processing (Demo Mode)
            </p>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="inline w-5 h-5" /> This is a demo. No real payments will be processed.
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-dark-text mb-4">
              Select Payment Method
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { id: 'card', label: 'Credit Card', icon: <CreditCard className="w-5 h-5" /> },
                { id: 'paypal', label: 'PayPal', icon: <CircleDollarSign className="w-5 h-5" /> },
                { id: 'bank', label: 'Bank Transfer', icon: <Landmark className="w-5 h-5" /> },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{method.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-dark-text">
                    {method.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardDetails.number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                      setCardDetails({ ...cardDetails, number: formatted });
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardDetails.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setCardDetails({ ...cardDetails, expiry: value });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cvv: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  TODO: Integrate PayPal SDK
                </p>
                <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-semibold">
                  Pay with PayPal
                </button>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bank name"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-dark-text mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
                  />
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-800 dark:text-dark-text">PKR 350,000</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="font-semibold text-gray-800 dark:text-dark-text">PKR 17,500</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-dark-border">
                <span className="text-gray-800 dark:text-dark-text">Total</span>
                <span className="text-blue-600">PKR 367,500</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full mt-6 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </span>
              ) : (
                'Complete Payment'
              )}
            </button>

            {/* Integration Notes */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>TODO:</strong> Integrate with payment gateway (Stripe, PayPal, etc.)
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentGatewayDemoPage;

