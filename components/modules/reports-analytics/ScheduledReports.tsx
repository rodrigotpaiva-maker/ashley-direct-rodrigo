import React, { useState } from 'react';
import { ClockIcon, CalendarIcon, EnvelopeIcon, DocumentArrowDownIcon, PauseIcon, PlayIcon, XMarkIcon, PlusIcon, Cog6ToothIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ScheduledReport {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  nextRun: string;
  lastRun?: string;
  status: 'active' | 'paused' | 'error';
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv';
  reportType: string;
  createdBy: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedRuntime: string;
}

const ScheduledReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ScheduledReport | null>(null);

  // Sample scheduled reports data
  const scheduledReports: ScheduledReport[] = [
    {
      id: '1',
      name: 'Monthly Sales Summary',
      description: 'Comprehensive monthly sales performance report',
      frequency: 'monthly',
      nextRun: '2025-10-01T09:00:00',
      lastRun: '2025-09-01T09:00:00',
      status: 'active',
      recipients: ['sales@ashleydirect.com', 'management@ashleydirect.com'],
      format: 'pdf',
      reportType: 'sales-analytics',
      createdBy: 'John Smith'
    },
    {
      id: '2',
      name: 'Weekly Customer Report',
      description: 'Customer acquisition and retention metrics',
      frequency: 'weekly',
      nextRun: '2025-09-16T08:00:00',
      lastRun: '2025-09-09T08:00:00',
      status: 'active',
      recipients: ['customer-success@ashleydirect.com'],
      format: 'excel',
      reportType: 'customer-analytics',
      createdBy: 'Sarah Johnson'
    },
    {
      id: '3',
      name: 'Daily Inventory Status',
      description: 'Current inventory levels and reorder alerts',
      frequency: 'daily',
      nextRun: '2025-09-13T07:00:00',
      lastRun: '2025-09-12T07:00:00',
      status: 'active',
      recipients: ['inventory@ashleydirect.com', 'operations@ashleydirect.com'],
      format: 'csv',
      reportType: 'inventory-tracking',
      createdBy: 'Mike Chen'
    },
    {
      id: '4',
      name: 'Quarterly Financial Review',
      description: 'Comprehensive quarterly financial analysis',
      frequency: 'quarterly',
      nextRun: '2025-10-01T10:00:00',
      lastRun: '2025-07-01T10:00:00',
      status: 'paused',
      recipients: ['finance@ashleydirect.com', 'cfo@ashleydirect.com'],
      format: 'pdf',
      reportType: 'financial-analytics',
      createdBy: 'Lisa Wang'
    },
    {
      id: '5',
      name: 'Product Performance Analysis',
      description: 'Top and bottom performing products analysis',
      frequency: 'weekly',
      nextRun: '2025-09-18T11:00:00',
      status: 'error',
      recipients: ['product@ashleydirect.com'],
      format: 'excel',
      reportType: 'product-analytics',
      createdBy: 'David Brown'
    }
  ];

  // Sample report templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'sales-analytics',
      name: 'Sales Analytics Report',
      description: 'Revenue, orders, and customer metrics',
      category: 'Sales',
      estimatedRuntime: '5-10 minutes'
    },
    {
      id: 'customer-analytics',
      name: 'Customer Analytics Report',
      description: 'Customer acquisition, retention, and satisfaction',
      category: 'Customer',
      estimatedRuntime: '3-7 minutes'
    },
    {
      id: 'inventory-tracking',
      name: 'Inventory Tracking Report',
      description: 'Stock levels, reorder points, and turnover',
      category: 'Operations',
      estimatedRuntime: '2-5 minutes'
    },
    {
      id: 'financial-analytics',
      name: 'Financial Analytics Report',
      description: 'Revenue, expenses, and profitability analysis',
      category: 'Finance',
      estimatedRuntime: '10-15 minutes'
    },
    {
      id: 'product-analytics',
      name: 'Product Performance Report',
      description: 'Product sales, margins, and inventory analysis',
      category: 'Product',
      estimatedRuntime: '7-12 minutes'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'paused':
        return <PauseIcon className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'paused':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const formatNextRun = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getFrequencyIcon = (frequency: string) => {
    return <CalendarIcon className="h-4 w-4" />;
  };

  const toggleReportStatus = (reportId: string) => {
    // In a real app, this would call an API
    console.log('Toggling status for report:', reportId);
    alert('Report status updated!');
  };

  const runReportNow = (reportId: string) => {
    // In a real app, this would trigger immediate report generation
    console.log('Running report now:', reportId);
    alert('Report generation started! You will receive an email when it completes.');
  };

  const deleteReport = (reportId: string) => {
    if (window.confirm('Are you sure you want to delete this scheduled report?')) {
      // In a real app, this would call an API
      console.log('Deleting report:', reportId);
      alert('Scheduled report deleted!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Reports</h1>
          <p className="text-gray-600">Automate report generation and distribution</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'scheduled'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Scheduled Reports
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
            New Schedule
          </button>
        </div>
      </div>

      {activeTab === 'scheduled' ? (
        /* Scheduled Reports */
        <div className="space-y-4">
          {scheduledReports.map((report) => (
            <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="capitalize">{report.status}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{report.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      {getFrequencyIcon(report.frequency)}
                      <span className="capitalize">{report.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ClockIcon className="h-4 w-4" />
                      <span>Next: {formatNextRun(report.nextRun)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>{report.recipients.length} recipients</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      <span className="uppercase">{report.format}</span>
                    </div>
                  </div>
                  
                  {report.lastRun && (
                    <div className="mt-2 text-xs text-gray-500">
                      Last run: {formatNextRun(report.lastRun)}
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Created by {report.createdBy}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => runReportNow(report.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium p-2 rounded hover:bg-blue-50 transition-colors duration-200"
                    title="Run Now"
                  >
                    <PlayIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleReportStatus(report.id)}
                    className={`text-sm font-medium p-2 rounded transition-colors duration-200 ${
                      report.status === 'active'
                        ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                        : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                    }`}
                    title={report.status === 'active' ? 'Pause' : 'Resume'}
                  >
                    {report.status === 'active' ? (
                      <PauseIcon className="h-4 w-4" />
                    ) : (
                      <PlayIcon className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium p-2 rounded hover:bg-gray-50 transition-colors duration-200"
                    title="Edit"
                  >
                    <Cog6ToothIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteReport(report.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium p-2 rounded hover:bg-red-50 transition-colors duration-200"
                    title="Delete"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Report Templates */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTemplates.map((template) => (
            <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                <DocumentArrowDownIcon className="h-6 w-6 text-gray-400" />
              </div>
              
              <p className="text-gray-600 mb-4">{template.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{template.estimatedRuntime}</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Create Schedule
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Create Scheduled Report</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter report name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {reportTemplates.map(template => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email addresses (one per line)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </form>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  alert('Scheduled report created successfully!');
                  setShowCreateModal(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Create Schedule
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
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

export default ScheduledReports;