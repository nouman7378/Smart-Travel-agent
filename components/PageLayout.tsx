/**
 * PageLayout Component
 * 
 * This component is part of the Expedia.fr Footer Pages replication for our FYP.
 * Reusable layout wrapper for footer pages with Header and Footer.
 */

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FooterNew from './FooterNew';
import AnimatedPage from './AnimatedPage';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  useNewFooter?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '', useNewFooter = false }) => {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className={`flex-1 ${className}`}>{children}</main>
        {useNewFooter ? <FooterNew /> : <Footer />}
      </div>
    </AnimatedPage>
  );
};

export default PageLayout;

