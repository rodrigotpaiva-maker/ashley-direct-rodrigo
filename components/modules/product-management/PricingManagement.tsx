import React, { useState } from 'react';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  discount_percentage: number;
  min_quantity: number;
  valid_until?: string;
}

interface ProductPricing {
  id: string;
  productName: string;
  sku: string;
  category: string;
  base_price: number;
  cost_price: number;
  margin_percentage: number;
  msrp: number;
  pricing_tiers: PricingTier[];
  price_history: {
    date: string;
    price: number;
    reason: string;
  }[];
  competitor_pricing?: {
    competitor: string;
    price: number;
    date_checked: string;
  }[];
  lastUpdated: string;
}

const PricingManagement: React.FC = () => {
  const [products] = useState<ProductPricing[]>([
    {
      id: 'PRICE-001',
      productName: 'Executive Leather Office Chair',
      sku: 'ASH-CH-001',
      category: 'Office Seating',
      base_price: 1299.99,
      cost_price: 650.00,
      margin_percentage: 50,
      msrp: 1599.99,
      pricing_tiers: [
        { id: 'tier1', name: 'Dealer Volume', description: '10+ units', discount_percentage: 15, min_quantity: 10, valid_until: '2025-12-31' },
        { id: 'tier2', name: 'Wholesale', description: '50+ units', discount_percentage: 25, min_quantity: 50, valid_until: '2025-12-31' },
        { id: 'tier3', name: 'Contract', description: '100+ units', discount_percentage: 35, min_quantity: 100, valid_until: '2025-12-31' }
      ],
      price_history: [
        { date: '2024-12-01', price: 1299.99, reason: 'Regular pricing' },
        { date: '2024-11-01', price: 1249.99, reason: 'Black Friday promotion' },
        { date: '2024-10-01', price: 1299.99, reason: 'End of promotion' },
        { date: '2024-09-01', price: 1199.99, reason: 'Inventory clearance' }
      ],
      competitor_pricing: [
        { competitor: 'Herman Miller', price: 1895.00, date_checked: '2024-12-08' },
        { competitor: 'Steelcase', price: 1650.00, date_checked: '2024-12-08' },
        { competitor: 'Haworth', price: 1425.00, date_checked: '2024-12-07' }
      ],
      lastUpdated: '2024-12-08'
    },
    {
      id: 'PRICE-002',
      productName: 'Modern Sectional Sofa',
      sku: 'ASH-SO-001',
      category: 'Living Room',
      base_price: 3299.99,
      cost_price: 1650.00,
      margin_percentage: 50,
      msrp: 3999.99,
      pricing_tiers: [
        { id: 'tier1', name: 'Dealer Volume', description: '5+ units', discount_percentage: 12, min_quantity: 5, valid_until: '2025-12-31' },
        { id: 'tier2', name: 'Wholesale', description: '20+ units', discount_percentage: 20, min_quantity: 20, valid_until: '2025-12-31' },
        { id: 'tier3', name: 'Contract', description: '50+ units', discount_percentage: 28, min_quantity: 50, valid_until: '2025-12-31' }
      ],
      price_history: [
        { date: '2024-12-01', price: 3299.99, reason: 'Regular pricing' },
        { date: '2024-11-15', price: 2999.99, reason: 'Holiday sale' },
        { date: '2024-10-01', price: 3299.99, reason: 'End of summer sale' }
      ],
      competitor_pricing: [
        { competitor: 'West Elm', price: 3599.00, date_checked: '2024-12-08' },
        { competitor: 'Pottery Barn', price: 3895.00, date_checked: '2024-12-08' },
        { competitor: 'Crate & Barrel', price: 3299.00, date_checked: '2024-12-07' }
      ],
      lastUpdated: '2024-12-08'
    },
    {
      id: 'PRICE-003',
      productName: 'Glass Top Conference Table',
      sku: 'ASH-TB-001',
      category: 'Office Tables',
      base_price: 2199.99,
      cost_price: 1100.00,
      margin_percentage: 50,
      msrp: 2699.99,
      pricing_tiers: [
        { id: 'tier1', name: 'Dealer Volume', description: '3+ units', discount_percentage: 18, min_quantity: 3, valid_until: '2025-12-31' },
        { id: 'tier2', name: 'Wholesale', description: '10+ units', discount_percentage: 25, min_quantity: 10, valid_until: '2025-12-31' },
        { id: 'tier3', name: 'Contract', description: '25+ units', discount_percentage: 32, min_quantity: 25, valid_until: '2025-12-31' }
      ],
      price_history: [
        { date: '2024-12-01', price: 2199.99, reason: 'Regular pricing' },
        { date: '2024-11-01', price: 2099.99, reason: 'Q4 promotion' },
        { date: '2024-09-15', price: 2199.99, reason: 'End of back-to-office promotion' }
      ],
      competitor_pricing: [
        { competitor: 'Hon', price: 2450.00, date_checked: '2024-12-08' },
        { competitor: 'Knoll', price: 2895.00, date_checked: '2024-12-08' },
        { competitor: 'Global Furniture', price: 2150.00, date_checked: '2024-12-07' }
      ],
      lastUpdated: '2024-12-08'
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<ProductPricing | null>(null);
  const [showBulkPricing, setShowBulkPricing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priceChangeData, setPriceChangeData] = useState({
    type: 'percentage',
    value: '',
    reason: '',
    apply_to: 'selected'
  });

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const calculateTierPrice = (basePrice: number, discountPercentage: number) => {
    return basePrice * (1 - discountPercentage / 100);
  };

  const getMarginColor = (margin: number) => {
    if (margin >= 50) return 'text-green-600';
    if (margin >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompetitivePosition = (ourPrice: number, competitorPrices: any[]) => {
    const avgCompetitorPrice = competitorPrices.reduce((sum, comp) => sum + comp.price, 0) / competitorPrices.length;
    const difference = ((ourPrice - avgCompetitorPrice) / avgCompetitorPrice * 100);
    
    if (difference <= -10) return { text: 'Very Competitive', color: 'text-green-600' };
    if (difference <= 0) return { text: 'Competitive', color: 'text-green-500' };
    if (difference <= 10) return { text: 'Market Rate', color: 'text-yellow-600' };
    return { text: 'Above Market', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-900">Pricing Management</h3>
          <p className="text-gray-600">Manage product pricing, tiers, and competitive analysis</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowBulkPricing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Bulk Price Update
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Export Pricing
          </button>
        </div>
      </div>

      {/* Pricing Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Average Margin</h4>
          <p className="text-2xl font-bold text-gray-900">48.5%</p>
          <p className="text-sm text-green-600">+2.3% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Total Revenue</h4>
          <p className="text-2xl font-bold text-gray-900">$2.4M</p>
          <p className="text-sm text-blue-600">Current month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Price Changes</h4>
          <p className="text-2xl font-bold text-gray-900">127</p>
          <p className="text-sm text-gray-600">This quarter</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="text-sm font-medium text-gray-500">Competitive Score</h4>
          <p className="text-2xl font-bold text-gray-900">8.2/10</p>
          <p className="text-sm text-green-600">Above average</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Products</label>
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
          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              Advanced Filters
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost / Margin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MSRP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competitive Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pricing Tiers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const competitivePosition = getCompetitivePosition(product.base_price, product.competitor_pricing || []);
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.productName}</p>
                        <p className="text-sm text-gray-500">{product.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-lg font-bold text-gray-900">${product.base_price.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-gray-900">${product.cost_price.toLocaleString()}</p>
                        <p className={`text-sm font-medium ${getMarginColor(product.margin_percentage)}`}>
                          {product.margin_percentage}% margin
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.msrp.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${competitivePosition.color}`}>
                        {competitivePosition.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{product.pricing_tiers.length} tiers</p>
                      <p className="text-sm text-gray-500">Up to {Math.max(...product.pricing_tiers.map(t => t.discount_percentage))}% off</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">Edit</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Pricing Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{selectedProduct.productName}</h3>
                  <p className="text-gray-600">{selectedProduct.sku} - Pricing Details</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Pricing */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Current Pricing Structure</h4>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Base Price</label>
                          <p className="text-2xl font-bold text-gray-900">${selectedProduct.base_price.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">MSRP</label>
                          <p className="text-lg font-medium text-gray-700">${selectedProduct.msrp.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Cost Price</label>
                          <p className="text-lg font-medium text-gray-700">${selectedProduct.cost_price.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Margin</label>
                          <p className={`text-lg font-bold ${getMarginColor(selectedProduct.margin_percentage)}`}>
                            {selectedProduct.margin_percentage}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Pricing Tiers</h4>
                    <div className="space-y-3">
                      {selectedProduct.pricing_tiers.map((tier) => (
                        <div key={tier.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium text-gray-900">{tier.name}</h5>
                              <p className="text-sm text-gray-600">{tier.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                ${calculateTierPrice(selectedProduct.base_price, tier.discount_percentage).toLocaleString()}
                              </p>
                              <p className="text-sm text-green-600">{tier.discount_percentage}% off</p>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Min quantity: {tier.min_quantity}</span>
                            {tier.valid_until && <span>Valid until: {tier.valid_until}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Competitive Analysis & History */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Competitive Analysis</h4>
                    {selectedProduct.competitor_pricing && (
                      <div className="space-y-3">
                        {selectedProduct.competitor_pricing.map((comp, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-gray-900">{comp.competitor}</p>
                              <p className="text-sm text-gray-500">Checked: {comp.date_checked}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">${comp.price.toLocaleString()}</p>
                              <p className={`text-sm ${
                                comp.price > selectedProduct.base_price ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {comp.price > selectedProduct.base_price ? '+' : ''}
                                ${(comp.price - selectedProduct.base_price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Price History</h4>
                    <div className="space-y-3">
                      {selectedProduct.price_history.map((entry, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border-l-4 border-blue-500 bg-blue-50">
                          <div>
                            <p className="font-medium text-gray-900">${entry.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{entry.reason}</p>
                          </div>
                          <p className="text-sm text-gray-500">{entry.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t mt-8">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Update Pricing
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  Add Pricing Tier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Pricing Modal */}
      {showBulkPricing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">Bulk Price Update</h3>
                <button
                  onClick={() => setShowBulkPricing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Change Type</label>
                  <select
                    value={priceChangeData.type}
                    onChange={(e) => setPriceChangeData({...priceChangeData, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="percentage">Percentage Change</option>
                    <option value="fixed">Fixed Amount Change</option>
                    <option value="margin">Target Margin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {priceChangeData.type === 'percentage' ? 'Percentage (%)' : 
                     priceChangeData.type === 'fixed' ? 'Amount ($)' : 'Target Margin (%)'}
                  </label>
                  <input
                    type="number"
                    value={priceChangeData.value}
                    onChange={(e) => setPriceChangeData({...priceChangeData, value: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter value"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apply To</label>
                  <select
                    value={priceChangeData.apply_to}
                    onChange={(e) => setPriceChangeData({...priceChangeData, apply_to: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="selected">Selected Products</option>
                    <option value="category">Entire Category</option>
                    <option value="all">All Products</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Change</label>
                  <textarea
                    value={priceChangeData.reason}
                    onChange={(e) => setPriceChangeData({...priceChangeData, reason: e.target.value})}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter reason for price change..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
                <button
                  onClick={() => setShowBulkPricing(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Preview Changes
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingManagement;