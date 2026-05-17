/**
 * DataTable Component
 * 
 * Reusable data table component for admin pages
 */

import React from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-gray-600 text-lg">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`${
                  onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                } transition-colors`}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="whitespace-normal sm:whitespace-nowrap">
                      {column.render
                        ? column.render(item)
                        : String(item[column.key as keyof T] ?? '')}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => onRowClick?.(item)}
            className={`p-4 ${
              onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
            } transition-colors`}
          >
            <div className="space-y-3">
              {columns.map((column) => (
                <div key={String(column.key)} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.header}
                  </span>
                  <div className="text-sm text-gray-800">
                    {column.render
                      ? column.render(item)
                      : String(item[column.key as keyof T] ?? '')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataTable;
