import React, { useState } from 'react';
import { EnvelopeIcon, MegaphoneIcon, ChatBubbleLeftRightIcon, FolderIcon, SparklesIcon } from '@heroicons/react/24/outline';
import NewsletterManagement from './NewsletterManagement';
import MarketingCampaigns from './MarketingCampaigns';
import CustomerCommunications from './CustomerCommunications';
import ResourceLibrary from './ResourceLibrary';

interface TabInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  description: string;
}

const MarketingCommunications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  const tabs: TabInfo[] = [
    {
      id: 'campaigns',
      name: 'Marketing Campaigns',
      icon: <MegaphoneIcon className="h-5 w-5" />,
      component: <MarketingCampaigns />,
      description: 'Manage multi-channel marketing campaigns and track performance'
    },
    {
      id: 'newsletters',
      name: 'Newsletter Management',
      icon: <EnvelopeIcon className="h-5 w-5" />,
      component: <NewsletterManagement />,
      description: 'Create and manage customer newsletters and email campaigns'
    },
    {
      id: 'communications',
      name: 'Customer Communications',
      icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />,
      component: <CustomerCommunications />,
      description: 'Handle customer messages and support communications'
    },
    {
      id: 'resources',
      name: 'Resource Library',
      icon: <FolderIcon className="h-5 w-5" />,
      component: <ResourceLibrary />,
      description: 'Centralized repository for marketing materials and resources'
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

export default MarketingCommunications;