import React, { useState } from 'react';

interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderPoint: number;
  reorderQuantity: number;
  averageDailySales: number;
  daysOfStock: number;
  location: {
    warehouse: string;
    zone: string;
    shelf: string;
  };
  supplier: {
    name: string;
    leadTime: number;
    lastOrderDate?: string;
    nextDeliveryDate?: string;
  };
  movements: {
    date: string;
    type: 'Inbound' | 'Outbound' | 'Transfer' | 'Adjustment';
    quantity: number;
    reference: string;
    notes?: string;
  }[];
  alerts: {
    type: 'Low Stock' | 'Out of Stock' | 'Overstock' | 'Slow Moving';
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    message: string;
  }[];
  lastUpdated: string;
}

const InventoryTracking: React.FC = () => {
  const [inventory] = useState<InventoryItem[]>([
    {
      id: 'INV-001',
      productName: 'Executive Leather Office Chair',
      sku: 'ASH-CH-001',
      category: 'Office Seating',
      currentStock: 45,
      reservedStock: 8,
      availableStock: 37,
      minStockLevel: 20,
      maxStockLevel: 100,
      reorderPoint: 25,
      reorderQuantity: 50,
      averageDailySales: 2.3,
      daysOfStock: 16,
      location: {
        warehouse: 'Main Distribution Center',
        zone: 'A-2',
        shelf: 'A2-15-C'
      },
      supplier: {
        name: 'Ashley Manufacturing',
        leadTime: 14,
        lastOrderDate: '2024-11-20',
        nextDeliveryDate: '2024-12-15'
      },
      movements: [
        { date: '2024-12-08', type: 'Outbound', quantity: -3, reference: 'ORD-2024-156', notes: 'Corporate order' },
        { date: '2024-12-07', type: 'Outbound', quantity: -2, reference: 'ORD-2024-154', notes: 'Dealer shipment' },
        { date: '2024-12-05', type: 'Inbound', quantity: 25, reference: 'PO-2024-089', notes: 'Regular restock' },
        { date: '2024-12-03', type: 'Adjustment', quantity: -1, reference: 'ADJ-001', notes: 'Damaged item removal' }
      ],
      alerts: [
        { type: 'Low Stock', severity: 'Medium', message: 'Stock level approaching reorder point' }
      ],
      lastUpdated: '2024-12-08'
    },
    {
      id: 'INV-002',
      productName: 'Modern Sectional Sofa',
      sku: 'ASH-SO-001',
      category: 'Living Room',
      currentStock: 12,
      reservedStock: 5,
      availableStock: 7,
      minStockLevel: 15,
      maxStockLevel: 40,
      reorderPoint: 18,
      reorderQuantity: 20,
      averageDailySales: 1.8,
      daysOfStock: 4,
      location: {
        warehouse: 'Main Distribution Center',
        zone: 'B-1',
        shelf: 'B1-08-A'
      },
      supplier: {
        name: 'Comfort Furniture Co.',
        leadTime: 21,
        lastOrderDate: '2024-11-15',
        nextDeliveryDate: '2024-12-10'
      },
      movements: [
        { date: '2024-12-08', type: 'Outbound', quantity: -2, reference: 'ORD-2024-157', notes: 'Showroom display' },
        { date: '2024-12-06', type: 'Outbound', quantity: -1, reference: 'ORD-2024-153', notes: 'Direct customer' },
        { date: '2024-12-04', type: 'Outbound', quantity: -3, reference: 'ORD-2024-150', notes: 'Retail location' }
      ],
      alerts: [
        { type: 'Low Stock', severity: 'High', message: 'Critical stock level - immediate reorder needed' },
        { type: 'Low Stock', severity: 'Critical', message: 'Below minimum stock level' }
      ],
      lastUpdated: '2024-12-08'
    },
    {
      id: 'INV-003',
      productName: 'Glass Top Conference Table',
      sku: 'ASH-TB-001',
      category: 'Office Tables',
      currentStock: 8,
      reservedStock: 2,
      availableStock: 6,
      minStockLevel: 10,
      maxStockLevel: 30,
      reorderPoint: 12,
      reorderQuantity: 15,
      averageDailySales: 0.8,
      daysOfStock: 7.5,
      location: {
        warehouse: 'Main Distribution Center',
        zone: 'C-3',
        shelf: 'C3-22-B'
      },
      supplier: {
        name: 'Elite Office Solutions',
        leadTime: 10,
        lastOrderDate: '2024-11-25',
        nextDeliveryDate: '2024-12-12'
      },
      movements: [
        { date: '2024-12-07', type: 'Outbound', quantity: -1, reference: 'ORD-2024-155', notes: 'Office renovation project' },
        { date: '2024-12-05', type: 'Transfer', quantity: -2, reference: 'TRF-045', notes: 'Transfer to regional warehouse' },
        { date: '2024-12-01', type: 'Inbound', quantity: 8, reference: 'PO-2024-092', notes: 'Monthly restock' }
      ],
      alerts: [
        { type: 'Low Stock', severity: 'Medium', message: 'Below minimum stock level' }
      ],
      lastUpdated: '2024-12-08'
    },
    {
      id: 'INV-004',
      productName: 'Adjustable Standing Desk',
      sku: 'ASH-DK-001',
      category: 'Office Desks',
      currentStock: 0,
      reservedStock: 0,
      availableStock: 0,
      minStockLevel: 15,
      maxStockLevel: 50,
      reorderPoint: 20,
      reorderQuantity: 30,
      averageDailySales: 2.1,
      daysOfStock: 0,
      location: {
        warehouse: 'Main Distribution Center',
        zone: 'A-1',
        shelf: 'A1-12-D'
      },
      supplier: {
        name: 'Ergonomic Solutions Inc.',
        leadTime: 7,
        lastOrderDate: '2024-12-05',
        nextDeliveryDate: '2024-12-12'
      },
      movements: [
        { date: '2024-12-08', type: 'Outbound', quantity: -1, reference: 'ORD-2024-158', notes: 'Last unit sold' },
        { date: '2024-12-07', type: 'Outbound', quantity: -4, reference: 'ORD-2024-152', notes: 'Bulk corporate order' },
        { date: '2024-12-06', type: 'Outbound', quantity: -2, reference: 'ORD-2024-151', notes: 'Individual sales' }
      ],
      alerts: [
        { type: 'Out of Stock', severity: 'Critical', message: 'Product completely out of stock' }
      ],
      lastUpdated: '2024-12-08'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showStockAdjustment, setShowStockAdjustment] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [alertFilter, setAlertFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [stockAdjustment, setStockAdjustment] = useState({
    itemId: '',
    type: 'Adjustment',
    quantity: '',
    reference: '',
    notes: ''
  });

  const categories = [...new Set(inventory.map(item => item.category))];
  const alertTypes = ['All', 'Low Stock', 'Out of Stock', 'Overstock', 'Slow Moving'];

  const getStockStatusColor = (item: InventoryItem) => {
    if (item.currentStock === 0) return 'bg-red-100 text-red-800';
    if (item.currentStock <= item.minStockLevel) return 'bg-yellow-100 text-yellow-800';
    if (item.currentStock >= item.maxStockLevel) return 'bg-purple-100 text-purple-800';
    return 'bg-green-100 text-green-800';
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock === 0) return 'Out of Stock';
    if (item.currentStock <= item.minStockLevel) return 'Low Stock';
    if (item.currentStock >= item.maxStockLevel) return 'Overstock';
    return 'Normal';
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = !searchTerm ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    const matchesAlert = alertFilter === 'All' || 
      item.alerts.some(alert => alert.type === alertFilter);
    
    return matchesSearch && matchesCategory && matchesAlert;
  });

  const totalItems = inventory.length;
  const outOfStock = inventory.filter(item => item.currentStock === 0).length;
  const lowStock = inventory.filter(item => item.currentStock > 0 && item.currentStock <= item.minStockLevel).length;
  const criticalAlerts = inventory.reduce((count, item) => count + item.alerts.filter(alert => alert.severity === 'Critical').length, 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * 1000), 0); // Mock value calculation

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-900">Inventory Tracking</h3>
          <p className="text-gray-600">Monitor stock levels, movements, and alerts</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowStockAdjustment(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Stock Adjustment
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Total Items</h4>
          <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
          <p className="text-sm text-gray-600">SKUs tracked</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Out of Stock</h4>
          <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
          <p className="text-sm text-gray-600">Items unavailable</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Low Stock</h4>
          <p className="text-2xl font-bold text-yellow-600">{lowStock}</p>
          <p className="text-sm text-gray-600">Need reorder</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Critical Alerts</h4>
          <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
          <p className="text-sm text-gray-600">Immediate attention</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Inventory</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or SKU..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
            <select
              value={alertFilter}
              onChange={(e) => setAlertFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              {alertTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h4 className="text-lg font-medium text-red-800">Critical Inventory Alerts</h4>
          </div>
          <div className="space-y-2">
            {inventory.filter(item => item.alerts.some(alert => alert.severity === 'Critical')).map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-red-900">{item.productName} ({item.sku})</p>
                  <p className="text-sm text-red-700">
                    {item.alerts.find(alert => alert.severity === 'Critical')?.message}
                  </p>
                </div>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Take Action
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Levels
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days of Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alerts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                      <p className="text-sm text-gray-500">{item.sku}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-medium">{item.currentStock}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Available:</span>
                        <span className="font-medium">{item.availableStock}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Reserved:</span>
                        <span className="text-gray-500">{item.reservedStock}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(item)}`}>
                      {getStockStatus(item)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className={`text-sm font-medium ${
                        item.daysOfStock <= 7 ? 'text-red-600' : 
                        item.daysOfStock <= 14 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {item.daysOfStock > 0 ? `${item.daysOfStock} days` : 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500">{item.averageDailySales}/day avg</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p>{item.location.warehouse}</p>
                      <p className="text-xs">{item.location.zone} - {item.location.shelf}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p>{item.supplier.name}</p>
                      <p className="text-xs">{item.supplier.leadTime} days lead time</p>
                      {item.supplier.nextDeliveryDate && (
                        <p className="text-xs text-blue-600">Next: {item.supplier.nextDeliveryDate}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {item.alerts.slice(0, 2).map((alert, index) => (
                        <span key={index} className={`inline-block px-2 py-1 text-xs font-semibold rounded border ${getAlertSeverityColor(alert.severity)}`}>
                          {alert.type}
                        </span>
                      ))}
                      {item.alerts.length > 2 && (
                        <p className="text-xs text-gray-500">+{item.alerts.length - 2} more</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Details
                      </button>
                      <button 
                        onClick={() => {
                          setStockAdjustment({...stockAdjustment, itemId: item.id});
                          setShowStockAdjustment(true);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Adjust
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{selectedItem.productName}</h3>
                  <p className="text-gray-600">{selectedItem.sku} - Inventory Details</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stock Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Stock Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Current Stock</span>
                      <span className="text-sm font-bold text-gray-900">{selectedItem.currentStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Reserved</span>
                      <span className="text-sm text-gray-900">{selectedItem.reservedStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Available</span>
                      <span className="text-sm text-green-600 font-medium">{selectedItem.availableStock}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Min Level</span>
                      <span className="text-sm text-gray-900">{selectedItem.minStockLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Max Level</span>
                      <span className="text-sm text-gray-900">{selectedItem.maxStockLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Reorder Point</span>
                      <span className="text-sm text-orange-600 font-medium">{selectedItem.reorderPoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Reorder Qty</span>
                      <span className="text-sm text-gray-900">{selectedItem.reorderQuantity}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="text-md font-medium text-gray-900 mb-3">Location</h5>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-medium text-blue-900">{selectedItem.location.warehouse}</p>
                      <p className="text-sm text-blue-700">Zone: {selectedItem.location.zone}</p>
                      <p className="text-sm text-blue-700">Shelf: {selectedItem.location.shelf}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Movements */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Recent Movements</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedItem.movements.map((movement, index) => (
                      <div key={index} className="border border-gray-200 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            movement.type === 'Inbound' ? 'bg-green-100 text-green-800' :
                            movement.type === 'Outbound' ? 'bg-red-100 text-red-800' :
                            movement.type === 'Transfer' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {movement.type}
                          </span>
                          <span className="text-sm text-gray-500">{movement.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-700">Quantity</span>
                          <span className={`text-sm font-medium ${
                            movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Ref: {movement.reference}</p>
                        {movement.notes && (
                          <p className="text-xs text-gray-500 mt-1">{movement.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts and Supplier Info */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Active Alerts</h4>
                    <div className="space-y-3">
                      {selectedItem.alerts.map((alert, index) => (
                        <div key={index} className={`border rounded p-3 ${getAlertSeverityColor(alert.severity)}`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{alert.type}</span>
                            <span className="text-xs uppercase">{alert.severity}</span>
                          </div>
                          <p className="text-sm">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Supplier Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700 block">Supplier</span>
                        <span className="text-sm text-gray-900">{selectedItem.supplier.name}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 block">Lead Time</span>
                        <span className="text-sm text-gray-900">{selectedItem.supplier.leadTime} days</span>
                      </div>
                      {selectedItem.supplier.lastOrderDate && (
                        <div>
                          <span className="text-sm font-medium text-gray-700 block">Last Order</span>
                          <span className="text-sm text-gray-900">{selectedItem.supplier.lastOrderDate}</span>
                        </div>
                      )}
                      {selectedItem.supplier.nextDeliveryDate && (
                        <div>
                          <span className="text-sm font-medium text-gray-700 block">Next Delivery</span>
                          <span className="text-sm text-blue-600 font-medium">{selectedItem.supplier.nextDeliveryDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Sales Analytics</h4>
                    <div className="bg-green-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Daily Sales Avg</span>
                        <span className="text-sm text-gray-900">{selectedItem.averageDailySales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Days of Stock</span>
                        <span className={`text-sm font-medium ${
                          selectedItem.daysOfStock <= 7 ? 'text-red-600' : 
                          selectedItem.daysOfStock <= 14 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {selectedItem.daysOfStock > 0 ? `${selectedItem.daysOfStock} days` : 'Out of stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Create Purchase Order
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  Adjust Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showStockAdjustment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">Stock Adjustment</h3>
                <button
                  onClick={() => setShowStockAdjustment(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type</label>
                  <select
                    value={stockAdjustment.type}
                    onChange={(e) => setStockAdjustment({...stockAdjustment, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="Adjustment">Stock Adjustment</option>
                    <option value="Inbound">Inbound Shipment</option>
                    <option value="Outbound">Outbound Shipment</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Change</label>
                  <input
                    type="number"
                    value={stockAdjustment.quantity}
                    onChange={(e) => setStockAdjustment({...stockAdjustment, quantity: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter quantity (+/- number)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
                  <input
                    type="text"
                    value={stockAdjustment.reference}
                    onChange={(e) => setStockAdjustment({...stockAdjustment, reference: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="PO number, invoice, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={stockAdjustment.notes}
                    onChange={(e) => setStockAdjustment({...stockAdjustment, notes: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Reason for adjustment..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
                <button
                  onClick={() => setShowStockAdjustment(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Apply Adjustment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTracking;