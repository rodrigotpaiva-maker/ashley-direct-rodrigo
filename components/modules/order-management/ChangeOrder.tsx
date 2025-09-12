import React, { useState } from 'react';
import { 
  PencilSquareIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  MinusIcon,
  ArrowRightIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface OrderItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  originalQuantity: number;
  price: number;
  total: number;
  status: 'pending' | 'in-production' | 'ready-to-ship' | 'shipped';
  canModify: boolean;
  changeDeadline?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'in-production' | 'ready-to-ship' | 'shipped' | 'delivered';
  total: number;
  items: OrderItem[];
  canModify: boolean;
  modificationDeadline?: string;
  lastModified?: string;
  changeHistory: OrderChange[];
}

interface OrderChange {
  id: string;
  type: 'quantity' | 'item-added' | 'item-removed' | 'cancelled';
  description: string;
  timestamp: string;
  user: string;
  oldValue?: string;
  newValue?: string;
}

interface ChangeOrderProps {
  className?: string;
}

const ChangeOrder: React.FC<ChangeOrderProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modifiedItems, setModifiedItems] = useState<Record<string, number>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-5847',
      customer: 'Premier Furniture Store',
      orderDate: '2024-03-12',
      status: 'confirmed',
      total: 15240.00,
      canModify: true,
      modificationDeadline: '2024-03-14 17:00',
      lastModified: '2024-03-12 14:30',
      items: [
        {
          id: '1',
          sku: 'ASH-SF-2401',
          name: 'Ashley Signature 3-Piece Sectional Sofa',
          quantity: 3,
          originalQuantity: 3,
          price: 2399.99,
          total: 7199.97,
          status: 'pending',
          canModify: true,
          changeDeadline: '2024-03-14 17:00'
        },
        {
          id: '2',
          sku: 'ASH-RC-2402',
          name: 'Ashley Power Reclining Chair',
          quantity: 2,
          originalQuantity: 2,
          price: 1299.99,
          total: 2599.98,
          status: 'pending',
          canModify: true,
          changeDeadline: '2024-03-14 17:00'
        },
        {
          id: '3',
          sku: 'ASH-BD-2403',
          name: 'Ashley Platform Bed with Storage',
          quantity: 1,
          originalQuantity: 1,
          price: 1599.99,
          total: 1599.99,
          status: 'pending',
          canModify: true,
          changeDeadline: '2024-03-14 17:00'
        }
      ],
      changeHistory: [
        {
          id: '1',
          type: 'quantity',
          description: 'Changed sectional sofa quantity from 2 to 3',
          timestamp: '2024-03-12 14:30',
          user: 'John Anderson',
          oldValue: '2',
          newValue: '3'
        }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-5846',
      customer: 'Comfort Living Showroom',
      orderDate: '2024-03-11',
      status: 'in-production',
      total: 8920.00,
      canModify: false,
      items: [
        {
          id: '4',
          sku: 'ASH-MT-2405',
          name: 'Ashley Memory Foam Mattress',
          quantity: 5,
          originalQuantity: 5,
          price: 749.99,
          total: 3749.95,
          status: 'in-production',
          canModify: false
        },
        {
          id: '5',
          sku: 'ASH-OF-2406',
          name: 'Ashley Executive Office Desk',
          quantity: 2,
          originalQuantity: 2,
          price: 1199.99,
          total: 2399.98,
          status: 'in-production',
          canModify: false
        }
      ],
      changeHistory: []
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-5845',
      customer: 'Modern Living Solutions',
      orderDate: '2024-03-10',
      status: 'pending',
      total: 12580.00,
      canModify: true,
      modificationDeadline: '2024-03-13 17:00',
      items: [
        {
          id: '6',
          sku: 'ASH-DR-2404',
          name: 'Ashley Dining Table Set',
          quantity: 3,
          originalQuantity: 3,
          price: 1599.99,
          total: 4799.97,
          status: 'pending',
          canModify: true,
          changeDeadline: '2024-03-13 17:00'
        }
      ],
      changeHistory: []
    }
  ];

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-production': return 'bg-purple-100 text-purple-800';
      case 'ready-to-ship': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return ClockIcon;
      case 'confirmed': return CheckCircleIcon;
      case 'in-production': return ClockIcon;
      case 'ready-to-ship': return CheckCircleIcon;
      case 'shipped': return ArrowRightIcon;
      case 'delivered': return CheckCircleIcon;
      default: return ClockIcon;
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    setModifiedItems(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));
  };

  const getModifiedQuantity = (item: OrderItem) => {
    return modifiedItems[item.id] !== undefined ? modifiedItems[item.id] : item.quantity;
  };

  const hasChanges = () => {
    return Object.keys(modifiedItems).length > 0;
  };

  const calculateNewTotal = (order: Order) => {
    return order.items.reduce((total, item) => {
      const quantity = getModifiedQuantity(item);
      return total + (item.price * quantity);
    }, 0);
  };

  const handleSubmitChanges = () => {
    if (!selectedOrder || !hasChanges()) return;
    
    // Submit changes logic here
    console.log('Submitting changes:', modifiedItems);
    setShowConfirmation(true);
  };

  const confirmChanges = () => {
    // Apply changes to the order
    alert('Order changes submitted successfully!');
    setModifiedItems({});
    setSelectedOrder(null);
    setShowConfirmation(false);
  };

  const isDeadlinePassed = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <PencilSquareIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Change Orders</h1>
              <p className="text-gray-600 mt-1">Modify existing orders before production begins</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Modifiable Orders</p>
            <p className="font-semibold text-gray-900">
              {orders.filter(order => order.canModify).length} of {orders.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative max-w-lg">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders by order number or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const StatusIcon = getStatusIcon(order.status);
          const deadlinePassed = isDeadlinePassed(order.modificationDeadline);
          
          return (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    order.canModify && !deadlinePassed
                      ? 'bg-orange-100'
                      : 'bg-gray-100'
                  }`}>
                    <StatusIcon className={`w-6 h-6 ${
                      order.canModify && !deadlinePassed
                        ? 'text-orange-600'
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                    <p className="text-gray-600">{order.customer}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500">Order Date: {order.orderDate}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        getStatusColor(order.status)
                      }`}>
                        {order.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    {order.modificationDeadline && (
                      <div className={`flex items-center space-x-1 mt-1 text-sm ${
                        deadlinePassed ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        <ClockIcon className="w-3 h-3" />
                        <span>
                          {deadlinePassed 
                            ? 'Modification deadline passed' 
                            : `Modify by: ${order.modificationDeadline}`
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  {order.lastModified && (
                    <p className="text-xs text-gray-500">Last modified: {order.lastModified}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-gray-900">Order Items ({order.items.length})</h4>
                <div className="grid gap-2">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.sku})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-900">Qty: {item.quantity}</span>
                        <span className="text-sm text-gray-600 ml-2">${item.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="text-center py-2 text-sm text-gray-500">
                      +{order.items.length - 3} more items
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {order.canModify && !deadlinePassed ? (
                    <>
                      <CheckCircleIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Can be modified</span>
                    </>
                  ) : (
                    <>
                      {deadlinePassed ? (
                        <>
                          <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-600 font-medium">Modification deadline passed</span>
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500 font-medium">Cannot be modified</span>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    disabled={!order.canModify || deadlinePassed}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      order.canModify && !deadlinePassed
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Modify Order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Modification Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Modify Order {selectedOrder.orderNumber}</h2>
                  <p className="text-gray-600">{selectedOrder.customer}</p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedOrder(null);
                    setModifiedItems({});
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {selectedOrder.modificationDeadline && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">
                      Modification Deadline: {selectedOrder.modificationDeadline}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                {selectedOrder.items.map((item) => {
                  const modifiedQuantity = getModifiedQuantity(item);
                  const isModified = modifiedItems[item.id] !== undefined;
                  
                  return (
                    <div key={item.id} className={`border rounded-lg p-4 ${
                      isModified ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.sku}</p>
                          <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          {item.canModify ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Quantity:</span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, modifiedQuantity - 1)}
                                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                              >
                                <MinusIcon className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-medium">{modifiedQuantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, modifiedQuantity + 1)}
                                className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                              >
                                <PlusIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-center">
                              <span className="text-sm text-gray-600">Quantity:</span>
                              <span className="block font-medium">{item.quantity}</span>
                              <span className="text-xs text-red-600">Cannot modify</span>
                            </div>
                          )}
                          
                          <div className="text-right ml-4">
                            <p className="font-medium text-gray-900">
                              ${(item.price * modifiedQuantity).toFixed(2)}
                            </p>
                            {isModified && (
                              <p className="text-xs text-orange-600">
                                Was: ${item.total.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Total: ${calculateNewTotal(selectedOrder).toFixed(2)}
                    </p>
                    {hasChanges() && (
                      <p className="text-sm text-orange-600">
                        Original: ${selectedOrder.total.toFixed(2)}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedOrder(null);
                        setModifiedItems({});
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmitChanges}
                      disabled={!hasChanges()}
                      className={`px-6 py-2 font-medium rounded-lg transition-colors ${
                        hasChanges()
                          ? 'bg-orange-600 text-white hover:bg-orange-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Submit Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Order Changes</h3>
                  <p className="text-gray-600">Are you sure you want to submit these changes?</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Changes Summary:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {Object.entries(modifiedItems).map(([itemId, newQuantity]) => {
                    const item = selectedOrder?.items.find(i => i.id === itemId);
                    if (!item) return null;
                    return (
                      <li key={itemId}>
                        {item.name}: {item.quantity} → {newQuantity}
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmChanges}
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Confirm Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeOrder;