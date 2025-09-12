import React, { useState } from 'react';

interface RevenueData {
  period: string;
  revenue: number;
  cost: number;
  grossProfit: number;
  margin: number;
  orders: number;
  avgOrderValue: number;
  growth: number;
}

interface FinancialReport {
  id: string;
  name: string;
  type: 'P&L' | 'Balance Sheet' | 'Cash Flow' | 'Revenue' | 'Customer' | 'Product';
  period: string;
  generatedDate: string;
  generatedBy: string;
  status: 'Draft' | 'Final' | 'Archived';
  data: any;
}

const FinancialReporting: React.FC = () => {
  const [revenueData] = useState<RevenueData[]>([
    {
      period: '2024-12',
      revenue: 425000,
      cost: 245250,
      grossProfit: 179750,
      margin: 42.3,
      orders: 127,
      avgOrderValue: 3346,
      growth: 8.7
    },
    {
      period: '2024-11',
      revenue: 391000,
      cost: 226180,
      grossProfit: 164820,
      margin: 42.2,
      orders: 118,
      avgOrderValue: 3314,
      growth: 5.2
    },
    {
      period: '2024-10',
      revenue: 372000,
      cost: 215160,
      grossProfit: 156840,
      margin: 42.2,
      orders: 112,
      avgOrderValue: 3321,
      growth: 3.8
    },
    {
      period: '2024-09',
      revenue: 358000,
      cost: 207340,
      grossProfit: 150660,
      margin: 42.1,
      orders: 108,
      avgOrderValue: 3315,
      growth: 2.1
    },
    {
      period: '2024-08',
      revenue: 350500,
      cost: 202890,
      grossProfit: 147610,
      margin: 42.1,
      orders: 105,
      avgOrderValue: 3338,
      growth: 4.2
    },
    {
      period: '2024-07',
      revenue: 336500,
      cost: 194970,
      grossProfit: 141530,
      margin: 42.1,
      orders: 101,
      avgOrderValue: 3332,
      growth: 6.8
    }
  ]);

  const [reports] = useState<FinancialReport[]>([
    {
      id: 'RPT-001',
      name: 'Monthly P&L Statement - December 2024',
      type: 'P&L',
      period: '2024-12',
      generatedDate: '2024-12-08',
      generatedBy: 'Jennifer Davis',
      status: 'Draft',
      data: {
        revenue: 425000,
        cogs: 245250,
        grossProfit: 179750,
        operatingExpenses: 98500,
        netIncome: 81250
      }
    },
    {
      id: 'RPT-002',
      name: 'Q4 2024 Revenue Analysis',
      type: 'Revenue',
      period: '2024-Q4',
      generatedDate: '2024-12-05',
      generatedBy: 'Robert Wilson',
      status: 'Final',
      data: {
        totalRevenue: 1248000,
        byChannel: {
          direct: 749000,
          dealer: 374000,
          retailer: 125000
        },
        byCategory: {
          office: 624000,
          living: 374000,
          bedroom: 250000
        }
      }
    },
    {
      id: 'RPT-003',
      name: 'Customer Analysis Report - November 2024',
      type: 'Customer',
      period: '2024-11',
      generatedDate: '2024-11-30',
      generatedBy: 'Sarah Johnson',
      status: 'Final',
      data: {
        totalCustomers: 1247,
        newCustomers: 89,
        repeatCustomers: 156,
        avgOrderValue: 3314,
        topCustomers: [
          { name: 'Corporate Spaces Ltd.', revenue: 48000 },
          { name: 'Modern Office Solutions', revenue: 32000 }
        ]
      }
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('2024-12');
  const [reportType, setReportType] = useState<string>('All');
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getStatusColor = (status: FinancialReport['status']) => {
    switch (status) {
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Final': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentPeriodData = revenueData.find(d => d.period === selectedPeriod);
  const previousPeriodData = revenueData[revenueData.findIndex(d => d.period === selectedPeriod) + 1];

  const filteredReports = reports.filter(report => 
    reportType === 'All' || report.type === reportType
  );

  // Calculate year-to-date totals
  const ytdRevenue = revenueData.reduce((sum, period) => sum + period.revenue, 0);
  const ytdCost = revenueData.reduce((sum, period) => sum + period.cost, 0);
  const ytdProfit = ytdRevenue - ytdCost;
  const ytdMargin = (ytdProfit / ytdRevenue) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-900">Financial Reporting</h3>
          <p className="text-gray-600">Comprehensive financial analysis and reporting</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            {revenueData.map(period => (
              <option key={period.period} value={period.period}>
                {new Date(period.period + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowCreateReport(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Revenue</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentPeriodData?.revenue || 0)}</p>
            </div>
            <div className="text-2xl text-blue-600">📈</div>
          </div>
          <div className="mt-2">
            <span className={`text-sm font-medium ${
              (currentPeriodData?.growth || 0) > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatPercent(currentPeriodData?.growth || 0)} vs last month
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Gross Profit</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentPeriodData?.grossProfit || 0)}</p>
            </div>
            <div className="text-2xl text-green-600">💰</div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Margin: {currentPeriodData?.margin.toFixed(1)}%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Avg Order Value</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentPeriodData?.avgOrderValue || 0)}</p>
            </div>
            <div className="text-2xl text-purple-600">🛒</div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">{currentPeriodData?.orders} orders</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500">YTD Revenue</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(ytdRevenue)}</p>
            </div>
            <div className="text-2xl text-orange-600">📊</div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Margin: {ytdMargin.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-medium text-gray-900">Revenue & Profit Trends</h4>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
              <span>Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
              <span>Gross Profit</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {revenueData.slice(0, 6).reverse().map((period, index) => {
            const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
            const revenueWidth = (period.revenue / maxRevenue) * 100;
            const profitWidth = (period.grossProfit / maxRevenue) * 100;
            
            return (
              <div key={period.period} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(period.period + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-blue-600 font-medium">{formatCurrency(period.revenue)}</span>
                    <span className="text-green-600 font-medium">{formatCurrency(period.grossProfit)}</span>
                    <span className={`font-medium ${
                      period.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(period.growth)}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div 
                      className="bg-blue-600 h-6 rounded-full relative" 
                      style={{ width: `${revenueWidth}%` }}
                    >
                      <div 
                        className="bg-green-600 h-6 rounded-full absolute top-0 left-0" 
                        style={{ width: `${(profitWidth / revenueWidth) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Revenue by Category</h4>
          <div className="space-y-4">
            {[
              { category: 'Office Furniture', amount: 255000, percentage: 60, growth: 12.5 },
              { category: 'Living Room', amount: 127500, percentage: 30, growth: 8.2 },
              { category: 'Bedroom', amount: 42500, percentage: 10, growth: -2.1 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <div className="flex space-x-3 text-sm">
                    <span className="font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                    <span className={`font-medium ${
                      item.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(item.growth)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{item.percentage}% of total revenue</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Revenue by Customer Type</h4>
          <div className="space-y-4">
            {[
              { type: 'Direct Sales', amount: 255000, percentage: 60, customers: 89 },
              { type: 'Dealer Network', amount: 127500, percentage: 30, customers: 156 },
              { type: 'Retail Partners', amount: 42500, percentage: 10, customers: 34 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  <div className="flex space-x-3 text-sm">
                    <span className="font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                    <span className="text-gray-600">{item.customers} customers</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {item.percentage}% of revenue • Avg: {formatCurrency(item.amount / item.customers)} per customer
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Management */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium text-gray-900">Generated Reports</h4>
            <div className="flex space-x-3">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="All">All Report Types</option>
                <option value="P&L">P&L Statement</option>
                <option value="Balance Sheet">Balance Sheet</option>
                <option value="Cash Flow">Cash Flow</option>
                <option value="Revenue">Revenue Analysis</option>
                <option value="Customer">Customer Analysis</option>
                <option value="Product">Product Analysis</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated
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
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{report.name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-gray-900">{report.generatedDate}</p>
                        <p className="text-sm text-gray-500">by {report.generatedBy}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">Download</button>
                        <button className="text-green-600 hover:text-green-900">Share</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Comparative Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="text-lg font-medium text-gray-900 mb-6">Period Comparison</h4>
        {currentPeriodData && previousPeriodData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-medium text-gray-900 mb-4">
                Current Period ({new Date(currentPeriodData.period + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })})
              </h5>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(currentPeriodData.revenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Cost of Goods</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(currentPeriodData.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Gross Profit</span>
                  <span className="text-sm font-medium text-green-600">{formatCurrency(currentPeriodData.grossProfit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Margin</span>
                  <span className="text-sm font-medium text-gray-900">{currentPeriodData.margin.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Orders</span>
                  <span className="text-sm font-medium text-gray-900">{currentPeriodData.orders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Order Value</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(currentPeriodData.avgOrderValue)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-900 mb-4">
                Previous Period ({new Date(previousPeriodData.period + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })})
              </h5>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(previousPeriodData.revenue)}</span>
                    <span className={`text-xs font-medium ${
                      currentPeriodData.revenue > previousPeriodData.revenue ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(((currentPeriodData.revenue - previousPeriodData.revenue) / previousPeriodData.revenue) * 100)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cost of Goods</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(previousPeriodData.cost)}</span>
                    <span className={`text-xs font-medium ${
                      currentPeriodData.cost < previousPeriodData.cost ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(((currentPeriodData.cost - previousPeriodData.cost) / previousPeriodData.cost) * 100)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gross Profit</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-green-600">{formatCurrency(previousPeriodData.grossProfit)}</span>
                    <span className={`text-xs font-medium ${
                      currentPeriodData.grossProfit > previousPeriodData.grossProfit ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(((currentPeriodData.grossProfit - previousPeriodData.grossProfit) / previousPeriodData.grossProfit) * 100)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Margin</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{previousPeriodData.margin.toFixed(1)}%</span>
                    <span className={`text-xs font-medium ${
                      currentPeriodData.margin > previousPeriodData.margin ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {(currentPeriodData.margin - previousPeriodData.margin) > 0 ? '+' : ''}
                      {(currentPeriodData.margin - previousPeriodData.margin).toFixed(1)}pp
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Orders</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{previousPeriodData.orders}</span>
                    <span className={`text-xs font-medium ${
                      currentPeriodData.orders > previousPeriodData.orders ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(((currentPeriodData.orders - previousPeriodData.orders) / previousPeriodData.orders) * 100)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Order Value</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(previousPeriodData.avgOrderValue)}</span>
                    <span className={`text-xs font-medium ${
                      currentPeriodData.avgOrderValue > previousPeriodData.avgOrderValue ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(((currentPeriodData.avgOrderValue - previousPeriodData.avgOrderValue) / previousPeriodData.avgOrderValue) * 100)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReporting;