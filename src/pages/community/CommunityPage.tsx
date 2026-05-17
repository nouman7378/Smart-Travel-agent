import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';
import { Camera, Check, Heart, Link, MapPin, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Post {
  id: number;
  author: {
    id: number;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  images?: string[];
  location?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const CommunityPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/community/posts/`);
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: number) => {
    if (!isAuthenticated) {
      alert('Please log in to like posts.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/community/posts/${postId}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user?.id.toString() || '',
        },
      });
      const data = await response.json();
      if (data.success) {
        setPosts(posts.map(post => 
          post.id === postId 
            ? { ...post, likes: data.likes, isLiked: data.isLiked } 
            : post
        ));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!isAuthenticated) {
      alert('Please log in to create a post.');
      return;
    }

    if (!newPost.trim()) return;

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/community/posts/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user?.id.toString() || '',
        },
        body: JSON.stringify({
          content: newPost,
          location: newLocation,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setNewPost('');
        setNewLocation('');
        fetchPosts(); // Refresh feed
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-dark-text mb-2">
              Reviews & Experiences
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              See what fellow travelers are saying and share your own reviews
            </p>
          </div>

          {/* Create Post */}
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-dark-text mb-4">
              Share Your Experience
            </h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share your travel story..."
              rows={4}
              disabled={submitting}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text mb-4"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center px-4 py-2 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Add location..."
                  className="bg-transparent border-none focus:ring-0 text-sm w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <Camera className="inline w-5 h-5" /> Photo
                </button>
              </div>
              <button
                onClick={handleCreatePost}
                disabled={submitting || !newPost.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
              >
                {submitting ? 'Sharing...' : 'Share Review'}
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {loading ? (
              <div className="flex flex-col items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500">Loading community feed...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl p-12 text-center">
                <p className="text-gray-500 text-lg">No posts yet. Be the first to share!</p>
              </div>
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-surface rounded-lg shadow-xl p-6"
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full border-2 border-blue-100"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800 dark:text-dark-text">
                          {post.author.name}
                        </h3>
                        {post.author.isVerified && (
                          <span className="text-blue-500" title="Verified"><Check className="inline w-4 h-4" /></span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {post.location && (
                          <>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {post.location}</span>
                            <span>•</span>
                          </>
                        )}
                        <span>{formatTimestamp(post.timestamp)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="mb-4 rounded-lg overflow-hidden">
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
                        post.isLiked
                          ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                          : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-semibold">{post.likes}</span>
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Link className="w-5 h-5" />
                      <span className="font-semibold">{post.shares}</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CommunityPage;

