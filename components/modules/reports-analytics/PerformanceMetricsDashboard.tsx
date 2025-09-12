import React, { useState } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ChartBarIcon, ClockIcon, UserGroupIcon, ShoppingBagIcon, CurrencyDollarIcon, TrophyIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface PerformanceMetric {
  id: string;
  name: string;
  value: string | number;
  target: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
  description: string;
}

interface GoalProgress {
  id: string;
  name: string;
  current: number;
  target: number;
  deadline: string;
  category: string;
}

const PerformanceMetricsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('status');

  // Performance metrics data
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: 'monthly-revenue',
      name: 'Monthly Revenue',
      value: '$2,847,329',
      target: '$2,500,000',
      change: 13.9,
      changeType: 'increase',
      status: 'excellent',
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      description: 'Total revenue for current month vs target'
    },
    {
      id: 'customer-satisfaction',
      name: 'Customer Satisfaction',
      value: '94.2%',
      target: '90%',
      change: 2.1,
      changeType: 'increase',
      status: 'excellent',
      icon: <TrophyIcon className="h-6 w-6" />,
      description: 'Average customer satisfaction score'
    },
    {
      id: 'order-fulfillment',
      name: 'Order Fulfillment Time',
      value: '2.3 days',
      target: '3 days',
      change: -15.2,
      changeType: 'decrease',
      status: 'good',
      icon: <ClockIcon className="h-6 w-6" />,
      description: 'Average time from order to delivery'
    },
    {
      id: 'active-customers',
      name: 'Active Customers',
      value: '3,247',
      target: '3,500',
      change: 8.4,
      changeType: 'increase',
      status: 'warning',
      icon: <UserGroupIcon className="h-6 w-6" />,
      description: 'Number of customers with orders in last 30 days'
    },
    {
      id: 'inventory-turnover',
      name: 'Inventory Turnover',
      value: '6.2x',
      target: '8x',
      change: -12.7,
      changeType: 'decrease',
      status: 'warning',
      icon: <ShoppingBagIcon className="h-6 w-6" />,
      description: 'How quickly inventory is sold and replaced'
    },
    {
      id: 'return-rate',
      name: 'Return Rate',
      value: '8.4%',
      target: '5%',
      change: 23.5,
      changeType: 'increase',
      status: 'critical',
      icon: <ExclamationTriangleIcon className="h-6 w-6" />,
      description: 'Percentage of orders returned by customers'
    }
  ];

  // Goal progress data
  const goalProgress: GoalProgress[] = [
    {
      id: 'q3-revenue',
      name: 'Q3 Revenue Target',
      current: 7234000,
      target: 8500000,
      deadline: '2025-09-30',
      category: 'Financial'
    },
    {
      id: 'new-customers',
      name: 'New Customer Acquisition',
      current: 840,
      target: 1200,
      deadline: '2025-09-30',
      category: 'Growth'
    },
    {
      id: 'product-launches',
      name: 'New Product Launches',
      current: 12,
      target: 15,
      deadline: '2025-12-31',
      category: 'Product'
    },
    {
      id: 'market-expansion',
      name: 'Market Expansion',
      current: 3,
      target: 5,
      deadline: '2025-11-30',
      category: 'Growth'
    },
    {
      id: 'cost-reduction',
      name: 'Operational Cost Reduction',
      current: 8.2,
      target: 15,
      deadline: '2025-10-31',
      category: 'Efficiency'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'good': return <CheckCircleIcon className="h-5 w-5 text-blue-600" />;
      case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
      case 'critical': return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const calculateGoalProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const filteredMetrics = performanceMetrics.filter(metric => 
    selectedCategory === 'all' || metric.id.includes(selectedCategory)
  );

  const sortedMetrics = [...filteredMetrics].sort((a, b) => {
    if (sortBy === 'status') {
      const statusOrder = { critical: 0, warning: 1, good: 2, excellent: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    if (sortBy === 'change') {
      return Math.abs(b.change) - Math.abs(a.change);
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Metrics Dashboard</h1>
          <p className="text-gray-600">Track key performance indicators and business goals</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="status">Sort by Status</option>
            <option value="change">Sort by Change</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMetrics.map((metric) => {
          const progressPercentage = typeof metric.value === 'string' && metric.value.includes('%') 
            ? parseFloat(metric.value.replace('%', ''))
            : typeof metric.target === 'string' && metric.target.includes('%')
            ? (parseFloat(String(metric.value)) / parseFloat(metric.target.replace('%', ''))) * 100
            : 85; // Default progress for demo

          return (
            <div key={metric.id} className={`bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${getStatusColor(metric.status)}`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-blue-600">
                  {metric.icon}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(metric.status)}
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    metric.changeType === 'increase' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                  }`}>
                    {metric.changeType === 'increase' ? (
                      <ArrowTrendingUpIcon className="h-3 w-3 inline mr-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-3 w-3 inline mr-1" />
                    )}
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>

              {/* Metric Value */}
              <div className="mb-3">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <h4 className="text-sm font-medium text-gray-700 mb-1">{metric.name}</h4>
                <p className="text-xs text-gray-600">{metric.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>Target: {metric.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      metric.status === 'excellent' ? 'bg-green-600' :
                      metric.status === 'good' ? 'bg-blue-600' :
                      metric.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Goals and Targets */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Goals & Targets</h2>
          <ChartBarIcon className="h-5 w-5 text-gray-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goalProgress.map((goal) => {
            const progress = calculateGoalProgress(goal.current, goal.target);
            const daysLeft = getDaysUntilDeadline(goal.deadline);
            const isOverdue = daysLeft < 0;
            const isUrgent = daysLeft <= 7 && daysLeft >= 0;

            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-600">{goal.category}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    isOverdue ? 'text-red-700 bg-red-100' :
                    isUrgent ? 'text-yellow-700 bg-yellow-100' :
                    'text-green-700 bg-green-100'
                  }`}>
                    {isOverdue ? 'Overdue' : isUrgent ? 'Urgent' : `${daysLeft} days left`}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>
                      {typeof goal.current === 'number' && goal.current >= 1000000
                        ? `$${(goal.current / 1000000).toFixed(1)}M`
                        : typeof goal.current === 'number' && goal.current >= 1000
                        ? `${(goal.current / 1000).toFixed(1)}k`
                        : goal.current
                      }
                    </span>
                    <span>
                      {typeof goal.target === 'number' && goal.target >= 1000000
                        ? `$${(goal.target / 1000000).toFixed(1)}M`
                        : typeof goal.target === 'number' && goal.target >= 1000
                        ? `${(goal.target / 1000).toFixed(1)}k`
                        : goal.target
                      }
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        progress >= 90 ? 'bg-green-600' :
                        progress >= 70 ? 'bg-blue-600' :
                        progress >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {progress.toFixed(1)}% complete
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Performance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-2">Strong Performance</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              {performanceMetrics.filter(m => m.status === 'excellent').map(metric => (
                <li key={metric.id}>• {metric.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-2">Areas for Improvement</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              {performanceMetrics.filter(m => m.status === 'warning' || m.status === 'critical').map(metric => (
                <li key={metric.id}>• {metric.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-2">Upcoming Goals</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              {goalProgress.filter(g => getDaysUntilDeadline(g.deadline) <= 30 && getDaysUntilDeadline(g.deadline) > 0).map(goal => (
                <li key={goal.id}>• {goal.name} ({getDaysUntilDeadline(goal.deadline)} days)</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsDashboard;