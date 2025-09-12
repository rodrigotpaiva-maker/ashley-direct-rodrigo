import React, { useState } from 'react';
import { Globe, TrendingUp, Users, Target, BarChart3, PieChart, MapPin, Download, Filter } from 'lucide-react';

const MarketAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState('current_quarter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-teal-600" />
              <h1 className="text-4xl font-bold text-gray-900">Market Analysis</h1>
            </div>
            <p className="text-xl text-gray-600">
              Comprehensive market intelligence with competitive analysis, trend forecasting, and growth opportunities.
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
              Export Report
            </button>
          </div>
        </div>

        {/* Market Share Overview */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Position</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">23.7%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Market Share</div>
              <div className="text-sm text-gray-600">2nd position in furniture retail</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">+1.8%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">YoY Growth</div>
              <div className="text-sm text-gray-600">Gaining market position</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-purple-600 mb-2">$2.4B</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Total Addressable Market</div>
              <div className="text-sm text-gray-600">Regional furniture market size</div>
            </div>
          </div>
        </div>

        {/* Additional placeholder content for Market Analysis */}
        <div className="bg-white rounded-xl shadow-lg border p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Landscape</h3>
          <p className="text-gray-600">Detailed competitive analysis and market trends would be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;