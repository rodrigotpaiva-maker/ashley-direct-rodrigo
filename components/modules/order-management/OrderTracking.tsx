import React from 'react'
import { useOrders } from '../../../hooks/useOrders'

export function OrderTracking() {
  const { orders, loading } = useOrders()

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Order Tracking</h2>
      
      <div className="space-y-4">
        {orders.slice(0, 5).map(order => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Order #{order.order_number}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'shipped' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <div>Order Date: {new Date(order.order_date || '').toLocaleDateString()}</div>
              <div>Total: ${order.total_amount}</div>
              <div>Items: {order.order_items?.length || 0}</div>
            </div>
            
            <div className="mt-3 flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                View Details
              </button>
              <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
                Track Shipment
              </button>
            </div>
          </div>
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No orders found
          </div>
        )}
      </div>
    </div>
  )
}