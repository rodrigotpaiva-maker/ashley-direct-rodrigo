import React, { useState } from 'react';
import { Calculator, BarChart3, FileText, TrendingUp, DollarSign, PieChart, BookOpen, Target, Plus, Search } from 'lucide-react';

interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
  parentAccount?: string;
  isActive: boolean;
}

interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  entries: {
    account: string;
    debit?: number;
    credit?: number;
  }[];
  total: number;
}

const AccountingSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chart-of-accounts');
  const [searchTerm, setSearchTerm] = useState('');

  const [accounts] = useState<Account[]>([
    { id: '1', code: '1000', name: 'Cash - Operating Account', type: 'asset', balance: 485750, isActive: true },
    { id: '2', code: '1100', name: 'Accounts Receivable', type: 'asset', balance: 892400, isActive: true },
    { id: '3', code: '1200', name: 'Inventory - Raw Materials', type: 'asset', balance: 2450000, isActive: true },
    { id: '4', code: '1210', name: 'Inventory - Finished Goods', type: 'asset', balance: 1875000, isActive: true },
    { id: '5', code: '1500', name: 'Equipment', type: 'asset', balance: 750000, isActive: true },
    { id: '6', code: '2000', name: 'Accounts Payable', type: 'liability', balance: 425000, isActive: true },
    { id: '7', code: '2100', name: 'Notes Payable', type: 'liability', balance: 500000, isActive: true },
    { id: '8', code: '3000', name: 'Owner\'s Equity', type: 'equity', balance: 2500000, isActive: true },
    { id: '9', code: '4000', name: 'Sales Revenue', type: 'revenue', balance: 8750000, isActive: true },
    { id: '10', code: '5000', name: 'Cost of Goods Sold', type: 'expense', balance: 5250000, isActive: true },
    { id: '11', code: '6000', name: 'Operating Expenses', type: 'expense', balance: 1875000, isActive: true }
  ]);

  const [journalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-03-01',
      reference: 'JE-001',
      description: 'Sale of furniture to Smith Furniture Store',
      entries: [
        { account: '1100', debit: 15750 },
        { account: '4000', credit: 15750 }
      ],
      total: 15750
    },
    {
      id: '2',
      date: '2024-03-02',
      reference: 'JE-002',
      description: 'Purchase of raw materials',
      entries: [
        { account: '1200', debit: 25000 },
        { account: '2000', credit: 25000 }
      ],
      total: 25000
    },
    {
      id: '3',
      date: '2024-03-03',
      reference: 'JE-003',
      description: 'Payment of operating expenses',
      entries: [
        { account: '6000', debit: 8500 },
        { account: '1000', credit: 8500 }
      ],
      total: 8500
    }
  ]);

  const getAccountTypeColor = (type: Account['type']) => {
    switch (type) {
      case 'asset': return 'bg-blue-100 text-blue-800';
      case 'liability': return 'bg-red-100 text-red-800';
      case 'equity': return 'bg-purple-100 text-purple-800';
      case 'revenue': return 'bg-green-100 text-green-800';
      case 'expense': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.code.includes(searchTerm)
  );

  const totalAssets = accounts
    .filter(a => a.type === 'asset')
    .reduce((sum, a) => sum + a.balance, 0);

  const totalLiabilities = accounts
    .filter(a => a.type === 'liability')
    .reduce((sum, a) => sum + a.balance, 0);

  const totalEquity = accounts
    .filter(a => a.type === 'equity')
    .reduce((sum, a) => sum + a.balance, 0);

  const totalRevenue = accounts
    .filter(a => a.type === 'revenue')
    .reduce((sum, a) => sum + a.balance, 0);

  const totalExpenses = accounts
    .filter(a => a.type === 'expense')
    .reduce((sum, a) => sum + a.balance, 0);

  const netIncome = totalRevenue - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Accounting Suite</h1>
          <p className="text-xl text-gray-600">
            Complete accounting solution with chart of accounts, journal entries, and financial statements.
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-blue-600">${totalAssets.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Liabilities</p>
                <p className="text-2xl font-bold text-red-600">${totalLiabilities.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Equity</p>
                <p className="text-2xl font-bold text-purple-600">${totalEquity.toLocaleString()}</p>
              </div>
              <PieChart className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Income</p>
                <p className="text-2xl font-bold text-indigo-600">${netIncome.toLocaleString()}</p>
              </div>
              <Target className="w-6 h-6 text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'chart-of-accounts', name: 'Chart of Accounts', icon: BookOpen },
                { id: 'journal-entries', name: 'Journal Entries', icon: FileText },
                { id: 'trial-balance', name: 'Trial Balance', icon: Calculator },
                { id: 'financial-statements', name: 'Financial Statements', icon: BarChart3 }
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
            {/* Chart of Accounts Tab */}
            {activeTab === 'chart-of-accounts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Chart of Accounts</h2>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search accounts..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Plus className="w-4 h-4" />
                      New Account
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAccounts.map((account) => (
                        <tr key={account.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {account.code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {account.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccountTypeColor(account.type)}`}>
                              {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${account.balance.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              account.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {account.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Journal Entries Tab */}
            {activeTab === 'journal-entries' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Journal Entries</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                    New Journal Entry
                  </button>
                </div>
                <div className="space-y-6">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{entry.reference}</h3>
                          <p className="text-sm text-gray-600">{entry.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</div>
                          <div className="text-lg font-bold text-gray-900">${entry.total.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Account</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Debit</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Credit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {entry.entries.map((entryLine, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-4 py-2 text-sm text-gray-900">{entryLine.account}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {entryLine.debit ? `$${entryLine.debit.toLocaleString()}` : '-'}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {entryLine.credit ? `$${entryLine.credit.toLocaleString()}` : '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trial Balance Tab */}
            {activeTab === 'trial-balance' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Trial Balance</h2>
                <div className="text-sm text-gray-600 mb-4">As of March 31, 2024</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {accounts.map((account) => {
                        const isDebitAccount = ['asset', 'expense'].includes(account.type);
                        return (
                          <tr key={account.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {account.code} - {account.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                              {isDebitAccount ? `$${account.balance.toLocaleString()}` : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                              {!isDebitAccount ? `$${account.balance.toLocaleString()}` : '-'}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="bg-gray-50 font-bold">
                        <td className="px-6 py-4 text-sm text-gray-900">TOTALS</td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900">
                          ${(totalAssets + totalExpenses).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-900">
                          ${(totalLiabilities + totalEquity + totalRevenue).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Financial Statements Tab */}
            {activeTab === 'financial-statements' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Financial Statements</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Balance Sheet */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Balance Sheet</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">ASSETS</h4>
                        {accounts.filter(a => a.type === 'asset').map(account => (
                          <div key={account.id} className="flex justify-between text-sm">
                            <span>{account.name}</span>
                            <span>${account.balance.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 font-semibold flex justify-between">
                          <span>Total Assets</span>
                          <span>${totalAssets.toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">LIABILITIES</h4>
                        {accounts.filter(a => a.type === 'liability').map(account => (
                          <div key={account.id} className="flex justify-between text-sm">
                            <span>{account.name}</span>
                            <span>${account.balance.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 font-semibold flex justify-between">
                          <span>Total Liabilities</span>
                          <span>${totalLiabilities.toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">EQUITY</h4>
                        {accounts.filter(a => a.type === 'equity').map(account => (
                          <div key={account.id} className="flex justify-between text-sm">
                            <span>{account.name}</span>
                            <span>${account.balance.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 font-semibold flex justify-between">
                          <span>Total Equity</span>
                          <span>${(totalEquity + netIncome).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Income Statement */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Statement</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">REVENUE</h4>
                        {accounts.filter(a => a.type === 'revenue').map(account => (
                          <div key={account.id} className="flex justify-between text-sm">
                            <span>{account.name}</span>
                            <span>${account.balance.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 font-semibold flex justify-between">
                          <span>Total Revenue</span>
                          <span>${totalRevenue.toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">EXPENSES</h4>
                        {accounts.filter(a => a.type === 'expense').map(account => (
                          <div key={account.id} className="flex justify-between text-sm">
                            <span>{account.name}</span>
                            <span>${account.balance.toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 font-semibold flex justify-between">
                          <span>Total Expenses</span>
                          <span>${totalExpenses.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="border-t-2 border-gray-300 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Net Income</span>
                          <span className={netIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
                            ${netIncome.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingSuite;