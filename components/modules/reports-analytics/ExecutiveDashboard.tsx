import React, { useState } from 'react';
import { Crown, TrendingUp, DollarSign, Users, Target, Calendar, Download, Filter, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  value: string;
  change: number;
  target: string;
  status: 'above' | 'on_target' | 'below';
  trend: 'up' | 'down' | 'stable';
}

const ExecutiveDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('current_month');
  const [refreshing, setRefreshing] = useState(false);

  const [kpis] = useState<KPI[]>([
    {
      id: '1',
      name: 'Total Revenue',
      value: '$14.2M',
      change: 12.4,
      target: '$13.5M',
      status: 'above',
      trend: 'up'
    },
    {
      id: '2',
      name: 'Gross Profit Margin',
      value: '31.2%',
      change: 2.1,
      target: '30.0%',
      status: 'above',
      trend: 'up'
    },
    {
      id: '3',
      name: 'Customer Acquisition',
      value: '2,847',
      change: -3.2,
      target: '3,000',
      status: 'below',
      trend: 'down'
    },
    {
      id: '4',
      name: 'Market Share',
      value: '23.7%',
      change: 1.8,
      target: '25.0%',
      status: 'below',
      trend: 'up'
    },
    {
      id: '5',
      name: 'Customer Satisfaction',
      value: '94.7%',
      change: 2.1,
      target: '95.0%',
      status: 'on_target',
      trend: 'up'
    },
    {
      id: '6',
      name: 'Employee Productivity',
      value: '127%',
      change: 5.3,
      target: '120%',
      status: 'above',
      trend: 'up'
    }
  ]);

  const getStatusColor = (status: KPI['status']) => {
    switch (status) {
      case 'above': return 'text-green-600 bg-green-100';
      case 'on_target': return 'text-blue-600 bg-blue-100';
      case 'below': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: KPI['trend'], change: number) => {
    if (trend === 'up' || change > 0) {
      return <ArrowUp className="w-4 h-4 text-green-500" />;
    } else if (trend === 'down' || change < 0) {
      return <ArrowDown className="w-4 h-4 text-red-500" />;
    }
    return <div className="w-4 h-4 text-gray-400">→</div>;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-900">Executive Dashboard</h1>
            </div>
            <p className="text-xl text-gray-600">
              Strategic overview and key performance indicators for executive leadership and board reporting.
            </p>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="current_month">Current Month</option>
              <option value="current_quarter">Current Quarter</option>
              <option value="ytd">Year to Date</option>
              <option value="last_year">Last Year</option>
            </select>
            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Executive Summary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Financial Performance</h3>
                  <div className="text-3xl font-bold text-green-700 mb-2">Exceeding Targets</div>
                  <p className="text-sm text-green-600">
                    Revenue up 12.4% with profit margins improving to 31.2%. Strong financial position maintained.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Operational Excellence</h3>
                  <div className="text-3xl font-bold text-blue-700 mb-2">High Performance</div>
                  <p className="text-sm text-blue-600">
                    Employee productivity at 127% of target with customer satisfaction maintaining at 94.7%.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">Market Position</h3>
                  <div className="text-3xl font-bold text-orange-700 mb-2">Growing Share</div>
                  <p className="text-sm text-orange-600">
                    Market share increased to 23.7% with competitive advantages strengthening across segments.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Strategic Initiatives</h3>
                  <div className="text-3xl font-bold text-purple-700 mb-2">On Track</div>
                  <p className="text-sm text-purple-600">
                    Key strategic projects progressing well with 8 of 10 major initiatives ahead of schedule.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements This Period</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900">Revenue Growth</div>
                    <div className="text-sm text-gray-600">Exceeded quarterly targets by $700K</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900">Product Launch</div>
                    <div className="text-sm text-gray-600">Successfully launched 3 new product lines</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900">Market Expansion</div>
                    <div className="text-sm text-gray-600">Entered 2 new geographic markets</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-900">Technology Investment</div>
                    <div className="text-sm text-gray-600">Completed digital transformation phase 2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.id} className="bg-white rounded-xl shadow-lg border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.name}</h3>
                  <div className="text-3xl font-bold text-gray-900">{kpi.value}</div>
                </div>
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                  {kpi.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {getTrendIcon(kpi.trend, kpi.change)}
                  <span className={`text-sm font-medium ${
                    kpi.change > 0 ? 'text-green-600' : kpi.change < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {kpi.change > 0 ? '+' : ''}{kpi.change}%
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Target: {kpi.target}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Health Score</h3>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-green-600 mb-2">87</div>
              <div className="text-gray-600">Excellent Financial Health</div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Liquidity Ratio:</span>
                <span className="font-semibold text-green-600">2.4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Debt-to-Equity:</span>
                <span className="font-semibold text-blue-600">0.3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">ROI:</span>
                <span className="font-semibold text-purple-600">18.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cash Flow:</span>
                <span className="font-semibold text-green-600">Strong</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Risk Assessment</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800">Low Risk</span>
                </div>
                <p className="text-sm text-green-700">
                  Financial stability maintained with diversified revenue streams and strong market position.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-yellow-800">Medium Risk</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Supply chain dependencies and market competition require continued monitoring.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-blue-800">Opportunities</span>
                </div>
                <p className="text-sm text-blue-700">
                  Market expansion potential and technology investments show strong ROI prospects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Actions */}
        <div className="bg-white rounded-xl shadow-lg border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Executive Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Strategic Review</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Schedule quarterly strategy review to assess market expansion opportunities and competitive positioning.
              </p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Schedule Review →
              </button>
            </div>
            
            <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-900">Investment Analysis</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Evaluate technology infrastructure investments to maintain competitive advantage and operational efficiency.
              </p>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                Review Investments →
              </button>
            </div>
            
            <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Talent Development</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Implement leadership development programs to support organizational growth and succession planning.
              </p>
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                Plan Development →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;