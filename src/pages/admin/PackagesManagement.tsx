/**
 * PackagesManagement Component
 * 
 * Admin page for managing travel packages/trips
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { AdminPackage, TripStatus } from '@/types/admin';

const PackagesManagement: React.FC = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<AdminPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TripStatus | 'all'>('all');
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<AdminPackage | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockPackages: AdminPackage[] = [
          {
            id: '1',
            title: 'Paris Getaway Package',
            destination: 'Paris, France',
            price: 1250,
            originalPrice: 1500,
            duration: 5,
            availability: 12,
            status: 'active',
            featured: true,
            popular: true,
            bookings: 45,
            image: '/api/placeholder/400/300',
            createdAt: '2024-01-15',
            updatedAt: '2025-01-20',
          },
          {
            id: '2',
            title: 'Tokyo Adventure',
            destination: 'Tokyo, Japan',
            price: 2100,
            duration: 7,
            availability: 8,
            status: 'active',
            featured: true,
            popular: false,
            bookings: 32,
            image: '/api/placeholder/400/300',
            createdAt: '2024-02-10',
            updatedAt: '2025-01-18',
          },
          {
            id: '3',
            title: 'Bali Paradise',
            destination: 'Bali, Indonesia',
            price: 980,
            duration: 4,
            availability: 0,
            status: 'inactive',
            featured: false,
            popular: true,
            bookings: 28,
            image: '/api/placeholder/400/300',
            createdAt: '2024-03-05',
            updatedAt: '2025-01-15',
          },
          {
            id: '4',
            title: 'Dubai Luxury Experience',
            destination: 'Dubai, UAE',
            price: 3200,
            originalPrice: 3800,
            duration: 6,
            availability: 5,
            status: 'active',
            featured: false,
            popular: false,
            bookings: 15,
            image: '/api/placeholder/400/300',
            createdAt: '2024-04-12',
            updatedAt: '2025-01-22',
          },
          {
            id: '5',
            title: 'New York City Break',
            destination: 'New York, USA',
            price: 1450,
            duration: 4,
            availability: 20,
            status: 'draft',
            featured: false,
            popular: false,
            bookings: 0,
            image: '/api/placeholder/400/300',
            createdAt: '2025-01-25',
            updatedAt: '2025-01-25',
          },
        ];

        setPackages(mockPackages);
        setFilteredPackages(mockPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    let filtered = packages;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((pkg) => pkg.status === statusFilter);
    }

    setFilteredPackages(filtered);
  }, [searchQuery, statusFilter, packages]);

  const handleToggleStatus = (packageId: string) => {
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === packageId) {
          const newStatus: TripStatus = pkg.status === 'active' ? 'inactive' : 'active';
          return { ...pkg, status: newStatus };
        }
        return pkg;
      })
    );
  };

  const handleToggleFeatured = (packageId: string) => {
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === packageId) {
          return { ...pkg, featured: !pkg.featured };
        }
        return pkg;
      })
    );
  };

  const handleDelete = (packageId: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages((prev) => prev.filter((pkg) => pkg.id !== packageId));
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Package',
      render: (pkg: AdminPackage) => (
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mr-3 flex-shrink-0">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <p className="font-medium text-gray-800">{pkg.title}</p>
            <p className="text-sm text-gray-500">{pkg.destination}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (pkg: AdminPackage) => (
        <div>
          <p className="font-semibold text-gray-800">${pkg.price.toLocaleString()}</p>
          {pkg.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              ${pkg.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (pkg: AdminPackage) => (
        <span className="text-gray-800">{pkg.duration} days</span>
      ),
    },
    {
      key: 'availability',
      header: 'Availability',
      render: (pkg: AdminPackage) => (
        <span className={pkg.availability > 0 ? 'text-gray-800' : 'text-red-600 font-medium'}>
          {pkg.availability} slots
        </span>
      ),
    },
    {
      key: 'bookings',
      header: 'Bookings',
      render: (pkg: AdminPackage) => (
        <span className="text-gray-800">{pkg.bookings}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (pkg: AdminPackage) => (
        <StatusBadge
          status={pkg.status}
          variant={
            pkg.status === 'active'
              ? 'success'
              : pkg.status === 'draft'
              ? 'warning'
              : 'default'
          }
        />
      ),
    },
    {
      key: 'featured',
      header: 'Featured',
      render: (pkg: AdminPackage) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            pkg.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {pkg.featured ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (pkg: AdminPackage) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPackage(pkg);
              setIsEditing(true);
              setShowPackageModal(true);
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStatus(pkg.id);
            }}
            className={`text-sm font-medium ${
              pkg.status === 'active'
                ? 'text-yellow-600 hover:text-yellow-700'
                : 'text-green-600 hover:text-green-700'
            }`}
          >
            {pkg.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(pkg.id);
            }}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Travel Packages</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Manage travel packages and trips</p>
          </div>
          <button
            onClick={() => {
              setSelectedPackage(null);
              setIsEditing(false);
              setShowPackageModal(true);
            }}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Package</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
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
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TripStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Total Packages</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{packages.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Active Packages</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {packages.filter((p) => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Featured</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {packages.filter((p) => p.featured).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Total Bookings</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {packages.reduce((sum, p) => sum + p.bookings, 0)}
            </p>
          </div>
        </div>

        {/* Packages Table */}
        <DataTable
          data={filteredPackages}
          columns={columns}
          loading={loading}
          emptyMessage="No packages found"
        />

        {/* Package Modal */}
        {showPackageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isEditing ? 'Edit Package' : 'New Package'}
                </h2>
                <button
                  onClick={() => setShowPackageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Package Title
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedPackage?.title || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter package title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destination
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedPackage?.destination || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter destination"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      defaultValue={selectedPackage?.price || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedPackage?.duration || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter duration"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedPackage?.availability || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter available slots"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      defaultValue={selectedPackage?.status || 'draft'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={selectedPackage?.featured || false}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured Package</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={selectedPackage?.popular || false}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Popular Package</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowPackageModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle save
                      setShowPackageModal(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isEditing ? 'Update' : 'Create'} Package
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PackagesManagement;
