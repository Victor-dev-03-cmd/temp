import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 401 })
    }

    return NextResponse.json({ user: data.user, message: "Login successful" })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: error instanceof Error ? error.message : "Login failed" }, { status: 401 })
  }
}
