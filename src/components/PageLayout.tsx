/**
 * PageLayout Component
 * 
 * Reusable layout wrapper for pages.
 * When skipHeaderFooter is true, only renders content (for pages already inside LayoutWrapper).
 * When false, renders full layout with Header and Footer (for standalone pages).
 */

import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import FooterNew from './FooterNew';
import ModernFooter from './ModernFooter';
import AnimatedPage from './AnimatedPage';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  useNewFooter?: boolean;
  useModernFooter?: boolean;
  skipHeaderFooter?: boolean; // Skip Header/Footer when already provided by LayoutWrapper
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '', 
  useNewFooter = false,
  useModernFooter = true,
  skipHeaderFooter = false 
}) => {
  // If skipHeaderFooter is true, only render content (for pages inside LayoutWrapper)
  if (skipHeaderFooter) {
    return (
      <AnimatedPage>
        <div className={className}>{children}</div>
      </AnimatedPage>
    );
  }

  // Full layout with Header and Footer (for standalone pages)
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className={`flex-1 ${className}`}>{children}</main>
        {useModernFooter ? <ModernFooter /> : useNewFooter ? <FooterNew /> : <Footer />}
      </div>
    </AnimatedPage>
  );
};

export default PageLayout;

