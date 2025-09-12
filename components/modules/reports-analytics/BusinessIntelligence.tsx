import React, { useState } from 'react';

interface BusinessMetric {
  label: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'percentage' | 'absolute';
  trend: 'up' | 'down' | 'stable';
  target?: number;
}

interface KPICategory {
  name: string;
  color: string;
  metrics: BusinessMetric[];
}

const BusinessIntelligence: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const kpiCategories: KPICategory[] = [
    {
      name: 'Financial Performance',
      color: 'green',
      metrics: [
        {
          label: 'Total Revenue',
          value: 2485000,
          unit: '$',
          change: 15.8,
          changeType: 'percentage',
          trend: 'up',
          target: 2400000
        },
        {
          label: 'Gross Profit Margin',
          value: 42.3,
          unit: '%',
          change: 2.1,
          changeType: 'absolute',
          trend: 'up',
          target: 40.0
        },
        {
          label: 'EBITDA',
          value: 580000,
          unit: '$',
          change: 18.5,
          changeType: 'percentage',
          trend: 'up',
          target: 520000
        },
        {
          label: 'Operating Cash Flow',
          value: 445000,
          unit: '$',
          change: 12.2,
          changeType: 'percentage',
          trend: 'up'
        }
      ]
    },
    {
      name: 'Sales Performance',
      color: 'blue',
      metrics: [
        {
          label: 'Total Orders',
          value: 1247,
          unit: '',
          change: 12.3,
          changeType: 'percentage',
          trend: 'up',
          target: 1200
        },
        {
          label: 'Average Order Value',
          value: 1993,
          unit: '$',
          change: 3.2,
          changeType: 'percentage',
          trend: 'up',
          target: 1950
        },
        {
          label: 'Conversion Rate',
          value: 24.5,
          unit: '%',
          change: 2.1,
          changeType: 'absolute',
          trend: 'up',
          target: 22.0
        },
        {
          label: 'Sales Velocity',
          value: 8.7,
          unit: 'days',
          change: -1.2,
          changeType: 'absolute',
          trend: 'up'
        }
      ]
    },
    {
      name: 'Customer Metrics',
      color: 'purple',
      metrics: [
        {
          label: 'Active Customers',
          value: 892,
          unit: '',
          change: 8.7,
          changeType: 'percentage',
          trend: 'up',
          target: 850
        },
        {
          label: 'Customer Lifetime Value',
          value: 4850,
          unit: '$',
          change: 6.8,
          changeType: 'percentage',
          trend: 'up'
        },
        {
          label: 'Customer Acquisition Cost',
          value: 145,
          unit: '$',
          change: -8.2,
          changeType: 'percentage',
          trend: 'up'
        },
        {
          label: 'Churn Rate',
          value: 3.2,
          unit: '%',
          change: -0.8,
          changeType: 'absolute',
          trend: 'up'
        }
      ]
    },
    {
      name: 'Operational Efficiency',
      color: 'orange',
      metrics: [
        {
          label: 'Inventory Turnover',
          value: 6.8,
          unit: 'x',
          change: 0.9,
          changeType: 'absolute',
          trend: 'up',
          target: 6.0
        },
        {
          label: 'Order Fulfillment Time',
          value: 2.3,
          unit: 'days',
          change: -0.5,
          changeType: 'absolute',
          trend: 'up',
          target: 3.0
        },
        {
          label: 'Warehouse Efficiency',
          value: 94.5,
          unit: '%',
          change: 3.2,
          changeType: 'percentage',
          trend: 'up',
          target: 90.0
        },
        {
          label: 'Return Rate',
          value: 2.1,
          unit: '%',
          change: -0.3,
          changeType: 'absolute',
          trend: 'up'
        }
      ]
    }
  ];

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    } else if (unit === '%') {
      return `${value.toFixed(1)}%`;
    } else if (unit === 'x') {
      return `${value.toFixed(1)}x`;
    } else if (unit === 'days') {
      return `${value.toFixed(1)} days`;
    } else {
      return value.toLocaleString();
    }
  };

  const formatChange = (change: number, changeType: 'percentage' | 'absolute', unit: string) => {
    const prefix = change > 0 ? '+' : '';
    if (changeType === 'percentage') {
      return `${prefix}${change.toFixed(1)}%`;
    } else {
      if (unit === '%') {
        return `${prefix}${change.toFixed(1)}pp`;
      } else if (unit === '$') {
        return `${prefix}$${Math.abs(change).toLocaleString()}`;
      } else {
        return `${prefix}${change.toFixed(1)}`;
      }
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 15.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'stable':
        return (
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getChangeColor = (change: number, trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      green: 'border-green-200 bg-green-50',
      blue: 'border-blue-200 bg-blue-50',
      purple: 'border-purple-200 bg-purple-50',
      orange: 'border-orange-200 bg-orange-50'
    };
    return colors[color as keyof typeof colors] || 'border-gray-200 bg-gray-50';
  };

  const getProgressColor = (color: string) => {
    const colors = {
      green: 'bg-green-600',
      blue: 'bg-blue-600',
      purple: 'bg-purple-600',
      orange: 'bg-orange-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-600';
  };

  const filteredCategories = selectedCategory === 'all' 
    ? kpiCategories 
    : kpiCategories.filter(cat => cat.name.toLowerCase().includes(selectedCategory));

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="ytd">Year to Date</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="financial">Financial Performance</option>
            <option value="sales">Sales Performance</option>
            <option value="customer">Customer Metrics</option>
            <option value="operational">Operational Efficiency</option>
          </select>
        </div>
      </div>

      {/* KPI Categories */}
      {filteredCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className={`border rounded-lg p-6 ${getCategoryColor(category.color)}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-4">{category.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.metrics.map((metric, metricIndex) => (
              <div key={metricIndex} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-gray-700">{metric.label}</h4>
                  {getTrendIcon(metric.trend)}
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatValue(metric.value, metric.unit)}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getChangeColor(metric.change, metric.trend)}`}>
                      {formatChange(metric.change, metric.changeType, metric.unit)}
                    </span>
                    <span className="text-xs text-gray-500">vs last period</span>
                  </div>
                  
                  {metric.target && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Target: {formatValue(metric.target, metric.unit)}</span>
                        <span>{((metric.value / metric.target) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(category.color)}`}
                          style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Business Intelligence Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Intelligence Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Insights */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Key Insights</h4>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm font-medium text-green-800">Revenue Acceleration</p>
                <p className="text-sm text-green-700">Q4 revenue growth of 15.8% significantly exceeds industry average of 8.2%</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm font-medium text-blue-800">Operational Excellence</p>
                <p className="text-sm text-blue-700">Inventory turnover improved to 6.8x, indicating strong demand forecasting</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                <p className="text-sm font-medium text-purple-800">Customer Satisfaction</p>
                <p className="text-sm text-purple-700">Customer acquisition cost decreased 8.2% while lifetime value increased 6.8%</p>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Strategic Recommendations</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm font-medium text-yellow-800">Inventory Optimization</p>
                <p className="text-sm text-yellow-700">Consider increasing inventory for high-turnover office furniture categories</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <p className="text-sm font-medium text-orange-800">Market Expansion</p>
                <p className="text-sm text-orange-700">Strong Southeast performance suggests potential for additional market expansion</p>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p className="text-sm font-medium text-gray-800">Process Automation</p>
                <p className="text-sm text-gray-700">Implement automated reordering for fast-moving SKUs to maintain efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Predictive Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">$2.8M</p>
            <p className="text-sm text-gray-600">Projected Q1 Revenue</p>
            <p className="text-xs text-blue-600">+12.5% confidence</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">1,450</p>
            <p className="text-sm text-gray-600">Expected Orders</p>
            <p className="text-xs text-green-600">+16.3% vs Q4</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">95</p>
            <p className="text-sm text-gray-600">New Customers</p>
            <p className="text-xs text-purple-600">10.7% growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessIntelligence;