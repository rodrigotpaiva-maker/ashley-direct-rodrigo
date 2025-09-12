import React, { useState } from 'react';
import { EnvelopeIcon, UserGroupIcon, ChartBarIcon, CalendarIcon, PlusIcon, EyeIcon, ArrowPathIcon, TrashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipients: number;
  openRate?: number;
  clickRate?: number;
  scheduledDate?: string;
  sentDate?: string;
  createdDate: string;
  template: string;
}

interface NewsletterTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
}

const NewsletterManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('newsletters');
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample newsletter data
  const newsletters: Newsletter[] = [
    {
      id: '1',
      title: 'Fall Furniture Collection 2025',
      subject: 'Discover Our New Fall Furniture Collection - 20% Off',
      status: 'sent',
      recipients: 15420,
      openRate: 24.6,
      clickRate: 3.8,
      sentDate: '2025-09-01',
      createdDate: '2025-08-28',
      template: 'product-showcase'
    },
    {
      id: '2',
      title: 'Customer Success Stories',
      subject: 'See How Ashley Direct Transforms Business Spaces',
      status: 'scheduled',
      recipients: 18750,
      scheduledDate: '2025-09-15',
      createdDate: '2025-09-10',
      template: 'testimonial-focus'
    },
    {
      id: '3',
      title: 'Monthly Industry Insights',
      subject: 'Furniture Industry Trends & Business Tips',
      status: 'draft',
      recipients: 0,
      createdDate: '2025-09-11',
      template: 'content-newsletter'
    },
    {
      id: '4',
      title: 'End of Quarter Sale',
      subject: 'Last Chance: Up to 40% Off Office Furniture',
      status: 'sent',
      recipients: 22300,
      openRate: 31.2,
      clickRate: 5.7,
      sentDate: '2025-06-28',
      createdDate: '2025-06-25',
      template: 'promotional'
    },
    {
      id: '5',
      title: 'New Partnership Announcement',
      subject: 'Exciting News: Ashley Direct Partners with Green Design Co.',
      status: 'draft',
      recipients: 0,
      createdDate: '2025-09-12',
      template: 'announcement'
    }
  ];

  // Sample newsletter templates
  const templates: NewsletterTemplate[] = [
    {
      id: 'product-showcase',
      name: 'Product Showcase',
      description: 'Feature new products with high-quality images',
      thumbnail: '/images/templates/product-showcase.jpg',
      category: 'Product'
    },
    {
      id: 'promotional',
      name: 'Promotional Campaign',
      description: 'Sales and special offers template',
      thumbnail: '/images/templates/promotional.jpg',
      category: 'Sales'
    },
    {
      id: 'content-newsletter',
      name: 'Content Newsletter',
      description: 'Industry insights and educational content',
      thumbnail: '/images/templates/content-newsletter.jpg',
      category: 'Content'
    },
    {
      id: 'testimonial-focus',
      name: 'Customer Stories',
      description: 'Highlight customer success stories',
      thumbnail: '/images/templates/testimonial.jpg',
      category: 'Social Proof'
    },
    {
      id: 'announcement',
      name: 'Company Announcement',
      description: 'Important company news and updates',
      thumbnail: '/images/templates/announcement.jpg',
      category: 'News'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'scheduled':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'draft':
        return 'text-gray-700 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const duplicateNewsletter = (newsletter: Newsletter) => {
    alert(`Newsletter "${newsletter.title}" duplicated successfully!`);
  };

  const deleteNewsletter = (id: string) => {
    if (window.confirm('Are you sure you want to delete this newsletter?')) {
      alert('Newsletter deleted successfully!');
    }
  };

  const sendTestEmail = (newsletter: Newsletter) => {
    alert(`Test email sent for "${newsletter.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter Management</h1>
          <p className="text-gray-600">Create and manage customer newsletters and campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('newsletters')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'newsletters'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            My Newsletters
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'templates'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Create Newsletter
          </button>
        </div>
      </div>

      {activeTab === 'newsletters' ? (
        /* Newsletter List */
        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <div key={newsletter.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{newsletter.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(newsletter.status)}`}>
                      {newsletter.status.charAt(0).toUpperCase() + newsletter.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{newsletter.subject}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <UserGroupIcon className="h-4 w-4" />
                      <span>{newsletter.recipients.toLocaleString()} recipients</span>
                    </div>
                    
                    {newsletter.openRate && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <EyeIcon className="h-4 w-4" />
                        <span>{newsletter.openRate}% open rate</span>
                      </div>
                    )}
                    
                    {newsletter.clickRate && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <ChartBarIcon className="h-4 w-4" />
                        <span>{newsletter.clickRate}% click rate</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="h-4 w-4" />
                      <span>
                        {newsletter.sentDate
                          ? `Sent ${newsletter.sentDate}`
                          : newsletter.scheduledDate
                          ? `Scheduled ${newsletter.scheduledDate}`
                          : `Created ${newsletter.createdDate}`
                        }
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => alert('Opening newsletter editor...')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium p-2 rounded hover:bg-blue-50 transition-colors duration-200"
                    title="Edit"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  
                  {newsletter.status === 'draft' && (
                    <button
                      onClick={() => sendTestEmail(newsletter)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium p-2 rounded hover:bg-green-50 transition-colors duration-200"
                      title="Send Test"
                    >
                      <EnvelopeIcon className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => duplicateNewsletter(newsletter)}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium p-2 rounded hover:bg-purple-50 transition-colors duration-200"
                    title="Duplicate"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => deleteNewsletter(newsletter.id)}
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
      ) : (
        /* Templates */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <EnvelopeIcon className="h-16 w-16 text-blue-400" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Newsletter Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create New Newsletter</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter newsletter title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Subject</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email subject line"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient List</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all-customers">All Customers (15,420)</option>
                  <option value="active-customers">Active Customers (8,750)</option>
                  <option value="premium-customers">Premium Customers (2,340)</option>
                  <option value="newsletter-subscribers">Newsletter Subscribers (12,890)</option>
                </select>
              </div>
            </form>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  alert('Newsletter created and saved as draft!');
                  setShowCreateModal(false);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Save as Draft
              </button>
              <button
                onClick={() => {
                  alert('Newsletter created and scheduled!');
                  setShowCreateModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Create & Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterManagement;