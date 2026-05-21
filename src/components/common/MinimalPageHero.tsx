/**
 * Professional hero — navy theme (blue-950 / blue-100), centered heading.
 */

import React from 'react';

interface MinimalPageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}

const MinimalPageHero: React.FC<MinimalPageHeroProps> = ({
  title,
  subtitle,
  eyebrow,
  children,
}) => {
  return (
    <section className="bg-gradient-to-b from-blue-950 to-blue-900 border-b border-blue-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300/90 mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex justify-center">{children}</div>}
      </div>
    </section>
  );
};

export default MinimalPageHero;
