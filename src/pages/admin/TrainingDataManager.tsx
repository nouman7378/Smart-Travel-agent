/**
 * TrainingDataManager Component
 * 
 * Manage and update training datasets for AI model fine-tuning.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface TrainingData {
  id: string;
  query: string;
  intent: string;
  response: string;
  category: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

const TrainingDataManager: React.FC = () => {
  const [trainingData, setTrainingData] = useState<TrainingData[]>([
    {
      id: '1',
      query: 'What are the top destinations in Europe?',
      intent: 'destination_inquiry',
      response: 'Some popular destinations in Europe include Paris, Rome, Barcelona, Amsterdam, and Prague.',
      category: 'Destinations',
      status: 'approved',
      createdAt: '2024-06-01',
    },
    {
      id: '2',
      query: 'Find me cheap flights to Tokyo',
      intent: 'flight_search',
      response: 'I can help you find affordable flights to Tokyo. When would you like to travel?',
      category: 'Flights',
      status: 'pending',
      createdAt: '2024-06-02',
    },
    {
      id: '3',
      query: 'Create a 5-day itinerary for Paris',
      intent: 'itinerary_creation',
      response: 'I\'ll create a personalized 5-day itinerary for Paris including top attractions, dining, and activities.',
      category: 'Itineraries',
      status: 'approved',
      createdAt: '2024-06-03',
    },
  ]);

  // Reserved for future use: const [selectedData, setSelectedData] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newData, setNewData] = useState({
    query: '',
    intent: '',
    response: '',
    category: '',
  });

  const handleAddData = () => {
    const data: TrainingData = {
      id: Date.now().toString(),
      ...newData,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTrainingData([...trainingData, data]);
    setNewData({ query: '', intent: '', response: '', category: '' });
    setShowAddModal(false);
  };

  const handleStatusChange = (id: string, status: 'approved' | 'pending' | 'rejected') => {
    setTrainingData(
      trainingData.map((data) =>
        data.id === id ? { ...data, status } : data
      )
    );
  };

  const handleDelete = (id: string) => {
    setTrainingData(trainingData.filter((data) => data.id !== id));
  };

  const filteredData =
    filter === 'all'
      ? trainingData
      : trainingData.filter((data) => data.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Training Data Manager
              </h1>
              <p className="text-lg text-gray-600">
                Manage and update AI model training datasets
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Training Data
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {['all', 'approved', 'pending', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Training Data Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Query
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Intent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((data) => (
                    <tr key={data.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {data.query}
                        </div>
                        <div className="text-sm text-gray-500">
                          {data.response.substring(0, 60)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                          {data.intent}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={data.status}
                          onChange={(e) =>
                            handleStatusChange(
                              data.id,
                              e.target.value as 'approved' | 'pending' | 'rejected'
                            )
                          }
                          className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(
                            data.status
                          )} border-0`}
                        >
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(data.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Add Training Data
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Query
                    </label>
                    <input
                      type="text"
                      value={newData.query}
                      onChange={(e) =>
                        setNewData({ ...newData, query: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="User query..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intent
                    </label>
                    <input
                      type="text"
                      value={newData.intent}
                      onChange={(e) =>
                        setNewData({ ...newData, intent: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Intent label..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response
                    </label>
                    <textarea
                      value={newData.response}
                      onChange={(e) =>
                        setNewData({ ...newData, response: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Bot response..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newData.category}
                      onChange={(e) =>
                        setNewData({ ...newData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      <option value="Destinations">Destinations</option>
                      <option value="Flights">Flights</option>
                      <option value="Hotels">Hotels</option>
                      <option value="Itineraries">Itineraries</option>
                      <option value="Budget Planning">Budget Planning</option>
                      <option value="Packages">Packages</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleAddData}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Data
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Train Model with Selected Data
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Export Dataset
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Import Dataset
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TrainingDataManager;

