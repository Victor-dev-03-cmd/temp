import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const { phone, token } = await request.json()

  if (!phone || !token) {
    return NextResponse.json({ message: "Phone number and token are required." }, { status: 400 })
  }

  const supabase = createSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ message: "Supabase client is not available." }, { status: 500 })
  }

  // This will verify the OTP
  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  })

  if (error) {
    console.error("Verify OTP Error:", error)
    return NextResponse.json({ message: "Invalid or expired OTP." }, { status: 400 })
  }

  return NextResponse.json({ message: "Mobile number verified successfully." })
}
