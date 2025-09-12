import React, { useState } from 'react';
import { 
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface ZipCode {
  id: string;
  zipCode: string;
  city: string;
  state: string;
  county: string;
  territory: string;
  status: 'active' | 'inactive';
  serviceType: 'delivery' | 'pickup' | 'both';
  deliveryFee: string;
  notes: string;
  lastUpdated: string;
}

interface MyZipCodesProps {
  className?: string;
}

const MyZipCodes: React.FC<MyZipCodesProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerritory, setFilterTerritory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddZipCode, setShowAddZipCode] = useState(false);
  const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);

  const zipCodes: ZipCode[] = [
    {
      id: '1',
      zipCode: '30309',
      city: 'Atlanta',
      state: 'GA',
      county: 'Fulton',
      territory: 'Southeast',
      status: 'active',
      serviceType: 'both',
      deliveryFee: '$75.00',
      notes: 'High-volume delivery area with frequent orders',
      lastUpdated: '2024-03-10'
    },
    {
      id: '2',
      zipCode: '30308',
      city: 'Atlanta',
      state: 'GA',
      county: 'Fulton',
      territory: 'Southeast',
      status: 'active',
      serviceType: 'delivery',
      deliveryFee: '$75.00',
      notes: 'Standard delivery zone',
      lastUpdated: '2024-03-08'
    },
    {
      id: '3',
      zipCode: '30307',
      city: 'Atlanta',
      state: 'GA',
      county: 'DeKalb',
      territory: 'Southeast',
      status: 'active',
      serviceType: 'both',
      deliveryFee: '$85.00',
      notes: 'Extended delivery area with additional surcharge',
      lastUpdated: '2024-03-05'
    },
    {
      id: '4',
      zipCode: '30306',
      city: 'Atlanta',
      state: 'GA',
      county: 'Fulton',
      territory: 'Southeast',
      status: 'inactive',
      serviceType: 'pickup',
      deliveryFee: '$0.00',
      notes: 'Pickup only due to access restrictions',
      lastUpdated: '2024-02-28'
    },
    {
      id: '5',
      zipCode: '33101',
      city: 'Miami',
      state: 'FL',
      county: 'Miami-Dade',
      territory: 'Southeast',
      status: 'active',
      serviceType: 'both',
      deliveryFee: '$95.00',
      notes: 'Premium delivery area with white-glove service',
      lastUpdated: '2024-03-12'
    },
    {
      id: '6',
      zipCode: '33102',
      city: 'Miami',
      state: 'FL',
      county: 'Miami-Dade',
      territory: 'Southeast',
      status: 'active',
      serviceType: 'delivery',
      deliveryFee: '$85.00',
      notes: 'Business district with building access requirements',
      lastUpdated: '2024-03-01'
    },
    {
      id: '7',
      zipCode: '85001',
      city: 'Phoenix',
      state: 'AZ',
      county: 'Maricopa',
      territory: 'Southwest',
      status: 'active',
      serviceType: 'both',
      deliveryFee: '$65.00',
      notes: 'Desert climate considerations for delivery',
      lastUpdated: '2024-03-07'
    },
    {
      id: '8',
      zipCode: '60607',
      city: 'Chicago',
      state: 'IL',
      county: 'Cook',
      territory: 'Midwest',
      status: 'active',
      serviceType: 'both',
      deliveryFee: '$70.00',
      notes: 'Urban delivery with parking restrictions',
      lastUpdated: '2024-03-09'
    }
  ];

  const territories = ['Southeast', 'Southwest', 'Midwest', 'Northeast', 'Northwest'];

  const filteredZipCodes = zipCodes.filter(zipCode => {
    const matchesSearch = 
      zipCode.zipCode.includes(searchTerm) ||
      zipCode.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      zipCode.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTerritory = filterTerritory === 'all' || zipCode.territory === filterTerritory;
    const matchesStatus = filterStatus === 'all' || zipCode.status === filterStatus;
    
    return matchesSearch && matchesTerritory && matchesStatus;
  });

  const getServiceTypeIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'delivery': return TruckIcon;
      case 'pickup': return BuildingOfficeIcon;
      case 'both': return GlobeAltIcon;
      default: return MapPinIcon;
    }
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'delivery': return 'bg-blue-100 text-blue-800';
      case 'pickup': return 'bg-green-100 text-green-800';
      case 'both': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleSelectZipCode = (zipCodeId: string) => {
    setSelectedZipCodes(prev => 
      prev.includes(zipCodeId) 
        ? prev.filter(id => id !== zipCodeId)
        : [...prev, zipCodeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedZipCodes.length === filteredZipCodes.length) {
      setSelectedZipCodes([]);
    } else {
      setSelectedZipCodes(filteredZipCodes.map(zc => zc.id));
    }
  };

  const territoryStats = territories.map(territory => ({
    territory,
    count: zipCodes.filter(zc => zc.territory === territory).length,
    active: zipCodes.filter(zc => zc.territory === territory && zc.status === 'active').length
  }));

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPinIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Zip Codes</h1>
              <p className="text-gray-600 mt-1">Territory and delivery zone management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {selectedZipCodes.length > 0 && (
              <div className="flex items-center space-x-2 mr-4">
                <span className="text-sm text-gray-600">{selectedZipCodes.length} selected</span>
                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                  Bulk Delete
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Bulk Edit
                </button>
              </div>
            )}
            <button 
              onClick={() => setShowAddZipCode(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Zip Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by zip code, city, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={filterTerritory}
              onChange={(e) => setFilterTerritory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Territories</option>
              {territories.map(territory => (
                <option key={territory} value={territory}>{territory}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zip Codes Table */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Zip Code Directory</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedZipCodes.length === filteredZipCodes.length && filteredZipCodes.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-6 py-3 text-left">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zip Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Territory
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee
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
                {filteredZipCodes.map((zipCode) => {
                  const ServiceIcon = getServiceTypeIcon(zipCode.serviceType);
                  return (
                    <tr key={zipCode.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedZipCodes.includes(zipCode.id)}
                          onChange={() => handleSelectZipCode(zipCode.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{zipCode.zipCode}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{zipCode.city}, {zipCode.state}</div>
                          <div className="text-sm text-gray-500">{zipCode.county} County</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{zipCode.territory}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            getServiceTypeColor(zipCode.serviceType).replace('text-', 'text-white bg-').replace('-100', '-600')
                          }`}>
                            <ServiceIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            getServiceTypeColor(zipCode.serviceType)
                          }`}>
                            {zipCode.serviceType.charAt(0).toUpperCase() + zipCode.serviceType.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-green-600">{zipCode.deliveryFee}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          getStatusColor(zipCode.status)
                        }`}>
                          {zipCode.status === 'active' ? (
                            <div className="flex items-center space-x-1">
                              <CheckCircleIcon className="w-3 h-3" />
                              <span>Active</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <XCircleIcon className="w-3 h-3" />
                              <span>Inactive</span>
                            </div>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Territory Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Territory Summary</h3>
            <div className="space-y-3">
              {territoryStats.map((stat) => (
                <div key={stat.territory} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{stat.territory}</span>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">{stat.active}</span>
                    <span className="text-gray-500">/{stat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Zip Codes</span>
                <span className="font-semibold text-gray-900">{zipCodes.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Zones</span>
                <span className="font-semibold text-green-600">
                  {zipCodes.filter(zc => zc.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Delivery Available</span>
                <span className="font-semibold text-blue-600">
                  {zipCodes.filter(zc => zc.serviceType === 'delivery' || zc.serviceType === 'both').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pickup Only</span>
                <span className="font-semibold text-orange-600">
                  {zipCodes.filter(zc => zc.serviceType === 'pickup').length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Import Zip Codes
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Export Coverage Map
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Update Delivery Fees
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Territory Analysis
              </button>
            </div>
          </div>

          {/* Coverage Map Preview */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Coverage Map</h3>
            <div className="aspect-square bg-white rounded-lg border border-blue-200 p-4 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-600">Interactive coverage map</p>
                <p className="text-xs text-blue-500 mt-1">Click to view detailed map</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyZipCodes;