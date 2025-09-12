import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase, getCurrentUserProfile, getUserCompany } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']
type Company = Database['public']['Tables']['companies']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  company: Company | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ data: any; error: AuthError | null }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ data: any; error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  updateProfile: (updates: Partial<Profile>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user on mount (one-time check)
  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          // Load user profile
          const userProfile = await getCurrentUserProfile()
          setProfile(userProfile)
          
          // Load company data if user has company_id
          if (userProfile?.company_id) {
            const companyData = await getUserCompany(userProfile.company_id)
            setCompany(companyData)
          }
        }
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setLoading(false)
      }
    }
    loadUser()

    // Set up auth listener - KEEP SIMPLE, avoid any async operations in callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // NEVER use any async operations in callback
        setUser(session?.user || null)
        if (!session?.user) {
          setProfile(null)
          setCompany(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Load profile and company data when user changes (outside of onAuthStateChange)
  useEffect(() => {
    async function loadUserData() {
      if (user && !profile) {
        const userProfile = await getCurrentUserProfile()
        setProfile(userProfile)
        
        if (userProfile?.company_id && !company) {
          const companyData = await getUserCompany(userProfile.company_id)
          setCompany(companyData)
        }
      }
    }
    
    if (user) {
      loadUserData()
    }
  }, [user, profile, company])

  // Auth methods
  async function signIn(email: string, password: string) {
    const result = await supabase.auth.signInWithPassword({ email, password })
    return result
  }

  async function signUp(email: string, password: string, metadata?: any) {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.protocol}//${window.location.host}/auth/callback`,
        data: metadata
      }
    })
    return result
  }

  async function signOut() {
    const result = await supabase.auth.signOut()
    if (!result.error) {
      setUser(null)
      setProfile(null)
      setCompany(null)
    }
    return result
  }

  async function updateProfile(updates: Partial<Profile>) {
    if (!user) return false
    
    try {
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !currentUser) {
        throw new Error('User authentication failed, please log in again')
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', currentUser.id)
        .select()
        .maybeSingle()

      if (error) {
        console.error('Database update error:', error)
        throw error
      }

      setProfile(data)
      return true
    } catch (error) {
      console.error('Error updating profile:', error)
      return false
    }
  }

  const value = {
    user,
    profile,
    company,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Helper hook for requiring authentication
export function useRequireAuth() {
  const auth = useAuth()
  
  useEffect(() => {
    if (!auth.loading && !auth.user) {
      // Redirect to login or show auth modal
      window.location.href = '/login'
    }
  }, [auth.loading, auth.user])
  
  return auth
}