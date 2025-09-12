import React, { useState } from 'react';
import { Target, TrendingUp, Users, DollarSign, Clock, Award, BarChart3, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface Department {
  id: string;
  name: string;
  efficiency: number;
  goals: number;
  satisfaction: number;
  icon: any;
}

const PerformanceDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('current_month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const [kpis] = useState<KPI[]>([
    {
      id: '1',
      name: 'Revenue Growth',
      current: 12.4,
      target: 10.0,
      unit: '%',
      trend: 'up',
      change: 2.4,
      status: 'excellent'
    },
    {
      id: '2',
      name: 'Customer Satisfaction',
      current: 94.7,
      target: 95.0,
      unit: '%',
      trend: 'up',
      change: 2.1,
      status: 'good'
    },
    {
      id: '3',
      name: 'Order Fulfillment Time',
      current: 2.8,
      target: 3.0,
      unit: 'days',
      trend: 'down',
      change: -0.4,
      status: 'excellent'
    },
    {
      id: '4',
      name: 'Employee Productivity',
      current: 127,
      target: 120,
      unit: '%',
      trend: 'up',
      change: 5.3,
      status: 'excellent'
    },
    {
      id: '5',
      name: 'Quality Score',
      current: 98.2,
      target: 98.0,
      unit: '%',
      trend: 'stable',
      change: 0.1,
      status: 'excellent'
    },
    {
      id: '6',
      name: 'Cost Efficiency',
      current: 87.5,
      target: 85.0,
      unit: '%',
      trend: 'up',
      change: 3.2,
      status: 'excellent'
    }
  ]);

  const [departments] = useState<Department[]>([
    {
      id: '1',
      name: 'Sales',
      efficiency: 127,
      goals: 94,
      satisfaction: 92,
      icon: TrendingUp
    },
    {
      id: '2',
      name: 'Operations',
      efficiency: 89,
      goals: 87,
      satisfaction: 88,
      icon: Target
    },
    {
      id: '3',
      name: 'Customer Service',
      efficiency: 95,
      goals: 98,
      satisfaction: 96,
      icon: Users
    },
    {
      id: '4',
      name: 'Finance',
      efficiency: 92,
      goals: 91,
      satisfaction: 85,
      icon: DollarSign
    },
    {
      id: '5',
      name: 'Logistics',
      efficiency: 86,
      goals: 83,
      satisfaction: 89,
      icon: Clock
    }
  ]);

  const getKPIStatusColor = (status: KPI['status']) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getKPIStatusIcon = (status: KPI['status']) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'good': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: KPI['trend']) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getPerformanceColor = (value: number, threshold = 90) => {
    if (value >= threshold + 10) return 'text-green-600';
    if (value >= threshold) return 'text-blue-600';
    if (value >= threshold - 10) return 'text-orange-600';
    return 'text-red-600';
  };

  const overallPerformance = kpis.reduce((sum, kpi) => {
    const achievement = (kpi.current / kpi.target) * 100;
    return sum + (achievement > 100 ? 100 : achievement);
  }, 0) / kpis.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-red-600" />
              <h1 className="text-4xl font-bold text-gray-900">Performance Dashboard</h1>
            </div>
            <p className="text-xl text-gray-600">
              Real-time performance monitoring with KPI tracking, goal achievement, and operational efficiency metrics.
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
              <option value="custom">Custom Range</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="sales">Sales</option>
              <option value="operations">Operations</option>
              <option value="customer_service">Customer Service</option>
              <option value="finance">Finance</option>
              <option value="logistics">Logistics</option>
            </select>
          </div>
        </div>

        {/* Overall Performance Score */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Performance Score</h2>
            <div className="flex items-center justify-center gap-8">
              <div>
                <div className="text-6xl font-bold text-green-600 mb-2">{overallPerformance.toFixed(1)}%</div>
                <div className="text-lg text-gray-600">Target Achievement</div>
              </div>
              <div className="w-32 h-32 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-500"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${overallPerformance}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi) => {
            const achievement = (kpi.current / kpi.target) * 100;
            const isReversed = kpi.name.includes('Time') || kpi.name.includes('Cost');
            
            return (
              <div key={kpi.id} className="bg-white rounded-xl shadow-lg border p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{kpi.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getKPIStatusColor(kpi.status)}`}>
                    {getKPIStatusIcon(kpi.status)}
                    {kpi.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {kpi.current}{kpi.unit === '%' ? '%' : ''}
                    </span>
                    {kpi.unit !== '%' && <span className="text-gray-500">{kpi.unit}</span>}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Target: {kpi.target}{kpi.unit === '%' ? '%' : ` ${kpi.unit}`}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className={`flex items-center text-sm ${
                    (isReversed ? kpi.change < 0 : kpi.change > 0) ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span className="mr-1">{getTrendIcon(kpi.trend)}</span>
                    {Math.abs(kpi.change)}{kpi.unit === '%' ? 'pp' : kpi.unit} vs target
                  </div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        achievement >= 100 ? 'bg-green-500' :
                        achievement >= 90 ? 'bg-blue-500' :
                        achievement >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(achievement, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-xl shadow-lg border p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {departments.map((dept) => {
              const Icon = dept.icon;
              const avgScore = (dept.efficiency + dept.goals + dept.satisfaction) / 3;
              
              return (
                <div key={dept.id} className="text-center">
                  <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">{dept.name}</h3>
                    <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(avgScore)}`}>
                      {avgScore.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">Overall Score</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Efficiency:</span>
                      <span className={`font-medium ${getPerformanceColor(dept.efficiency)}`}>
                        {dept.efficiency}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Goals:</span>
                      <span className={`font-medium ${getPerformanceColor(dept.goals)}`}>
                        {dept.goals}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Satisfaction:</span>
                      <span className={`font-medium ${getPerformanceColor(dept.satisfaction)}`}>
                        {dept.satisfaction}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Highlights</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Exceeding Targets</span>
                </div>
                <p className="text-sm text-green-700">
                  Revenue growth and employee productivity are significantly above targets, 
                  indicating strong operational momentum.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">On Track</span>
                </div>
                <p className="text-sm text-blue-700">
                  Customer satisfaction and quality scores remain consistently high, 
                  maintaining excellent service standards.
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Improvement Areas</span>
                </div>
                <p className="text-sm text-orange-700">
                  Order fulfillment times improved but still have room for optimization 
                  to achieve best-in-class performance.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recommended Actions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Capitalize on Sales Momentum</h4>
                <p className="text-sm text-gray-600">
                  With sales performing at 127% efficiency, consider expanding successful 
                  strategies to other regions and product lines.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Optimize Operations</h4>
                <p className="text-sm text-gray-600">
                  Focus on operational efficiency improvements to reduce fulfillment times 
                  and increase overall performance scores.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Employee Development</h4>
                <p className="text-sm text-gray-600">
                  Continue investing in employee training to maintain high productivity 
                  and satisfaction levels across all departments.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Technology Enhancement</h4>
                <p className="text-sm text-gray-600">
                  Leverage technology solutions to automate processes and improve 
                  measurement accuracy across key performance indicators.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;