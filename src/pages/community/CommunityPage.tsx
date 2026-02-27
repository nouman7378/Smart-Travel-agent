/**
 * CommunityPage Component
 * 
 * Social features page with user posts, comments, likes (placeholder UI).
 * Mock JSON structure for future backend integration.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  images?: string[];
  location?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

const CommunityPage: React.FC = () => {
  const [posts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Ahmed',
        avatar: 'https://via.placeholder.com/40',
        verified: true,
      },
      content: 'Just returned from an amazing trip to Hunza Valley! The views were absolutely breathtaking. Highly recommend visiting in May-October for the best weather. 🏔️✨',
      images: ['https://via.placeholder.com/600x400'],
      location: 'Hunza Valley, Pakistan',
      likes: 245,
      comments: 32,
      shares: 12,
      timestamp: '2 hours ago',
      liked: false,
    },
    {
      id: '2',
      author: {
        name: 'Ali Khan',
        avatar: 'https://via.placeholder.com/40',
        verified: false,
      },
      content: 'Skardu is a hidden gem! The Shangrila Resort is perfect for a peaceful getaway. Don\'t miss the Upper Kachura Lake - it\'s like something out of a fairy tale! 🌊',
      images: ['https://via.placeholder.com/600x400'],
      location: 'Skardu, Pakistan',
      likes: 189,
      comments: 28,
      shares: 8,
      timestamp: '5 hours ago',
      liked: true,
    },
    {
      id: '3',
      author: {
        name: 'Fatima Zahra',
        avatar: 'https://via.placeholder.com/40',
        verified: true,
      },
      content: 'Lahore food scene is incredible! From street food to fine dining, every meal was a delight. The Badshahi Mosque at sunset is a must-see! 🕌🍛',
      location: 'Lahore, Pakistan',
      likes: 312,
      comments: 45,
      shares: 15,
      timestamp: '1 day ago',
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: string) => {
    // TODO: Implement like functionality with backend API
    console.log('Like post:', postId);
  };

  const handleComment = (postId: string) => {
    // TODO: Implement comment functionality with backend API
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    // TODO: Implement share functionality
    console.log('Share post:', postId);
  };

  const handleCreatePost = () => {
    // TODO: Implement post creation with backend API
    if (newPost.trim()) {
      console.log('Create post:', newPost);
      setNewPost('');
      alert('Post created! (Demo mode - would integrate with backend)');
    }
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Image with Gradient Overlay - Same as Hero */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-110 animate-zoom-in-out"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80)',
            }}
          ></div>
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-pink-900/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
          {/* Animated Mesh Gradient */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-400/50 via-transparent to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-400/30 via-transparent to-transparent"></div>
          </div>
        </div>
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-40 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, -50, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-40 left-1/4 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ y: [0, 30, 0], x: [0, 40, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-400/30 rounded-full blur-3xl"
          />
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          {/* Premium Header */}
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-10 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl"
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Travel Community
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto drop-shadow-md">
              Share your travel experiences and connect with fellow travelers
            </p>
          </motion.div>

          {/* Create Post - Premium Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 p-6 sm:p-8 mb-8 relative overflow-hidden"
          >
            {/* Gradient Border Top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Share Your Experience
            </h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share your travel story..."
              rows={4}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-gray-800 placeholder-gray-400 hover:bg-white hover:border-gray-200 mb-6 resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Photo
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </motion.button>
              </div>
              <motion.button
                onClick={handleCreatePost}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Post
              </motion.button>
            </div>
          </motion.div>

          {/* Posts Feed - Premium Cards */}
          <div className="space-y-6">
            {posts.length === 0 ? (
              <EmptyState
                icon={
                  <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                }
                title="No posts yet"
                description="Be the first to share your travel experience with the community!"
                action={{
                  label: 'Create Post',
                  onClick: () => document.querySelector('textarea')?.focus()
                }}
              />
            ) : (
              <>
              {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 overflow-hidden relative"
              >
                {/* Gradient Border Top */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
                
                <div className="p-6 sm:p-8">
                  {/* Post Header */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg"
                      />
                      {post.author.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {post.author.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {post.location && (
                          <>
                            <span className="flex items-center gap-1 text-pink-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {post.location}
                            </span>
                            <span className="text-gray-300">•</span>
                          </>
                        )}
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 mb-5 whitespace-pre-wrap text-base leading-relaxed">
                    {post.content}
                  </p>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="mb-5 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src={post.images[0]}
                        alt="Post"
                        className="w-full h-auto max-h-96 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <motion.button
                      onClick={() => handleLike(post.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                        post.liked
                          ? 'text-red-600 bg-red-50 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <svg className={`w-6 h-6 ${post.liked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-bold">{post.likes}</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleComment(post.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="font-bold">{post.comments}</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleShare(post.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span className="font-bold">{post.shares}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
            </>
          )}
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default CommunityPage;

