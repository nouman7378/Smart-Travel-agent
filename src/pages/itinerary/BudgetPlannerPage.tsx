/**
 * BudgetPlannerPage Component
 * 
 * User-friendly interface to calculate and compare budgets.
 * Part of the AI Travel Chatbot application.
 */

import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import { Lightbulb } from 'lucide-react';


interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const BudgetPlannerPage: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState(500000);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Accommodation', amount: 150000, percentage: 30, color: 'bg-blue-500' },
    { id: '2', name: 'Transportation', amount: 100000, percentage: 20, color: 'bg-green-500' },
    { id: '3', name: 'Food & Dining', amount: 125000, percentage: 25, color: 'bg-yellow-500' },
    { id: '4', name: 'Activities', amount: 75000, percentage: 15, color: 'bg-purple-500' },
    { id: '5', name: 'Shopping', amount: 50000, percentage: 10, color: 'bg-red-500' },
  ]);

  const updateCategory = (id: string, amount: number) => {
    setCategories((prev) => {
      const updated = prev.map((cat) =>
        cat.id === id ? { ...cat, amount } : cat
      );
      const newTotal = updated.reduce((sum, cat) => sum + cat.amount, 0);
      return updated.map((cat) => ({
        ...cat,
        percentage: newTotal > 0 ? (cat.amount / newTotal) * 100 : 0,
      }));
    });
  };

  const updateTotalBudget = (newTotal: number) => {
    setTotalBudget(newTotal);
    const currentTotal = categories.reduce((sum, cat) => sum + cat.amount, 0);
    const ratio = newTotal / currentTotal;
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        amount: cat.amount * ratio,
        percentage: (cat.amount * ratio / newTotal) * 100,
      }))
    );
  };

  const currentTotal = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const remaining = totalBudget - currentTotal;

  return (
    <PageLayout skipHeaderFooter={true}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Budget Planner
            </h1>
            <p className="text-lg text-gray-600">
              Plan and manage your travel budget effectively
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Budget Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Total Budget Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Total Budget
                </h2>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={Math.round(totalBudget)}
                    onChange={(e) => updateTotalBudget(parseFloat(e.target.value) || 0)}
                    className="text-3xl font-bold text-blue-600 border-none focus:outline-none focus:ring-0 w-48"
                  />
                  <span className="text-2xl text-gray-600">PKR</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Allocated</span>
                  <span className="text-lg font-semibold text-gray-800">
                    PKR {Math.round(currentTotal).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Remaining</span>
                  <span
                    className={`text-lg font-semibold ${
                      remaining >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    PKR {Math.round(remaining).toLocaleString()}
                  </span>
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${Math.min((currentTotal / totalBudget) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Budget Categories */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Budget Categories
                </h2>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">
                          {category.name}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={Math.round(category.amount)}
                            onChange={(e) =>
                              updateCategory(
                                category.id,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-32 px-2 py-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <span className="text-sm text-gray-600">PKR</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${category.color} transition-all duration-300`}
                            style={{
                              width: `${(category.amount / totalBudget) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 min-w-[50px] text-right">
                          {((category.amount / totalBudget) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Breakdown Chart */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Budget Breakdown
                </h2>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {category.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          PKR {Math.round(category.amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${category.color} transition-all duration-300`}
                          style={{
                            width: `${(category.amount / totalBudget) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Tips */}
              <div className="bg-blue-50 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  <Lightbulb className="inline w-5 h-5" /> Budget Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Book flights in advance for better prices</li>
                  <li>• Consider staying in budget accommodations</li>
                  <li>• Set aside 10-15% for unexpected expenses</li>
                  <li>• Use public transportation when possible</li>
                  <li>• Look for free activities and attractions</li>
                </ul>
              </div>

              {/* Export/Share Options */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Export Budget
                </h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Download PDF
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Share via Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BudgetPlannerPage;

