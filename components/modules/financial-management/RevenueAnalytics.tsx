import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar, DollarSign, Target, ArrowUp, ArrowDown, Filter, Download } from 'lucide-react';

interface RevenueData {
  month: string;
  revenue: number;
  previousYear: number;
  forecast: number;
}

interface ProductRevenue {
  category: string;
  revenue: number;
  percentage: number;
  growth: number;
}

const RevenueAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const [revenueData] = useState<RevenueData[]>([
    { month: 'Jan 2024', revenue: 850000, previousYear: 720000, forecast: 880000 },
    { month: 'Feb 2024', revenue: 920000, previousYear: 780000, forecast: 940000 },
    { month: 'Mar 2024', revenue: 1150000, previousYear: 950000, forecast: 1100000 },
    { month: 'Apr 2024', revenue: 980000, previousYear: 890000, forecast: 1020000 },
    { month: 'May 2024', revenue: 1080000, previousYear: 920000, forecast: 1150000 },
    { month: 'Jun 2024', revenue: 1200000, previousYear: 1000000, forecast: 1250000 },
    { month: 'Jul 2024', revenue: 1100000, previousYear: 1050000, forecast: 1180000 },
    { month: 'Aug 2024', revenue: 1250000, previousYear: 1100000, forecast: 1300000 },
    { month: 'Sep 2024', revenue: 1180000, previousYear: 1080000, forecast: 1220000 },
    { month: 'Oct 2024', revenue: 1350000, previousYear: 1200000, forecast: 1400000 },
    { month: 'Nov 2024', revenue: 1280000, previousYear: 1150000, forecast: 1320000 },
    { month: 'Dec 2024', revenue: 1450000, previousYear: 1300000, forecast: 1500000 }
  ]);

  const [productRevenue] = useState<ProductRevenue[]>([
    { category: 'Living Room Sets', revenue: 4850000, percentage: 35.2, growth: 18.5 },
    { category: 'Bedroom Furniture', revenue: 3200000, percentage: 23.2, growth: 12.3 },
    { category: 'Dining Sets', revenue: 2150000, percentage: 15.6, growth: -2.1 },
    { category: 'Office Furniture', revenue: 1850000, percentage: 13.4, growth: 25.7 },
    { category: 'Outdoor Furniture', revenue: 980000, percentage: 7.1, growth: 32.4 },
    { category: 'Accessories & Decor', revenue: 750000, percentage: 5.4, growth: 8.9 }
  ]);

  const currentYearTotal = revenueData.reduce((sum, data) => sum + data.revenue, 0);
  const previousYearTotal = revenueData.reduce((sum, data) => sum + data.previousYear, 0);
  const forecastTotal = revenueData.reduce((sum, data) => sum + data.forecast, 0);
  const growthRate = ((currentYearTotal - previousYearTotal) / previousYearTotal * 100);
  
  const averageMonthlyRevenue = currentYearTotal / revenueData.length;
  const highestMonth = revenueData.reduce((max, data) => data.revenue > max.revenue ? data : max, revenueData[0]);
  const forecastAccuracy = ((currentYearTotal / forecastTotal) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Revenue Analytics</h1>
          <p className="text-xl text-gray-600">
            Comprehensive revenue analysis with forecasting, trends, and performance metrics.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue (YTD)</p>
                <p className="text-3xl font-bold text-green-600">${currentYearTotal.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{growthRate.toFixed(1)}% vs last year</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Average</p>
                <p className="text-3xl font-bold text-blue-600">${averageMonthlyRevenue.toLocaleString()}</p>
                <div className="text-sm text-gray-500 mt-2">Based on 12 months</div>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Month</p>
                <p className="text-3xl font-bold text-purple-600">${highestMonth.revenue.toLocaleString()}</p>
                <div className="text-sm text-gray-500 mt-2">{highestMonth.month}</div>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                <p className="text-3xl font-bold text-orange-600">{forecastAccuracy.toFixed(1)}%</p>
                <div className="text-sm text-gray-500 mt-2">vs planned targets</div>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg border mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="6months">Last 6 Months</option>
                  <option value="12months">Last 12 Months</option>
                  <option value="24months">Last 24 Months</option>
                  <option value="custom">Custom Range</option>
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  <option value="revenue">Revenue</option>
                  <option value="growth">Growth Rate</option>
                  <option value="forecast">vs Forecast</option>
                  <option value="comparison">YoY Comparison</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-xl shadow-lg border">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Revenue Trend</h2>
              <div className="space-y-4">
                {revenueData.slice(-6).map((data, index) => {
                  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
                  const widthPercentage = (data.revenue / maxRevenue) * 100;
                  const growthVsPrevious = ((data.revenue - data.previousYear) / data.previousYear * 100);
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-gray-900">
                            ${data.revenue.toLocaleString()}
                          </span>
                          <span className={`flex items-center text-xs ${
                            growthVsPrevious >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {growthVsPrevious >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                            {Math.abs(growthVsPrevious).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${widthPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Revenue by Product Category */}
          <div className="bg-white rounded-xl shadow-lg border">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue by Product Category</h2>
              <div className="space-y-4">
                {productRevenue.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{product.category}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{product.percentage}%</span>
                        <span className="text-sm font-bold text-gray-900">
                          ${product.revenue.toLocaleString()}
                        </span>
                        <span className={`flex items-center text-xs ${
                          product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.growth >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                          {Math.abs(product.growth)}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          product.growth >= 0 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${product.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Revenue Analysis */}
        <div className="bg-white rounded-xl shadow-lg border">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Analysis & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenue (YTD):</span>
                    <span className="font-semibold">${currentYearTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Previous Year (YTD):</span>
                    <span className="font-semibold">${previousYearTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Amount:</span>
                    <span className="font-semibold text-green-600">
                      ${(currentYearTotal - previousYearTotal).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth Rate:</span>
                    <span className="font-semibold text-green-600">{growthRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Forecast vs Actual</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Forecasted Revenue:</span>
                    <span className="font-semibold">${forecastTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Actual Revenue:</span>
                    <span className="font-semibold">${currentYearTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Variance:</span>
                    <span className={`font-semibold ${
                      currentYearTotal >= forecastTotal ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {currentYearTotal >= forecastTotal ? '+' : ''}${(currentYearTotal - forecastTotal).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-semibold">{forecastAccuracy.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-green-800">Strong Growth</div>
                    <div className="text-xs text-green-600">Living Room Sets category leading with 18.5% growth</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-800">Peak Performance</div>
                    <div className="text-xs text-blue-600">December showing highest monthly revenue</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-sm font-medium text-orange-800">Opportunity</div>
                    <div className="text-xs text-orange-600">Outdoor Furniture showing 32.4% growth potential</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;