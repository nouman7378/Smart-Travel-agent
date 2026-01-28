/**
 * PaymentsRevenue Component
 * 
 * Admin page for managing payments and viewing revenue analytics
 */

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { Payment, PaymentStatus } from '@/types/admin';

const PaymentsRevenue: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<'today' | '7days' | '30days' | 'all'>('30days');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockPayments: Payment[] = [
          {
            id: '1',
            bookingId: '1',
            bookingNumber: 'TH-2025-001234',
            userId: '1',
            userName: 'John Doe',
            amount: 1250,
            status: 'completed',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-2025-001234',
            paymentDate: '2025-01-15',
            currency: 'USD',
          },
          {
            id: '2',
            bookingId: '2',
            bookingNumber: 'TH-2025-001235',
            userId: '2',
            userName: 'Jane Smith',
            amount: 2100,
            status: 'pending',
            paymentMethod: 'PayPal',
            paymentDate: '2025-01-20',
            currency: 'USD',
          },
          {
            id: '3',
            bookingId: '3',
            bookingNumber: 'TH-2025-001236',
            userId: '1',
            userName: 'John Doe',
            amount: 450,
            status: 'completed',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-2025-001236',
            paymentDate: '2025-01-18',
            currency: 'USD',
          },
          {
            id: '4',
            bookingId: '4',
            bookingNumber: 'TH-2025-001237',
            userId: '3',
            userName: 'Bob Wilson',
            amount: 680,
            status: 'refunded',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-2025-001237',
            paymentDate: '2025-01-10',
            currency: 'USD',
          },
          {
            id: '5',
            bookingId: '5',
            bookingNumber: 'TH-2025-001238',
            userId: '4',
            userName: 'Alice Brown',
            amount: 3200,
            status: 'completed',
            paymentMethod: 'Bank Transfer',
            transactionId: 'TXN-2025-001238',
            paymentDate: '2024-12-05',
            currency: 'USD',
          },
          {
            id: '6',
            bookingId: '6',
            bookingNumber: 'TH-2025-001239',
            userId: '5',
            userName: 'Charlie Davis',
            amount: 980,
            status: 'failed',
            paymentMethod: 'Credit Card',
            paymentDate: '2025-01-22',
            currency: 'USD',
          },
        ];

        setPayments(mockPayments);
        setFilteredPayments(mockPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    let filtered = payments;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (payment) =>
          payment.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      if (dateFilter === 'today') {
        filterDate.setHours(0, 0, 0, 0);
      } else if (dateFilter === '7days') {
        filterDate.setDate(now.getDate() - 7);
      } else if (dateFilter === '30days') {
        filterDate.setDate(now.getDate() - 30);
      }
      filtered = filtered.filter((payment) => new Date(payment.paymentDate) >= filterDate);
    }

    setFilteredPayments(filtered);
  }, [searchQuery, statusFilter, dateFilter, payments]);

  // Calculate revenue statistics
  const totalRevenue = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter((p) => p.status === 'pending').length;
  const failedPayments = payments.filter((p) => p.status === 'failed').length;
  const refundedAmount = payments
    .filter((p) => p.status === 'refunded')
    .reduce((sum, p) => sum + p.amount, 0);

  // Revenue by payment method
  const revenueByMethod = payments
    .filter((p) => p.status === 'completed')
    .reduce((acc, p) => {
      acc[p.paymentMethod] = (acc[p.paymentMethod] || 0) + p.amount;
      return acc;
    }, {} as Record<string, number>);

  // Revenue trend data
  const revenueData = [
    { month: 'Jan', revenue: 180000 },
    { month: 'Feb', revenue: 195000 },
    { month: 'Mar', revenue: 210000 },
    { month: 'Apr', revenue: 225000 },
    { month: 'May', revenue: 235000 },
    { month: 'Jun', revenue: 245000 },
  ];
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  const columns = [
    {
      key: 'bookingNumber',
      header: 'Booking',
      render: (payment: Payment) => (
        <div>
          <p className="font-medium text-gray-800">{payment.bookingNumber}</p>
          <p className="text-sm text-gray-500">{payment.userName}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (payment: Payment) => (
        <span className="font-semibold text-gray-800">
          ${payment.amount.toLocaleString()} {payment.currency}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      header: 'Method',
      render: (payment: Payment) => (
        <span className="text-gray-800">{payment.paymentMethod}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (payment: Payment) => (
        <StatusBadge
          status={payment.status}
          variant={
            payment.status === 'completed'
              ? 'success'
              : payment.status === 'pending'
              ? 'warning'
              : payment.status === 'failed'
              ? 'danger'
              : 'info'
          }
        />
      ),
    },
    {
      key: 'transactionId',
      header: 'Transaction ID',
      render: (payment: Payment) => (
        <span className="text-gray-600 font-mono text-sm">
          {payment.transactionId || 'N/A'}
        </span>
      ),
    },
    {
      key: 'paymentDate',
      header: 'Date',
      render: (payment: Payment) => (
        <span className="text-gray-600">
          {new Date(payment.paymentDate).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Payments & Revenue</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Track payments and revenue analytics</p>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-lg border border-gray-200 p-1 w-full sm:w-auto flex-wrap">
            {(['today', '7days', '30days', 'all'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setDateFilter(filter)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  dateFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {filter === 'today'
                  ? 'Today'
                  : filter === '7days'
                  ? '7 Days'
                  : filter === '30days'
                  ? '30 Days'
                  : 'All Time'}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-2">+15.2% from last month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Pending Payments</h3>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">{pendingPayments}</p>
            <p className="text-sm text-gray-600 mt-2">Requires attention</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Failed Payments</h3>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{failedPayments}</p>
            <p className="text-sm text-red-600 mt-2">Needs review</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Refunded</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">${refundedAmount.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">Total refunded</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Revenue Trend</h2>
            <div className="flex items-end justify-between gap-2 h-64">
              {revenueData.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col justify-end h-full">
                    <div
                      className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-full transition-all duration-500"
                      style={{
                        height: `${(item.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{item.month}</p>
                  <p className="text-xs font-semibold text-gray-800 mt-1">
                    ${(item.revenue / 1000).toFixed(0)}k
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Payment Method */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Revenue by Payment Method</h2>
            <div className="space-y-4">
              {Object.entries(revenueByMethod).map(([method, amount]) => {
                const percentage = (amount / totalRevenue) * 100;
                return (
                  <div key={method}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{method}</span>
                      <span className="text-sm font-semibold text-gray-800">
                        ${amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search payments..."
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
              onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        <DataTable
          data={filteredPayments}
          columns={columns}
          loading={loading}
          emptyMessage="No payments found"
        />
      </div>
    </AdminLayout>
  );
};

export default PaymentsRevenue;
