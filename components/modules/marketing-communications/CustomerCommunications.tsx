import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, InboxIcon, PaperAirplaneIcon, UserIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, FunnelIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

interface CustomerMessage {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'inquiry' | 'support' | 'complaint' | 'feedback' | 'order';
  timestamp: string;
  assignedTo?: string;
  tags: string[];
}

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
}

const CustomerCommunications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState<CustomerMessage | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample customer messages
  const customerMessages: CustomerMessage[] = [
    {
      id: '1',
      customerId: 'CUST-001',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@techstartup.com',
      subject: 'Urgent: Office Furniture Delivery Delay',
      message: 'Hi, we have a critical situation. Our new office opening is scheduled for next Monday, but we haven\'t received our furniture order (#ORD-2024-1234). Can you please provide an immediate update on the delivery status?',
      status: 'unread',
      priority: 'urgent',
      category: 'order',
      timestamp: '2025-09-12T14:30:00',
      tags: ['delivery', 'urgent', 'office-opening']
    },
    {
      id: '2',
      customerId: 'CUST-002',
      customerName: 'Mike Chen',
      customerEmail: 'mike.chen@designstudio.com',
      subject: 'Custom Furniture Quote Request',
      message: 'Hello! I\'m looking for a custom conference table for our design studio. We need seating for 12 people with built-in cable management and a modern aesthetic. Could you provide a quote and timeline?',
      status: 'read',
      priority: 'medium',
      category: 'inquiry',
      timestamp: '2025-09-12T11:15:00',
      assignedTo: 'John Smith',
      tags: ['custom', 'quote', 'conference-table']
    },
    {
      id: '3',
      customerId: 'CUST-003',
      customerName: 'Lisa Wang',
      customerEmail: 'lisa@lawfirm.com',
      subject: 'Quality Issue with Recent Purchase',
      message: 'I recently purchased 6 executive chairs (Order #ORD-2024-1156) and one of them has a defective hydraulic mechanism. The chair won\'t stay at the adjusted height. Please advise on how to proceed with a replacement.',
      status: 'replied',
      priority: 'high',
      category: 'complaint',
      timestamp: '2025-09-12T09:45:00',
      assignedTo: 'Emma Davis',
      tags: ['defective', 'replacement', 'executive-chairs']
    },
    {
      id: '4',
      customerId: 'CUST-004',
      customerName: 'David Brown',
      customerEmail: 'david@consultingfirm.com',
      subject: 'Fantastic Service Experience!',
      message: 'I wanted to reach out and commend your team for the exceptional service we received. The delivery was on time, the setup was professional, and the furniture quality exceeded our expectations. Will definitely recommend Ashley Direct to other businesses!',
      status: 'read',
      priority: 'low',
      category: 'feedback',
      timestamp: '2025-09-11T16:20:00',
      assignedTo: 'Sarah Wilson',
      tags: ['positive', 'testimonial', 'delivery']
    },
    {
      id: '5',
      customerId: 'CUST-005',
      customerName: 'Jennifer Adams',
      customerEmail: 'jadams@healthcare.org',
      subject: 'Bulk Order Pricing Inquiry',
      message: 'We\'re expanding our healthcare facility and need furniture for 50+ workstations. Can you provide volume pricing for ergonomic office chairs and height-adjustable desks? We\'re looking to make the purchase within the next 60 days.',
      status: 'unread',
      priority: 'high',
      category: 'inquiry',
      timestamp: '2025-09-11T13:10:00',
      tags: ['bulk-order', 'healthcare', 'workstations']
    }
  ];

  // Message templates
  const messageTemplates: MessageTemplate[] = [
    {
      id: 'delivery-update',
      name: 'Delivery Update',
      subject: 'Update on Your Furniture Delivery',
      content: 'Dear {customer_name},\n\nThank you for your inquiry regarding your order #{order_number}. I wanted to provide you with an update on your delivery status...\n\nBest regards,\nAshley Direct Customer Service',
      category: 'Order Updates'
    },
    {
      id: 'quote-response',
      name: 'Quote Response',
      subject: 'Your Custom Furniture Quote',
      content: 'Dear {customer_name},\n\nThank you for your interest in our custom furniture solutions. Based on your requirements, I\'ve prepared a detailed quote for you...\n\nBest regards,\nAshley Direct Sales Team',
      category: 'Sales'
    },
    {
      id: 'quality-concern',
      name: 'Quality Concern Resolution',
      subject: 'Resolution for Your Product Concern',
      content: 'Dear {customer_name},\n\nI sincerely apologize for the quality issue you experienced with your recent purchase. We take product quality very seriously...\n\nBest regards,\nAshley Direct Quality Assurance',
      category: 'Support'
    },
    {
      id: 'thank-you',
      name: 'Thank You Message',
      subject: 'Thank You for Your Feedback!',
      content: 'Dear {customer_name},\n\nThank you so much for taking the time to share your positive experience with us. Your feedback means the world to our team...\n\nBest regards,\nAshley Direct Team',
      category: 'Appreciation'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-700 bg-green-50 border-green-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <ExclamationTriangleIcon className="h-4 w-4 text-blue-600" />;
      case 'read':
        return <CheckCircleIcon className="h-4 w-4 text-gray-600" />;
      case 'replied':
        return <PaperAirplaneIcon className="h-4 w-4 text-green-600" />;
      case 'archived':
        return <ArchiveBoxIcon className="h-4 w-4 text-gray-400" />;
      default:
        return <InboxIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredMessages = customerMessages.filter(message => {
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || message.priority === filterPriority;
    const matchesSearch = searchTerm === '' || 
      message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const markAsRead = (messageId: string) => {
    alert('Message marked as read!');
  };

  const archiveMessage = (messageId: string) => {
    alert('Message archived!');
  };

  const assignMessage = (messageId: string, assignTo: string) => {
    alert(`Message assigned to ${assignTo}!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Communications</h1>
          <p className="text-gray-600">Manage customer messages and communications</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComposeModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
            Compose Message
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages, customers, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Unread', count: customerMessages.filter(m => m.status === 'unread').length, color: 'text-blue-600' },
          { label: 'Urgent', count: customerMessages.filter(m => m.priority === 'urgent').length, color: 'text-red-600' },
          { label: 'Replied Today', count: customerMessages.filter(m => m.status === 'replied' && new Date(m.timestamp).toDateString() === new Date().toDateString()).length, color: 'text-green-600' },
          { label: 'Total Messages', count: customerMessages.length, color: 'text-gray-600' }
        ].map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              </div>
              <ChatBubbleLeftRightIcon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Messages List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages ({filteredMessages.length})</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredMessages.map((message) => (
            <div key={message.id} className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
              message.status === 'unread' ? 'bg-blue-50' : ''
            }`} onClick={() => setSelectedMessage(message)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(message.status)}
                      <UserIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <h3 className={`font-medium ${message.status === 'unread' ? 'text-gray-900 font-semibold' : 'text-gray-800'}`}>
                        {message.customerName}
                      </h3>
                      <p className="text-xs text-gray-500">{message.customerEmail}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(message.priority)}`}>
                      {message.priority.toUpperCase()}
                    </span>
                  </div>
                  <h4 className={`text-sm mb-2 ${message.status === 'unread' ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                    {message.subject}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                    {message.assignedTo && (
                      <div>Assigned to: {message.assignedTo}</div>
                    )}
                    <div className="flex gap-1">
                      {message.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {message.status === 'unread' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(message.id);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                      title="Mark as Read"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMessage(message);
                      setShowReplyModal(true);
                    }}
                    className="text-green-600 hover:text-green-800 text-sm p-1 rounded hover:bg-green-50 transition-colors duration-200"
                    title="Reply"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      archiveMessage(message.id);
                    }}
                    className="text-gray-600 hover:text-gray-800 text-sm p-1 rounded hover:bg-gray-50 transition-colors duration-200"
                    title="Archive"
                  >
                    <ArchiveBoxIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Reply to {selectedMessage.customerName}</h2>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ×
              </button>
            </div>
            
            {/* Original Message */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Original Message:</h3>
              <p className="text-sm text-gray-700 mb-2">{selectedMessage.subject}</p>
              <p className="text-sm text-gray-600">{selectedMessage.message}</p>
            </div>
            
            {/* Templates */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Use Template (Optional)</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select a template...</option>
                {messageTemplates.map(template => (
                  <option key={template.id} value={template.id}>{template.name}</option>
                ))}
              </select>
            </div>
            
            {/* Reply Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  defaultValue={`Re: ${selectedMessage.subject}`}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your reply here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Team Member</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Keep unassigned</option>
                  <option value="John Smith">John Smith</option>
                  <option value="Emma Davis">Emma Davis</option>
                  <option value="Sarah Wilson">Sarah Wilson</option>
                </select>
              </div>
            </form>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  alert('Reply sent successfully!');
                  setShowReplyModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Send Reply
              </button>
              <button
                onClick={() => {
                  alert('Draft saved!');
                  setShowReplyModal(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Save Draft
              </button>
              <button
                onClick={() => setShowReplyModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Compose New Message</h2>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <input
                  type="text"
                  placeholder="Enter customer email addresses..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Enter subject line..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={6}
                  placeholder="Type your message here..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  alert('Message sent successfully!');
                  setShowComposeModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Send Message
              </button>
              <button
                onClick={() => setShowComposeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCommunications;