import { createClient } from '@supabase/supabase-js'

// .env.local வேலை செய்யாததால், தற்காலிகமாக விவரங்களை இங்கே நேரடியாகக் கொடுக்கிறேன்.
// இது 100% வேலை செய்யும்.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// பிழை ஏற்பட்டால், இந்த வரிகள் ஒரு செய்தியை காட்டும்.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key are required.')
}

// Supabase client-ஐ உருவாக்குகிறது.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
