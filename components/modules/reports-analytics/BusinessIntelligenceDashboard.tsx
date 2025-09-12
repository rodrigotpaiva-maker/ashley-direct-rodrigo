import React, { useState } from 'react';
import { ChartBarIcon, ArrowTrendingUpIcon, CurrencyDollarIcon, UsersIcon, ShoppingCartIcon, CalendarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

interface ChartData {
  name: string;
  value: number;
}

const BusinessIntelligenceDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for KPI metrics
  const kpiMetrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$2,847,329',
      change: '+12.5%',
      changeType: 'increase',
      icon: <CurrencyDollarIcon className="h-6 w-6" />
    },
    {
      title: 'Active Customers',
      value: '3,247',
      change: '+8.2%',
      changeType: 'increase',
      icon: <UsersIcon className="h-6 w-6" />
    },
    {
      title: 'Orders Processed',
      value: '1,842',
      change: '+15.7%',
      changeType: 'increase',
      icon: <ShoppingCartIcon className="h-6 w-6" />
    },
    {
      title: 'Average Order Value',
      value: '$1,547',
      change: '-2.1%',
      changeType: 'decrease',
      icon: <ArrowTrendingUpIcon className="h-6 w-6" />
    }
  ];

  // Mock data for sales chart
  const salesData: ChartData[] = [
    { name: 'Jan', value: 245000 },
    { name: 'Feb', value: 287000 },
    { name: 'Mar', value: 312000 },
    { name: 'Apr', value: 298000 },
    { name: 'May', value: 356000 },
    { name: 'Jun', value: 389000 }
  ];

  // Mock data for top products
  const topProducts = [
    { name: 'Ashley Signature Design Sofa Set', revenue: '$127,540', units: 82 },
    { name: 'North Shore Dining Collection', revenue: '$98,320', units: 64 },
    { name: 'Millennium Bedroom Suite', revenue: '$87,650', units: 45 },
    { name: 'Bolanburg Counter Height Table', revenue: '$76,890', units: 91 },
    { name: 'Trinell TV Stand Collection', revenue: '$65,440', units: 156 }
  ];

  // Mock data for customer segments
  const customerSegments = [
    { segment: 'Enterprise (500+ employees)', count: 248, revenue: '$1,245,680' },
    { segment: 'Mid-Market (50-499 employees)', count: 672, revenue: '$987,340' },
    { segment: 'Small Business (10-49 employees)', count: 1456, revenue: '$614,309' },
    { segment: 'Startups (1-9 employees)', count: 871, revenue: '$298,750' }
  ];

  const maxRevenue = Math.max(...salesData.map(d => d.value));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Intelligence Dashboard</h1>
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="text-blue-600">
                {metric.icon}
              </div>
              <div className={`flex items-center text-sm ${
                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Sales Trend</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ChartBarIcon className="h-4 w-4" />
            Monthly Revenue
          </div>
        </div>
        <div className="h-64 flex items-end justify-between gap-4">
          {salesData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-t w-full cursor-pointer"
                style={{ 
                  height: `${(data.value / maxRevenue) * 200}px`,
                  minHeight: '20px'
                }}
                title={`${data.name}: $${data.value.toLocaleString()}`}
              />
              <div className="text-xs text-gray-600 mt-2">{data.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Revenue in USD (thousands)
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition-colors duration-200">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.units} units sold</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{product.revenue}</div>
                  <div className="text-xs text-gray-600">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h2>
          <div className="space-y-4">
            {customerSegments.map((segment, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-900">{segment.segment}</h3>
                  <span className="text-xs text-gray-500">{segment.count} customers</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-blue-600">{segment.revenue}</div>
                  <div className="text-xs text-gray-600">Total Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Key Insights & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-blue-800">Performance Highlights</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Revenue growth up 12.5% compared to last period</li>
              <li>• Customer acquisition increased by 8.2%</li>
              <li>• Order processing efficiency improved 15.7%</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-blue-800">Action Items</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Focus on increasing average order value</li>
              <li>• Expand marketing to enterprise segment</li>
              <li>• Optimize inventory for top-performing products</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessIntelligenceDashboard;