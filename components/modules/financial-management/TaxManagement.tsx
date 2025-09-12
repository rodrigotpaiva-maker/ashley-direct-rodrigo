import React, { useState } from 'react';
import { Calculator, FileText, AlertTriangle, CheckCircle, Download, Upload, Calendar, DollarSign, MapPin, Building } from 'lucide-react';

interface TaxJurisdiction {
  id: string;
  name: string;
  rate: number;
  type: 'state' | 'county' | 'city' | 'special';
  status: 'active' | 'inactive';
  effectiveDate: string;
}

interface TaxReturn {
  id: string;
  period: string;
  jurisdiction: string;
  taxableAmount: number;
  taxOwed: number;
  status: 'draft' | 'filed' | 'paid' | 'overdue';
  dueDate: string;
  filedDate?: string;
}

const TaxManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('jurisdictions');
  const [selectedReturn, setSelectedReturn] = useState<TaxReturn | null>(null);

  const [jurisdictions] = useState<TaxJurisdiction[]>([
    { id: '1', name: 'North Carolina', rate: 4.75, type: 'state', status: 'active', effectiveDate: '2024-01-01' },
    { id: '2', name: 'Mecklenburg County', rate: 2.50, type: 'county', status: 'active', effectiveDate: '2024-01-01' },
    { id: '3', name: 'Charlotte', rate: 2.25, type: 'city', status: 'active', effectiveDate: '2024-01-01' },
    { id: '4', name: 'South Carolina', rate: 6.00, type: 'state', status: 'active', effectiveDate: '2024-01-01' },
    { id: '5', name: 'Charleston County', rate: 1.00, type: 'county', status: 'active', effectiveDate: '2024-01-01' },
    { id: '6', name: 'Virginia', rate: 5.30, type: 'state', status: 'active', effectiveDate: '2024-01-01' },
    { id: '7', name: 'Georgia', rate: 4.00, type: 'state', status: 'active', effectiveDate: '2024-01-01' },
    { id: '8', name: 'Tennessee', rate: 7.00, type: 'state', status: 'active', effectiveDate: '2024-01-01' }
  ]);

  const [taxReturns] = useState<TaxReturn[]>([
    {
      id: '1',
      period: 'Q4 2023',
      jurisdiction: 'North Carolina',
      taxableAmount: 2850000,
      taxOwed: 135375,
      status: 'paid',
      dueDate: '2024-01-31',
      filedDate: '2024-01-28'
    },
    {
      id: '2',
      period: 'Q1 2024',
      jurisdiction: 'North Carolina',
      taxableAmount: 3200000,
      taxOwed: 152000,
      status: 'filed',
      dueDate: '2024-04-30',
      filedDate: '2024-04-25'
    },
    {
      id: '3',
      period: 'Q1 2024',
      jurisdiction: 'South Carolina',
      taxableAmount: 1850000,
      taxOwed: 111000,
      status: 'overdue',
      dueDate: '2024-04-30'
    },
    {
      id: '4',
      period: 'Q2 2024',
      jurisdiction: 'North Carolina',
      taxableAmount: 3650000,
      taxOwed: 173375,
      status: 'draft',
      dueDate: '2024-07-31'
    },
    {
      id: '5',
      period: 'Q2 2024',
      jurisdiction: 'Virginia',
      taxableAmount: 980000,
      taxOwed: 51940,
      status: 'draft',
      dueDate: '2024-07-31'
    }
  ]);

  const getStatusIcon = (status: TaxReturn['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'filed': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'draft': return <FileText className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: TaxReturn['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getJurisdictionIcon = (type: TaxJurisdiction['type']) => {
    switch (type) {
      case 'state': return <MapPin className="w-4 h-4 text-blue-500" />;
      case 'county': return <Building className="w-4 h-4 text-green-500" />;
      case 'city': return <Building className="w-4 h-4 text-purple-500" />;
      case 'special': return <Building className="w-4 h-4 text-orange-500" />;
      default: return null;
    }
  };

  const totalTaxOwed = taxReturns.reduce((sum, ret) => sum + ret.taxOwed, 0);
  const overdueAmount = taxReturns.filter(r => r.status === 'overdue').reduce((sum, r) => sum + r.taxOwed, 0);
  const overdueCount = taxReturns.filter(r => r.status === 'overdue').length;
  const complianceRate = ((taxReturns.filter(r => ['paid', 'filed'].includes(r.status)).length / taxReturns.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tax Management</h1>
          <p className="text-xl text-gray-600">
            Comprehensive sales tax management, compliance tracking, and automated filing across multiple jurisdictions.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tax Liability</p>
                <p className="text-3xl font-bold text-blue-600">${totalTaxOwed.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                <p className="text-3xl font-bold text-red-600">${overdueAmount.toLocaleString()}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Returns</p>
                <p className="text-3xl font-bold text-orange-600">{overdueCount}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                <p className="text-3xl font-bold text-green-600">{complianceRate.toFixed(1)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'jurisdictions', name: 'Tax Jurisdictions', icon: MapPin },
                { id: 'returns', name: 'Tax Returns', icon: FileText },
                { id: 'calculations', name: 'Tax Calculations', icon: Calculator },
                { id: 'compliance', name: 'Compliance Dashboard', icon: CheckCircle }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Tax Jurisdictions Tab */}
            {activeTab === 'jurisdictions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Tax Jurisdictions</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Jurisdiction
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurisdiction</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jurisdictions.map((jurisdiction) => (
                        <tr key={jurisdiction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getJurisdictionIcon(jurisdiction.type)}
                              <span className="text-sm font-medium text-gray-900">{jurisdiction.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900 capitalize">{jurisdiction.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">{jurisdiction.rate}%</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(jurisdiction.effectiveDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              jurisdiction.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {jurisdiction.status.charAt(0).toUpperCase() + jurisdiction.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Deactivate</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tax Returns Tab */}
            {activeTab === 'returns' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Tax Returns</h2>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Upload className="w-4 h-4" />
                      Import Data
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Create Return
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurisdiction</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxable Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Owed</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {taxReturns.map((taxReturn) => (
                        <tr key={taxReturn.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {taxReturn.period}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {taxReturn.jurisdiction}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${taxReturn.taxableAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${taxReturn.taxOwed.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(taxReturn.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(taxReturn.status)}`}>
                              {getStatusIcon(taxReturn.status)}
                              {taxReturn.status.charAt(0).toUpperCase() + taxReturn.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setSelectedReturn(taxReturn)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                View
                              </button>
                              {taxReturn.status === 'draft' && (
                                <button className="text-green-600 hover:text-green-900">File</button>
                              )}
                              {taxReturn.status === 'filed' && (
                                <button className="text-purple-600 hover:text-purple-900">Pay</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tax Calculations Tab */}
            {activeTab === 'calculations' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tax Calculation Engine</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tax Calculator</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sale Amount</label>
                          <input 
                            type="number" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter sale amount"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Location</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option>Charlotte, NC</option>
                            <option>Charleston, SC</option>
                            <option>Richmond, VA</option>
                            <option>Atlanta, GA</option>
                            <option>Nashville, TN</option>
                          </select>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                          Calculate Tax
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Rate Summary</h3>
                    <div className="space-y-3">
                      {jurisdictions.filter(j => j.status === 'active').map((jurisdiction) => (
                        <div key={jurisdiction.id} className="flex justify-between items-center p-3 bg-white border rounded-lg">
                          <div className="flex items-center gap-2">
                            {getJurisdictionIcon(jurisdiction.type)}
                            <span className="font-medium">{jurisdiction.name}</span>
                          </div>
                          <span className="text-lg font-bold text-blue-600">{jurisdiction.rate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Compliance Dashboard Tab */}
            {activeTab === 'compliance' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Compliance Dashboard</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Filing Status Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Returns Filed On Time:</span>
                        <span className="font-bold text-green-600">
                          {taxReturns.filter(r => r.status === 'paid' || r.status === 'filed').length} / {taxReturns.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Compliance Rate:</span>
                        <span className="font-bold text-blue-600">{complianceRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Overdue Returns:</span>
                        <span className="font-bold text-red-600">{overdueCount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                    <div className="space-y-3">
                      {taxReturns
                        .filter(r => r.status === 'draft')
                        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                        .map((taxReturn) => (
                          <div key={taxReturn.id} className="flex justify-between items-center p-3 bg-white border rounded-lg">
                            <div>
                              <div className="font-medium">{taxReturn.jurisdiction}</div>
                              <div className="text-sm text-gray-600">{taxReturn.period}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-orange-600 font-medium">
                                Due: {new Date(taxReturn.dueDate).toLocaleDateString()}
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                ${taxReturn.taxOwed.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tax Return Detail Modal */}
        {selectedReturn && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedReturn.jurisdiction} - {selectedReturn.period}</h2>
                    <p className="text-gray-600">Tax Return Details</p>
                  </div>
                  <button 
                    onClick={() => setSelectedReturn(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <div className="w-6 h-6">✕</div>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Period:</span>
                        <span className="font-medium">{selectedReturn.period}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jurisdiction:</span>
                        <span className="font-medium">{selectedReturn.jurisdiction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{new Date(selectedReturn.dueDate).toLocaleDateString()}</span>
                      </div>
                      {selectedReturn.filedDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Filed Date:</span>
                          <span className="font-medium">{new Date(selectedReturn.filedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Calculation</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxable Amount:</span>
                        <span className="font-medium">${selectedReturn.taxableAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax Rate:</span>
                        <span className="font-medium">
                          {jurisdictions.find(j => j.name === selectedReturn.jurisdiction)?.rate}%
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600 font-semibold">Tax Owed:</span>
                        <span className="font-bold text-lg">${selectedReturn.taxOwed.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4 inline mr-2" />
                    Download Return
                  </button>
                  {selectedReturn.status === 'draft' && (
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      File Return
                    </button>
                  )}
                  {selectedReturn.status === 'filed' && (
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Make Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxManagement;