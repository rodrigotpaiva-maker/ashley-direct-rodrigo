import React, { useState } from 'react';
import { 
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ArrowPathIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface DeliveryLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactName: string;
  contactPhone: string;
  deliveryNotes?: string;
}

interface DeliveryItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  status: 'pending' | 'loaded' | 'in-transit' | 'delivered' | 'exception';
}

interface Delivery {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  customer: string;
  status: 'scheduled' | 'loaded' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'exception' | 'returned';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: string;
  estimatedTime: string;
  actualDeliveryTime?: string;
  driver: string;
  driverPhone: string;
  vehicle: string;
  location: DeliveryLocation;
  items: DeliveryItem[];
  deliveryWindow: string;
  specialInstructions?: string;
  signatureRequired: boolean;
  whiteGloveService: boolean;
  lastUpdate: string;
  exceptions?: string[];
  gpsTracking?: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
}

interface DeliveryStatusProps {
  className?: string;
}

const DeliveryStatus: React.FC<DeliveryStatusProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  const deliveries: Delivery[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-5847',
      trackingNumber: 'TRK-ASH-789456123',
      customer: 'Premier Furniture Store',
      status: 'in-transit',
      priority: 'high',
      scheduledDate: '2024-03-15',
      estimatedTime: '10:00 AM - 2:00 PM',
      driver: 'Mike Rodriguez',
      driverPhone: '(555) 987-6543',
      vehicle: 'Truck #24 (Ford F-550)',
      location: {
        address: '1234 Main Street',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30309',
        contactName: 'John Anderson',
        contactPhone: '(555) 123-4567',
        deliveryNotes: 'Loading dock access available 8 AM - 4 PM weekdays'
      },
      items: [
        {
          id: '1',
          sku: 'ASH-SF-2401',
          name: 'Ashley Signature 3-Piece Sectional Sofa',
          quantity: 3,
          status: 'in-transit'
        },
        {
          id: '2',
          sku: 'ASH-RC-2402',
          name: 'Ashley Power Reclining Chair',
          quantity: 2,
          status: 'in-transit'
        }
      ],
      deliveryWindow: '10:00 AM - 2:00 PM',
      specialInstructions: 'Priority delivery - customer grand opening event',
      signatureRequired: true,
      whiteGloveService: false,
      lastUpdate: '2024-03-15 08:30',
      gpsTracking: {
        lat: 33.7490,
        lng: -84.3880,
        lastUpdated: '2024-03-15 08:30'
      }
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-5846',
      trackingNumber: 'TRK-ASH-456789123',
      customer: 'Comfort Living Showroom',
      status: 'out-for-delivery',
      priority: 'medium',
      scheduledDate: '2024-03-15',
      estimatedTime: '2:00 PM - 6:00 PM',
      driver: 'Carlos Martinez',
      driverPhone: '(555) 876-5432',
      vehicle: 'Truck #18 (Mercedes Sprinter)',
      location: {
        address: '890 Furniture Row',
        city: 'Phoenix',
        state: 'AZ',
        zipCode: '85001',
        contactName: 'Sarah Wilson',
        contactPhone: '(555) 234-5678',
        deliveryNotes: 'Call customer 30 minutes before arrival'
      },
      items: [
        {
          id: '3',
          sku: 'ASH-MT-2405',
          name: 'Ashley Memory Foam Mattress',
          quantity: 5,
          status: 'in-transit'
        }
      ],
      deliveryWindow: '2:00 PM - 6:00 PM',
      signatureRequired: true,
      whiteGloveService: true,
      lastUpdate: '2024-03-15 13:45',
      gpsTracking: {
        lat: 33.4484,
        lng: -112.0740,
        lastUpdated: '2024-03-15 13:45'
      }
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-5845',
      trackingNumber: 'TRK-ASH-123456789',
      customer: 'Modern Living Solutions',
      status: 'delivered',
      priority: 'low',
      scheduledDate: '2024-03-14',
      estimatedTime: '9:00 AM - 1:00 PM',
      actualDeliveryTime: '2024-03-14 11:30 AM',
      driver: 'Tom Wilson',
      driverPhone: '(555) 765-4321',
      vehicle: 'Truck #12 (Isuzu NPR)',
      location: {
        address: '456 Contemporary Way',
        city: 'Denver',
        state: 'CO',
        zipCode: '80202',
        contactName: 'Emily Davis',
        contactPhone: '(555) 345-6789',
        deliveryNotes: 'Apartment building - use service elevator'
      },
      items: [
        {
          id: '4',
          sku: 'ASH-DR-2404',
          name: 'Ashley Dining Table Set',
          quantity: 3,
          status: 'delivered'
        }
      ],
      deliveryWindow: '9:00 AM - 1:00 PM',
      signatureRequired: true,
      whiteGloveService: true,
      lastUpdate: '2024-03-14 11:30'
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-5844',
      trackingNumber: 'TRK-ASH-987654321',
      customer: 'Luxury Furnishings LLC',
      status: 'exception',
      priority: 'urgent',
      scheduledDate: '2024-03-15',
      estimatedTime: '8:00 AM - 12:00 PM',
      driver: 'David Chen',
      driverPhone: '(555) 654-3210',
      vehicle: 'Truck #31 (Freightliner)',
      location: {
        address: '890 Design Ave',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        contactName: 'Maria Rodriguez',
        contactPhone: '(555) 456-7890',
        deliveryNotes: 'High-rise building - freight elevator required'
      },
      items: [
        {
          id: '5',
          sku: 'ASH-BD-2403',
          name: 'Ashley Platform Bed with Storage',
          quantity: 2,
          status: 'exception'
        }
      ],
      deliveryWindow: '8:00 AM - 12:00 PM',
      specialInstructions: 'White glove delivery - customer VIP',
      signatureRequired: true,
      whiteGloveService: true,
      lastUpdate: '2024-03-15 09:15',
      exceptions: ['Customer not available', 'Rescheduled for tomorrow']
    }
  ];

  const statusOptions = [
    'all',
    'scheduled',
    'loaded',
    'in-transit',
    'out-for-delivery',
    'delivered',
    'exception',
    'returned'
  ];

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = 
      delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'loaded': return 'bg-purple-100 text-purple-800';
      case 'in-transit': return 'bg-yellow-100 text-yellow-800';
      case 'out-for-delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'exception': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return CalendarIcon;
      case 'loaded': return CheckCircleIcon;
      case 'in-transit': return TruckIcon;
      case 'out-for-delivery': return TruckIcon;
      case 'delivered': return CheckCircleIcon;
      case 'exception': return ExclamationTriangleIcon;
      case 'returned': return ArrowPathIcon;
      default: return ClockIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDeliveryProgress = (status: string) => {
    const statusOrder = ['scheduled', 'loaded', 'in-transit', 'out-for-delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);
    return currentIndex === -1 ? 0 : ((currentIndex + 1) / statusOrder.length) * 100;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <TruckIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Delivery Status</h1>
              <p className="text-gray-600 mt-1">Real-time tracking and delivery coordination</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Active Deliveries</p>
            <p className="font-semibold text-gray-900">
              {deliveries.filter(d => ['in-transit', 'out-for-delivery'].includes(d.status)).length}
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Deliveries</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{deliveries.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {deliveries.filter(d => d.status === 'in-transit').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TruckIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {deliveries.filter(d => d.status === 'delivered').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Exceptions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {deliveries.filter(d => d.status === 'exception').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
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
              placeholder="Search by order number, tracking number, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.map((delivery) => {
          const StatusIcon = getStatusIcon(delivery.status);
          const progress = getDeliveryProgress(delivery.status);
          
          return (
            <div key={delivery.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-green-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <StatusIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{delivery.orderNumber}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getPriorityColor(delivery.priority)
                      }`}>
                        {delivery.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600">{delivery.customer}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <TruckIcon className="w-3 h-3" />
                        <span>Tracking: {delivery.trackingNumber}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getStatusColor(delivery.status)
                      }`}>
                        {delivery.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{delivery.deliveryWindow}</p>
                  <p className="text-sm text-gray-500">{delivery.scheduledDate}</p>
                  {delivery.actualDeliveryTime && (
                    <p className="text-sm text-green-600">Delivered: {delivery.actualDeliveryTime}</p>
                  )}
                </div>
              </div>
              
              {/* Delivery Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Delivery Progress</span>
                  <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      delivery.status === 'exception' ? 'bg-red-500' :
                      delivery.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Delivery Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Driver Information</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{delivery.driver}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <PhoneIcon className="w-3 h-3" />
                      <span>{delivery.driverPhone}</span>
                    </div>
                    <p className="text-sm text-gray-500">{delivery.vehicle}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{delivery.location.address}</p>
                    <p className="text-sm text-gray-600">{delivery.location.city}, {delivery.location.state} {delivery.location.zipCode}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <PhoneIcon className="w-3 h-3" />
                      <span>{delivery.location.contactName} - {delivery.location.contactPhone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Service Details</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {delivery.signatureRequired && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Signature Required</span>
                      )}
                      {delivery.whiteGloveService && (
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">White Glove</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Last Update: {delivery.lastUpdate}</p>
                  </div>
                </div>
              </div>
              
              {/* Items */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Items ({delivery.items.length})</h4>
                <div className="grid gap-2">
                  {delivery.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.sku})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-900">Qty: {item.quantity}</span>
                        <span className={`text-xs block ${
                          getStatusColor(item.status)
                        } rounded px-1 mt-1`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Special Instructions */}
              {(delivery.specialInstructions || delivery.location.deliveryNotes) && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Special Instructions</h4>
                  <div className="space-y-2">
                    {delivery.specialInstructions && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">{delivery.specialInstructions}</p>
                      </div>
                    )}
                    {delivery.location.deliveryNotes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">{delivery.location.deliveryNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Exceptions */}
              {delivery.exceptions && delivery.exceptions.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Delivery Exceptions</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <ul className="text-sm text-red-800 space-y-1">
                      {delivery.exceptions.map((exception, index) => (
                        <li key={index}>• {exception}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {delivery.gpsTracking && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPinIcon className="w-3 h-3" />
                      <span>GPS: {delivery.gpsTracking.lastUpdated}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Contact Driver
                  </button>
                  <button 
                    onClick={() => setSelectedDelivery(delivery)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Delivery Details - {selectedDelivery.orderNumber}</h2>
                  <p className="text-gray-600">{selectedDelivery.customer}</p>
                </div>
                <button 
                  onClick={() => setSelectedDelivery(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {/* GPS Tracking Map Placeholder */}
              {selectedDelivery.gpsTracking && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Live Tracking</h3>
                  <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">GPS Tracking Map</p>
                      <p className="text-sm text-gray-500">
                        Last Updated: {selectedDelivery.gpsTracking.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Detailed Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Complete delivery information would be displayed here */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Delivery Information</h3>
                  {/* Full delivery details */}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Items & Status</h3>
                  {/* Full items list with status */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryStatus;