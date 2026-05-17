/**
 * UserQueryTrends Component
 * 
 * Analyze user query trends and patterns.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface QueryTrend {
  category: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

interface TimeSeriesData {
  date: string;
  queries: number;
  category: string;
}

const UserQueryTrends: React.FC = () => {
  const [trends, setTrends] = useState<QueryTrend[]>([]);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setTrends([
          {
            category: 'Destinations',
            count: 2340,
            trend: 'up',
            percentage: 15.2,
          },
          {
            category: 'Flights',
            count: 1890,
            trend: 'up',
            percentage: 8.5,
          },
          {
            category: 'Hotels',
            count: 1560,
            trend: 'stable',
            percentage: 2.1,
          },
          {
            category: 'Itineraries',
            count: 1230,
            trend: 'up',
            percentage: 22.3,
          },
          {
            category: 'Budget Planning',
            count: 980,
            trend: 'down',
            percentage: -5.4,
          },
          {
            category: 'Packages',
            count: 750,
            trend: 'up',
            percentage: 12.7,
          },
        ]);

        setTimeSeries([
          { date: '2024-01', queries: 1200, category: 'Destinations' },
          { date: '2024-02', queries: 1350, category: 'Destinations' },
          { date: '2024-03', queries: 1450, category: 'Destinations' },
          { date: '2024-04', queries: 1600, category: 'Destinations' },
          { date: '2024-05', queries: 1800, category: 'Destinations' },
          { date: '2024-06', queries: 2340, category: 'Destinations' },
        ]);
      } catch (error) {
        console.error('Error fetching trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading trends...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  const filteredTrends =
    selectedCategory === 'all'
      ? trends
      : trends.filter((t) => t.category === selectedCategory);

  const maxCount = Math.max(...trends.map((t) => t.count));

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              User Query Trends
            </h1>
            <p className="text-lg text-gray-600">
              Analyze query patterns and category trends
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            {trends.map((trend) => (
              <button
                key={trend.category}
                onClick={() => setSelectedCategory(trend.category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === trend.category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {trend.category}
              </button>
            ))}
          </div>

          {/* Trends Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTrends.map((trend, index) => (
              <motion.div
                key={trend.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {trend.category}
                  </h3>
                  <div
                    className={`flex items-center gap-1 ${
                      trend.trend === 'up'
                        ? 'text-green-600'
                        : trend.trend === 'down'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {trend.trend === 'up' && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    )}
                    {trend.trend === 'down' && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                    )}
                    <span className="text-sm font-semibold">
                      {trend.percentage > 0 ? '+' : ''}
                      {trend.percentage}%
                    </span>
                  </div>
                </div>

                <p className="text-3xl font-bold text-gray-800 mb-4">
                  {trend.count.toLocaleString()}
                </p>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${(trend.count / maxCount) * 100}%`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Time Series Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Query Volume Over Time
            </h2>
            <div className="flex items-end justify-between gap-4 h-64">
              {timeSeries.map((data) => (
                <div
                  key={data.date}
                  className="flex-1 flex flex-col items-center"
                >
                  <div className="w-full flex flex-col justify-end h-full">
                    <div
                      className="bg-blue-600 rounded-t-lg w-full transition-all duration-500"
                      style={{
                        height: `${
                          (data.queries / Math.max(...timeSeries.map((d) => d.queries))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{data.date}</p>
                  <p className="text-xs font-semibold text-gray-800 mt-1">
                    {data.queries}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserQueryTrends;

