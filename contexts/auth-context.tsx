"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { type User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

interface Profile {
  full_name: string
  role: "ADMIN" | "VENDOR" | "CUSTOMER"
}

export interface AppSession {
  user: User
  profile: Profile
}

interface AuthContextType {
  session: AppSession | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createSupabaseBrowserClient()!
  const router = useRouter()
  const [session, setSession] = useState<AppSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (currentSession) {
        let { data: profile, error } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", currentSession.user.id)
          .single()

        if (error && error.code === 'PGRST116') {
          console.warn("Profile not found for user, creating one now.");
          
          const derivedFullName = currentSession.user.user_metadata?.full_name || currentSession.user.email?.split('@')[0] || 'User';

          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: currentSession.user.id,
              email: currentSession.user.email,
              full_name: derivedFullName,
              role: 'CUSTOMER'
            })
            .select('full_name, role')
            .single();
          
          if (insertError) {
            console.error("Failed to create missing profile:", insertError);
            await supabase.auth.signOut();
            setSession(null);
          } else {
            profile = newProfile;
          }
        } else if (error) {
          console.error("Auth Error: Could not fetch profile.", error);
          await supabase.auth.signOut();
          setSession(null);
        }

        if (profile) {
          setSession({ user: currentSession.user, profile: profile as Profile })
        }
        
      } else {
        setSession(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
