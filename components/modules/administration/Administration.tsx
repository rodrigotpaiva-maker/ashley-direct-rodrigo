import React, { useState } from 'react';
import { UserGroupIcon, Cog6ToothIcon, DocumentCheckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import UserManagement from './UserManagement';
import SystemSettings from './SystemSettings';
import ComplianceAudit from './ComplianceAudit';

interface TabInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  description: string;
}

const Administration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs: TabInfo[] = [
    {
      id: 'users',
      name: 'User Management',
      icon: <UserGroupIcon className="h-5 w-5" />,
      component: <UserManagement />,
      description: 'Manage users, roles, and permissions across the system'
    },
    {
      id: 'settings',
      name: 'System Settings',
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      component: <SystemSettings />,
      description: 'Configure system-wide settings and monitor health'
    },
    {
      id: 'compliance',
      name: 'Compliance & Audit',
      icon: <DocumentCheckIcon className="h-5 w-5" />,
      component: <ComplianceAudit />,
      description: 'Monitor compliance status and audit system activities'
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Description */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm text-blue-700">
            {currentTab?.description}
          </p>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab?.component}
      </div>
    </div>
  );
};

export default Administration;