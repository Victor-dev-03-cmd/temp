import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const { phone } = await request.json()
  const supabase = await createClient() // <-- AWAIT added as you instructed

  if (!phone) {
    return NextResponse.json({ message: "Phone number is required." }, { status: 400 })
  }

  const { error } = await supabase.auth.signInWithOtp({
    phone,
  })

  if (error) {
    console.error("Send OTP Error:", error)
    return NextResponse.json({ message: `Failed to send OTP: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ message: "OTP sent successfully." })
}
