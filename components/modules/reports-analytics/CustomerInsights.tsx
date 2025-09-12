import React, { useState } from 'react';
import { Users, TrendingUp, Heart, MapPin, ShoppingBag, Calendar, Filter, Download, Eye, Star } from 'lucide-react';

interface CustomerSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  avgValue: number;
  retention: number;
  characteristics: string[];
  color: string;
}

interface CustomerMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

const CustomerInsights: React.FC = () => {
  const [timeRange, setTimeRange] = useState('last_6_months');
  const [selectedSegment, setSelectedSegment] = useState<CustomerSegment | null>(null);

  const [customerSegments] = useState<CustomerSegment[]>([
    {
      id: '1',
      name: 'Premium Buyers',
      count: 2847,
      percentage: 18.2,
      avgValue: 2450,
      retention: 89.5,
      characteristics: ['High lifetime value', 'Multiple purchases', 'Premium products'],
      color: 'purple'
    },
    {
      id: '2',
      name: 'Regular Customers',
      count: 7891,
      percentage: 50.5,
      avgValue: 847,
      retention: 67.3,
      characteristics: ['Consistent buyers', 'Mid-range products', 'Seasonal patterns'],
      color: 'blue'
    },
    {
      id: '3',
      name: 'Bargain Hunters',
      count: 3256,
      percentage: 20.8,
      avgValue: 324,
      retention: 45.2,
      characteristics: ['Price sensitive', 'Sale shoppers', 'Occasional buyers'],
      color: 'orange'
    },
    {
      id: '4',
      name: 'New Customers',
      count: 1634,
      percentage: 10.5,
      avgValue: 567,
      retention: 24.7,
      characteristics: ['First-time buyers', 'Recent acquisition', 'Potential growth'],
      color: 'green'
    }
  ]);

  const [customerMetrics] = useState<CustomerMetric[]>([
    { label: 'Total Customers', value: '15,628', change: 8.7, trend: 'up' },
    { label: 'Active Customers', value: '12,456', change: 12.3, trend: 'up' },
    { label: 'Customer Lifetime Value', value: '$2,847', change: 15.2, trend: 'up' },
    { label: 'Churn Rate', value: '3.2%', change: -12.5, trend: 'down' },
    { label: 'Net Promoter Score', value: '73', change: 5.8, trend: 'up' },
    { label: 'Customer Satisfaction', value: '94.7%', change: 2.1, trend: 'up' }
  ]);

  const getSegmentColor = (color: string) => {
    const colors = {
      purple: 'bg-purple-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      green: 'bg-green-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  const getSegmentBgColor = (color: string) => {
    const colors = {
      purple: 'bg-purple-50 border-purple-200',
      blue: 'bg-blue-50 border-blue-200',
      orange: 'bg-orange-50 border-orange-200',
      green: 'bg-green-50 border-green-200'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-50 border-gray-200';
  };

  const totalCustomers = customerSegments.reduce((sum, segment) => sum + segment.count, 0);
  const avgRetention = customerSegments.reduce((sum, segment) => sum + segment.retention, 0) / customerSegments.length;
  const avgCustomerValue = customerSegments.reduce((sum, segment) => sum + (segment.avgValue * segment.count), 0) / totalCustomers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-900">Customer Insights</h1>
            </div>
            <p className="text-xl text-gray-600">
              Deep customer analysis with behavioral segmentation, lifetime value tracking, and engagement insights.
            </p>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="last_month">Last Month</option>
              <option value="last_3_months">Last 3 Months</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="last_year">Last Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Segment Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export Analysis
            </button>
          </div>
        </div>

        {/* Customer Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {customerMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                <div className={`flex items-center text-sm ${
                  metric.trend === 'up' ? 'text-green-600' :
                  metric.trend === 'down' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Customer Segmentation */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Segmentation Analysis</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Segment Distribution</h3>
              <div className="space-y-4">
                {customerSegments.map((segment) => (
                  <div key={segment.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getSegmentColor(segment.color)}`}></div>
                        <span className="text-sm font-medium text-gray-900">{segment.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">
                          {segment.count.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">({segment.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getSegmentColor(segment.color)}`}
                        style={{ width: `${segment.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Segment Performance</h3>
              <div className="grid grid-cols-1 gap-4">
                {customerSegments.map((segment) => (
                  <div 
                    key={segment.id} 
                    className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${getSegmentBgColor(segment.color)}`}
                    onClick={() => setSelectedSegment(segment)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{segment.name}</h4>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-gray-600">Avg Value</div>
                        <div className="font-semibold">${segment.avgValue}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Retention</div>
                        <div className="font-semibold">{segment.retention}%</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Count</div>
                        <div className="font-semibold">{segment.count.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Journey & Behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Journey Stages</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Awareness</div>
                    <div className="text-sm text-gray-600">First website visit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">45,892</div>
                  <div className="text-sm text-gray-500">visitors</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Interest</div>
                    <div className="text-sm text-gray-600">Product engagement</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">12,456</div>
                  <div className="text-sm text-gray-500">engaged</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Purchase</div>
                    <div className="text-sm text-gray-600">First order placed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-600">3,247</div>
                  <div className="text-sm text-gray-500">converted</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Loyalty</div>
                    <div className="text-sm text-gray-600">Repeat customers</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">1,847</div>
                  <div className="text-sm text-gray-500">loyal</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Top Customer Preferences</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-900">Living Room Sets</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-green-500" />
                  <span className="text-gray-900">Bedroom Furniture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <span className="text-sm font-medium">68%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-900">Office Furniture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '52%'}}></div>
                  </div>
                  <span className="text-sm font-medium">52%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-900">Outdoor Furniture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '34%'}}></div>
                  </div>
                  <span className="text-sm font-medium">34%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Seasonal Trends</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Spring: Outdoor furniture sales increase 45%</div>
                <div>• Summer: Home office setups peak demand</div>
                <div>• Fall: Living room renovations surge</div>
                <div>• Winter: Bedroom comfort upgrades trend</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Satisfaction Analysis */}
        <div className="bg-white rounded-xl shadow-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Satisfaction & Loyalty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">94.7%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Customer Satisfaction</div>
              <div className="text-sm text-gray-600">Based on 2,847 reviews</div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">73</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Net Promoter Score</div>
              <div className="text-sm text-gray-600">Industry leading NPS</div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl font-bold text-purple-600 mb-2">{avgRetention.toFixed(1)}%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Average Retention</div>
              <div className="text-sm text-gray-600">Across all segments</div>
            </div>
          </div>
        </div>

        {/* Segment Detail Modal */}
        {selectedSegment && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedSegment.name}</h2>
                    <p className="text-gray-600">Detailed segment analysis</p>
                  </div>
                  <button 
                    onClick={() => setSelectedSegment(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <div className="w-6 h-6">✕</div>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Segment Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer Count:</span>
                        <span className="font-medium">{selectedSegment.count.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Percentage:</span>
                        <span className="font-medium">{selectedSegment.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Value:</span>
                        <span className="font-medium">${selectedSegment.avgValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Retention Rate:</span>
                        <span className="font-medium">{selectedSegment.retention}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Characteristics</h3>
                    <div className="space-y-2">
                      {selectedSegment.characteristics.map((char, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Export Segment
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInsights;