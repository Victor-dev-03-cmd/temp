import { type NextRequest, NextResponse } from "next/server"
import { type EmailOtpType } from "@supabase/supabase-js"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const supabase = createSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ message: "Supabase client is not available." }, { status: 500 })
  }

  const { email, token, type } = await request.json()

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: type as EmailOtpType,
  })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }

  return NextResponse.json({
    user: data.user,
    session: data.session,
    message: "Email verified successfully.",
  })
}
