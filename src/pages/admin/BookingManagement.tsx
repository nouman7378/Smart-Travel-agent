/**
 * BookingManagement Component
 * 
 * Admin page for managing bookings
 */

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { AdminBooking, BookingStatus, PaymentStatus } from '@/types/admin';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getAdminAuthHeader = (): string => {
  const adminCreds = localStorage.getItem('admin_credentials');
  if (adminCreds) return `Basic ${btoa(adminCreds)}`;
  return '';
};

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | 'all'>('all');
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        const headers: Record<string, string> = {};
        const authHeader = getAdminAuthHeader();
        if (authHeader) headers['Authorization'] = authHeader;

        const response = await fetch(`${API_BASE_URL}/admin/bookings/`, {
          credentials: 'include',
          headers,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success && data.bookings) {
          setBookings(data.bookings);
          setFilteredBookings(data.bookings);
        } else {
          throw new Error(data.message || 'Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (booking) =>
          booking.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.packageName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter((booking) => booking.paymentStatus === paymentFilter);
    }

    setFilteredBookings(filtered);
  }, [searchQuery, statusFilter, paymentFilter, bookings]);

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((booking) => {
        if (booking.id === bookingId) {
          return { ...booking, status: newStatus };
        }
        return booking;
      })
    );
  };

  const columns = [
    {
      key: 'bookingNumber',
      header: 'Booking',
      render: (booking: AdminBooking) => (
        <div>
          <p className="font-medium text-gray-800">{booking.bookingNumber}</p>
          <p className="text-sm text-gray-500">
            {booking.packageName || `${booking.bookingType} booking`}
          </p>
        </div>
      ),
    },
    {
      key: 'userName',
      header: 'Customer',
      render: (booking: AdminBooking) => (
        <div>
          <p className="font-medium text-gray-800">{booking.userName}</p>
          <p className="text-sm text-gray-500">{booking.userEmail}</p>
        </div>
      ),
    },
    {
      key: 'bookingType',
      header: 'Type',
      render: (booking: AdminBooking) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
          {booking.bookingType}
        </span>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Amount',
      render: (booking: AdminBooking) => (
        <span className="font-semibold text-gray-800">PKR {booking.totalAmount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (booking: AdminBooking) => (
        <StatusBadge
          status={booking.status}
          variant={
            booking.status === 'confirmed'
              ? 'success'
              : booking.status === 'pending'
              ? 'warning'
              : booking.status === 'cancelled'
              ? 'danger'
              : 'info'
          }
        />
      ),
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (booking: AdminBooking) => (
        <StatusBadge
          status={booking.paymentStatus}
          variant={
            booking.paymentStatus === 'completed'
              ? 'success'
              : booking.paymentStatus === 'pending'
              ? 'warning'
              : booking.paymentStatus === 'failed'
              ? 'danger'
              : 'info'
          }
        />
      ),
    },
    {
      key: 'travelDate',
      header: 'Travel Date',
      render: (booking: AdminBooking) => (
        <span className="text-gray-600">
          {new Date(booking.travelDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'assignedAgent',
      header: 'Agent',
      render: (booking: AdminBooking) => (
        <span className="text-gray-600">{booking.assignedAgent || 'Unassigned'}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (booking: AdminBooking) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBooking(booking);
              setShowBookingModal(true);
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View
          </button>
          {booking.status === 'pending' && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(booking.id, 'confirmed');
                }}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Confirm
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(booking.id, 'cancelled');
                }}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Cancel
              </button>
            </>
          )}
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Booking Management</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">View and manage all bookings</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookings..."
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
              onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>

            {/* Payment Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as PaymentStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {bookings.filter((b) => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Confirmed</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {bookings.filter((b) => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              PKR {bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Bookings Table */}
        <DataTable
          data={filteredBookings}
          columns={columns}
          loading={loading}
          emptyMessage="No bookings found"
          onRowClick={(booking) => {
            setSelectedBooking(booking);
            setShowBookingModal(true);
          }}
        />

        {/* Booking Detail Modal */}
        {showBookingModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
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
              <div className="p-4 sm:p-6 space-y-6">
                {/* Booking Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Booking Number</p>
                      <p className="font-medium text-gray-800">{selectedBooking.bookingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Booking Type</p>
                      <p className="font-medium text-gray-800 capitalize">
                        {selectedBooking.bookingType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <StatusBadge
                        status={selectedBooking.status}
                        variant={
                          selectedBooking.status === 'confirmed'
                            ? 'success'
                            : selectedBooking.status === 'pending'
                            ? 'warning'
                            : selectedBooking.status === 'cancelled'
                            ? 'danger'
                            : 'info'
                        }
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <StatusBadge
                        status={selectedBooking.paymentStatus}
                        variant={
                          selectedBooking.paymentStatus === 'completed'
                            ? 'success'
                            : selectedBooking.paymentStatus === 'pending'
                            ? 'warning'
                            : selectedBooking.paymentStatus === 'failed'
                            ? 'danger'
                            : 'info'
                        }
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Booking Date</p>
                      <p className="font-medium text-gray-800">
                        {new Date(selectedBooking.bookingDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Travel Date</p>
                      <p className="font-medium text-gray-800">
                        {new Date(selectedBooking.travelDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-semibold text-gray-800 text-lg">
                        PKR {selectedBooking.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Assigned Agent</p>
                      <p className="font-medium text-gray-800">
                        {selectedBooking.assignedAgent || 'Unassigned'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-800">{selectedBooking.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-800">{selectedBooking.userEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedBooking.notes && (
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Notes</h3>
                    <p className="text-gray-600">{selectedBooking.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedBooking.id, 'confirmed');
                          setShowBookingModal(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Confirm Booking
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedBooking.id, 'cancelled');
                          setShowBookingModal(false);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
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

export default BookingManagement;
