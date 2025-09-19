import React, { useState } from 'react'
import { Search, Users, ShoppingCart, TrendingUp, Bell, Settings, Menu, X, Package, DollarSign, Clock, Star } from 'lucide-react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Total Orders', value: '2,847', change: '+12%', icon: ShoppingCart },
    { label: 'Revenue', value: '$84,592', change: '+8%', icon: DollarSign },
    { label: 'Active Clients', value: '156', change: '+3%', icon: Users },
    { label: 'Pending Orders', value: '23', change: '-5%', icon: Clock }
  ]

  const recentOrders = [
    { id: 'AD-001', client: 'Morrison Industries', amount: '$2,340', status: 'Processing', date: '2025-01-15' },
    { id: 'AD-002', client: 'TechCorp Solutions', amount: '$1,890', status: 'Shipped', date: '2025-01-14' },
    { id: 'AD-003', client: 'Global Manufacturing', amount: '$3,250', status: 'Delivered', date: '2025-01-13' },
    { id: 'AD-004', client: 'Premier Logistics', amount: '$4,100', status: 'Processing', date: '2025-01-12' }
  ]

  const topProducts = [
    { name: 'Industrial Bearing Set', sales: 89, revenue: '$15,680' },
    { name: 'Heavy-Duty Motor', sales: 67, revenue: '$12,340' },
    { name: 'Precision Tools Kit', sales: 54, revenue: '$9,860' },
    { name: 'Safety Equipment Bundle', sales: 43, revenue: '$7,920' }
  ]

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: TrendingUp },
    { name: 'Orders', id: 'orders', icon: ShoppingCart },
    { name: 'Products', id: 'products', icon: Package },
    { name: 'Clients', id: 'clients', icon: Users },
    { name: 'Settings', id: 'settings', icon: Settings }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800'
      case 'Shipped': return 'bg-blue-100 text-blue-800'
      case 'Delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-gray-900">Ashley Direct</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 ${
                  activeTab === item.id ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-900 capitalize">{activeTab}</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <main className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} from last month</p>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.client}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{order.amount}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.sales} sales</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500 ml-1">4.8</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* Other Tab Contents */}
        {activeTab !== 'dashboard' && (
          <main className="p-6">
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {navigation.find(nav => nav.id === activeTab)?.name} Section
              </h3>
              <p className="text-gray-600 mb-6">
                This section is part of the Ashley Direct B2B platform prototype. 
                Click on different navigation items to explore the interface.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">
                  Interactive prototype showcasing modern B2B dashboard design
                </p>
              </div>
            </div>
          </main>
        )}

        {/* Footer */}
        <footer className="bg-white border-t mt-8">
          <div className="px-6 py-4">
            <p className="text-xs text-gray-500 text-center">
              powered by rodrigo
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App