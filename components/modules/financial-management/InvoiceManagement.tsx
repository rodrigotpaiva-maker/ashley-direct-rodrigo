import React, { useState } from 'react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerType: 'Dealer' | 'Retailer' | 'Direct';
  orderNumber: string;
  issueDate: string;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Partial' | 'Paid' | 'Overdue' | 'Cancelled';
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentTerms: string;
  items: {
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    total: number;
  }[];
  billingAddress: {
    company: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingAddress: {
    company: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  notes?: string;
  internalNotes?: string;
  salesRep: string;
  territory: string;
  createdBy: string;
  lastModified: string;
}

const InvoiceManagement: React.FC = () => {
  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      invoiceNumber: 'ASH-2024-1156',
      customerName: 'Modern Office Solutions',
      customerType: 'Dealer',
      orderNumber: 'ORD-2024-156',
      issueDate: '2024-12-01',
      dueDate: '2024-12-31',
      status: 'Sent',
      subtotal: 15750.00,
      taxAmount: 1260.00,
      discountAmount: 787.50,
      totalAmount: 16222.50,
      paidAmount: 0,
      balanceAmount: 16222.50,
      paymentTerms: 'Net 30',
      items: [
        {
          productName: 'Executive Leather Office Chair',
          sku: 'ASH-CH-001',
          quantity: 6,
          unitPrice: 1299.99,
          discount: 195.00,
          total: 7604.94
        },
        {
          productName: 'Standing Desk - Adjustable Height',
          sku: 'ASH-DK-002',
          quantity: 6,
          unitPrice: 1325.01,
          discount: 198.75,
          total: 7751.81
        }
      ],
      billingAddress: {
        company: 'Modern Office Solutions',
        street: '123 Business Park Dr',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30309',
        country: 'USA'
      },
      shippingAddress: {
        company: 'Modern Office Solutions - Warehouse',
        street: '456 Industrial Blvd',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30318',
        country: 'USA'
      },
      notes: 'Bulk order discount applied. Delivery to warehouse location.',
      internalNotes: 'Preferred customer - expedite processing',
      salesRep: 'Sarah Johnson',
      territory: 'Southeast',
      createdBy: 'John Smith',
      lastModified: '2024-12-08'
    },
    {
      id: 'INV-002',
      invoiceNumber: 'ASH-2024-1157',
      customerName: 'Elite Furnishings LLC',
      customerType: 'Retailer',
      orderNumber: 'ORD-2024-157',
      issueDate: '2024-11-28',
      dueDate: '2024-12-28',
      status: 'Partial',
      subtotal: 28500.00,
      taxAmount: 2280.00,
      discountAmount: 1425.00,
      totalAmount: 29355.00,
      paidAmount: 15000.00,
      balanceAmount: 14355.00,
      paymentTerms: 'Net 30',
      items: [
        {
          productName: 'Luxury Sectional Sofa',
          sku: 'ASH-SO-001',
          quantity: 5,
          unitPrice: 3299.99,
          discount: 825.00,
          total: 15674.95
        },
        {
          productName: 'Modern Coffee Table',
          sku: 'ASH-TB-001',
          quantity: 10,
          unitPrice: 1200.00,
          discount: 600.00,
          total: 11400.00
        }
      ],
      billingAddress: {
        company: 'Elite Furnishings LLC',
        street: '789 Commerce St',
        city: 'Nashville',
        state: 'TN',
        zipCode: '37201',
        country: 'USA'
      },
      shippingAddress: {
        company: 'Elite Furnishings LLC',
        street: '789 Commerce St',
        city: 'Nashville',
        state: 'TN',
        zipCode: '37201',
        country: 'USA'
      },
      notes: 'Payment plan arranged - 50% upfront, balance on delivery',
      salesRep: 'Mike Chen',
      territory: 'Southeast',
      createdBy: 'Lisa Davis',
      lastModified: '2024-12-05'
    },
    {
      id: 'INV-003',
      invoiceNumber: 'ASH-2024-1145',
      customerName: 'Corporate Spaces Ltd.',
      customerType: 'Direct',
      orderNumber: 'ORD-2024-145',
      issueDate: '2024-11-15',
      dueDate: '2024-12-15',
      status: 'Overdue',
      subtotal: 45200.00,
      taxAmount: 3616.00,
      discountAmount: 2260.00,
      totalAmount: 46556.00,
      paidAmount: 0,
      balanceAmount: 46556.00,
      paymentTerms: 'Net 30',
      items: [
        {
          productName: 'Conference Table Set',
          sku: 'ASH-CT-001',
          quantity: 3,
          unitPrice: 4500.00,
          discount: 675.00,
          total: 12825.00
        },
        {
          productName: 'Executive Office Chair',
          sku: 'ASH-CH-001',
          quantity: 25,
          unitPrice: 1299.99,
          discount: 1625.00,
          total: 30874.75
        }
      ],
      billingAddress: {
        company: 'Corporate Spaces Ltd.',
        street: '456 Executive Plaza',
        city: 'Charlotte',
        state: 'NC',
        zipCode: '28202',
        country: 'USA'
      },
      shippingAddress: {
        company: 'Corporate Spaces Ltd.',
        street: '456 Executive Plaza',
        city: 'Charlotte',
        state: 'NC',
        zipCode: '28202',
        country: 'USA'
      },
      notes: 'Large corporate order - conference room furniture package',
      internalNotes: 'Customer requesting extended payment terms',
      salesRep: 'Jennifer Davis',
      territory: 'Southeast',
      createdBy: 'Robert Wilson',
      lastModified: '2024-11-15'
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string>('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Viewed': return 'bg-purple-100 text-purple-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCustomerTypeColor = (type: Invoice['customerType']) => {
    switch (type) {
      case 'Dealer': return 'bg-purple-100 text-purple-800';
      case 'Retailer': return 'bg-blue-100 text-blue-800';
      case 'Direct': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = !searchTerm ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;
    const matchesCustomerType = customerTypeFilter === 'All' || invoice.customerType === customerTypeFilter;
    
    const matchesDateRange = (!dateRange.start || invoice.issueDate >= dateRange.start) &&
                            (!dateRange.end || invoice.issueDate <= dateRange.end);
    
    return matchesSearch && matchesStatus && matchesCustomerType && matchesDateRange;
  });

  // Calculate summary metrics
  const totalInvoices = filteredInvoices.length;
  const totalAmount = filteredInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const paidAmount = filteredInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const outstandingAmount = filteredInvoices.reduce((sum, inv) => sum + inv.balanceAmount, 0);
  const overdueInvoices = filteredInvoices.filter(inv => inv.status === 'Overdue').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-900">Invoice Management</h3>
          <p className="text-gray-600">Create, track, and manage customer invoices</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCreateInvoice(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Invoice
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Total Invoices</h4>
          <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Total Billed</h4>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Collected</h4>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(paidAmount)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Outstanding</h4>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(outstandingAmount)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Overdue</h4>
          <p className="text-2xl font-bold text-red-600">{overdueInvoices}</p>
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
              placeholder="Invoice, customer, order..."
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
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Viewed">Viewed</option>
              <option value="Partial">Partial Payment</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
            <select
              value={customerTypeFilter}
              onChange={(e) => setCustomerTypeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Types</option>
              <option value="Dealer">Dealer</option>
              <option value="Retailer">Retailer</option>
              <option value="Direct">Direct</option>
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

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</p>
                      <p className="text-sm text-gray-500">Order: {invoice.orderNumber}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{invoice.customerName}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCustomerTypeColor(invoice.customerType)}`}>
                        {invoice.customerType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-900">Issued: {invoice.issueDate}</p>
                      <p className={`text-sm ${
                        new Date(invoice.dueDate) < new Date() && invoice.status !== 'Paid' 
                          ? 'text-red-600 font-medium' 
                          : 'text-gray-500'
                      }`}>
                        Due: {invoice.dueDate}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatCurrency(invoice.totalAmount)}</p>
                      {invoice.balanceAmount > 0 && (
                        <p className="text-sm text-red-600">Balance: {formatCurrency(invoice.balanceAmount)}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(invoice.paidAmount / invoice.totalAmount) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatCurrency(invoice.paidAmount)} of {formatCurrency(invoice.totalAmount)}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                      <button className="text-green-600 hover:text-green-900">Send</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">Invoice {selectedInvoice.invoiceNumber}</h3>
                  <p className="text-gray-600">{selectedInvoice.customerName} - {selectedInvoice.orderNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Invoice Information */}
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Invoice Details</h4>
                  
                  {/* Invoice Items */}
                  <div className="border rounded-lg overflow-hidden mb-6">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedInvoice.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                                <p className="text-sm text-gray-500">{item.sku}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-4 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                            <td className="px-4 py-4 text-sm text-gray-900">{formatCurrency(item.discount)}</td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{formatCurrency(item.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Invoice Totals */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="text-sm text-gray-900">{formatCurrency(selectedInvoice.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Discount:</span>
                        <span className="text-sm text-gray-900">-{formatCurrency(selectedInvoice.discountAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tax:</span>
                        <span className="text-sm text-gray-900">{formatCurrency(selectedInvoice.taxAmount)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="text-lg font-medium text-gray-900">Total:</span>
                          <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedInvoice.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer & Payment Info */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div>
                        <span className="block text-sm font-medium text-gray-700">Billing Address</span>
                        <div className="text-sm text-gray-900">
                          <p>{selectedInvoice.billingAddress.company}</p>
                          <p>{selectedInvoice.billingAddress.street}</p>
                          <p>{selectedInvoice.billingAddress.city}, {selectedInvoice.billingAddress.state} {selectedInvoice.billingAddress.zipCode}</p>
                          <p>{selectedInvoice.billingAddress.country}</p>
                        </div>
                      </div>
                      
                      <div>
                        <span className="block text-sm font-medium text-gray-700">Sales Representative</span>
                        <p className="text-sm text-gray-900">{selectedInvoice.salesRep}</p>
                        <p className="text-sm text-gray-500">{selectedInvoice.territory}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h4>
                    <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Status</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedInvoice.status)}`}>
                          {selectedInvoice.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Payment Terms</span>
                        <span className="text-sm text-gray-900">{selectedInvoice.paymentTerms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Amount Paid</span>
                        <span className="text-sm font-medium text-green-600">{formatCurrency(selectedInvoice.paidAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Balance Due</span>
                        <span className="text-sm font-bold text-red-600">{formatCurrency(selectedInvoice.balanceAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {selectedInvoice.notes && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Notes</h4>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedInvoice.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Send Invoice
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  Record Payment
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagement;