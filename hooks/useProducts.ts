import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { Database } from '../lib/supabase'

type Product = Database['public']['Tables']['products']['Row']

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchProducts = async (filters?: {
    category?: string
    brand?: string
    search?: string
    isActive?: boolean
  }) => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      // Apply filters
      if (filters?.category) {
        query = query.eq('category_id', filters.category)
      }
      if (filters?.brand) {
        query = query.eq('brand', filters.brand)
      }
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,sku.ilike.%${filters.search}%`)
      }
      if (filters?.isActive !== undefined) {
        query = query.eq('is_active', filters.isActive)
      }

      const { data, error } = await query

      if (error) throw error
      setProducts(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const getProductById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) throw error
      return data
    } catch (err: any) {
      console.error('Error fetching product:', err)
      return null
    }
  }

  useEffect(() => {
    fetchProducts({ isActive: true })
  }, [])

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    refetch: () => fetchProducts({ isActive: true })
  }
}

export function useProductCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('*')
          .order('name')

        if (error) throw error
        setCategories(data || [])
      } catch (err) {
        console.error('Error fetching categories:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}