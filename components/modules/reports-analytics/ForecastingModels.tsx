import React, { useState } from 'react';
import { BarChart3, TrendingUp, Brain, Target, Calendar, Download, RefreshCw } from 'lucide-react';

const ForecastingModels: React.FC = () => {
  const [forecastPeriod, setForecastPeriod] = useState('next_quarter');
  const [model, setModel] = useState('ai_enhanced');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-violet-600" />
              <h1 className="text-4xl font-bold text-gray-900">Forecasting Models</h1>
            </div>
            <p className="text-xl text-gray-600">
              AI-powered predictive analytics with revenue forecasting, demand planning, and trend modeling.
            </p>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={forecastPeriod}
              onChange={(e) => setForecastPeriod(e.target.value)}
            >
              <option value="next_month">Next Month</option>
              <option value="next_quarter">Next Quarter</option>
              <option value="next_year">Next Year</option>
              <option value="custom">Custom Period</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="ai_enhanced">AI Enhanced</option>
              <option value="statistical">Statistical</option>
              <option value="regression">Regression</option>
              <option value="ensemble">Ensemble</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export Forecast
            </button>
          </div>
        </div>

        {/* Forecast Accuracy */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Forecast Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">94.7%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Accuracy Rate</div>
              <div className="text-sm text-gray-600">Last 12 months average</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">±3.2%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Error Margin</div>
              <div className="text-sm text-gray-600">Revenue predictions</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-purple-600 mb-2">89%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Confidence Level</div>
              <div className="text-sm text-gray-600">Statistical confidence</div>
            </div>
          </div>
        </div>

        {/* Revenue Forecast */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Forecast - Next Quarter</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Predicted Performance</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-900">Q2 2024 Revenue</span>
                  <span className="text-xl font-bold text-green-600">$4.2M</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-900">Growth Rate</span>
                  <span className="text-xl font-bold text-blue-600">+8.4%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-900">Confidence</span>
                  <span className="text-xl font-bold text-purple-600">89%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Key Drivers</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Seasonal demand increase (Spring)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">New product line launch impact</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Market expansion effects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Economic indicators trending positive</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Performance Comparison */}
        <div className="bg-white rounded-xl shadow-lg border p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Model Performance Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">AI Enhanced</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">94.7%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">±3.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2.3s</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Statistical</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">91.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">±4.1%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0.8s</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Backup</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Regression</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">88.9%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">±5.3%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0.4s</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastingModels;