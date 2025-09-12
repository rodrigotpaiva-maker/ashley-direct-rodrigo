import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  sku: string;
  price: number;
  status: 'Active' | 'Inactive' | 'Discontinued';
  stockQuantity: number;
  description: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  weight: number;
  material: string;
  color: string;
  manufacturer: string;
  images: string[];
  tags: string[];
  dateAdded: string;
  lastUpdated: string;
}

const ProductCatalog: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 'PROD-001',
      name: 'Executive Leather Office Chair',
      category: 'Office Furniture',
      subcategory: 'Seating',
      sku: 'ASH-CH-001',
      price: 1299.99,
      status: 'Active',
      stockQuantity: 45,
      description: 'Premium executive chair with genuine leather upholstery and ergonomic design.',
      dimensions: { length: 28, width: 30, height: 48 },
      weight: 55,
      material: 'Genuine Leather, Steel Frame',
      color: 'Black',
      manufacturer: 'Ashley Furniture',
      images: ['/images/chair-executive-black.jpg', '/images/chair-executive-side.jpg'],
      tags: ['Executive', 'Leather', 'Ergonomic', 'Premium'],
      dateAdded: '2024-10-15',
      lastUpdated: '2024-12-01'
    },
    {
      id: 'PROD-002',
      name: 'Modern Sectional Sofa',
      category: 'Living Room',
      subcategory: 'Seating',
      sku: 'ASH-SO-001',
      price: 3299.99,
      status: 'Active',
      stockQuantity: 12,
      description: 'Contemporary L-shaped sectional sofa perfect for modern living spaces.',
      dimensions: { length: 108, width: 84, height: 35 },
      weight: 185,
      material: 'Fabric, Hardwood Frame',
      color: 'Charcoal Gray',
      manufacturer: 'Ashley Furniture',
      images: ['/images/sofa-sectional-charcoal.jpg', '/images/sofa-sectional-detail.jpg'],
      tags: ['Sectional', 'Modern', 'Living Room', 'Comfort'],
      dateAdded: '2024-09-20',
      lastUpdated: '2024-11-28'
    },
    {
      id: 'PROD-003',
      name: 'Glass Top Conference Table',
      category: 'Office Furniture',
      subcategory: 'Tables',
      sku: 'ASH-TB-001',
      price: 2199.99,
      status: 'Active',
      stockQuantity: 8,
      description: 'Professional 8-person conference table with tempered glass top.',
      dimensions: { length: 96, width: 42, height: 30 },
      weight: 120,
      material: 'Tempered Glass, Steel Base',
      color: 'Clear Glass with Black Base',
      manufacturer: 'Ashley Furniture',
      images: ['/images/table-conference-glass.jpg', '/images/table-conference-base.jpg'],
      tags: ['Conference', 'Glass', 'Professional', 'Meeting'],
      dateAdded: '2024-08-10',
      lastUpdated: '2024-11-15'
    },
    {
      id: 'PROD-004',
      name: 'King Size Platform Bed',
      category: 'Bedroom',
      subcategory: 'Beds',
      sku: 'ASH-BD-001',
      price: 1899.99,
      status: 'Active',
      stockQuantity: 22,
      description: 'Elegant king size platform bed with built-in storage drawers.',
      dimensions: { length: 86, width: 80, height: 14 },
      weight: 145,
      material: 'Solid Wood, MDF',
      color: 'Walnut Finish',
      manufacturer: 'Ashley Furniture',
      images: ['/images/bed-platform-walnut.jpg', '/images/bed-platform-storage.jpg'],
      tags: ['King Size', 'Platform', 'Storage', 'Walnut'],
      dateAdded: '2024-07-25',
      lastUpdated: '2024-12-05'
    },
    {
      id: 'PROD-005',
      name: 'Adjustable Standing Desk',
      category: 'Office Furniture',
      subcategory: 'Desks',
      sku: 'ASH-DK-001',
      price: 1599.99,
      status: 'Active',
      stockQuantity: 18,
      description: 'Electric height-adjustable desk for modern workspaces.',
      dimensions: { length: 60, width: 30, height: 48 },
      weight: 85,
      material: 'Laminated Wood, Steel Frame',
      color: 'Oak Finish',
      manufacturer: 'Ashley Furniture',
      images: ['/images/desk-standing-oak.jpg', '/images/desk-standing-adjusted.jpg'],
      tags: ['Standing', 'Adjustable', 'Electric', 'Ergonomic'],
      dateAdded: '2024-11-01',
      lastUpdated: '2024-12-03'
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('name');

  const categories = [...new Set(products.map(p => p.category))];

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-yellow-100 text-yellow-800';
      case 'Discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (quantity <= 10) return { text: 'Low Stock', color: 'text-yellow-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || product.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price': return b.price - a.price;
        case 'stock': return b.stockQuantity - a.stockQuantity;
        case 'dateAdded': return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default: return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Products</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, SKU, or description..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Discontinued">Discontinued</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="name">Name</option>
              <option value="price">Price (High to Low)</option>
              <option value="stock">Stock Level</option>
              <option value="dateAdded">Date Added (Newest)</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stockQuantity);
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.sku}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="text-sm font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Price:</span>
                      <span className="text-sm font-bold text-gray-900">${product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span className={`text-sm font-medium ${stockStatus.color}`}>
                        {product.stockQuantity} units ({stockStatus.text})
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                    {product.tags.length > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        +{product.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stockQuantity);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.sku}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${stockStatus.color}`}>
                          {product.stockQuantity} ({stockStatus.text})
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
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
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">{selectedProduct.name}</h3>
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
                {/* Product Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Product Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">SKU</label>
                        <p className="text-sm text-gray-900">{selectedProduct.sku}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <p className="text-sm text-gray-900">{selectedProduct.category}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <p className="text-sm text-gray-900">{selectedProduct.subcategory}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedProduct.status)}`}>
                          {selectedProduct.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <p className="text-sm text-gray-900">{selectedProduct.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Specifications</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Dimensions (L×W×H)</label>
                        <p className="text-sm text-gray-900">
                          {selectedProduct.dimensions.length}" × {selectedProduct.dimensions.width}" × {selectedProduct.dimensions.height}"
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Weight</label>
                        <p className="text-sm text-gray-900">{selectedProduct.weight} lbs</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Material</label>
                        <p className="text-sm text-gray-900">{selectedProduct.material}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Color</label>
                        <p className="text-sm text-gray-900">{selectedProduct.color}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Pricing and Inventory */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Pricing & Inventory</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Current Price</label>
                          <p className="text-2xl font-bold text-gray-900">${selectedProduct.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                          <p className="text-2xl font-bold text-gray-900">{selectedProduct.stockQuantity}</p>
                          <p className={`text-sm font-medium ${getStockStatus(selectedProduct.stockQuantity).color}`}>
                            {getStockStatus(selectedProduct.stockQuantity).text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tags.map((tag, index) => (
                        <span key={index} className="inline-flex px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date Added</label>
                      <p className="text-sm text-gray-900">{selectedProduct.dateAdded}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                      <p className="text-sm text-gray-900">{selectedProduct.lastUpdated}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                    <p className="text-sm text-gray-900">{selectedProduct.manufacturer}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Close
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;