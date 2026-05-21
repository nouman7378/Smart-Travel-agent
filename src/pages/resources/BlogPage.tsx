import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import MinimalPageHero from '../../components/common/MinimalPageHero';
import InfoPageContent, { infoPage } from '../../components/common/InfoPageContent';

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
    excerpt: 'Learn practical strategies for traveling on a budget without compromising on experiences—from accommodation hacks to local dining tips.',
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

const BlogPage: React.FC = () => {
  return (
    <PageLayout skipHeaderFooter={true}>
      <MinimalPageHero
        eyebrow="Support"
        title="Travel Blog"
        subtitle="Destination guides, packing tips, and inspiring stories from our travel experts—updated weekly."
      />
      <InfoPageContent>
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="px-5 py-2 rounded-lg font-medium border border-slate-200 bg-white text-slate-700 hover:border-blue-400 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-blue-950 text-white text-xs font-semibold rounded">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="text-xl font-bold text-slate-900 mt-2 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className={infoPage.body}>{post.excerpt}</p>
                <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
                  <span className="text-sm text-slate-600">{post.author}</span>
                  <Link to={`/blog/${post.id}`} className={infoPage.link}>
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className={`${infoPage.card} mt-14 max-w-2xl mx-auto text-center`}>
          <h2 className={infoPage.h2}>Stay updated</h2>
          <p className={`${infoPage.body} mt-2`}>
            Subscribe to our newsletter for the latest travel tips and destination guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <button type="button" className={infoPage.btn}>
              Subscribe
            </button>
          </div>
        </section>
      </InfoPageContent>
    </PageLayout>
  );
};

export default BlogPage;
