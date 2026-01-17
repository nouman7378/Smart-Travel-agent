/**
 * LayoutWrapper Component
 * 
 * Unified layout wrapper that includes Header and Footer once
 * Prevents duplication across pages
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageTransition from '../common/PageTransition';

interface LayoutWrapperProps {
  className?: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className={`flex-1 ${className}`}>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;

