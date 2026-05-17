/**
 * HotelGallery Component
 * 
 * This component is part of the Expedia.fr Hotel Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Image carousel
 * - Thumbnails below
 */

import React, { useState } from 'react';

interface HotelGalleryProps {
  images: string[];
  hotelName?: string;
  className?: string;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ images, hotelName = '', className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className={`bg-gray-200 h-64 md:h-96 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Carousel */}
      <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden rounded-lg md:rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`${hotelName} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Next image"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* View All Photos Button */}
        <button className="absolute bottom-4 left-4 bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-lg transition-colors flex items-center space-x-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>View All Photos</span>
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentIndex === index
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                  currentIndex === index ? 'scale-100' : 'hover:scale-110'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelGallery;

