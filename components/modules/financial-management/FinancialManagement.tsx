import React, { useState } from 'react';
import {
  InvoiceManagement,
  PaymentProcessing,
  CreditManagement,
  FinancialReporting
} from './';

type FinancialTab = 'invoices' | 'payments' | 'credit' | 'reporting';

interface FinancialMetrics {
  totalRevenue: number;
  pendingInvoices: number;
  overduePayments: number;
  creditUtilization: number;
  averagePaymentDays: number;
  profitMargin: number;
  monthlyGrowth: number;
  outstandingAR: number;
}

const FinancialManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FinancialTab>('invoices');
  
  // Mock financial metrics
  const [metrics] = useState<FinancialMetrics>({
    totalRevenue: 2485000,
    pendingInvoices: 127,
    overduePayments: 23,
    creditUtilization: 68.5,
    averagePaymentDays: 32,
    profitMargin: 42.3,
    monthlyGrowth: 8.7,
    outstandingAR: 485000
  });

  const tabs = [
    { id: 'invoices' as FinancialTab, name: 'Invoice Management', icon: '📄' },
    { id: 'payments' as FinancialTab, name: 'Payment Processing', icon: '💳' },
    { id: 'credit' as FinancialTab, name: 'Credit Management', icon: '🏦' },
    { id: 'reporting' as FinancialTab, name: 'Financial Reporting', icon: '📊' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'invoices':
        return <InvoiceManagement />;
      case 'payments':
        return <PaymentProcessing />;
      case 'credit':
        return <CreditManagement />;
      case 'reporting':
        return <FinancialReporting />;
      default:
        return <InvoiceManagement />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getMetricColor = (type: string, value: number) => {
    switch (type) {
      case 'growth':
        return value > 5 ? 'text-green-600' : value > 0 ? 'text-yellow-600' : 'text-red-600';
      case 'margin':
        return value > 40 ? 'text-green-600' : value > 30 ? 'text-yellow-600' : 'text-red-600';
      case 'days':
        return value < 30 ? 'text-green-600' : value < 45 ? 'text-yellow-600' : 'text-red-600';
      case 'overdue':
        return value < 10 ? 'text-green-600' : value < 25 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
          <p className="text-gray-600">Monitor revenue, manage invoices, and track financial performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Generate Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create Invoice
          </button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalRevenue)}</p>
            </div>
            <div className="text-2xl text-green-600">📈</div>
          </div>
          <div className="mt-2">
            <span className={`text-sm font-medium ${getMetricColor('growth', metrics.monthlyGrowth)}`}>
              +{metrics.monthlyGrowth}% this month
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Outstanding A/R</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.outstandingAR)}</p>
            </div>
            <div className="text-2xl text-blue-600">💰</div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">{metrics.pendingInvoices} pending invoices</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Profit Margin</h3>
              <p className="text-2xl font-bold text-gray-900">{metrics.profitMargin}%</p>
            </div>
            <div className="text-2xl text-purple-600">📊</div>
          </div>
          <div className="mt-2">
            <span className={`text-sm font-medium ${getMetricColor('margin', metrics.profitMargin)}`}>
              Industry leading
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Avg Payment Days</h3>
              <p className="text-2xl font-bold text-gray-900">{metrics.averagePaymentDays}</p>
            </div>
            <div className="text-2xl text-orange-600">⏱️</div>
          </div>
          <div className="mt-2">
            <span className={`text-sm font-medium ${getMetricColor('days', metrics.averagePaymentDays)}`}>
              {metrics.overduePayments} overdue
            </span>
          </div>
        </div>
      </div>

      {/* Financial Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Alerts & Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h4 className="font-medium text-red-800">Overdue Payments</h4>
            </div>
            <p className="text-sm text-red-700">{metrics.overduePayments} invoices are past due, totaling {formatCurrency(125000)}</p>
            <button className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium">Review Overdue →</button>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h4 className="font-medium text-yellow-800">Credit Limits</h4>
            </div>
            <p className="text-sm text-yellow-700">5 customers approaching credit limits. Review credit terms recommended.</p>
            <button className="mt-2 text-sm text-yellow-600 hover:text-yellow-800 font-medium">Manage Credit →</button>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h4 className="font-medium text-green-800">Strong Performance</h4>
            </div>
            <p className="text-sm text-green-700">Revenue growth of {metrics.monthlyGrowth}% exceeds target. Profit margins remain strong.</p>
            <button className="mt-2 text-sm text-green-600 hover:text-green-800 font-medium">View Reports →</button>
          </div>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { period: 'This Month', amount: 425000, change: '+8.7%', positive: true },
            { period: 'Last Month', amount: 391000, change: '+5.2%', positive: true },
            { period: 'Quarter to Date', amount: 1285000, change: '+12.3%', positive: true },
            { period: 'Year to Date', amount: 4850000, change: '+15.8%', positive: true }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <h4 className="text-sm font-medium text-gray-500">{item.period}</h4>
              <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(item.amount)}</p>
              <p className={`text-sm font-medium mt-1 ${
                item.positive ? 'text-green-600' : 'text-red-600'
              }`}>{item.change}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors flex items-center space-x-2`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Financial Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              📄 Create New Invoice
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              💳 Process Payment
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              📊 Generate Financial Report
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              🏦 Review Credit Applications
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Methods</h3>
          <div className="space-y-3">
            {[
              { method: 'Credit Card', percentage: 45, amount: 1092500 },
              { method: 'Bank Transfer', percentage: 35, amount: 849750 },
              { method: 'Check', percentage: 15, amount: 364250 },
              { method: 'Cash', percentage: 5, amount: 121500 }
            ].map((payment, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{payment.method}</p>
                  <p className="text-xs text-gray-500">{formatCurrency(payment.amount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{payment.percentage}%</p>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${payment.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Top Customers by Revenue</h3>
          <div className="space-y-3">
            {[
              { name: 'Corporate Spaces Ltd.', revenue: 185000, growth: '+22%' },
              { name: 'Modern Office Solutions', revenue: 142000, growth: '+15%' },
              { name: 'Elite Furnishings LLC', revenue: 128000, growth: '+8%' },
              { name: 'Comfort Living Inc.', revenue: 95000, growth: '+12%' }
            ].map((customer, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                  <p className="text-xs text-gray-500">{formatCurrency(customer.revenue)} YTD</p>
                </div>
                <span className="text-sm text-green-600 font-medium">{customer.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialManagement;