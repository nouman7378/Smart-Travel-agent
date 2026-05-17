/**
 * BlogPage Component
 * 
 * Travel blog with articles, tips, and destination guides
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const BlogPage: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '10 Hidden Gems in Europe You Must Visit',
      excerpt: 'Discover breathtaking destinations off the beaten path that offer authentic experiences, stunning landscapes, and rich cultural heritage.',
      author: 'Sarah Johnson',
      date: 'January 15, 2025',
      category: 'Destinations',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Budget Travel Tips: How to Explore the World for Less',
      excerpt: 'Learn practical strategies for traveling on a budget without compromising on experiences. From accommodation hacks to local dining tips.',
      author: 'Michael Chen',
      date: 'January 12, 2025',
      category: 'Travel Tips',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'The Ultimate Packing Guide for Every Type of Trip',
      excerpt: 'Master the art of packing efficiently for any destination. Essential checklists for beach vacations, city breaks, and adventure travel.',
      author: 'Emily Rodriguez',
      date: 'January 10, 2025',
      category: 'Travel Tips',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      readTime: '6 min read',
    },
    {
      id: '4',
      title: 'Solo Travel: A Complete Guide for First-Timers',
      excerpt: 'Everything you need to know about traveling alone safely and confidently. Tips for planning, staying safe, and making the most of solo adventures.',
      author: 'David Kim',
      date: 'January 8, 2025',
      category: 'Travel Tips',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      readTime: '8 min read',
    },
    {
      id: '5',
      title: 'Top 5 Beach Destinations for Your Next Vacation',
      excerpt: 'From tropical paradises to serene coastal escapes, explore the world\'s most beautiful beaches perfect for relaxation and adventure.',
      author: 'Lisa Anderson',
      date: 'January 5, 2025',
      category: 'Destinations',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      readTime: '6 min read',
    },
    {
      id: '6',
      title: 'Sustainable Travel: How to Be a Responsible Tourist',
      excerpt: 'Learn how to travel sustainably and minimize your environmental impact while supporting local communities and preserving destinations.',
      author: 'James Wilson',
      date: 'January 3, 2025',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
      readTime: '7 min read',
    },
  ];

  const categories = ['All', 'Destinations', 'Travel Tips', 'Sustainability', 'Adventure'];

  return (
    <PageLayout skipHeaderFooter={true}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Travel Blog</h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Discover travel tips, destination guides, and inspiring stories
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-lg font-medium transition-all duration-200 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <span className="text-blue-600 font-semibold text-sm">
                        {post.author.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest travel tips and destination guides
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default BlogPage;
