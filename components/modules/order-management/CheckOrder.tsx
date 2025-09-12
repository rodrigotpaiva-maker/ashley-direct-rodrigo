import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  MapPinIcon,
  CalendarIcon,
  PhoneIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

interface OrderItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  status: 'pending' | 'confirmed' | 'in-production' | 'ready-to-ship' | 'shipped' | 'delivered';
  estimatedShipDate?: string;
  trackingNumber?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'in-production' | 'ready-to-ship' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  estimatedDelivery?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: OrderItem[];
  orderNotes?: string;
  lastUpdated: string;
  trackingNumbers: string[];
  deliveryInstructions?: string;
}

interface CheckOrderProps {
  className?: string;
}

const CheckOrder: React.FC<CheckOrderProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-5847',
      customer: 'Premier Furniture Store',
      customerEmail: 'orders@premierfurniture.com',
      customerPhone: '(555) 123-4567',
      orderDate: '2024-03-12',
      status: 'in-production',
      priority: 'high',
      total: 16401.47,
      subtotal: 15240.00,
      tax: 1161.47,
      shipping: 0.00,
      estimatedDelivery: '2024-03-20',
      shippingAddress: {
        street: '1234 Main Street',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30309'
      },
      items: [
        {
          id: '1',
          sku: 'ASH-SF-2401',
          name: 'Ashley Signature 3-Piece Sectional Sofa',
          quantity: 3,
          price: 2399.99,
          total: 7199.97,
          status: 'in-production',
          estimatedShipDate: '2024-03-18'
        },
        {
          id: '2',
          sku: 'ASH-RC-2402',
          name: 'Ashley Power Reclining Chair',
          quantity: 2,
          price: 1299.99,
          total: 2599.98,
          status: 'in-production',
          estimatedShipDate: '2024-03-16'
        },
        {
          id: '3',
          sku: 'ASH-BD-2403',
          name: 'Ashley Platform Bed with Storage',
          quantity: 1,
          price: 1599.99,
          total: 1599.99,
          status: 'ready-to-ship',
          estimatedShipDate: '2024-03-14'
        }
      ],
      orderNotes: 'Priority order - customer needs by March 22nd for grand opening',
      lastUpdated: '2024-03-12 16:45',
      trackingNumbers: [],
      deliveryInstructions: 'Loading dock access available 8 AM - 4 PM weekdays'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-5846',
      customer: 'Comfort Living Showroom',
      customerEmail: 'purchasing@comfortliving.com',
      customerPhone: '(555) 234-5678',
      orderDate: '2024-03-11',
      status: 'ready-to-ship',
      priority: 'medium',
      total: 9577.80,
      subtotal: 8920.00,
      tax: 657.80,
      shipping: 0.00,
      estimatedDelivery: '2024-03-18',
      shippingAddress: {
        street: '890 Furniture Row',
        city: 'Phoenix',
        state: 'AZ',
        zipCode: '85001'
      },
      items: [
        {
          id: '4',
          sku: 'ASH-MT-2405',
          name: 'Ashley Memory Foam Mattress',
          quantity: 5,
          price: 749.99,
          total: 3749.95,
          status: 'ready-to-ship',
          estimatedShipDate: '2024-03-15'
        },
        {
          id: '5',
          sku: 'ASH-OF-2406',
          name: 'Ashley Executive Office Desk',
          quantity: 2,
          price: 1199.99,
          total: 2399.98,
          status: 'ready-to-ship',
          estimatedShipDate: '2024-03-15'
        }
      ],
      orderNotes: '',
      lastUpdated: '2024-03-12 10:30',
      trackingNumbers: ['TRK-789456123'],
      deliveryInstructions: 'Call customer 24 hours before delivery'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-5845',
      customer: 'Modern Living Solutions',
      customerEmail: 'orders@modernliving.com',
      customerPhone: '(555) 345-6789',
      orderDate: '2024-03-10',
      status: 'delivered',
      priority: 'low',
      total: 13488.30,
      subtotal: 12580.00,
      tax: 908.30,
      shipping: 0.00,
      estimatedDelivery: '2024-03-15',
      shippingAddress: {
        street: '456 Contemporary Way',
        city: 'Denver',
        state: 'CO',
        zipCode: '80202'
      },
      items: [
        {
          id: '6',
          sku: 'ASH-DR-2404',
          name: 'Ashley Dining Table Set',
          quantity: 3,
          price: 1599.99,
          total: 4799.97,
          status: 'delivered',
          trackingNumber: 'TRK-123789456'
        }
      ],
      orderNotes: 'Customer requested white glove delivery service',
      lastUpdated: '2024-03-15 14:20',
      trackingNumbers: ['TRK-123789456'],
      deliveryInstructions: 'Apartment building - use service elevator'
    }
  ];

  const statusOptions = [
    'all',
    'pending',
    'confirmed',
    'in-production',
    'ready-to-ship',
    'shipped',
    'delivered',
    'cancelled'
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-production': return 'bg-purple-100 text-purple-800';
      case 'ready-to-ship': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return ClockIcon;
      case 'confirmed': return CheckCircleIcon;
      case 'in-production': return ClockIcon;
      case 'ready-to-ship': return TruckIcon;
      case 'shipped': return TruckIcon;
      case 'delivered': return CheckCircleIcon;
      case 'cancelled': return ExclamationTriangleIcon;
      default: return ClockIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getOverallStatus = (items: OrderItem[]) => {
    const statuses = items.map(item => item.status);
    if (statuses.every(status => status === 'delivered')) return 'delivered';
    if (statuses.some(status => status === 'shipped')) return 'shipped';
    if (statuses.some(status => status === 'ready-to-ship')) return 'ready-to-ship';
    if (statuses.some(status => status === 'in-production')) return 'in-production';
    return 'pending';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Check Orders</h1>
              <p className="text-gray-600 mt-1">Track order status and delivery progress</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="font-semibold text-gray-900">{orders.length}</p>
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
              placeholder="Search by order number or customer..."
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

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <StatusIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(order.priority).replace('text-', 'bg-')}`}></span>
                    </div>
                    <p className="text-gray-600">{order.customer}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <CalendarIcon className="w-3 h-3" />
                        <span>Ordered: {order.orderDate}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getStatusColor(order.status)
                      }`}>
                        {order.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      {order.estimatedDelivery && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <TruckIcon className="w-3 h-3" />
                          <span>Est. Delivery: {order.estimatedDelivery}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.items.length} items</p>
                  <p className="text-xs text-gray-500">Updated: {order.lastUpdated}</p>
                </div>
              </div>
              
              {/* Order Items Preview */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
                <div className="grid gap-2">
                  {order.items.slice(0, 2).map((item) => {
                    const ItemStatusIcon = getStatusIcon(item.status);
                    return (
                      <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                        <div className="flex items-center space-x-3">
                          <ItemStatusIcon className={`w-4 h-4 ${getPriorityColor('medium')}`} />
                          <div>
                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                            <span className="text-xs text-gray-500 ml-2">({item.sku})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-900">Qty: {item.quantity}</span>
                          <span className={`text-xs block ${
                            getStatusColor(item.status)
                          } rounded px-1`}>
                            {item.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {order.items.length > 2 && (
                    <div className="text-center py-2 text-sm text-gray-500">
                      +{order.items.length - 2} more items
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tracking Information */}
              {order.trackingNumbers.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tracking Numbers</h4>
                  <div className="flex flex-wrap gap-2">
                    {order.trackingNumbers.map((tracking, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded">
                        <TruckIcon className="w-3 h-3 text-blue-600" />
                        <span className="text-sm font-mono text-blue-600">{tracking}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-xs">
                          Track
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Shipping Address */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4 mt-0.5" />
                  <div>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  </div>
                </div>
              </div>
              
              {/* Notes and Instructions */}
              {(order.orderNotes || order.deliveryInstructions) && (
                <div className="mb-4">
                  {order.orderNotes && (
                    <div className="mb-2">
                      <h4 className="font-medium text-gray-900 mb-1">Order Notes</h4>
                      <p className="text-sm text-gray-600">{order.orderNotes}</p>
                    </div>
                  )}
                  {order.deliveryInstructions && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Delivery Instructions</h4>
                      <p className="text-sm text-gray-600">{order.deliveryInstructions}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{order.customerPhone}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-600">{order.customerEmail}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <PrinterIcon className="w-3 h-3" />
                    <span>Print</span>
                  </button>
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <EyeIcon className="w-3 h-3" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order Details - {selectedOrder.orderNumber}</h2>
                  <p className="text-gray-600">{selectedOrder.customer}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Information */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium">{selectedOrder.orderDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          getStatusColor(selectedOrder.status)
                        }`}>
                          {selectedOrder.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <span className={`font-medium ${getPriorityColor(selectedOrder.priority)}`}>
                          {selectedOrder.priority.charAt(0).toUpperCase() + selectedOrder.priority.slice(1)}
                        </span>
                      </div>
                      {selectedOrder.estimatedDelivery && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Est. Delivery:</span>
                          <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium">{selectedOrder.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedOrder.customerPhone}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => {
                      const ItemStatusIcon = getStatusIcon(item.status);
                      return (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">{item.sku}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${item.total.toFixed(2)}</p>
                              <p className="text-sm text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <ItemStatusIcon className="w-4 h-4 text-gray-500" />
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                getStatusColor(item.status)
                              }`}>
                                {item.status.replace('-', ' ')}
                              </span>
                            </div>
                            {item.estimatedShipDate && (
                              <span className="text-xs text-gray-500">
                                Ship: {item.estimatedShipDate}
                              </span>
                            )}
                          </div>
                          {item.trackingNumber && (
                            <div className="mt-2 pt-2 border-t border-gray-100">
                              <span className="text-xs text-gray-600">Tracking: </span>
                              <span className="text-xs font-mono text-blue-600">{item.trackingNumber}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    {/* Notes */}
                    {(selectedOrder.orderNotes || selectedOrder.deliveryInstructions) && (
                      <div className="space-y-3">
                        {selectedOrder.orderNotes && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Order Notes</h4>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <p className="text-sm text-yellow-800">{selectedOrder.orderNotes}</p>
                            </div>
                          </div>
                        )}
                        {selectedOrder.deliveryInstructions && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Delivery Instructions</h4>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <p className="text-sm text-blue-800">{selectedOrder.deliveryInstructions}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    {/* Order Total */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>${selectedOrder.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span>${selectedOrder.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span>{selectedOrder.shipping === 0 ? 'FREE' : `$${selectedOrder.shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold text-lg">
                          <span>Total:</span>
                          <span>${selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-6 flex items-center justify-end space-x-2">
                <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  Print Order
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Send Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOrder;