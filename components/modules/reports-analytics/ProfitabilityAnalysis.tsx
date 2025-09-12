import React, { useState } from 'react';
import { DollarSign, TrendingUp, BarChart3, PieChart, Target, Download, Filter } from 'lucide-react';

const ProfitabilityAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState('current_quarter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-8 h-8 text-emerald-600" />
              <h1 className="text-4xl font-bold text-gray-900">Profitability Analysis</h1>
            </div>
            <p className="text-xl text-gray-600">
              Advanced profitability insights with margin analysis, cost optimization, and ROI tracking.
            </p>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="current_quarter">Current Quarter</option>
              <option value="last_quarter">Last Quarter</option>
              <option value="ytd">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export Analysis
            </button>
          </div>
        </div>

        {/* Profitability Metrics */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Profitability Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">31.2%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Gross Margin</div>
              <div className="text-sm text-green-600">+2.1% vs target</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">18.7%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Net Margin</div>
              <div className="text-sm text-blue-600">+1.4% improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24.3%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">ROI</div>
              <div className="text-sm text-purple-600">Above industry avg</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">$2,847</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Avg Customer LTV</div>
              <div className="text-sm text-orange-600">+15.2% growth</div>
            </div>
          </div>
        </div>

        {/* Additional profitability content placeholder */}
        <div className="bg-white rounded-xl shadow-lg border p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Margin Analysis by Category</h3>
          <p className="text-gray-600">Detailed margin breakdown and optimization opportunities would be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfitabilityAnalysis;