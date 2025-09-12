import React, { useState } from 'react';
import { 
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  CalculatorIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Product {
  id: string;
  sku: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  stockQuantity: number;
  image: string;
  dimensions: string;
  material: string;
  color: string;
  description: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  customizations?: Record<string, string>;
}

interface CreateOrderProps {
  className?: string;
}

const CreateOrder: React.FC<CreateOrderProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: '1',
      sku: 'ASH-SF-2401',
      name: 'Ashley Signature 3-Piece Sectional Sofa',
      collection: 'Signature Living',
      category: 'Living Room',
      price: 2899.99,
      discountPrice: 2399.99,
      inStock: true,
      stockQuantity: 45,
      image: '/images/products/sectional-sofa.jpg',
      dimensions: '118"W x 85"D x 38"H',
      material: 'Premium Fabric',
      color: 'Charcoal Gray',
      description: 'Luxurious 3-piece sectional with deep seating and premium cushioning'
    },
    {
      id: '2',
      sku: 'ASH-RC-2402',
      name: 'Ashley Power Reclining Chair',
      collection: 'Comfort Plus',
      category: 'Living Room',
      price: 1299.99,
      inStock: true,
      stockQuantity: 23,
      image: '/images/products/reclining-chair.jpg',
      dimensions: '42"W x 44"D x 43"H',
      material: 'Genuine Leather',
      color: 'Brown',
      description: 'Power reclining chair with USB charging ports and memory foam'
    },
    {
      id: '3',
      sku: 'ASH-BD-2403',
      name: 'Ashley Platform Bed with Storage',
      collection: 'Modern Sleep',
      category: 'Bedroom',
      price: 1899.99,
      discountPrice: 1599.99,
      inStock: true,
      stockQuantity: 12,
      image: '/images/products/platform-bed.jpg',
      dimensions: '86"W x 65"D x 54"H',
      material: 'Engineered Wood',
      color: 'Rustic Oak',
      description: 'King size platform bed with built-in storage drawers'
    },
    {
      id: '4',
      sku: 'ASH-DR-2404',
      name: 'Ashley Dining Table Set',
      collection: 'Farmhouse',
      category: 'Dining Room',
      price: 1599.99,
      inStock: false,
      stockQuantity: 0,
      image: '/images/products/dining-set.jpg',
      dimensions: '78"W x 42"D x 30"H',
      material: 'Solid Wood',
      color: 'Weathered Oak',
      description: '7-piece dining set with extendable table and upholstered chairs'
    },
    {
      id: '5',
      sku: 'ASH-MT-2405',
      name: 'Ashley Memory Foam Mattress',
      collection: 'Sleep Solutions',
      category: 'Mattresses',
      price: 899.99,
      discountPrice: 749.99,
      inStock: true,
      stockQuantity: 67,
      image: '/images/products/memory-foam-mattress.jpg',
      dimensions: '80"L x 76"W x 12"H',
      material: 'Memory Foam',
      color: 'White',
      description: 'King size memory foam mattress with cooling gel technology'
    },
    {
      id: '6',
      sku: 'ASH-OF-2406',
      name: 'Ashley Executive Office Desk',
      collection: 'Professional',
      category: 'Office',
      price: 1199.99,
      inStock: true,
      stockQuantity: 18,
      image: '/images/products/office-desk.jpg',
      dimensions: '60"W x 30"D x 30"H',
      material: 'Laminated Wood',
      color: 'Espresso',
      description: 'Executive desk with built-in wire management and storage'
    }
  ];

  const categories = [
    'all',
    'Living Room',
    'Bedroom',
    'Dining Room',
    'Mattresses',
    'Office'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.collection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToOrder = (product: Product, quantity: number = 1) => {
    setOrderItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setOrderItems(prev => 
        prev.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmitOrder = () => {
    if (orderItems.length === 0) return;
    
    // Submit order logic here
    console.log('Submitting order:', orderItems);
    alert('Order submitted successfully!');
    setOrderItems([]);
    setShowCart(false);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingCartIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Order</h1>
              <p className="text-gray-600 mt-1">Browse products and build your furniture order</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowCart(true)}
              className="relative flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span>Cart ({getTotalItems()})</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
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
              placeholder="Search products by name, SKU, or collection..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors">
            {/* Product Image */}
            <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
              <DocumentTextIcon className="w-16 h-16 text-gray-400" />
              {product.discountPrice && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                  SALE
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium">Out of Stock</span>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs text-gray-500">{product.sku}</span>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{product.collection}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium text-xs">{product.dimensions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Material:</span>
                  <span className="font-medium">{product.material}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{product.color}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  {product.discountPrice ? (
                    <div>
                      <span className="text-lg font-bold text-green-600">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <InformationCircleIcon className="w-4 h-4 inline mr-1" />
                  Details
                </button>
                <button 
                  onClick={() => addToOrder(product)}
                  disabled={!product.inStock}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <PlusIcon className="w-4 h-4 inline mr-1" />
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Order Cart</h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {orderItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCartIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.product.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                          <p className="text-xs text-gray-600">{item.product.sku}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                          >
                            <MinusIcon className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                          >
                            <PlusIcon className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-600">
                            ${(item.product.discountPrice || item.product.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="font-medium text-gray-900">${getTotalAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Tax (8.5%):</span>
                      <span className="font-medium text-gray-900">${(getTotalAmount() * 0.085).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4 text-lg font-bold">
                      <span>Total:</span>
                      <span>${(getTotalAmount() * 1.085).toFixed(2)}</span>
                    </div>
                    
                    <button 
                      onClick={handleSubmitOrder}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Submit Order</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <DocumentTextIcon className="w-24 h-24 text-gray-400" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-gray-600">{selectedProduct.collection}</p>
                  <p className="text-sm text-gray-500">{selectedProduct.sku}</p>
                </div>
                
                <p className="text-gray-700">{selectedProduct.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Category</span>
                    <span className="text-gray-900">{selectedProduct.category}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Dimensions</span>
                    <span className="text-gray-900">{selectedProduct.dimensions}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Material</span>
                    <span className="text-gray-900">{selectedProduct.material}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Color</span>
                    <span className="text-gray-900">{selectedProduct.color}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div>
                    {selectedProduct.discountPrice ? (
                      <div>
                        <span className="text-2xl font-bold text-green-600">${selectedProduct.discountPrice.toFixed(2)}</span>
                        <span className="text-lg text-gray-500 line-through ml-2">${selectedProduct.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">${selectedProduct.price.toFixed(2)}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      addToOrder(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    disabled={!selectedProduct.inStock}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      selectedProduct.inStock
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedProduct.inStock ? 'Add to Order' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;