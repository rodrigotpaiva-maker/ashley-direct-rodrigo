import React, { useState } from 'react';
import { Calculator, TrendingDown, TrendingUp, PieChart, BarChart3, DollarSign, Package, Truck, Building, Filter, Download } from 'lucide-react';

interface CostCategory {
  id: string;
  name: string;
  totalCost: number;
  budgetedCost: number;
  variance: number;
  variancePercent: number;
  subcategories: {
    name: string;
    cost: number;
    percentage: number;
  }[];
}

interface ProductCost {
  id: string;
  productName: string;
  sku: string;
  unitCost: number;
  sellingPrice: number;
  margin: number;
  marginPercent: number;
  volume: number;
  category: string;
}

const CostAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('current_month');
  const [selectedCategory, setSelectedCategory] = useState<CostCategory | null>(null);

  const [costCategories] = useState<CostCategory[]>([
    {
      id: '1',
      name: 'Cost of Goods Sold',
      totalCost: 5250000,
      budgetedCost: 5400000,
      variance: -150000,
      variancePercent: -2.8,
      subcategories: [
        { name: 'Raw Materials', cost: 3150000, percentage: 60.0 },
        { name: 'Manufacturing Labor', cost: 1575000, percentage: 30.0 },
        { name: 'Factory Overhead', cost: 525000, percentage: 10.0 }
      ]
    },
    {
      id: '2',
      name: 'Operating Expenses',
      totalCost: 1875000,
      budgetedCost: 1950000,
      variance: -75000,
      variancePercent: -3.8,
      subcategories: [
        { name: 'Sales & Marketing', cost: 750000, percentage: 40.0 },
        { name: 'Administrative', cost: 562500, percentage: 30.0 },
        { name: 'Facilities', cost: 375000, percentage: 20.0 },
        { name: 'Technology', cost: 187500, percentage: 10.0 }
      ]
    },
    {
      id: '3',
      name: 'Distribution & Logistics',
      totalCost: 875000,
      budgetedCost: 900000,
      variance: -25000,
      variancePercent: -2.8,
      subcategories: [
        { name: 'Shipping & Freight', cost: 437500, percentage: 50.0 },
        { name: 'Warehousing', cost: 262500, percentage: 30.0 },
        { name: 'Packaging', cost: 175000, percentage: 20.0 }
      ]
    },
    {
      id: '4',
      name: 'Customer Service',
      totalCost: 425000,
      budgetedCost: 450000,
      variance: -25000,
      variancePercent: -5.6,
      subcategories: [
        { name: 'Support Staff', cost: 255000, percentage: 60.0 },
        { name: 'Returns Processing', cost: 127500, percentage: 30.0 },
        { name: 'Customer Relations', cost: 42500, percentage: 10.0 }
      ]
    }
  ]);

  const [productCosts] = useState<ProductCost[]>([
    {
      id: '1',
      productName: 'Ashley Signature Sofa Set',
      sku: 'AS-LS-1001',
      unitCost: 1250.00,
      sellingPrice: 1899.00,
      margin: 649.00,
      marginPercent: 34.2,
      volume: 145,
      category: 'Living Room'
    },
    {
      id: '2',
      productName: 'Modern Dining Table',
      sku: 'MD-DT-2002',
      unitCost: 425.00,
      sellingPrice: 699.00,
      margin: 274.00,
      marginPercent: 39.2,
      volume: 89,
      category: 'Dining Room'
    },
    {
      id: '3',
      productName: 'Executive Office Chair',
      sku: 'EO-CH-3001',
      unitCost: 165.00,
      sellingPrice: 299.00,
      margin: 134.00,
      marginPercent: 44.8,
      volume: 234,
      category: 'Office'
    },
    {
      id: '4',
      productName: 'Premium Bedroom Set',
      sku: 'PR-BS-4001',
      unitCost: 890.00,
      sellingPrice: 1299.00,
      margin: 409.00,
      marginPercent: 31.5,
      volume: 67,
      category: 'Bedroom'
    },
    {
      id: '5',
      productName: 'Outdoor Patio Set',
      sku: 'OP-PS-5001',
      unitCost: 320.00,
      sellingPrice: 549.00,
      margin: 229.00,
      marginPercent: 41.7,
      volume: 156,
      category: 'Outdoor'
    }
  ]);

  const totalCosts = costCategories.reduce((sum, cat) => sum + cat.totalCost, 0);
  const totalBudget = costCategories.reduce((sum, cat) => sum + cat.budgetedCost, 0);
  const totalVariance = totalCosts - totalBudget;
  const variancePercent = (totalVariance / totalBudget) * 100;
  
  const averageMargin = productCosts.reduce((sum, prod) => sum + prod.marginPercent, 0) / productCosts.length;
  const totalRevenue = productCosts.reduce((sum, prod) => sum + (prod.sellingPrice * prod.volume), 0);
  const totalMarginDollars = productCosts.reduce((sum, prod) => sum + (prod.margin * prod.volume), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cost Analysis</h1>
          <p className="text-xl text-gray-600">
            Comprehensive cost analysis, margin optimization, and profitability insights across all business operations.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Costs</p>
                <p className="text-3xl font-bold text-gray-900">${totalCosts.toLocaleString()}</p>
                <div className={`flex items-center mt-2 ${totalVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalVariance < 0 ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
                  <span className="text-sm">{Math.abs(variancePercent).toFixed(1)}% vs budget</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Variance</p>
                <p className={`text-3xl font-bold ${totalVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(totalVariance).toLocaleString()}
                </p>
                <div className="text-sm text-gray-500 mt-2">
                  {totalVariance < 0 ? 'Under budget' : 'Over budget'}
                </div>
              </div>
              <Calculator className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Margin</p>
                <p className="text-3xl font-bold text-green-600">{averageMargin.toFixed(1)}%</p>
                <div className="text-sm text-gray-500 mt-2">Across all products</div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Margin</p>
                <p className="text-3xl font-bold text-purple-600">${totalMarginDollars.toLocaleString()}</p>
                <div className="text-sm text-gray-500 mt-2">
                  {((totalMarginDollars / totalRevenue) * 100).toFixed(1)}% of revenue
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg border mb-8">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="current_month">Current Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="current_quarter">Current Quarter</option>
                  <option value="last_quarter">Last Quarter</option>
                  <option value="ytd">Year to Date</option>
                  <option value="custom">Custom Range</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Export Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Cost Overview', icon: PieChart },
                { id: 'categories', name: 'Cost Categories', icon: BarChart3 },
                { id: 'products', name: 'Product Margins', icon: Package },
                { id: 'trends', name: 'Cost Trends', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Cost Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cost Structure Overview</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Cost Breakdown</h3>
                    {costCategories.map((category, index) => {
                      const percentage = (category.totalCost / totalCosts) * 100;
                      return (
                        <div key={category.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-900">{category.name}</span>
                            <div className="text-right">
                              <span className="text-sm font-bold text-gray-900">
                                ${category.totalCost.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                index === 0 ? 'bg-blue-500' :
                                index === 1 ? 'bg-green-500' :
                                index === 2 ? 'bg-purple-500' :
                                'bg-orange-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Budget vs Actual Analysis</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">Cost Performance Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Budgeted:</span>
                            <span className="font-semibold">${totalBudget.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Actual:</span>
                            <span className="font-semibold">${totalCosts.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Variance:</span>
                            <span className={`font-semibold ${
                              totalVariance < 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {totalVariance < 0 ? '-' : '+'}${Math.abs(totalVariance).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Variance %:</span>
                            <span className={`font-semibold ${
                              totalVariance < 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {variancePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cost Categories Tab */}
            {activeTab === 'categories' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Detailed Cost Categories</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {costCategories.map((category) => (
                    <div key={category.id} className="bg-white border rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ${category.totalCost.toLocaleString()}
                          </div>
                          <div className={`text-sm flex items-center ${
                            category.variance < 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {category.variance < 0 ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                            {Math.abs(category.variancePercent).toFixed(1)}% vs budget
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {category.subcategories.map((sub, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{sub.name}</span>
                            <div className="text-right">
                              <span className="text-sm font-medium">${sub.cost.toLocaleString()}</span>
                              <span className="text-xs text-gray-500 ml-2">({sub.percentage}%)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium">${category.budgetedCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Variance:</span>
                          <span className={`font-medium ${
                            category.variance < 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {category.variance < 0 ? '-' : '+'}${Math.abs(category.variance).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Product Margins Tab */}
            {activeTab === 'products' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Product Margin Analysis</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin %</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Margin</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productCosts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                              <div className="text-sm text-gray-500">{product.sku}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.unitCost.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.sellingPrice.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            ${product.margin.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${
                              product.marginPercent >= 40 ? 'text-green-600' :
                              product.marginPercent >= 30 ? 'text-blue-600' :
                              product.marginPercent >= 20 ? 'text-orange-600' :
                              'text-red-600'
                            }`}>
                              {product.marginPercent.toFixed(1)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.volume}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ${(product.margin * product.volume).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Cost Trends Tab */}
            {activeTab === 'trends' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cost Trends & Insights</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Optimization Opportunities</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Manufacturing Efficiency</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Raw material costs are 2.8% under budget. Consider negotiating longer-term contracts for better rates.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Product Mix Optimization</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Executive Office Chairs show highest margin at 44.8%. Consider increasing production volume.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-orange-800">Logistics Efficiency</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          Distribution costs are well-controlled. Explore regional fulfillment centers to reduce shipping costs.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-3">Cost Efficiency by Category</h4>
                        {costCategories.map((category, index) => {
                          const efficiencyScore = Math.max(0, Math.min(100, 100 + (category.variancePercent * 10)));
                          return (
                            <div key={category.id} className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-gray-700">{category.name}</span>
                                <span className="text-sm font-medium text-gray-900">{efficiencyScore.toFixed(0)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    efficiencyScore >= 95 ? 'bg-green-500' :
                                    efficiencyScore >= 85 ? 'bg-blue-500' :
                                    efficiencyScore >= 70 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${efficiencyScore}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium text-gray-600 mb-3">Key Performance Indicators</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Cost per Unit:</span>
                            <span className="text-sm font-medium">$492.15</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Cost-to-Revenue Ratio:</span>
                            <span className="text-sm font-medium">{((totalCosts / totalRevenue) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Budget Utilization:</span>
                            <span className="text-sm font-medium">{((totalCosts / totalBudget) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;