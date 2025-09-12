import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export function useQuotes() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, profile } = useAuth()

  const fetchQuotes = async (filters?: {
    status?: string
    limit?: number
  }) => {
    try {
      if (!profile?.company_id) {
        setQuotes([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      let query = supabase
        .from('quotes')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false })

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }
      if (filters?.limit) {
        query = query.limit(filters.limit)
      }

      const { data: quotesData, error } = await query

      if (error) throw error

      if (!quotesData || quotesData.length === 0) {
        setQuotes([])
        return
      }

      // Manually fetch quote items for each quote
      const quotesWithItems = await Promise.all(
        quotesData.map(async (quote) => {
          const { data: items, error: itemsError } = await supabase
            .from('quote_items')
            .select('*')
            .eq('quote_id', quote.id)

          if (itemsError) {
            console.error('Error fetching quote items:', itemsError)
            return { ...quote, quote_items: [] }
          }

          return { ...quote, quote_items: items || [] }
        })
      )

      setQuotes(quotesWithItems)
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching quotes:', err)
    } finally {
      setLoading(false)
    }
  }

  const createQuote = async (quoteData: {
    quote_name: string
    notes?: string
    valid_until: string
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
      const subtotal = quoteData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const tax_amount = subtotal * 0.08 // 8% tax rate
      const total_amount = subtotal + tax_amount

      // Generate quote number
      const quote_number = `QUO-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

      // Create the quote
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          quote_number,
          company_id: profile.company_id,
          user_id: user.id,
          quote_name: quoteData.quote_name,
          status: 'draft',
          subtotal,
          tax_amount,
          total_amount,
          valid_until: quoteData.valid_until,
          notes: quoteData.notes
        })
        .select()
        .maybeSingle()

      if (quoteError) throw quoteError
      if (!quote) throw new Error('Failed to create quote')

      // Create quote items
      const quoteItems = quoteData.items.map(item => ({
        quote_id: quote.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: item.price
      }))

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(quoteItems)

      if (itemsError) {
        // Rollback quote creation
        await supabase.from('quotes').delete().eq('id', quote.id)
        throw itemsError
      }

      // Refresh quotes list
      fetchQuotes()
      
      return quote
    } catch (err: any) {
      console.error('Error creating quote:', err)
      throw err
    }
  }

  useEffect(() => {
    if (profile?.company_id) {
      fetchQuotes({ limit: 10 })
    }
  }, [profile?.company_id])

  return {
    quotes,
    loading,
    error,
    fetchQuotes,
    createQuote,
    refetch: () => fetchQuotes({ limit: 10 })
  }
}

export function useAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { profile } = useAuth()

  const fetchAnalytics = async (dateRange?: { from: string; to: string }) => {
    try {
      if (!profile?.company_id) {
        setAnalyticsData(null)
        setLoading(false)
        return
      }

      setLoading(true)

      // Fetch orders analytics
      let ordersQuery = supabase
        .from('orders')
        .select('*')
        .eq('company_id', profile.company_id)

      if (dateRange) {
        ordersQuery = ordersQuery
          .gte('order_date', dateRange.from)
          .lte('order_date', dateRange.to)
      }

      const { data: orders } = await ordersQuery

      // Fetch quotes analytics
      let quotesQuery = supabase
        .from('quotes')
        .select('*')
        .eq('company_id', profile.company_id)

      if (dateRange) {
        quotesQuery = quotesQuery
          .gte('created_at', dateRange.from)
          .lte('created_at', dateRange.to)
      }

      const { data: quotes } = await quotesQuery

      // Calculate analytics
      const analytics = {
        totalOrders: orders?.length || 0,
        totalQuotes: quotes?.length || 0,
        totalRevenue: orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0,
        pendingOrders: orders?.filter(order => order.status === 'pending').length || 0,
        completedOrders: orders?.filter(order => order.status === 'completed').length || 0,
        averageOrderValue: orders?.length ? 
          (orders.reduce((sum, order) => sum + (order.total_amount || 0), 0) / orders.length) : 0,
        orders: orders || [],
        quotes: quotes || []
      }

      setAnalyticsData(analytics)
    } catch (err) {
      console.error('Error fetching analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (profile?.company_id) {
      fetchAnalytics()
    }
  }, [profile?.company_id])

  return {
    analyticsData,
    loading,
    fetchAnalytics,
    refetch: () => fetchAnalytics()
  }
}