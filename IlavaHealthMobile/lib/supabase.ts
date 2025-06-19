import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          phone: string
          user_type: 'farmer' | 'buyer'
          location: string
          farmer_type?: string
          bio?: string
          avatar_url?: string
          rating: number
          total_sales: number
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          unit: string
          category: string
          seller_id: string
          location: string
          image_urls: string[]
          status: 'active' | 'sold' | 'inactive'
          quantity_available: number
          harvest_date?: string
          expiry_date?: string
          organic_certified: boolean
          featured: boolean
          views: number
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      orders: {
        Row: {
          id: string
          buyer_id: string
          seller_id: string
          product_id: string
          quantity: number
          total_amount: number
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: string
          tracking_number?: string
          delivery_date?: string
          payment_method: string
          payment_status: 'pending' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      reviews: {
        Row: {
          id: string
          order_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['favorites']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['favorites']['Insert']>
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'order' | 'product' | 'general' | 'promotion'
          read: boolean
          data?: any
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>
      }
    }
  }
}
