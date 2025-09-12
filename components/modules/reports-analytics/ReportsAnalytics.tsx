import React, { useState } from 'react';
import { ChartBarIcon, DocumentChartBarIcon, PresentationChartLineIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline';
import BusinessIntelligenceDashboard from './BusinessIntelligenceDashboard';
import CustomReportBuilder from './CustomReportBuilder';
import DataVisualizationTools from './DataVisualizationTools';
import PerformanceMetricsDashboard from './PerformanceMetricsDashboard';
import ScheduledReports from './ScheduledReports';

interface TabInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  description: string;
}

const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs: TabInfo[] = [
    {
      id: 'dashboard',
      name: 'Business Intelligence',
      icon: <ChartBarIcon className="h-5 w-5" />,
      component: <BusinessIntelligenceDashboard />,
      description: 'Real-time insights and performance metrics'
    },
    {
      id: 'visualization',
      name: 'Data Visualization',
      icon: <PresentationChartLineIcon className="h-5 w-5" />,
      component: <DataVisualizationTools />,
      description: 'Interactive charts and visual analytics'
    },
    {
      id: 'performance',
      name: 'Performance Metrics',
      icon: <TrophyIcon className="h-5 w-5" />,
      component: <PerformanceMetricsDashboard />,
      description: 'Track KPIs and business goals'
    },
    {
      id: 'report-builder',
      name: 'Custom Reports',
      icon: <DocumentChartBarIcon className="h-5 w-5" />,
      component: <CustomReportBuilder />,
      description: 'Build and manage custom reports'
    },
    {
      id: 'scheduled',
      name: 'Scheduled Reports',
      icon: <ClockIcon className="h-5 w-5" />,
      component: <ScheduledReports />,
      description: 'Automate report generation'
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

export default ReportsAnalytics;