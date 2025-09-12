import React, { useState } from 'react'
import { useProducts } from '../../../hooks/useProducts'
import { useOrders } from '../../../hooks/useOrders'
import { useAuth } from '../../../contexts/AuthContext'

export function QuickOrder() {
  const [selectedProducts, setSelectedProducts] = useState<Array<{id: string, name: string, price: number, quantity: number}>>([])
  const [loading, setLoading] = useState(false)
  const { products } = useProducts()
  const { createOrder } = useOrders()
  const { profile, company } = useAuth()

  const handleAddProduct = (product: any) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p => p.id === product.id ? {...p, quantity: p.quantity + 1} : p)
      }
      return [...prev, { id: product.id, name: product.name, price: product.dealer_price || 0, quantity: 1 }]
    })
  }

  const handleSubmitOrder = async () => {
    if (!selectedProducts.length || !company) return
    
    setLoading(true)
    try {
      await createOrder({
        order_type: 'quick_order',
        shipping_address: {
          line1: company.address,
          city: company.city,
          state: company.state,
          postal_code: company.postal_code,
          country: company.country
        },
        items: selectedProducts.map(p => ({
          product_id: p.id,
          quantity: p.quantity,
          price: p.price
        }))
      })
      setSelectedProducts([])
      alert('Order created successfully!')
    } catch (error) {
      alert('Failed to create order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Order</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-3">Available Products</h3>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {products.slice(0, 10).map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">${product.dealer_price}</div>
                </div>
                <button
                  onClick={() => handleAddProduct(product)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Selected Items</h3>
          {selectedProducts.length === 0 ? (
            <p className="text-gray-500">No items selected</p>
          ) : (
            <div className="space-y-2">
              {selectedProducts.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price}</div>
                  </div>
                  <div className="font-semibold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${selectedProducts.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleSubmitOrder}
                disabled={loading}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Creating Order...' : 'Create Order'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}