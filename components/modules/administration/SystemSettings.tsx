import React, { useState } from 'react';
import { Cog6ToothIcon, ShieldCheckIcon, BellIcon, GlobeAltIcon, CircleStackIcon, KeyIcon, ClockIcon, DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  value: string | boolean | number;
  type: 'text' | 'boolean' | 'number' | 'select';
  options?: string[];
  lastModified: string;
  modifiedBy: string;
}

interface SystemHealth {
  component: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  lastCheck: string;
  details: string;
}

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  // System settings data
  const systemSettings: Record<string, SystemSetting[]> = {
    general: [
      {
        id: 'company_name',
        category: 'general',
        name: 'Company Name',
        description: 'The official company name displayed throughout the system',
        value: 'Ashley Direct',
        type: 'text',
        lastModified: '2025-09-01',
        modifiedBy: 'John Smith'
      },
      {
        id: 'timezone',
        category: 'general',
        name: 'System Timezone',
        description: 'Default timezone for all system operations',
        value: 'America/New_York',
        type: 'select',
        options: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'UTC'],
        lastModified: '2025-08-15',
        modifiedBy: 'Sarah Johnson'
      },
      {
        id: 'maintenance_mode',
        category: 'general',
        name: 'Maintenance Mode',
        description: 'Enable maintenance mode to prevent user access during updates',
        value: false,
        type: 'boolean',
        lastModified: '2025-09-10',
        modifiedBy: 'John Smith'
      },
      {
        id: 'session_timeout',
        category: 'general',
        name: 'Session Timeout (minutes)',
        description: 'Automatic logout time for inactive users',
        value: 60,
        type: 'number',
        lastModified: '2025-08-20',
        modifiedBy: 'Mike Chen'
      }
    ],
    security: [
      {
        id: 'password_min_length',
        category: 'security',
        name: 'Minimum Password Length',
        description: 'Minimum number of characters required for passwords',
        value: 8,
        type: 'number',
        lastModified: '2025-08-25',
        modifiedBy: 'John Smith'
      },
      {
        id: 'require_2fa',
        category: 'security',
        name: 'Require Two-Factor Authentication',
        description: 'Mandate 2FA for all user accounts',
        value: true,
        type: 'boolean',
        lastModified: '2025-09-05',
        modifiedBy: 'John Smith'
      },
      {
        id: 'login_attempts',
        category: 'security',
        name: 'Max Login Attempts',
        description: 'Number of failed login attempts before account lockout',
        value: 5,
        type: 'number',
        lastModified: '2025-08-30',
        modifiedBy: 'Sarah Johnson'
      },
      {
        id: 'password_expiry',
        category: 'security',
        name: 'Password Expiry (days)',
        description: 'Force password change after specified days',
        value: 90,
        type: 'number',
        lastModified: '2025-08-15',
        modifiedBy: 'John Smith'
      }
    ],
    notifications: [
      {
        id: 'email_notifications',
        category: 'notifications',
        name: 'Email Notifications',
        description: 'Enable system-wide email notifications',
        value: true,
        type: 'boolean',
        lastModified: '2025-09-01',
        modifiedBy: 'Lisa Wang'
      },
      {
        id: 'notification_frequency',
        category: 'notifications',
        name: 'Notification Frequency',
        description: 'How often to send digest notifications',
        value: 'daily',
        type: 'select',
        options: ['immediate', 'hourly', 'daily', 'weekly'],
        lastModified: '2025-08-28',
        modifiedBy: 'Lisa Wang'
      },
      {
        id: 'alert_threshold',
        category: 'notifications',
        name: 'System Alert Threshold',
        description: 'CPU/Memory usage percentage to trigger alerts',
        value: 85,
        type: 'number',
        lastModified: '2025-08-20',
        modifiedBy: 'Mike Chen'
      }
    ],
    integration: [
      {
        id: 'api_rate_limit',
        category: 'integration',
        name: 'API Rate Limit (requests/hour)',
        description: 'Maximum API requests per hour per user',
        value: 1000,
        type: 'number',
        lastModified: '2025-09-08',
        modifiedBy: 'John Smith'
      },
      {
        id: 'external_api_timeout',
        category: 'integration',
        name: 'External API Timeout (seconds)',
        description: 'Timeout for external API calls',
        value: 30,
        type: 'number',
        lastModified: '2025-08-25',
        modifiedBy: 'Mike Chen'
      },
      {
        id: 'webhook_retries',
        category: 'integration',
        name: 'Webhook Retry Attempts',
        description: 'Number of retry attempts for failed webhooks',
        value: 3,
        type: 'number',
        lastModified: '2025-09-01',
        modifiedBy: 'John Smith'
      }
    ]
  };

  // System health data
  const systemHealth: SystemHealth[] = [
    {
      component: 'Database',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '2025-09-12T14:30:00',
      details: 'All database connections are stable'
    },
    {
      component: 'Web Server',
      status: 'healthy',
      uptime: '99.8%',
      lastCheck: '2025-09-12T14:29:00',
      details: 'Server responding normally'
    },
    {
      component: 'File Storage',
      status: 'warning',
      uptime: '98.5%',
      lastCheck: '2025-09-12T14:28:00',
      details: 'Storage usage at 78% - consider cleanup'
    },
    {
      component: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      lastCheck: '2025-09-12T14:27:00',
      details: 'Email delivery functioning normally'
    },
    {
      component: 'Backup System',
      status: 'critical',
      uptime: '95.2%',
      lastCheck: '2025-09-12T14:26:00',
      details: 'Last backup failed - requires attention'
    }
  ];

  const tabs = [
    { id: 'general', name: 'General', icon: <Cog6ToothIcon className="h-5 w-5" /> },
    { id: 'security', name: 'Security', icon: <ShieldCheckIcon className="h-5 w-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <BellIcon className="h-5 w-5" /> },
    { id: 'integration', name: 'Integration', icon: <GlobeAltIcon className="h-5 w-5" /> },
    { id: 'health', name: 'System Health', icon: <CircleStackIcon className="h-5 w-5" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
      case 'critical':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleSettingChange = (settingId: string, newValue: any) => {
    setHasChanges(true);
    // In a real app, this would update the setting value
    console.log('Setting changed:', settingId, newValue);
  };

  const saveChanges = () => {
    alert('Settings saved successfully!');
    setHasChanges(false);
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to their default values?')) {
      alert('Settings reset to defaults!');
      setHasChanges(false);
    }
  };

  const renderSettingInput = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={setting.value as boolean}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        );
      case 'number':
        return (
          <input
            type="number"
            value={setting.value as number}
            onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
            className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      case 'select':
        return (
          <select
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-48 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {setting.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-64 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure system-wide settings and monitor health</p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && (
            <div className="flex items-center gap-2">
              <button
                onClick={resetToDefaults}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Reset to Defaults
              </button>
              <button
                onClick={saveChanges}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'health' ? (
        /* System Health Tab */
        <div className="space-y-6">
          {/* Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Status</p>
                  <p className="text-2xl font-bold text-green-600">Operational</p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Uptime</p>
                  <p className="text-2xl font-bold text-blue-600">99.2%</p>
                </div>
                <CircleStackIcon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Issues</p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
                <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Component Health */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Component Health</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {systemHealth.map((component, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(component.status)}
                      <div>
                        <h3 className="font-medium text-gray-900">{component.component}</h3>
                        <p className="text-sm text-gray-600">{component.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(component.status)}`}>
                        {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                      </span>
                      <div className="text-sm text-gray-600 mt-1">
                        Uptime: {component.uptime}
                      </div>
                      <div className="text-xs text-gray-500">
                        Last check: {new Date(component.lastCheck).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Settings Tabs */
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">{activeTab} Settings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {systemSettings[activeTab]?.map((setting) => (
              <div key={setting.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{setting.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{setting.description}</p>
                    <div className="text-xs text-gray-500">
                      Last modified: {setting.lastModified} by {setting.modifiedBy}
                    </div>
                  </div>
                  <div className="ml-6">
                    {renderSettingInput(setting)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning Banner */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Unsaved Changes</h3>
              <p className="text-sm text-yellow-700">
                You have unsaved changes. Please save your changes before navigating away.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;