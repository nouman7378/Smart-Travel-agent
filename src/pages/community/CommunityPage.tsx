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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-dark-text mb-2">
              Travel Community
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Share your travel experiences and connect with fellow travelers
            </p>
          </div>

          {/* Create Post */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-dark-text mb-4">
              Share Your Experience
            </h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share your travel story..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  📷 Photo
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  📍 Location
                </button>
              </div>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Post
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl p-6"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800 dark:text-dark-text">
                        {post.author.name}
                      </h3>
                      {post.author.verified && (
                        <span className="text-blue-500" title="Verified">✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {post.location && (
                        <>
                          <span>📍 {post.location}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>

                {/* Post Images */}
                {post.images && post.images.length > 0 && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src={post.images[0]}
                      alt="Post"
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      post.liked
                        ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-xl">❤️</span>
                    <span className="font-semibold">{post.likes}</span>
                  </button>
                  <button
                    onClick={() => handleComment(post.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-xl">💬</span>
                    <span className="font-semibold">{post.comments}</span>
                  </button>
                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-xl">🔗</span>
                    <span className="font-semibold">{post.shares}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Integration Notes */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>TODO:</strong> Integrate with backend API for:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>User authentication and profiles</li>
                <li>Post creation and retrieval</li>
                <li>Like, comment, and share functionality</li>
                <li>Image upload and storage</li>
                <li>Real-time updates</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CommunityPage;

