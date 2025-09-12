import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingUp, Clock, BarChart3, Filter, Download, RefreshCw } from 'lucide-react';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  turnoverRate: number;
  daysOnHand: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstock';
  value: number;
}

const InventoryReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('current_month');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [inventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      sku: 'AS-LS-1001',
      name: 'Ashley Signature Sofa Set',
      category: 'Living Room',
      currentStock: 45,
      reorderPoint: 20,
      turnoverRate: 6.2,
      daysOnHand: 58,
      status: 'in_stock',
      value: 56250
    },
    {
      id: '2',
      sku: 'MD-DT-2002',
      name: 'Modern Dining Table',
      category: 'Dining Room',
      currentStock: 12,
      reorderPoint: 15,
      turnoverRate: 4.8,
      daysOnHand: 76,
      status: 'low_stock',
      value: 8400
    },
    {
      id: '3',
      sku: 'EO-CH-3001',
      name: 'Executive Office Chair',
      category: 'Office',
      currentStock: 0,
      reorderPoint: 25,
      turnoverRate: 8.1,
      daysOnHand: 0,
      status: 'out_of_stock',
      value: 0
    },
    {
      id: '4',
      sku: 'PR-BS-4001',
      name: 'Premium Bedroom Set',
      category: 'Bedroom',
      currentStock: 78,
      reorderPoint: 30,
      turnoverRate: 3.2,
      daysOnHand: 114,
      status: 'overstock',
      value: 69420
    },
    {
      id: '5',
      sku: 'OP-PS-5001',
      name: 'Outdoor Patio Set',
      category: 'Outdoor',
      currentStock: 23,
      reorderPoint: 20,
      turnoverRate: 5.7,
      daysOnHand: 64,
      status: 'in_stock',
      value: 7360
    }
  ]);

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'overstock': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in_stock': return <Package className="w-4 h-4 text-green-500" />;
      case 'low_stock': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'out_of_stock': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'overstock': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredItems = inventoryItems.filter(item => 
    categoryFilter === 'all' || item.category === categoryFilter
  );

  const totalValue = filteredItems.reduce((sum, item) => sum + item.value, 0);
  const lowStockCount = filteredItems.filter(item => item.status === 'low_stock').length;
  const outOfStockCount = filteredItems.filter(item => item.status === 'out_of_stock').length;
  const overstockCount = filteredItems.filter(item => item.status === 'overstock').length;
  const avgTurnover = filteredItems.reduce((sum, item) => sum + item.turnoverRate, 0) / filteredItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-8 h-8 text-orange-600" />
              <h1 className="text-4xl font-bold text-gray-900">Inventory Reports</h1>
            </div>
            <p className="text-xl text-gray-600">
              Comprehensive inventory analysis with stock level monitoring, turnover rates, and supply chain insights.
            </p>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="current_month">Current Month</option>
              <option value="last_quarter">Last Quarter</option>
              <option value="ytd">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Inventory Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Inventory Value</p>
                <p className="text-3xl font-bold text-blue-600">${totalValue.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-3xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
              <Package className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overstock Items</p>
                <p className="text-3xl font-bold text-purple-600">{overstockCount}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Turnover</p>
                <p className="text-3xl font-bold text-green-600">{avgTurnover.toFixed(1)}x</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg border mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Office">Office</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </button>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Generate Reorder Report
                </button>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                  Stock Alerts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Items Table */}
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Point</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnover Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days on Hand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.currentStock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reorderPoint}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.turnoverRate.toFixed(1)}x
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.daysOnHand} days</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${item.value.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Analysis Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Stock Level Distribution</h3>
            <div className="space-y-4">
              {['In Stock', 'Low Stock', 'Out of Stock', 'Overstock'].map((status, index) => {
                const counts = {
                  'In Stock': inventoryItems.filter(i => i.status === 'in_stock').length,
                  'Low Stock': inventoryItems.filter(i => i.status === 'low_stock').length,
                  'Out of Stock': inventoryItems.filter(i => i.status === 'out_of_stock').length,
                  'Overstock': inventoryItems.filter(i => i.status === 'overstock').length
                };
                
                const count = counts[status as keyof typeof counts];
                const percentage = (count / inventoryItems.length) * 100;
                const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500'];
                
                return (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{status}</span>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">{count}</span>
                        <span className="text-xs text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${colors[index]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Turnover Analysis</h3>
            <div className="space-y-4">
              {inventoryItems.slice(0, 5).map((item, index) => {
                const maxTurnover = Math.max(...inventoryItems.map(i => i.turnoverRate));
                const percentage = (item.turnoverRate / maxTurnover) * 100;
                
                return (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900 truncate">{item.name}</span>
                      <span className="text-sm font-bold text-gray-900">{item.turnoverRate.toFixed(1)}x</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Inventory Insights</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Office chairs show highest turnover (8.1x)</div>
                <div>• Premium bedroom sets need rebalancing</div>
                <div>• Living room furniture maintains steady flow</div>
                <div>• Outdoor items follow seasonal patterns</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReports;