/**
 * Content wrapper for footer / info pages.
 */

import React from 'react';

interface InfoPageContentProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export const infoPage = {
  section: 'mb-12',
  h2: 'text-2xl font-bold text-slate-900 mb-4',
  h3: 'text-lg font-semibold text-slate-900 mb-2',
  body: 'text-slate-600 text-base leading-relaxed',
  lead: 'text-lg text-slate-600 leading-relaxed max-w-3xl',
  card: 'border border-slate-200 rounded-xl bg-white p-6 md:p-8 shadow-sm',
  grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  grid3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
  list: 'space-y-3 text-base text-slate-600 list-disc list-inside',
  link: 'text-blue-700 hover:text-blue-900 font-medium',
  btn: 'inline-block px-6 py-3 bg-blue-950 text-white text-base font-medium rounded-lg hover:bg-blue-900 transition-colors',
} as const;

const InfoPageContent: React.FC<InfoPageContentProps> = ({
  children,
  className = '',
  narrow = false,
}) => {
  return (
    <div className={`bg-slate-50 py-16 md:py-20 ${className}`}>
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${
          narrow ? 'max-w-4xl' : 'max-w-6xl'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default InfoPageContent;
