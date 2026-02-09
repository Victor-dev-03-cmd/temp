import { type NextRequest, NextResponse } from "next/server"
import { type EmailOtpType } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email, token, type } = await request.json()

    if (!email || !token || !type) {
      return NextResponse.json(
        { message: "Email, token, and type are required." },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: type as EmailOtpType,
    })

    if (error) {
      console.error("Supabase OTP verification error:", error)
      return NextResponse.json(
        { message: error.message || "Invalid or expired OTP." },
        { status: 400 }
      )
    }

    if (!data.user) {
        return NextResponse.json(
            { message: "Verification failed. User not found." },
            { status: 400 }
        )
    }

    // OTP is correct, user is now verified and logged in.
    return NextResponse.json({
      user: data.user,
      session: data.session,
      message: "Email verified successfully.",
    })

  } catch (error) {
    console.error("API verify-otp error:", error)
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
