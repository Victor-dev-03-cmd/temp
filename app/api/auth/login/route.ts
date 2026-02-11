import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  const supabase = await createClient() // <-- AWAIT added

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }

  return NextResponse.json({ message: "Login successful" })
}
