import React, { useState } from 'react';

interface PaymentTransaction {
  id: string;
  transactionId: string;
  invoiceNumber: string;
  customerName: string;
  paymentDate: string;
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'ACH' | 'Check' | 'Cash' | 'Wire Transfer';
  amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed' | 'Cancelled' | 'Refunded';
  reference: string;
  processingFee: number;
  netAmount: number;
  gatewayResponse?: {
    code: string;
    message: string;
    authCode?: string;
    last4?: string;
  };
  bankDetails?: {
    routingNumber: string;
    accountNumber: string;
    bankName: string;
  };
  checkDetails?: {
    checkNumber: string;
    bankName: string;
    memo?: string;
  };
  notes?: string;
  processedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentMethod {
  id: string;
  type: 'Credit Card' | 'Bank Account' | 'Digital Wallet';
  customerName: string;
  isDefault: boolean;
  details: {
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    accountType?: string;
    bankName?: string;
    routingNumber?: string;
    walletType?: string;
  };
  status: 'Active' | 'Expired' | 'Suspended';
  addedDate: string;
  lastUsed?: string;
}

const PaymentProcessing: React.FC = () => {
  const [transactions] = useState<PaymentTransaction[]>([
    {
      id: 'PAY-001',
      transactionId: 'txn_1234567890',
      invoiceNumber: 'ASH-2024-1157',
      customerName: 'Elite Furnishings LLC',
      paymentDate: '2024-12-08',
      paymentMethod: 'Credit Card',
      amount: 15000.00,
      status: 'Completed',
      reference: 'Partial payment - first installment',
      processingFee: 450.00,
      netAmount: 14550.00,
      gatewayResponse: {
        code: '00',
        message: 'Transaction approved',
        authCode: 'AUTH123456',
        last4: '4242'
      },
      notes: 'Customer requested partial payment plan',
      processedBy: 'System - Stripe Gateway',
      createdAt: '2024-12-08T10:30:00Z',
      updatedAt: '2024-12-08T10:31:15Z'
    },
    {
      id: 'PAY-002',
      transactionId: 'txn_0987654321',
      invoiceNumber: 'ASH-2024-1156',
      customerName: 'Modern Office Solutions',
      paymentDate: '2024-12-07',
      paymentMethod: 'Bank Transfer',
      amount: 16222.50,
      status: 'Processing',
      reference: 'ACH payment for office furniture order',
      processingFee: 25.00,
      netAmount: 16197.50,
      bankDetails: {
        routingNumber: '****1234',
        accountNumber: '****5678',
        bankName: 'First National Bank'
      },
      notes: 'Bank transfer initiated - 2-3 business days processing',
      processedBy: 'Sarah Johnson',
      createdAt: '2024-12-07T14:20:00Z',
      updatedAt: '2024-12-08T09:00:00Z'
    },
    {
      id: 'PAY-003',
      transactionId: 'txn_5555666677',
      invoiceNumber: 'ASH-2024-1140',
      customerName: 'Comfort Living Inc.',
      paymentDate: '2024-12-05',
      paymentMethod: 'Check',
      amount: 8750.00,
      status: 'Completed',
      reference: 'Check payment for sectional sofa order',
      processingFee: 0.00,
      netAmount: 8750.00,
      checkDetails: {
        checkNumber: '2048',
        bankName: 'Regional Trust Bank',
        memo: 'Invoice ASH-2024-1140'
      },
      notes: 'Check deposited and cleared',
      processedBy: 'Mike Chen',
      createdAt: '2024-12-05T11:00:00Z',
      updatedAt: '2024-12-05T16:30:00Z'
    },
    {
      id: 'PAY-004',
      transactionId: 'txn_9999888877',
      invoiceNumber: 'ASH-2024-1138',
      customerName: 'Tech Startup Office',
      paymentDate: '2024-12-03',
      paymentMethod: 'Credit Card',
      amount: 5500.00,
      status: 'Failed',
      reference: 'Payment attempt for standing desks',
      processingFee: 0.00,
      netAmount: 0.00,
      gatewayResponse: {
        code: '05',
        message: 'Insufficient funds',
        last4: '9876'
      },
      notes: 'Payment failed - customer notified to update payment method',
      processedBy: 'System - Stripe Gateway',
      createdAt: '2024-12-03T09:15:00Z',
      updatedAt: '2024-12-03T09:16:22Z'
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'PM-001',
      type: 'Credit Card',
      customerName: 'Elite Furnishings LLC',
      isDefault: true,
      details: {
        last4: '4242',
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2026
      },
      status: 'Active',
      addedDate: '2024-10-15',
      lastUsed: '2024-12-08'
    },
    {
      id: 'PM-002',
      type: 'Bank Account',
      customerName: 'Modern Office Solutions',
      isDefault: true,
      details: {
        accountType: 'Checking',
        bankName: 'First National Bank',
        last4: '5678'
      },
      status: 'Active',
      addedDate: '2024-09-20',
      lastUsed: '2024-12-07'
    },
    {
      id: 'PM-003',
      type: 'Credit Card',
      customerName: 'Corporate Spaces Ltd.',
      isDefault: false,
      details: {
        last4: '1234',
        brand: 'American Express',
        expiryMonth: 8,
        expiryYear: 2025
      },
      status: 'Expired',
      addedDate: '2024-03-10',
      lastUsed: '2024-08-15'
    }
  ]);

  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);
  const [showProcessPayment, setShowProcessPayment] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [methodFilter, setMethodFilter] = useState<string>('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getStatusColor = (status: PaymentTransaction['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: PaymentTransaction['paymentMethod']) => {
    switch (method) {
      case 'Credit Card': return '💳';
      case 'Bank Transfer': return '🏦';
      case 'ACH': return '💰';
      case 'Check': return '📄';
      case 'Cash': return '💵';
      case 'Wire Transfer': return '💲';
      default: return '💳';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = !searchTerm ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
    const matchesMethod = methodFilter === 'All' || transaction.paymentMethod === methodFilter;
    
    const matchesDateRange = (!dateRange.start || transaction.paymentDate >= dateRange.start) &&
                            (!dateRange.end || transaction.paymentDate <= dateRange.end);
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDateRange;
  });

