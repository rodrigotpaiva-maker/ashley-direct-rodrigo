import React, { useState } from 'react';
import { 
  HomeIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  BellIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface HomePageProps {
  className?: string;
}

const HomePage: React.FC<HomePageProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const dashboardStats = [
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: ShoppingCartIcon,
      color: 'blue'
    },
    {
      title: 'Revenue (YTD)',
      value: '$2.1M',
      change: '+8.3%',
      changeType: 'increase',
      icon: CurrencyDollarIcon,
      color: 'green'
    },
    {
      title: 'Active Products',
      value: '3,842',
      change: '+156',
      changeType: 'increase',
      icon: DocumentTextIcon,
      color: 'purple'
    },
    {
      title: 'Pending Deliveries',
      value: '89',
      change: '-15',
      changeType: 'decrease',
      icon: TruckIcon,
      color: 'orange'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'order',
      title: 'New order #ORD-2024-5847',
      description: 'Ashley Sofa Set - Living Room Collection',
      time: '2 minutes ago',
      status: 'success',
      icon: CheckCircleIcon
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment processed',
      description: 'Invoice #INV-2024-1092 - $15,240.00',
      time: '15 minutes ago',
      status: 'success',
      icon: CurrencyDollarIcon
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Delivery scheduled',
      description: 'Order #ORD-2024-5831 - March 15, 2024',
      time: '1 hour ago',
      status: 'info',
      icon: TruckIcon
    },
    {
      id: 4,
      type: 'alert',
      title: 'Low inventory alert',
      description: 'Ashley Recliner #ASH-RC-2401 - 3 units remaining',
      time: '2 hours ago',
      status: 'warning',
      icon: ExclamationTriangleIcon
    }
  ];

  const quickLinks = [
    { name: 'Create Order', href: '/orders/create', icon: ShoppingCartIcon, color: 'bg-blue-600' },
    { name: 'Product Catalog', href: '/products', icon: DocumentTextIcon, color: 'bg-green-600' },
    { name: 'Order Tracking', href: '/orders/track', icon: TruckIcon, color: 'bg-purple-600' },
    { name: 'Financial Reports', href: '/reports/financial', icon: CurrencyDollarIcon, color: 'bg-orange-600' },
    { name: 'Customer Support', href: '/support', icon: UserGroupIcon, color: 'bg-red-600' },
    { name: 'Analytics Dashboard', href: '/analytics', icon: ChartBarIcon, color: 'bg-indigo-600' }
  ];

  const pendingTasks = [
    { id: 1, task: 'Review pending credit requests', priority: 'high', due: 'Today' },
    { id: 2, task: 'Approve new dealer applications', priority: 'medium', due: 'Tomorrow' },
    { id: 3, task: 'Update product pricing', priority: 'low', due: 'This week' },
    { id: 4, task: 'Process return requests', priority: 'high', due: 'Today' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Ashley Direct</h1>
            <p className="text-blue-100 text-lg">Your comprehensive B2B furniture platform</p>
            <p className="text-blue-200 text-sm mt-2">Today is {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <BellIcon className="w-8 h-8 text-blue-200" />
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <HomeIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">{link.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' :
                    activity.status === 'info' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      activity.status === 'success' ? 'text-green-600' :
                      activity.status === 'warning' ? 'text-yellow-600' :
                      activity.status === 'info' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
          <span className="text-sm text-gray-500">{pendingTasks.length} tasks pending</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pendingTasks.map((task) => (
            <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">{task.task}</p>
              <p className="text-xs text-gray-500">Due: {task.due}</p>
              <button className="w-full mt-3 text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors">
                Complete Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;