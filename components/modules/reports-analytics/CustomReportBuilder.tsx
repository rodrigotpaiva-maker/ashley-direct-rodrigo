import React, { useState } from 'react';
import { PlusIcon, XMarkIcon, DocumentChartBarIcon, CalendarIcon, FunnelIcon, ArrowDownTrayIcon, PlayIcon, ClockIcon } from '@heroicons/react/24/outline';

interface ReportField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  category: string;
}

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface SavedReport {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  fields: string[];
  filters: FilterCondition[];
}

const CustomReportBuilder: React.FC = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [activeTab, setActiveTab] = useState('build');
  const [isRunning, setIsRunning] = useState(false);

  // Available fields for reports
  const availableFields: ReportField[] = [
    // Customer fields
    { id: 'customer_id', name: 'Customer ID', type: 'text', category: 'Customer' },
    { id: 'customer_name', name: 'Customer Name', type: 'text', category: 'Customer' },
    { id: 'customer_type', name: 'Customer Type', type: 'select', category: 'Customer' },
    { id: 'customer_status', name: 'Customer Status', type: 'select', category: 'Customer' },
    { id: 'registration_date', name: 'Registration Date', type: 'date', category: 'Customer' },
    
    // Order fields
    { id: 'order_id', name: 'Order ID', type: 'text', category: 'Orders' },
    { id: 'order_date', name: 'Order Date', type: 'date', category: 'Orders' },
    { id: 'order_status', name: 'Order Status', type: 'select', category: 'Orders' },
    { id: 'order_total', name: 'Order Total', type: 'number', category: 'Orders' },
    { id: 'shipping_method', name: 'Shipping Method', type: 'select', category: 'Orders' },
    
    // Product fields
    { id: 'product_id', name: 'Product ID', type: 'text', category: 'Products' },
    { id: 'product_name', name: 'Product Name', type: 'text', category: 'Products' },
    { id: 'product_category', name: 'Product Category', type: 'select', category: 'Products' },
    { id: 'unit_price', name: 'Unit Price', type: 'number', category: 'Products' },
    { id: 'quantity_sold', name: 'Quantity Sold', type: 'number', category: 'Products' },
    
    // Financial fields
    { id: 'revenue', name: 'Revenue', type: 'number', category: 'Financial' },
    { id: 'profit_margin', name: 'Profit Margin', type: 'number', category: 'Financial' },
    { id: 'payment_method', name: 'Payment Method', type: 'select', category: 'Financial' },
    { id: 'payment_status', name: 'Payment Status', type: 'select', category: 'Financial' }
  ];

  // Operators for different field types
  const getOperatorsForType = (type: string) => {
    switch (type) {
      case 'text':
        return ['equals', 'contains', 'starts with', 'ends with'];
      case 'number':
        return ['equals', 'greater than', 'less than', 'between'];
      case 'date':
        return ['equals', 'after', 'before', 'between'];
      case 'select':
        return ['equals', 'not equals', 'in', 'not in'];
      default:
        return ['equals'];
    }
  };

  // Sample saved reports
  const savedReports: SavedReport[] = [
    {
      id: '1',
      name: 'Monthly Sales Report',
      description: 'Comprehensive sales analysis for monthly review',
      lastRun: '2025-09-10',
      fields: ['customer_name', 'order_date', 'order_total', 'product_name'],
      filters: [{ id: '1', field: 'order_date', operator: 'between', value: 'last 30 days' }]
    },
    {
      id: '2',
      name: 'Top Customers Report',
      description: 'Analysis of highest value customers',
      lastRun: '2025-09-08',
      fields: ['customer_name', 'customer_type', 'revenue', 'order_total'],
      filters: [{ id: '1', field: 'revenue', operator: 'greater than', value: '50000' }]
    },
    {
      id: '3',
      name: 'Product Performance',
      description: 'Product sales and inventory analysis',
      lastRun: '2025-09-09',
      fields: ['product_name', 'product_category', 'quantity_sold', 'revenue'],
      filters: []
    }
  ];

  // Group fields by category
  const fieldsByCategory = availableFields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, ReportField[]>);

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const addFilter = () => {
    const newFilter: FilterCondition = {
      id: Date.now().toString(),
      field: availableFields[0].id,
      operator: 'equals',
      value: ''
    };
    setFilters(prev => [...prev, newFilter]);
  };

  const updateFilter = (id: string, updates: Partial<FilterCondition>) => {
    setFilters(prev => prev.map(filter => 
      filter.id === id ? { ...filter, ...updates } : filter
    ));
  };

  const removeFilter = (id: string) => {
    setFilters(prev => prev.filter(filter => filter.id !== id));
  };

  const runReport = async () => {
    setIsRunning(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRunning(false);
    
    // In a real app, this would generate and download the report
    alert('Report generated successfully! In a real application, this would download the report file.');
  };

  const saveReport = () => {
    if (!reportName.trim()) {
      alert('Please enter a report name');
      return;
    }
    
    // In a real app, this would save to the backend
    alert(`Report "${reportName}" saved successfully!`);
    setReportName('');
    setReportDescription('');
    setSelectedFields([]);
    setFilters([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Report Builder</h1>
          <p className="text-gray-600">Create and manage custom business reports</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('build')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'build'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Build Report
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'saved'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Saved Reports
          </button>
        </div>
      </div>

      {activeTab === 'build' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Field Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Name *</label>
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter report name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter report description (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Field Selection */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Fields</h2>
              <div className="space-y-4">
                {Object.entries(fieldsByCategory).map(([category, fields]) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-gray-800 mb-2">{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {fields.map(field => (
                        <label key={field.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFields.includes(field.id)}
                            onChange={() => handleFieldToggle(field.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{field.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={addFilter}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Filter
                </button>
              </div>
              
              {filters.length === 0 ? (
                <p className="text-gray-500 text-sm italic">No filters applied. All records will be included.</p>
              ) : (
                <div className="space-y-3">
                  {filters.map((filter) => {
                    const field = availableFields.find(f => f.id === filter.field);
                    const operators = field ? getOperatorsForType(field.type) : ['equals'];
                    
                    return (
                      <div key={filter.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                        <select
                          value={filter.field}
                          onChange={(e) => updateFilter(filter.id, { field: e.target.value })}
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {availableFields.map(field => (
                            <option key={field.id} value={field.id}>{field.name}</option>
                          ))}
                        </select>
                        
                        <select
                          value={filter.operator}
                          onChange={(e) => updateFilter(filter.id, { operator: e.target.value })}
                          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {operators.map(op => (
                            <option key={op} value={op}>{op}</option>
                          ))}
                        </select>
                        
                        <input
                          type="text"
                          value={filter.value}
                          onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                          placeholder="Enter value"
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        
                        <button
                          onClick={() => removeFilter(filter.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Preview and Actions */}
          <div className="space-y-6">
            {/* Selected Fields Preview */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Preview</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Selected Fields ({selectedFields.length})</h3>
                  {selectedFields.length === 0 ? (
                    <p className="text-gray-500 text-sm mt-1">No fields selected</p>
                  ) : (
                    <div className="mt-2 space-y-1">
                      {selectedFields.map(fieldId => {
                        const field = availableFields.find(f => f.id === fieldId);
                        return field ? (
                          <div key={fieldId} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            {field.name}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Active Filters ({filters.length})</h3>
                  {filters.length === 0 ? (
                    <p className="text-gray-500 text-sm mt-1">No filters applied</p>
                  ) : (
                    <div className="mt-2 space-y-1">
                      {filters.map(filter => {
                        const field = availableFields.find(f => f.id === filter.field);
                        return (
                          <div key={filter.id} className="text-xs text-gray-600">
                            <FunnelIcon className="h-3 w-3 inline mr-1" />
                            {field?.name} {filter.operator} {filter.value || '(empty)'}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={runReport}
                  disabled={selectedFields.length === 0 || isRunning}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <ClockIcon className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="h-4 w-4" />
                      Run Report
                    </>
                  )}
                </button>
                
                <button
                  onClick={saveReport}
                  disabled={!reportName.trim() || selectedFields.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <DocumentChartBarIcon className="h-4 w-4" />
                  Save Report
                </button>
              </div>
              
              {selectedFields.length === 0 && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Select at least one field to enable actions
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Saved Reports Tab */
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Reports</h2>
          
          {savedReports.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No saved reports yet</p>
          ) : (
            <div className="space-y-4">
              {savedReports.map(report => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Fields: {report.fields.length}</span>
                        <span>Filters: {report.filters.length}</span>
                        <span>Last run: {report.lastRun}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        Run
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomReportBuilder;