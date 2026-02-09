"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { type Session, type User } from "@supabase/supabase-js"

interface Profile {
  full_name: string
  role: "ADMIN" | "VENDOR" | "CUSTOMER"
}

// Combine Supabase session with our custom profile data
interface AppSession {
  user: User
  profile: Profile
}

interface AuthContextType {
  session: AppSession | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createSupabaseBrowserClient()
  const [session, setSession] = useState<AppSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // This is the single source of truth for authentication state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // On initial load, session is null, then it's fetched.
      // On login, event is SIGNED_IN and session is available.
      // On logout, event is SIGNED_OUT and session is null.

      if (session) {
        // User is logged in, now fetch their profile
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", session.user.id)
          .single()

        if (error) {
          console.error("Error fetching profile:", error)
          // If profile fetch fails, log them out to be safe
          await supabase.auth.signOut()
          setSession(null)
        } else if (profile) {
          // Both session and profile are available, create the app session
          setSession({
            user: session.user,
            profile: profile as Profile,
          })
        }
      } else {
        // User is logged out
        setSession(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, loading, logout }}>
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
