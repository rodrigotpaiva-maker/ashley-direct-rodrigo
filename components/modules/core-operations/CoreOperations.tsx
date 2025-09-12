import React, { useState } from 'react';
import { 
  HomeIcon, 
  UserGroupIcon, 
  CogIcon, 
  KeyIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface CoreOperationsProps {
  className?: string;
}

const CoreOperations: React.FC<CoreOperationsProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('workbench');

  const operationSections = [
    {
      id: 'workbench',
      name: 'Workbench',
      icon: HomeIcon,
      description: 'Unified workspace for daily operations',
      features: ['Quick Actions', 'Recent Activity', 'Task Management', 'Notifications']
    },
    {
      id: 'account',
      name: 'Account Management',
      icon: UserGroupIcon,
      description: 'Account selection and profile management',
      features: ['Multi-Account Selection', 'Profile Settings', 'Account Switching', 'User Preferences']
    },
    {
      id: 'security',
      name: 'Security Settings',
      icon: KeyIcon,
      description: 'Password and security management',
      features: ['Change Password', 'Security Settings', 'Session Management', 'Access Logs']
    },
    {
      id: 'calendar',
      name: 'Business Calendar',
      icon: CalendarIcon,
      description: 'Operational scheduling and planning',
      features: ['Event Scheduling', 'Delivery Planning', 'Meeting Management', 'Reminders']
    },
    {
      id: 'contacts',
      name: 'Contacts',
      icon: PhoneIcon,
      description: 'Relationship and contact management',
      features: ['Contact Directory', 'Relationship Tracking', 'Communication History', 'Contact Groups']
    },
    {
      id: 'territories',
      name: 'Territory Management',
      icon: MapPinIcon,
      description: 'Zip codes and territory settings',
      features: ['Zip Code Management', 'Territory Mapping', 'Service Areas', 'Delivery Zones']
    },
    {
      id: 'dealer-locator',
      name: 'Dealer Locator',
      icon: MagnifyingGlassIcon,
      description: 'Network discovery and partnerships',
      features: ['Dealer Search', 'Network Directory', 'Partnership Opportunities', 'Location Mapping']
    }
  ];

  const quickActions = [
    { name: 'Create Order', icon: DocumentTextIcon, color: 'bg-blue-600' },
    { name: 'Check Inventory', icon: ChartBarIcon, color: 'bg-green-600' },
    { name: 'View Reports', icon: DocumentTextIcon, color: 'bg-purple-600' },
    { name: 'Manage Account', icon: CogIcon, color: 'bg-orange-600' }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ashley Direct Operations Center</h1>
            <p className="text-gray-600 mt-1">Comprehensive platform for furniture dealers and distributors</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome back</p>
              <p className="font-semibold text-gray-900">Dealer Administrator</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">DA</span>
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
                className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-700">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Operations Modules</h3>
          <nav className="space-y-2">
            {operationSections.map((section) => {
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
                  <span className="font-medium">{section.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Section Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {operationSections
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
                          className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
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

      {/* Platform Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
            <p className="text-sm font-medium text-green-800">All Systems Operational</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">99.9%</div>
            <p className="text-sm text-blue-800">Platform Uptime</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">24/7</div>
            <p className="text-sm text-purple-800">Support Available</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-600">2.4s</div>
            <p className="text-sm text-orange-800">Avg Response Time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreOperations;