/**
 * ReportsAnalytics Component
 * 
 * Admin page for generating and downloading reports
 */

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Report } from '@/types/admin';
import DatePicker from '@/components/common/DatePicker';

const ReportsAnalytics: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [reportType, setReportType] = useState<'users' | 'bookings' | 'revenue' | 'packages'>(
    'bookings'
  );
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockReports: Report[] = [
          {
            id: '1',
            name: 'Monthly Bookings Report - January 2025',
            type: 'bookings',
            dateRange: {
              start: '2025-01-01',
              end: '2025-01-31',
            },
            generatedAt: '2025-01-28T10:30:00Z',
            downloadUrl: '/reports/bookings-jan-2025.pdf',
          },
          {
            id: '2',
            name: 'Revenue Report - Q4 2024',
            type: 'revenue',
            dateRange: {
              start: '2024-10-01',
              end: '2024-12-31',
            },
            generatedAt: '2025-01-05T14:20:00Z',
            downloadUrl: '/reports/revenue-q4-2024.pdf',
          },
          {
            id: '3',
            name: 'User Growth Report - 2024',
            type: 'users',
            dateRange: {
              start: '2024-01-01',
              end: '2024-12-31',
            },
            generatedAt: '2025-01-01T09:15:00Z',
            downloadUrl: '/reports/users-2024.pdf',
          },
          {
            id: '4',
            name: 'Package Performance - December 2024',
            type: 'packages',
            dateRange: {
              start: '2024-12-01',
              end: '2024-12-31',
            },
            generatedAt: '2025-01-02T11:45:00Z',
            downloadUrl: '/reports/packages-dec-2024.pdf',
          },
        ];

        setReports(mockReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newReport: Report = {
        id: Date.now().toString(),
        name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report - ${new Date().toLocaleDateString()}`,
        type: reportType,
        dateRange: {
          start: dateRange.start || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end: dateRange.end || new Date().toISOString().split('T')[0],
        },
        generatedAt: new Date().toISOString(),
        downloadUrl: `/reports/${reportType}-${Date.now()}.pdf`,
      };

      setReports((prev) => [newReport, ...prev]);
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = (report: Report) => {
    // Simulate download
    alert(`Downloading: ${report.name}`);
    // In a real app, this would trigger an actual download
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Generate and download comprehensive reports</p>
        </div>

        {/* Generate Report Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Generate New Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) =>
                  setReportType(e.target.value as 'users' | 'bookings' | 'revenue' | 'packages')
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="bookings">Bookings Report</option>
                <option value="revenue">Revenue Report</option>
                <option value="users">Users Report</option>
                <option value="packages">Packages Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <DatePicker
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <DatePicker
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Total Reports</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{reports.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Bookings Reports</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {reports.filter((r) => r.type === 'bookings').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">Revenue Reports</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {reports.filter((r) => r.type === 'revenue').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-600">User Reports</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {reports.filter((r) => r.type === 'users').length}
            </p>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Generated Reports</h2>
          </div>
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : reports.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">No reports generated yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {reports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            report.type === 'bookings'
                              ? 'bg-blue-100'
                              : report.type === 'revenue'
                              ? 'bg-green-100'
                              : report.type === 'users'
                              ? 'bg-purple-100'
                              : 'bg-orange-100'
                          }`}
                        >
                          <svg
                            className={`w-6 h-6 ${
                              report.type === 'bookings'
                                ? 'text-blue-600'
                                : report.type === 'revenue'
                                ? 'text-green-600'
                                : report.type === 'users'
                                ? 'text-purple-600'
                                : 'text-orange-600'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{report.name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(report.dateRange.start).toLocaleDateString()} -{' '}
                            {new Date(report.dateRange.end).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Generated: {new Date(report.generatedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          report.type === 'bookings'
                            ? 'bg-blue-100 text-blue-800'
                            : report.type === 'revenue'
                            ? 'bg-green-100 text-green-800'
                            : report.type === 'users'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                      <button
                        onClick={() => handleDownload(report)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsAnalytics;
