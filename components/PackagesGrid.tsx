/**
 * PackagesGrid Component
 * 
 * This component is part of the Expedia.fr Packages Page replication for our FYP.
 * Each component is modular and reusable.
 * 
 * Features:
 * - Responsive grid layout
 * - Package cards display
 */

import React from 'react';
import PackageCard, { TravelPackage } from './PackageCard';

interface PackagesGridProps {
  packages: TravelPackage[];
  className?: string;
  onPackageClick?: (packageId: number) => void;
}

const PackagesGrid: React.FC<PackagesGridProps> = ({
  packages,
  className = '',
  onPackageClick,
}) => {
  if (packages.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No packages found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} package={pkg} onClick={() => onPackageClick?.(pkg.id)} />
      ))}
    </div>
  );
};

export default PackagesGrid;

