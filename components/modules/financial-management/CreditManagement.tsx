import React, { useState } from 'react';

interface CreditAccount {
  id: string;
  customerName: string;
  customerType: 'Dealer' | 'Retailer' | 'Direct';
  accountNumber: string;
  creditLimit: number;
  availableCredit: number;
  usedCredit: number;
  creditScore: number;
  paymentTerms: string;
  status: 'Active' | 'Suspended' | 'Under Review' | 'Closed';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  establishedDate: string;
  lastPaymentDate?: string;
  lastPaymentAmount?: number;
  daysPaymentHistory: {
    period: string;
    averageDays: number;
    onTimePayments: number;
    latePayments: number;
  }[];
  creditApplication: {
    businessName: string;
    yearsInBusiness: number;
    annualRevenue: number;
    requestedLimit: number;
    references: string[];
    applicationDate: string;
    approvedBy?: string;
    approvalDate?: string;
  };
  notes?: string;
  accountManager: string;
  lastReviewDate: string;
  nextReviewDate: string;
}

interface CreditApplication {
  id: string;
  businessName: string;
  contactName: string;
  businessType: 'Corporation' | 'LLC' | 'Partnership' | 'Sole Proprietorship';
  yearsInBusiness: number;
  annualRevenue: number;
  requestedCreditLimit: number;
  paymentTermsRequested: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Additional Info Required';
  applicationDate: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bankReferences: {
    bankName: string;
    accountType: string;
    yearsWithBank: number;
  }[];
  tradeReferences: {
    companyName: string;
    contactInfo: string;
    creditLimit: number;
    paymentHistory: string;
  }[];
  documents: {
    type: string;
    uploaded: boolean;
    uploadDate?: string;
  }[];
  reviewedBy?: string;
  reviewNotes?: string;
  lastUpdated: string;
}

