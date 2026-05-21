import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  icon: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-50',
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 truncate">{value}</p>
          {change && (
            <p className="mt-2 text-sm">
              <span
                className={`font-medium ${change.isPositive ? 'text-emerald-600' : 'text-red-600'}`}
              >
                {change.isPositive ? '+' : ''}
                {change.value}%
              </span>
              {change.label && (
                <span className="text-slate-400 ml-1">{change.label}</span>
              )}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
