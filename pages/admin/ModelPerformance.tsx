/**
 * ModelPerformance Component
 * 
 * Monitor AI model performance metrics and accuracy.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../../components/PageLayout';

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
}

interface TrainingHistory {
  date: string;
  accuracy: number;
  loss: number;
}

const ModelPerformance: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [trainingHistory, setTrainingHistory] = useState<TrainingHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setMetrics([
          {
            name: 'Response Accuracy',
            value: 92.5,
            target: 90,
            unit: '%',
            status: 'good',
          },
          {
            name: 'Response Time',
            value: 1.2,
            target: 2.0,
            unit: 's',
            status: 'good',
          },
          {
            name: 'User Satisfaction',
            value: 4.6,
            target: 4.5,
            unit: '/5',
            status: 'good',
          },
          {
            name: 'Intent Recognition',
            value: 88.3,
            target: 90,
            unit: '%',
            status: 'warning',
          },
          {
            name: 'Error Rate',
            value: 3.2,
            target: 5.0,
            unit: '%',
            status: 'good',
          },
        ]);

        setTrainingHistory([
          { date: '2024-01', accuracy: 85.2, loss: 0.45 },
          { date: '2024-02', accuracy: 87.8, loss: 0.38 },
          { date: '2024-03', accuracy: 89.5, loss: 0.32 },
          { date: '2024-04', accuracy: 90.1, loss: 0.28 },
          { date: '2024-05', accuracy: 91.3, loss: 0.25 },
          { date: '2024-06', accuracy: 92.5, loss: 0.22 },
        ]);
      } catch (error) {
        console.error('Error fetching performance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading performance data...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const maxAccuracy = Math.max(...trainingHistory.map((h) => h.accuracy));
  const maxLoss = Math.max(...trainingHistory.map((h) => h.loss));

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Model Performance
            </h1>
            <p className="text-lg text-gray-600">
              Monitor AI model metrics and training progress
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm p-6 border-2 ${getStatusColor(
                  metric.status
                )}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{metric.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                      metric.status
                    )}`}
                  >
                    {metric.status.toUpperCase()}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-3xl font-bold mb-1">
                    {metric.value}
                    <span className="text-lg text-gray-600 ml-1">
                      {metric.unit}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Target: {metric.target}
                    {metric.unit}
                  </p>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      metric.status === 'good'
                        ? 'bg-green-500'
                        : metric.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    } transition-all duration-500`}
                    style={{
                      width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Training History Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Accuracy Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Training Accuracy
              </h2>
              <div className="flex items-end justify-between gap-4 h-64">
                {trainingHistory.map((data) => (
                  <div
                    key={data.date}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex flex-col justify-end h-full">
                      <div
                        className="bg-green-600 rounded-t-lg w-full transition-all duration-500"
                        style={{
                          height: `${(data.accuracy / maxAccuracy) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{data.date}</p>
                    <p className="text-xs font-semibold text-gray-800 mt-1">
                      {data.accuracy.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Loss Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Training Loss
              </h2>
              <div className="flex items-end justify-between gap-4 h-64">
                {trainingHistory.map((data) => (
                  <div
                    key={data.date}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className="w-full flex flex-col justify-end h-full">
                      <div
                        className="bg-red-600 rounded-t-lg w-full transition-all duration-500"
                        style={{
                          height: `${(data.loss / maxLoss) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{data.date}</p>
                    <p className="text-xs font-semibold text-gray-800 mt-1">
                      {data.loss.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Model Actions
            </h2>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Retrain Model
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Export Metrics
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                View Training Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ModelPerformance;