const CreditManagement: React.FC = () => {
  const [creditAccounts] = useState<CreditAccount[]>([
    {
      id: 'CRED-001',
      customerName: 'Modern Office Solutions',
      customerType: 'Dealer',
      accountNumber: 'CRED-100001',
      creditLimit: 150000,
      availableCredit: 134000,
      usedCredit: 16000,
      creditScore: 785,
      paymentTerms: 'Net 30',
      status: 'Active',
      riskLevel: 'Low',
      establishedDate: '2023-03-15',
      lastPaymentDate: '2024-11-28',
      lastPaymentAmount: 16222.50,
      daysPaymentHistory: [
        { period: '2024 Q4', averageDays: 28, onTimePayments: 8, latePayments: 1 },
        { period: '2024 Q3', averageDays: 26, onTimePayments: 12, latePayments: 0 },
        { period: '2024 Q2', averageDays: 24, onTimePayments: 10, latePayments: 1 },
        { period: '2024 Q1', averageDays: 29, onTimePayments: 9, latePayments: 2 }
      ],
      creditApplication: {
        businessName: 'Modern Office Solutions LLC',
        yearsInBusiness: 8,
        annualRevenue: 2500000,
        requestedLimit: 150000,
        references: ['First National Bank', 'Office Depot Trade Account', 'Steelcase Credit'],
        applicationDate: '2023-02-20',
        approvedBy: 'Jennifer Davis',
        approvalDate: '2023-03-15'
      },
      accountManager: 'Sarah Johnson',
      lastReviewDate: '2024-09-15',
      nextReviewDate: '2025-03-15'
    },
    {
      id: 'CRED-002',
      customerName: 'Corporate Spaces Ltd.',
      customerType: 'Direct',
      accountNumber: 'CRED-100002',
      creditLimit: 200000,
      availableCredit: 153444,
      usedCredit: 46556,
      creditScore: 698,
      paymentTerms: 'Net 45',
      status: 'Under Review',
      riskLevel: 'Medium',
      establishedDate: '2022-11-10',
      lastPaymentDate: '2024-10-15',
      lastPaymentAmount: 32000,
      daysPaymentHistory: [
        { period: '2024 Q4', averageDays: 38, onTimePayments: 5, latePayments: 3 },
        { period: '2024 Q3', averageDays: 42, onTimePayments: 7, latePayments: 2 },
        { period: '2024 Q2', averageDays: 45, onTimePayments: 6, latePayments: 3 },
        { period: '2024 Q1', averageDays: 48, onTimePayments: 4, latePayments: 4 }
      ],
      creditApplication: {
        businessName: 'Corporate Spaces Ltd.',
        yearsInBusiness: 12,
        annualRevenue: 4500000,
        requestedLimit: 200000,
        references: ['Wells Fargo Business', 'Herman Miller Credit', 'Knoll Trade Account'],
        applicationDate: '2022-10-05',
        approvedBy: 'Robert Wilson',
        approvalDate: '2022-11-10'
      },
      notes: 'Customer has extended payment pattern but always pays. Monitor closely.',
      accountManager: 'Jennifer Davis',
      lastReviewDate: '2024-11-10',
      nextReviewDate: '2025-05-10'
    },
    {
      id: 'CRED-003',
      customerName: 'Elite Furnishings LLC',
      customerType: 'Retailer',
      accountNumber: 'CRED-100003',
      creditLimit: 75000,
      availableCredit: 60645,
      usedCredit: 14355,
      creditScore: 742,
      paymentTerms: 'Net 30',
      status: 'Active',
      riskLevel: 'Low',
      establishedDate: '2024-01-20',
      lastPaymentDate: '2024-12-01',
      lastPaymentAmount: 15000,
      daysPaymentHistory: [
        { period: '2024 Q4', averageDays: 27, onTimePayments: 6, latePayments: 0 },
        { period: '2024 Q3', averageDays: 29, onTimePayments: 8, latePayments: 1 },
        { period: '2024 Q2', averageDays: 25, onTimePayments: 7, latePayments: 0 },
        { period: '2024 Q1', averageDays: 31, onTimePayments: 3, latePayments: 1 }
      ],
      creditApplication: {
        businessName: 'Elite Furnishings LLC',
        yearsInBusiness: 15,
        annualRevenue: 1200000,
        requestedLimit: 75000,
        references: ['Regional Bank', 'West Elm Trade', 'Pottery Barn Credit'],
        applicationDate: '2023-12-15',
        approvedBy: 'Mike Chen',
        approvalDate: '2024-01-20'
      },
      accountManager: 'Mike Chen',
      lastReviewDate: '2024-10-20',
      nextReviewDate: '2025-01-20'
    }
  ]);

  const [creditApplications] = useState<CreditApplication[]>([
    {
      id: 'APP-001',
      businessName: 'Tech Startup Furnishings',
      contactName: 'Alex Rodriguez',
      businessType: 'LLC',
      yearsInBusiness: 3,
      annualRevenue: 850000,
      requestedCreditLimit: 50000,
      paymentTermsRequested: 'Net 30',
      status: 'Under Review',
      applicationDate: '2024-12-05',
      businessAddress: {
        street: '123 Innovation Drive',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701'
      },
      bankReferences: [
        { bankName: 'Texas Capital Bank', accountType: 'Business Checking', yearsWithBank: 3 },
        { bankName: 'Chase Business', accountType: 'Line of Credit', yearsWithBank: 2 }
      ],
      tradeReferences: [
        { companyName: 'Office Depot', contactInfo: 'business@officedepot.com', creditLimit: 25000, paymentHistory: 'Excellent - Always pays within terms' },
        { companyName: 'Staples Business', contactInfo: 'credit@staples.com', creditLimit: 15000, paymentHistory: 'Good - Occasional 5-day delays' },
        { companyName: 'Amazon Business', contactInfo: 'b2b@amazon.com', creditLimit: 35000, paymentHistory: 'Excellent - Net 15 payment history' }
      ],
      documents: [
        { type: 'Business License', uploaded: true, uploadDate: '2024-12-05' },
        { type: 'Tax Returns (3 years)', uploaded: true, uploadDate: '2024-12-05' },
        { type: 'Bank Statements', uploaded: false },
        { type: 'Financial Statements', uploaded: true, uploadDate: '2024-12-06' }
      ],
      reviewedBy: 'Jennifer Davis',
      reviewNotes: 'Strong growth trajectory, good trade references. Awaiting bank statements.',
      lastUpdated: '2024-12-08'
    },
    {
      id: 'APP-002',
      businessName: 'Coastal Office Design',
      contactName: 'Maria Santos',
      businessType: 'Corporation',
      yearsInBusiness: 7,
      annualRevenue: 1800000,
      requestedCreditLimit: 100000,
      paymentTermsRequested: 'Net 45',
      status: 'Additional Info Required',
      applicationDate: '2024-11-28',
      businessAddress: {
        street: '456 Ocean View Blvd',
        city: 'San Diego',
        state: 'CA',
        zipCode: '92101'
      },
      bankReferences: [
        { bankName: 'Bank of America', accountType: 'Business Checking', yearsWithBank: 7 },
        { bankName: 'Wells Fargo', accountType: 'Equipment Financing', yearsWithBank: 4 }
      ],
      tradeReferences: [
        { companyName: 'Herman Miller', contactInfo: 'credit@hermanmiller.com', creditLimit: 50000, paymentHistory: 'Good - Occasional late payments' },
        { companyName: 'Steelcase', contactInfo: 'ar@steelcase.com', creditLimit: 40000, paymentHistory: 'Fair - 15-30 day payment delays' }
      ],
      documents: [
        { type: 'Business License', uploaded: true, uploadDate: '2024-11-28' },
        { type: 'Tax Returns (3 years)', uploaded: false },
        { type: 'Bank Statements', uploaded: true, uploadDate: '2024-11-29' },
        { type: 'Financial Statements', uploaded: false }
      ],
      reviewedBy: 'Robert Wilson',
      reviewNotes: 'Need updated financial statements and tax returns. Trade references show payment delays.',
      lastUpdated: '2024-12-02'
    }
  ]);

  const [selectedAccount, setSelectedAccount] = useState<CreditAccount | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<CreditApplication | null>(null);
  const [activeTab, setActiveTab] = useState<'accounts' | 'applications'>('accounts');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [riskFilter, setRiskFilter] = useState<string>('All');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Additional Info Required': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: CreditAccount['riskLevel']) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCreditUtilization = (used: number, limit: number) => {
    return ((used / limit) * 100).toFixed(1);
  };

  const filteredAccounts = creditAccounts.filter(account => {
    const matchesSearch = !searchTerm ||
      account.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || account.status === statusFilter;
    const matchesRisk = riskFilter === 'All' || account.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const filteredApplications = creditApplications.filter(app => {
    const matchesSearch = !searchTerm ||
      app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate summary metrics
  const totalCreditLimit = creditAccounts.reduce((sum, acc) => sum + acc.creditLimit, 0);
  const totalUsedCredit = creditAccounts.reduce((sum, acc) => sum + acc.usedCredit, 0);
  const avgCreditScore = creditAccounts.reduce((sum, acc) => sum + acc.creditScore, 0) / creditAccounts.length;
  const highRiskAccounts = creditAccounts.filter(acc => acc.riskLevel === 'High' || acc.riskLevel === 'Critical').length;
  const pendingApplications = creditApplications.filter(app => app.status === 'Pending' || app.status === 'Under Review').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-900">Credit Management</h3>
          <p className="text-gray-600">Manage customer credit accounts and applications</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            New Credit Application
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Credit Report
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Total Credit Limit</h4>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCreditLimit)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Used Credit</h4>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalUsedCredit)}</p>
          <p className="text-sm text-gray-600">{getCreditUtilization(totalUsedCredit, totalCreditLimit)}% utilization</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Avg Credit Score</h4>
          <p className="text-2xl font-bold text-green-600">{avgCreditScore.toFixed(0)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">High Risk</h4>
          <p className="text-2xl font-bold text-red-600">{highRiskAccounts}</p>
          <p className="text-sm text-gray-600">Accounts</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Pending Apps</h4>
          <p className="text-2xl font-bold text-yellow-600">{pendingApplications}</p>
          <p className="text-sm text-gray-600">Need review</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('accounts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'accounts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors`}
            >
              Credit Accounts ({creditAccounts.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors`}
            >
              Applications ({creditApplications.length})
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={activeTab === 'accounts' ? "Customer name or account..." : "Business name or contact..."}
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
                {activeTab === 'accounts' ? (
                  <>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Closed">Closed</option>
                  </>
                ) : (
                  <>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Additional Info Required">Additional Info Required</option>
                  </>
                )}
              </select>
            </div>
            {activeTab === 'accounts' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="All">All Risk Levels</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            )}
            <div className="flex items-end">
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                Advanced Filters
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'accounts' ? (
            <div className="space-y-6">
              {/* Credit Accounts Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit Limit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilization
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Credit Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
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
                    {filteredAccounts.map((account) => {
                      const utilization = parseFloat(getCreditUtilization(account.usedCredit, account.creditLimit));
                      return (
                        <tr key={account.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{account.customerName}</p>
                              <p className="text-sm text-gray-500">{account.accountNumber}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{formatCurrency(account.creditLimit)}</p>
                              <p className="text-sm text-gray-500">Available: {formatCurrency(account.availableCredit)}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{utilization}%</p>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`h-2 rounded-full ${
                                    utilization > 80 ? 'bg-red-600' : 
                                    utilization > 60 ? 'bg-yellow-600' : 'bg-green-600'
                                  }`} 
                                  style={{ width: `${Math.min(utilization, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className={`text-sm font-medium ${
                              account.creditScore >= 750 ? 'text-green-600' :
                              account.creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {account.creditScore}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(account.riskLevel)}`}>
                              {account.riskLevel}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(account.status)}`}>
                              {account.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setSelectedAccount(account)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                View
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">Edit</button>
                              <button className="text-green-600 hover:text-green-900">Review</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Credit Applications Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Business Information
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requested Credit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Business Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documents
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
                    {filteredApplications.map((application) => {
                      const uploadedDocs = application.documents.filter(doc => doc.uploaded).length;
                      return (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{application.businessName}</p>
                              <p className="text-sm text-gray-500">{application.contactName}</p>
                              <p className="text-sm text-gray-500">{application.businessType}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{formatCurrency(application.requestedCreditLimit)}</p>
                              <p className="text-sm text-gray-500">{application.paymentTermsRequested}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm text-gray-900">{application.yearsInBusiness} years</p>
                              <p className="text-sm text-gray-500">{formatCurrency(application.annualRevenue)} revenue</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="text-sm text-gray-900">{uploadedDocs}/{application.documents.length} uploaded</p>
                              <div className="w-12 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${(uploadedDocs / application.documents.length) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setSelectedApplication(application)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Review
                              </button>
                              <button className="text-green-600 hover:text-green-900">Approve</button>
                              <button className="text-red-600 hover:text-red-900">Reject</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Credit Account Details Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{selectedAccount.customerName}</h3>
                  <p className="text-gray-600">Account: {selectedAccount.accountNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Credit Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Credit Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Credit Limit</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(selectedAccount.creditLimit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Used Credit</span>
                        <span className="text-sm text-gray-900">{formatCurrency(selectedAccount.usedCredit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Available</span>
                        <span className="text-sm font-bold text-green-600">{formatCurrency(selectedAccount.availableCredit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Utilization</span>
                        <span className="text-sm text-gray-900">{getCreditUtilization(selectedAccount.usedCredit, selectedAccount.creditLimit)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Credit Score</span>
                        <span className={`text-sm font-bold ${
                          selectedAccount.creditScore >= 750 ? 'text-green-600' :
                          selectedAccount.creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {selectedAccount.creditScore}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Payment Terms</span>
                        <span className="text-sm text-gray-900">{selectedAccount.paymentTerms}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Account Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Status</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAccount.status)}`}>
                          {selectedAccount.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Risk Level</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(selectedAccount.riskLevel)}`}>
                          {selectedAccount.riskLevel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Account Manager</span>
                        <span className="text-sm text-gray-900">{selectedAccount.accountManager}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Established</span>
                        <span className="text-sm text-gray-900">{selectedAccount.establishedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Next Review</span>
                        <span className="text-sm text-gray-900">{selectedAccount.nextReviewDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment History */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Payment History</h4>
                    <div className="space-y-3">
                      {selectedAccount.daysPaymentHistory.map((period, index) => (
                        <div key={index} className="border border-gray-200 rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-900">{period.period}</span>
                            <span className={`text-sm font-medium ${
                              period.averageDays <= 30 ? 'text-green-600' :
                              period.averageDays <= 45 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {period.averageDays} days avg
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>On-time: {period.onTimePayments}</span>
                            <span>Late: {period.latePayments}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(period.onTimePayments / (period.onTimePayments + period.latePayments)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedAccount.lastPaymentDate && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Payment</h4>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Last Payment</span>
                          <span className="text-sm font-bold text-green-600">{formatCurrency(selectedAccount.lastPaymentAmount!)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm text-gray-600">Payment Date</span>
                          <span className="text-sm text-gray-900">{selectedAccount.lastPaymentDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Application Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Original Application</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Business Name</span>
                        <span className="text-sm text-gray-900">{selectedAccount.creditApplication.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Years in Business</span>
                        <span className="text-sm text-gray-900">{selectedAccount.creditApplication.yearsInBusiness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Annual Revenue</span>
                        <span className="text-sm text-gray-900">{formatCurrency(selectedAccount.creditApplication.annualRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Requested Limit</span>
                        <span className="text-sm text-gray-900">{formatCurrency(selectedAccount.creditApplication.requestedLimit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Approved By</span>
                        <span className="text-sm text-gray-900">{selectedAccount.creditApplication.approvedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Approval Date</span>
                        <span className="text-sm text-gray-900">{selectedAccount.creditApplication.approvalDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">References</h4>
                    <div className="space-y-2">
                      {selectedAccount.creditApplication.references.map((ref, index) => (
                        <div key={index} className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                          {ref}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedAccount.notes && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
                      <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded">{selectedAccount.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
                <button
                  onClick={() => setSelectedAccount(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Adjust Credit Limit
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  Schedule Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditManagement;