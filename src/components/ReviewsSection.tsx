/**
 * ReviewsSection Component
 * 
 * This component is part of the Expedia.fr Hotel Detail Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - List of reviews with user avatar, name, rating, comment
 */

import React, { useState } from 'react';

export interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  userLocation?: string;
  rating: number;
  date: string;
  title?: string;
  comment: string;
  verified?: boolean;
  helpful?: number;
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  className?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  averageRating,
  totalReviews,
  className = '',
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    return 'Poor';
  };

  return (
    <section className={`py-8 md:py-12 ${className}`}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Guest Reviews</h2>
        
        {/* Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">{getRatingLabel(averageRating)}</div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                Based on {totalReviews.toLocaleString()} reviews
              </span>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1 max-w-md">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => Math.floor(r.rating) === star).length;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center mb-2">
                  <span className="text-sm text-gray-600 w-12">{star} star</span>
                  <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                {review.userAvatar ? (
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {review.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* User Info */}
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                  {review.userLocation && (
                    <p className="text-sm text-gray-600">{review.userLocation}</p>
                  )}
                </div>
              </div>

              {/* Rating and Date */}
              <div className="text-right">
                <div className="flex items-center justify-end mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(review.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>

            {/* Review Title */}
            {review.title && (
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            )}

            {/* Review Comment */}
            <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

            {/* Helpful Button */}
            {review.helpful !== undefined && (
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>Helpful ({review.helpful})</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 5 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-colors"
          >
            {showAll ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
          </button>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;

