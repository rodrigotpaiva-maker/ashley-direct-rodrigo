import React, { useState } from 'react';
import { 
  HomeIcon,
  Cog6ToothIcon,
  ClockIcon,
  BellIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  TruckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface WorkbenchProps {
  className?: string;
}

const Workbench: React.FC<WorkbenchProps> = ({ className = '' }) => {
  const [activeWidget, setActiveWidget] = useState('tasks');

  const workspaceWidgets = [
    {
      id: 'tasks',
      name: 'Task Management',
      icon: CheckCircleIcon,
      count: 8
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: BellIcon,
      count: 12
    },
    {
      id: 'recent',
      name: 'Recent Activity',
      icon: ClockIcon,
      count: 15
    },
    {
      id: 'shortcuts',
      name: 'Quick Actions',
      icon: HomeIcon,
      count: 6
    }
  ];

  const dailyTasks = [
    {
      id: 1,
      title: 'Review pending orders',
      description: 'Check and approve 15 pending orders from dealers',
      priority: 'high',
      due: '9:00 AM',
      completed: false,
      category: 'orders'
    },
    {
      id: 2,
      title: 'Update inventory levels',
      description: 'Sync inventory data for Ashley Sofa Collection',
      priority: 'medium',
      due: '11:30 AM',
      completed: true,
      category: 'inventory'
    },
    {
      id: 3,
      title: 'Process credit applications',
      description: 'Review 8 new dealer credit applications',
      priority: 'high',
      due: '2:00 PM',
      completed: false,
      category: 'finance'
    },
    {
      id: 4,
      title: 'Delivery coordination meeting',
      description: 'Weekly logistics coordination with warehouse team',
      priority: 'medium',
      due: '3:30 PM',
      completed: false,
      category: 'logistics'
    },
    {
      id: 5,
      title: 'Generate weekly reports',
      description: 'Compile sales and performance metrics for management',
      priority: 'low',
      due: '5:00 PM',
      completed: false,
      category: 'reports'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'New order received',
      message: 'Order #ORD-2024-5847 from Premier Furniture Store',
      time: '5 minutes ago',
      priority: 'info',
      read: false
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment overdue',
      message: 'Invoice #INV-2024-1085 is 15 days overdue',
      time: '1 hour ago',
      priority: 'warning',
      read: false
    },
    {
      id: 3,
      type: 'inventory',
      title: 'Low inventory alert',
      message: 'Ashley Recliner #ASH-RC-2401 has only 3 units remaining',
      time: '2 hours ago',
      priority: 'error',
      read: true
    },
    {
      id: 4,
      type: 'system',
      title: 'System maintenance scheduled',
      message: 'Platform maintenance on Sunday 2:00 AM - 4:00 AM EST',
      time: '1 day ago',
      priority: 'info',
      read: true
    }
  ];

  const quickActions = [
    {
      name: 'Create Order',
      description: 'Start new furniture order',
      icon: ShoppingCartIcon,
      color: 'bg-blue-600',
      action: 'orders/create'
    },
    {
      name: 'Track Delivery',
      description: 'Monitor shipment status',
      icon: TruckIcon,
      color: 'bg-green-600',
      action: 'deliveries/track'
    },
    {
      name: 'Process Payment',
      description: 'Handle financial transactions',
      icon: CurrencyDollarIcon,
      color: 'bg-purple-600',
      action: 'payments/process'
    },
    {
      name: 'View Analytics',
      description: 'Access performance reports',
      icon: ChartBarIcon,
      color: 'bg-orange-600',
      action: 'analytics/dashboard'
    },
    {
      name: 'Manage Dealers',
      description: 'Dealer relationship management',
      icon: UserGroupIcon,
      color: 'bg-red-600',
      action: 'dealers/manage'
    },
    {
      name: 'Product Catalog',
      description: 'Browse furniture collections',
      icon: DocumentTextIcon,
      color: 'bg-indigo-600',
      action: 'products/catalog'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingCartIcon;
      case 'payment': return CurrencyDollarIcon;
      case 'inventory': return ExclamationTriangleIcon;
      case 'system': return InformationCircleIcon;
      default: return BellIcon;
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'error': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Workbench Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ashley Direct Workbench</h1>
            <p className="text-gray-600 mt-1">Unified workspace for daily operations and task management</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Cog6ToothIcon className="w-4 h-4" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      </div>

      {/* Widget Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4">
          {workspaceWidgets.map((widget) => {
            const IconComponent = widget.icon;
            return (
              <button
                key={widget.id}
                onClick={() => setActiveWidget(widget.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  activeWidget === widget.id
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{widget.name}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {widget.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Widget Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Widget Area */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeWidget === 'tasks' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Tasks</h3>
              <div className="space-y-3">
                {dailyTasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                      readOnly
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${
                          task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            getPriorityColor(task.priority)
                          }`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">{task.due}</span>
                        </div>
                      </div>
                      <p className={`text-sm ${
                        task.completed ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeWidget === 'notifications' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div key={notification.id} className={`p-4 border rounded-lg ${
                      notification.read ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          getNotificationColor(notification.priority)
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            {!notification.read && (
                              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeWidget === 'shortcuts' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{action.name}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tasks Completed</span>
                <span className="font-semibold text-green-600">5/8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Orders Processed</span>
                <span className="font-semibold text-blue-600">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenue Generated</span>
                <span className="font-semibold text-green-600">$45,230</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Dealers</span>
                <span className="font-semibold text-purple-600">147</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Platform</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-yellow-600">Slow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workbench;