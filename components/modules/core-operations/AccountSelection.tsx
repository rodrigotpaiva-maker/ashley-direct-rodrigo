import React, { useState } from 'react';
import { 
  BuildingOfficeIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Account {
  id: string;
  name: string;
  type: 'dealer' | 'distributor' | 'licensee';
  location: string;
  status: 'active' | 'inactive' | 'pending';
  revenue: string;
  lastActive: string;
  accountNumber: string;
  territory: string;
}

interface AccountSelectionProps {
  className?: string;
}

const AccountSelection: React.FC<AccountSelectionProps> = ({ className = '' }) => {
  const [selectedAccount, setSelectedAccount] = useState<string>('ACC-001');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const accounts: Account[] = [
    {
      id: 'ACC-001',
      name: 'Premier Furniture Store',
      type: 'dealer',
      location: 'Atlanta, GA',
      status: 'active',
      revenue: '$2.4M',
      lastActive: '2 hours ago',
      accountNumber: 'D-2024-0847',
      territory: 'Southeast'
    },
    {
      id: 'ACC-002',
      name: 'HomeStyle Distribution Center',
      type: 'distributor',
      location: 'Chicago, IL',
      status: 'active',
      revenue: '$8.7M',
      lastActive: '1 day ago',
      accountNumber: 'DT-2024-0312',
      territory: 'Midwest'
    },
    {
      id: 'ACC-003',
      name: 'Comfort Living Showroom',
      type: 'dealer',
      location: 'Phoenix, AZ',
      status: 'active',
      revenue: '$1.8M',
      lastActive: '5 hours ago',
      accountNumber: 'D-2024-0523',
      territory: 'Southwest'
    },
    {
      id: 'ACC-004',
      name: 'Luxury Furnishings LLC',
      type: 'licensee',
      location: 'Miami, FL',
      status: 'active',
      revenue: '$3.2M',
      lastActive: '3 hours ago',
      accountNumber: 'L-2024-0198',
      territory: 'Southeast'
    },
    {
      id: 'ACC-005',
      name: 'Modern Living Solutions',
      type: 'dealer',
      location: 'Denver, CO',
      status: 'pending',
      revenue: '$950K',
      lastActive: '1 week ago',
      accountNumber: 'D-2024-0671',
      territory: 'Mountain West'
    },
    {
      id: 'ACC-006',
      name: 'Elite Home Furnishings',
      type: 'dealer',
      location: 'Boston, MA',
      status: 'inactive',
      revenue: '$1.1M',
      lastActive: '2 weeks ago',
      accountNumber: 'D-2024-0295',
      territory: 'Northeast'
    }
  ];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || account.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dealer': return BuildingOfficeIcon;
      case 'distributor': return UserGroupIcon;
      case 'licensee': return CurrencyDollarIcon;
      default: return BuildingOfficeIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dealer': return 'bg-blue-100 text-blue-800';
      case 'distributor': return 'bg-purple-100 text-purple-800';
      case 'licensee': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentAccount = accounts.find(account => account.id === selectedAccount);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Selection</h1>
            <p className="text-gray-600 mt-1">Manage and switch between multiple dealer accounts</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusIcon className="w-4 h-4" />
            <span>Add Account</span>
          </button>
        </div>
      </div>

      {/* Current Account Info */}
      {currentAccount && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Currently Active Account</h2>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-blue-100 text-sm">Account Name</p>
                  <p className="text-lg font-semibold">{currentAccount.name}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Account Number</p>
                  <p className="text-lg font-semibold">{currentAccount.accountNumber}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Territory</p>
                  <p className="text-lg font-semibold">{currentAccount.territory}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">Annual Revenue</p>
              <p className="text-2xl font-bold">{currentAccount.revenue}</p>
              <p className="text-blue-200 text-sm mt-1">Last active: {currentAccount.lastActive}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search accounts by name, location, or account number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Account Types</option>
              <option value="dealer">Dealers</option>
              <option value="distributor">Distributors</option>
              <option value="licensee">Licensees</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => {
          const TypeIcon = getTypeIcon(account.type);
          const isSelected = account.id === selectedAccount;
          
          return (
            <div 
              key={account.id}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'border-blue-500 shadow-lg transform scale-105' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedAccount(account.id)}
            >
              <div className="p-6">
                {/* Account Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      getTypeColor(account.type).replace('text-', 'text-white bg-').replace('-100', '-600')
                    }`}>
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{account.name}</h3>
                      <p className="text-sm text-gray-600">{account.accountNumber}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                  )}
                </div>

                {/* Account Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      getTypeColor(account.type)
                    }`}>
                      {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      getStatusColor(account.status)
                    }`}>
                      {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Location</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-900">
                      <MapPinIcon className="w-3 h-3" />
                      <span>{account.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="text-sm font-semibold text-green-600">{account.revenue}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Active</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <ClockIcon className="w-3 h-3" />
                      <span>{account.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  {isSelected ? (
                    <div className="flex items-center justify-center space-x-2 py-2 text-blue-600 font-medium">
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Currently Active</span>
                    </div>
                  ) : (
                    <button 
                      className="w-full flex items-center justify-center space-x-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAccount(account.id);
                      }}
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                      <span>Switch to Account</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Portfolio Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{accounts.length}</div>
            <div className="text-sm text-gray-600">Total Accounts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {accounts.filter(a => a.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Accounts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {accounts.filter(a => a.type === 'dealer').length}
            </div>
            <div className="text-sm text-gray-600">Dealers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {accounts.filter(a => a.type === 'distributor').length}
            </div>
            <div className="text-sm text-gray-600">Distributors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSelection;