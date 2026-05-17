import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
  hoverGradient: string;
  iconColor: string;
}

interface TravelCategoriesProps {
  className?: string;
}

const TravelCategories: React.FC<TravelCategoriesProps> = ({ className = '' }) => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Flights',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      description: 'Find the best flight deals',
      gradient: 'from-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-600 to-cyan-600',
      iconColor: 'text-white',
    },
    {
      id: 2,
      name: 'Hotels',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      description: 'Book your perfect stay',
      gradient: 'from-emerald-500 to-teal-500',
      hoverGradient: 'from-emerald-600 to-teal-600',
      iconColor: 'text-white',
    },
    {
      id: 3,
      name: 'Cars',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      description: 'Rent a car for your trip',
      gradient: 'from-orange-500 to-amber-500',
      hoverGradient: 'from-orange-600 to-amber-600',
      iconColor: 'text-white',
    },
    {
      id: 4,
      name: 'Packages',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      description: 'All-inclusive vacation deals',
      gradient: 'from-purple-500 to-violet-500',
      hoverGradient: 'from-purple-600 to-violet-600',
      iconColor: 'text-white',
    },
    {
      id: 5,
      name: 'Cruises',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      description: 'Luxury cruise experiences',
      gradient: 'from-indigo-500 to-blue-500',
      hoverGradient: 'from-indigo-600 to-blue-600',
      iconColor: 'text-white',
    },
    {
      id: 6,
      name: 'Activities',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      description: 'Things to do & experiences',
      gradient: 'from-pink-500 to-rose-500',
      hoverGradient: 'from-pink-600 to-rose-600',
      iconColor: 'text-white',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };


  return (
    <section className={`pt-12 md:pt-16 lg:pt-20 pb-0 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Travel Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for your perfect trip in one place
          </p>
        </motion.div>

        {/* Categories Grid - Original Size Maintained */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              whileHover="hover"
              className={`group relative p-4 md:p-6 rounded-lg bg-gradient-to-br ${category.gradient} shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
              
              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                {/* Icon Container with Animation */}
                <motion.div 
                  className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm ${category.iconColor} group-hover:bg-white/30 transition-all duration-300`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {category.icon}
                </motion.div>

                {/* Text Content */}
                <div className="space-y-2">
                  <motion.h3 
                    className="text-base md:text-lg font-semibold text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.name}
                  </motion.h3>
                  <motion.p 
                    className="text-white/90 text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.description}
                  </motion.p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full"
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: category.id * 0.2
                }}
              />
              <motion.div
                className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/20 rounded-full"
                animate={{
                  y: [0, 4, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: category.id * 0.3
                }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gray-900 hover:bg-black text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Explore All Categories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelCategories;