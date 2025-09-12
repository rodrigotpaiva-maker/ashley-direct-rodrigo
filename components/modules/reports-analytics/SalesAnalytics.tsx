import React, { useState } from 'react';
import { TrendingUp, BarChart3, Users, Target, Calendar, Filter, Download, ArrowUp, ArrowDown, DollarSign } from 'lucide-react';

interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  conversionRate: number;
}

interface SalesRep {
  id: string;
  name: string;
  territory: string;
  revenue: number;
  orders: number;
  target: number;
  achievement: number;
}

const SalesAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('current_month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const [salesData] = useState<SalesData[]>([
    { period: 'Jan 2024', revenue: 850000, orders: 1247, avgOrderValue: 682, conversionRate: 4.2 },
    { period: 'Feb 2024', revenue: 920000, orders: 1356, avgOrderValue: 678, conversionRate: 4.5 },
    { period: 'Mar 2024', revenue: 1150000, orders: 1689, avgOrderValue: 681, conversionRate: 4.8 },
    { period: 'Apr 2024', revenue: 980000, orders: 1445, avgOrderValue: 678, conversionRate: 4.3 },
    { period: 'May 2024', revenue: 1080000, orders: 1598, avgOrderValue: 676, conversionRate: 4.6 },
    { period: 'Jun 2024', revenue: 1200000, orders: 1789, avgOrderValue: 671, conversionRate: 4.9 }
  ]);

  const [salesReps] = useState<SalesRep[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      territory: 'Southeast',
      revenue: 2850000,
      orders: 847,
      target: 2500000,
      achievement: 114.0
    },
    {
      id: '2',
      name: 'Michael Chen',
      territory: 'Northeast',
      revenue: 2650000,
      orders: 789,
      target: 2400000,
      achievement: 110.4
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      territory: 'Southwest',
      revenue: 2420000,
      orders: 712,
      target: 2300000,
      achievement: 105.2
    },
    {
      id: '4',
      name: 'David Park',
      territory: 'Northwest',
      revenue: 2180000,
      orders: 634,
      target: 2200000,
      achievement: 99.1
    },
    {
      id: '5',
      name: 'Jennifer Wilson',
      territory: 'Central',
      revenue: 1950000,
      orders: 567,
      target: 2000000,
      achievement: 97.5
    }
  ]);

  const currentMonthRevenue = salesData[salesData.length - 1]?.revenue || 0;
  const previousMonthRevenue = salesData[salesData.length - 2]?.revenue || 0;
  const revenueGrowth = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
  
  const totalRevenue = salesData.reduce((sum, data) => sum + data.revenue, 0);
  const totalOrders = salesData.reduce((sum, data) => sum + data.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const avgConversionRate = salesData.reduce((sum, data) => sum + data.conversionRate, 0) / salesData.length;

  const topPerformer = salesReps.reduce((top, rep) => rep.achievement > top.achievement ? rep : top, salesReps[0]);
  const totalTarget = salesReps.reduce((sum, rep) => sum + rep.target, 0);
  const totalAchieved = salesReps.reduce((sum, rep) => sum + rep.revenue, 0);
  const overallAchievement = (totalAchieved / totalTarget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <h1 className="text-4xl font-bold text-gray-900">Sales Analytics</h1>
            </div>
            <p className="text-xl text-gray-600">
              Comprehensive sales performance analysis with revenue tracking, conversion metrics, and team performance insights.
            </p>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="current_month">Current Month</option>
              <option value="last_3_months">Last 3 Months</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="ytd">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                <div className={`flex items-center mt-2 ${revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {revenueGrowth >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                  <span className="text-sm">{Math.abs(revenueGrowth).toFixed(1)}% vs last month</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600">{totalOrders.toLocaleString()}</p>
                <div className="text-sm text-gray-500 mt-2">Across all channels</div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-3xl font-bold text-purple-600">${avgOrderValue.toFixed(0)}</p>
                <div className="text-sm text-gray-500 mt-2">Per transaction</div>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-orange-600">{avgConversionRate.toFixed(1)}%</p>
                <div className="text-sm text-gray-500 mt-2">Website visitors</div>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Sales Trend Chart */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Sales Performance Trend</h2>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="revenue">Revenue</option>
              <option value="orders">Orders</option>
              <option value="avgOrderValue">Avg Order Value</option>
              <option value="conversionRate">Conversion Rate</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {salesData.map((data, index) => {
              let value: number;
              let maxValue: number;
              let formatValue: (val: number) => string;
              
              switch (selectedMetric) {
                case 'revenue':
                  value = data.revenue;
                  maxValue = Math.max(...salesData.map(d => d.revenue));
                  formatValue = (val) => `$${(val / 1000000).toFixed(1)}M`;
                  break;
                case 'orders':
                  value = data.orders;
                  maxValue = Math.max(...salesData.map(d => d.orders));
                  formatValue = (val) => val.toString();
                  break;
                case 'avgOrderValue':
                  value = data.avgOrderValue;
                  maxValue = Math.max(...salesData.map(d => d.avgOrderValue));
                  formatValue = (val) => `$${val.toFixed(0)}`;
                  break;
                case 'conversionRate':
                  value = data.conversionRate;
                  maxValue = Math.max(...salesData.map(d => d.conversionRate));
                  formatValue = (val) => `${val.toFixed(1)}%`;
                  break;
                default:
                  value = data.revenue;
                  maxValue = Math.max(...salesData.map(d => d.revenue));
                  formatValue = (val) => `$${(val / 1000000).toFixed(1)}M`;
              }
              
              const widthPercentage = (value / maxValue) * 100;
              const previousValue = index > 0 ? 
                (selectedMetric === 'revenue' ? salesData[index - 1].revenue :
                 selectedMetric === 'orders' ? salesData[index - 1].orders :
                 selectedMetric === 'avgOrderValue' ? salesData[index - 1].avgOrderValue :
                 salesData[index - 1].conversionRate) : value;
              const change = index > 0 ? ((value - previousValue) / previousValue) * 100 : 0;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{data.period}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-900">
                        {formatValue(value)}
                      </span>
                      {index > 0 && (
                        <span className={`flex items-center text-xs ${
                          change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {change >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                          {Math.abs(change).toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${widthPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sales Team Performance */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Sales Team Performance</h2>
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">Overall Achievement</div>
              <div className={`text-2xl font-bold ${
                overallAchievement >= 100 ? 'text-green-600' : 'text-orange-600'
              }`}>
                {overallAchievement.toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Rep</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Territory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesReps.map((rep) => (
                  <tr key={rep.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{rep.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rep.territory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${rep.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rep.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${rep.target.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        rep.achievement >= 110 ? 'text-green-600' :
                        rep.achievement >= 100 ? 'text-blue-600' :
                        rep.achievement >= 90 ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {rep.achievement.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            rep.achievement >= 110 ? 'bg-green-500' :
                            rep.achievement >= 100 ? 'bg-blue-500' :
                            rep.achievement >= 90 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(rep.achievement, 120)}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performer Spotlight */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Top Performer</h2>
              <div className="text-3xl font-bold text-green-700 mb-1">{topPerformer.name}</div>
              <div className="text-lg text-green-600">{topPerformer.territory} Territory</div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-700 mb-2">{topPerformer.achievement.toFixed(1)}%</div>
              <div className="text-green-600">of target achieved</div>
              <div className="text-sm text-green-500 mt-2">
                ${topPerformer.revenue.toLocaleString()} revenue • {topPerformer.orders} orders
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;