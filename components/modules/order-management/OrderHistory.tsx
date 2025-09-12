import React from 'react'
import { useOrders } from '../../../hooks/useOrders'

export default function OrderHistory() {
  const { orders, loading } = useOrders()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Order History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {orders.map(order => (
            <div key={order.id} className="border-b pb-2">
              <div className="flex justify-between">
                <span>#{order.order_number}</span>
                <span>${order.total_amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}