  // Calculate summary metrics
  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const completedAmount = filteredTransactions.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.netAmount, 0);
  const pendingAmount = filteredTransactions.filter(t => t.status === 'Pending' || t.status === 'Processing').reduce((sum, t) => sum + t.amount, 0);
  const failedTransactions = filteredTransactions.filter(t => t.status === 'Failed').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-900">Payment Processing</h3>
          <p className="text-gray-600">Process payments and manage transaction history</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowProcessPayment(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Process Payment
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Export Transactions
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Total Transactions</h4>
          <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
          <p className="text-sm text-gray-600">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Completed</h4>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(completedAmount)}</p>
          <p className="text-sm text-gray-600">Successfully processed</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Pending</h4>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(pendingAmount)}</p>
          <p className="text-sm text-gray-600">Awaiting processing</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Failed</h4>
          <p className="text-2xl font-bold text-red-600">{failedTransactions}</p>
          <p className="text-sm text-gray-600">Require attention</p>
        </div>
      </div>

      {/* Payment Methods Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Methods Distribution</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { method: 'Credit Card', count: 156, amount: 485000, percentage: 65 },
            { method: 'Bank Transfer', count: 89, amount: 275000, percentage: 25 },
            { method: 'Check', count: 34, amount: 95000, percentage: 10 }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{getMethodIcon(item.method as PaymentTransaction['paymentMethod'])}</div>
              <h5 className="font-medium text-gray-900">{item.method}</h5>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(item.amount)}</p>
              <p className="text-sm text-gray-600">{item.count} transactions ({item.percentage}%)</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Transaction ID, invoice, customer..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="ACH">ACH</option>
              <option value="Check">Check</option>
              <option value="Cash">Cash</option>
              <option value="Wire Transfer">Wire Transfer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.transactionId}</p>
                      <p className="text-sm text-gray-500">Invoice: {transaction.invoiceNumber}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{transaction.customerName}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{getMethodIcon(transaction.paymentMethod)}</span>
                      <span className="text-sm text-gray-900">{transaction.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(transaction.amount)}</p>
                      {transaction.processingFee > 0 && (
                        <p className="text-sm text-gray-500">Fee: {formatCurrency(transaction.processingFee)}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.paymentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {transaction.status === 'Failed' && (
                        <button className="text-red-600 hover:text-red-900">Retry</button>
                      )}
                      {transaction.status === 'Completed' && (
                        <button className="text-purple-600 hover:text-purple-900">Refund</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Transaction Details</h3>
                  <p className="text-gray-600">{selectedTransaction.transactionId}</p>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Transaction Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Transaction Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Transaction ID</span>
                        <span className="text-sm text-gray-900">{selectedTransaction.transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Invoice</span>
                        <span className="text-sm text-gray-900">{selectedTransaction.invoiceNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Customer</span>
                        <span className="text-sm text-gray-900">{selectedTransaction.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Payment Method</span>
                        <span className="text-sm text-gray-900">
                          {getMethodIcon(selectedTransaction.paymentMethod)} {selectedTransaction.paymentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Status</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTransaction.status)}`}>
                          {selectedTransaction.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Amount Details</h4>
                    <div className="bg-green-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Payment Amount</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(selectedTransaction.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Processing Fee</span>
                        <span className="text-sm text-gray-900">{formatCurrency(selectedTransaction.processingFee)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-bold text-gray-700">Net Amount</span>
                          <span className="text-sm font-bold text-green-600">{formatCurrency(selectedTransaction.netAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedTransaction.notes && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Notes</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedTransaction.notes}</p>
                    </div>
                  )}
                </div>

                {/* Payment Method Details */}
                <div className="space-y-6">
                  {selectedTransaction.gatewayResponse && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Gateway Response</h4>
                      <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Response Code</span>
                          <span className="text-sm text-gray-900">{selectedTransaction.gatewayResponse.code}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Message</span>
                          <span className="text-sm text-gray-900">{selectedTransaction.gatewayResponse.message}</span>
                        </div>
                        {selectedTransaction.gatewayResponse.authCode && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-700">Auth Code</span>
                            <span className="text-sm text-gray-900">{selectedTransaction.gatewayResponse.authCode}</span>
                          </div>
                        )}
                        {selectedTransaction.gatewayResponse.last4 && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-700">Card Ending</span>
                            <span className="text-sm text-gray-900">****{selectedTransaction.gatewayResponse.last4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedTransaction.bankDetails && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Bank Details</h4>
                      <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Bank Name</span>
                          <span className="text-sm text-gray-900">{selectedTransaction.bankDetails.bankName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Routing Number</span>
                          <span className="text-sm text-gray-900">{selectedTransaction.bankDetails.routingNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Account Number</span>
                          <span className="text-sm text-gray-900">{selectedTransaction.bankDetails.accountNumber}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedTransaction.checkDetails && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Check Details</h4>
                      <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Check Number</span>
                          <span className="text-sm text-gray-900">{selectedTransaction.checkDetails.checkNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Bank Name</span>
                          <span className="text-sm text-gray-900">{selectedTransaction.checkDetails.bankName}</span>
                        </div>
                        {selectedTransaction.checkDetails.memo && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-700">Memo</span>
                            <span className="text-sm text-gray-900">{selectedTransaction.checkDetails.memo}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Processing Details</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Processed By</span>
                        <span className="text-sm text-gray-900">{selectedTransaction.processedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Created</span>
                        <span className="text-sm text-gray-900">{formatDateTime(selectedTransaction.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Last Updated</span>
                        <span className="text-sm text-gray-900">{formatDateTime(selectedTransaction.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                {selectedTransaction.status === 'Failed' && (
                  <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                    Retry Payment
                  </button>
                )}
                {selectedTransaction.status === 'Completed' && (
                  <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700">
                    Process Refund
                  </button>
                )}
                <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProcessing;