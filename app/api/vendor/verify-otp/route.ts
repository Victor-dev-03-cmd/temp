import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { type EmailOtpType } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  const { phone, token } = await request.json()
  const supabase = await createClient() // <-- AWAIT added

  if (!phone || !token) {
    return NextResponse.json({ message: "Phone number and token are required." }, { status: 400 })
  }

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
