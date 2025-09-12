import React, { useState } from 'react';
import { 
  ShoppingCartIcon,
  PencilSquareIcon,
  MagnifyingGlassIcon,
  TruckIcon,
  DocumentTextIcon,
  CalendarIcon,
  CogIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface OrderManagementProps {
  className?: string;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const orderSections = [
    {
      id: 'overview',
      name: 'Order Overview',
      icon: ChartBarIcon,
      description: 'Dashboard and order analytics',
      features: ['Order Dashboard', 'Sales Analytics', 'Performance Metrics', 'Quick Actions']
    },
    {
      id: 'create-order',
      name: 'Create Orders',
      icon: ShoppingCartIcon,
      description: 'New order creation and management',
      features: ['Product Selection', 'Pricing Calculator', 'Order Configuration', 'Submit Orders']
    },
    {
      id: 'manage-orders',
      name: 'Manage Orders',
      icon: PencilSquareIcon,
      description: 'Modify and update existing orders',
      features: ['Order Modifications', 'Change Tracking', 'Approval Workflow', 'Order History']
    },
    {
      id: 'track-orders',
      name: 'Order Tracking',
      icon: MagnifyingGlassIcon,
      description: 'Monitor order status and progress',
      features: ['Order Status', 'Delivery Tracking', 'Progress Updates', 'Customer Notifications']
    },
    {
      id: 'delivery',
      name: 'Delivery Management',
      icon: TruckIcon,
      description: 'Logistics and delivery coordination',
      features: ['Delivery Status', 'Trip Summary', 'Route Planning', 'Delivery Windows']
    },
    {
      id: 'parts-orders',
      name: 'Parts & Components',
      icon: CogIcon,
      description: 'Parts ordering and tracking',
      features: ['Parts Catalog', 'Parts Orders', 'Component Tracking', 'Service Parts']
    }
  ];

  const orderStats = [
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: ShoppingCartIcon,
      color: 'blue'
    },
    {
      title: 'Pending Orders',
      value: '89',
      change: '+5',
      changeType: 'increase',
      icon: ClockIcon,
      color: 'yellow'
    },
    {
      title: 'In Production',
      value: '156',
      change: '+23',
      changeType: 'increase',
      icon: CogIcon,
      color: 'purple'
    },
    {
      title: 'Ready to Ship',
      value: '73',
      change: '+8',
      changeType: 'increase',
      icon: TruckIcon,
      color: 'green'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-5847',
      customer: 'Premier Furniture Store',
      status: 'In Production',
      total: '$15,240.00',
      date: '2024-03-12',
      priority: 'high'
    },
    {
      id: 'ORD-2024-5846',
      customer: 'Comfort Living Showroom',
      status: 'Ready to Ship',
      total: '$8,920.00',
      date: '2024-03-11',
      priority: 'medium'
    },
    {
      id: 'ORD-2024-5845',
      customer: 'Modern Living Solutions',
      status: 'Delivered',
      total: '$12,580.00',
      date: '2024-03-10',
      priority: 'low'
    },
    {
      id: 'ORD-2024-5844',
      customer: 'Luxury Furnishings LLC',
      status: 'Pending',
      total: '$22,100.00',
      date: '2024-03-09',
      priority: 'high'
    }
  ];

  const quickActions = [
    {
      name: 'Create New Order',
      description: 'Start a new furniture order',
      icon: ShoppingCartIcon,
      color: 'bg-blue-600',
      action: 'create-order'
    },
    {
      name: 'Track Delivery',
      description: 'Monitor shipment status',
      icon: TruckIcon,
      color: 'bg-green-600',
      action: 'track-delivery'
    },
    {
      name: 'Modify Order',
      description: 'Update existing orders',
      icon: PencilSquareIcon,
      color: 'bg-orange-600',
      action: 'modify-order'
    },
    {
      name: 'Parts Order',
      description: 'Order replacement parts',
      icon: CogIcon,
      color: 'bg-purple-600',
      action: 'parts-order'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in production': return 'bg-blue-100 text-blue-800';
      case 'ready to ship': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return ExclamationTriangleIcon;
      case 'medium': return ClockIcon;
      case 'low': return CheckCircleIcon;
      default: return ClockIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">Complete order lifecycle management and tracking</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Today's Orders</p>
              <p className="font-semibold text-gray-900">23 orders</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <ShoppingCartIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
                onClick={() => setActiveSection(action.action)}
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{action.name}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {orderStats.map((stat, index) => {
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
        {/* Section Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Management</h3>
          <nav className="space-y-2">
            {orderSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <div>
                    <span className="font-medium block">{section.name}</span>
                    <span className="text-xs text-gray-500">{section.description}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Section Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {orderSections
            .filter(section => section.id === activeSection)
            .map((section) => {
              const IconComponent = section.icon;
              return (
                <div key={section.id}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{section.name}</h3>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Available Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {section.features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                      Access {section.name}
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Orders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const PriorityIcon = getPriorityIcon(order.priority);
                return (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-blue-600">{order.id}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{order.customer}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getStatusColor(order.status)
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-green-600">{order.total}</td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                    <td className="py-3 px-4">
                      <PriorityIcon className={`w-4 h-4 ${getPriorityColor(order.priority)}`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;