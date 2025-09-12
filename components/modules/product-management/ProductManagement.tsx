import React, { useState } from 'react';
import {
  ProductCatalog,
  ProductSpecifications,
  PricingManagement,
  InventoryTracking
} from './';

type ProductTab = 'catalog' | 'specifications' | 'pricing' | 'inventory';

interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  outOfStock: number;
  lowStock: number;
  totalCategories: number;
  avgPrice: number;
  newProductsThisMonth: number;
  topSellingCategory: string;
}

const ProductManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductTab>('catalog');
  
  // Mock product statistics
  const [stats] = useState<ProductStats>({
    totalProducts: 1247,
    activeProducts: 1186,
    outOfStock: 23,
    lowStock: 38,
    totalCategories: 12,
    avgPrice: 1850,
    newProductsThisMonth: 15,
    topSellingCategory: 'Living Room'
  });

  const tabs = [
    { id: 'catalog' as ProductTab, name: 'Product Catalog', icon: '📋' },
    { id: 'specifications' as ProductTab, name: 'Specifications', icon: '📝' },
    { id: 'pricing' as ProductTab, name: 'Pricing Management', icon: '💰' },
    { id: 'inventory' as ProductTab, name: 'Inventory Tracking', icon: '📦' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'catalog':
        return <ProductCatalog />;
      case 'specifications':
        return <ProductSpecifications />;
      case 'pricing':
        return <PricingManagement />;
      case 'inventory':
        return <InventoryTracking />;
      default:
        return <ProductCatalog />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your furniture catalog, pricing, and inventory</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Add New Product
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Bulk Import
          </button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts.toLocaleString()}</p>
            </div>
            <div className="text-2xl text-blue-600">📦</div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">{stats.activeProducts} active</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Stock Status</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.outOfStock + stats.lowStock}</p>
            </div>
            <div className="text-2xl text-orange-600">⚠️</div>
          </div>
          <div className="mt-2 space-x-4">
            <span className="text-sm text-red-600">{stats.outOfStock} out of stock</span>
            <span className="text-sm text-yellow-600">{stats.lowStock} low stock</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Average Price</h3>
              <p className="text-2xl font-bold text-gray-900">${stats.avgPrice.toLocaleString()}</p>
            </div>
            <div className="text-2xl text-green-600">💰</div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Across all categories</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">New This Month</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.newProductsThisMonth}</p>
            </div>
            <div className="text-2xl text-purple-600">✨</div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">Products added</span>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Category Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'Living Room', products: 245, revenue: '$1.2M', trend: '+8%' },
            { name: 'Bedroom', products: 198, revenue: '$890K', trend: '+12%' },
            { name: 'Dining Room', products: 156, revenue: '$650K', trend: '+5%' },
            { name: 'Office', products: 189, revenue: '$780K', trend: '+15%' },
            { name: 'Outdoor', products: 124, revenue: '$420K', trend: '+3%' },
            { name: 'Storage', products: 98, revenue: '$310K', trend: '+7%' },
            { name: 'Accent Pieces', products: 145, revenue: '$520K', trend: '+9%' },
            { name: 'Lighting', products: 92, revenue: '$280K', trend: '+6%' }
          ].map((category, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.products} products</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-gray-900">{category.revenue}</span>
                <span className="text-sm text-green-600">{category.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors flex items-center space-x-2`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              📋 Generate Product Report
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              💰 Update Bulk Pricing
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              📦 Import Inventory
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              🏷️ Manage Categories
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Added 3 new Living Room products</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Updated pricing for Office category</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Low stock alert: 5 products</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New category 'Smart Furniture' created</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Top Performing Products</h3>
          <div className="space-y-3">
            {[
              { name: 'Executive Leather Chair', sales: '$45K', trend: '+25%' },
              { name: 'Modern Sectional Sofa', sales: '$38K', trend: '+18%' },
              { name: 'Glass Conference Table', sales: '$32K', trend: '+22%' },
              { name: 'Adjustable Standing Desk', sales: '$28K', trend: '+30%' }
            ].map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} this month</p>
                </div>
                <span className="text-sm text-green-600">{product.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;