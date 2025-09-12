import React, { useState } from 'react';
import { FileText, Send, Download, Eye, Calendar, Search, Filter, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface Statement {
  id: string;
  statementNumber: string;
  customer: {
    name: string;
    company: string;
    email: string;
    address: string;
  };
  statementDate: string;
  dueDate: string;
  previousBalance: number;
  currentCharges: number;
  payments: number;
  adjustments: number;
  newBalance: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  agingBuckets: {
    current: number;
    thirtyDays: number;
    sixtyDays: number;
    ninetyDays: number;
    overNinety: number;
  };
}

const BillingStatements: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStatement, setSelectedStatement] = useState<Statement | null>(null);

  const [statements] = useState<Statement[]>([
    {
      id: '1',
      statementNumber: 'STMT-2024-001',
      customer: {
        name: 'John Smith',
        company: 'Smith Furniture Store',
        email: 'john@smithfurniture.com',
        address: '123 Main St, Anytown, ST 12345'
      },
      statementDate: '2024-03-01',
      dueDate: '2024-03-31',
      previousBalance: 12500.00,
      currentCharges: 15750.00,
      payments: 12500.00,
      adjustments: 0.00,
      newBalance: 15750.00,
      status: 'sent',
      agingBuckets: {
        current: 15750.00,
        thirtyDays: 0.00,
        sixtyDays: 0.00,
        ninetyDays: 0.00,
        overNinety: 0.00
      }
    },
    {
      id: '2',
      statementNumber: 'STMT-2024-002',
      customer: {
        name: 'Sarah Johnson',
        company: 'Modern Living Ltd.',
        email: 'sarah@modernliving.com',
        address: '456 Oak Ave, Another City, ST 67890'
      },
      statementDate: '2024-02-29',
      dueDate: '2024-03-30',
      previousBalance: 5200.00,
      currentCharges: 8900.00,
      payments: 5200.00,
      adjustments: 0.00,
      newBalance: 8900.00,
      status: 'paid',
      agingBuckets: {
        current: 0.00,
        thirtyDays: 0.00,
        sixtyDays: 0.00,
        ninetyDays: 0.00,
        overNinety: 0.00
      }
    },
    {
      id: '3',
      statementNumber: 'STMT-2024-003',
      customer: {
        name: 'Mike Wilson',
        company: 'Wilson Home Center',
        email: 'mike@wilsonhome.com',
        address: '789 Pine Rd, Third Town, ST 11111'
      },
      statementDate: '2024-01-31',
      dueDate: '2024-02-29',
      previousBalance: 18400.00,
      currentCharges: 25600.00,
      payments: 18400.00,
      adjustments: -500.00,
      newBalance: 25100.00,
      status: 'overdue',
      agingBuckets: {
        current: 0.00,
        thirtyDays: 25100.00,
        sixtyDays: 0.00,
        ninetyDays: 0.00,
        overNinety: 0.00
      }
    },
    {
      id: '4',
      statementNumber: 'STMT-2024-004',
      customer: {
        name: 'Lisa Chen',
        company: 'Chen Interior Design',
        email: 'lisa@chendesign.com',
        address: '321 Elm Dr, Design City, ST 22222'
      },
      statementDate: '2024-03-01',
      dueDate: '2024-03-31',
      previousBalance: 3200.00,
      currentCharges: 5200.00,
      payments: 3200.00,
      adjustments: 0.00,
      newBalance: 5200.00,
      status: 'sent',
      agingBuckets: {
        current: 5200.00,
        thirtyDays: 0.00,
        sixtyDays: 0.00,
        ninetyDays: 0.00,
        overNinety: 0.00
      }
    }
  ]);

  const getStatusIcon = (status: Statement['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'sent': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'draft': return <FileText className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: Statement['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStatements = statements.filter(statement => {
    const matchesSearch = statement.statementNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         statement.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         statement.customer.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || statement.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOutstanding = statements
    .filter(s => ['sent', 'overdue'].includes(s.status))
    .reduce((sum, s) => sum + s.newBalance, 0);

  const overdueAmount = statements
    .filter(s => s.status === 'overdue')
    .reduce((sum, s) => sum + s.newBalance, 0);

  const overdueCount = statements.filter(s => s.status === 'overdue').length;
  const totalStatements = statements.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Billing Statements</h1>
          <p className="text-xl text-gray-600">
            Generate, send, and track customer billing statements with automated aging and payment tracking.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                <p className="text-3xl font-bold text-blue-600">${totalOutstanding.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">Overdue Count</p>
                <p className="text-3xl font-bold text-orange-600">{overdueCount}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Statements</p>
                <p className="text-3xl font-bold text-gray-600">{totalStatements}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg border mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search statements..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    Date Range
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <FileText className="w-4 h-4" />
                  Generate Statements
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statements Table */}
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statement Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStatements.map((statement) => (
                  <tr key={statement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{statement.statementNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{statement.customer.name}</div>
                        <div className="text-sm text-gray-500">{statement.customer.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(statement.statementDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(statement.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${statement.newBalance.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(statement.status)}`}>
                        {getStatusIcon(statement.status)}
                        {statement.status.charAt(0).toUpperCase() + statement.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => setSelectedStatement(statement)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Send className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statement Detail Modal */}
        {selectedStatement && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStatement.statementNumber}</h2>
                    <p className="text-gray-600">Billing Statement Details</p>
                  </div>
                  <button 
                    onClick={() => setSelectedStatement(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <div className="w-6 h-6">✕</div>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedStatement.customer.name}</p>
                      <p><span className="font-medium">Company:</span> {selectedStatement.customer.company}</p>
                      <p><span className="font-medium">Email:</span> {selectedStatement.customer.email}</p>
                      <p><span className="font-medium">Address:</span> {selectedStatement.customer.address}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Statement Details</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Statement Date:</span> {new Date(selectedStatement.statementDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Due Date:</span> {new Date(selectedStatement.dueDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedStatement.status)}`}>
                          {getStatusIcon(selectedStatement.status)}
                          {selectedStatement.status.charAt(0).toUpperCase() + selectedStatement.status.slice(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statement Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Statement Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Previous Balance</div>
                      <div className="text-lg font-bold text-gray-900">${selectedStatement.previousBalance.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Current Charges</div>
                      <div className="text-lg font-bold text-blue-600">${selectedStatement.currentCharges.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Payments</div>
                      <div className="text-lg font-bold text-green-600">-${selectedStatement.payments.toLocaleString()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Adjustments</div>
                      <div className={`text-lg font-bold ${selectedStatement.adjustments >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {selectedStatement.adjustments >= 0 ? '+' : ''}${selectedStatement.adjustments.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">New Balance</div>
                      <div className="text-xl font-bold text-gray-900">${selectedStatement.newBalance.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Aging Analysis */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Aging Analysis</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-green-600 font-medium">Current</div>
                      <div className="text-lg font-bold text-green-700">${selectedStatement.agingBuckets.current.toLocaleString()}</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-yellow-600 font-medium">1-30 Days</div>
                      <div className="text-lg font-bold text-yellow-700">${selectedStatement.agingBuckets.thirtyDays.toLocaleString()}</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-orange-600 font-medium">31-60 Days</div>
                      <div className="text-lg font-bold text-orange-700">${selectedStatement.agingBuckets.sixtyDays.toLocaleString()}</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-red-600 font-medium">61-90 Days</div>
                      <div className="text-lg font-bold text-red-700">${selectedStatement.agingBuckets.ninetyDays.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-sm text-gray-600 font-medium">90+ Days</div>
                      <div className="text-lg font-bold text-gray-700">${selectedStatement.agingBuckets.overNinety.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Download PDF
                  </button>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Send Statement
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Record Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingStatements;