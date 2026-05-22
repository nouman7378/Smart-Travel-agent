/**
 * LayoutWrapper Component
 * 
 * Unified layout wrapper that includes Header and Footer once
 * Prevents duplication across pages
 */

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageTransition from '../common/PageTransition';

interface LayoutWrapperProps {
  className?: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ className = '' }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isChatPage = location.pathname.startsWith('/chat');
  const shouldHideLayout = isAuthPage || isChatPage;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isAuthPage && <Header />}
      <main className={`flex-1 ${className}`}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      {!isAuthPage && !isChatPage && <Footer />}
    </div>
  );
};

export default LayoutWrapper;

