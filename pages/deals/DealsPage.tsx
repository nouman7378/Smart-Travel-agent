/**
 * DealsPage Component
 * 
 * Expedia-style deals page with featured offers
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DealsPage: React.FC = () => {
  const deals = [
    {
      id: 1,
      title: 'Save up to 25% on Hotels',
      description: 'Book now and save on your next hotel stay',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      discount: '25% OFF',
      category: 'Hotels',
    },
    {
      id: 2,
      title: 'Flight Deals Under $200',
      description: 'Discover amazing flight deals to popular destinations',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
      discount: 'UP TO 30%',
      category: 'Flights',
    },
    {
      id: 3,
      title: 'Package Deals',
      description: 'Bundle and save on flights + hotels',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      discount: 'SAVE $200',
      category: 'Packages',
    },
    {
      id: 4,
      title: 'Car Rental Specials',
      description: 'Great rates on car rentals worldwide',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      discount: '15% OFF',
      category: 'Cars',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Exclusive Travel Deals
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Discover amazing offers on flights, hotels, packages, and more
            </p>
          </motion.div>
        </div>
      </div>

      {/* Deals Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {deals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
                    {deal.discount}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-semibold text-gray-900">
                    {deal.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>
                  <Link
                    to={`/${deal.category.toLowerCase()}`}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    View Deals
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DealsPage;

