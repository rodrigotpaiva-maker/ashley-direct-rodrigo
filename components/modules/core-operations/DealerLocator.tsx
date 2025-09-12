import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  StarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Dealer {
  id: string;
  name: string;
  type: 'dealer' | 'distributor' | 'licensee';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  territory: string;
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  specialties: string[];
  services: string[];
  operatingHours: string;
  distance?: number;
  coordinates: { lat: number; lng: number };
  accountManager: string;
  joinDate: string;
  lastOrder: string;
  totalOrders: number;
  certifications: string[];
}

interface DealerLocatorProps {
  className?: string;
}

const DealerLocator: React.FC<DealerLocatorProps> = ({ className = '' }) => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState(50);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('active');
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const dealers: Dealer[] = [
    {
      id: '1',
      name: 'Premier Furniture Store',
      type: 'dealer',
      address: '1234 Main Street',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30309',
      phone: '(555) 123-4567',
      email: 'info@premierfurniture.com',
      website: 'www.premierfurniture.com',
      territory: 'Southeast',
      status: 'active',
      rating: 4.8,
      specialties: ['Living Room', 'Bedroom', 'Dining Room'],
      services: ['Delivery', 'Assembly', 'Design Consultation'],
      operatingHours: 'Mon-Sat 9AM-8PM, Sun 12PM-6PM',
      distance: 2.3,
      coordinates: { lat: 33.7490, lng: -84.3880 },
      accountManager: 'John Anderson',
      joinDate: '2019-03-15',
      lastOrder: '2024-03-10',
      totalOrders: 1247,
      certifications: ['Ashley Pro', 'Design Specialist']
    },
    {
      id: '2',
      name: 'HomeStyle Distribution Center',
      type: 'distributor',
      address: '567 Commerce Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60607',
      phone: '(555) 234-5678',
      email: 'orders@homestyledist.com',
      territory: 'Midwest',
      status: 'active',
      rating: 4.6,
      specialties: ['Wholesale Distribution', 'Logistics'],
      services: ['Warehousing', 'Regional Distribution', 'Inventory Management'],
      operatingHours: 'Mon-Fri 7AM-6PM',
      distance: 285.7,
      coordinates: { lat: 41.8781, lng: -87.6298 },
      accountManager: 'Sarah Wilson',
      joinDate: '2018-07-20',
      lastOrder: '2024-03-08',
      totalOrders: 3892,
      certifications: ['Certified Distributor', 'Logistics Partner']
    },
    {
      id: '3',
      name: 'Comfort Living Showroom',
      type: 'dealer',
      address: '890 Furniture Row',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      phone: '(555) 345-6789',
      email: 'sales@comfortliving.com',
      website: 'www.comfortliving.com',
      territory: 'Southwest',
      status: 'active',
      rating: 4.5,
      specialties: ['Recliners', 'Sectionals', 'Mattresses'],
      services: ['Delivery', 'Financing', 'Trade-in Program'],
      operatingHours: 'Mon-Sat 10AM-7PM, Sun 12PM-5PM',
      distance: 1050.2,
      coordinates: { lat: 33.4484, lng: -112.0740 },
      accountManager: 'Mike Roberts',
      joinDate: '2020-01-10',
      lastOrder: '2024-03-05',
      totalOrders: 892,
      certifications: ['Ashley Certified']
    },
    {
      id: '4',
      name: 'Luxury Furnishings LLC',
      type: 'licensee',
      address: '890 Design Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      phone: '(555) 456-7890',
      email: 'contact@luxuryfurn.com',
      website: 'www.luxuryfurnishings.com',
      territory: 'Southeast',
      status: 'active',
      rating: 4.9,
      specialties: ['High-End Collections', 'Custom Design', 'Premium Services'],
      services: ['White Glove Delivery', 'Interior Design', 'Custom Orders'],
      operatingHours: 'Mon-Fri 10AM-6PM, Sat 10AM-5PM',
      distance: 662.5,
      coordinates: { lat: 25.7617, lng: -80.1918 },
      accountManager: 'Emily Davis',
      joinDate: '2017-11-03',
      lastOrder: '2024-03-12',
      totalOrders: 567,
      certifications: ['Licensed Dealer', 'Premium Partner']
    },
    {
      id: '5',
      name: 'Modern Living Solutions',
      type: 'dealer',
      address: '456 Contemporary Way',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
      phone: '(555) 567-8901',
      email: 'info@modernliving.com',
      territory: 'Mountain West',
      status: 'pending',
      rating: 4.2,
      specialties: ['Modern Furniture', 'Space-Saving Solutions'],
      services: ['Delivery', 'Assembly', 'Returns'],
      operatingHours: 'Mon-Sat 9AM-7PM, Sun 11AM-5PM',
      distance: 1204.8,
      coordinates: { lat: 39.7392, lng: -104.9903 },
      accountManager: 'Tom Wilson',
      joinDate: '2023-09-15',
      lastOrder: '2024-02-28',
      totalOrders: 156,
      certifications: ['New Dealer Training']
    }
  ];

  const filteredDealers = dealers.filter(dealer => {
    const matchesType = filterType === 'all' || dealer.type === filterType;
    const matchesStatus = filterStatus === 'all' || dealer.status === filterStatus;
    const withinRadius = !dealer.distance || dealer.distance <= searchRadius;
    const matchesLocation = !searchLocation || 
      dealer.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
      dealer.state.toLowerCase().includes(searchLocation.toLowerCase()) ||
      dealer.zipCode.includes(searchLocation);
    
    return matchesType && matchesStatus && withinRadius && matchesLocation;
  });

  const getDealerTypeIcon = (type: string) => {
    switch (type) {
      case 'dealer': return BuildingOfficeIcon;
      case 'distributor': return UserGroupIcon;
      case 'licensee': return StarIcon;
      default: return BuildingOfficeIcon;
    }
  };

  const getDealerTypeColor = (type: string) => {
    switch (type) {
      case 'dealer': return 'bg-blue-100 text-blue-800';
      case 'distributor': return 'bg-purple-100 text-purple-800';
      case 'licensee': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIconSolid 
        key={i} 
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'
        }`} 
      />
    ));
  };

  const nearbyDealers = dealers.filter(dealer => dealer.distance && dealer.distance <= 25).slice(0, 3);
  const topRatedDealers = dealers.filter(dealer => dealer.rating >= 4.5).slice(0, 3);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dealer Locator</h1>
              <p className="text-gray-600 mt-1">Network discovery and partnership opportunities</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter city, state, or zip code"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={10}>Within 10 miles</option>
              <option value={25}>Within 25 miles</option>
              <option value={50}>Within 50 miles</option>
              <option value={100}>Within 100 miles</option>
              <option value={500}>Within 500 miles</option>
            </select>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="dealer">Dealers</option>
              <option value="distributor">Distributors</option>
              <option value="licensee">Licensees</option>
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dealer List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {filteredDealers.length} Dealers Found
            </h3>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>Sort by Distance</option>
              <option>Sort by Rating</option>
              <option>Sort by Name</option>
              <option>Sort by Type</option>
            </select>
          </div>

          {filteredDealers.map((dealer) => {
            const TypeIcon = getDealerTypeIcon(dealer.type);
            return (
              <div 
                key={dealer.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => setSelectedDealer(dealer)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      getDealerTypeColor(dealer.type).replace('text-', 'text-white bg-').replace('-100', '-600')
                    }`}>
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">{dealer.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          getDealerTypeColor(dealer.type)
                        }`}>
                          {dealer.type.charAt(0).toUpperCase() + dealer.type.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(dealer.rating)}
                        <span className="text-sm text-gray-600 ml-2">{dealer.rating} stars</span>
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <MapPinIcon className="w-3 h-3" />
                          <span>{dealer.address}, {dealer.city}, {dealer.state} {dealer.zipCode}</span>
                          {dealer.distance && (
                            <span className="text-blue-600 font-medium">({dealer.distance} miles)</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <PhoneIcon className="w-3 h-3" />
                          <span>{dealer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <ClockIcon className="w-3 h-3" />
                          <span>{dealer.operatingHours}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {dealer.specialties.slice(0, 3).map((specialty, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {specialty}
                          </span>
                        ))}
                        {dealer.specialties.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{dealer.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          getStatusColor(dealer.status)
                        }`}>
                          {dealer.status.charAt(0).toUpperCase() + dealer.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Account Manager: {dealer.accountManager}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <MapPinIcon className="w-3 h-3" />
                      <span>Directions</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                      <InformationCircleIcon className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Found</span>
                <span className="font-semibold text-gray-900">{filteredDealers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Dealers</span>
                <span className="font-semibold text-green-600">
                  {filteredDealers.filter(d => d.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Rating</span>
                <span className="font-semibold text-yellow-600">
                  {(filteredDealers.reduce((sum, d) => sum + d.rating, 0) / filteredDealers.length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Nearby Dealers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Dealers</h3>
            <div className="space-y-3">
              {nearbyDealers.map((dealer) => (
                <div key={dealer.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    getDealerTypeColor(dealer.type).replace('text-', 'text-white bg-').replace('-100', '-600')
                  }`}>
                    <BuildingOfficeIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{dealer.name}</p>
                    <p className="text-xs text-gray-600">{dealer.distance} miles away</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Rated */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Rated</h3>
            <div className="space-y-3">
              {topRatedDealers.map((dealer) => (
                <div key={dealer.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <StarIconSolid className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{dealer.name}</p>
                    <div className="flex items-center space-x-1">
                      {renderStars(dealer.rating)}
                      <span className="text-xs text-gray-600 ml-1">{dealer.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Dealers with Delivery
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Design Services Available
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Weekend Hours
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                High Volume Partners
              </button>
            </div>
          </div>

          {/* Map Preview */}
          {viewMode === 'list' && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Map View</h3>
              <div className="aspect-square bg-white rounded-lg border border-blue-200 p-4 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-blue-600">Interactive dealer map</p>
                  <button 
                    onClick={() => setViewMode('map')}
                    className="text-xs text-blue-500 mt-1 hover:text-blue-700"
                  >
                    Switch to map view
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealerLocator;