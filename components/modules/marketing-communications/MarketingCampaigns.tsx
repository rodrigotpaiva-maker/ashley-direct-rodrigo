import React, { useState } from 'react';
import { MegaphoneIcon, UserGroupIcon, CalendarIcon, ChartBarIcon, EyeIcon, PlayIcon, PauseIcon, StopIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'display' | 'retargeting';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  audience: string;
  impressions?: number;
  clicks?: number;
  conversions?: number;
  ctr?: number;
  conversionRate?: number;
}

interface CampaignTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  estimatedBudget: string;
  duration: string;
}

const MarketingCampaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Sample campaign data
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Fall Office Furniture Sale',
      type: 'email',
      status: 'active',
      budget: 15000,
      spent: 8420,
      startDate: '2025-09-01',
      endDate: '2025-09-30',
      audience: 'Business Customers',
      impressions: 145000,
      clicks: 3480,
      conversions: 124,
      ctr: 2.4,
      conversionRate: 3.6
    },
    {
      id: '2',
      name: 'New Product Launch - Ergonomic Chairs',
      type: 'social',
      status: 'active',
      budget: 25000,
      spent: 12750,
      startDate: '2025-08-15',
      endDate: '2025-10-15',
      audience: 'All Customers',
      impressions: 284000,
      clicks: 5670,
      conversions: 187,
      ctr: 2.0,
      conversionRate: 3.3
    },
    {
      id: '3',
      name: 'Retargeting - Abandoned Cart',
      type: 'retargeting',
      status: 'active',
      budget: 8000,
      spent: 3240,
      startDate: '2025-09-05',
      endDate: '2025-10-05',
      audience: 'Cart Abandoners',
      impressions: 67000,
      clicks: 2010,
      conversions: 89,
      ctr: 3.0,
      conversionRate: 4.4
    },
    {
      id: '4',
      name: 'Holiday Workspace Solutions',
      type: 'display',
      status: 'paused',
      budget: 20000,
      spent: 5600,
      startDate: '2025-09-10',
      endDate: '2025-12-15',
      audience: 'Enterprise Customers',
      impressions: 89000,
      clicks: 1780,
      conversions: 45,
      ctr: 2.0,
      conversionRate: 2.5
    },
    {
      id: '5',
      name: 'Customer Loyalty Program',
      type: 'email',
      status: 'completed',
      budget: 10000,
      spent: 9800,
      startDate: '2025-07-01',
      endDate: '2025-08-31',
      audience: 'Existing Customers',
      impressions: 125000,
      clicks: 4250,
      conversions: 156,
      ctr: 3.4,
      conversionRate: 3.7
    },
    {
      id: '6',
      name: 'Q4 Brand Awareness Campaign',
      type: 'social',
      status: 'draft',
      budget: 30000,
      spent: 0,
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      audience: 'Potential Customers'
    }
  ];

  // Campaign templates
  const campaignTemplates: CampaignTemplate[] = [
    {
      id: 'product-launch',
      name: 'Product Launch Campaign',
      type: 'Multi-channel',
      description: 'Comprehensive campaign for new product introductions',
      estimatedBudget: '$15,000 - $25,000',
      duration: '6-8 weeks'
    },
    {
      id: 'seasonal-sale',
      name: 'Seasonal Sales Campaign',
      type: 'Email + Social',
      description: 'Drive sales during seasonal peaks and holidays',
      estimatedBudget: '$8,000 - $15,000',
      duration: '3-4 weeks'
    },
    {
      id: 'retention-campaign',
      name: 'Customer Retention',
      type: 'Email',
      description: 'Re-engage inactive customers and increase loyalty',
      estimatedBudget: '$5,000 - $10,000',
      duration: '4-6 weeks'
    },
    {
      id: 'lead-generation',
      name: 'Lead Generation Campaign',
      type: 'Display + Social',
      description: 'Attract and convert new potential customers',
      estimatedBudget: '$12,000 - $20,000',
      duration: '8-12 weeks'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'paused':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'completed':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'draft':
        return 'text-gray-700 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'text-blue-700 bg-blue-100';
      case 'social':
        return 'text-purple-700 bg-purple-100';
      case 'display':
        return 'text-green-700 bg-green-100';
      case 'retargeting':
        return 'text-orange-700 bg-orange-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getROI = (campaign: Campaign) => {
    if (!campaign.conversions || campaign.spent === 0) return 0;
    const avgOrderValue = 1500; // Average order value for furniture
    const revenue = campaign.conversions * avgOrderValue;
    return ((revenue - campaign.spent) / campaign.spent) * 100;
  };

  const pauseCampaign = (id: string) => {
    alert('Campaign paused successfully!');
  };

  const resumeCampaign = (id: string) => {
    alert('Campaign resumed successfully!');
  };

  const stopCampaign = (id: string) => {
    if (window.confirm('Are you sure you want to stop this campaign? This action cannot be undone.')) {
      alert('Campaign stopped successfully!');
    }
  };

  const deleteCampaign = (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      alert('Campaign deleted successfully!');
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    switch (activeTab) {
      case 'active':
        return campaign.status === 'active';
      case 'paused':
        return campaign.status === 'paused';
      case 'completed':
        return campaign.status === 'completed';
      case 'draft':
        return campaign.status === 'draft';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
          <p className="text-gray-600">Manage and track marketing campaigns across all channels</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Create Campaign
        </button>
      </div>

      {/* Campaign Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['active', 'paused', 'completed', 'draft'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 text-sm font-medium capitalize border-b-2 transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab} ({campaigns.filter(c => c.status === tab).length})
            </button>
          ))}
        </nav>
      </div>

      {/* Campaign Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
            </div>
            <MegaphoneIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">
                ${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}
              </p>
            </div>
            <CalendarIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0)}
              </p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(campaign.type)}`}>
                    {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-medium text-gray-900">${campaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Spent</p>
                    <p className="text-sm font-medium text-gray-900">${campaign.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-900">
                      {campaign.startDate} to {campaign.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Audience</p>
                    <p className="text-sm font-medium text-gray-900">{campaign.audience}</p>
                  </div>
                  {campaign.conversions && (
                    <div>
                      <p className="text-xs text-gray-500">Conversions</p>
                      <p className="text-sm font-medium text-gray-900">{campaign.conversions}</p>
                    </div>
                  )}
                  {campaign.conversions && (
                    <div>
                      <p className="text-xs text-gray-500">ROI</p>
                      <p className={`text-sm font-medium ${
                        getROI(campaign) > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {getROI(campaign).toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>
                
                {campaign.impressions && (
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-gray-600">
                      Impressions: <span className="font-medium text-gray-900">{campaign.impressions.toLocaleString()}</span>
                    </div>
                    <div className="text-gray-600">
                      Clicks: <span className="font-medium text-gray-900">{campaign.clicks?.toLocaleString()}</span>
                    </div>
                    <div className="text-gray-600">
                      CTR: <span className="font-medium text-gray-900">{campaign.ctr}%</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => alert('Opening campaign analytics...')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium p-2 rounded hover:bg-blue-50 transition-colors duration-200"
                  title="View Analytics"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => alert('Opening campaign editor...')}
                  className="text-green-600 hover:text-green-800 text-sm font-medium p-2 rounded hover:bg-green-50 transition-colors duration-200"
                  title="Edit"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                
                {campaign.status === 'active' && (
                  <button
                    onClick={() => pauseCampaign(campaign.id)}
                    className="text-yellow-600 hover:text-yellow-800 text-sm font-medium p-2 rounded hover:bg-yellow-50 transition-colors duration-200"
                    title="Pause"
                  >
                    <PauseIcon className="h-4 w-4" />
                  </button>
                )}
                
                {campaign.status === 'paused' && (
                  <button
                    onClick={() => resumeCampaign(campaign.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium p-2 rounded hover:bg-green-50 transition-colors duration-200"
                    title="Resume"
                  >
                    <PlayIcon className="h-4 w-4" />
                  </button>
                )}
                
                {(campaign.status === 'active' || campaign.status === 'paused') && (
                  <button
                    onClick={() => stopCampaign(campaign.id)}
                    className="text-orange-600 hover:text-orange-800 text-sm font-medium p-2 rounded hover:bg-orange-50 transition-colors duration-200"
                    title="Stop"
                  >
                    <StopIcon className="h-4 w-4" />
                  </button>
                )}
                
                <button
                  onClick={() => deleteCampaign(campaign.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium p-2 rounded hover:bg-red-50 transition-colors duration-200"
                  title="Delete"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create New Campaign</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaignTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors duration-200">
                  <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>Type: {template.type}</p>
                    <p>Budget: {template.estimatedBudget}</p>
                    <p>Duration: {template.duration}</p>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Creating campaign using ${template.name} template...`);
                      setShowCreateModal(false);
                    }}
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Use This Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingCampaigns;