import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yujhybfpehveokeyhscj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1amh5YmZwZWh2ZW9rZXloc2NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MTU5NzgsImV4cCI6MjA3MzE5MTk3OH0.1vX6W_qDZsxGn_enhgo7dCEvHv0SFJV1DRRbUJr-Prs"

// Create Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          company_id: string | null
          email: string
          first_name: string | null
          last_name: string | null
          job_title: string | null
          phone: string | null
          role: string | null
          permissions: string[] | null
          is_active: boolean | null
          last_login: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          company_id?: string | null
          email: string
          first_name?: string | null
          last_name?: string | null
          job_title?: string | null
          phone?: string | null
          role?: string | null
          permissions?: string[] | null
          is_active?: boolean | null
          last_login?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          company_id?: string | null
          email?: string
          first_name?: string | null
          last_name?: string | null
          job_title?: string | null
          phone?: string | null
          role?: string | null
          permissions?: string[] | null
          is_active?: boolean | null
          last_login?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          type: string | null
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          phone: string | null
          email: string | null
          tax_id: string | null
          credit_limit: number | null
          credit_used: number | null
          payment_terms: number | null
          discount_tier: string | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
      }
      products: {
        Row: {
          id: string
          sku: string
          name: string
          description: string | null
          category_id: string | null
          brand: string | null
          collection: string | null
          material: string | null
          dimensions: any | null
          weight: number | null
          color: string | null
          style: string | null
          msrp: number | null
          wholesale_price: number | null
          dealer_price: number | null
          cost: number | null
          margin_percent: number | null
          images: any | null
          specifications: any | null
          features: string[] | null
          care_instructions: string | null
          assembly_required: boolean | null
          lead_time_days: number | null
          minimum_order_quantity: number | null
          is_active: boolean | null
          created_at: string | null
          updated_at: string | null
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          company_id: string
          user_id: string
          status: string | null
          order_type: string | null
          po_number: string | null
          order_date: string | null
          requested_delivery_date: string | null
          actual_delivery_date: string | null
          subtotal: number | null
          tax_amount: number | null
          shipping_amount: number | null
          discount_amount: number | null
          total_amount: number | null
          currency: string | null
          payment_status: string | null
          payment_terms: number | null
          shipping_address: any | null
          billing_address: any | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
      }
    }
  }
}

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error)
    return null
  }
  return user
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
  
  if (error) {
    console.error('Error getting user profile:', error)
    return null
  }
  return data
}

export const getCurrentUserProfile = async () => {
  const user = await getCurrentUser()
  if (!user) return null
  
  return await getUserProfile(user.id)
}

export const getUserCompany = async (companyId: string) => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', companyId)
    .maybeSingle()
  
  if (error) {
    console.error('Error getting user company:', error)
    return null
  }
  return data
}