import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ message: "Supabase client is not available." }, { status: 500 })
  }

  const { email, password } = await request.json()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }

  return NextResponse.json({ message: "Login successful" })
}
