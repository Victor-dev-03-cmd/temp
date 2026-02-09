import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ message: "Supabase client is not available." }, { status: 500 })
  }

  const { email, password, name, phone, country } = await request.json()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        phone,
        country,
      },
    },
  })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: "Registration successful. Please check your email for verification." })
}
