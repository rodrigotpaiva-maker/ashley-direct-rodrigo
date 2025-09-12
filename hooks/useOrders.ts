import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { Database } from '../lib/supabase'

type Order = Database['public']['Tables']['orders']['Row']
type OrderWithItems = Order & {
  order_items: any[]
  company_name?: string
  user_name?: string
}

export function useOrders() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, profile, company } = useAuth()

  const fetchOrders = async (filters?: {
    status?: string
    dateFrom?: string
    dateTo?: string
    limit?: number
  }) => {
    try {
      if (!profile?.company_id) {
        setOrders([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      let query = supabase
        .from('orders')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status)
      }
      if (filters?.dateFrom) {
        query = query.gte('order_date', filters.dateFrom)
      }
      if (filters?.dateTo) {
        query = query.lte('order_date', filters.dateTo)
      }
      if (filters?.limit) {
        query = query.limit(filters.limit)
      }

      const { data: ordersData, error } = await query

      if (error) throw error

      if (!ordersData || ordersData.length === 0) {
        setOrders([])
        return
      }

      // Manually fetch order items for each order
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id)

          if (itemsError) {
            console.error('Error fetching order items:', itemsError)
            return { ...order, order_items: [] }
          }

          return { ...order, order_items: items || [] }
        })
      )

      setOrders(ordersWithItems)
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const getOrderById = async (id: string) => {
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) throw error
      if (!order) return null

      // Fetch order items
      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', order.id)

      if (itemsError) {
        console.error('Error fetching order items:', itemsError)
        return { ...order, order_items: [] }
      }

      return { ...order, order_items: items || [] }
    } catch (err: any) {
      console.error('Error fetching order:', err)
      return null
    }
  }

  const createOrder = async (orderData: {
    po_number?: string
    order_type: string
    requested_delivery_date?: string
    shipping_address: any
    billing_address?: any
    notes?: string
    items: Array<{
      product_id: string
      quantity: number
      price: number
    }>
  }) => {
    try {
      if (!user || !profile?.company_id) {
        throw new Error('User not authenticated or no company associated')
      }

      // Calculate totals
      const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const tax_amount = subtotal * 0.08 // 8% tax rate, should be configurable
      const total_amount = subtotal + tax_amount

      // Generate order number
      const order_number = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number,
          company_id: profile.company_id,
          user_id: user.id,
          status: 'pending',
          order_type: orderData.order_type,
          po_number: orderData.po_number,
          order_date: new Date().toISOString(),
          requested_delivery_date: orderData.requested_delivery_date,
          subtotal,
          tax_amount,
          total_amount,
          currency: 'USD',
          payment_status: 'pending',
          shipping_address: orderData.shipping_address,
          billing_address: orderData.billing_address || orderData.shipping_address,
          notes: orderData.notes
        })
        .select()
        .maybeSingle()

      if (orderError) throw orderError
      if (!order) throw new Error('Failed to create order')

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: item.price
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        // Rollback order creation
        await supabase.from('orders').delete().eq('id', order.id)
        throw itemsError
      }

      // Refresh orders list
      fetchOrders()
      
      return order
    } catch (err: any) {
      console.error('Error creating order:', err)
      throw err
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)

      if (error) throw error
      
      // Refresh orders list
      fetchOrders()
    } catch (err: any) {
      console.error('Error updating order status:', err)
      throw err
    }
  }

  useEffect(() => {
    if (profile?.company_id) {
      fetchOrders({ limit: 20 })
    }
  }, [profile?.company_id])

  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    refetch: () => fetchOrders({ limit: 20 })
  }
}